import React from 'react';
import { useBluetoothStore } from '../../store/bluetoothStore';
import { X, ShieldCheck, CheckCircle, Info, Lock } from 'lucide-react';

export const PermissionsModal: React.FC = () => {
  const { activeModal, closeModal, addToast } = useBluetoothStore();

  if (activeModal !== 'permissions') return null;

  const handleGrantAccess = () => {
    addToast('Permissions Verified', 'Windows Bluetooth hardware permissions granted.', 'success');
    closeModal();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-sm animate-fade-in">
      <div className="w-full max-w-md rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-2xl overflow-hidden">
        
        {/* Header */}
        <div className="flex items-center justify-between p-5 border-b border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/40">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 flex items-center justify-center">
              <ShieldCheck className="w-4 h-4" />
            </div>
            <h3 className="text-base font-bold text-slate-900 dark:text-slate-100">
              Bluetooth Access Required
            </h3>
          </div>

          <button
            onClick={closeModal}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-5 space-y-4 text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
          <p className="font-semibold text-slate-900 dark:text-slate-100 text-sm">
            BlueHub needs permission to discover, pair, and manage Bluetooth hardware on this Windows PC.
          </p>

          <div className="space-y-2.5">
            <div className="flex items-start gap-2.5 p-3 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200/60 dark:border-slate-700/60">
              <CheckCircle className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
              <div>
                <span className="font-bold text-slate-900 dark:text-slate-100">Device Discovery & Radar</span>
                <p className="text-[11px] opacity-80 mt-0.5">Allows scanning nearby BLE and Classic Bluetooth peripherals.</p>
              </div>
            </div>

            <div className="flex items-start gap-2.5 p-3 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200/60 dark:border-slate-700/60">
              <CheckCircle className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
              <div>
                <span className="font-bold text-slate-900 dark:text-slate-100">Pairing & Connection Management</span>
                <p className="text-[11px] opacity-80 mt-0.5">Enables initiating SSP pairing PIN verification and profile connections.</p>
              </div>
            </div>

            <div className="flex items-start gap-2.5 p-3 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200/60 dark:border-slate-700/60">
              <Lock className="w-4 h-4 text-brand-500 shrink-0 mt-0.5" />
              <div>
                <span className="font-bold text-slate-900 dark:text-slate-100">Local Security & Privacy</span>
                <p className="text-[11px] opacity-80 mt-0.5">Communication happens exclusively on localhost (127.0.0.1). No data leaves your computer.</p>
              </div>
            </div>
          </div>

          <div className="p-3 rounded-xl bg-blue-500/10 border border-blue-500/20 text-blue-700 dark:text-blue-300 text-[11px] flex items-center gap-2">
            <Info className="w-4 h-4 shrink-0" />
            <span>You can adjust Windows Bluetooth Privacy settings at any time in Windows Settings.</span>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/40 flex items-center justify-end gap-2">
          <button
            onClick={closeModal}
            className="px-4 py-2 rounded-xl text-xs font-semibold bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-300 dark:hover:bg-slate-700 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleGrantAccess}
            className="px-4 py-2 rounded-xl text-xs font-semibold bg-emerald-600 hover:bg-emerald-500 text-white shadow-md shadow-emerald-600/20 transition-all"
          >
            Allow Access
          </button>
        </div>
      </div>
    </div>
  );
};
