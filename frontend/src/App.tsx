import React, { useState, useEffect } from 'react';
import { useBluetoothStore } from './store/bluetoothStore';
import { agentSocket } from './services/agentSocket';
import { Navbar } from './components/common/Navbar';
import { Sidebar } from './components/common/Sidebar';
import { MobileNav } from './components/common/MobileNav';
import { ToastContainer } from './components/common/ToastContainer';

// Modals
import { DeviceDetailsModal } from './components/modals/DeviceDetailsModal';
import { RenameModal } from './components/modals/RenameModal';
import { PermissionsModal } from './components/modals/PermissionsModal';
import { DownloadAgentModal } from './components/modals/DownloadAgentModal';
import { FirstRunModal } from './components/modals/FirstRunModal';

// Pages
import { LandingPage } from './pages/LandingPage';
import { DashboardPage } from './pages/DashboardPage';
import { DevicesPage } from './pages/DevicesPage';
import { ConnectedPage } from './pages/ConnectedPage';
import { AudioPage } from './pages/AudioPage';
import { DiagnosticsPage } from './pages/DiagnosticsPage';
import { LogsPage } from './pages/LogsPage';
import { HistoryPage } from './pages/HistoryPage';
import { FavoritesPage } from './pages/FavoritesPage';
import { SettingsPage } from './pages/SettingsPage';
import { HelpPage } from './pages/HelpPage';

export const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>('landing');
  const { isDemoMode } = useBluetoothStore();

  useEffect(() => {
    // Attempt agent socket auto-connect in real hardware mode
    if (!isDemoMode) {
      agentSocket.connect();
    }
  }, [isDemoMode]);

  // If activeTab is landing, render dedicated full-width Landing Page
  if (activeTab === 'landing') {
    return (
      <>
        <LandingPage onOpenDashboard={() => setActiveTab('dashboard')} />
        <ToastContainer />
        <DownloadAgentModal />
        <PermissionsModal />
      </>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 flex flex-col selection:bg-brand-500 selection:text-white transition-colors duration-200">
      
      {/* Top Navbar */}
      <Navbar activeTab={activeTab} setActiveTab={setActiveTab} />

      {/* Main Dashboard Layout */}
      <div className="max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 flex-1 flex gap-6 pb-20 md:pb-8">
        
        {/* Left Desktop Sidebar */}
        <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />

        {/* Center Page Content Area */}
        <main className="flex-1 min-w-0">
          {activeTab === 'dashboard' && <DashboardPage setActiveTab={setActiveTab} />}
          {activeTab === 'devices' && <DevicesPage />}
          {activeTab === 'connected' && <ConnectedPage />}
          {activeTab === 'audio' && <AudioPage />}
          {activeTab === 'diagnostics' && <DiagnosticsPage />}
          {activeTab === 'logs' && <LogsPage />}
          {activeTab === 'history' && <HistoryPage />}
          {activeTab === 'favorites' && <FavoritesPage />}
          {activeTab === 'settings' && <SettingsPage />}
          {activeTab === 'help' && <HelpPage />}
        </main>
      </div>

      {/* Mobile Navigation Bar */}
      <MobileNav activeTab={activeTab} setActiveTab={setActiveTab} />

      {/* Global Toast Alerts */}
      <ToastContainer />

      {/* Global Modals */}
      <DeviceDetailsModal />
      <RenameModal />
      <PermissionsModal />
      <DownloadAgentModal />
      <FirstRunModal />
    </div>
  );
};

export default App;
