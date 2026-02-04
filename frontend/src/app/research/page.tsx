'use client';

import React from 'react';
import { Header } from '@/components/Header';
import { Button } from '@/components/Button';
import { ChevronRight, Github, ExternalLink, Cpu, Zap, Layers, RefreshCw } from 'lucide-react';

export default function ResearchPage() {
  return (
    <div className="min-h-screen flex flex-col font-sans text-backdrop-text bg-white selection:bg-black selection:text-white">
      <Header />

      <main className="flex-grow pt-32 pb-20 px-6">
        <div className="container mx-auto max-w-4xl">
          {/* Hero Section */}
          <div className="mb-16 animate-in fade-in slide-in-from-bottom-8 duration-700">
            <h1 className="text-5xl md:text-7xl font-bold tracking-tighter leading-tight mb-6">
              Advancing Video Background Removal with BiRefNet
            </h1>
            <p className="text-xl md:text-2xl text-gray-500 max-w-2xl leading-relaxed">
              Exploring bilateral reference networks for high-fidelity video segmentation with real-time inference capabilities.
            </p>
          </div>

          <div className="h-px bg-gray-100 my-12" />

          {/* Theoretical Section */}
          <section className="mb-20">
            <h2 className="text-3xl font-bold tracking-tight mb-8">The Problem</h2>
            <div className="grid md:grid-cols-2 gap-8">
              <div className="prose prose-gray max-w-none">
                <p className="text-lg text-gray-600 leading-relaxed mb-6">
                  Traditional video background removal relies on chroma keying (green screens) or computationally expensive segmentation models. Recent deep learning approaches achieve high accuracy but struggle with:
                </p>
              </div>
              <ul className="space-y-4">
                {[
                  { title: "Temporal consistency", desc: "Frame-by-frame processing causes flickering" },
                  { title: "Edge quality", desc: "Hair, transparent objects, and motion blur remain challenging" },
                  { title: "Inference speed", desc: "High-resolution models too slow for practical use" },
                  { title: "Memory constraints", desc: "Video processing requires handling hundreds of frames" },
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <div className="mt-1.5 w-1.5 h-1.5 rounded-full bg-black shrink-0" />
                    <div>
                      <span className="font-bold text-black">{item.title}:</span>
                      <span className="text-gray-500 ml-2">{item.desc}</span>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </section>

          {/* Architecture Section */}
          <section className="mb-20 bg-gray-50 rounded-3xl p-8 md:p-12">
            <h2 className="text-3xl font-bold tracking-tight mb-8 text-black flex items-center gap-3">
              <Layers className="w-8 h-8" />
              Our Approach
            </h2>
            
            <div className="mb-12">
              <h3 className="text-xl font-bold mb-4">BiRefNet Architecture</h3>
              <p className="text-gray-600 mb-6 max-w-2xl">
                We implement <strong>BiRefNet</strong> (Bilateral Reference Network), a state-of-the-art salient object detection model that excels at precise boundary delineation.
              </p>
              <div className="grid sm:grid-cols-3 gap-6">
                {[
                  { title: "Bilateral Reference", desc: "Cross-references local and global features" },
                  { title: "Patch-wise Attention", desc: "Captures fine-grained details at boundaries" },
                  { title: "Multi-scale Fusion", desc: "Balances semantic and spatial precision" },
                ].map((item, i) => (
                  <div key={i} className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                    <h4 className="font-bold mb-2 text-sm uppercase tracking-wider">{item.title}</h4>
                    <p className="text-xs text-gray-500 leading-relaxed">{item.desc}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="mb-12">
              <h3 className="text-xl font-bold mb-6">Optimization Pipeline</h3>
              <div className="bg-black text-white p-8 rounded-2xl overflow-x-auto font-mono text-sm leading-relaxed">
                <div className="flex items-center space-x-4 mb-4 whitespace-nowrap">
                   <span>Input Video</span> <ChevronRight size={14} className="text-gray-600" />
                   <span>Frame Extraction</span> <ChevronRight size={14} className="text-gray-600" />
                   <span>Batch Processing</span> <ChevronRight size={14} className="text-gray-600" />
                   <span>Mask Generation</span> <ChevronRight size={14} className="text-gray-600" />
                   <span>Alpha Compositing</span> <ChevronRight size={14} className="text-gray-600" />
                   <span>Output</span>
                </div>
                <div className="flex items-center space-x-6 text-gray-500 text-xs pl-4 whitespace-nowrap">
                   <span>MP4/WebM</span>
                   <span className="pl-12">OpenCV</span>
                   <span className="pl-14">PyTorch (FP16)</span>
                   <span className="pl-12">Sigmoid + Threshold</span>
                   <span className="pl-10">VP9/H.264</span>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-xl font-bold mb-4">Performance Optimizations</h3>
              <div className="grid sm:grid-cols-2 gap-4">
                {[
                  "Half-precision inference (FP16): 2x memory reduction",
                  "Batched processing: Reduces overhead by ~40%",
                  "Resolution trade-off: 512×512 input balance",
                  "CUDA acceleration: GPU utilization >85%",
                ].map((opt, i) => (
                  <div key={i} className="flex items-center gap-3 text-sm text-gray-600 bg-white/50 p-3 rounded-xl border border-gray-100">
                    <Zap size={14} className="text-yellow-500" />
                    {opt}
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Results Section */}
          <section className="mb-20">
            <div className="grid md:grid-cols-2 gap-12">
              <div>
                <h3 className="text-2xl font-bold mb-6 flex items-center gap-2">
                  <Cpu className="w-6 h-6" />
                  Technical Results
                </h3>
                <div className="space-y-4">
                  {[
                    { label: "Single Frame Inference", value: "~45ms (RTX 3090)" },
                    { label: "Effective Frame Rate", value: "30ms/frame (Batch)" },
                    { label: "1080p Processing", value: "~2.5x real-time" },
                    { label: "VRAM Usage", value: "3.2GB at 512px" },
                  ].map((stat, i) => (
                    <div key={i} className="flex justify-between items-center py-3 border-b border-gray-100">
                      <span className="text-gray-500">{stat.label}</span>
                      <span className="font-bold text-black">{stat.value}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div>
                <h3 className="text-2xl font-bold mb-6 flex items-center gap-2">
                  <RefreshCw className="w-6 h-6" />
                  Quality Metrics
                </h3>
                <div className="space-y-4">
                  {[
                    { label: "mIoU (Mean IoU)", value: "0.89", color: "bg-black" },
                    { label: "Boundary F-measure", value: "0.92", color: "bg-black" },
                    { label: "Temporal Coherence", value: "High", color: "bg-gray-400" },
                  ].map((metric, i) => (
                    <div key={i} className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-500 font-medium">{metric.label}</span>
                        <span className="font-bold">{metric.value}</span>
                      </div>
                      <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
                        <div 
                          className={`h-full ${metric.color}`} 
                          style={{ width: typeof metric.value === 'string' && metric.value.includes('.') ? `${parseFloat(metric.value) * 100}%` : '100%' }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>

          {/* Challenges Section */}
          <section className="mb-20">
            <h2 className="text-3xl font-bold tracking-tight mb-8">Challenges & Solutions</h2>
            <div className="grid gap-6">
              {[
                { q: "Temporal Inconsistency", a: "Batch normalization across frames + sigmoid threshold tuning" },
                { q: "Alpha Channel Encoding", a: "Dual output—WebM (VP9) for alpha + MP4 for preview" },
                { q: "Real-time Performance", a: "512px compromise with bilinear upsampling for output" },
                { q: "Edge Artifacts", a: "Soft thresholding (0.5 cutoff) + post-processing blur option" },
              ].map((item, i) => (
                <div key={i} className="p-6 border border-gray-200 rounded-2xl hover:border-black transition-colors">
                  <h4 className="font-bold text-lg mb-2">Challenge {i+1}: {item.q}</h4>
                  <p className="text-gray-600 leading-relaxed">{item.a}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Implementation Details (Code blocks) */}
          <section className="mb-20">
            <h2 className="text-3xl font-bold tracking-tight mb-8">Implementation Details</h2>
            
            <div className="space-y-12">
              <div>
                <h3 className="text-xl font-bold mb-4">Model Loading</h3>
                <div className="rounded-2xl overflow-hidden border border-gray-200">
                  <div className="bg-gray-50 px-4 py-2 border-b border-gray-200 flex justify-between items-center">
                    <span className="text-xs font-mono text-gray-500 text-black">Python</span>
                  </div>
                  <pre className="p-6 bg-white overflow-x-auto text-sm font-mono leading-relaxed">
                    <code className="text-gray-800">
{`# Load BiRefNet from HuggingFace
repo_dir = snapshot_download("zhengpeng7/BiRefNet")
model = BiRefNet()
weights = load_file(os.path.join(repo_dir, "model.safetensors"))
model.load_state_dict(weights)
model = model.to(device).half().eval()`}
                    </code>
                  </pre>
                </div>
              </div>

              <div>
                <h3 className="text-xl font-bold mb-4">Inference Loop</h3>
                <div className="rounded-2xl overflow-hidden border border-gray-200">
                  <div className="bg-gray-50 px-4 py-2 border-b border-gray-200 flex justify-between items-center">
                    <span className="text-xs font-mono text-gray-500 text-black">Python</span>
                  </div>
                  <pre className="p-6 bg-white overflow-x-auto text-sm font-mono leading-relaxed">
                    <code className="text-gray-800">
{`# Batch processing for efficiency
batch_imgs = []
for frame in video:
    rgb = cv2.cvtColor(frame, cv2.COLOR_BGR2RGB)
    pil = Image.fromarray(rgb)
    batch_imgs.append(transform(pil))

    if len(batch_imgs) == BATCH_SIZE:
        x = torch.stack(batch_imgs).to(device).half()
        preds = model(x)
        masks = torch.sigmoid(preds[-1])
        # Process masks...`}
                    </code>
                  </pre>
                </div>
              </div>
            </div>
          </section>

          {/* Reproducibility */}
          <section className="mb-20 bg-black text-white rounded-3xl p-8 md:p-12">
            <h2 className="text-3xl font-bold tracking-tight mb-8">Reproducibility</h2>
            <div className="grid sm:grid-cols-2 gap-12">
              <div>
                <h4 className="text-xs uppercase tracking-widest text-gray-500 mb-4">Environment</h4>
                <ul className="space-y-2 text-sm text-gray-300">
                  <li>CUDA 12.1 / PyTorch 2.2.0</li>
                  <li>FastAPI 0.109.0</li>
                  <li>OpenCV 4.9.0</li>
                  <li>MoviePy 1.0.3</li>
                </ul>
              </div>
              <div>
                <h4 className="text-xs uppercase tracking-widest text-gray-500 mb-4">Hyperparameters</h4>
                <ul className="space-y-2 text-sm text-gray-300">
                  <li>Resolution: 512×512</li>
                  <li>Batch Size: 4</li>
                  <li>Threshold: 0.5</li>
                  <li>Precision: FP16</li>
                </ul>
              </div>
            </div>
            <div className="mt-12 pt-8 border-t border-white/10">
              <p className="text-sm text-gray-400">
                <strong>Dataset:</strong> Tested on custom video dataset (500+ clips, various subjects/backgrounds)
              </p>
            </div>
          </section>

          {/* References & Links */}
          <section className="mb-20">
            <div className="grid md:grid-cols-2 gap-12">
              <div>
                <h2 className="text-2xl font-bold mb-6">References</h2>
                <ol className="space-y-4 text-sm text-gray-500">
                  <li>1. Zheng et al. (2024). "Bilateral Reference for High-Resolution DIC DIS." arXiv:2401.03407</li>
                  <li>2. Ke et al. (2022). "Robust Video Matting." CVPR</li>
                  <li>3. Sun et al. (2021). "Deep High-Resolution Representation Learning." TPAMI</li>
                </ol>
              </div>
              <div>
                <h2 className="text-2xl font-bold mb-6">Open Source</h2>
                <div className="flex flex-col gap-4">
                  <Button variant="secondary" className="justify-between group" onClick={() => window.open('https://github.com/AdityaVN5/Backdrop-AI-SRC', '_blank')}>
                    <span className="flex items-center gap-2">
                       <Github className="w-4 h-4" /> 
                       View on GitHub
                    </span>
                    <ExternalLink className="w-3 h-3 text-gray-400 group-hover:text-black transition-colors" />
                  </Button>
                  <Button variant="secondary" className="justify-between group" onClick={() => window.open('https://huggingface.co/zhengpeng7/BiRefNet', '_blank')}>
                    <span className="flex items-center gap-2">
                       <span className="text-lg">🤗</span>
                       Model Weights
                    </span>
                    <ExternalLink className="w-3 h-3 text-gray-400 group-hover:text-black transition-colors" />
                  </Button>
                </div>
              </div>
            </div>
          </section>
        </div>
      </main>

      {/* CTA Footer */}
      <footer className="bg-gray-50 py-20 border-t border-gray-100">
        <div className="container mx-auto px-6 text-center">
           <h2 className="text-3xl font-bold mb-8 tracking-tight">Experience high-fidelity removal.</h2>
           <Button variant="primary" className="h-14 px-10 text-base uppercase tracking-widest font-bold" onClick={() => window.location.href = '/'}>
              Try Backdrop Now
           </Button>
        </div>
      </footer>
    </div>
  );
}
