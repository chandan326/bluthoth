import React from 'react';
import { useBluetoothStore } from '../../store/bluetoothStore';
import { CheckCircle2, AlertTriangle, AlertCircle, Info, X } from 'lucide-react';

export const ToastContainer: React.FC = () => {
  const { toasts, removeToast } = useBluetoothStore();

  if (toasts.length === 0) return null;

  return (
    <div className="fixed bottom-5 right-5 z-50 flex flex-col gap-2.5 max-w-sm w-full pointer-events-none px-4 sm:px-0">
      {toasts.map((toast) => {
        let Icon = Info;
        let border = 'border-blue-500/30 bg-blue-950/90 text-blue-200';

        if (toast.type === 'success') {
          Icon = CheckCircle2;
          border = 'border-emerald-500/30 bg-emerald-950/90 text-emerald-200';
        } else if (toast.type === 'warning') {
          Icon = AlertTriangle;
          border = 'border-amber-500/30 bg-amber-950/90 text-amber-200';
        } else if (toast.type === 'error') {
          Icon = AlertCircle;
          border = 'border-rose-500/30 bg-rose-950/90 text-rose-200';
        }

        return (
          <div
            key={toast.id}
            className={`pointer-events-auto flex items-start gap-3 p-3.5 rounded-xl border backdrop-blur-md shadow-lg transition-all duration-300 transform translate-y-0 ${border}`}
          >
            <Icon className="w-5 h-5 shrink-0 mt-0.5" />
            <div className="flex-1 min-w-0">
              <h4 className="text-xs font-semibold tracking-wide uppercase">{toast.title}</h4>
              <p className="text-xs opacity-90 mt-0.5 leading-snug">{toast.message}</p>
            </div>
            <button
              onClick={() => removeToast(toast.id)}
              className="opacity-70 hover:opacity-100 p-0.5 hover:bg-white/10 rounded transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        );
      })}
    </div>
  );
};
