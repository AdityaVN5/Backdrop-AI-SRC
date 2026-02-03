import React, { useState } from 'react';
import { Header } from './components/Header';
import { HeroBackground } from './components/HeroBackground';
import { Dropzone } from './components/Dropzone';
import { Editor } from './components/Editor';
import { Button } from './components/Button';
import { Icons } from './components/Icons';

function App() {
  const [file, setFile] = useState<File | null>(null);

  const handleStartCreating = () => {
    const desktopInput = document.getElementById('desktop-upload');
    const mobileInput = document.getElementById('mobile-upload');
    
    // Click the one that is likely visible or just try both
    if (desktopInput && desktopInput.offsetParent !== null) {
        desktopInput.click();
    } else {
        mobileInput?.click();
    }
  };

  return (
    <div className="min-h-screen flex flex-col font-sans text-backdrop-text bg-white selection:bg-black selection:text-white">
      <Header />

      <main className="flex-grow pt-24 px-4 pb-8">
        {!file ? (
          <div className="container mx-auto max-w-[1600px]">
            {/* Hero Card Container */}
            <div className="relative w-full min-h-[600px] md:h-[600px] rounded-3xl overflow-hidden shadow-2xl bg-black group flex flex-col">
                
                {/* Visual Background (Absolute) */}
                <div className="absolute inset-0">
                    <HeroBackground />
                </div>
                
                {/* Content Overlay */}
                <div className="relative z-20 flex-grow flex flex-col justify-end p-6 md:p-16 text-white pointer-events-none">
                    <div className="w-full max-w-3xl space-y-6 animate-in slide-in-from-bottom-10 fade-in duration-700 pointer-events-auto">
                        <h1 className="text-4xl md:text-7xl font-semibold tracking-tighter leading-tight">
                            Building AI to <br/>
                            Remove Backgrounds.
                        </h1>
                        <p className="text-base md:text-xl text-gray-300 max-w-xl">
                            A professional, open-source tool for video compositing. 
                            Remove backgrounds, replace green screens, and export with transparency.
                        </p>
                        
                        <div className="flex flex-col sm:flex-row items-start gap-4 pt-4">
                            <Button 
                                variant="white" 
                                className="h-12 px-8 text-base font-semibold w-full sm:w-auto"
                                onClick={handleStartCreating}
                            >
                                Start for free
                            </Button>
                        </div>
                    </div>

                    {/* Mobile Dropzone (integrated into Hero) */}
                    <div className="lg:hidden mt-8 w-full pointer-events-auto">
                        <Dropzone id="mobile-upload" onFileSelect={setFile} className="h-auto py-2 bg-white/10 backdrop-blur-md" />
                    </div>
                </div>

                {/* Desktop Dropzone (Absolute positioned) */}
                <div className="hidden lg:block absolute bottom-16 right-16 z-30 w-96 animate-in slide-in-from-right-10 fade-in delay-200 duration-700">
                    <Dropzone id="desktop-upload" onFileSelect={setFile} />
                </div>
            </div>

            {/* Feature Grid (Below Hero) */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-24 mb-16 px-4">
                {[
                    { title: 'AI-Powered Removal', desc: 'State-of-the-art models for precise segmentation.' },
                    { title: 'Green Screen', desc: 'Professional chroma key replacement in seconds.' },
                    { title: 'Privacy Focused', desc: 'Processing happens locally in your browser.' }
                ].map((feature, i) => (
                    <div key={i} className="space-y-3">
                        <div className="w-12 h-1 bg-black mb-4" />
                        <h3 className="text-xl font-bold tracking-tight">{feature.title}</h3>
                        <p className="text-gray-500 leading-relaxed">{feature.desc}</p>
                    </div>
                ))}
            </div>
          </div>
        ) : (
          <div className="container mx-auto max-w-[1600px] animate-in fade-in zoom-in-95 duration-500">
             <Editor file={file} onReset={() => setFile(null)} />
          </div>
        )}
      </main>
    </div>
  );
}

export default App;