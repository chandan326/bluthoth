import React from 'react';
import { useBluetoothStore } from '../../store/bluetoothStore';
import { BatteryIndicator } from '../common/BatteryIndicator';
import { SignalIndicator } from '../common/SignalIndicator';
import { X, ShieldCheck, Clock, Cpu, Radio, Hash, Activity } from 'lucide-react';

export const DeviceDetailsModal: React.FC = () => {
  const { activeModal, activeDeviceId, devices, history, closeModal } = useBluetoothStore();

  if (activeModal !== 'details' || !activeDeviceId) return null;

  const device = devices.find((d) => d.id === activeDeviceId);
  if (!device) return null;

  const deviceLogs = history.filter((h) => h.deviceId === device.id || h.deviceName === device.displayName);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-sm animate-fade-in">
      <div className="relative w-full max-w-lg rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        
        {/* Header */}
        <div className="flex items-center justify-between p-5 border-b border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/40">
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-base font-bold text-slate-900 dark:text-slate-100">
                {device.displayName}
              </h3>
              <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-brand-500/10 text-brand-600 dark:text-brand-400 uppercase">
                {device.category}
              </span>
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
              Windows Hardware: {device.originalName}
            </p>
          </div>

          <button
            onClick={closeModal}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 hover:bg-slate-200 dark:hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-5 overflow-y-auto space-y-5 text-xs text-slate-700 dark:text-slate-300">
          
          {/* Quick Metrics Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
            <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200/60 dark:border-slate-700/60">
              <span className="text-[10px] text-slate-400 uppercase font-semibold">State</span>
              <div className="text-xs font-bold capitalize mt-1 text-brand-600 dark:text-brand-400">
                {device.connectionStatus}
              </div>
            </div>

            <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200/60 dark:border-slate-700/60">
              <span className="text-[10px] text-slate-400 uppercase font-semibold">Pairing</span>
              <div className="text-xs font-bold capitalize mt-1 text-emerald-600 dark:text-emerald-400">
                {device.pairingStatus}
              </div>
            </div>

            <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200/60 dark:border-slate-700/60">
              <span className="text-[10px] text-slate-400 uppercase font-semibold">Battery</span>
              <div className="mt-1">
                <BatteryIndicator battery={device.battery} />
              </div>
            </div>

            <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200/60 dark:border-slate-700/60">
              <span className="text-[10px] text-slate-400 uppercase font-semibold">Signal RSSI</span>
              <div className="mt-1">
                <SignalIndicator signal={device.signal} />
              </div>
            </div>
          </div>

          {/* Technical Specs List */}
          <div className="space-y-2 p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/30 border border-slate-200/60 dark:border-slate-700/60">
            <h4 className="font-bold text-slate-900 dark:text-slate-100 flex items-center gap-1.5 mb-2">
              <Cpu className="w-4 h-4 text-brand-500" />
              <span>Hardware Metadata</span>
            </h4>

            <div className="flex justify-between py-1 border-b border-slate-200/50 dark:border-slate-800/50">
              <span className="text-slate-400 flex items-center gap-1">
                <Hash className="w-3.5 h-3.5" /> Device Address / MAC:
              </span>
              <span className="font-mono font-semibold">{device.address}</span>
            </div>

            <div className="flex justify-between py-1 border-b border-slate-200/50 dark:border-slate-800/50">
              <span className="text-slate-400 flex items-center gap-1">
                <Radio className="w-3.5 h-3.5" /> Subcategory:
              </span>
              <span className="font-semibold">{device.subCategory}</span>
            </div>

            <div className="flex justify-between py-1 border-b border-slate-200/50 dark:border-slate-800/50">
              <span className="text-slate-400 flex items-center gap-1">
                <Clock className="w-3.5 h-3.5" /> First Discovered:
              </span>
              <span>{new Date(device.firstDiscovered).toLocaleDateString()}</span>
            </div>

            <div className="flex justify-between py-1">
              <span className="text-slate-400 flex items-center gap-1">
                <Clock className="w-3.5 h-3.5" /> Last Connected:
              </span>
              <span>{device.lastConnected ? new Date(device.lastConnected).toLocaleString() : 'Never'}</span>
            </div>
          </div>

          {/* Supported Profiles */}
          <div>
            <h4 className="font-bold text-slate-900 dark:text-slate-100 mb-2 flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-emerald-500" />
              <span>Supported Bluetooth Profiles</span>
            </h4>
            <div className="flex flex-wrap gap-1.5">
              {device.supportedProfiles.map((prof, i) => (
                <span
                  key={i}
                  className="px-2.5 py-1 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-mono text-[11px] border border-slate-200 dark:border-slate-700"
                >
                  {prof}
                </span>
              ))}
            </div>
          </div>

          {/* Recent Event History */}
          <div>
            <h4 className="font-bold text-slate-900 dark:text-slate-100 mb-2 flex items-center gap-1.5">
              <Activity className="w-4 h-4 text-purple-500" />
              <span>Connection Log History</span>
            </h4>

            {deviceLogs.length === 0 ? (
              <p className="text-[11px] text-slate-400 italic">No recent connection log events recorded.</p>
            ) : (
              <div className="space-y-1.5 max-h-36 overflow-y-auto">
                {deviceLogs.map((log) => (
                  <div key={log.id} className="flex items-center justify-between p-2 rounded-lg bg-slate-100 dark:bg-slate-800/60 text-[11px]">
                    <div>
                      <span className="font-semibold capitalize text-brand-600 dark:text-brand-400">{log.eventType}</span>
                      {log.details && <span className="text-slate-400 ml-2">— {log.details}</span>}
                    </div>
                    <span className="text-slate-400 shrink-0 font-mono">{new Date(log.timestamp).toLocaleTimeString()}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/40 flex justify-end">
          <button
            onClick={closeModal}
            className="px-4 py-2 rounded-xl text-xs font-semibold bg-slate-200 dark:bg-slate-800 text-slate-800 dark:text-slate-200 hover:bg-slate-300 dark:hover:bg-slate-700 transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
