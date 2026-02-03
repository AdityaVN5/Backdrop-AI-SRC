import React, { useState, useEffect, useRef } from 'react';
import { BackgroundMode, ProcessingState, VideoMetadata } from '../types';
import { Icons } from './Icons';
import { Button } from './Button';

interface EditorProps {
  file: File;
  onReset: () => void;
}

export const Editor: React.FC<EditorProps> = ({ file, onReset }) => {
  const [videoUrl, setVideoUrl] = useState<string>('');
  const [mode, setMode] = useState<BackgroundMode>(BackgroundMode.TRANSPARENT);
  const [customBg, setCustomBg] = useState<string | null>(null);
  const [solidColor, setSolidColor] = useState<string>('#000000');
  const [state, setState] = useState<ProcessingState>({
    isUploading: true,
    isProcessing: false,
    progress: 0,
    error: null,
    isComplete: false
  });
  
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const url = URL.createObjectURL(file);
    setVideoUrl(url);

    let progress = 0;
    const interval = setInterval(() => {
      progress += 5;
      if (progress >= 100) {
        clearInterval(interval);
        setState(s => ({ ...s, isUploading: false, progress: 0 }));
        simulateProcessing();
      } else {
        setState(s => ({ ...s, progress }));
      }
    }, 100);

    return () => {
      URL.revokeObjectURL(url);
      clearInterval(interval);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [file]);

  const simulateProcessing = () => {
    setState(s => ({ ...s, isProcessing: true, progress: 0 }));
    let progress = 0;
    const interval = setInterval(() => {
      progress += 2;
      if (progress >= 100) {
        clearInterval(interval);
        setState(s => ({ ...s, isProcessing: false, isComplete: true, progress: 100 }));
      } else {
        setState(s => ({ ...s, progress }));
      }
    }, 50);
  };

  const handleDownload = () => {
    const link = document.createElement('a');
    link.href = videoUrl;
    link.download = `processed_${file.name}`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleCustomBgUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
        const file = e.target.files[0];
        const url = URL.createObjectURL(file);
        setCustomBg(url);
    }
  };

  const renderBackgroundPreview = () => {
    switch (mode) {
      case BackgroundMode.ORIGINAL:
        return { backgroundColor: '#000000' };
      case BackgroundMode.TRANSPARENT:
        return {
          backgroundImage: `linear-gradient(45deg, #E5E5E5 25%, transparent 25%), 
            linear-gradient(-45deg, #E5E5E5 25%, transparent 25%), 
            linear-gradient(45deg, transparent 75%, #E5E5E5 75%), 
            linear-gradient(-45deg, transparent 75%, #E5E5E5 75%)`,
          backgroundSize: '20px 20px',
          backgroundPosition: '0 0, 0 10px, 10px -10px, -10px 0px',
          backgroundColor: '#FFFFFF'
        };
      case BackgroundMode.GREEN_SCREEN:
        return { backgroundColor: '#00FF00' };
      case BackgroundMode.BLUR:
        return { backgroundColor: '#D4D4D4' }; 
      case BackgroundMode.IMAGE:
        return { 
          backgroundImage: customBg ? `url(${customBg})` : 'url(https://images.unsplash.com/photo-1497294815431-9365093b7331?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80)',
          backgroundSize: 'cover',
          backgroundPosition: 'center'
        };
      case BackgroundMode.COLOR:
         return { backgroundColor: solidColor };
      default:
        return {};
    }
  };

  const colorPresets = ['#000000', '#FFFFFF', '#FF0000', '#00FF00', '#0000FF', '#FFFF00', '#FF00FF', '#00FFFF'];

  return (
    <div className="w-full max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-6 h-[calc(100vh-140px)] min-h-[600px]">
      
      {/* Left Column: Sidebar Controls */}
      <div className="lg:col-span-3 flex flex-col gap-4 order-2 lg:order-1">
        <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm flex-grow flex flex-col">
          <div className="mb-8">
             <div className="flex items-center space-x-2 text-backdrop-textSecondary mb-2">
                <Icons.Video className="w-4 h-4" />
                <span className="text-xs font-mono uppercase tracking-widest">Source</span>
             </div>
             <h2 className="text-sm font-semibold text-black truncate" title={file.name}>
                {file.name}
             </h2>
          </div>

          <div className="space-y-6">
            <div>
                <label className="text-xs font-bold text-backdrop-textSecondary uppercase tracking-widest block mb-3">
                    Mode
                </label>
                <div className="flex flex-col gap-2">
                {[
                    { id: BackgroundMode.ORIGINAL, icon: Icons.Film, label: 'Original' },
                    { id: BackgroundMode.TRANSPARENT, icon: Icons.Layers, label: 'Transparent' },
                    { id: BackgroundMode.GREEN_SCREEN, icon: Icons.Video, label: 'Green Screen' },
                    { id: BackgroundMode.IMAGE, icon: Icons.Image, label: 'Custom Image' },
                    { id: BackgroundMode.COLOR, icon: Icons.Color, label: 'Solid Color' },
                ].map((opt) => (
                    <React.Fragment key={opt.id}>
                        <button 
                            onClick={() => setMode(opt.id)}
                            className={`
                                flex items-center space-x-3 px-4 py-3 rounded-lg text-sm font-medium transition-all w-full text-left
                                ${mode === opt.id 
                                    ? 'bg-black text-white shadow-md' 
                                    : 'bg-gray-50 text-gray-600 hover:bg-gray-100'
                                }
                            `}
                        >
                            <opt.icon className="w-4 h-4" />
                            <span>{opt.label}</span>
                        </button>

                        {/* In-line Custom Image Upload */}
                        {mode === BackgroundMode.IMAGE && opt.id === BackgroundMode.IMAGE && (
                            <div className="pl-4 pr-2 py-2 animate-in fade-in slide-in-from-top-1 duration-200">
                                <div className="relative group p-4 border-2 border-dashed border-gray-300 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors text-center cursor-pointer">
                                    <input 
                                        type="file" 
                                        accept="image/*" 
                                        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                                        onChange={handleCustomBgUpload}
                                    />
                                    <div className="flex flex-col items-center justify-center space-y-2 pointer-events-none">
                                        <div className="p-2 bg-white rounded-full shadow-sm group-hover:scale-110 transition-transform">
                                            <Icons.Upload className="w-4 h-4 text-black" />
                                        </div>
                                        <p className="text-xs text-gray-600 font-medium">Click to browse</p>
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* In-line Color Picker */}
                        {mode === BackgroundMode.COLOR && opt.id === BackgroundMode.COLOR && (
                            <div className="pl-4 pr-2 py-2 animate-in fade-in slide-in-from-top-1 duration-200">
                                <div className="p-3 bg-gray-50 rounded-lg border border-gray-200">
                                    <div className="flex flex-wrap gap-2 mb-3">
                                        {colorPresets.map(color => (
                                            <button
                                                key={color}
                                                onClick={() => setSolidColor(color)}
                                                className={`w-6 h-6 rounded-full border border-gray-300 shadow-sm transition-transform hover:scale-110 ${solidColor === color ? 'ring-2 ring-offset-1 ring-black' : ''}`}
                                                style={{ backgroundColor: color }}
                                                title={color}
                                            />
                                        ))}
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <div 
                                            className="w-8 h-8 rounded border border-gray-300 shadow-sm"
                                            style={{ backgroundColor: solidColor }}
                                        />
                                        <input 
                                            type="color" 
                                            value={solidColor}
                                            onChange={(e) => setSolidColor(e.target.value)}
                                            className="flex-1 h-8 bg-white border border-gray-300 rounded cursor-pointer p-0.5"
                                        />
                                    </div>
                                </div>
                            </div>
                        )}
                    </React.Fragment>
                ))}
                </div>
            </div>
          </div>

          <div className="mt-auto pt-6 space-y-3">
             <Button 
                variant="primary" 
                className="w-full"
                disabled={!state.isComplete}
                onClick={handleDownload}
             >
                <Icons.Download className="w-4 h-4 mr-2" />
                Export Video
             </Button>
             
             <Button 
                variant="ghost" 
                className="w-full text-xs"
                onClick={onReset}
             >
               Start New Project
             </Button>
          </div>
        </div>

        {/* Progress Card */}
        {(state.isUploading || state.isProcessing) && (
          <div className="bg-black text-white rounded-xl p-5 shadow-lg">
             <div className="flex justify-between text-xs font-mono mb-3 uppercase tracking-wider">
               <span>{state.isUploading ? 'Uploading' : 'Processing AI'}</span>
               <span>{Math.round(state.progress)}%</span>
             </div>
             <div className="h-1 bg-white/20 rounded-full overflow-hidden">
               <div 
                 className="h-full bg-white transition-all duration-300 ease-out"
                 style={{ width: `${state.progress}%` }}
               />
             </div>
          </div>
        )}
      </div>

      {/* Right Column: Preview Canvas */}
      <div className="lg:col-span-9 bg-[#F3F3F3] rounded-2xl border border-gray-200 relative overflow-hidden flex items-center justify-center order-1 lg:order-2 p-8">
        
        {/* Canvas Container */}
        <div className="relative shadow-2xl rounded-lg overflow-hidden max-h-full max-w-full bg-white">
            <div 
            className="absolute inset-0 transition-all duration-300"
            style={renderBackgroundPreview()}
            />

            {videoUrl && (
                <video 
                    ref={videoRef}
                    src={videoUrl} 
                    className={`relative z-10 block max-h-[70vh] w-auto ${mode === BackgroundMode.BLUR ? 'blur-md' : ''}`}
                    controls
                    playsInline
                    loop
                    autoPlay
                />
            )}
        </div>
        
        {state.isComplete && (
            <div className="absolute top-6 right-6 z-20 bg-black/80 text-white text-xs font-bold px-4 py-2 rounded-full flex items-center backdrop-blur-md">
                <Icons.Check className="w-3 h-3 mr-2" />
                AI Processing Complete
            </div>
        )}

      </div>
    </div>
  );
};