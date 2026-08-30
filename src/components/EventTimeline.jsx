import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { weddingData } from '../config/weddingData';
import { Clock, MapPin, Sparkles } from 'lucide-react';

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
    <section className="relative w-full bg-[#4A040F] text-[#FAF8F5] py-16 px-4">
      
      {/* Section Header */}
      <div className="text-center max-w-md mx-auto mb-16">
        <span className="font-sans text-xs uppercase tracking-[0.3em] text-[#D4AF37] font-semibold block mb-2">
          Itinerary
        </span>
        <h2 className="font-script text-5xl sm:text-6xl text-[#F3E5AB]">
          Schedule of Events
        </h2>
        <div className="w-16 h-0.5 bg-[#D4AF37] mx-auto mt-3 rounded-full opacity-60" />
      </div>

      <div ref={containerRef} className="max-w-md mx-auto relative">
        
        {/* Central Champagne Gold Vertical Line */}
        <div className="absolute left-6 sm:left-1/2 top-4 bottom-4 w-[2px] bg-gradient-to-b from-[#D4AF37]/40 via-[#D4AF37] to-[#D4AF37]/40 -translate-x-1/2 pointer-events-none">
          
          {/* Scroll-driven White Lotus Traveling Node */}
          <motion.div 
            style={{ top: lotusTop }}
            className="absolute -left-5 -translate-y-1/2 z-30 pointer-events-none flex items-center justify-center"
          >
            <div className="relative w-12 h-12 flex items-center justify-center">
              {/* Soft gold halo glow */}
              <div className="absolute inset-0 rounded-full bg-[#D4AF37]/60 blur-md animate-pulse" />

              {/* User's White Lotus Image Asset */}
              <img 
                src="/lotus.png" 
                alt="White Lotus" 
                className="w-11 h-11 object-contain relative z-10 filter drop-shadow-[0_4px_12px_rgba(212,175,55,0.85)] hover:scale-110 transition-transform"
              />
            </div>
          </motion.div>


        </div>



        {/* Loop Days */}
        {weddingData.schedule.map((dayGroup, groupIndex) => (
          <div key={dayGroup.dayTitle} className="mb-16 last:mb-0">
            
            {/* Day Title Header Banner */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="sticky top-4 z-20 flex justify-center mb-8"
            >
              <div className="bg-[#310209]/60 border border-[#D4AF37]/55 text-[#D4AF37] px-8 py-2.5 rounded-full shadow-lg backdrop-blur-md flex items-center justify-center">
                <div className="text-center">
                  <span className="font-serif font-bold text-xs sm:text-sm tracking-[0.2em] uppercase block leading-none">
                    {dayGroup.dayTitle}
                  </span>
                  <span className="font-sans text-[9px] text-[#FAF8F5]/80 uppercase tracking-[0.25em] block mt-1.5">
                    {dayGroup.dayOfWeek}
                  </span>
                </div>
              </div>
            </motion.div>

            {/* Day Events */}
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
                    {/* Solid Gold Diamond Marker */}
                    <div className="absolute left-6 sm:left-1/2 -translate-x-1/2 z-10 flex items-center justify-center">
                      <div className="w-3.5 h-3.5 bg-[#D4AF37] rotate-45 shadow-[0_0_8px_rgba(212,175,55,0.6)]" />
                    </div>

                    {/* Event Content Card */}
                    <div className={`w-full pl-14 sm:pl-0 sm:w-1/2 ${isEven ? 'sm:pr-10 sm:text-right' : 'sm:ml-auto sm:pl-10'}`}>


                      <div className="bg-[#310209]/90 border border-[#D4AF37]/40 rounded-xl p-5 shadow-xl hover:border-[#D4AF37] transition-all group">
                        
                        {/* Event Number & Time */}
                        <div className={`flex items-center gap-2 mb-2 text-[#D4AF37] text-xs font-semibold ${isEven ? 'sm:justify-end' : ''}`}>
                          <span className="font-serif text-sm opacity-60">
                            {event.number} &bull;
                          </span>
                          <span className="inline-flex items-center gap-1 bg-[#4A040F] px-2.5 py-0.5 rounded-full border border-[#D4AF37]/30">
                            <Clock className="w-3 h-3 text-[#D4AF37]" />
                            {event.time}
                          </span>
                        </div>

                        {/* Title */}
                        <h3 className={`font-serif text-lg font-bold text-[#F3E5AB] mb-1 ${event.title.includes("WEDDING") ? 'text-xl text-[#D4AF37] tracking-wider' : ''}`}>
                          {event.title}
                        </h3>

                        {/* Location */}
                        <div className={`flex items-center gap-1 text-xs text-[#FAF8F5]/80 mb-2 ${isEven ? 'sm:justify-end' : ''}`}>
                          <MapPin className="w-3 h-3 text-[#D4AF37] shrink-0" />
                          <span>{event.location}</span>
                        </div>

                        {/* Description */}
                        <p className="font-sans text-xs text-[#FAF8F5]/70 leading-relaxed">
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
