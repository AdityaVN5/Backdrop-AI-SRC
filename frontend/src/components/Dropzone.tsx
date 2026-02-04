import React, { useCallback, useState } from 'react';
import { Icons } from './Icons';

interface DropzoneProps {
  onFileSelect: (file: File) => void;
  id?: string;
  className?: string;
}

export const Dropzone: React.FC<DropzoneProps> = ({ onFileSelect, id = "file-upload", className = "" }) => {
  const [isDragOver, setIsDragOver] = useState(false);
  const [isValidating, setIsValidating] = useState(false);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
  }, []);

  const validateAndSelectFile = useCallback((file: File) => {
    setIsValidating(true);
    const video = document.createElement('video');
    video.preload = 'metadata';

    video.onloadedmetadata = function() {
      window.URL.revokeObjectURL(video.src);
      
      if (video.duration > 10) {
        alert("Video must be 10 seconds or shorter.");
        setIsValidating(false);
      } else {
        onFileSelect(file);
        setIsValidating(false);
      }
    }

    video.onerror = function() {
      alert("Invalid video file.");
      setIsValidating(false);
    }

    video.src = URL.createObjectURL(file);
  }, [onFileSelect]);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      const file = e.dataTransfer.files[0];
      if (file.type.startsWith('video/')) {
        validateAndSelectFile(file);
      } else {
        alert("Please upload a video file.");
      }
    }
  }, [validateAndSelectFile]);

  const handleFileInput = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      validateAndSelectFile(e.target.files[0]);
    }
  }, [validateAndSelectFile]);

  const triggerUpload = (e: React.MouseEvent) => {
    e.stopPropagation();
    document.getElementById(id)?.click();
  };

  return (
    <div 
      className={`
        relative group cursor-pointer
        flex flex-col items-center justify-center 
        w-full max-w-xl mx-auto h-48
        rounded-2xl transition-all duration-300
        backdrop-blur-sm
        ${isDragOver 
          ? 'bg-white/20 border-2 border-white scale-[1.02]' 
          : 'bg-white/10 border border-white/20 hover:bg-white/15'
        }
        ${className}
      `}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
      onClick={triggerUpload}
    >
      <input 
        id={id} 
        type="file" 
        className="hidden" 
        accept="video/mp4,video/webm,video/mov,video/quicktime"
        onChange={handleFileInput}
      />
      
      <div className="flex flex-col sm:flex-row items-center space-y-4 sm:space-y-0 sm:space-x-6 text-center sm:text-left p-6">
        <div className={`
          p-3 rounded-full bg-white text-black transition-transform duration-300 group-hover:scale-110
        `}>
          {isValidating ? (
            <div className="w-6 h-6 border-2 border-black border-t-transparent rounded-full animate-spin" />
          ) : (
            <Icons.Upload className="w-6 h-6" />
          )}
        </div>
        
        <div>
          <p className="text-lg font-semibold text-white">
            {isValidating ? "Verifying..." : "Upload a video"}
          </p>
          <p className="text-sm text-gray-300 mt-1">
            Drag & drop or click to browse
          </p>
          <p className="text-xs text-gray-400 mt-2 font-medium bg-black/20 inline-block px-2 py-0.5 rounded-md">
            Max duration: 10s
          </p>
        </div>
      </div>
    </div>
  );
};