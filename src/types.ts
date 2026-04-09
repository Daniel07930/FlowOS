export type Mood = 'Focus' | 'Chill' | 'Social' | 'Work' | 'Energy';

export interface AppIcon {
  id: string;
  name: string;
  category: string;
  icon: string; // Lucide icon name
  color: string;
  importance: number; // 0 to 1, determines size/position
}

export interface IntentResult {
  suggestedApps: string[];
  message: string;
}
