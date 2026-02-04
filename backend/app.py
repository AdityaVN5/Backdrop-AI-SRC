import os
import sys
import uuid
import cv2
import torch
import numpy as np
import importlib.util

from fastapi import FastAPI, UploadFile, File, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import FileResponse
from PIL import Image
from moviepy.video.io.ImageSequenceClip import ImageSequenceClip
from huggingface_hub import snapshot_download
from safetensors.torch import load_file
import torchvision.transforms as T

# =========================================================
# CONFIG
# =========================================================
RESOLUTION = 512
BATCH_SIZE = 4
THRESHOLD = 0.5

UPLOAD_DIR = "uploads"
OUTPUT_DIR = "outputs"
os.makedirs(UPLOAD_DIR, exist_ok=True)
os.makedirs(OUTPUT_DIR, exist_ok=True)

# =========================================================
# DEVICE
# =========================================================
device = "cuda" if torch.cuda.is_available() else "cpu"
print("Using device:", device)

# =========================================================
# DOWNLOAD & LOAD BIREFNET
# =========================================================
repo_dir = snapshot_download("zhengpeng7/BiRefNet")

spec = importlib.util.spec_from_file_location(
    "birefnet_pkg",
    os.path.join(repo_dir, "birefnet.py"),
    submodule_search_locations=[repo_dir],
)
birefnet_pkg = importlib.util.module_from_spec(spec)
sys.modules["birefnet_pkg"] = birefnet_pkg
spec.loader.exec_module(birefnet_pkg)

BiRefNet = birefnet_pkg.BiRefNet

model = BiRefNet()
weights = load_file(os.path.join(repo_dir, "model.safetensors"))
model.load_state_dict(weights, strict=False)
model = model.to(device).half().eval()

print("BiRefNet loaded ✅")

# =========================================================
# PREPROCESSING
# =========================================================
transform = T.Compose([
    T.Resize((RESOLUTION, RESOLUTION)),
    T.ToTensor(),
    T.Normalize(
        mean=[0.485, 0.456, 0.406],
        std=[0.229, 0.224, 0.225],
    ),
])

# =========================================================
# FASTAPI APP
# =========================================================
app = FastAPI(title="BiRefNet Video Background Removal")

# =========================================================
# CORS CONFIGURATION
# =========================================================
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:3000",  # Next.js dev server
        "http://localhost:3001",  # Alternative port
        "https://yourdomain.com"  # Production domain (update this)
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# =========================================================
# CORE PROCESSING FUNCTION
# =========================================================
def process_video(video_path: str):
    cap = cv2.VideoCapture(video_path)
    if not cap.isOpened():
        raise RuntimeError("Failed to open video")

    fps = cap.get(cv2.CAP_PROP_FPS)

    rgba_frames = []
    preview_frames = []

    batch_imgs, batch_rgbs, batch_sizes = [], [], []

    with torch.no_grad():
        while True:
            ret, frame = cap.read()
            if not ret:
                break

            rgb = frame[:, :, ::-1]
            pil = Image.fromarray(rgb)

            batch_imgs.append(transform(pil))
            batch_rgbs.append(rgb)
            batch_sizes.append(rgb.shape[:2])

            if len(batch_imgs) == BATCH_SIZE:
                _run_batch(batch_imgs, batch_rgbs, batch_sizes, rgba_frames, preview_frames)
                batch_imgs, batch_rgbs, batch_sizes = [], [], []

        if batch_imgs:
            _run_batch(batch_imgs, batch_rgbs, batch_sizes, rgba_frames, preview_frames)

    cap.release()
    return rgba_frames, preview_frames, fps


def _run_batch(batch_imgs, batch_rgbs, batch_sizes, rgba_frames, preview_frames):
    x = torch.stack(batch_imgs).to(device).half()
    preds = model(x)

    if isinstance(preds, (list, tuple)):
        preds = preds[-1]

    for pred, rgb, (h, w) in zip(preds, batch_rgbs, batch_sizes):
        mask = torch.sigmoid(pred)

        mask = torch.nn.functional.interpolate(
            mask.unsqueeze(0),
            size=(h, w),
            mode="bilinear",
            align_corners=False,
        )[0, 0].cpu().numpy()

        mask_bin = (mask > THRESHOLD).astype(np.uint8) * 255

        rgba_frames.append(np.dstack([rgb, mask_bin]))

        preview = rgb.copy()
        preview[mask_bin == 0] = 0
        preview_frames.append(preview)

# =========================================================
# API ENDPOINTS
# =========================================================
@app.post("/remove-background")
async def remove_background(video: UploadFile = File(...)):
    if not video.filename.endswith((".mp4", ".mov", ".webm")):
        raise HTTPException(status_code=400, detail="Unsupported video format")

    video_id = str(uuid.uuid4())
    input_path = os.path.join(UPLOAD_DIR, f"{video_id}.mp4")

    with open(input_path, "wb") as f:
        f.write(await video.read())

    rgba_frames, preview_frames, fps = process_video(input_path)

    preview_filename = f"{video_id}_preview.mp4"
    rgba_filename = f"{video_id}_rgba.webm"

    rgba_out = os.path.join(OUTPUT_DIR, rgba_filename)
    preview_out = os.path.join(OUTPUT_DIR, preview_filename)

    ImageSequenceClip(rgba_frames, fps=fps).write_videofile(
        rgba_out, codec="libvpx", audio=False
    )

    ImageSequenceClip(preview_frames, fps=fps).write_videofile(
        preview_out, codec="libx264", audio=False
    )

    return {
        "video_id": video_id,
        "preview_video": f"/download/{preview_filename}",
        "rgba_video": f"/download/{rgba_filename}",
        "fps": fps
    }


@app.get("/download/{filename}")
def download(filename: str):
    """Download processed video files"""
    # Security: only allow files from OUTPUT_DIR
    path = os.path.join(OUTPUT_DIR, filename)
    
    if not os.path.exists(path):
        raise HTTPException(status_code=404, detail="File not found")
    
    # Security: prevent path traversal
    if not os.path.abspath(path).startswith(os.path.abspath(OUTPUT_DIR)):
        raise HTTPException(status_code=403, detail="Access denied")
    
    return FileResponse(path)


@app.get("/health")
def health_check():
    """Health check endpoint"""
    return {
        "status": "healthy",
        "device": device,
        "model_loaded": True
    }
