import React, { useEffect, useState } from 'react';

export const HeroBackground: React.FC = () => {
  const [sliderPosition, setSliderPosition] = useState(50);

  useEffect(() => {
    const interval = setInterval(() => {
      setSliderPosition((prev) => {
        const time = Date.now() / 3000;
        return 50 + Math.sin(time) * 35; 
      });
    }, 16);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative w-full h-full overflow-hidden bg-black">
      {/* Background Video */}
      <video 
        autoPlay 
        muted 
        loop 
        playsInline
        className="absolute inset-0 w-full h-full object-cover opacity-80"
        src="https://joy1.videvo.net/videvo_files/video/free/2019-11/large_watermarked/190301_1_25_11_preview.mp4"
      />
      
      {/* Before/After Slider Effect */}
      <div 
        className="absolute inset-0 border-r border-white/50 backdrop-grayscale"
        style={{ 
            width: `${sliderPosition}%`,
            // Use a slight filter to distinguish the "processed" side if needed, 
            // or just rely on the checkerboard to show transparency
        }}
      >
        <div className="absolute inset-0 bg-black/40" /> {/* Darken original side */}
      </div>

      {/* The "Removed" side (Right side visually, but we are masking the left, so let's inverse logic visually) 
          Actually, let's make the LEFT side the "Processed" side (Transparent) and RIGHT side "Original"
      */}
      <div 
          className="absolute inset-0 bg-transparent border-r-2 border-white shadow-[0_0_30px_rgba(255,255,255,0.3)]"
          style={{ width: `${sliderPosition}%` }}
      >
           <div className="absolute inset-0 opacity-20"
              style={{
                  backgroundImage: `linear-gradient(45deg, #808080 25%, transparent 25%), 
                    linear-gradient(-45deg, #808080 25%, transparent 25%), 
                    linear-gradient(45deg, transparent 75%, #808080 75%), 
                    linear-gradient(-45deg, transparent 75%, #808080 75%)`,
                  backgroundSize: '20px 20px',
                  backgroundPosition: '0 0, 0 10px, 10px -10px, -10px 0px'
              }}
           />
           {/* Re-render video here if we wanted 'perfect' sync, but for bg visual this is okay */}
      </div>

      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />
    </div>
  );
};