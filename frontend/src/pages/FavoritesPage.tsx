import React from 'react';
import { useBluetoothStore } from '../store/bluetoothStore';
import { DeviceCard } from '../components/cards/DeviceCard';
import { Star, Bluetooth } from 'lucide-react';

export const FavoritesPage: React.FC = () => {
  const { devices } = useBluetoothStore();
  const favoriteDevices = devices.filter((d) => d.isFavorite);

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div>
        <h1 className="text-xl font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2">
          <Star className="w-5 h-5 text-amber-400 fill-amber-400" />
          <span>Favorite Devices</span>
        </h1>
        <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
          Quickly access and connect to your most frequently used Bluetooth hardware.
        </p>
      </div>

      {/* Favorites Grid */}
      {favoriteDevices.length === 0 ? (
        <div className="p-12 text-center rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
          <Star className="w-12 h-12 text-slate-300 dark:text-slate-700 mx-auto mb-3" />
          <h3 className="text-sm font-bold text-slate-800 dark:text-slate-200">No Favorite Devices Marked</h3>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 max-w-sm mx-auto">
            Click the star icon on any device card in Discovery or Dashboard to pin it here.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {favoriteDevices.map((device) => (
            <DeviceCard key={device.id} device={device} />
          ))}
        </div>
      )}
    </div>
  );
};
