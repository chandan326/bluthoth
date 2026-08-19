import React from 'react';
import { useBluetoothStore } from '../store/bluetoothStore';
import {
  Settings,
  Sun,
  Moon,
  Bell,
  Cpu,
  RefreshCw,
  Trash2,
  Check,
  Shield,
  Info,
} from 'lucide-react';

export const SettingsPage: React.FC = () => {
  const { settings, updateSettings, devices, toggleAutoReconnect, clearHistory, addToast } = useBluetoothStore();

  const isDark = settings.theme === 'dark';

  const handleThemeToggle = (nextTheme: 'dark' | 'light' | 'system') => {
    updateSettings({ theme: nextTheme });
    if (nextTheme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  };

  const handleClearData = () => {
    clearHistory();
    addToast('Data Cleared', 'Local history logs and cached preferences reset.', 'warning');
  };

  const autoReconnectDevices = devices.filter((d) => d.pairingStatus === 'paired');

  return (
    <div className="space-y-6 max-w-4xl">
      
      {/* Header */}
      <div>
        <h1 className="text-xl font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2">
          <Settings className="w-5 h-5 text-brand-600 dark:text-brand-400" />
          <span>Application Settings</span>
        </h1>
        <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
          Configure BlueHub preferences, Bluetooth agent polling, theme, and auto-reconnect lists.
        </p>
      </div>

      {/* General Settings Card */}
      <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
        <h3 className="text-sm font-bold text-slate-900 dark:text-slate-100 pb-2 border-b border-slate-100 dark:border-slate-800">
          General Preferences
        </h3>

        {/* App Name Branding Token */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <label className="text-xs font-semibold text-slate-800 dark:text-slate-200">Application Name Token</label>
            <p className="text-[11px] text-slate-400">Customizable branding logo name across dashboard.</p>
          </div>
          <input
            type="text"
            value={settings.appName}
            onChange={(e) => updateSettings({ appName: e.target.value })}
            className="w-48 py-1.5 px-3 rounded-xl bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-slate-100 text-xs border border-slate-200 dark:border-slate-700 focus:outline-none focus:ring-2 focus:ring-brand-500 font-semibold"
          />
        </div>

        {/* Theme Switcher */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pt-2 border-t border-slate-100 dark:border-slate-800/60">
          <div>
            <label className="text-xs font-semibold text-slate-800 dark:text-slate-200">Appearance Mode</label>
            <p className="text-[11px] text-slate-400">Select Light, Dark, or System mode.</p>
          </div>
          <div className="flex items-center gap-1.5 bg-slate-100 dark:bg-slate-800 p-1 rounded-xl">
            <button
              onClick={() => handleThemeToggle('light')}
              className={`flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-medium transition-all ${
                settings.theme === 'light' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <Sun className="w-3.5 h-3.5 text-amber-500" />
              <span>Light</span>
            </button>
            <button
              onClick={() => handleThemeToggle('dark')}
              className={`flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-medium transition-all ${
                settings.theme === 'dark' ? 'bg-slate-700 text-white shadow-sm' : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <Moon className="w-3.5 h-3.5 text-blue-400" />
              <span>Dark</span>
            </button>
          </div>
        </div>

        {/* Notifications Toggle */}
        <div className="flex items-center justify-between pt-2 border-t border-slate-100 dark:border-slate-800/60">
          <div>
            <label className="text-xs font-semibold text-slate-800 dark:text-slate-200 flex items-center gap-1.5">
              <Bell className="w-4 h-4 text-brand-500" />
              <span>Desktop Notifications</span>
            </label>
            <p className="text-[11px] text-slate-400">Show toasts when devices connect, disconnect, or battery drops low.</p>
          </div>
          <input
            type="checkbox"
            checked={settings.enableNotifications}
            onChange={(e) => updateSettings({ enableNotifications: e.target.checked })}
            className="w-4 h-4 rounded text-brand-600 focus:ring-brand-500 border-slate-300 dark:border-slate-700 cursor-pointer"
          />
        </div>
      </div>

      {/* Auto Reconnect Preferences */}
      <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
        <div className="flex items-center justify-between pb-2 border-b border-slate-100 dark:border-slate-800">
          <div>
            <h3 className="text-sm font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2">
              <RefreshCw className="w-4 h-4 text-emerald-500" />
              <span>Auto Reconnect Configuration</span>
            </h3>
            <p className="text-xs text-slate-400">Automatically attempt connecting selected paired devices when Agent launches.</p>
          </div>
        </div>

        <div className="space-y-2">
          {autoReconnectDevices.map((device) => (
            <div
              key={device.id}
              className="flex items-center justify-between p-3 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200/60 dark:border-slate-700/60"
            >
              <div className="flex items-center gap-3">
                <input
                  type="checkbox"
                  checked={device.isAutoReconnect}
                  onChange={() => toggleAutoReconnect(device.id)}
                  className="w-4 h-4 rounded text-emerald-600 focus:ring-emerald-500 border-slate-300 dark:border-slate-700 cursor-pointer"
                />
                <div>
                  <h4 className="text-xs font-bold text-slate-900 dark:text-slate-100">{device.displayName}</h4>
                  <span className="text-[10px] text-slate-400 font-mono">{device.originalName}</span>
                </div>
              </div>

              <span className="text-[11px] font-semibold text-emerald-600 dark:text-emerald-400">
                {device.isAutoReconnect ? 'Auto-Reconnect Enabled' : 'Manual Connect'}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Bluetooth Scan Parameters */}
      <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
        <h3 className="text-sm font-bold text-slate-900 dark:text-slate-100 pb-2 border-b border-slate-100 dark:border-slate-800 flex items-center gap-2">
          <Cpu className="w-4 h-4 text-purple-500" />
          <span>Bluetooth Hardware Settings</span>
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
          <div>
            <label className="block font-semibold text-slate-800 dark:text-slate-200 mb-1">Radar Scan Duration</label>
            <select
              value={settings.scanDurationSeconds}
              onChange={(e) => updateSettings({ scanDurationSeconds: Number(e.target.value) })}
              className="w-full py-2 px-3 rounded-xl bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-slate-100 border border-slate-200 dark:border-slate-700 font-medium"
            >
              <option value={10}>10 Seconds (Quick)</option>
              <option value={15}>15 Seconds (Default)</option>
              <option value={30}>30 Seconds (Thorough)</option>
              <option value={60}>60 Seconds (Deep Scan)</option>
            </select>
          </div>

          <div>
            <label className="block font-semibold text-slate-800 dark:text-slate-200 mb-1">Max Retry Connection Attempts</label>
            <select
              value={settings.maxRetryAttempts}
              onChange={(e) => updateSettings({ maxRetryAttempts: Number(e.target.value) })}
              className="w-full py-2 px-3 rounded-xl bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-slate-100 border border-slate-200 dark:border-slate-700 font-medium"
            >
              <option value={1}>1 Attempt</option>
              <option value={3}>3 Attempts (Recommended)</option>
              <option value={5}>5 Attempts</option>
            </select>
          </div>
        </div>
      </div>

      {/* Privacy & Data Controls */}
      <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
        <h3 className="text-sm font-bold text-slate-900 dark:text-slate-100 pb-2 border-b border-slate-100 dark:border-slate-800 flex items-center gap-2">
          <Shield className="w-4 h-4 text-rose-500" />
          <span>Privacy & Data Management</span>
        </h3>

        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <h4 className="text-xs font-semibold text-slate-800 dark:text-slate-200">Clear Application Cache & Logs</h4>
            <p className="text-[11px] text-slate-400">Resets local connection history log records stored in browser state.</p>
          </div>

          <button
            onClick={handleClearData}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold bg-rose-500/10 text-rose-600 dark:text-rose-400 hover:bg-rose-500/20 border border-rose-500/20 transition-all shrink-0"
          >
            <Trash2 className="w-4 h-4" />
            <span>Clear App Data</span>
          </button>
        </div>
      </div>

      {/* About Box */}
      <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-800 text-xs text-slate-500 space-y-1">
        <div className="flex items-center gap-2 text-slate-900 dark:text-slate-100 font-bold">
          <Info className="w-4 h-4 text-brand-500" />
          <span>BlueHub Platform Version 1.0.4-win</span>
        </div>
        <p className="text-[11px] leading-relaxed">
          Production-grade Windows Bluetooth Architecture with .NET 8 Native Agent & Python WinRT fallback.
        </p>
      </div>

    </div>
  );
};
