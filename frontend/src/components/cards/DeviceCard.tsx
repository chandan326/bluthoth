import React from 'react';
import { BluetoothDevice } from '../../types/bluetooth';
import { useBluetoothStore } from '../../store/bluetoothStore';
import { BatteryIndicator } from '../common/BatteryIndicator';
import { SignalIndicator } from '../common/SignalIndicator';
import {
  Headphones,
  Speaker,
  Keyboard,
  Mouse,
  Gamepad2,
  Smartphone,
  Tablet,
  Printer,
  Cpu,
  Bluetooth,
  Star,
  Edit2,
  Info,
  Unlink,
  Link,
  ShieldCheck,
  CheckCircle2,
  RefreshCw,
  Trash2,
} from 'lucide-react';

interface Props {
  device: BluetoothDevice;
}

export const DeviceCard: React.FC<Props> = ({ device }) => {
  const {
    pairDevice,
    connectDevice,
    disconnectDevice,
    forgetDevice,
    toggleFavorite,
    openModal,
    selectedDeviceIds,
    toggleSelectDevice,
  } = useBluetoothStore();

  const isSelected = selectedDeviceIds.includes(device.id);

  // Dynamic icon selection
  const getDeviceIcon = () => {
    switch (device.subCategory) {
      case 'Headphones':
      case 'Earbuds':
        return Headphones;
      case 'Speaker':
        return Speaker;
      case 'Keyboard':
        return Keyboard;
      case 'Mouse':
        return Mouse;
      case 'Controller':
        return Gamepad2;
      case 'Smartphone':
        return Smartphone;
      case 'Tablet':
        return Tablet;
      case 'Printer':
        return Printer;
      case 'IoT':
        return Cpu;
      default:
        return Bluetooth;
    }
  };

  const IconComponent = getDeviceIcon();

  const isConnected = device.connectionStatus === 'connected';
  const isConnecting = device.connectionStatus === 'connecting';
  const isDisconnecting = device.connectionStatus === 'disconnecting';
  const isPairing = device.pairingStatus === 'pairing';
  const isPaired = device.pairingStatus === 'paired';

  return (
    <div
      className={`group relative flex flex-col justify-between p-4 rounded-2xl transition-all duration-200 border ${
        isSelected
          ? 'bg-brand-500/5 dark:bg-brand-500/10 border-brand-500 shadow-md ring-1 ring-brand-500'
          : isConnected
          ? 'bg-white dark:bg-slate-900 border-emerald-500/30 dark:border-emerald-500/20 shadow-sm hover:shadow-md'
          : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 shadow-sm hover:border-slate-300 dark:hover:border-slate-700 hover:shadow-md'
      }`}
    >
      {/* Top Bar: Checkbox, Icon, Category Badge, Favorite Star */}
      <div>
        <div className="flex items-start justify-between gap-3 mb-3">
          <div className="flex items-center gap-3">
            {/* Checkbox */}
            <input
              type="checkbox"
              checked={isSelected}
              onChange={() => toggleSelectDevice(device.id)}
              className="w-4 h-4 rounded text-brand-600 focus:ring-brand-500 border-slate-300 dark:border-slate-700 cursor-pointer"
            />

            {/* Device Icon Container */}
            <div
              className={`w-11 h-11 rounded-xl flex items-center justify-center transition-colors ${
                isConnected
                  ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20'
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 border border-slate-200/80 dark:border-slate-700/80'
              }`}
            >
              <IconComponent className="w-5 h-5" />
            </div>

            {/* Names */}
            <div>
              <div className="flex items-center gap-1.5">
                <h3 className="text-sm font-bold text-slate-900 dark:text-slate-100 truncate max-w-[160px] sm:max-w-[200px]" title={device.displayName}>
                  {device.displayName}
                </h3>
                {device.displayName !== device.originalName && (
                  <span className="text-[10px] px-1 rounded bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400" title={`Original Windows Name: ${device.originalName}`}>
                    App Name
                  </span>
                )}
              </div>

              <p className="text-[11px] text-slate-500 dark:text-slate-400 font-mono truncate max-w-[160px]" title={`Hardware Name: ${device.originalName} (${device.address})`}>
                {device.originalName}
              </p>
            </div>
          </div>

          {/* Favorite Star */}
          <button
            onClick={() => toggleFavorite(device.id)}
            className={`p-1.5 rounded-lg transition-colors ${
              device.isFavorite
                ? 'text-amber-400 hover:bg-amber-400/10'
                : 'text-slate-300 dark:text-slate-600 hover:text-amber-400 hover:bg-slate-100 dark:hover:bg-slate-800'
            }`}
            title={device.isFavorite ? 'Remove from favorites' : 'Add to favorites'}
          >
            <Star className={`w-4 h-4 ${device.isFavorite ? 'fill-amber-400' : ''}`} />
          </button>
        </div>

        {/* Status Pills & Indicators */}
        <div className="flex flex-wrap items-center gap-2 mb-4">
          {/* Connection Status Pill */}
          <span
            className={`flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-semibold border ${
              isConnected
                ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20'
                : isConnecting || isDisconnecting || isPairing
                ? 'bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/20'
                : isPaired
                ? 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 border-slate-200 dark:border-slate-700'
                : 'bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20'
            }`}
          >
            {isConnecting || isDisconnecting || isPairing ? (
              <RefreshCw className="w-3 h-3 animate-spin" />
            ) : isConnected ? (
              <CheckCircle2 className="w-3 h-3 text-emerald-500" />
            ) : null}

            <span className="capitalize">
              {isConnecting
                ? 'Connecting...'
                : isDisconnecting
                ? 'Disconnecting...'
                : isPairing
                ? 'Pairing...'
                : isConnected
                ? 'Connected'
                : isPaired
                ? 'Paired'
                : 'Available'}
            </span>
          </span>

          {/* Audio Endpoint Pill */}
          {device.audioEndpointActive && (
            <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-purple-500/10 text-purple-600 dark:text-purple-400 border border-purple-500/20">
              Sound Output Active
            </span>
          )}

          {/* Subcategory */}
          <span className="px-2 py-0.5 rounded-full text-[10px] font-medium bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400">
            {device.subCategory}
          </span>
        </div>

        {/* Battery & Signal Stats Row */}
        <div className="flex items-center justify-between text-xs py-2 px-3 rounded-xl bg-slate-50 dark:bg-slate-800/50 mb-4">
          <BatteryIndicator battery={device.battery} />
          <SignalIndicator signal={device.signal} />
        </div>
      </div>

      {/* Action Buttons Row */}
      <div className="flex items-center justify-between gap-1.5 pt-3 border-t border-slate-100 dark:border-slate-800/80">
        <div className="flex items-center gap-1">
          {/* Details */}
          <button
            onClick={() => openModal('details', device.id)}
            className="p-1.5 rounded-lg text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-slate-800 dark:hover:text-slate-200 transition-colors"
            title="View Device Details"
          >
            <Info className="w-4 h-4" />
          </button>

          {/* Rename */}
          <button
            onClick={() => openModal('rename', device.id)}
            className="p-1.5 rounded-lg text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-slate-800 dark:hover:text-slate-200 transition-colors"
            title="Rename Device Nickname"
          >
            <Edit2 className="w-4 h-4" />
          </button>

          {/* Forget / Unpair if paired */}
          {isPaired && (
            <button
              onClick={() => forgetDevice(device.id)}
              className="p-1.5 rounded-lg text-slate-400 hover:text-rose-500 hover:bg-rose-500/10 transition-colors"
              title="Forget / Unpair Device"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Primary Connect / Disconnect / Pair Button */}
        <div className="flex items-center gap-1.5">
          {!isPaired && !isConnected && (
            <button
              onClick={() => pairDevice(device.id)}
              disabled={isPairing}
              className="flex items-center gap-1 py-1.5 px-3 rounded-xl text-xs font-semibold bg-amber-500/10 text-amber-600 dark:text-amber-400 hover:bg-amber-500/20 border border-amber-500/20 transition-all"
            >
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Pair</span>
            </button>
          )}

          {isConnected ? (
            <button
              onClick={() => disconnectDevice(device.id)}
              disabled={isDisconnecting}
              className="flex items-center gap-1.5 py-1.5 px-3 rounded-xl text-xs font-semibold bg-rose-500/10 text-rose-600 dark:text-rose-400 hover:bg-rose-500/20 border border-rose-500/20 transition-all"
            >
              <Unlink className="w-3.5 h-3.5" />
              <span>Disconnect</span>
            </button>
          ) : (
            <button
              onClick={() => connectDevice(device.id)}
              disabled={isConnecting}
              className="flex items-center gap-1.5 py-1.5 px-3 rounded-xl text-xs font-semibold bg-brand-600 hover:bg-brand-500 text-white shadow-sm shadow-brand-600/20 active:scale-95 transition-all"
            >
              <Link className="w-3.5 h-3.5" />
              <span>Connect</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
