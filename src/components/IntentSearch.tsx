import { useState, useEffect, useRef, FormEvent } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Search, Sparkles, X } from 'lucide-react';
import { interpretIntent } from '../services/gemini';
import { IntentResult } from '../types';

interface IntentSearchProps {
  onIntent: (result: IntentResult | null) => void;
}

export function IntentSearch({ onIntent }: IntentSearchProps) {
  const [query, setQuery] = useState('');
  const [isFocused, setIsFocused] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<IntentResult | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleSearch = async (e?: FormEvent) => {
    e?.preventDefault();
    if (!query.trim()) return;

    setIsLoading(true);
    const res = await interpretIntent(query);
    setIsLoading(false);
    setResult(res);
    onIntent(res);
  };

  const clear = () => {
    setQuery('');
    setResult(null);
    onIntent(null);
    inputRef.current?.focus();
  };

  return (
    <div className="w-full max-w-xl mx-auto px-4">
      <form 
        onSubmit={handleSearch}
        className={`relative group transition-all duration-500 ${isFocused ? 'scale-105' : 'scale-100'}`}
      >
        <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
          {isLoading ? (
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
            >
              <Sparkles className="w-5 h-5 text-blue-400" />
            </motion.div>
          ) : (
            <Search className={`w-5 h-5 transition-colors ${isFocused ? 'text-white' : 'text-white/40'}`} />
          )}
        </div>
        
        <input
          ref={inputRef}
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          placeholder="What's your intent? (e.g. 'Chat', 'Work', 'Chill')"
          className="w-full bg-white/10 backdrop-blur-2xl border border-white/10 rounded-2xl py-4 pl-12 pr-12 text-white placeholder-white/30 focus:outline-none focus:ring-2 focus:ring-white/20 transition-all"
        />

        {query && (
          <button
            type="button"
            onClick={clear}
            className="absolute inset-y-0 right-4 flex items-center text-white/40 hover:text-white"
          >
            <X className="w-5 h-5" />
          </button>
        )}
      </form>

      <AnimatePresence>
        {result && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            className="mt-4 p-4 bg-white/5 backdrop-blur-lg rounded-xl border border-white/10 text-center"
          >
            <p className="text-sm text-white/80 font-medium">{result.message}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
