import React from 'react';
import { SignalStrength } from '../../types/bluetooth';
import { SignalHigh, SignalMedium, SignalLow, SignalZero } from 'lucide-react';

interface Props {
  signal: SignalStrength;
  showDbm?: boolean;
}

export const SignalIndicator: React.FC<Props> = ({ signal, showDbm = true }) => {
  if (signal.rssi === null || signal.rssi === undefined) {
    return null;
  }

  const bars = signal.bars;
  let Icon = SignalZero;
  let color = 'text-slate-400';

  if (bars >= 4) {
    Icon = SignalHigh;
    color = 'text-emerald-500';
  } else if (bars >= 2) {
    Icon = SignalMedium;
    color = 'text-amber-500';
  } else if (bars >= 1) {
    Icon = SignalLow;
    color = 'text-rose-500';
  }

  return (
    <div className={`flex items-center gap-1 text-xs ${color}`} title={`Signal RSSI: ${signal.rssi} dBm`}>
      <Icon className="w-3.5 h-3.5" />
      {showDbm && <span>{signal.rssi} dBm</span>}
    </div>
  );
};
