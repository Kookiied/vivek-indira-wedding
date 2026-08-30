import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { weddingData } from '../config/weddingData';
import { Clock, MapPin } from 'lucide-react';

export default function EventTimeline() {
  const containerRef = useRef(null);

  // Track scroll position as user scrolls through the schedule section
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 85%", "end 15%"]
  });

  // Smooth out progress with spring physics
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 24,
    restDelta: 0.001
  });

  // Map progress to percentage along vertical line
  const lotusTop = useTransform(smoothProgress, [0, 1], ["0%", "100%"]);

  return (
    <section className="relative w-full bg-[#5E0B2B] text-[#FFF0F5] py-16 px-2 sm:px-4">
      
      {/* Section Header */}
      <div className="text-center max-w-md mx-auto mb-16">
        <span className="font-sans text-xs uppercase tracking-[0.3em] text-[#F8C8DC] font-semibold block mb-2">
          Itinerary
        </span>
        <h2 className="font-script text-5xl sm:text-6xl text-[#F8C8DC]">
          Schedule of Events
        </h2>
        <div className="w-16 h-0.5 bg-[#E6A4B4] mx-auto mt-3 rounded-full opacity-60" />
      </div>

      <div ref={containerRef} className="max-w-lg mx-auto relative">
        
        {/* Central Rose Gold Vertical Line (Centered on all screens) */}
        <div className="absolute left-1/2 top-4 bottom-4 w-[2px] bg-gradient-to-b from-[#E6A4B4]/40 via-[#E6A4B4] to-[#E6A4B4]/40 -translate-x-1/2 pointer-events-none">
          
          {/* Scroll-driven White Lotus Traveling Node */}
          <motion.div 
            style={{ top: lotusTop }}
            className="absolute -left-5 -translate-y-1/2 z-30 pointer-events-none flex items-center justify-center"
          >
            <div className="relative w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center">
              {/* Soft pink halo glow */}
              <div className="absolute inset-0 rounded-full bg-[#E6A4B4]/60 blur-md animate-pulse" />

              {/* White Lotus Image Asset */}
              <img 
                src="/lotus.png" 
                alt="White Lotus" 
                className="w-9 h-9 sm:w-11 sm:h-11 object-contain relative z-10 filter drop-shadow-[0_4px_12px_rgba(230,164,180,0.85)] hover:scale-110 transition-transform"
              />
            </div>
          </motion.div>

        </div>

        {/* Loop Days */}
        {weddingData.schedule.map((dayGroup) => (
          <div key={dayGroup.dayTitle} className="mb-16 last:mb-0">
            
            {/* Day Title Header Banner */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="sticky top-4 z-20 flex justify-center mb-8"
            >
              <div className="bg-[#3D061A]/90 border border-[#E6A4B4]/60 text-[#F8C8DC] px-6 sm:px-8 py-2.5 rounded-full shadow-lg backdrop-blur-md flex items-center justify-center">
                <div className="text-center">
                  <span className="font-serif font-bold text-xs sm:text-sm tracking-[0.2em] uppercase block leading-none">
                    {dayGroup.dayTitle}
                  </span>
                  <span className="font-sans text-[9px] text-[#FFF0F5]/80 uppercase tracking-[0.25em] block mt-1.5">
                    {dayGroup.dayOfWeek}
                  </span>
                </div>
              </div>
            </motion.div>

            {/* Day Events - Alternating Left & Right on ALL devices */}
            <div className="space-y-10">
              {dayGroup.events.map((event, eventIdx) => {
                const isEven = eventIdx % 2 === 0;

                return (
                  <motion.div 
                    key={event.id}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: eventIdx * 0.1 }}
                    className="relative flex items-center"
                  >
                    {/* Smaller Solid Rose Gold Diamond Marker */}
                    <div className="absolute left-1/2 -translate-x-1/2 z-10 flex items-center justify-center">
                      <div className="w-2 h-2 sm:w-2.5 sm:h-2.5 bg-[#E6A4B4] rotate-45 shadow-[0_0_6px_rgba(230,164,180,0.8)]" />
                    </div>

                    {/* Event Content Card (Alternating Left & Right on mobile and desktop) */}
                    <div className={`w-1/2 ${isEven ? 'pr-3 sm:pr-8 text-right' : 'ml-auto pl-3 sm:pl-8 text-left'}`}>

                      <div className="bg-[#3D061A]/90 border border-[#E6A4B4]/40 rounded-xl p-3 sm:p-5 shadow-xl hover:border-[#E6A4B4] transition-all group">
                        
                        {/* Event Number & Time */}
                        <div className={`flex items-center gap-1.5 mb-1.5 text-[#F8C8DC] text-[10px] sm:text-xs font-semibold ${isEven ? 'justify-end' : 'justify-start'}`}>
                          <span className="font-serif opacity-60">
                            {event.number} &bull;
                          </span>
                          <span className="inline-flex items-center gap-1 bg-[#5E0B2B] px-2 py-0.5 rounded-full border border-[#E6A4B4]/30 text-[10px] sm:text-xs">
                            <Clock className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-[#F8C8DC]" />
                            {event.time}
                          </span>
                        </div>

                        {/* Title */}
                        <h3 className={`font-serif text-sm sm:text-lg font-bold text-[#F8C8DC] mb-1 ${event.title.includes("WEDDING") ? 'text-base sm:text-xl text-[#F8C8DC] tracking-wider' : ''}`}>
                          {event.title}
                        </h3>

                        {/* Location */}
                        <div className={`flex items-center gap-1 text-[10px] sm:text-xs text-[#FFF0F5]/80 mb-1.5 ${isEven ? 'justify-end' : 'justify-start'}`}>
                          <MapPin className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-[#E6A4B4] shrink-0" />
                          <span>{event.location}</span>
                        </div>

                        {/* Description */}
                        <p className="font-sans text-[10px] sm:text-xs text-[#FFF0F5]/70 leading-relaxed">
                          {event.description}
                        </p>

                      </div>
                    </div>

                  </motion.div>
                );
              })}
            </div>

          </div>
        ))}

      </div>

    </section>
  );
}
