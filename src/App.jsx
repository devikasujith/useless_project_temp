import React from 'react';
import Header from './components/Header/Header';
import DashboardStats from './components/Dashboard/DashboardStats';
import ChatContainer from './components/Chat/ChatContainer';
import TelemetrySidebar from './components/Telemetry/TelemetrySidebar';
import AchievementsModal from './components/Modals/AchievementsModal';
import ResetModal from './components/Modals/ResetModal';
import Toast from './components/Toast/Toast';

export default function App() {
  return (
    <div className="app-container">
      {/* Background Ambient Glows */}
      <div className="ambient-glow glow-1" aria-hidden="true"></div>
      <div className="ambient-glow glow-2" aria-hidden="true"></div>

      {/* Header */}
      <Header />

      {/* Main Dashboard Statistics Grid */}
      <DashboardStats />

      {/* Main Workspace: Chat Interface + Telemetry Sidebar */}
      <main className="main-workspace">
        <ChatContainer />
        <TelemetrySidebar />
      </main>

      {/* Modals & Toasts */}
      <AchievementsModal />
      <ResetModal />
      <Toast />
    </div>
  );
}
