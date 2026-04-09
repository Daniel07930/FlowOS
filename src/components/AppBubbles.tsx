import { motion, AnimatePresence } from 'motion/react';
import * as Icons from 'lucide-react';
import { AppIcon, Mood } from '../types';
import { ALL_APPS, MOOD_CONFIGS } from '../constants';
import { cn } from '../lib/utils';

interface AppBubblesProps {
  mood: Mood;
  suggestedApps: string[];
}

export function AppBubbles({ mood, suggestedApps }: AppBubblesProps) {
  const moodConfig = MOOD_CONFIGS[mood];
  
  // Filter and sort apps based on mood and suggestions
  const filteredApps = ALL_APPS.map(app => {
    let score = app.importance;
    
    // Boost if in mood category
    if (moodConfig.categories.includes(app.category)) {
      score += 0.5;
    }
    
    // Boost if suggested by AI
    if (suggestedApps.includes(app.name)) {
      score += 2.0;
    }
    
    return { ...app, score };
  }).sort((a, b) => b.score - a.score);

  // Take top 12 apps to show
  const visibleApps = filteredApps.slice(0, 12);

  return (
    <div className="relative w-full h-[50vh] flex items-center justify-center">
      <div className="grid grid-cols-3 md:grid-cols-4 gap-8 md:gap-12 p-8">
        <AnimatePresence mode="popLayout">
          {visibleApps.map((app, index) => {
            const IconComponent = (Icons as any)[app.icon] || Icons.HelpCircle;
            const isSuggested = suggestedApps.includes(app.name);
            
            return (
              <motion.div
                key={app.id}
                layout
                initial={{ scale: 0, opacity: 0 }}
                animate={{ 
                  scale: isSuggested ? 1.2 : 1, 
                  opacity: 1,
                  y: [0, -10, 0],
                }}
                exit={{ scale: 0, opacity: 0 }}
                transition={{ 
                  type: "spring", 
                  stiffness: 260, 
                  damping: 20,
                  y: {
                    duration: 4 + Math.random() * 2,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }
                }}
                className="flex flex-col items-center gap-2 group cursor-pointer"
              >
                <div className={cn(
                  "relative w-16 h-16 md:w-20 md:h-20 rounded-3xl flex items-center justify-center transition-all duration-500 group-hover:scale-110 group-active:scale-95",
                  app.color,
                  isSuggested ? "ring-4 ring-white/50 shadow-[0_0_30px_rgba(255,255,255,0.3)]" : "shadow-xl"
                )}>
                  <IconComponent className="w-8 h-8 md:w-10 md:h-10 text-white" />
                  
                  {/* Glass overlay */}
                  <div className="absolute inset-0 rounded-3xl bg-white/10 backdrop-blur-[2px] border border-white/20" />
                </div>
                <span className="text-[10px] md:text-xs font-medium text-white/70 tracking-wide uppercase group-hover:text-white transition-colors">
                  {app.name}
                </span>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>
    </div>
  );
}
