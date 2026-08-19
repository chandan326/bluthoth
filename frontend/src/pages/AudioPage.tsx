import React from 'react';
import { useBluetoothStore } from '../store/bluetoothStore';
import { BatteryIndicator } from '../components/common/BatteryIndicator';
import { Headphones, Speaker, Volume2, ShieldAlert, Sliders, ExternalLink, CheckCircle2 } from 'lucide-react';

export const AudioPage: React.FC = () => {
  const { devices, connectDevice, disconnectDevice } = useBluetoothStore();

  const audioDevices = devices.filter((d) => d.category === 'Audio');
  const connectedAudio = audioDevices.filter((d) => d.connectionStatus === 'connected');

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div>
        <h1 className="text-xl font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2">
          <Headphones className="w-5 h-5 text-purple-500" />
          <span>Bluetooth Audio Devices</span>
        </h1>
        <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
          Manage Bluetooth headphones, earbuds, speakers, and Windows audio endpoints.
        </p>
      </div>

      {/* Simultaneous Playback Hardware Warning */}
      {connectedAudio.length > 1 && (
        <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/20 text-amber-800 dark:text-amber-300 text-xs flex items-start gap-3">
          <ShieldAlert className="w-5 h-5 shrink-0 text-amber-500 mt-0.5" />
          <div className="space-y-1">
            <h4 className="font-bold text-sm">
              Your current Windows configuration does not support simultaneous audio output to these devices.
            </h4>
            <p className="opacity-90 leading-relaxed">
              Windows defaults to routing sound output to one primary A2DP endpoint at a time. To mirror sound across multiple speakers or headsets simultaneously, enable "Stereo Mix" in Windows Sound Settings or use third-party virtual audio cables.
            </p>
          </div>
        </div>
      )}

      {/* Active Sound Endpoint Banner */}
      <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-purple-500/10 text-purple-600 dark:text-purple-400 flex items-center justify-center">
            <Volume2 className="w-5 h-5 animate-pulse" />
          </div>
          <div>
            <span className="text-[10px] font-bold text-purple-600 dark:text-purple-400 uppercase tracking-widest">
              Default Windows Audio Output
            </span>
            <div className="text-sm font-bold text-slate-900 dark:text-slate-100 mt-0.5">
              {connectedAudio.find((d) => d.audioEndpointActive)?.displayName || 'No active Bluetooth audio endpoint'}
            </div>
          </div>
        </div>

        <button
          onClick={() => window.open('ms-settings:sound', '_blank')}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 transition-colors"
        >
          <Sliders className="w-3.5 h-3.5" />
          <span className="hidden sm:inline">Windows Sound Control</span>
          <ExternalLink className="w-3 h-3" />
        </button>
      </div>

      {/* Audio Devices Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {audioDevices.map((device) => {
          const isConnected = device.connectionStatus === 'connected';

          return (
            <div
              key={device.id}
              className={`p-4 rounded-2xl border transition-all ${
                device.audioEndpointActive
                  ? 'bg-purple-500/5 dark:bg-purple-500/10 border-purple-500/40 shadow-sm'
                  : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800'
              }`}
            >
              <div className="flex items-start justify-between gap-3 mb-3">
                <div className="flex items-center gap-3">
                  <div
                    className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                      isConnected
                        ? 'bg-purple-500/10 text-purple-600 dark:text-purple-400'
                        : 'bg-slate-100 dark:bg-slate-800 text-slate-400'
                    }`}
                  >
                    {device.subCategory === 'Speaker' ? <Speaker className="w-5 h-5" /> : <Headphones className="w-5 h-5" />}
                  </div>

                  <div>
                    <h3 className="text-sm font-bold text-slate-900 dark:text-slate-100">{device.displayName}</h3>
                    <p className="text-[11px] text-slate-400 font-mono">{device.originalName}</p>
                  </div>
                </div>

                <BatteryIndicator battery={device.battery} />
              </div>

              {/* Profiles & Audio Status */}
              <div className="space-y-2 mb-4">
                <div className="flex items-center justify-between text-xs py-1 border-b border-slate-100 dark:border-slate-800">
                  <span className="text-slate-400">Audio Profile:</span>
                  <span className="font-semibold text-slate-700 dark:text-slate-300">
                    {device.supportedProfiles.find((p) => p.includes('A2DP')) || 'A2DP High-Quality Audio'}
                  </span>
                </div>

                <div className="flex items-center justify-between text-xs py-1">
                  <span className="text-slate-400">Endpoint Status:</span>
                  {device.audioEndpointActive ? (
                    <span className="flex items-center gap-1 font-bold text-emerald-500">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      Primary Sound Output
                    </span>
                  ) : isConnected ? (
                    <span className="text-amber-500 font-semibold">Connected (Secondary)</span>
                  ) : (
                    <span className="text-slate-400">Disconnected</span>
                  )}
                </div>
              </div>

              {/* Actions */}
              <div className="flex items-center justify-end gap-2 pt-2 border-t border-slate-100 dark:border-slate-800">
                {isConnected ? (
                  <button
                    onClick={() => disconnectDevice(device.id)}
                    className="px-3 py-1.5 rounded-xl text-xs font-semibold bg-rose-500/10 text-rose-600 dark:text-rose-400 hover:bg-rose-500/20 border border-rose-500/20 transition-all"
                  >
                    Disconnect
                  </button>
                ) : (
                  <button
                    onClick={() => connectDevice(device.id)}
                    className="px-3.5 py-1.5 rounded-xl text-xs font-semibold bg-brand-600 hover:bg-brand-500 text-white shadow-sm transition-all"
                  >
                    Set Active & Connect
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
