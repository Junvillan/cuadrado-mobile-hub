import React from 'react';
import { ThemeConfig } from '../types';
import { Palette, Printer, ZoomIn, ZoomOut, Smartphone, Monitor, Wifi } from 'lucide-react';

interface TopHeaderProps {
  theme: ThemeConfig;
  onOpenThemeModal: () => void;
  textZoom: number;
  onZoomChange: (delta: number) => void;
  isDeviceFrame: boolean;
  onToggleDeviceFrame: () => void;
  serverStatus: 'ONLINE' | 'CONNECTING' | 'FALLBACK';
}

export const TopHeader: React.FC<TopHeaderProps> = ({
  theme,
  onOpenThemeModal,
  textZoom,
  onZoomChange,
  isDeviceFrame,
  onToggleDeviceFrame,
  serverStatus,
}) => {
  const handlePrint = () => {
    window.print();
  };

  return (
    <header 
      className={`sticky top-0 z-30 border-b backdrop-blur-md px-3 py-2.5 transition-colors no-print ${theme.headerBgClass} ${theme.borderClass}`}
      style={{ paddingTop: 'max(env(safe-area-inset-top), 10px)' }}
    >
      <div className="max-w-md mx-auto flex items-center justify-between gap-2">
        {/* Left: Branding & Node Info */}
        <div className="flex items-center gap-2 min-w-0">
          <div 
            className="w-7 h-7 rounded-lg flex items-center justify-center font-bold text-sm shadow-sm shrink-0"
            style={{ 
              backgroundColor: theme.accentColor, 
              color: theme.isLight ? '#FFFFFF' : '#000000' 
            }}
          >
            ■
          </div>
          <div className="min-w-0">
            <h1 className="text-xs sm:text-sm font-extrabold tracking-tight truncate flex items-center gap-1.5">
              <span>Cuadrado Mobile Hub</span>
              <span className="text-[9px] px-1.5 py-0.2 rounded font-mono font-normal opacity-85 border border-white/20">
                SENI-IA
              </span>
            </h1>
            <div className="flex items-center gap-1 text-[10px] opacity-75 truncate">
              <span 
                className={`w-1.5 h-1.5 rounded-full ${
                  serverStatus === 'ONLINE' ? 'bg-emerald-400 animate-pulse' :
                  serverStatus === 'CONNECTING' ? 'bg-amber-400 animate-ping' :
                  'bg-sky-400'
                }`}
              />
              <span className="font-mono text-[9px]">:5678</span>
              <span className="opacity-50">·</span>
              <span className="font-mono text-[9px]">AMOLED 120Hz</span>
            </div>
          </div>
        </div>

        {/* Right: Actions */}
        <div className="flex items-center gap-1 shrink-0">
          {/* Zoom Controls */}
          <div className="flex items-center bg-black/20 rounded-lg p-0.5 border border-white/10 text-[10px]">
            <button
              onClick={() => onZoomChange(-1)}
              className="px-1.5 py-1 rounded hover:bg-white/10 active:scale-95 transition-transform"
              title="Reducir tamaño texto (A-)"
              aria-label="A-"
            >
              <ZoomOut className="w-3 h-3" />
            </button>
            <span className="px-1 font-mono text-[9px] opacity-75">{textZoom}x</span>
            <button
              onClick={() => onZoomChange(1)}
              className="px-1.5 py-1 rounded hover:bg-white/10 active:scale-95 transition-transform"
              title="Aumentar tamaño texto (A+)"
              aria-label="A+"
            >
              <ZoomIn className="w-3 h-3" />
            </button>
          </div>

          {/* Theme Selector */}
          <button
            onClick={onOpenThemeModal}
            className="p-1.5 rounded-lg border border-white/10 hover:bg-white/10 active:scale-95 transition-all flex items-center gap-1 text-[11px]"
            title="Seleccionar Tema (20 disponibles)"
            style={{ borderColor: `${theme.accentColor}50` }}
          >
            <Palette className="w-3.5 h-3.5" style={{ color: theme.accentColor }} />
            <span className="hidden xs:inline text-[10px] font-mono">{theme.name.slice(0, 6)}</span>
          </button>

          {/* Device Frame Toggle */}
          <button
            onClick={onToggleDeviceFrame}
            className="p-1.5 rounded-lg border border-white/10 hover:bg-white/10 active:scale-95 transition-all"
            title={isDeviceFrame ? "Ver en pantalla completa" : "Simular marco Realme P3"}
          >
            {isDeviceFrame ? (
              <Monitor className="w-3.5 h-3.5 opacity-80" />
            ) : (
              <Smartphone className="w-3.5 h-3.5 opacity-80" />
            )}
          </button>

          {/* Print Clean PDF */}
          <button
            onClick={handlePrint}
            className="p-1.5 rounded-lg border border-white/10 hover:bg-white/10 active:scale-95 transition-all"
            title="Exportar / Imprimir PDF limpio"
            aria-label="Imprimir informe en PDF"
          >
            <Printer className="w-3.5 h-3.5 opacity-80" />
          </button>
        </div>
      </div>
    </header>
  );
};
