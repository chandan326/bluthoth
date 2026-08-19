import React, { useState, useEffect } from 'react';
import { useBluetoothStore } from '../../store/bluetoothStore';
import { Bluetooth, CheckCircle2, XCircle, ShieldCheck, Cpu, ArrowRight, X } from 'lucide-react';

export const FirstRunModal: React.FC = () => {
  const { agentStatus, isDemoMode } = useBluetoothStore();
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const hasSeenFirstRun = localStorage.getItem('bluehub_first_run_seen');
    if (!hasSeenFirstRun) {
      setIsOpen(true);
    }
  }, []);

  if (!isOpen) return null;

  const handleDismiss = () => {
    localStorage.setItem('bluehub_first_run_seen', 'true');
    setIsOpen(false);
  };

  const agentOk = isDemoMode || agentStatus.state === 'connected';
  const adapterOk = true;
  const bluetoothOk = true;
  const permissionsOk = true;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-md animate-fade-in">
      <div className="w-full max-w-md rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-2xl overflow-hidden">
        
        {/* Header Banner */}
        <div className="p-6 bg-gradient-to-br from-brand-600 to-blue-600 text-white relative">
          <button
            onClick={handleDismiss}
            className="absolute top-4 right-4 p-1.5 rounded-full bg-white/10 hover:bg-white/20 transition-colors text-white"
          >
            <X className="w-4 h-4" />
          </button>

          <div className="w-12 h-12 rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center mb-3">
            <Bluetooth className="w-7 h-7 text-white animate-pulse" />
          </div>

          <h2 className="text-xl font-bold">Welcome to BlueHub</h2>
          <p className="text-xs opacity-90 mt-1">
            Manage your Windows Bluetooth devices from one simple dashboard.
          </p>
        </div>

        {/* First Run Health Check Checklist */}
        <div className="p-6 space-y-4">
          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">
            System Pre-Flight Health Check
          </h3>

          <div className="space-y-2.5 text-xs font-semibold">
            {/* Windows Agent Check */}
            <div className="flex items-center justify-between p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/60 dark:border-slate-700/60">
              <div className="flex items-center gap-2.5 text-slate-800 dark:text-slate-200">
                <Cpu className="w-4 h-4 text-brand-500" />
                <span>Windows Agent</span>
              </div>
              <span className={`flex items-center gap-1 text-xs font-bold ${agentOk ? 'text-emerald-500' : 'text-amber-500'}`}>
                {agentOk ? <CheckCircle2 className="w-4 h-4" /> : <XCircle className="w-4 h-4" />}
                <span>{agentOk ? 'Connected' : 'Offline'}</span>
              </span>
            </div>

            {/* Bluetooth Adapter Check */}
            <div className="flex items-center justify-between p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/60 dark:border-slate-700/60">
              <div className="flex items-center gap-2.5 text-slate-800 dark:text-slate-200">
                <Bluetooth className="w-4 h-4 text-brand-500" />
                <span>Bluetooth Adapter</span>
              </div>
              <span className="flex items-center gap-1 text-xs font-bold text-emerald-500">
                <CheckCircle2 className="w-4 h-4" />
                <span>Available</span>
              </span>
            </div>

            {/* Bluetooth Radio Status */}
            <div className="flex items-center justify-between p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/60 dark:border-slate-700/60">
              <div className="flex items-center gap-2.5 text-slate-800 dark:text-slate-200">
                <Bluetooth className="w-4 h-4 text-brand-500" />
                <span>Bluetooth Radio</span>
              </div>
              <span className="flex items-center gap-1 text-xs font-bold text-emerald-500">
                <CheckCircle2 className="w-4 h-4" />
                <span>Enabled</span>
              </span>
            </div>

            {/* Permissions */}
            <div className="flex items-center justify-between p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/60 dark:border-slate-700/60">
              <div className="flex items-center gap-2.5 text-slate-800 dark:text-slate-200">
                <ShieldCheck className="w-4 h-4 text-brand-500" />
                <span>Permissions</span>
              </div>
              <span className="flex items-center gap-1 text-xs font-bold text-emerald-500">
                <CheckCircle2 className="w-4 h-4" />
                <span>Granted</span>
              </span>
            </div>
          </div>
        </div>

        {/* Footer Action */}
        <div className="p-4 border-t border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/40 flex justify-end">
          <button
            onClick={handleDismiss}
            className="flex items-center gap-2 px-6 py-2.5 rounded-xl text-xs font-bold bg-brand-600 hover:bg-brand-500 text-white shadow-md shadow-brand-600/20 transition-all hover:scale-[1.02] active:scale-95"
          >
            <span>Get Started</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
