import React, { useState } from 'react';
import { ThemeConfig, DocumentMeta } from '../types';
import { DOCUMENTS, FTE_DAILY_HOURS, POLYSOMNOGRAPHY_DATA } from '../data/mockReports';
import { KindleModal } from './KindleModal';
import { 
  FileText, ExternalLink, RefreshCw, ShieldCheck, 
  BookOpen, HeartPulse, CheckCircle2, AlertTriangle, 
  Layers, Printer, Activity, Clock, ShieldAlert, 
  Award, TrendingUp, Sparkles, Moon, Share2, Compass
} from 'lucide-react';

interface ReportsModuleProps {
  theme: ThemeConfig;
  textZoom: number;
  onOpenThemeModal?: () => void;
  selectedDocId?: string;
  onSelectDocId?: (id: string) => void;
}

export const ReportsModule: React.FC<ReportsModuleProps> = ({ 
  theme, 
  textZoom,
  onOpenThemeModal,
  selectedDocId: externalSelectedDocId,
  onSelectDocId,
}) => {
  const [internalSelectedDocId, setInternalSelectedDocId] = useState<string>('reportes-maestro');
  const [isKindleModalOpen, setIsKindleModalOpen] = useState<boolean>(false);
  const [isRefreshing, setIsRefreshing] = useState<boolean>(false);

  const activeDocId = externalSelectedDocId || internalSelectedDocId;
  const selectedDoc = DOCUMENTS.find((d) => d.id === activeDocId) || DOCUMENTS[0];

  const handleSelectDoc = (id: string) => {
    if (onSelectDocId) {
      onSelectDocId(id);
    } else {
      setInternalSelectedDocId(id);
    }
  };

  const handleRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => {
      setIsRefreshing(false);
    }, 400);
  };

  // Dinámica de zoom tipográfico editorial
  const getZoomTypography = () => {
    switch (textZoom) {
      case -1:
        return {
          body: 'text-[12px] leading-relaxed',
          heading1: 'text-base sm:text-lg',
          heading2: 'text-sm sm:text-base',
          heading3: 'text-xs sm:text-sm',
          kpi: 'text-lg font-black',
        };
      case 1:
        return {
          body: 'text-[15px] sm:text-[16px] leading-loose',
          heading1: 'text-xl sm:text-2xl',
          heading2: 'text-lg sm:text-xl',
          heading3: 'text-sm sm:text-base',
          kpi: 'text-2xl sm:text-3xl font-black',
        };
      case 2:
        return {
          body: 'text-[17px] sm:text-[18px] leading-loose',
          heading1: 'text-2xl sm:text-3xl',
          heading2: 'text-xl sm:text-2xl',
          heading3: 'text-base sm:text-lg',
          kpi: 'text-3xl sm:text-4xl font-black',
        };
      case 0:
      default:
        return {
          body: 'text-[13.5px] sm:text-[14.5px] leading-relaxed',
          heading1: 'text-lg sm:text-xl',
          heading2: 'text-base sm:text-lg',
          heading3: 'text-xs sm:text-sm',
          kpi: 'text-xl sm:text-2xl font-black',
        };
    }
  };

  const typo = getZoomTypography();

  // Generación de contenido HTML plano para la suite Kindle / e-Reader
  const generateEreaderHtml = () => {
    if (selectedDoc.id === 'arbol-clinico-salud') {
      return `
        <h2>1. Resumen de Estudio Polisomnográfico</h2>
        <p>Paciente: ${POLYSOMNOGRAPHY_DATA.patient}. Fecha: ${POLYSOMNOGRAPHY_DATA.studyDate}.</p>
        <p><strong>Latencia SOL:</strong> ${POLYSOMNOGRAPHY_DATA.sleepLatencySolMin} min | <strong>IAH:</strong> ${POLYSOMNOGRAPHY_DATA.iahScore} /h | <strong>Eficiencia:</strong> ${POLYSOMNOGRAPHY_DATA.sleepEfficiencyPercent}%</p>
        <p><strong>Eventos Respiratorios Totales:</strong> ${POLYSOMNOGRAPHY_DATA.totalRespiratoryEvents} (2 apneas, 6 hipopneas). SpO2 Media: ${POLYSOMNOGRAPHY_DATA.spo2Average}%, Mínima: ${POLYSOMNOGRAPHY_DATA.spo2Nadir}%.</p>
        <h2>2. Correlación con 141 Horas de Ingeniería</h2>
        <p>Pico de mayor latencia registrado en Día 3 (28.5 min) coincidiendo con 19.5h continuas de trabajo en contingencias N-1. Conclusión médica: Preservación de fase REM (23.9%) y activación Wu-Wei.</p>
      `;
    }
    return `
      <h2>1. Auditoría Laboral y Esfuerzo de Ingeniería</h2>
      <p>Total de horas netas: 141.0 horas en 8 días continuos (17.6h/día). Multiplicador de plantilla: 7.5x a 8.0x FTE (~915h combinadas).</p>
      <h2>2. Evidencias del Enjambre</h2>
      <p>GLM 5.3: IEEE-57 N-0/N-1 80.2% aprobadas. Luna Codex: Macro-Sandbox v2.7.5 con 45/45 artefactos SHA-512. m3.1-Mimo: 64/65 tests PASS. Bepo: Descarga OC PID 3193354.</p>
    `;
  };

  return (
    <div className="flex flex-col gap-3 pb-28 animate-fadeIn">
      {/* 1. Selector Superior de Documento (4 Documentos Oficiales) */}
      <div className="no-print">
        <div className="flex items-center justify-between mb-1.5 px-1">
          <span className="text-[11px] font-bold uppercase tracking-wider opacity-75 flex items-center gap-1.5">
            <Compass className="w-3.5 h-3.5" style={{ color: theme.accentColor }} />
            Biblioteca Notarial del Círculo Soberano
          </span>
          <span className="text-[10px] font-mono opacity-60">
            4 Documentos Certificados
          </span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-1.5">
          {DOCUMENTS.map((doc) => {
            const isSelected = selectedDoc.id === doc.id;
            return (
              <button
                key={doc.id}
                onClick={() => handleSelectDoc(doc.id)}
                className={`flex flex-col p-2.5 rounded-xl text-left border transition-all text-xs relative ${
                  isSelected
                    ? 'border-2 shadow-lg scale-[1.02]'
                    : 'border-white/10 hover:border-white/20 opacity-80'
                }`}
                style={{
                  backgroundColor: isSelected ? `${theme.accentColor}22` : undefined,
                  borderColor: isSelected ? theme.accentColor : undefined,
                }}
              >
                <div className="flex items-center justify-between w-full mb-1">
                  <span className="text-lg">{doc.icon}</span>
                  <span 
                    className="text-[9px] px-1.5 py-0.2 rounded-full font-mono font-bold"
                    style={{
                      backgroundColor: isSelected ? theme.accentColor : 'rgba(255,255,255,0.12)',
                      color: isSelected ? (theme.isLight ? '#FFFFFF' : '#000000') : undefined,
                    }}
                  >
                    {doc.badge}
                  </span>
                </div>
                <span className="font-extrabold text-[11px] truncate leading-tight">{doc.title}</span>
                <span className="text-[9px] opacity-70 truncate mt-0.5">{doc.subtitle}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* 2. Barra de Acción Editorial: Enviar a Kindle, Estado de Sellado, PDF */}
      <div 
        className={`p-2.5 rounded-2xl border flex items-center justify-between gap-2 shadow-sm ${theme.cardBgClass} ${theme.borderClass} no-print`}
      >
        <div className="flex items-center gap-2 min-w-0">
          <div 
            className="p-1.5 rounded-xl flex items-center justify-center shrink-0"
            style={{ backgroundColor: `${theme.accentColor}20`, color: theme.accentColor }}
          >
            <ShieldCheck className="w-4 h-4" />
          </div>
          <div className="min-w-0">
            <div className="flex items-center gap-1.5 flex-wrap">
              <span className="font-bold text-xs truncate">{selectedDoc.title}</span>
              <span className="text-[9px] px-1.5 py-0.2 rounded font-mono font-bold bg-emerald-950 text-emerald-300 border border-emerald-800">
                G7 NOTARIAL PASS
              </span>
            </div>
            <div className="text-[9px] font-mono opacity-60 truncate">
              Hash: {selectedDoc.hashSha512.slice(0, 14)}... · {selectedDoc.cachedTimestamp.split(' ')[0]}
            </div>
          </div>
        </div>

        {/* Botones de Acción: Tema + Kindle + Refresh */}
        <div className="flex items-center gap-1.5 shrink-0 flex-wrap">
          {/* BOTÓN CAMBIAR TEMA (20 TEMAS NOTARIALES) 🎨 */}
          {onOpenThemeModal && (
            <button
              onClick={onOpenThemeModal}
              className="px-2.5 py-1.5 rounded-xl bg-black/30 hover:bg-black/50 border border-white/10 text-xs font-bold flex items-center gap-1.5 transition-all shadow-sm active:scale-95"
              title="Cambiar entre los 20 temas visuales"
            >
              <Palette className="w-3.5 h-3.5 text-sky-400" />
              <span className="hidden sm:inline">Tema:</span>
              <span className="truncate max-w-[80px]" style={{ color: theme.accentColor }}>{theme.name}</span>
            </button>
          )}

          {/* BOTÓN DESTACADO "ENVIAR A KINDLE" 📚 */}
          <button
            onClick={() => setIsKindleModalOpen(true)}
            className="px-3 py-1.5 rounded-xl font-bold text-xs flex items-center gap-1.5 active:scale-95 transition-all shadow-md group"
            style={{ 
              backgroundColor: '#FF9900', 
              color: '#111111' 
            }}
            title="Enviar documento completo a Amazon Kindle / e-Reader"
          >
            <BookOpen className="w-3.5 h-3.5 transition-transform group-hover:scale-110" />
            <span className="tracking-tight">Enviar a Kindle</span>
            <span className="text-[10px] hidden xs:inline">📚</span>
          </button>

          {/* Refrescar Documento */}
          <button
            onClick={handleRefresh}
            className={`p-2 rounded-xl bg-black/25 border border-white/10 hover:bg-white/10 transition-transform ${
              isRefreshing ? 'animate-spin' : ''
            }`}
            title="Recargar vista editorial"
          >
            <RefreshCw className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* 3. LECTOR EDITORIAL COMPLETO INTEGRADO (ADAPTADO AL TEMA SELECCIONADO) */}
      <article 
        className={`rounded-3xl border p-4 sm:p-7 shadow-2xl transition-all ${theme.cardBgClass} ${theme.borderClass} ${typo.body}`}
      >
        {/* Cabecera Notarial / Editorial */}
        <header className="border-b border-white/15 pb-4 mb-5">
          <div className="flex items-start justify-between gap-3">
            <div>
              <div className="flex items-center gap-2 mb-1.5 flex-wrap">
                <span 
                  className="text-[10px] font-mono px-2 py-0.5 rounded-full font-bold uppercase tracking-wider"
                  style={{
                    backgroundColor: `${theme.accentColor}25`,
                    color: theme.accentColor,
                    border: `1px solid ${theme.accentColor}50`
                  }}
                >
                  Círculo Soberano · SENI-IA
                </span>
                <span className="text-[10px] font-mono opacity-65">
                  Protocolo Notarial Inmutable
                </span>
                <span className="text-[10px] font-mono opacity-65">
                  · Dispositivo: Realme P3 (120Hz)
                </span>
              </div>

              <h1 className={`${typo.heading1} font-black tracking-tight mt-1`}>
                {selectedDoc.title}
              </h1>
              <p className={`text-xs sm:text-sm ${theme.mutedTextClass} mt-1 font-medium`}>
                {selectedDoc.subtitle}
              </p>
            </div>

            <div className="text-right shrink-0">
              <div className="text-2xl sm:text-3xl">{selectedDoc.icon}</div>
              <div className="text-[9px] font-mono opacity-50 mt-1">
                Ref. 2026.10
              </div>
            </div>
          </div>

          {/* Sello Notarial y Criptográfico */}
          <div className="mt-3.5 grid grid-cols-2 sm:grid-cols-3 gap-2 p-2.5 rounded-2xl bg-black/30 text-[10px] font-mono border border-white/10">
            <div>
              <span className="opacity-50 block">Sellado Temporal:</span>
              <span className="font-semibold">{selectedDoc.cachedTimestamp}</span>
            </div>
            <div>
              <span className="opacity-50 block">Hash SHA-512:</span>
              <span className="font-semibold truncate block" title={selectedDoc.hashSha512}>
                {selectedDoc.hashSha512.slice(0, 18)}...
              </span>
            </div>
            <div className="col-span-2 sm:col-span-1">
              <span className="opacity-50 block">Certificación de Copia:</span>
              <span className="text-emerald-400 font-bold flex items-center gap-1">
                <CheckCircle2 className="w-3 h-3 inline" /> Fe Notarial Inmutable
              </span>
            </div>
          </div>
        </header>

        {/* =========================================================================
            DOCUMENTO 1: PORTAL MAESTRO DE REPORTES (20 TEMAS NOTARIALES)
        ========================================================================= */}
        {selectedDoc.id === 'reportes-maestro' && (
          <div className="space-y-6">
            <section className="space-y-2.5">
              <h2 className={`${typo.heading2} font-extrabold flex items-center gap-2`} style={{ color: theme.accentColor }}>
                <Layers className="w-4 h-4 sm:w-5 sm:h-5 shrink-0" />
                <span>1. Preámbulo Notarial y Filosofía de Diseño</span>
              </h2>
              <p className="opacity-90 leading-relaxed text-justify">
                En Madrid, a 9 de octubre de 2026, el Círculo Soberano SENI-IA deja constancia formal de la arquitectura de visualización documental multi-dispositivo concebida para la investigación doctoral de <strong>Junior Alexis Villanueva Rosario</strong>. Con el objetivo de garantizar una legibilidad ininterrumpida sin inducir fatiga visual en sesiones prolongadas de auditoría, se ha configurado una suite canónica de <strong>20 temas cromáticos</strong> gobernados por estrictos ratios de contraste WCAG AAA y algoritmos de optimización de potencia en matrices OLED.
              </p>
            </section>

            {/* Tabla Completa de los 20 Temas Notariales */}
            <section className="space-y-3">
              <h3 className={`${typo.heading3} font-bold uppercase tracking-wider text-white flex items-center gap-2`}>
                <span>2. Matriz Notarial de los 20 Temas Visuales</span>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-white/10 opacity-70">
                  20 Perfiles
                </span>
              </h3>
              <div className="overflow-x-auto rounded-2xl border border-white/10 bg-black/25">
                <table className="w-full text-left text-xs">
                  <thead className="bg-black/50 border-b border-white/10 text-[10px] font-mono uppercase tracking-wider opacity-75">
                    <tr>
                      <th className="p-2.5">ID / Denominación</th>
                      <th className="p-2.5">Fondo Base</th>
                      <th className="p-2.5">Acento Cromático</th>
                      <th className="p-2.5">Propósito Clínico / Operativo</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/5 font-mono text-[11px]">
                    <tr>
                      <td className="p-2.5 font-bold text-sky-400">1. Guardia OLED</td>
                      <td className="p-2.5">#000000 Puro</td>
                      <td className="p-2.5">#38BDF8 Sky</td>
                      <td className="p-2.5 font-sans">0% consumo en píxeles apagados de AMOLED Realme P3.</td>
                    </tr>
                    <tr>
                      <td className="p-2.5 font-bold text-blue-400">2. IEEE Claro</td>
                      <td className="p-2.5">#F8FAFC Blanco</td>
                      <td className="p-2.5">#002D62 Azul IEEE</td>
                      <td className="p-2.5 font-sans">Formalidad académica para actas impresas y tribunales.</td>
                    </tr>
                    <tr>
                      <td className="p-2.5 font-bold text-purple-400">3. Árbol Clínico</td>
                      <td className="p-2.5">#18122B Morado</td>
                      <td className="p-2.5">#A78BFA Lavanda</td>
                      <td className="p-2.5 font-sans">Atenuación simpática y reducción de estrés neurocognitivo.</td>
                    </tr>
                    <tr>
                      <td className="p-2.5 font-bold text-amber-500">4. Sepia E-Reader</td>
                      <td className="p-2.5">#F4ECD8 Papiro</td>
                      <td className="p-2.5">#7C4A03 Marrón</td>
                      <td className="p-2.5 font-sans">Emulación de tinta electrónica para lectura prolongada.</td>
                    </tr>
                    <tr>
                      <td className="p-2.5 font-bold text-[#00FF66]">5. Matrix Cyber</td>
                      <td className="p-2.5">#000000 Negro</td>
                      <td className="p-2.5">#00FF66 Fósforo</td>
                      <td className="p-2.5 font-sans">Lluvia digital animada en canvas nativo a 120 FPS.</td>
                    </tr>
                    <tr>
                      <td className="p-2.5 font-bold text-amber-400">6. Círculo Notarial</td>
                      <td className="p-2.5">#0B0F19 Pizarra</td>
                      <td className="p-2.5">#F59E0B Ámbar Oro</td>
                      <td className="p-2.5 font-sans">Protocolo solemne de actas notariales con sellos PGP.</td>
                    </tr>
                    <tr>
                      <td className="p-2.5 font-bold text-cyan-400">7. Nordic Frost</td>
                      <td className="p-2.5">#080D1A Ártico</td>
                      <td className="p-2.5">#38BDF8 Cían</td>
                      <td className="p-2.5 font-sans">Contraste gélido para auditoría técnica de compuertas G0-G7.</td>
                    </tr>
                    <tr>
                      <td className="p-2.5 font-bold text-rose-400">8. Crimson G0-G7</td>
                      <td className="p-2.5">#120508 Obsidiana</td>
                      <td className="p-2.5">#F43F5E Carmesí</td>
                      <td className="p-2.5 font-sans">Monitoreo de umbrales críticos y alarmas del sistema.</td>
                    </tr>
                    <tr>
                      <td className="p-2.5 font-bold text-emerald-400">9. Esmeralda Bio</td>
                      <td className="p-2.5">#000000 Negro</td>
                      <td className="p-2.5">#10B981 Esmeralda</td>
                      <td className="p-2.5 font-sans">Telemetría de bioseñales y coherencia autonómica.</td>
                    </tr>
                    <tr>
                      <td className="p-2.5 font-bold text-stone-300">10-20. Suite Extendida</td>
                      <td className="p-2.5">Múltiples</td>
                      <td className="p-2.5">Calibrados</td>
                      <td className="p-2.5 font-sans">Solar SENI, Tokyo Neon, Luna Codex, Gruvbox, Pergamino Jurídico, etc.</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </section>

            {/* Evidencias de Agentes */}
            <section className="space-y-3">
              <h3 className={`${typo.heading3} font-bold uppercase tracking-wider text-white`}>
                3. Certificación de Aislamiento y Enjambre
              </h3>
              <p className="opacity-90 leading-relaxed text-justify">
                Cada módulo de la aplicación ejecuta un entorno hermético gobernado por el <strong>Macro-Sandbox v2.7.5</strong>. Todos los artefactos de código compilan bajo un árbol de dependencias reproducibles con hashes criptográficos SHA-512 inmutables, asegurando que la telemetría refleje sin alteración el estado del servidor local en el puerto 5678.
              </p>
            </section>
          </div>
        )}

        {/* =========================================================================
            DOCUMENTO 2: INFORME DE AUDITORÍA LABORAL & FTE (141H NETAS, 7.5x FTE)
        ========================================================================= */}
        {selectedDoc.id === 'informe-laboral' && (
          <div className="space-y-6">
            <section className="space-y-2.5">
              <h2 className={`${typo.heading2} font-extrabold flex items-center gap-2`} style={{ color: theme.accentColor }}>
                <Clock className="w-4 h-4 sm:w-5 sm:h-5 shrink-0" />
                <span>1. Dictamen Notarial de Rendimiento de Ingeniería</span>
              </h2>
              <p className="opacity-90 leading-relaxed text-justify">
                Certifico que entre las 00:00 horas del 2 de octubre de 2026 y las 13:45 horas del 9 de octubre de 2026 (un lapso estricto de <strong>8 días consecutivos</strong>), el doctorando <strong>Junior Alexis Villanueva Rosario</strong> acumuló un total certificado de <strong>141.0 horas netas de ingeniería de alto rendimiento</strong> dedicadas a la resolución de contingencias IEEE-57, el ensamblado hermético del Macro-Sandbox y la programación táctil del Cuadrado Mobile Hub.
              </p>
            </section>

            {/* 4 KPIs de Impacto */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 my-3">
              <div className="p-3.5 rounded-2xl bg-black/35 border border-white/10 text-center">
                <span className="text-[10px] uppercase font-mono opacity-65 block">Horas Netas</span>
                <span className={`${typo.kpi} text-amber-400 block mt-0.5`}>141.0 h</span>
                <span className="text-[10px] opacity-60 font-mono">8 días continuos</span>
              </div>
              <div className="p-3.5 rounded-2xl bg-black/35 border border-white/10 text-center">
                <span className="text-[10px] uppercase font-mono opacity-65 block">Intensidad Media</span>
                <span className={`${typo.kpi} text-rose-400 block mt-0.5`}>17.6 h/d</span>
                <span className="text-[10px] opacity-60 font-mono">Pico: 19.5h (Día 3)</span>
              </div>
              <div className="p-3.5 rounded-2xl bg-black/35 border border-white/10 text-center">
                <span className="text-[10px] uppercase font-mono opacity-65 block">Multiplicador FTE</span>
                <span className={`${typo.kpi} text-emerald-400 block mt-0.5`}>7.5x - 8.0x</span>
                <span className="text-[10px] opacity-60 font-mono">Full-Time Equiv.</span>
              </div>
              <div className="p-3.5 rounded-2xl bg-black/35 border border-white/10 text-center">
                <span className="text-[10px] uppercase font-mono opacity-65 block">Ingeniería Homóloga</span>
                <span className={`${typo.kpi} text-sky-400 block mt-0.5`}>~915 h</span>
                <span className="text-[10px] opacity-60 font-mono">Producción en equipo</span>
              </div>
            </div>

            {/* Tabla Detallada Día por Día (02 - 09 Octubre) */}
            <section className="space-y-3">
              <h3 className={`${typo.heading3} font-bold uppercase tracking-wider text-white flex items-center gap-2`}>
                <span>2. Registro Cronológico Diario de Ingeniería (02 al 09 Octubre 2026)</span>
              </h3>
              <div className="overflow-x-auto rounded-2xl border border-white/10 bg-black/25">
                <table className="w-full text-left text-xs">
                  <thead className="bg-black/50 border-b border-white/10 text-[10px] font-mono uppercase tracking-wider opacity-75">
                    <tr>
                      <th className="p-2.5">Jornada</th>
                      <th className="p-2.5">Horas Reales</th>
                      <th className="p-2.5">Límite Seguro</th>
                      <th className="p-2.5">FTE Equiv.</th>
                      <th className="p-2.5">Paquete de Trabajo y Entregables</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/5 font-mono text-[11px]">
                    {FTE_DAILY_HOURS.map((d, i) => (
                      <tr key={i} className={i === 2 ? 'bg-rose-950/20' : ''}>
                        <td className="p-2.5 font-bold text-white whitespace-nowrap">{d.day}</td>
                        <td className="p-2.5 font-bold text-amber-400">{d.humanHours} h</td>
                        <td className="p-2.5 text-rose-400 line-through opacity-70">8.0 h</td>
                        <td className="p-2.5 font-bold text-emerald-400">{d.fteEquiv}x</td>
                        <td className="p-2.5 font-sans text-zinc-300">{d.tasks}</td>
                      </tr>
                    ))}
                  </tbody>
                  <tfoot className="bg-black/60 font-mono text-xs font-bold border-t border-white/10">
                    <tr>
                      <td className="p-2.5 text-white">TOTAL CONSOLIDADO</td>
                      <td className="p-2.5 text-amber-400">141.0 h</td>
                      <td className="p-2.5 text-rose-400">64.0 h máx.</td>
                      <td className="p-2.5 text-emerald-400">7.6x prom.</td>
                      <td className="p-2.5 font-sans text-sky-300">Superávit de +77.0 horas de sobreesfuerzo (+120%)</td>
                    </tr>
                  </tfoot>
                </table>
              </div>
            </section>

            {/* Alerta Clínica Wu-Wei */}
            <div className="p-4 rounded-2xl bg-rose-950/50 border border-rose-800 text-rose-100 flex items-start gap-3.5">
              <AlertTriangle className="w-6 h-6 text-rose-400 shrink-0 mt-0.5" />
              <div className="space-y-1">
                <h4 className="font-bold text-sm text-rose-300 uppercase tracking-wide">
                  Alerta Médica Notarial · Principio Wu-Wei
                </h4>
                <p className="text-xs sm:text-[13px] leading-relaxed text-rose-200">
                  «La máquina debe vigilar a la máquina y el doctorando debe descansar». Mantener un régimen de 17.6h diarias amenaza la integridad física del investigador. Por prescripción del Círculo Soberano, se ordena activar el centinela automático del enjambre (GLM, Luna, Mimo y Bepo) para transferir las tareas de supervisión y compuertas.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* =========================================================================
            DOCUMENTO 3: PARTE DE SITUACIÓN OPERATIVA DEL MACRO-SANDBOX Y ENJAMBRE
        ========================================================================= */}
        {selectedDoc.id === 'parte-situacion' && (
          <div className="space-y-6">
            <section className="space-y-2.5">
              <h2 className={`${typo.heading2} font-extrabold flex items-center gap-2`} style={{ color: theme.accentColor }}>
                <ShieldAlert className="w-4 h-4 sm:w-5 sm:h-5 shrink-0" />
                <span>1. Estado del Enjambre Autónomo (13:45 CEST)</span>
              </h2>
              <p className="opacity-90 leading-relaxed text-justify">
                A continuación se desglosan los resultados obtenidos tras la culminación de la fase de pruebas intensivas en el clúster de cómputo, verificando la convergencia del sistema en las compuertas G0 a G7:
              </p>
            </section>

            {/* 4 Nodos de Telemetría */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              <div className="p-3.5 rounded-2xl bg-black/30 border border-emerald-900/60">
                <div className="flex items-center justify-between mb-1.5">
                  <span className="font-extrabold text-emerald-300 text-sm">GLM 5.3 · IEEE-57 Contingencias</span>
                  <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-emerald-950 text-emerald-400 border border-emerald-800">PASS</span>
                </div>
                <p className="opacity-80 text-[11px] leading-relaxed">
                  Algoritmo Newton-Raphson vectorizado. 80.2% de contingencias N-0 y N-1 resueltas con holgura de tensión. 69 de 86 casos resueltos en 44.8 segundos sin divergencias numéricas.
                </p>
              </div>

              <div className="p-3.5 rounded-2xl bg-black/30 border border-sky-900/60">
                <div className="flex items-center justify-between mb-1.5">
                  <span className="font-extrabold text-sky-300 text-sm">Luna Codex · Macro-Sandbox v2.7.5</span>
                  <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-sky-950 text-sky-400 border border-sky-800">PASS</span>
                </div>
                <p className="opacity-80 text-[11px] leading-relaxed">
                  Ensamblado hermético de 59.2 MiB con 45 de 45 artefactos con hash SHA-512 idéntico al registro notarial. Inmutabilidad del árbol de dependencias comprobada.
                </p>
              </div>

              <div className="p-3.5 rounded-2xl bg-black/30 border border-amber-900/60">
                <div className="flex items-center justify-between mb-1.5">
                  <span className="font-extrabold text-amber-300 text-sm">m3.1-Mimo · Spinoff LSD & Tests</span>
                  <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-amber-950 text-amber-400 border border-amber-800">98.4% PASS</span>
                </div>
                <p className="opacity-80 text-[11px] leading-relaxed">
                  64 de 65 tests unitarios aprobados. Módulo de reconocimiento de lengua de señas (LSD) calibrado con latencia de 18ms por frame cinemático.
                </p>
              </div>

              <div className="p-3.5 rounded-2xl bg-black/30 border border-indigo-900/60">
                <div className="flex items-center justify-between mb-1.5">
                  <span className="font-extrabold text-indigo-300 text-sm">Bepo · OpenCluster Sync</span>
                  <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-indigo-950 text-indigo-400 border border-indigo-800">EN CURSO</span>
                </div>
                <p className="opacity-80 text-[11px] leading-relaxed">
                  PID en host: 3193354. Descarga de pesos distribuida superior al 86.4%. Consumo de RAM: 1.4 GiB con tasa de transferencia sostenida de 14.2 MiB/s.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* =========================================================================
            DOCUMENTO 4: DASHBOARD MÉDICO & SUEÑO (ÁRBOL CLÍNICO · POLISOMNOGRAFÍA)
        ========================================================================= */}
        {selectedDoc.id === 'arbol-clinico-salud' && (
          <div className="space-y-6">
            <section className="space-y-2.5">
              <div className="flex items-center justify-between">
                <h2 className={`${typo.heading2} font-extrabold flex items-center gap-2`} style={{ color: theme.accentColor }}>
                  <HeartPulse className="w-5 h-5 shrink-0 text-rose-400" />
                  <span>1. Informe de Polisomnografía Nocturna (PSG)</span>
                </h2>
                <span className="text-[10px] font-mono px-2.5 py-0.5 rounded-full bg-purple-950 text-purple-300 border border-purple-800 font-bold">
                  🌸 Árbol Clínico
                </span>
              </div>
              <p className="opacity-90 leading-relaxed text-justify">
                Estudio neurofisiológico nocturno protocolizado para evaluar el impacto de la carga cognitiva extrema (141 horas netas en 8 días) sobre la arquitectura del sueño, el tono simpático y los parámetros respiratorios de <strong>{POLYSOMNOGRAPHY_DATA.patient}</strong>.
              </p>
            </section>

            {/* 4 Métricas Clave de Polisomnografía Requeridas */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 my-3">
              <div className="p-3.5 rounded-2xl bg-black/35 border border-purple-900/60 text-center">
                <span className="text-[10px] uppercase font-mono opacity-65 block">Latencia SOL</span>
                <span className={`${typo.kpi} text-purple-300 block mt-0.5`}>
                  {POLYSOMNOGRAPHY_DATA.sleepLatencySolMin} min
                </span>
                <span className="text-[10px] opacity-60 font-mono">Normal: 10-25 min</span>
              </div>

              <div className="p-3.5 rounded-2xl bg-black/35 border border-purple-900/60 text-center">
                <span className="text-[10px] uppercase font-mono opacity-65 block">Índice IAH</span>
                <span className={`${typo.kpi} text-emerald-400 block mt-0.5`}>
                  {POLYSOMNOGRAPHY_DATA.iahScore} /h
                </span>
                <span className="text-[10px] opacity-60 font-mono">Normal: &lt; 5.0 /h</span>
              </div>

              <div className="p-3.5 rounded-2xl bg-black/35 border border-purple-900/60 text-center">
                <span className="text-[10px] uppercase font-mono opacity-65 block">Eficiencia Sueño</span>
                <span className={`${typo.kpi} text-sky-400 block mt-0.5`}>
                  {POLYSOMNOGRAPHY_DATA.sleepEfficiencyPercent}%
                </span>
                <span className="text-[10px] opacity-60 font-mono">Normal: &gt; 85%</span>
              </div>

              <div className="p-3.5 rounded-2xl bg-black/35 border border-purple-900/60 text-center">
                <span className="text-[10px] uppercase font-mono opacity-65 block">Eventos Apnea/Hipo</span>
                <span className={`${typo.kpi} text-amber-400 block mt-0.5`}>
                  {POLYSOMNOGRAPHY_DATA.totalRespiratoryEvents}
                </span>
                <span className="text-[10px] opacity-60 font-mono">2 apneas, 6 hipopneas</span>
              </div>
            </div>

            {/* Arquitectura de Sueño (Fases N1, N2, N3, REM) */}
            <section className="p-3.5 rounded-2xl bg-black/30 border border-white/10 space-y-3">
              <div className="flex items-center justify-between">
                <h3 className={`${typo.heading3} font-bold text-white uppercase tracking-wider`}>
                  2. Arquitectura de Etapas de Sueño (381 min TST)
                </h3>
                <span className="text-[10px] font-mono opacity-65">SpO2 Media: {POLYSOMNOGRAPHY_DATA.spo2Average}%</span>
              </div>

              {/* Barra segmentada de arquitectura */}
              <div className="w-full h-4 rounded-full overflow-hidden flex border border-white/10 shadow-inner">
                {POLYSOMNOGRAPHY_DATA.sleepArchitecture.map((arch, idx) => (
                  <div
                    key={idx}
                    className="h-full transition-all duration-300 relative group"
                    style={{ width: `${arch.percent}%`, backgroundColor: arch.color }}
                    title={`${arch.stage} (${arch.label}): ${arch.percent}% (${arch.minutes} min)`}
                  />
                ))}
              </div>

              {/* Leyenda de fases */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs font-mono">
                {POLYSOMNOGRAPHY_DATA.sleepArchitecture.map((arch, idx) => (
                  <div key={idx} className="p-2 rounded-xl bg-black/40 border border-white/5 flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full shrink-0" style={{ backgroundColor: arch.color }} />
                    <div className="min-w-0">
                      <span className="font-bold text-white block text-[11px]">{arch.stage} ({arch.percent}%)</span>
                      <span className="text-[9px] opacity-60 truncate block">{arch.label}</span>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Gráfica y Tabla de Correlación: Horas de Trabajo vs Parámetros de Sueño */}
            <section className="space-y-3">
              <h3 className={`${typo.heading3} font-bold uppercase tracking-wider text-white flex items-center gap-2`}>
                <TrendingUp className="w-4 h-4 text-purple-400" />
                <span>3. Correlación Cruzada: Carga Laboral Círculo (141h) vs. Sueño</span>
              </h3>
              <p className="opacity-80 text-xs leading-relaxed text-justify">
                Correlación estadística entre las horas diarias de ingeniería y las perturbaciones del sueño (latencia SOL en minutos y despertares autonómicos nocturnos):
              </p>

              <div className="overflow-x-auto rounded-2xl border border-white/10 bg-black/25">
                <table className="w-full text-left text-xs">
                  <thead className="bg-black/50 border-b border-white/10 text-[10px] font-mono uppercase tracking-wider opacity-75">
                    <tr>
                      <th className="p-2.5">Día</th>
                      <th className="p-2.5">Horas Trabajo</th>
                      <th className="p-2.5">Latencia SOL</th>
                      <th className="p-2.5">Eficiencia</th>
                      <th className="p-2.5">Arousals</th>
                      <th className="p-2.5">Evaluación Neurocognitiva</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/5 font-mono text-[11px]">
                    {POLYSOMNOGRAPHY_DATA.correlationFte.map((row, idx) => (
                      <tr key={idx} className={row.hoursWorked > 19 ? 'bg-rose-950/20' : ''}>
                        <td className="p-2.5 font-bold text-white whitespace-nowrap">{row.day} ({row.date})</td>
                        <td className="p-2.5 font-bold text-amber-400">{row.hoursWorked} h</td>
                        <td className="p-2.5 font-bold text-purple-300">{row.sleepLatencyMin} min</td>
                        <td className="p-2.5 text-sky-400">{row.sleepEfficiency}%</td>
                        <td className="p-2.5 text-rose-300">{row.arousalsCount}</td>
                        <td className="p-2.5 font-sans text-zinc-300 text-[11px]">{row.cognitiveNote}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>

            {/* Conclusión del Árbol Clínico */}
            <div className="p-4 rounded-2xl bg-purple-950/40 border border-purple-800 text-purple-100 flex items-start gap-3.5">
              <HeartPulse className="w-6 h-6 text-purple-300 shrink-0 mt-0.5" />
              <div className="space-y-1">
                <h4 className="font-bold text-sm text-purple-200 uppercase tracking-wide">
                  Diagnóstico y Dictamen del Árbol Clínico
                </h4>
                <p className="text-xs sm:text-[13px] leading-relaxed text-purple-100/90">
                  {POLYSOMNOGRAPHY_DATA.clinicalConclusion}
                </p>
              </div>
            </div>
          </div>
        )}

        {/* DOCUMENTO: SALUD YTSEN AQUINO (6 AÑOS + SUITE ADN 14 TESTS) */}
        {selectedDoc.id === 'clinico-ytsen' && (
          <div className="space-y-6">
            <section className="space-y-2.5">
              <div className="flex items-center justify-between">
                <h2 className={`${typo.heading2} font-extrabold flex items-center gap-2`} style={{ color: theme.accentColor }}>
                  <HeartPulse className="w-5 h-5 shrink-0 text-emerald-400" />
                  <span>1. Perfil Clínico Longitudinal & Suite ADN (2020–2026)</span>
                </h2>
                <span className="text-[10px] font-mono px-2.5 py-0.5 rounded-full bg-emerald-950 text-emerald-300 border border-emerald-800 font-bold">
                  🧬 Ytsen Aquino
                </span>
              </div>
              <p className="opacity-90 leading-relaxed text-justify">
                Integración de 20 analíticas de laboratorio históricas más la nueva <strong>Suite Genómica de 14 Informes ADNTRO</strong> (82 páginas de evidencia genómica, metabolómica y farmacogenética, febrero 2026).
              </p>
            </section>

            {/* Módulos Genómicos ADNTRO */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              <div className="p-3.5 rounded-2xl bg-black/35 border border-emerald-900/60">
                <span className="font-extrabold text-emerald-300 text-sm block">Methylation Report (12 págs)</span>
                <p className="opacity-80 text-[11px] mt-1 leading-relaxed">
                  Rutas de un carbono, ciclo de homocisteína y estado de metilación de enzimas clave MTHFR y COMT.
                </p>
              </div>

              <div className="p-3.5 rounded-2xl bg-black/35 border border-emerald-900/60">
                <span className="font-extrabold text-emerald-300 text-sm block">Sugar Spike Report (8 págs)</span>
                <p className="opacity-80 text-[11px] mt-1 leading-relaxed">
                  Sensibilidad genética a carbohidratos, riesgo de picos glucémicos reactivos y secreción insulínica.
                </p>
              </div>

              <div className="p-3.5 rounded-2xl bg-black/35 border border-emerald-900/60">
                <span className="font-extrabold text-emerald-300 text-sm block">Pharmacogenetics (7 págs)</span>
                <p className="opacity-80 text-[11px] mt-1 leading-relaxed">
                  Metabolizadores CYP2D6, CYP2C19, toxicidad y compatibilidad con familias de fármacos.
                </p>
              </div>

              <div className="p-3.5 rounded-2xl bg-black/35 border border-emerald-900/60">
                <span className="font-extrabold text-emerald-300 text-sm block">Nutrigenómica & Vitaminas (8 págs)</span>
                <p className="opacity-80 text-[11px] mt-1 leading-relaxed">
                  Biodisponibilidad de Vitamina D, B12, absorción de folatos y metabolismo de ácidos grasos.
                </p>
              </div>
            </div>

            {/* Notas Literales de Laboratorio (lab_notes) */}
            <div className="p-4 rounded-2xl bg-amber-950/30 border border-amber-800 text-amber-100 space-y-2">
              <h4 className="font-bold text-xs uppercase tracking-wider text-amber-300 flex items-center gap-1.5">
                <span>Observaciones Literales del Bioanalista (`lab_notes`)</span>
              </h4>
              <div className="text-[11px] font-mono opacity-85 space-y-1.5 bg-black/40 p-2.5 rounded-xl border border-white/5">
                <p>• «Glucosa basal: Determinación por método Hexoquinasa / UV. Coherente con curva metabólica histórica.»</p>
                <p>• «Perfil Lipídico: Enzimático colorimétrico. Suero límpido, ausencia de interferencia por lipemia o hemólisis.»</p>
                <p>• «TFG estimada: Ecuación CKD-EPI 2021 sin factor racial: &gt;90 mL/min/1.73m² (Función renal conservada).»</p>
              </div>
            </div>
          </div>
        )}

        {/* DOCUMENTO: PARTE DE GUARDIA ALGORÍTMICA */}
        {selectedDoc.id === 'guardia-circulo' && (
          <div className="space-y-6">
            <section className="space-y-2.5">
              <h2 className={`${typo.heading2} font-extrabold flex items-center gap-2`} style={{ color: theme.accentColor }}>
                <ShieldAlert className="w-5 h-5 shrink-0 text-indigo-400" />
                <span>1. Acta de Guardia Algorítmica Continua 24h</span>
              </h2>
              <p className="opacity-90 leading-relaxed text-justify">
                Vigilancia activa de los enjambres de cálculo, paridad de bloques de OpenCluster y blindaje perimetral de los repositorios canónicos bajo protocolo de inmutabilidad notarial.
              </p>
            </section>
          </div>
        )}

        {/* DOCUMENTO: CONSENSO DOCTORAL V3 */}
        {selectedDoc.id === 'reporte-doctoral' && (
          <div className="space-y-6">
            <section className="space-y-2.5">
              <h2 className={`${typo.heading2} font-extrabold flex items-center gap-2`} style={{ color: theme.accentColor }}>
                <Sparkles className="w-5 h-5 shrink-0 text-amber-400" />
                <span>1. Consenso Doctoral: Arquitectura de Solver IEEE-57</span>
              </h2>
              <p className="opacity-90 leading-relaxed text-justify">
                Integración de flujos de potencia Newton-Raphson con aceleración matricial, convergencia en 4.1 iteraciones y tolerancia menor a 1e-6 p.u.
              </p>
            </section>
          </div>
        )}

        {/* Footer Notarial Inmutable */}
        <footer className="mt-8 pt-4 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-2 text-[10px] opacity-65 font-mono">
          <span>© 2026 Círculo Soberano SENI-IA · Cuadrado Mobile Hub</span>
          <span>Sello Notarial PGP: 4A89 F201 9B4C 3310 EA82 7701 B119 5CD3</span>
        </footer>
      </article>

      {/* Modal Suite "Enviar a Kindle" 📚 */}
      <KindleModal
        document={selectedDoc}
        theme={theme}
        isOpen={isKindleModalOpen}
        onClose={() => setIsKindleModalOpen(false)}
        documentHtmlContent={generateEreaderHtml()}
      />
    </div>
  );
};
