import React from 'react';
import { BatteryInfo } from '../../types/bluetooth';
import { Battery, BatteryLow, BatteryMedium, BatteryCharging, AlertCircle } from 'lucide-react';

interface Props {
  battery: BatteryInfo;
  showLabel?: boolean;
}

export const BatteryIndicator: React.FC<Props> = ({ battery, showLabel = true }) => {
  if (battery.percentage === null || battery.percentage === undefined) {
    return (
      <div className="flex items-center gap-1.5 text-xs text-slate-400 dark:text-slate-500" title="Battery info unavailable for this device">
        <AlertCircle className="w-3.5 h-3.5" />
        {showLabel && <span>N/A</span>}
      </div>
    );
  }

  const p = battery.percentage;

  let colorClass = 'text-emerald-500';
  let Icon = Battery;

  if (p <= 20) {
    colorClass = 'text-rose-500 font-semibold';
    Icon = BatteryLow;
  } else if (p <= 50) {
    colorClass = 'text-amber-500';
    Icon = BatteryMedium;
  }

  if (battery.isCharging) {
    Icon = BatteryCharging;
    colorClass = 'text-blue-500';
  }

  return (
    <div className={`flex items-center gap-1.5 text-xs ${colorClass}`} title={`Battery: ${p}% (${battery.level})`}>
      <Icon className="w-4 h-4" />
      {showLabel && <span>{p}%</span>}
    </div>
  );
};
