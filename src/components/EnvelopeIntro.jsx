import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';

export default function EnvelopeIntro({ onOpen }) {
  const [isOpen, setIsOpen] = useState(false);

  const handleOpen = (e) => {
    if (e) {
      e.stopPropagation();
    }
    if (isOpen) return;
    setIsOpen(true);

    // Cerise Pink & Magenta Sparkles Explosion
    confetti({
      particleCount: 100,
      spread: 110,
      origin: { y: 0.5 },
      colors: ['#E65C8A', '#FFD6E5', '#F596AA', '#3D061A', '#FFF0F5']
    });

    // Notify parent after light rays expand
    setTimeout(() => {
      onOpen();
    }, 1500);
  };

  return (
    <motion.div 
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 1.08, transition: { duration: 0.8, ease: "easeInOut" } }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-[#180104] overflow-hidden select-none"
    >
      {/* Full-Screen Velvet Envelope Container */}
      <div className="relative w-full h-full overflow-hidden flex items-center justify-center bg-black">
        
        {/* Pure Photographic Velvet Envelope Image (Only the original envelope photograph) */}
        <img 
          src="/velvet-envelope.png" 
          alt="Real Royal Plush Velvet Envelope" 
          className="absolute inset-0 w-full h-full object-cover object-center filter contrast-[1.05] brightness-[1.02]"
        />

        {/* Subtle Dark Vignette Overlay for Contrast */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-black/50 pointer-events-none" />
        
        {/* Invisible Interactive Click/Touch Target directly over the Envelope Seal */}
        {!isOpen && (
          <button 
            onClick={handleOpen}
            onTouchEnd={handleOpen}
            aria-label="Open Invitation Wax Seal"
            className="absolute top-[50%] left-[50%] -translate-x-1/2 -translate-y-1/2 w-28 h-28 sm:w-36 sm:h-36 rounded-full z-40 cursor-pointer focus:outline-none opacity-0"
          />
        )}

        {/* Radiant Cerise Pink Sunburst Beams (Explodes on Open) */}
        <AnimatePresence>
          {isOpen && (
            <motion.div 
              initial={{ opacity: 0, scale: 0.2 }}
              animate={{ opacity: [0, 0.95, 1], scale: [0.3, 2.5, 6] }}
              transition={{ duration: 1.4, ease: "easeOut" }}
              className="absolute z-30 pointer-events-none flex items-center justify-center"
            >
              {/* Glowing Cerise Pink Core */}
              <div className="w-[600px] h-[600px] rounded-full bg-radial from-[#FFF0F5] via-[#E65C8A]/85 to-transparent blur-xl" />
              
              {/* 16 Rotating Sunburst Light Rays */}
              <svg viewBox="0 0 200 200" className="absolute w-[1000px] h-[1000px] animate-spin-slow opacity-90 text-[#E65C8A] fill-current">
                {[...Array(16)].map((_, i) => (
                  <polygon key={i} points="100,100 93,0 107,0" transform={`rotate(${i * 22.5} 100 100)`} />
                ))}
              </svg>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Clean Instruction Banner at Bottom */}
        <AnimatePresence>
          {!isOpen && (
            <motion.div 
              animate={{ opacity: [0.6, 1, 0.6] }}
              transition={{ repeat: Infinity, duration: 2 }}
              className="absolute bottom-8 left-0 right-0 z-40 text-center px-4 flex items-center justify-center pointer-events-none"
            >
              <p className="font-serif text-[11px] sm:text-xs uppercase tracking-[0.35em] text-[#FFF0F5] font-semibold flex items-center justify-center drop-shadow-[0_2px_8px_rgba(0,0,0,0.9)] bg-black/60 py-2.5 px-6 rounded-full border border-[#E6A4B4]/50 backdrop-blur-md">
                Tap Wax Seal to Open Invitation
              </p>
            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </motion.div>
  );
}
