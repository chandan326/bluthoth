import React from 'react';
import { useBluetoothStore } from '../../store/bluetoothStore';
import { Bluetooth, Radar, XCircle } from 'lucide-react';

export const RadarScan: React.FC = () => {
  const { isScanning, scanProgress, stopScan, devices } = useBluetoothStore();

  if (!isScanning) return null;

  return (
    <div className="relative overflow-hidden p-6 rounded-2xl bg-gradient-to-br from-slate-900 via-slate-900 to-brand-950 text-white border border-brand-500/30 shadow-xl mb-6">
      
      {/* Animated Radar Pulse Background Circles */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-25">
        <div className="w-64 h-64 rounded-full border border-brand-400 animate-ping-slow"></div>
        <div className="absolute w-44 h-44 rounded-full border border-brand-500 opacity-60"></div>
        <div className="absolute w-24 h-24 rounded-full border border-brand-600 opacity-80"></div>
      </div>

      <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-6">
        
        {/* Radar Icon & Status */}
        <div className="flex items-center gap-4">
          <div className="relative w-16 h-16 rounded-full bg-brand-500/20 border border-brand-400/40 flex items-center justify-center shrink-0">
            <div className="absolute inset-0 rounded-full radar-sweep animate-radar"></div>
            <Bluetooth className="w-8 h-8 text-brand-400 z-10 animate-pulse" />
          </div>

          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-base font-bold text-white">Scanning for Nearby Bluetooth Devices...</h3>
              <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-brand-500/20 text-brand-300 uppercase tracking-widest border border-brand-500/30">
                Live Radar
              </span>
            </div>
            <p className="text-xs text-slate-300 mt-1">
              Searching for discoverable headphones, controllers, keyboards, mice & mobile devices.
            </p>
          </div>
        </div>

        {/* Progress & Cancel Button */}
        <div className="flex items-center gap-4 w-full md:w-auto">
          <div className="flex-1 md:w-48">
            <div className="flex justify-between text-xs font-semibold mb-1 text-slate-300">
              <span>Discovery Progress</span>
              <span>{scanProgress}%</span>
            </div>
            <div className="w-full h-2 rounded-full bg-slate-800 overflow-hidden border border-slate-700">
              <div
                className="h-full bg-gradient-to-r from-brand-500 to-blue-400 transition-all duration-300 rounded-full"
                style={{ width: `${scanProgress}%` }}
              ></div>
            </div>
          </div>

          <button
            onClick={stopScan}
            className="flex items-center gap-1.5 py-2 px-3.5 rounded-xl text-xs font-semibold bg-white/10 hover:bg-white/20 text-white border border-white/20 transition-colors shrink-0"
          >
            <XCircle className="w-4 h-4 text-rose-400" />
            <span>Cancel</span>
          </button>
        </div>
      </div>
    </div>
  );
};
