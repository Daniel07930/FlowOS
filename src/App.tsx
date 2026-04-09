/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Background } from './components/Background';
import { MoodSelector } from './components/MoodSelector';
import { IntentSearch } from './components/IntentSearch';
import { AppBubbles } from './components/AppBubbles';
import { StatusBar } from './components/StatusBar';
import { Mood, IntentResult } from './types';
import { MOOD_CONFIGS } from './constants';

export default function App() {
  const [mood, setMood] = useState<Mood>('Focus');
  const [intentResult, setIntentResult] = useState<IntentResult | null>(null);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  const handleIntent = (result: IntentResult | null) => {
    setIntentResult(result);
    
    // Auto-switch mood based on intent if relevant
    if (result) {
      const message = result.message.toLowerCase();
      if (message.includes('work') || message.includes('workspace')) setMood('Work');
      else if (message.includes('chill') || message.includes('relax')) setMood('Chill');
      else if (message.includes('social') || message.includes('chat')) setMood('Social');
      else if (message.includes('focus')) setMood('Focus');
    }
  };

  if (!isLoaded) return null;

  return (
    <div className="relative min-h-screen w-full flex flex-col font-sans text-white overflow-hidden selection:bg-white/20">
      <StatusBar />
      <Background mood={mood} />

      <main className="flex-1 flex flex-col items-center justify-center pt-12 pb-24 px-4">
        {/* Header Section */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <motion.h1 
            key={mood}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-5xl md:text-7xl font-bold tracking-tighter mb-2"
          >
            {mood}
          </motion.h1>
          <p className="text-white/40 text-sm md:text-base max-w-xs mx-auto">
            {MOOD_CONFIGS[mood].description}
          </p>
        </motion.div>

        {/* Fluid App Grid */}
        <AppBubbles 
          mood={mood} 
          suggestedApps={intentResult?.suggestedApps || []} 
        />

        {/* Intent Search Bar */}
        <div className="w-full mt-auto">
          <IntentSearch onIntent={handleIntent} />
        </div>
      </main>

      {/* Mood Selector Footer */}
      <footer className="fixed bottom-8 left-0 right-0 flex justify-center px-4 z-50">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <MoodSelector currentMood={mood} onMoodChange={setMood} />
        </motion.div>
      </footer>

      {/* Decorative elements */}
      <div className="fixed top-0 left-0 w-full h-32 bg-gradient-to-b from-black/20 to-transparent pointer-events-none" />
      <div className="fixed bottom-0 left-0 w-full h-32 bg-gradient-to-t from-black/20 to-transparent pointer-events-none" />
    </div>
  );
}

