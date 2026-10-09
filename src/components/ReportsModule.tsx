import React, { useState } from 'react';
import { ThemeConfig, DocumentMeta } from '../types';
import { DOCUMENTS } from '../data/mockReports';
import { 
  FileText, ExternalLink, RefreshCw, ShieldCheck, 
  WifiOff, Globe, Download, CheckCircle, AlertTriangle, Layers
} from 'lucide-react';

interface ReportsModuleProps {
  theme: ThemeConfig;
  textZoom: number;
}

export const ReportsModule: React.FC<ReportsModuleProps> = ({ theme, textZoom }) => {
  const [selectedDocId, setSelectedDocId] = useState<string>('reportes-maestro');
  const [viewMode, setViewMode] = useState<'cache' | 'iframe'>('cache');
  const [iframeError, setIframeError] = useState<boolean>(false);
  const [isRefreshing, setIsRefreshing] = useState<boolean>(false);

  const selectedDoc = DOCUMENTS.find((d) => d.id === selectedDocId) || DOCUMENTS[0];

  const handleRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => {
      setIsRefreshing(false);
    }, 600);
  };

  const getZoomClass = () => {
    if (textZoom <= -1) return 'text-[12px] leading-relaxed';
    if (textZoom === 0) return 'text-[13px] leading-relaxed';
    if (textZoom === 1) return 'text-[14px] leading-relaxed';
    return 'text-[15px] leading-relaxed';
  };

  return (
    <div className="flex flex-col gap-3 pb-24 animate-fadeIn">
      {/* Selector Superior de Documento (1 toque) */}
      <div className="no-print">
        <div className="flex items-center justify-between mb-1.5 px-1">
          <span className="text-[11px] font-bold uppercase tracking-wider opacity-70">
            Documentos Notariales del Círculo
          </span>
          <span className="text-[10px] font-mono opacity-60">
            3 Endpoints Activos
          </span>
        </div>

        <div className="grid grid-cols-3 gap-1.5">
          {DOCUMENTS.map((doc) => {
            const isSelected = selectedDoc.id === doc.id;
            return (
              <button
                key={doc.id}
                onClick={() => {
                  setSelectedDocId(doc.id);
                  setIframeError(false);
                }}
                className={`flex flex-col p-2 rounded-xl text-left border transition-all text-xs relative ${
                  isSelected
                    ? 'border-2 shadow-md scale-[1.02]'
                    : 'border-white/10 hover:border-white/20 opacity-80'
                }`}
                style={{
                  backgroundColor: isSelected ? `${theme.accentColor}18` : undefined,
                  borderColor: isSelected ? theme.accentColor : undefined,
                }}
              >
                <div className="flex items-center justify-between w-full mb-1">
                  <span className="text-base">{doc.icon}</span>
                  <span 
                    className="text-[9px] px-1 py-0.2 rounded font-mono font-semibold"
                    style={{
                      backgroundColor: isSelected ? theme.accentColor : 'rgba(255,255,255,0.1)',
                      color: isSelected ? (theme.isLight ? '#FFFFFF' : '#000000') : undefined,
                    }}
                  >
                    {doc.badge}
                  </span>
                </div>
                <span className="font-bold text-[11px] truncate leading-tight">{doc.title}</span>
                <span className="text-[9px] opacity-65 truncate mt-0.5">{doc.subtitle}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Barra de Control de Conexión & Endpoint */}
      <div className={`p-2.5 rounded-xl border flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-2 text-xs ${theme.cardBgClass} ${theme.borderClass} no-print`}>
        <div className="flex items-center gap-2 min-w-0">
          <div className="p-1.5 rounded-lg bg-black/20 text-emerald-400 shrink-0">
            <Globe className="w-4 h-4" />
          </div>
          <div className="min-w-0">
            <div className="flex items-center gap-1.5">
              <span className="font-mono text-[10px] truncate max-w-[210px] sm:max-w-[320px] opacity-90">
                {selectedDoc.endpointUrl}
              </span>
              <a
                href={selectedDoc.endpointUrl}
                target="_blank"
                rel="noreferrer"
                className="opacity-60 hover:opacity-100 transition-opacity p-0.5"
                title="Abrir URL directamente"
              >
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>
            <div className="flex items-center gap-2 text-[9px] opacity-65 font-mono">
              <span>SHA-512: {selectedDoc.hashSha512.slice(0, 12)}...</span>
              <span>·</span>
              <span>{selectedDoc.cachedTimestamp.split(' ')[1]}</span>
            </div>
          </div>
        </div>

        {/* View Mode Switcher */}
        <div className="flex items-center gap-1 self-end sm:self-center">
          <div className="flex bg-black/30 rounded-lg p-0.5 border border-white/10 text-[10px]">
            <button
              onClick={() => setViewMode('cache')}
              className={`px-2 py-1 rounded transition-colors flex items-center gap-1 ${
                viewMode === 'cache'
                  ? 'bg-white/20 font-bold shadow-sm'
                  : 'opacity-65 hover:opacity-100'
              }`}
            >
              <ShieldCheck className="w-3 h-3 text-emerald-400" />
              <span>Caché Offline</span>
            </button>
            <button
              onClick={() => setViewMode('iframe')}
              className={`px-2 py-1 rounded transition-colors flex items-center gap-1 ${
                viewMode === 'iframe'
                  ? 'bg-white/20 font-bold shadow-sm'
                  : 'opacity-65 hover:opacity-100'
              }`}
            >
              <ExternalLink className="w-3 h-3 text-sky-400" />
              <span>WebView LAN</span>
            </button>
          </div>

          <button
            onClick={handleRefresh}
            className={`p-1.5 rounded-lg bg-black/20 border border-white/10 hover:bg-white/10 transition-transform ${
              isRefreshing ? 'animate-spin' : ''
            }`}
            title="Refrescar documento"
          >
            <RefreshCw className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Vista de Contenido: Iframe LAN vs Caché Offline Inmutable */}
      {viewMode === 'iframe' ? (
        <div className={`rounded-xl border overflow-hidden flex flex-col ${theme.cardBgClass} ${theme.borderClass}`}>
          <div className="p-2.5 bg-black/40 border-b border-white/10 flex items-center justify-between text-xs">
            <span className="flex items-center gap-1.5 text-[11px] font-mono">
              <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
              Conexión directa WebView a http://192.168.1.136:5678
            </span>
            <span className="text-[10px] opacity-65">Aceleración GPU Realme P3</span>
          </div>

          <div className="relative min-h-[420px] bg-black/50">
            {iframeError ? (
              <div className="p-6 text-center flex flex-col items-center justify-center min-h-[380px] gap-3">
                <div className="w-12 h-12 rounded-full bg-amber-950/80 border border-amber-600 flex items-center justify-center text-amber-400">
                  <WifiOff className="w-6 h-6" />
                </div>
                <div className="max-w-xs">
                  <h4 className="font-bold text-sm">Servidor LAN no accesible desde nube</h4>
                  <p className="text-xs opacity-75 mt-1 leading-relaxed">
                    La dirección <code className="font-mono text-amber-300">192.168.1.136:5678</code> pertenece a tu red privada WiFi. Mostrando respaldo local instantáneo garantizado.
                  </p>
                </div>
                <button
                  onClick={() => setViewMode('cache')}
                  className="px-4 py-1.5 rounded-lg text-xs font-semibold shadow-md active:scale-95 transition-transform"
                  style={{ backgroundColor: theme.accentColor, color: theme.isLight ? '#FFFFFF' : '#000000' }}
                >
                  Ver Caché Notarial Sellado
                </button>
              </div>
            ) : (
              <>
                <iframe
                  src={selectedDoc.endpointUrl}
                  title={selectedDoc.title}
                  className="w-full h-[520px] border-0"
                  onError={() => setIframeError(true)}
                  sandbox="allow-scripts allow-same-origin allow-forms"
                />
                <div className="p-2 bg-black/60 border-t border-white/10 text-[10px] flex items-center justify-between">
                  <span className="opacity-70">¿El navegador bloquea conexión privada?</span>
                  <button
                    onClick={() => setViewMode('cache')}
                    className="text-sky-400 underline font-medium"
                  >
                    Activar Modo Caché Offline
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      ) : (
        /* VISTA DE CACHÉ OFFLINE COMPLETA Y FORMAL (Sin pantalla en blanco) */
        <div 
          className={`rounded-2xl border p-4 sm:p-6 shadow-xl transition-all ${theme.cardBgClass} ${theme.borderClass} ${getZoomClass()}`}
        >
          {/* Header Notarial Formal */}
          <div className="border-b border-white/15 pb-4 mb-4">
            <div className="flex items-start justify-between gap-3">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded font-bold uppercase tracking-wider bg-emerald-950 text-emerald-300 border border-emerald-800">
                    Sello Notarial Activo
                  </span>
                  <span className="text-[10px] font-mono opacity-70">
                    Protocolo SENI-IA · G7 PASS
                  </span>
                </div>
                <h2 className="text-base sm:text-lg font-black tracking-tight mt-1">
                  {selectedDoc.title}
                </h2>
                <p className={`text-xs ${theme.mutedTextClass} mt-0.5`}>
                  {selectedDoc.subtitle}
                </p>
              </div>

              <div className="text-right shrink-0">
                <div className="text-xl sm:text-2xl">{selectedDoc.icon}</div>
                <div className="text-[9px] font-mono opacity-60 mt-1">
                  Rev. 2026.10
                </div>
              </div>
            </div>

            {/* Metadatos de Autenticidad */}
            <div className="mt-3 grid grid-cols-2 sm:grid-cols-3 gap-2 p-2 rounded-xl bg-black/20 text-[10px] font-mono border border-white/5">
              <div>
                <span className="opacity-50 block">Sellado Temporal:</span>
                <span className="font-semibold">{selectedDoc.cachedTimestamp}</span>
              </div>
              <div>
                <span className="opacity-50 block">Hash SHA-512:</span>
                <span className="font-semibold truncate block" title={selectedDoc.hashSha512}>
                  {selectedDoc.hashSha512.slice(0, 16)}...
                </span>
              </div>
              <div className="col-span-2 sm:col-span-1">
                <span className="opacity-50 block">Estado del Nodo:</span>
                <span className="text-emerald-400 font-bold flex items-center gap-1">
                  <CheckCircle className="w-2.5 h-2.5 inline" /> Inmutable Verificado
                </span>
              </div>
            </div>
          </div>

          {/* Renderizado de contenido según el documento seleccionado */}
          {selectedDoc.id === 'reportes-maestro' && (
            <div className="space-y-4">
              <section className="p-3 rounded-xl bg-black/20 border border-white/5">
                <h3 className="font-bold text-xs uppercase tracking-wide flex items-center gap-1.5 mb-2 text-sky-400">
                  <Layers className="w-3.5 h-3.5" />
                  1. Suite Visual de 20 Temas Notariales
                </h3>
                <p className="opacity-90 leading-relaxed mb-3">
                  El Círculo Soberano SENI-IA estipula una representación visual neutra y multifuncional adaptada para auditoría legal, lectura continua y dispositivos móviles con pantallas OLED. Cada tema preserva la jerarquía tipográfica sin distorsionar diagramas técnicos ni coeficientes de potencia eléctrica.
                </p>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-[11px]">
                  <div className="p-2 rounded-lg bg-black/40 border border-zinc-800">
                    <span className="font-bold block text-sky-300">Guardia OLED</span>
                    <span className="text-[10px] opacity-70">Negro absoluto #000000, 0% consumo en píxeles negros.</span>
                  </div>
                  <div className="p-2 rounded-lg bg-black/40 border border-zinc-800">
                    <span className="font-bold block text-blue-300">IEEE Claro</span>
                    <span className="text-[10px] opacity-70">Norma formal IEEE-57 con azul #002D62 para actas impresas.</span>
                  </div>
                  <div className="p-2 rounded-lg bg-black/40 border border-zinc-800">
                    <span className="font-bold block text-purple-300">Árbol Clínico</span>
                    <span className="text-[10px] opacity-70">Espectro lavanda #6B5CA5 para lectura prolongada sin fatiga.</span>
                  </div>
                  <div className="p-2 rounded-lg bg-black/40 border border-zinc-800">
                    <span className="font-bold block text-[#00FF66]">Matrix Cyber</span>
                    <span className="text-[10px] opacity-70">Fósforo verde con lluvia digital a 120 FPS en Realme P3.</span>
                  </div>
                </div>
              </section>

              <section className="p-3 rounded-xl bg-black/20 border border-white/5">
                <h3 className="font-bold text-xs uppercase tracking-wide flex items-center gap-1.5 mb-2 text-emerald-400">
                  <CheckCircle className="w-3.5 h-3.5" />
                  2. Certificación Notarial del Ecosistema
                </h3>
                <p className="opacity-90 leading-relaxed">
                  Doy fe que el repositorio de telemetría y ejecución <code className="font-mono bg-black/40 px-1 py-0.5 rounded text-amber-300">Cuadrado Mobile Hub</code> ejecuta de forma autónoma el monitoreo continuo de los agentes <strong className="text-white">GLM 5.3</strong>, <strong className="text-white">Luna Codex</strong>, <strong className="text-white">m3.1-Mimo</strong> y <strong className="text-white">Bepo</strong> bajo parámetros de aislamiento estricto.
                </p>
                <div className="mt-3 p-2.5 rounded-lg border border-dashed border-white/20 bg-black/30 flex items-center justify-between text-xs">
                  <div>
                    <span className="font-bold block">Firma Electrónica Avanzada:</span>
                    <span className="font-mono text-[9px] opacity-70">PGP: 4A89 F201 9B4C 3310 EA82 7701 B119 5CD3</span>
                  </div>
                  <span className="text-xs px-2 py-1 rounded bg-emerald-950 text-emerald-300 font-bold border border-emerald-800">
                    VALIDADO
                  </span>
                </div>
              </section>
            </div>
          )}

          {selectedDoc.id === 'informe-laboral' && (
            <div className="space-y-4">
              <section className="p-3 rounded-xl bg-black/20 border border-white/5">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-bold text-xs uppercase tracking-wide text-amber-400">
                    Resumen Ejecutivo de Esfuerzo de Ingeniería
                  </h3>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-amber-950 text-amber-300 border border-amber-800">
                    Carga Extrema: 17.6h/día
                  </span>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-center text-xs my-3">
                  <div className="p-2.5 rounded-xl bg-black/40 border border-white/10">
                    <span className="text-[10px] opacity-65 block">Horas Netas</span>
                    <span className="text-xl font-black text-amber-300">141.0 h</span>
                    <span className="text-[9px] opacity-50 block mt-0.5">8 días continuos</span>
                  </div>
                  <div className="p-2.5 rounded-xl bg-black/40 border border-white/10">
                    <span className="text-[10px] opacity-65 block">Multiplicador FTE</span>
                    <span className="text-xl font-black text-emerald-400">7.5x - 8.0x</span>
                    <span className="text-[9px] opacity-50 block mt-0.5">Equiv. plantilla</span>
                  </div>
                  <div className="p-2.5 rounded-xl bg-black/40 border border-white/10">
                    <span className="text-[10px] opacity-65 block">Horas Homólogas</span>
                    <span className="text-xl font-black text-sky-300">~915 h</span>
                    <span className="text-[9px] opacity-50 block mt-0.5">Ingeniería total</span>
                  </div>
                  <div className="p-2.5 rounded-xl bg-black/40 border border-white/10">
                    <span className="text-[10px] opacity-65 block">Límite Seguro</span>
                    <span className="text-xl font-black text-rose-400">8.0 h/d</span>
                    <span className="text-[9px] opacity-50 block mt-0.5">+120% sobrepaso</span>
                  </div>
                </div>
                <p className="text-xs opacity-90 leading-relaxed">
                  Doctorando a cargo: <strong className="text-white">Junior Alexis Villanueva Rosario</strong>. Auditoría certificada de actividad de repositorio, logs de compilación de Macro-Sandbox y cálculos vectorizados IEEE-57.
                </p>
              </section>

              {/* Alerta Clínica Wu-Wei */}
              <div className="p-3.5 rounded-xl bg-rose-950/40 border border-rose-800/80 flex items-start gap-3">
                <AlertTriangle className="w-5 h-5 text-rose-400 shrink-0 mt-0.5" />
                <div className="text-xs">
                  <h4 className="font-bold text-rose-300 uppercase tracking-wide">
                    Alerta Clínica Wu-Wei · Sobreesfuerzo Crítico
                  </h4>
                  <p className="text-rose-100/90 mt-1 leading-relaxed">
                    «La máquina debe vigilar a la máquina y el doctorando debe descansar». La intensidad de 17.6 horas diarias consecutivas excede ampliamente los umbrales de homeostasis cognitiva. Se activa el protocolo de telemetría automática y delegación al enjambre autónomo.
                  </p>
                </div>
              </div>
            </div>
          )}

          {selectedDoc.id === 'parte-situacion' && (
            <div className="space-y-4">
              <section className="p-3 rounded-xl bg-black/20 border border-white/5">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-bold text-xs uppercase tracking-wide text-sky-400">
                    Diagnóstico Operativo Global (13:45 CEST)
                  </h3>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-sky-950 text-sky-300 border border-sky-800">
                    8/8 GATES PASS
                  </span>
                </div>
                <div className="space-y-2 text-xs">
                  <div className="p-2 rounded-lg bg-black/40 border border-white/10 flex items-center justify-between">
                    <div>
                      <span className="font-bold text-white block">GLM 5.3 · Contingencias IEEE-57</span>
                      <span className="text-[11px] opacity-75">80.2% contingencias N-0/N-1 aprobadas (69/86 en 44.8s).</span>
                    </div>
                    <span className="font-mono text-emerald-400 font-bold text-xs">PASS</span>
                  </div>
                  <div className="p-2 rounded-lg bg-black/40 border border-white/10 flex items-center justify-between">
                    <div>
                      <span className="font-bold text-white block">Luna Codex · Macro-Sandbox v2.7.5</span>
                      <span className="text-[11px] opacity-75">45/45 artefactos con validación criptográfica SHA-512 (59 MiB).</span>
                    </div>
                    <span className="font-mono text-emerald-400 font-bold text-xs">PASS</span>
                  </div>
                  <div className="p-2 rounded-lg bg-black/40 border border-white/10 flex items-center justify-between">
                    <div>
                      <span className="font-bold text-white block">m3.1-Mimo · Spinoff LSD & Tests MV</span>
                      <span className="text-[11px] opacity-75">64/65 pruebas unitarias exitosas (98.4%).</span>
                    </div>
                    <span className="font-mono text-amber-400 font-bold text-xs">PASS 98%</span>
                  </div>
                  <div className="p-2 rounded-lg bg-black/40 border border-white/10 flex items-center justify-between">
                    <div>
                      <span className="font-bold text-white block">Bepo · Sincronización OpenCluster</span>
                      <span className="text-[11px] opacity-75">&gt;85% descargado (PID 3193354, ETA ~21:45 CEST).</span>
                    </div>
                    <span className="font-mono text-indigo-400 font-bold text-xs">EN CURSO</span>
                  </div>
                </div>
              </section>

              <div className="p-3 rounded-xl bg-black/20 border border-white/5 flex items-center justify-between text-xs font-mono">
                <span className="opacity-70">Dispositivo Móvil de Auditoría:</span>
                <span className="font-bold text-sky-300">Realme P3 · AMOLED 120Hz (12 GB RAM)</span>
              </div>
            </div>
          )}

          {/* Sello Notarial de Cierre */}
          <div className="mt-5 pt-3 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-2 text-[10px] opacity-70 font-mono">
            <span>© 2026 Círculo Soberano SENI-IA · Cuadrado Hub Mobile</span>
            <span>Certificado por Notaría Digital Delegada</span>
          </div>
        </div>
      )}
    </div>
  );
};
