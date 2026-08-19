import React from 'react';
import { useBluetoothStore } from '../store/bluetoothStore';
import { HelpCircle, Download, ShieldCheck, AlertCircle, Headphones, Radio, ExternalLink } from 'lucide-react';

export const HelpPage: React.FC = () => {
  const { openModal } = useBluetoothStore();

  const faqs = [
    {
      q: 'Why is the Windows Bluetooth Agent required?',
      a: 'Standard browser security protocols block web pages from directly calling raw Windows C++ / WinRT Bluetooth hardware APIs. The BlueHub Windows Agent acts as a secure local bridge running on localhost (ws://localhost:8765).',
    },
    {
      q: 'Why can’t I hear audio from two Bluetooth headphones at the same time?',
      a: 'Standard Windows sound architecture defaults to routing digital audio to a single A2DP output endpoint. While BlueHub can connect multiple audio devices simultaneously, Windows sound settings dictate which headset is active for sound output.',
    },
    {
      q: 'What should I do if a device fails to pair?',
      a: '1. Put the Bluetooth device into active Pairing Mode (holding its Bluetooth button for 5s until LED blinks).\n2. Open Windows Settings > Bluetooth & devices > Add device.\n3. Verify your PC’s Bluetooth radio is enabled.',
    },
    {
      q: 'Is my data safe and private?',
      a: 'Yes! BlueHub operates 100% locally on your computer. All IPC messaging stays strictly on localhost (127.0.0.1). No device identifiers or MAC addresses are transmitted to external servers.',
    },
  ];

  return (
    <div className="space-y-6 max-w-4xl">
      
      {/* Header */}
      <div>
        <h1 className="text-xl font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2">
          <HelpCircle className="w-5 h-5 text-brand-600 dark:text-brand-400" />
          <span>Documentation & Support</span>
        </h1>
        <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
          Troubleshooting guides, agent setup walkthroughs, and Windows Bluetooth architecture details.
        </p>
      </div>

      {/* Quick Agent Banner */}
      <div className="p-5 rounded-2xl bg-gradient-to-r from-brand-600 to-blue-600 text-white shadow-md flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center shrink-0">
            <Radio className="w-5 h-5 text-white animate-pulse" />
          </div>
          <div>
            <h3 className="text-sm font-bold">Need to setup the Windows Native Agent?</h3>
            <p className="text-xs opacity-90 mt-0.5">
              Launch the companion app via .NET CLI or standalone Python WinRT script.
            </p>
          </div>
        </div>

        <button
          onClick={() => openModal('download_agent')}
          className="flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold bg-white text-brand-600 hover:bg-slate-100 shadow-sm transition-all shrink-0"
        >
          <Download className="w-4 h-4" />
          <span>Setup Agent</span>
        </button>
      </div>

      {/* FAQs Grid */}
      <div className="space-y-4">
        <h2 className="text-base font-bold text-slate-900 dark:text-slate-100">Frequently Asked Questions</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {faqs.map((faq, idx) => (
            <div
              key={idx}
              className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-2"
            >
              <h3 className="text-xs font-bold text-slate-900 dark:text-slate-100 flex items-start gap-2">
                <AlertCircle className="w-4 h-4 text-brand-500 shrink-0 mt-0.5" />
                <span>{faq.q}</span>
              </h3>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed whitespace-pre-line pl-6">
                {faq.a}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Windows Bluetooth Settings Links */}
      <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-3">
        <h3 className="text-sm font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2">
          <ExternalLink className="w-4 h-4 text-purple-500" />
          <span>Direct Windows Control Panel Shortcuts</span>
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
          <button
            onClick={() => window.open('ms-settings:bluetooth', '_blank')}
            className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-700 text-left transition-colors flex items-center justify-between"
          >
            <div>
              <span className="font-bold text-slate-900 dark:text-slate-100 block">Open Windows Bluetooth Settings</span>
              <span className="text-[11px] text-slate-400">ms-settings:bluetooth</span>
            </div>
            <ExternalLink className="w-4 h-4 text-slate-400" />
          </button>

          <button
            onClick={() => window.open('ms-settings:sound', '_blank')}
            className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-700 text-left transition-colors flex items-center justify-between"
          >
            <div>
              <span className="font-bold text-slate-900 dark:text-slate-100 block">Open Windows Sound Settings</span>
              <span className="text-[11px] text-slate-400">ms-settings:sound</span>
            </div>
            <ExternalLink className="w-4 h-4 text-slate-400" />
          </button>
        </div>
      </div>

    </div>
  );
};
