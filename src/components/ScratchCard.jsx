import React, { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';

function ScratchHeart({ hiddenText, label, onReveal }) {
  const canvasRef = useRef(null);
  const containerRef = useRef(null);
  const [isRevealed, setIsRevealed] = useState(false);
  const [isDrawing, setIsDrawing] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const width = 110;
    const height = 100;
    canvas.width = width;
    canvas.height = height;

    // Fill cover canvas with classy champagne-gold foil texture
    ctx.clearRect(0, 0, width, height);

    const gradient = ctx.createLinearGradient(0, 0, width, height);
    gradient.addColorStop(0, '#D4AF37');
    gradient.addColorStop(0.3, '#FAF8F5');
    gradient.addColorStop(0.5, '#F3E5AB');
    gradient.addColorStop(0.8, '#D4AF37');
    gradient.addColorStop(1, '#AA820A');

    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, width, height);

    // Minimal elegant label in the center
    ctx.fillStyle = '#8B3A2B';
    ctx.font = '600 9px Montserrat, sans-serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText('SCRATCH', width / 2, height / 2);
  }, []);

  const getCoordinates = (e) => {
    const canvas = canvasRef.current;
    if (!canvas) return null;
    const rect = canvas.getBoundingClientRect();
    
    const clientX = e.touches ? e.touches[0].clientX : e.clientX;
    const clientY = e.touches ? e.touches[0].clientY : e.clientY;
    
    return {
      x: clientX - rect.left,
      y: clientY - rect.top
    };
  };

  const scratch = (e) => {
    const canvas = canvasRef.current;
    if (!canvas || isRevealed) return;
    const ctx = canvas.getContext('2d');
    const coords = getCoordinates(e);
    if (!coords || !ctx) return;

    ctx.globalCompositeOperation = 'destination-out';
    ctx.beginPath();
    ctx.arc(coords.x, coords.y, 16, 0, Math.PI * 2);
    ctx.fill();

    checkRevealPercentage();
  };

  const checkRevealPercentage = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    const pixels = imgData.data;
    let transparentCount = 0;
    
    for (let i = 3; i < pixels.length; i += 4) {
      if (pixels[i] === 0) {
        transparentCount++;
      }
    }

    const totalPixels = canvas.width * canvas.height;
    const transparentRatio = transparentCount / totalPixels;

    // Trigger complete reveal once 35% is cleared
    if (transparentRatio > 0.35) {
      setIsRevealed(true);
      if (onReveal) onReveal();
    }
  };

  const handleStart = (e) => {
    setIsDrawing(true);
    scratch(e);
  };

  const handleMove = (e) => {
    if (!isDrawing) return;
    if (e.cancelable) e.preventDefault();
    scratch(e);
  };

  const handleEnd = () => {
    setIsDrawing(false);
  };

  return (
    <div className="flex flex-col items-center select-none">
      
      {/* Heart Container (Clipped to SVG Heart Shape) */}
      <div 
        ref={containerRef}
        className="relative w-[110px] h-[100px] cursor-pointer pointer-events-auto overflow-hidden shadow-sm hover:scale-[1.02] active:scale-98 transition-transform"
        style={{ clipPath: 'url(#heart-clip)' }}
        onTouchStart={handleStart}
        onTouchMove={handleMove}
        onTouchEnd={handleEnd}
        onMouseDown={handleStart}
        onMouseMove={handleMove}
        onMouseUp={handleEnd}
        onMouseLeave={handleEnd}
      >
        {/* Revealed Content Card (Classy White Heart from Screenshot) */}
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-[#FAF8F5] border border-[#D4AF37]/20">
          <span className="font-sans text-[8px] uppercase tracking-widest text-[#8B3A2B]/60 font-semibold mb-1">
            {label}
          </span>
          <span className="font-serif text-2xl font-bold text-[#8B3A2B] leading-none">
            {hiddenText}
          </span>
        </div>

        {/* Scratchable Gold Canvas Overlay */}
        <AnimatePresence>
          {!isRevealed && (
            <motion.canvas
              ref={canvasRef}
              exit={{ opacity: 0, scale: 0.95, transition: { duration: 0.3 } }}
              className="absolute inset-0 z-20 touch-none pointer-events-none"
            />
          )}
        </AnimatePresence>
      </div>

    </div>
  );
}

export default function ScratchCard() {
  const [revealedCount, setRevealedCount] = useState(0);

  const handleHeartReveal = () => {
    // Trigger small confetti burst on individual scratch reveal
    confetti({
      particleCount: 40,
      spread: 50,
      origin: { y: 0.75 },
      colors: ['#D4AF37', '#8B3A2B', '#FAF8F5', '#AA820A']
    });

    setRevealedCount(prev => {
      const nextCount = prev + 1;
      if (nextCount === 3) {
        // Trigger major celebratory explosion once all three are revealed!
        setTimeout(triggerCelebrationConfetti, 400);
      }
      return nextCount;
    });
  };

  const triggerCelebrationConfetti = () => {
    const end = Date.now() + (2.5 * 1000);
    const colors = ['#D4AF37', '#8B3A2B', '#FAF8F5', '#AA820A'];

    (function frame() {
      confetti({
        particleCount: 5,
        angle: 60,
        spread: 55,
        origin: { x: 0, y: 0.8 },
        colors: colors
      });
      confetti({
        particleCount: 5,
        angle: 120,
        spread: 55,
        origin: { x: 1, y: 0.8 },
        colors: colors
      });

      if (Date.now() < end) {
        requestAnimationFrame(frame);
      }
    }());
  };

  return (
    <div className="w-full flex flex-col items-center py-2">
      {/* SVG Clip Path definition */}
      <svg width="0" height="0" className="absolute">
        <defs>
          <clipPath id="heart-clip" clipPathUnits="objectBoundingBox">
            <path d="M 0.5, 0.88 C 0.1, 0.63, 0, 0.38, 0.15, 0.16 C 0.3, -0.05, 0.5, 0.12, 0.5, 0.12 C 0.5, 0.12, 0.7, -0.05, 0.85, 0.16 C 1.0, 0.38, 0.9, 0.63, 0.5, 0.88 Z" />
          </clipPath>
        </defs>
      </svg>

      {/* Classy Side-by-Side Hearts */}
      <div className="flex justify-center gap-3 py-1">
        <ScratchHeart label="DAY" hiddenText="25" onReveal={handleHeartReveal} />
        <ScratchHeart label="MONTH" hiddenText="Oct" onReveal={handleHeartReveal} />
        <ScratchHeart label="YEAR" hiddenText="2026" onReveal={handleHeartReveal} />
      </div>
    </div>
  );
}
