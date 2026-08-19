import React from 'react';
import { useBluetoothStore } from '../../store/bluetoothStore';
import { X, Download, Terminal, Cpu, Play, CheckCircle2, ShieldCheck } from 'lucide-react';

export const DownloadAgentModal: React.FC = () => {
  const { activeModal, closeModal, toggleDemoMode } = useBluetoothStore();

  if (activeModal !== 'download_agent') return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-sm animate-fade-in">
      <div className="w-full max-w-xl rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        
        {/* Header */}
        <div className="flex items-center justify-between p-5 border-b border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/40">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-brand-600 text-white flex items-center justify-center shadow-md shadow-brand-600/20">
              <Download className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-900 dark:text-slate-100">
                Install BlueHub Windows Agent
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Native companion app required for real Windows Bluetooth hardware control
              </p>
            </div>
          </div>

          <button
            onClick={closeModal}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-5 overflow-y-auto space-y-5 text-xs text-slate-700 dark:text-slate-300">
          
          <div className="p-3.5 rounded-xl bg-brand-500/10 border border-brand-500/20 text-brand-700 dark:text-brand-300 flex items-start gap-2.5">
            <ShieldCheck className="w-5 h-5 shrink-0 mt-0.5 text-brand-500" />
            <p className="leading-relaxed">
              Browser security restricts web pages from directly accessing raw Bluetooth radios. The BlueHub Agent runs locally on Windows, serving as a secure IPC bridge on <code className="bg-brand-500/20 px-1 py-0.5 rounded font-mono font-bold">ws://localhost:8765</code>.
            </p>
          </div>

          {/* Option A: Python WinRT Native Agent */}
          <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/50 space-y-3">
            <div className="flex items-center justify-between">
              <span className="font-bold text-slate-900 dark:text-slate-100 text-sm flex items-center gap-2">
                <Play className="w-4 h-4 text-emerald-500" />
                Option A: Instant Launch (Python Agent)
              </span>
              <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">
                Zero Compile Needed
              </span>
            </div>

            <p className="text-xs text-slate-500 dark:text-slate-400">
              Run the native Python WinRT Bluetooth companion directly from your terminal:
            </p>

            <div className="p-3 rounded-lg bg-slate-900 text-emerald-400 font-mono text-[11px] space-y-1 overflow-x-auto select-all">
              <div>cd windows-agent</div>
              <div>py python_agent.py</div>
            </div>
          </div>

          {/* Option B: C# .NET 8 Project */}
          <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/50 space-y-3">
            <div className="flex items-center justify-between">
              <span className="font-bold text-slate-900 dark:text-slate-100 text-sm flex items-center gap-2">
                <Cpu className="w-4 h-4 text-brand-500" />
                Option B: .NET 8 C# Native Binary
              </span>
              <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-brand-500/10 text-brand-600 dark:text-brand-400">
                High Performance
              </span>
            </div>

            <p className="text-xs text-slate-500 dark:text-slate-400">
              Build and run the compiled C# Windows Bluetooth Service:
            </p>

            <div className="p-3 rounded-lg bg-slate-900 text-blue-400 font-mono text-[11px] space-y-1 overflow-x-auto select-all">
              <div>cd windows-agent</div>
              <div>dotnet run -c Release</div>
            </div>
          </div>

          {/* Status Check Checklist */}
          <div className="space-y-2">
            <h4 className="font-bold text-slate-900 dark:text-slate-100">Verification Steps:</h4>
            <div className="space-y-1.5 text-[11px] text-slate-600 dark:text-slate-400">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                <span>Ensure Windows Bluetooth radio is turned ON in Action Center.</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                <span>Launch agent via Python or .NET CLI.</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                <span>Dashboard status will automatically switch to 🟢 Agent Online.</span>
              </div>
            </div>
          </div>

        </div>

        {/* Footer */}
        <div className="p-4 border-t border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/40 flex items-center justify-between">
          <button
            onClick={() => {
              toggleDemoMode();
              closeModal();
            }}
            className="text-xs font-semibold text-amber-600 dark:text-amber-400 hover:underline"
          >
            Continue in Demo Mode
          </button>

          <button
            onClick={closeModal}
            className="px-4 py-2 rounded-xl text-xs font-semibold bg-brand-600 hover:bg-brand-500 text-white shadow-md shadow-brand-600/20 transition-all"
          >
            Got It
          </button>
        </div>
      </div>
    </div>
  );
};
