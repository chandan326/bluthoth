import React from 'react';
import { useBluetoothStore } from '../store/bluetoothStore';
import { DeviceCard } from '../components/cards/DeviceCard';
import { Link2, Unlink, AlertCircle, Bluetooth } from 'lucide-react';

export const ConnectedPage: React.FC = () => {
  const { devices, selectedDeviceIds, disconnectSelected, clearSelection } = useBluetoothStore();

  const connectedDevices = devices.filter((d) => d.connectionStatus === 'connected');

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2">
            <Link2 className="w-5 h-5 text-emerald-500" />
            <span>Connected Devices Manager</span>
          </h1>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            Active connections currently tied to Windows Bluetooth adapter drivers.
          </p>
        </div>

        {connectedDevices.length > 0 && (
          <button
            onClick={disconnectSelected}
            disabled={selectedDeviceIds.length === 0}
            className={`flex items-center justify-center gap-2 px-4 py-2 rounded-xl text-xs font-bold shadow-sm transition-all ${
              selectedDeviceIds.length > 0
                ? 'bg-rose-600 hover:bg-rose-500 text-white shadow-rose-600/20 active:scale-95'
                : 'bg-slate-100 dark:bg-slate-800 text-slate-400 cursor-not-allowed border border-slate-200 dark:border-slate-700'
            }`}
          >
            <Unlink className="w-4 h-4" />
            <span>Disconnect Selected ({selectedDeviceIds.length})</span>
          </button>
        )}
      </div>

      {/* Hardware Limits Notice Banner */}
      <div className="p-4 rounded-2xl bg-blue-500/10 border border-blue-500/20 text-blue-700 dark:text-blue-300 text-xs flex items-start gap-3">
        <AlertCircle className="w-5 h-5 shrink-0 text-blue-500 mt-0.5" />
        <div className="leading-relaxed">
          <span className="font-bold">Windows Hardware & Simultaneous Connection Note:</span>
          <p className="mt-0.5 opacity-90">
            Windows adapters generally support up to 7 active Bluetooth Classic connections (e.g. 1 mouse, 1 keyboard, 1 gamepad, 1 headset). Connecting multiple Bluetooth audio headsets simultaneously is restricted by standard Windows sound drivers.
          </p>
        </div>
      </div>

      {/* Connected Devices Grid */}
      {connectedDevices.length === 0 ? (
        <div className="p-12 text-center rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
          <Bluetooth className="w-12 h-12 text-slate-300 dark:text-slate-700 mx-auto mb-3" />
          <h3 className="text-sm font-bold text-slate-800 dark:text-slate-200">No Devices Currently Connected</h3>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 max-w-sm mx-auto">
            Your connected Bluetooth devices will appear here once linked.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {connectedDevices.map((device) => (
            <DeviceCard key={device.id} device={device} />
          ))}
        </div>
      )}
    </div>
  );
};
