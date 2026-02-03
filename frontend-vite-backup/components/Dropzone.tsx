import React, { useCallback, useState } from 'react';
import { Icons } from './Icons';

interface DropzoneProps {
  onFileSelect: (file: File) => void;
  id?: string;
  className?: string;
}

export const Dropzone: React.FC<DropzoneProps> = ({ onFileSelect, id = "file-upload", className = "" }) => {
  const [isDragOver, setIsDragOver] = useState(false);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      const file = e.dataTransfer.files[0];
      if (file.type.startsWith('video/')) {
        onFileSelect(file);
      } else {
        alert("Please upload a video file.");
      }
    }
  }, [onFileSelect]);

  const handleFileInput = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      onFileSelect(e.target.files[0]);
    }
  }, [onFileSelect]);

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
          <Icons.Upload className="w-6 h-6" />
        </div>
        
        <div>
          <p className="text-lg font-semibold text-white">
            Upload a video
          </p>
          <p className="text-sm text-gray-300 mt-1">
            Drag & drop or click to browse
          </p>
        </div>
      </div>
    </div>
  );
};