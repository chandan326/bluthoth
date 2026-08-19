import React, { useState } from 'react';
import { useBluetoothStore } from '../store/bluetoothStore';
import { Terminal, Trash2, Filter, Info, AlertTriangle, AlertCircle, Copy } from 'lucide-react';

export const LogsPage: React.FC = () => {
  const { systemLogs, clearLogs, addToast } = useBluetoothStore();
  const [filterLevel, setFilterLevel] = useState<'All' | 'info' | 'warn' | 'error'>('All');

  const filteredLogs = systemLogs.filter((log) => {
    if (filterLevel === 'All') return true;
    return log.level === filterLevel;
  });

  const handleCopyLogs = () => {
    const text = systemLogs.map((l) => `[${l.timestamp}] [${l.level.toUpperCase()}] ${l.message}`).join('\n');
    navigator.clipboard.writeText(text);
    addToast('Logs Copied', 'Copied log output to clipboard.', 'success');
  };

  return (
    <div className="space-y-6 max-w-4xl">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2">
            <Terminal className="w-5 h-5 text-emerald-500" />
            <span>Live System Audit Logger</span>
          </h1>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            Real-time developer log feed for hardware discovery, connection requests, and driver events.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleCopyLogs}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
          >
            <Copy className="w-3.5 h-3.5" />
            <span>Copy Logs</span>
          </button>

          {systemLogs.length > 0 && (
            <button
              onClick={clearLogs}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold bg-rose-500/10 text-rose-600 dark:text-rose-400 hover:bg-rose-500/20 border border-rose-500/20 transition-all"
            >
              <Trash2 className="w-3.5 h-3.5" />
              <span>Clear</span>
            </button>
          )}
        </div>
      </div>

      {/* Filter Row */}
      <div className="flex items-center gap-2 p-3 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm text-xs">
        <Filter className="w-4 h-4 text-slate-400 shrink-0 ml-1" />
        <span className="font-semibold text-slate-500 dark:text-slate-400">Filter Level:</span>
        {(['All', 'info', 'warn', 'error'] as const).map((level) => (
          <button
            key={level}
            onClick={() => setFilterLevel(level)}
            className={`px-2.5 py-1 rounded-lg text-xs font-semibold capitalize transition-colors ${
              filterLevel === level
                ? 'bg-brand-600 text-white shadow-sm'
                : 'text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
            }`}
          >
            {level}
          </button>
        ))}
      </div>

      {/* Console Feed Box */}
      <div className="rounded-2xl bg-slate-950 text-slate-200 border border-slate-800 shadow-xl overflow-hidden font-mono text-xs">
        <div className="flex items-center justify-between px-4 py-2.5 bg-slate-900 border-b border-slate-800 text-slate-400 text-[11px]">
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-rose-500/80"></span>
            <span className="w-3 h-3 rounded-full bg-amber-500/80"></span>
            <span className="w-3 h-3 rounded-full bg-emerald-500/80"></span>
            <span className="ml-2 font-bold text-slate-300">live-hardware.log</span>
          </div>
          <span>{filteredLogs.length} Entries</span>
        </div>

        <div className="p-4 space-y-2 max-h-[500px] overflow-y-auto">
          {filteredLogs.length === 0 ? (
            <p className="text-slate-500 italic">No log entries recorded for this filter level.</p>
          ) : (
            filteredLogs.map((log) => {
              let color = 'text-slate-300';
              let Icon = Info;

              if (log.level === 'warn') {
                color = 'text-amber-400';
                Icon = AlertTriangle;
              } else if (log.level === 'error') {
                color = 'text-rose-400 font-semibold';
                Icon = AlertCircle;
              }

              return (
                <div key={log.id} className="flex items-start gap-2.5 leading-relaxed hover:bg-white/5 p-1 rounded transition-colors">
                  <span className="text-slate-500 shrink-0 text-[11px]">[{log.timestamp}]</span>
                  <span className={`uppercase font-bold text-[10px] px-1.5 py-0.2 rounded shrink-0 ${color}`}>
                    {log.level}
                  </span>
                  <span className={`flex-1 break-all ${color}`}>{log.message}</span>
                </div>
              );
            })
          )}
        </div>
      </div>

    </div>
  );
};
