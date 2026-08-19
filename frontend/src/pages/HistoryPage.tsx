import React from 'react';
import { useBluetoothStore } from '../store/bluetoothStore';
import { Clock, Trash2, ShieldCheck, CheckCircle2, XCircle, Activity } from 'lucide-react';

export const HistoryPage: React.FC = () => {
  const { history, clearHistory } = useBluetoothStore();

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2">
            <Clock className="w-5 h-5 text-brand-600 dark:text-brand-400" />
            <span>Connection History Logs</span>
          </h1>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            Audit trail of Bluetooth connection events, pairing requests, and session durations.
          </p>
        </div>

        {history.length > 0 && (
          <button
            onClick={clearHistory}
            className="flex items-center justify-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold bg-rose-500/10 text-rose-600 dark:text-rose-400 hover:bg-rose-500/20 border border-rose-500/20 transition-all shrink-0"
          >
            <Trash2 className="w-4 h-4" />
            <span>Clear History</span>
          </button>
        )}
      </div>

      {/* History Table */}
      {history.length === 0 ? (
        <div className="p-12 text-center rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
          <Clock className="w-12 h-12 text-slate-300 dark:text-slate-700 mx-auto mb-3" />
          <h3 className="text-sm font-bold text-slate-800 dark:text-slate-200">No Connection Logs Recorded</h3>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            Device events will be logged here automatically as connections occur.
          </p>
        </div>
      ) : (
        <div className="rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 dark:bg-slate-800/60 border-b border-slate-200 dark:border-slate-800 text-slate-500 dark:text-slate-400 font-semibold uppercase tracking-wider">
                <tr>
                  <th className="py-3 px-4">Device</th>
                  <th className="py-3 px-4">Event Type</th>
                  <th className="py-3 px-4">Timestamp</th>
                  <th className="py-3 px-4">Duration</th>
                  <th className="py-3 px-4">Details</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800/60 text-slate-700 dark:text-slate-300 font-medium">
                {history.map((log) => {
                  let badgeColor = 'bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-400';
                  let Icon = Activity;

                  if (log.eventType === 'connected') {
                    badgeColor = 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20';
                    Icon = CheckCircle2;
                  } else if (log.eventType === 'paired') {
                    badgeColor = 'bg-brand-500/10 text-brand-600 dark:text-brand-400 border border-brand-500/20';
                    Icon = ShieldCheck;
                  } else if (log.eventType === 'connection_failed') {
                    badgeColor = 'bg-rose-500/10 text-rose-600 dark:text-rose-400 border border-rose-500/20';
                    Icon = XCircle;
                  }

                  return (
                    <tr key={log.id} className="hover:bg-slate-50/50 dark:hover:bg-slate-850/50 transition-colors">
                      <td className="py-3 px-4 font-bold text-slate-900 dark:text-slate-100">
                        {log.deviceName}
                      </td>
                      <td className="py-3 px-4">
                        <span className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-semibold capitalize ${badgeColor}`}>
                          <Icon className="w-3.5 h-3.5" />
                          <span>{log.eventType.replace('_', ' ')}</span>
                        </span>
                      </td>
                      <td className="py-3 px-4 font-mono text-[11px] text-slate-500">
                        {new Date(log.timestamp).toLocaleString()}
                      </td>
                      <td className="py-3 px-4 text-slate-500">
                        {log.duration || 'N/A'}
                      </td>
                      <td className="py-3 px-4 text-slate-500 italic max-w-xs truncate">
                        {log.details || 'Standard event'}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};
