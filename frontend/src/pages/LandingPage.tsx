import React from 'react';
import { useBluetoothStore } from '../store/bluetoothStore';
import {
  Bluetooth,
  Search,
  Link2,
  Layers,
  BatteryCharging,
  Zap,
  Sliders,
  Download,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  Cpu,
} from 'lucide-react';

interface Props {
  onOpenDashboard: () => void;
}

export const LandingPage: React.FC<Props> = ({ onOpenDashboard }) => {
  const { openModal } = useBluetoothStore();

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col selection:bg-brand-500 selection:text-white">
      
      {/* Landing Header */}
      <header className="border-b border-slate-800/80 bg-slate-950/80 backdrop-blur-md sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-brand-600 to-blue-400 flex items-center justify-center text-white shadow-lg shadow-brand-500/25">
              <Bluetooth className="w-6 h-6 animate-pulse-slow" />
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-brand-400 to-blue-400 bg-clip-text text-transparent">
              BlueHub
            </span>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => openModal('download_agent')}
              className="hidden sm:flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 transition-colors"
            >
              <Download className="w-4 h-4" />
              <span>Windows Agent</span>
            </button>

            <button
              onClick={onOpenDashboard}
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold bg-brand-600 hover:bg-brand-500 text-white shadow-lg shadow-brand-600/30 transition-all hover:scale-[1.02] active:scale-95"
            >
              <span>Open Dashboard</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative pt-20 pb-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto text-center flex flex-col items-center justify-center">
        {/* Glow backdrop */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-brand-600/20 rounded-full blur-3xl pointer-events-none"></div>

        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-brand-500/10 border border-brand-500/20 text-brand-400 text-xs font-semibold mb-8">
          <ShieldCheck className="w-4 h-4" />
          <span>Next-Generation Windows Bluetooth Platform</span>
        </div>

        <h1 className="text-4xl sm:text-6xl font-extrabold text-white tracking-tight max-w-4xl leading-tight">
          Control All Your Bluetooth Devices From One Place.
        </h1>

        <p className="mt-6 text-lg sm:text-xl text-slate-400 max-w-2xl font-normal leading-relaxed">
          Discover, connect and manage your Bluetooth devices through a simple and intelligent interface.
        </p>

        <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
          <button
            onClick={onOpenDashboard}
            className="flex items-center gap-2.5 px-7 py-3.5 rounded-2xl text-sm font-bold bg-brand-600 hover:bg-brand-500 text-white shadow-xl shadow-brand-600/30 transition-all hover:scale-[1.02] active:scale-95"
          >
            <span>Open Dashboard</span>
            <ArrowRight className="w-5 h-5" />
          </button>

          <button
            onClick={() => openModal('download_agent')}
            className="flex items-center gap-2.5 px-7 py-3.5 rounded-2xl text-sm font-bold bg-slate-900 hover:bg-slate-800 text-slate-200 border border-slate-700/80 shadow-lg transition-all"
          >
            <Download className="w-5 h-5 text-brand-400" />
            <span>Download Windows Agent</span>
          </button>
        </div>

        {/* Live Mock Screenshot / Card Teaser */}
        <div className="mt-16 w-full max-w-5xl rounded-3xl p-4 bg-slate-900/90 border border-slate-800 shadow-2xl backdrop-blur-xl">
          <div className="flex items-center justify-between pb-3 border-b border-slate-800 px-2 text-xs text-slate-400 font-mono">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-rose-500/80"></span>
              <span className="w-3 h-3 rounded-full bg-amber-500/80"></span>
              <span className="w-3 h-3 rounded-full bg-emerald-500/80"></span>
              <span className="ml-2">bluehub-dashboard.local</span>
            </div>
            <div className="flex items-center gap-2 text-emerald-400">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
              <span>Windows Agent Active</span>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4 text-left">
            <div className="p-4 rounded-2xl bg-slate-800/60 border border-slate-700/60">
              <div className="text-xs text-slate-400">Connected Devices</div>
              <div className="text-2xl font-extrabold text-emerald-400 mt-1">4 Active</div>
              <div className="text-[11px] text-slate-500 mt-2">Headphones, Mouse, Keyboard, Controller</div>
            </div>

            <div className="p-4 rounded-2xl bg-slate-800/60 border border-slate-700/60">
              <div className="text-xs text-slate-400">Paired Devices</div>
              <div className="text-2xl font-extrabold text-brand-400 mt-1">8 Devices</div>
              <div className="text-[11px] text-slate-500 mt-2">Auto-reconnect enabled</div>
            </div>

            <div className="p-4 rounded-2xl bg-slate-800/60 border border-slate-700/60">
              <div className="text-xs text-slate-400">Discovery Radar</div>
              <div className="text-2xl font-extrabold text-blue-400 mt-1">6 Available</div>
              <div className="text-[11px] text-slate-500 mt-2">Real-time BLE & Classic scan</div>
            </div>
          </div>
        </div>
      </section>

      {/* Feature Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-slate-800/60">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-white tracking-tight">
            Engineered for Modern Bluetooth Workflows
          </h2>
          <p className="mt-3 text-slate-400 text-sm max-w-xl mx-auto">
            Combining a responsive web dashboard with a lightweight Windows native agent for maximum reliability and battery telemetry.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[
            {
              icon: Search,
              title: '🔍 Smart Device Discovery',
              desc: 'High-speed radar scanning detecting nearby BLE and Classic Bluetooth peripherals with RSSI signal analysis.',
            },
            {
              icon: Link2,
              title: '🔗 Easy Connection',
              desc: 'One-click pairing and connecting with instant feedback and PIN pairing authorization handling.',
            },
            {
              icon: Layers,
              title: '📱 Multiple Device Management',
              desc: 'Manage mice, keyboards, gamepads, and headsets from one centralized dashboard with batch controls.',
            },
            {
              icon: BatteryCharging,
              title: '🔋 Battery Monitoring',
              desc: 'Real-time telemetry exposing battery percentages for supported headphones and input devices.',
            },
            {
              icon: Zap,
              title: '⚡ Quick Reconnect',
              desc: 'Instantly reconnect to your favorite audio headsets and work peripherals with priority auto-reconnect.',
            },
            {
              icon: Sliders,
              title: '🛠️ Device Organization',
              desc: 'Assign custom application nicknames, organize by categories (Audio, Input, Mobile), and star favorites.',
            },
          ].map((feat, idx) => {
            const Icon = feat.icon;
            return (
              <div
                key={idx}
                className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800/80 hover:border-brand-500/40 transition-all group"
              >
                <div className="w-12 h-12 rounded-xl bg-brand-600/10 text-brand-400 border border-brand-500/20 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <Icon className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold text-white mb-2">{feat.title}</h3>
                <p className="text-xs text-slate-400 leading-relaxed">{feat.desc}</p>
              </div>
            );
          })}
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-slate-800/60 w-full">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-white tracking-tight">How It Works</h2>
          <p className="mt-3 text-slate-400 text-sm">3 simple steps to full Bluetooth control on Windows</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="relative p-6 rounded-2xl bg-slate-900/80 border border-slate-800 text-center">
            <div className="w-12 h-12 rounded-full bg-brand-600 text-white font-extrabold flex items-center justify-center mx-auto mb-4 text-lg">
              1
            </div>
            <h3 className="text-lg font-bold text-white mb-2">1. Install</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Install the lightweight Windows Bluetooth Agent companion app via .NET CLI or Python WinRT launcher.
            </p>
          </div>

          <div className="relative p-6 rounded-2xl bg-slate-900/80 border border-slate-800 text-center">
            <div className="w-12 h-12 rounded-full bg-brand-600 text-white font-extrabold flex items-center justify-center mx-auto mb-4 text-lg">
              2
            </div>
            <h3 className="text-lg font-bold text-white mb-2">2. Connect</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Allow the web interface to communicate securely with Windows Bluetooth APIs via local IPC.
            </p>
          </div>

          <div className="relative p-6 rounded-2xl bg-slate-900/80 border border-slate-800 text-center">
            <div className="w-12 h-12 rounded-full bg-brand-600 text-white font-extrabold flex items-center justify-center mx-auto mb-4 text-lg">
              3
            </div>
            <h3 className="text-lg font-bold text-white mb-2">3. Manage</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Scan, pair, connect, monitor battery, and manage all your devices from one unified dashboard.
            </p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="mt-auto border-t border-slate-800/80 py-8 px-4 sm:px-6 lg:px-8 text-center text-xs text-slate-500">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <Bluetooth className="w-4 h-4 text-brand-500" />
            <span className="font-semibold text-slate-300">BlueHub Platform</span>
            <span>— Windows Bluetooth Device Management Layer</span>
          </div>
          <p>© 2026 BlueHub. Production-ready Architecture for Windows 10/11.</p>
        </div>
      </footer>
    </div>
  );
};
