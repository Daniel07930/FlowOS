import { useState, useEffect } from 'react';
import { Wifi, Battery, Signal } from 'lucide-react';

export function StatusBar() {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="fixed top-0 left-0 right-0 h-12 px-6 flex items-center justify-between text-white/60 text-xs font-medium z-50">
      <div className="flex items-center gap-4">
        <span>{time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
      </div>
      <div className="flex items-center gap-3">
        <Signal className="w-3.5 h-3.5" />
        <Wifi className="w-3.5 h-3.5" />
        <div className="flex items-center gap-1">
          <span className="text-[10px]">84%</span>
          <Battery className="w-4 h-4" />
        </div>
      </div>
    </div>
  );
}
