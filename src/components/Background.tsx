import { motion, AnimatePresence } from 'motion/react';
import { Mood } from '../types';
import { MOOD_CONFIGS } from '../constants';

interface BackgroundProps {
  mood: Mood;
}

export function Background({ mood }: BackgroundProps) {
  const config = MOOD_CONFIGS[mood];

  return (
    <div className="fixed inset-0 -z-10 overflow-hidden bg-black">
      <AnimatePresence mode="wait">
        <motion.div
          key={mood}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.5, ease: "easeInOut" }}
          className={`absolute inset-0 bg-gradient-to-br ${config.bg}`}
        />
      </AnimatePresence>
      
      {/* Animated blobs for extra depth */}
      <div className="absolute inset-0 opacity-30">
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            x: [0, 50, 0],
            y: [0, -30, 0],
          }}
          transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
          className="absolute top-1/4 -left-20 w-96 h-96 bg-white/10 rounded-full blur-3xl"
        />
        <motion.div
          animate={{
            scale: [1, 1.3, 1],
            x: [0, -40, 0],
            y: [0, 60, 0],
          }}
          transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
          className="absolute bottom-1/4 -right-20 w-80 h-80 bg-white/5 rounded-full blur-3xl"
        />
      </div>
    </div>
  );
}
