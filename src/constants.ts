import { AppIcon } from './types';

export const ALL_APPS: AppIcon[] = [
  { id: '1', name: 'Messages', category: 'Social', icon: 'MessageSquare', color: 'bg-blue-500', importance: 0.8 },
  { id: '2', name: 'Spotify', category: 'Chill', icon: 'Music', color: 'bg-green-500', importance: 0.9 },
  { id: '3', name: 'Slack', category: 'Work', icon: 'Hash', color: 'bg-purple-500', importance: 0.7 },
  { id: '4', name: 'Calendar', category: 'Work', icon: 'Calendar', color: 'bg-red-500', importance: 0.6 },
  { id: '5', name: 'Instagram', category: 'Social', icon: 'Instagram', color: 'bg-pink-500', importance: 0.85 },
  { id: '6', name: 'Notes', category: 'Focus', icon: 'FileText', color: 'bg-yellow-500', importance: 0.5 },
  { id: '7', name: 'Camera', category: 'Energy', icon: 'Camera', color: 'bg-gray-500', importance: 0.4 },
  { id: '8', name: 'Settings', category: 'System', icon: 'Settings', color: 'bg-slate-500', importance: 0.3 },
  { id: '9', name: 'Chrome', category: 'Work', icon: 'Globe', color: 'bg-blue-400', importance: 0.75 },
  { id: '10', name: 'YouTube', category: 'Chill', icon: 'Youtube', color: 'bg-red-600', importance: 0.8 },
  { id: '11', name: 'Wallet', category: 'Money', icon: 'Wallet', color: 'bg-emerald-500', importance: 0.65 },
  { id: '12', name: 'Maps', category: 'Energy', icon: 'Map', color: 'bg-indigo-500', importance: 0.7 },
  { id: '13', name: 'Mail', category: 'Work', icon: 'Mail', color: 'bg-sky-500', importance: 0.6 },
  { id: '14', name: 'Calculator', category: 'System', icon: 'Calculator', color: 'bg-orange-500', importance: 0.2 },
  { id: '15', name: 'Photos', category: 'Social', icon: 'Image', color: 'bg-rose-500', importance: 0.55 },
];

export const MOOD_CONFIGS = {
  Focus: {
    bg: 'from-slate-900 via-slate-800 to-slate-900',
    accent: 'text-blue-400',
    description: 'Deep work and concentration.',
    categories: ['Focus', 'Work', 'System'],
  },
  Chill: {
    bg: 'from-emerald-900 via-teal-800 to-emerald-900',
    accent: 'text-emerald-400',
    description: 'Relax and unwind.',
    categories: ['Chill', 'Social'],
  },
  Social: {
    bg: 'from-rose-900 via-pink-800 to-rose-900',
    accent: 'text-pink-400',
    description: 'Connect with friends.',
    categories: ['Social', 'Energy'],
  },
  Work: {
    bg: 'from-indigo-900 via-blue-800 to-indigo-900',
    accent: 'text-indigo-400',
    description: 'Get things done.',
    categories: ['Work', 'System', 'Money'],
  },
  Energy: {
    bg: 'from-amber-900 via-orange-800 to-amber-900',
    accent: 'text-amber-400',
    description: 'Active and moving.',
    categories: ['Energy', 'Social', 'Chill'],
  },
};
