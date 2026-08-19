import React from 'react';
import { useBluetoothStore } from '../../store/bluetoothStore';
import {
  LayoutDashboard,
  Search,
  Link2,
  Headphones,
  Clock,
  Star,
  Activity,
  Terminal,
  Settings,
  HelpCircle,
  ShieldCheck,
} from 'lucide-react';

interface Props {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

export const Sidebar: React.FC<Props> = ({ activeTab, setActiveTab }) => {
  const { devices, openModal } = useBluetoothStore();

  const connectedCount = devices.filter((d) => d.connectionStatus === 'connected').length;
  const pairedCount = devices.filter((d) => d.pairingStatus === 'paired').length;
  const favoritesCount = devices.filter((d) => d.isFavorite).length;

  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard, badge: null },
    { id: 'devices', label: 'Devices & Discovery', icon: Search, badge: null },
    { id: 'connected', label: 'Connected', icon: Link2, badge: connectedCount > 0 ? connectedCount : null, color: 'emerald' },
    { id: 'audio', label: 'Audio Management', icon: Headphones, badge: null },
    { id: 'diagnostics', label: 'Hardware Diagnostics', icon: Activity, badge: null },
    { id: 'logs', label: 'System Audit Logs', icon: Terminal, badge: null },
    { id: 'history', label: 'History Logs', icon: Clock, badge: null },
    { id: 'favorites', label: 'Favorites', icon: Star, badge: favoritesCount > 0 ? favoritesCount : null, color: 'amber' },
    { id: 'settings', label: 'Settings', icon: Settings, badge: null },
    { id: 'help', label: 'Help & Agent Guide', icon: HelpCircle, badge: null },
  ];

  return (
    <aside className="w-64 shrink-0 hidden md:block">
      <div className="sticky top-20 flex flex-col gap-6 p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm">
        
        {/* Nav Items */}
        <nav className="flex flex-col gap-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;

            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all ${
                  isActive
                    ? 'bg-brand-600 text-white shadow-md shadow-brand-600/20'
                    : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-slate-100'
                }`}
              >
                <div className="flex items-center gap-3">
                  <Icon className={`w-4 h-4 ${isActive ? 'text-white' : 'opacity-70'}`} />
                  <span>{item.label}</span>
                </div>

                {item.badge !== null && (
                  <span
                    className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                      isActive
                        ? 'bg-white/20 text-white'
                        : item.color === 'emerald'
                        ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400'
                        : 'bg-amber-500/10 text-amber-600 dark:text-amber-400'
                    }`}
                  >
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </nav>

        {/* Windows Permissions Card */}
        <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-700/60">
          <div className="flex items-center gap-2 text-brand-600 dark:text-brand-400 mb-1">
            <ShieldCheck className="w-4 h-4" />
            <span className="text-xs font-bold">Windows Bluetooth</span>
          </div>
          <p className="text-[11px] text-slate-500 dark:text-slate-400 leading-snug mb-2.5">
            Native hardware APIs active. Ensure Bluetooth radio is enabled.
          </p>
          <button
            onClick={() => openModal('permissions')}
            className="w-full py-1.5 px-2.5 rounded-lg text-[11px] font-semibold bg-white dark:bg-slate-700 border border-slate-200 dark:border-slate-600 text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-650 transition-colors"
          >
            Permission Setup
          </button>
        </div>

        {/* Stats Summary */}
        <div className="grid grid-cols-2 gap-2 text-center pt-2 border-t border-slate-200 dark:border-slate-800">
          <div className="p-2 rounded-lg bg-slate-50 dark:bg-slate-800/40">
            <div className="text-base font-bold text-brand-600 dark:text-brand-400">{pairedCount}</div>
            <div className="text-[10px] text-slate-500 dark:text-slate-400 uppercase font-semibold">Paired</div>
          </div>
          <div className="p-2 rounded-lg bg-slate-50 dark:bg-slate-800/40">
            <div className="text-base font-bold text-emerald-600 dark:text-emerald-400">{connectedCount}</div>
            <div className="text-[10px] text-slate-500 dark:text-slate-400 uppercase font-semibold">Active</div>
          </div>
        </div>

      </div>
    </aside>
  );
};
