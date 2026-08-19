import React from 'react';
import { useBluetoothStore } from '../../store/bluetoothStore';
import { Wifi, WifiOff, RefreshCw } from 'lucide-react';

export const AgentStatusBadge: React.FC = () => {
  const { agentStatus, isDemoMode, openModal } = useBluetoothStore();

  if (isDemoMode) {
    return (
      <button
        onClick={() => openModal('download_agent')}
        className="flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-medium bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20 hover:bg-amber-500/20 transition-all cursor-pointer"
        title="Running in Demo Mode with simulated devices. Click to setup native agent."
      >
        <span className="relative flex h-2 w-2">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-2 w-2 bg-amber-500"></span>
        </span>
        <span>Demo Mode Active</span>
      </button>
    );
  }

  if (agentStatus.state === 'connected') {
    return (
      <div className="flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-medium bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
        <span className="relative flex h-2 w-2">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
        </span>
        <Wifi className="w-3.5 h-3.5" />
        <span>Agent Online</span>
      </div>
    );
  }

  if (agentStatus.state === 'connecting') {
    return (
      <div className="flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-medium bg-blue-500/10 text-blue-600 dark:text-blue-400 border border-blue-500/20">
        <RefreshCw className="w-3.5 h-3.5 animate-spin" />
        <span>Connecting Agent...</span>
      </div>
    );
  }

  return (
    <button
      onClick={() => openModal('download_agent')}
      className="flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-medium bg-rose-500/10 text-rose-600 dark:text-rose-400 border border-rose-500/20 hover:bg-rose-500/20 transition-all cursor-pointer"
      title="Windows Bluetooth Agent is offline. Click for launch options."
    >
      <WifiOff className="w-3.5 h-3.5" />
      <span>Agent Offline</span>
    </button>
  );
};
