import { motion } from 'motion/react';
import { Mood } from '../types';
import { MOOD_CONFIGS } from '../constants';
import { cn } from '../lib/utils';

interface MoodSelectorProps {
  currentMood: Mood;
  onMoodChange: (mood: Mood) => void;
}

export function MoodSelector({ currentMood, onMoodChange }: MoodSelectorProps) {
  return (
    <div className="flex gap-2 p-2 bg-white/5 backdrop-blur-md rounded-full border border-white/10">
      {(Object.keys(MOOD_CONFIGS) as Mood[]).map((mood) => (
        <button
          key={mood}
          onClick={() => onMoodChange(mood)}
          className={cn(
            "relative px-4 py-1.5 rounded-full text-xs font-medium transition-all duration-300",
            currentMood === mood 
              ? "text-white" 
              : "text-white/50 hover:text-white/80"
          )}
        >
          {currentMood === mood && (
            <motion.div
              layoutId="mood-pill"
              className="absolute inset-0 bg-white/10 rounded-full"
              transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
            />
          )}
          <span className="relative z-10">{mood}</span>
        </button>
      ))}
    </div>
  );
}
