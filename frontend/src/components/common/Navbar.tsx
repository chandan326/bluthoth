import React from 'react';
import { useBluetoothStore } from '../../store/bluetoothStore';
import { AgentStatusBadge } from './AgentStatusBadge';
import { Bluetooth, Sun, Moon, Radar, SlidersHorizontal, Layers } from 'lucide-react';

interface Props {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

export const Navbar: React.FC<Props> = ({ activeTab, setActiveTab }) => {
  const { settings, updateSettings, isDemoMode, toggleDemoMode, startScan, isScanning } = useBluetoothStore();

  const isDark = settings.theme === 'dark';

  const toggleTheme = () => {
    const nextTheme = isDark ? 'light' : 'dark';
    updateSettings({ theme: nextTheme });
    if (nextTheme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  };

  return (
    <header className="sticky top-0 z-40 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        
        {/* Brand Logo & App Name */}
        <div className="flex items-center gap-3 cursor-pointer" onClick={() => setActiveTab('dashboard')}>
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-brand-600 to-blue-400 flex items-center justify-center text-white shadow-md shadow-brand-500/20">
            <Bluetooth className="w-6 h-6 animate-pulse-slow" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-lg font-bold bg-gradient-to-r from-brand-600 to-blue-500 bg-clip-text text-transparent">
                {settings.appName}
              </span>
              <span className="text-[10px] font-semibold px-1.5 py-0.5 rounded bg-brand-500/10 text-brand-600 dark:text-brand-400 uppercase tracking-widest">
                v1.0
              </span>
            </div>
            <p className="text-[11px] text-slate-500 dark:text-slate-400 hidden sm:block">
              Windows Bluetooth Device Hub
            </p>
          </div>
        </div>

        {/* Center Actions / Mode Selector */}
        <div className="hidden md:flex items-center gap-3">
          <AgentStatusBadge />

          <button
            onClick={toggleDemoMode}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium border transition-all ${
              isDemoMode
                ? 'bg-amber-500/10 border-amber-500/30 text-amber-600 dark:text-amber-400 hover:bg-amber-500/20'
                : 'bg-slate-100 dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
            }`}
            title="Toggle between Simulated Demo Data and Real Windows Bluetooth Mode"
          >
            <Layers className="w-3.5 h-3.5" />
            <span>{isDemoMode ? 'Demo Mode' : 'Real Hardware Mode'}</span>
          </button>
        </div>

        {/* Right Tools: Scan, Theme, Settings */}
        <div className="flex items-center gap-2 sm:gap-3">
          <button
            onClick={startScan}
            disabled={isScanning}
            className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-semibold shadow-sm transition-all ${
              isScanning
                ? 'bg-brand-500/20 text-brand-600 dark:text-brand-400 cursor-not-allowed border border-brand-500/30'
                : 'bg-brand-600 hover:bg-brand-500 text-white shadow-brand-600/20 hover:shadow-brand-600/40 active:scale-95'
            }`}
          >
            <Radar className={`w-4 h-4 ${isScanning ? 'animate-spin' : ''}`} />
            <span className="hidden sm:inline">{isScanning ? 'Scanning...' : 'Scan Devices'}</span>
          </button>

          <button
            onClick={toggleTheme}
            className="p-2 rounded-xl text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 border border-transparent hover:border-slate-200 dark:hover:border-slate-700 transition-colors"
            title="Toggle Light / Dark Mode"
          >
            {isDark ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-slate-600" />}
          </button>

          <button
            onClick={() => setActiveTab('settings')}
            className={`p-2 rounded-xl text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 border border-transparent hover:border-slate-200 dark:hover:border-slate-700 transition-colors ${
              activeTab === 'settings' ? 'bg-slate-100 dark:bg-slate-800 text-brand-600 dark:text-brand-400' : ''
            }`}
            title="Application Settings"
          >
            <SlidersHorizontal className="w-4 h-4" />
          </button>
        </div>
      </div>
    </header>
  );
};
