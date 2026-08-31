import React from 'react';
import { motion } from 'framer-motion';

export default function FallingFlora() {
  // Collection of falling sunflowers, pink flowers, and green leaves
  const flora = [
    { id: 1, emoji: '🌸', left: '5%', duration: 25, delay: 0, size: 'text-2xl', xOffset: 30 },
    { id: 2, emoji: '🌻', left: '25%', duration: 28, delay: 5, size: 'text-3xl', xOffset: -40 },
    { id: 3, emoji: '🍃', left: '40%', duration: 22, delay: 2, size: 'text-xl', xOffset: 25 },
    { id: 4, emoji: '🌺', left: '55%', duration: 26, delay: 8, size: 'text-2xl', xOffset: -35 },
    { id: 5, emoji: '🌿', left: '70%', duration: 24, delay: 3, size: 'text-xl', xOffset: 30 },
    { id: 6, emoji: '🌻', left: '85%', duration: 29, delay: 7, size: 'text-3xl', xOffset: -30 },
    { id: 7, emoji: '🌸', left: '15%', duration: 27, delay: 10, size: 'text-xl', xOffset: 45 },
    { id: 8, emoji: '🍃', left: '80%', duration: 25, delay: 12, size: 'text-2xl', xOffset: -25 },
    { id: 9, emoji: '🌺', left: '95%', duration: 23, delay: 6, size: 'text-xl', xOffset: 35 },
  ];

  return (
    <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
      
      {/* Falling Flowers & Leaves */}
      {flora.map((item) => (
        <motion.div
          key={item.id}
          className={`absolute ${item.size} drop-shadow-md opacity-80`}
          style={{ left: item.left }}
          initial={{ top: '-10%' }}
          animate={{ 
            top: ['-10%', '110%'],
            rotate: [0, 360],
            x: [0, item.xOffset, 0, -item.xOffset, 0]
          }}
          transition={{
            top: { duration: item.duration, delay: item.delay, repeat: Infinity, ease: 'linear' },
            rotate: { duration: item.duration * 0.5, delay: item.delay, repeat: Infinity, ease: 'linear' },
            x: { duration: item.duration * 0.3, delay: item.delay, repeat: Infinity, ease: 'easeInOut' }
          }}
        >
          {item.emoji}
        </motion.div>
      ))}

      {/* Blue Butterfly flying in 'W' shape across the container */}
      <motion.div
        className="absolute text-3xl sm:text-4xl drop-shadow-lg z-10"
        initial={{ left: '-15%', top: '20%' }}
        animate={{
          left: ['-15%', '25%', '50%', '75%', '115%'],
          top: ['20%', '50%', '10%', '60%', '15%'], // The 'W' pattern relative to container height!
        }}
        transition={{
          duration: 18,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      >
        {/* Fluttering wings effect */}
        <motion.div
          animate={{ rotate: [-20, 20, -20], scale: [1, 1.2, 1] }}
          transition={{ duration: 0.3, repeat: Infinity, ease: 'linear' }}
        >
          🦋
        </motion.div>
      </motion.div>
    </div>
  );
}
