import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { weddingData } from '../config/weddingData';
import WhimsicalButterflies from './WhimsicalButterflies';
import { Sliders, X } from 'lucide-react';

/* 
 * DEVELOPER TOGGLE FOR LIVE POSITION & SIZE CONTROLLER:
 * Set ENABLE_DEV_CONTROLLER to true anytime in the future to reactivate the on-screen live slider widget!
 */
const ENABLE_DEV_CONTROLLER = true;

export default function Hero() {
  const [showTuner, setShowTuner] = useState(false);

  // Permanently Locked Layout & Font Size Values
  const [layout, setLayout] = useState({
    mantraTop: 106,          // Mantra position from top (px)
    topPadding: 62,          // Section top distance (px)
    nameFontSize: 86,        // Vivek & Indira name font size (px)
    vivekParentGap: -3,      // Vivek family text top margin (px)
    vivekParentSize: 11,     // Vivek family text font size (px)
    wedsGap: 30,             // Gap around Weds separator (px)
    indiraParentGap: 30,     // Indira family text top margin (px)
    indiraParentSize: 11     // Indira family text font size (px)
  });

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

      {/* S.B.D Monograms & Golden Ganesha Icon at Upper Bar */}
      <div className="absolute top-4 sm:top-6 left-0 right-0 z-20 flex justify-between items-center px-6 sm:px-10 pointer-events-none">
        <span className="font-serif text-sm sm:text-base md:text-lg font-black tracking-normal text-[#E65C8A] drop-shadow-[0_3px_8px_rgba(0,0,0,0.95)] uppercase">
          S.B.D
        </span>

        {/* Traditional Gold Ganesha Symbol (Positioned Above Mantra in the Mid) */}
        <div className="flex flex-col items-center pt-1">
          <img 
            src="/ganesha-reference.png" 
            alt="Lord Ganesha" 
            className="w-12 h-14 sm:w-16 sm:h-18 object-contain filter drop-shadow-[0_4px_12px_rgba(0,0,0,0.95)]"
          />
        </div>

        <span className="font-serif text-sm sm:text-base md:text-lg font-black tracking-normal text-[#E65C8A] drop-shadow-[0_3px_8px_rgba(0,0,0,0.95)] uppercase">
          S.B.D
        </span>
      </div>

      {/* Sanskrit Mantra (Locked at 106px) */}
      <div 
        className="absolute left-0 right-0 z-20 px-4 text-center pointer-events-none transition-all duration-75"
        style={{ top: `${layout.mantraTop}px` }}
      >
        <p className="font-serif text-[11px] sm:text-xs text-[#E65C8A] tracking-wide max-w-xs sm:max-w-sm mx-auto drop-shadow-[0_3px_8px_rgba(0,0,0,0.95)] font-bold leading-relaxed">
          वक्रतुण्ड महाकाय सूर्यकोटि समप्रभः ।<br />
          निर्विघ्नं कुरु में देव, सर्व कार्येषु सर्वदा ॥
        </p>
      </div>

      {/* Main Couple Names & Announcement (Locked at 62px Section Top Distance) */}
      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.2, delay: 0.3 }}
        className="relative z-20 px-6 my-auto pb-2 max-w-lg w-full flex flex-col items-center transition-all duration-75"
        style={{ paddingTop: `${layout.topPadding}px` }}
      >
        {/* Groom: Vivek */}
        <div className="mb-0 text-center w-full">
          <h1 
            className="font-script text-gold-gradient font-normal tracking-wide drop-shadow-[0_6px_14px_rgba(0,0,0,0.95)] py-0 px-3 leading-tight transition-all duration-75"
            style={{ fontSize: `${layout.nameFontSize}px` }}
          >
            Vivek
          </h1>
          <p 
            className="font-sans uppercase tracking-widest text-[#FFF0F5] drop-shadow-[0_2.5px_6px_rgba(0,0,0,0.95)] font-extrabold leading-relaxed transition-all duration-75"
            style={{ 
              marginTop: `${layout.vivekParentGap}px`,
              fontSize: `${layout.vivekParentSize}px`
            }}
          >
            Grand S/o Mrs. Devi Rani Raitani & Late Duni Chand Raitani<br />
            S/o Mrs. Renu Raitani & Mr. Chetan Raitani
          </p>
        </div>

        {/* Weds Separator (Locked at 30px Gap) */}
        <div 
          className="flex items-center justify-center gap-4 w-5/6 transition-all duration-75"
          style={{ marginTop: `${layout.wedsGap}px`, marginBottom: `${layout.wedsGap}px` }}
        >
          <div className="h-px flex-1 bg-gradient-to-r from-transparent via-[#F596AA] to-[#FFD6E5]" />
          <span className="font-serif text-base sm:text-lg text-[#FFD6E5] drop-shadow-[0_3px_6px_rgba(0,0,0,0.95)] font-bold tracking-widest uppercase">
            Weds
          </span>
          <div className="h-px flex-1 bg-gradient-to-l from-transparent via-[#F596AA] to-[#FFD6E5]" />
        </div>

        {/* Bride: Indira */}
        <div className="mb-2 text-center w-full">
          <h1 
            className="font-script text-gold-gradient font-normal tracking-wide drop-shadow-[0_6px_14px_rgba(0,0,0,0.95)] py-0 px-3 leading-tight transition-all duration-75"
            style={{ fontSize: `${layout.nameFontSize}px` }}
          >
            Indira
          </h1>
          <p 
            className="font-sans uppercase tracking-widest text-[#FFF0F5] drop-shadow-[0_2.5px_6px_rgba(0,0,0,0.95)] font-extrabold leading-relaxed transition-all duration-75"
            style={{ 
              marginTop: `${layout.indiraParentGap}px`,
              fontSize: `${layout.indiraParentSize}px`
            }}
          >
            Grand D/o Late Sushila Devi Lakhmani & Late Lal Chand Lakhmani<br />
            D/o Mrs. Ratna Lakhmani & Mr. Kanhaiya Lal Lakhmani
          </p>
        </div>

        <div className="w-12 h-0.5 bg-[#F596AA]/70 mx-auto my-2 rounded-full opacity-70" />
        <p className="font-serif text-[11px] tracking-[0.2em] text-[#FFF0F5]/90 uppercase font-semibold drop-shadow-[0_2px_4px_rgba(0,0,0,0.9)]">
          {weddingData.venue.name} &bull; {weddingData.venue.city}
        </p>
      </motion.div>

      {/* Transparent Bottom Spacer */}
      <div className="h-6 w-full z-20 pointer-events-none" />

      {/* PRESERVED IN CODEBASE: Live Size & Position Controller Widget */}
      {ENABLE_DEV_CONTROLLER && (
        <>
          <div className="fixed bottom-4 right-4 z-50">
            <button
              onClick={() => setShowTuner(!showTuner)}
              className="flex items-center gap-2 px-4 py-2.5 rounded-full bg-[#5E0B2B] text-[#F8C8DC] border-2 border-[#E6A4B4] font-sans text-xs font-bold shadow-2xl hover:scale-105 transition-all cursor-pointer"
            >
              <Sliders className="w-4 h-4 text-[#F8C8DC]" />
              <span>{showTuner ? 'Close Controller' : '🎛️ Adjust Size & Position'}</span>
            </button>
          </div>

          <AnimatePresence>
            {showTuner && (
              <motion.div
                initial={{ opacity: 0, y: 50, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 50, scale: 0.95 }}
                className="fixed bottom-16 right-4 left-4 sm:left-auto sm:w-84 z-50 bg-[#3D061A]/95 backdrop-blur-xl border-2 border-[#E6A4B4] rounded-2xl p-4 text-[#FFF0F5] shadow-2xl flex flex-col gap-2.5 text-left max-h-[80vh] overflow-y-auto"
              >
                <div className="flex items-center justify-between border-b border-[#E6A4B4]/40 pb-2 sticky top-0 bg-[#3D061A] z-10 pt-1">
                  <span className="font-serif text-xs font-bold text-[#F8C8DC] uppercase tracking-wider">
                    🎛️ Size & Position Controller
                  </span>
                  <button 
                    onClick={() => setShowTuner(false)}
                    className="text-[#F8C8DC] hover:text-white p-1"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>

                {/* Sliders */}
                <div>
                  <div className="flex justify-between text-[10px] font-bold text-[#F8C8DC] mb-1">
                    <span>1. Section Top Position</span>
                    <span>{layout.topPadding}px</span>
                  </div>
                  <input 
                    type="range" 
                    min="-20" 
                    max="200" 
                    value={layout.topPadding} 
                    onChange={(e) => setLayout({ ...layout, topPadding: Number(e.target.value) })}
                    className="w-full accent-[#F596AA] cursor-pointer"
                  />
                </div>

                <div>
                  <div className="flex justify-between text-[10px] font-bold text-[#F8C8DC] mb-1">
                    <span>2. Couple Names Font Size</span>
                    <span>{layout.nameFontSize}px</span>
                  </div>
                  <input 
                    type="range" 
                    min="40" 
                    max="120" 
                    value={layout.nameFontSize} 
                    onChange={(e) => setLayout({ ...layout, nameFontSize: Number(e.target.value) })}
                    className="w-full accent-[#F596AA] cursor-pointer"
                  />
                </div>

                <div>
                  <div className="flex justify-between text-[10px] font-bold text-[#F8C8DC] mb-1">
                    <span>3. Vivek Family Text Gap</span>
                    <span>{layout.vivekParentGap}px</span>
                  </div>
                  <input 
                    type="range" 
                    min="-25" 
                    max="35" 
                    value={layout.vivekParentGap} 
                    onChange={(e) => setLayout({ ...layout, vivekParentGap: Number(e.target.value) })}
                    className="w-full accent-[#F596AA] cursor-pointer"
                  />
                </div>

                <div>
                  <div className="flex justify-between text-[10px] font-bold text-[#F8C8DC] mb-1">
                    <span>4. Vivek Family Text Font Size</span>
                    <span>{layout.vivekParentSize}px</span>
                  </div>
                  <input 
                    type="range" 
                    min="7" 
                    max="16" 
                    value={layout.vivekParentSize} 
                    onChange={(e) => setLayout({ ...layout, vivekParentSize: Number(e.target.value) })}
                    className="w-full accent-[#F596AA] cursor-pointer"
                  />
                </div>

                <div>
                  <div className="flex justify-between text-[10px] font-bold text-[#F8C8DC] mb-1">
                    <span>5. Weds Separator Gap</span>
                    <span>{layout.wedsGap}px</span>
                  </div>
                  <input 
                    type="range" 
                    min="0" 
                    max="45" 
                    value={layout.wedsGap} 
                    onChange={(e) => setLayout({ ...layout, wedsGap: Number(e.target.value) })}
                    className="w-full accent-[#F596AA] cursor-pointer"
                  />
                </div>

                <div>
                  <div className="flex justify-between text-[10px] font-bold text-[#F8C8DC] mb-1">
                    <span>6. Indira Family Text Gap</span>
                    <span>{layout.indiraParentGap}px</span>
                  </div>
                  <input 
                    type="range" 
                    min="-25" 
                    max="35" 
                    value={layout.indiraParentGap} 
                    onChange={(e) => setLayout({ ...layout, indiraParentGap: Number(e.target.value) })}
                    className="w-full accent-[#F596AA] cursor-pointer"
                  />
                </div>

                <div>
                  <div className="flex justify-between text-[10px] font-bold text-[#F8C8DC] mb-1">
                    <span>7. Indira Family Text Font Size</span>
                    <span>{layout.indiraParentSize}px</span>
                  </div>
                  <input 
                    type="range" 
                    min="7" 
                    max="16" 
                    value={layout.indiraParentSize} 
                    onChange={(e) => setLayout({ ...layout, indiraParentSize: Number(e.target.value) })}
                    className="w-full accent-[#F596AA] cursor-pointer"
                  />
                </div>

                <div>
                  <div className="flex justify-between text-[10px] font-bold text-[#F8C8DC] mb-1">
                    <span>8. Mantra Top Position</span>
                    <span>{layout.mantraTop}px</span>
                  </div>
                  <input 
                    type="range" 
                    min="20" 
                    max="140" 
                    value={layout.mantraTop} 
                    onChange={(e) => setLayout({ ...layout, mantraTop: Number(e.target.value) })}
                    className="w-full accent-[#F596AA] cursor-pointer"
                  />
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </>
      )}

    </section>
  );
}
