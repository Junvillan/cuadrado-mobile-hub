import React from 'react';
import { TabId, ThemeConfig } from '../types';
import { FileText, Shield, Clock, Terminal } from 'lucide-react';

interface BottomNavProps {
  activeTab: TabId;
  onTabChange: (tab: TabId) => void;
  theme: ThemeConfig;
}

export const BottomNav: React.FC<BottomNavProps> = ({ activeTab, onTabChange, theme }) => {
  const tabs = [
    {
      id: 'reportes' as TabId,
      label: 'Reportes',
      badge: '20T',
      icon: FileText,
      emoji: '📜',
    },
    {
      id: 'telemetria' as TabId,
      label: 'Telemetría',
      badge: 'LIVE',
      icon: Shield,
      emoji: '🛡️',
    },
    {
      id: 'auditoria' as TabId,
      label: 'Auditoría FTE',
      badge: '7.5x',
      icon: Clock,
      emoji: '⏱️',
    },
    {
      id: 'scout' as TabId,
      label: 'Consola Scout',
      badge: ':5678',
      icon: Terminal,
      emoji: '⚡',
    },
  ];

  return (
    <nav 
      className={`fixed bottom-0 left-0 right-0 z-40 border-t backdrop-blur-md transition-colors select-none no-print ${theme.navBgClass} ${theme.borderClass}`}
      style={{ paddingBottom: 'max(env(safe-area-inset-bottom), 8px)' }}
    >
      <div className="max-w-md mx-auto grid grid-cols-4 px-1 py-1.5">
        {tabs.map((tab) => {
          const isActive = activeTab === tab.id;
          const Icon = tab.icon;

          return (
            <button
              key={tab.id}
              onClick={() => onTabChange(tab.id)}
              className="group flex flex-col items-center justify-center py-1 px-1 transition-all relative focus:outline-none"
            >
              {/* Active pill indicator style Material 3 */}
              <div 
                className={`relative flex items-center justify-center w-12 h-7 rounded-full transition-all duration-200 ${
                  isActive 
                    ? 'scale-105 shadow-sm' 
                    : 'opacity-70 group-hover:opacity-90'
                }`}
                style={{
                  backgroundColor: isActive ? `${theme.accentColor}25` : 'transparent',
                }}
              >
                <Icon 
                  className={`w-5 h-5 transition-transform ${isActive ? 'scale-110' : ''}`}
                  style={{
                    color: isActive ? theme.accentColor : undefined,
                  }}
                />
                {tab.badge && (
                  <span 
                    className="absolute -top-1 -right-1 text-[8px] font-mono px-1 py-0.2 rounded-full font-bold"
                    style={{
                      backgroundColor: isActive ? theme.accentColor : 'rgba(150, 150, 150, 0.4)',
                      color: isActive ? (theme.isLight ? '#FFFFFF' : '#000000') : '#FFFFFF',
                    }}
                  >
                    {tab.badge}
                  </span>
                )}
              </div>

              {/* Label */}
              <span 
                className={`text-[10px] mt-1 font-medium tracking-tight truncate max-w-full transition-colors ${
                  isActive ? 'font-bold' : 'opacity-65'
                }`}
                style={{
                  color: isActive ? theme.accentColor : undefined,
                }}
              >
                {tab.label}
              </span>
            </button>
          );
        })}
      </div>
    </nav>
  );
};
