import React from 'react';
import { motion } from 'framer-motion';
import { weddingData } from '../config/weddingData';
import WhimsicalButterflies from './WhimsicalButterflies';

export default function Hero() {
  return (
    <section className="relative min-h-screen w-full flex flex-col items-center justify-between text-center overflow-hidden bg-[#3D061A]">
      
      {/* Background Palace Image (100% Pure Original Quality - Zero CSS filters or dark overlays) */}
      <div className="absolute inset-0 z-0">
        <img 
          src="/hero-bg.jpg" 
          alt="Raj Vilas Palace" 
          className="w-full h-full object-cover object-top"
          style={{ imageRendering: 'high-quality' }}
        />
        
        {/* Very subtle Downside Pink Shadow Overlay (Only at the bottom edge) */}
        <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-[#3D061A] via-[#5E0B2B]/20 to-transparent pointer-events-none" />
      </div>

      {/* Whimsical Animated Flying Butterflies Layer */}
      <WhimsicalButterflies />

      {/* S.B.D Monograms at Upper Bar */}
      <div className="absolute top-4 sm:top-6 left-0 right-0 z-20 flex justify-between items-center px-6 sm:px-10 pointer-events-none">
        <span className="font-serif text-sm sm:text-base md:text-lg font-black tracking-normal text-[#FFD6E5] drop-shadow-[0_3px_8px_rgba(0,0,0,0.95)] uppercase">
          S.B.D
        </span>

        <span className="font-serif text-sm sm:text-base md:text-lg font-black tracking-normal text-[#FFD6E5] drop-shadow-[0_3px_8px_rgba(0,0,0,0.95)] uppercase">
          S.B.D
        </span>
      </div>

      {/* Sanskrit Mantra at Upper Center (Locked at 89px) */}
      <div 
        className="absolute top-[89px] left-0 right-0 z-20 px-4 text-center pointer-events-none"
      >
        <p className="font-serif text-[11px] sm:text-xs text-[#FFD6E5] tracking-wide max-w-xs sm:max-w-sm mx-auto drop-shadow-[0_3px_8px_rgba(0,0,0,0.95)] font-bold leading-relaxed">
          वक्रतुण्ड महाकाय सूर्यकोटि समप्रभः ।<br />
          निर्विघ्नं कुरु में देव, सर्व कार्येषु सर्वदा ॥
        </p>
      </div>

      {/* Main Couple Names & Announcement (Locked at 28px Top Distance) */}
      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.2, delay: 0.3 }}
        className="relative z-20 px-6 my-auto pt-[28px] pb-2 max-w-lg w-full flex flex-col items-center"
      >
        {/* Groom: Vivek */}
        <div className="mb-0 text-center w-full">
          <h1 className="font-script text-7xl sm:text-8xl text-gold-gradient font-normal tracking-wide drop-shadow-[0_6px_14px_rgba(0,0,0,0.95)] py-0 px-3 leading-tight">
            Vivek
          </h1>
          <p 
            className="font-sans text-[9px] sm:text-[10px] uppercase tracking-widest text-[#FFF0F5] drop-shadow-[0_2px_5px_rgba(0,0,0,0.95)] font-bold leading-relaxed mt-[5px]"
          >
            Son of<br />
            Mr. Chetan Raitani & Mrs. Renu Raitani
          </p>
        </div>

        {/* Weds Separator (Locked at 30px Gap) */}
        <div 
          className="flex items-center justify-center gap-4 w-5/6 my-[30px]"
        >
          <div className="h-px flex-1 bg-gradient-to-r from-transparent via-[#F596AA] to-[#FFD6E5]" />
          <span className="font-serif text-base sm:text-lg text-[#FFD6E5] drop-shadow-[0_3px_6px_rgba(0,0,0,0.95)] font-bold tracking-widest uppercase">
            Weds
          </span>
          <div className="h-px flex-1 bg-gradient-to-l from-transparent via-[#F596AA] to-[#FFD6E5]" />
        </div>

        {/* Bride: Indira */}
        <div className="mb-2 text-center w-full">
          <h1 className="font-script text-7xl sm:text-8xl text-gold-gradient font-normal tracking-wide drop-shadow-[0_6px_14px_rgba(0,0,0,0.95)] py-0 px-3 leading-tight">
            Indira
          </h1>
          <p 
            className="font-sans text-[9px] sm:text-[10px] uppercase tracking-widest text-[#FFF0F5] drop-shadow-[0_2px_5px_rgba(0,0,0,0.95)] font-bold leading-relaxed mt-[25px]"
          >
            Daughter of<br />
            Mr. Kanhaiya Lal Lakhmani & Mrs. Ratna Lakhmani
          </p>
        </div>

        <div className="w-12 h-0.5 bg-[#F596AA]/70 mx-auto my-2 rounded-full opacity-70" />
        <p className="font-serif text-[11px] tracking-[0.2em] text-[#FFF0F5]/90 uppercase font-semibold drop-shadow-[0_2px_4px_rgba(0,0,0,0.9)]">
          {weddingData.venue.name} &bull; {weddingData.venue.city}
        </p>
      </motion.div>

      {/* Transparent Bottom Spacer */}
      <div className="h-6 w-full z-20 pointer-events-none" />

    </section>
  );
}
