import React, { useState, useEffect } from 'react';
import { TabId, ThemeConfig } from './types';
import { THEMES } from './data/themes';
import { TopHeader } from './components/TopHeader';
import { BottomNav } from './components/BottomNav';
import { ThemeSelectorModal } from './components/ThemeSelectorModal';
import { MatrixBackground } from './components/MatrixBackground';
import { ReportsModule } from './components/ReportsModule';
import { TelemetryModule } from './components/TelemetryModule';
import { AuditFteModule } from './components/AuditFteModule';
import { ScoutConsoleModule } from './components/ScoutConsoleModule';
import { DeviceFrame } from './components/DeviceFrame';

export function App() {
  const [activeTab, setActiveTab] = useState<TabId>('reportes');
  const [currentTheme, setCurrentTheme] = useState<ThemeConfig>(THEMES[0]); // Guardia OLED por defecto
  const [isThemeModalOpen, setIsThemeModalOpen] = useState<boolean>(false);
  const [textZoom, setTextZoom] = useState<number>(0); // -1, 0, 1, 2
  const [isDeviceFrame, setIsDeviceFrame] = useState<boolean>(false);
  const [serverUrl, setServerUrl] = useState<string>('http://192.168.1.136:5678');
  const [serverStatus, setServerStatus] = useState<'ONLINE' | 'CONNECTING' | 'FALLBACK'>('ONLINE');
  const [selectedReportId, setSelectedReportId] = useState<string>('reportes-maestro');

  // Handle zoom increment/decrement with boundaries
  const handleZoomChange = (delta: number) => {
    setTextZoom((prev) => Math.min(2, Math.max(-1, prev + delta)));
  };

  const handleNavigateToReport = (reportId: string) => {
    setSelectedReportId(reportId);
    setActiveTab('reportes');
  };

  const handleUpdateServerUrl = (url: string) => {
    setServerUrl(url);
    setServerStatus('CONNECTING');
    setTimeout(() => {
      setServerStatus('ONLINE');
    }, 700);
  };

  return (
    <DeviceFrame theme={currentTheme} isDeviceFrame={isDeviceFrame}>
      <div 
        className={`min-h-screen relative flex flex-col transition-colors selection:bg-amber-400 selection:text-black ${currentTheme.bgClass} ${currentTheme.textClass}`}
      >
        {/* Animated matrix background for Matrix theme */}
        {currentTheme.isMatrix && <MatrixBackground />}

        {/* Top Header Fixed / Sticky */}
        <TopHeader
          theme={currentTheme}
          onOpenThemeModal={() => setIsThemeModalOpen(true)}
          textZoom={textZoom}
          onZoomChange={handleZoomChange}
          isDeviceFrame={isDeviceFrame}
          onToggleDeviceFrame={() => setIsDeviceFrame(!isDeviceFrame)}
          serverStatus={serverStatus}
        />

        {/* Main Content Area */}
        <main className="flex-1 w-full max-w-md mx-auto px-3 pt-3 relative z-10">
          {activeTab === 'reportes' && (
            <ReportsModule 
              theme={currentTheme} 
              textZoom={textZoom}
              onOpenThemeModal={() => setIsThemeModalOpen(true)}
              selectedDocId={selectedReportId}
              onSelectDocId={setSelectedReportId}
            />
          )}

          {activeTab === 'telemetria' && (
            <TelemetryModule 
              theme={currentTheme}
              onNavigateToReport={handleNavigateToReport}
            />
          )}

          {activeTab === 'auditoria' && (
            <AuditFteModule 
              theme={currentTheme}
              onNavigateToReport={handleNavigateToReport}
            />
          )}

          {activeTab === 'scout' && (
            <ScoutConsoleModule 
              theme={currentTheme}
              serverUrl={serverUrl}
              onUpdateServerUrl={handleUpdateServerUrl}
            />
          )}
        </main>

        {/* Bottom Navigation Bar style Android Material 3 */}
        <BottomNav
          activeTab={activeTab}
          onTabChange={setActiveTab}
          theme={currentTheme}
        />

        {/* Modal Selector de 20 Temas Notariales */}
        <ThemeSelectorModal
          currentTheme={currentTheme}
          onSelectTheme={(t) => {
            setCurrentTheme(t);
            setIsThemeModalOpen(false);
          }}
          isOpen={isThemeModalOpen}
          onClose={() => setIsThemeModalOpen(false)}
        />
      </div>
    </DeviceFrame>
  );
}

export default App;
