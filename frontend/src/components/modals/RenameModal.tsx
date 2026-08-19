import React, { useState, useEffect } from 'react';
import { useBluetoothStore } from '../../store/bluetoothStore';
import { X, Edit3, AlertCircle } from 'lucide-react';

export const RenameModal: React.FC = () => {
  const { activeModal, activeDeviceId, devices, renameDevice, closeModal } = useBluetoothStore();
  const [customName, setCustomName] = useState('');

  const device = devices.find((d) => d.id === activeDeviceId);

  useEffect(() => {
    if (device) {
      setCustomName(device.displayName);
    }
  }, [device]);

  if (activeModal !== 'rename' || !device) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    renameDevice(device.id, customName);
    closeModal();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-sm animate-fade-in">
      <div className="w-full max-w-md rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-2xl overflow-hidden">
        
        {/* Header */}
        <div className="flex items-center justify-between p-5 border-b border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/40">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-brand-500/10 text-brand-600 dark:text-brand-400 flex items-center justify-center">
              <Edit3 className="w-4 h-4" />
            </div>
            <h3 className="text-base font-bold text-slate-900 dark:text-slate-100">
              Rename Device Nickname
            </h3>
          </div>

          <button
            onClick={closeModal}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-5 space-y-4">
          <div>
            <label className="block text-xs font-medium text-slate-500 dark:text-slate-400 mb-1">
              Windows Hardware Name
            </label>
            <input
              type="text"
              readOnly
              value={device.originalName}
              className="w-full py-2 px-3 rounded-xl bg-slate-100 dark:bg-slate-800/80 text-slate-500 dark:text-slate-400 text-xs border border-slate-200 dark:border-slate-700 cursor-not-allowed font-mono"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-800 dark:text-slate-200 mb-1">
              Application Display Nickname
            </label>
            <input
              type="text"
              value={customName}
              onChange={(e) => setCustomName(e.target.value)}
              placeholder="e.g. My Sony Headphones"
              className="w-full py-2.5 px-3.5 rounded-xl bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 text-xs border border-slate-300 dark:border-slate-700 focus:outline-none focus:ring-2 focus:ring-brand-500 font-semibold"
              autoFocus
            />
          </div>

          <div className="p-3 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-700 dark:text-amber-300 text-[11px] leading-relaxed flex items-start gap-2">
            <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
            <span>
              This custom nickname will be saved inside BlueHub. The actual Windows Bluetooth device name is not altered unless supported by hardware drivers.
            </span>
          </div>

          {/* Footer Buttons */}
          <div className="flex items-center justify-end gap-2 pt-2">
            <button
              type="button"
              onClick={closeModal}
              className="px-4 py-2 rounded-xl text-xs font-semibold bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 rounded-xl text-xs font-semibold bg-brand-600 hover:bg-brand-500 text-white shadow-md shadow-brand-600/20 transition-all"
            >
              Save Nickname
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
