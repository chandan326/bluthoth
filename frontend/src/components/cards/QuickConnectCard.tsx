import React from 'react';
import { BluetoothDevice } from '../../types/bluetooth';
import { useBluetoothStore } from '../../store/bluetoothStore';
import { BatteryIndicator } from '../common/BatteryIndicator';
import { Headphones, Speaker, Keyboard, Mouse, Gamepad2, Smartphone, Tablet, Bluetooth, Zap } from 'lucide-react';

interface Props {
  device: BluetoothDevice;
}

export const QuickConnectCard: React.FC<Props> = ({ device }) => {
  const { connectDevice, disconnectDevice } = useBluetoothStore();

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
      default:
        return Bluetooth;
    }
  };

  const IconComponent = getDeviceIcon();
  const isConnected = device.connectionStatus === 'connected';

  return (
    <div className="flex items-center justify-between p-3.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm hover:border-brand-500/50 transition-all">
      <div className="flex items-center gap-3">
        <div
          className={`w-9 h-9 rounded-lg flex items-center justify-center ${
            isConnected
              ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400'
              : 'bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400'
          }`}
        >
          <IconComponent className="w-4 h-4" />
        </div>

        <div>
          <h4 className="text-xs font-bold text-slate-900 dark:text-slate-100 truncate max-w-[140px]">
            {device.displayName}
          </h4>
          <div className="flex items-center gap-2 mt-0.5">
            <span className="text-[10px] text-slate-400">
              {device.lastConnected ? 'Recently used' : 'Paired'}
            </span>
            <BatteryIndicator battery={device.battery} showLabel={true} />
          </div>
        </div>
      </div>

      {isConnected ? (
        <button
          onClick={() => disconnectDevice(device.id)}
          className="px-2.5 py-1 rounded-lg text-xs font-medium bg-rose-500/10 text-rose-600 dark:text-rose-400 hover:bg-rose-500/20 transition-colors"
        >
          Disconnect
        </button>
      ) : (
        <button
          onClick={() => connectDevice(device.id)}
          className="flex items-center gap-1 px-3 py-1 rounded-lg text-xs font-semibold bg-brand-600 hover:bg-brand-500 text-white shadow-sm transition-all active:scale-95"
        >
          <Zap className="w-3 h-3" />
          <span>Connect</span>
        </button>
      )}
    </div>
  );
};
