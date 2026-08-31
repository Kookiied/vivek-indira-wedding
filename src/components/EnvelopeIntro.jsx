import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';

// Toggle between animation styles. Options: 'outburst', 'lotus'
// We will add more options here later!
const ACTIVE_ANIMATION = 'lotus';

export default function EnvelopeIntro({ onOpen }) {
  const [isOpen, setIsOpen] = useState(false);

  const handleOpen = (e) => {
    if (e) {
      e.stopPropagation();
    }
    if (isOpen) return;
    setIsOpen(true);

    if (ACTIVE_ANIMATION === 'outburst') {
      // Cerise Pink & Magenta Sparkles Explosion
      confetti({
        particleCount: 100,
        spread: 110,
        origin: { y: 0.5 },
        colors: ['#E65C8A', '#FFD6E5', '#F596AA', '#3D061A', '#FFF0F5']
      });
    } else if (ACTIVE_ANIMATION === 'lotus') {
      // Lotus Petal Confetti Explosion
      confetti({
        particleCount: 150,
        spread: 360,
        startVelocity: 45,
        origin: { y: 0.5 },
        colors: ['#FFB6C1', '#FF69B4', '#FFF0F5', '#E6A4B4', '#F8C8DC'],
        shapes: ['circle', 'square'], // Mimics soft petals blowing away
        gravity: 0.6,
        scalar: 1.2,
        ticks: 200
      });
    }

    // Notify parent after animation expands
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

        <AnimatePresence>
          {isOpen && ACTIVE_ANIMATION === 'outburst' && (
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

          {isOpen && ACTIVE_ANIMATION === 'lotus' && (
            <motion.div 
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: [0, 1, 1, 0], scale: [0, 1.5, 4, 8], rotate: [0, 90, 180] }}
              transition={{ duration: 1.8, ease: "easeInOut" }}
              className="absolute z-30 pointer-events-none flex items-center justify-center"
            >
              {/* Glowing Rose Gold Core */}
              <div className="absolute w-[400px] h-[400px] rounded-full bg-[#E6A4B4]/40 blur-3xl" />
              
              {/* Intricate SVG Mandala / Blooming Lotus */}
              <svg viewBox="0 0 200 200" className="absolute w-[600px] h-[600px] text-[#E6A4B4] fill-current opacity-90 drop-shadow-[0_0_25px_rgba(230,164,180,0.9)]">
                <g transform="translate(100,100)">
                  {/* Outer 12 Lotus Petals */}
                  {[...Array(12)].map((_, i) => (
                    <path key={`outer-${i}`} d="M0,0 C20,-40 20,-80 0,-100 C-20,-80 -20,-40 0,0" transform={`rotate(${i * 30})`} opacity="0.8"/>
                  ))}
                  {/* Inner 12 Lotus Petals */}
                  {[...Array(12)].map((_, i) => (
                    <path key={`inner-${i}`} d="M0,0 C15,-30 15,-60 0,-75 C-15,-60 -15,-30 0,0" transform={`rotate(${i * 30 + 15})`} fill="#FFF0F5" opacity="0.95"/>
                  ))}
                  {/* Core Divine Ring */}
                  <circle cx="0" cy="0" r="18" fill="#FFD6E5" className="animate-pulse" />
                </g>
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
