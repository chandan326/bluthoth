import React from 'react';
import { useBluetoothStore } from '../store/bluetoothStore';
import { DeviceCard } from '../components/cards/DeviceCard';
import { QuickConnectCard } from '../components/cards/QuickConnectCard';
import { RadarScan } from '../components/discovery/RadarScan';
import {
  Bluetooth,
  Wifi,
  WifiOff,
  Zap,
  CheckCircle2,
  AlertTriangle,
  Radar,
  ShieldCheck,
  BatteryCharging,
  ArrowRight,
} from 'lucide-react';

interface Props {
  setActiveTab: (tab: string) => void;
}

export const DashboardPage: React.FC<Props> = ({ setActiveTab }) => {
  const { devices, agentStatus, isDemoMode, startScan, openModal } = useBluetoothStore();

  const connectedDevices = devices.filter((d) => d.connectionStatus === 'connected');
  const pairedDevices = devices.filter((d) => d.pairingStatus === 'paired');
  const availableDevices = devices.filter(
    (d) => d.pairingStatus === 'unpaired' && d.connectionStatus === 'disconnected'
  );

  const quickConnectDevices = devices
    .filter((d) => d.pairingStatus === 'paired' || d.isFavorite)
    .slice(0, 4);

  const lowBatteryDevices = devices.filter(
    (d) => d.battery.percentage !== null && d.battery.percentage <= 20
  );

  return (
    <div className="space-y-6">
      
      {/* Agent Health Status Banner */}
      {!isDemoMode && agentStatus.state !== 'connected' ? (
        <div className="p-4 rounded-2xl bg-rose-500/10 border border-rose-500/20 text-rose-700 dark:text-rose-300 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-rose-500/20 flex items-center justify-center shrink-0">
              <WifiOff className="w-5 h-5 text-rose-500" />
            </div>
            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider">Bluetooth Agent Offline</h4>
              <p className="text-xs opacity-90 mt-0.5">
                Bluetooth control is unavailable because the Windows Agent is not running on localhost.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <button
              onClick={() => openModal('download_agent')}
              className="px-3.5 py-1.5 rounded-xl text-xs font-bold bg-rose-600 hover:bg-rose-500 text-white shadow-sm transition-all"
            >
              Start Agent
            </button>
          </div>
        </div>
      ) : isDemoMode ? (
        <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/20 text-amber-800 dark:text-amber-300 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-500/20 flex items-center justify-center shrink-0">
              <AlertTriangle className="w-5 h-5 text-amber-500" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h4 className="text-xs font-bold uppercase tracking-wider">Running in Demo Mode</h4>
                <span className="px-2 py-0.5 rounded text-[10px] bg-amber-500/20 text-amber-700 dark:text-amber-300 font-mono font-bold">
                  Simulated Hardware
                </span>
              </div>
              <p className="text-xs opacity-90 mt-0.5">
                Explore all features using realistic mock devices. Connect the native Windows agent to control physical devices.
              </p>
            </div>
          </div>

          <button
            onClick={() => openModal('download_agent')}
            className="px-3.5 py-1.5 rounded-xl text-xs font-bold bg-amber-600 hover:bg-amber-500 text-white shadow-sm transition-all shrink-0"
          >
            Setup Agent
          </button>
        </div>
      ) : null}

      {/* Connection Overview Cards Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Connected */}
        <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm flex items-center justify-between">
          <div>
            <span className="text-[11px] font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
              Connected Devices
            </span>
            <div className="text-2xl font-extrabold text-emerald-600 dark:text-emerald-400 mt-1">
              {connectedDevices.length}
            </div>
            <span className="text-[10px] text-slate-400">Active Windows Endpoints</span>
          </div>
          <div className="w-11 h-11 rounded-xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 flex items-center justify-center">
            <CheckCircle2 className="w-6 h-6" />
          </div>
        </div>

        {/* Paired */}
        <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm flex items-center justify-between">
          <div>
            <span className="text-[11px] font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
              Paired Devices
            </span>
            <div className="text-2xl font-extrabold text-brand-600 dark:text-brand-400 mt-1">
              {pairedDevices.length}
            </div>
            <span className="text-[10px] text-slate-400">Saved in Windows Registry</span>
          </div>
          <div className="w-11 h-11 rounded-xl bg-brand-500/10 text-brand-600 dark:text-brand-400 flex items-center justify-center">
            <ShieldCheck className="w-6 h-6" />
          </div>
        </div>

        {/* Available */}
        <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm flex items-center justify-between">
          <div>
            <span className="text-[11px] font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
              Available Devices
            </span>
            <div className="text-2xl font-extrabold text-blue-600 dark:text-blue-400 mt-1">
              {availableDevices.length}
            </div>
            <span className="text-[10px] text-slate-400">Discovered via Scan</span>
          </div>
          <div className="w-11 h-11 rounded-xl bg-blue-500/10 text-blue-600 dark:text-blue-400 flex items-center justify-center">
            <Radar className="w-6 h-6" />
          </div>
        </div>

        {/* Connection Status */}
        <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm flex items-center justify-between">
          <div>
            <span className="text-[11px] font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
              Connection Status
            </span>
            <div className="text-2xl font-extrabold text-slate-900 dark:text-slate-100 mt-1 capitalize">
              {isDemoMode ? 'Demo Active' : agentStatus.state}
            </div>
            <span className="text-[10px] text-slate-400">
              {isDemoMode ? 'Mock Simulation' : 'Windows Radio Enabled'}
            </span>
          </div>
          <div
            className={`w-11 h-11 rounded-xl flex items-center justify-center ${
              isDemoMode || agentStatus.state === 'connected'
                ? 'bg-emerald-500/10 text-emerald-500'
                : 'bg-rose-500/10 text-rose-500'
            }`}
          >
            <Wifi className="w-6 h-6" />
          </div>
        </div>
      </div>

      {/* Radar Scanning Section Component */}
      <RadarScan />

      {/* Low Battery Warning Box if any */}
      {lowBatteryDevices.length > 0 && (
        <div className="p-4 rounded-2xl bg-rose-500/10 border border-rose-500/20 text-rose-700 dark:text-rose-300 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <BatteryCharging className="w-5 h-5 text-rose-500 animate-pulse" />
            <div>
              <h4 className="text-xs font-bold uppercase">Low Battery Warning</h4>
              <p className="text-xs opacity-90 mt-0.5">
                {lowBatteryDevices.map((d) => `${d.displayName} (${d.battery.percentage}%)`).join(', ')} require charging.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Quick Connect & Active Devices Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left 2 Cols: Currently Connected Devices */}
        <div className="lg:col-span-2 space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-base font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2">
                <Bluetooth className="w-5 h-5 text-brand-600 dark:text-brand-400" />
                <span>Active Connected Devices</span>
              </h2>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Currently linked to Windows Bluetooth hardware stack
              </p>
            </div>

            <button
              onClick={() => setActiveTab('connected')}
              className="text-xs font-semibold text-brand-600 dark:text-brand-400 hover:underline flex items-center gap-1"
            >
              <span>Manage All</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {connectedDevices.length === 0 ? (
            <div className="p-8 text-center rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
              <Bluetooth className="w-10 h-10 text-slate-300 dark:text-slate-700 mx-auto mb-3" />
              <h3 className="text-sm font-bold text-slate-800 dark:text-slate-200">No Connected Devices</h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 max-w-sm mx-auto">
                Scan nearby devices or pick from your paired list to connect.
              </p>
              <button
                onClick={startScan}
                className="mt-4 px-4 py-2 rounded-xl text-xs font-semibold bg-brand-600 hover:bg-brand-500 text-white shadow-sm"
              >
                Scan for Devices
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {connectedDevices.map((device) => (
                <DeviceCard key={device.id} device={device} />
              ))}
            </div>
          )}
        </div>

        {/* Right 1 Col: Quick Connect Card List */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-base font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2">
              <Zap className="w-5 h-5 text-amber-500" />
              <span>Quick Connect</span>
            </h2>
            <span className="text-xs text-slate-400">Recently Used</span>
          </div>

          <div className="space-y-3">
            {quickConnectDevices.map((device) => (
              <QuickConnectCard key={device.id} device={device} />
            ))}
          </div>
        </div>

      </div>
    </div>
  );
};
