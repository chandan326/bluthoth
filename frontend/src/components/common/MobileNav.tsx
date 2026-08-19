import React from 'react';
import { useBluetoothStore } from '../../store/bluetoothStore';
import { LayoutDashboard, Search, Link2, Headphones, Star, Settings } from 'lucide-react';

interface Props {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

export const MobileNav: React.FC<Props> = ({ activeTab, setActiveTab }) => {
  const { devices } = useBluetoothStore();
  const connectedCount = devices.filter((d) => d.connectionStatus === 'connected').length;

  const tabs = [
    { id: 'dashboard', label: 'Home', icon: LayoutDashboard },
    { id: 'devices', label: 'Devices', icon: Search },
    { id: 'connected', label: 'Connected', icon: Link2, badge: connectedCount },
    { id: 'audio', label: 'Audio', icon: Headphones },
    { id: 'favorites', label: 'Favorites', icon: Star },
    { id: 'settings', label: 'Settings', icon: Settings },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-40 bg-white/90 dark:bg-slate-900/90 backdrop-blur-lg border-t border-slate-200 dark:border-slate-800 md:hidden py-1.5 px-2">
      <div className="flex items-center justify-around">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;

          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`relative flex flex-col items-center gap-1 py-1 px-3 rounded-xl transition-all ${
                isActive
                  ? 'text-brand-600 dark:text-brand-400 font-semibold'
                  : 'text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200'
              }`}
            >
              <Icon className="w-5 h-5" />
              <span className="text-[10px] font-medium">{tab.label}</span>

              {tab.badge && tab.badge > 0 ? (
                <span className="absolute top-0 right-2 w-4 h-4 rounded-full bg-emerald-500 text-white text-[9px] font-bold flex items-center justify-center">
                  {tab.badge}
                </span>
              ) : null}
            </button>
          );
        })}
      </div>
    </nav>
  );
};
