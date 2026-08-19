import React from 'react';
import { useBluetoothStore } from '../store/bluetoothStore';
import { DeviceCard } from '../components/cards/DeviceCard';
import { RadarScan } from '../components/discovery/RadarScan';
import { DeviceCategory } from '../types/bluetooth';
import {
  Search,
  Radar,
  SlidersHorizontal,
  Headphones,
  Keyboard,
  Smartphone,
  Layers,
  CheckSquare,
  Square,
  Link,
  Unlink,
} from 'lucide-react';

export const DevicesPage: React.FC = () => {
  const {
    searchQuery,
    setSearchQuery,
    selectedCategory,
    setCategory,
    selectedStatus,
    setStatusFilter,
    sortBy,
    setSortBy,
    startScan,
    isScanning,
    getFilteredDevices,
    selectedDeviceIds,
    selectAll,
    clearSelection,
    connectSelected,
    disconnectSelected,
  } = useBluetoothStore();

  const filteredDevices = getFilteredDevices();
  const allSelected = filteredDevices.length > 0 && selectedDeviceIds.length === filteredDevices.length;

  const categories: Array<{ id: 'All' | DeviceCategory; label: string; icon: any }> = [
    { id: 'All', label: 'All Categories', icon: Layers },
    { id: 'Audio', label: 'Audio Devices', icon: Headphones },
    { id: 'Input', label: 'Input Devices', icon: Keyboard },
    { id: 'Mobile', label: 'Mobile & Tablets', icon: Smartphone },
    { id: 'Other', label: 'Printers & IoT', icon: SlidersHorizontal },
  ];

  const statusFilters: Array<{ id: 'All' | 'Connected' | 'Paired' | 'Available' | 'Favorites'; label: string }> = [
    { id: 'All', label: 'All Devices' },
    { id: 'Connected', label: 'Connected' },
    { id: 'Paired', label: 'Paired' },
    { id: 'Available', label: 'Available (Discovered)' },
    { id: 'Favorites', label: 'Favorites ★' },
  ];

  return (
    <div className="space-y-6">
      
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2">
            <Search className="w-5 h-5 text-brand-600 dark:text-brand-400" />
            <span>Device Discovery & Management</span>
          </h1>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            Scan for nearby Bluetooth hardware, organize categories, pair, and connect.
          </p>
        </div>

        <button
          onClick={startScan}
          disabled={isScanning}
          className={`flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold shadow-md transition-all ${
            isScanning
              ? 'bg-brand-500/20 text-brand-400 cursor-not-allowed border border-brand-500/30'
              : 'bg-brand-600 hover:bg-brand-500 text-white shadow-brand-600/25 active:scale-95'
          }`}
        >
          <Radar className={`w-4 h-4 ${isScanning ? 'animate-spin' : ''}`} />
          <span>{isScanning ? 'Scanning Radar...' : 'Scan for Devices'}</span>
        </button>
      </div>

      {/* Radar Scan Section */}
      <RadarScan />

      {/* Search & Filter Toolbar */}
      <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
        
        {/* Search Input & Sort Selector */}
        <div className="flex flex-col sm:flex-row items-center gap-3">
          <div className="relative flex-1 w-full">
            <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by device name, category, or MAC address..."
              className="w-full pl-10 pr-4 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-slate-100 text-xs border border-slate-200 dark:border-slate-700 focus:outline-none focus:ring-2 focus:ring-brand-500 font-medium"
            />
          </div>

          <div className="flex items-center gap-2 w-full sm:w-auto shrink-0">
            <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">Sort by:</span>
            <select
              value={sortBy}
              onChange={(e: any) => setSortBy(e.target.value)}
              className="py-2 px-3 rounded-xl bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-slate-100 text-xs border border-slate-200 dark:border-slate-700 focus:outline-none focus:ring-2 focus:ring-brand-500 font-semibold cursor-pointer"
            >
              <option value="name">Device Name</option>
              <option value="status">Status (Connected First)</option>
              <option value="battery">Battery %</option>
              <option value="signal">Signal RSSI</option>
              <option value="lastConnected">Last Connected</option>
            </select>
          </div>
        </div>

        {/* Category Pills */}
        <div className="flex flex-wrap items-center gap-2">
          {categories.map((cat) => {
            const Icon = cat.icon;
            const isSel = selectedCategory === cat.id;

            return (
              <button
                key={cat.id}
                onClick={() => setCategory(cat.id)}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold border transition-all ${
                  isSel
                    ? 'bg-brand-600 text-white border-brand-600 shadow-sm shadow-brand-600/20'
                    : 'bg-slate-50 dark:bg-slate-800/80 text-slate-600 dark:text-slate-300 border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-750'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{cat.label}</span>
              </button>
            );
          })}
        </div>

        {/* Status Filter Row */}
        <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-slate-100 dark:border-slate-800">
          <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider mr-2">Filter:</span>
          {statusFilters.map((st) => (
            <button
              key={st.id}
              onClick={() => setStatusFilter(st.id)}
              className={`px-2.5 py-1 rounded-lg text-xs font-medium transition-colors ${
                selectedStatus === st.id
                  ? 'bg-slate-900 text-white dark:bg-white dark:text-slate-900 font-bold'
                  : 'text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200'
              }`}
            >
              {st.label}
            </button>
          ))}
        </div>
      </div>

      {/* Multi-Selection Batch Actions Toolbar */}
      {selectedDeviceIds.length > 0 && (
        <div className="p-3.5 rounded-2xl bg-brand-500/10 border border-brand-500/30 flex items-center justify-between gap-4 animate-fade-in">
          <div className="flex items-center gap-3">
            <button
              onClick={allSelected ? clearSelection : selectAll}
              className="flex items-center gap-1.5 text-xs font-bold text-brand-600 dark:text-brand-400 hover:underline"
            >
              {allSelected ? <CheckSquare className="w-4 h-4" /> : <Square className="w-4 h-4" />}
              <span>{selectedDeviceIds.length} Selected</span>
            </button>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={connectSelected}
              className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-bold bg-brand-600 hover:bg-brand-500 text-white shadow-sm transition-all"
            >
              <Link className="w-3.5 h-3.5" />
              <span>Connect Selected</span>
            </button>

            <button
              onClick={disconnectSelected}
              className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-bold bg-rose-600 hover:bg-rose-500 text-white shadow-sm transition-all"
            >
              <Unlink className="w-3.5 h-3.5" />
              <span>Disconnect Selected</span>
            </button>
          </div>
        </div>
      )}

      {/* Device Grid */}
      {filteredDevices.length === 0 ? (
        <div className="p-12 text-center rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
          <Search className="w-12 h-12 text-slate-300 dark:text-slate-700 mx-auto mb-3" />
          <h3 className="text-sm font-bold text-slate-800 dark:text-slate-200">No Bluetooth Devices Found</h3>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 max-w-sm mx-auto">
            Make sure Bluetooth is enabled on your device and peripherals are in pairing mode.
          </p>
          <button
            onClick={startScan}
            className="mt-4 px-4 py-2 rounded-xl text-xs font-semibold bg-brand-600 hover:bg-brand-500 text-white shadow-sm"
          >
            Scan Again
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredDevices.map((device) => (
            <DeviceCard key={device.id} device={device} />
          ))}
        </div>
      )}
    </div>
  );
};
