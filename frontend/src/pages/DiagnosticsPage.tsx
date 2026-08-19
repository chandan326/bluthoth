import React, { useState } from 'react';
import { useBluetoothStore } from '../store/bluetoothStore';
import { Activity, ShieldCheck, Cpu, RefreshCw, CheckCircle2, XCircle, AlertCircle, Radio, Terminal } from 'lucide-react';

export const DiagnosticsPage: React.FC = () => {
  const { diagnostics, runHardwareDiagnostics, agentStatus, isDemoMode } = useBluetoothStore();
  const [isRunning, setIsRunning] = useState(false);

  const handleRunTest = async () => {
    setIsRunning(true);
    await runHardwareDiagnostics();
    setIsRunning(false);
  };

  return (
    <div className="space-y-6 max-w-4xl">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2">
            <Activity className="w-5 h-5 text-brand-600 dark:text-brand-400" />
            <span>Hardware Diagnostics & System Inspection</span>
          </h1>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            Real-time inspection of Windows Bluetooth host adapter drivers, PnP radios, and local IPC bridge.
          </p>
        </div>

        <button
          onClick={handleRunTest}
          disabled={isRunning}
          className={`flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold shadow-md transition-all ${
            isRunning
              ? 'bg-brand-500/20 text-brand-400 cursor-not-allowed border border-brand-500/30'
              : 'bg-brand-600 hover:bg-brand-500 text-white shadow-brand-600/25 active:scale-95'
          }`}
        >
          <RefreshCw className={`w-4 h-4 ${isRunning ? 'animate-spin' : ''}`} />
          <span>{isRunning ? 'Testing Hardware...' : 'Run Hardware Test'}</span>
        </button>
      </div>

      {/* Diagnostics Metrics Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        
        {/* Adapter Detected */}
        <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
              Adapter Detected
            </span>
            {diagnostics.adapterDetected ? (
              <CheckCircle2 className="w-5 h-5 text-emerald-500" />
            ) : (
              <XCircle className="w-5 h-5 text-rose-500" />
            )}
          </div>
          <div className="text-lg font-extrabold text-slate-900 dark:text-slate-100 mt-2">
            {diagnostics.adapterDetected ? 'Yes (Detected)' : 'No Adapter Found'}
          </div>
          <span className="text-[10px] text-slate-400 font-mono mt-0.5 block truncate">
            {diagnostics.adapterName}
          </span>
        </div>

        {/* Radio Enabled */}
        <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
              Bluetooth Radio
            </span>
            <Radio className="w-5 h-5 text-brand-500" />
          </div>
          <div className="text-lg font-extrabold text-emerald-600 dark:text-emerald-400 mt-2">
            {diagnostics.bluetoothEnabled ? 'Enabled & Powered On' : 'Radio Disabled'}
          </div>
          <span className="text-[10px] text-slate-400 mt-0.5 block">
            Windows bthserv Service Active
          </span>
        </div>

        {/* Local Bridge Status */}
        <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
              Local IPC Bridge
            </span>
            <span
              className={`w-2.5 h-2.5 rounded-full ${
                agentStatus.state === 'connected' ? 'bg-emerald-500 animate-ping' : 'bg-amber-500'
              }`}
            ></span>
          </div>
          <div className="text-lg font-extrabold text-slate-900 dark:text-slate-100 mt-2 capitalize">
            {isDemoMode ? 'Demo Active' : agentStatus.state}
          </div>
          <span className="text-[10px] text-slate-400 font-mono mt-0.5 block">
            ws://localhost:8765
          </span>
        </div>

      </div>

      {/* Hardware Report Inspection Table */}
      <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
        <h3 className="text-sm font-bold text-slate-900 dark:text-slate-100 pb-2 border-b border-slate-100 dark:border-slate-800 flex items-center gap-2">
          <Cpu className="w-4 h-4 text-purple-500" />
          <span>System Environment & Capabilities Report</span>
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
          <div className="space-y-2 p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200/60 dark:border-slate-700/60">
            <div className="flex justify-between py-1 border-b border-slate-200/50 dark:border-slate-800">
              <span className="text-slate-400">Operating System:</span>
              <span className="font-semibold text-slate-800 dark:text-slate-200">{diagnostics.operatingSystem}</span>
            </div>

            <div className="flex justify-between py-1 border-b border-slate-200/50 dark:border-slate-800">
              <span className="text-slate-400">Architecture:</span>
              <span className="font-mono font-semibold text-slate-800 dark:text-slate-200">{diagnostics.architecture}</span>
            </div>

            <div className="flex justify-between py-1 border-b border-slate-200/50 dark:border-slate-800">
              <span className="text-slate-400">Permission Status:</span>
              <span className="font-bold text-emerald-500">{diagnostics.permissionStatus}</span>
            </div>

            <div className="flex justify-between py-1">
              <span className="text-slate-400">Connected Device Count:</span>
              <span className="font-bold text-brand-600 dark:text-brand-400">{diagnostics.connectedDeviceCount} Active</span>
            </div>
          </div>

          <div className="space-y-2 p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200/60 dark:border-slate-700/60">
            <div className="flex justify-between py-1 border-b border-slate-200/50 dark:border-slate-800">
              <span className="text-slate-400">Last Hardware Scan:</span>
              <span className="font-mono">{diagnostics.lastScanTime || 'Never'}</span>
            </div>

            <div className="flex justify-between py-1 border-b border-slate-200/50 dark:border-slate-800">
              <span className="text-slate-400">Last Connection Error:</span>
              <span className="text-emerald-500 font-semibold">{diagnostics.lastConnectionError || 'None (Clean)'}</span>
            </div>

            <div className="flex justify-between py-1">
              <span className="text-slate-400">Operating Mode:</span>
              <span className="font-bold text-slate-800 dark:text-slate-200">
                {isDemoMode ? 'Simulated Demo Mode' : 'Real Hardware Mode (DEMO_MODE=false)'}
              </span>
            </div>
          </div>
        </div>

        {/* Supported Bluetooth Capabilities */}
        <div>
          <h4 className="font-bold text-xs text-slate-900 dark:text-slate-100 mb-2 flex items-center gap-1.5">
            <ShieldCheck className="w-4 h-4 text-emerald-500" />
            <span>Supported Platform Hardware Profiles</span>
          </h4>
          <div className="flex flex-wrap gap-2">
            {diagnostics.supportedCapabilities.map((cap, i) => (
              <span
                key={i}
                className="px-3 py-1 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-mono text-[11px] border border-slate-200 dark:border-slate-700"
              >
                {cap}
              </span>
            ))}
          </div>
        </div>
      </div>

    </div>
  );
};
