import React, { useState } from 'react';
import { ThemeConfig } from '../types';
import { FTE_DAILY_HOURS } from '../data/mockReports';
import { 
  AlertTriangle, Clock, TrendingUp, Users, HeartPulse, 
  CheckCircle2, ShieldAlert, Award, ChevronRight, Sparkles 
} from 'lucide-react';

interface AuditFteModuleProps {
  theme: ThemeConfig;
  onNavigateToReport?: (docId: string) => void;
}

export const AuditFteModule: React.FC<AuditFteModuleProps> = ({ theme, onNavigateToReport }) => {
  const [selectedDayIndex, setSelectedDayIndex] = useState<number>(7); // Último día por defecto
  const [delegationActive, setDelegationActive] = useState<boolean>(true);

  const selectedDay = FTE_DAILY_HOURS[selectedDayIndex];

  return (
    <div className="flex flex-col gap-3 pb-24 animate-fadeIn">
      {/* Tarjeta de Alerta Clínica Wu-Wei (Requerimiento Crítico) */}
      <div className="p-4 rounded-2xl bg-gradient-to-r from-rose-950/60 via-amber-950/40 to-rose-950/60 border border-rose-800/80 shadow-lg text-white">
        <div className="flex items-start gap-3">
          <div className="p-2 rounded-xl bg-rose-600/30 text-rose-300 border border-rose-500/40 shrink-0 mt-0.5">
            <HeartPulse className="w-5 h-5 animate-pulse" />
          </div>
          <div className="min-w-0">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-[10px] font-mono px-2 py-0.5 rounded font-bold uppercase tracking-wider bg-rose-900 text-rose-200 border border-rose-700">
                Alerta Clínica Wu-Wei
              </span>
              <span className="text-[10px] font-mono text-rose-300 font-bold">
                Sobreesfuerzo Crítico (17.6h/día)
              </span>
            </div>

            <h3 className="text-sm sm:text-base font-extrabold mt-1 text-rose-100">
              «La máquina debe vigilar a la máquina y el doctorando debe descansar»
            </h3>

            <p className="text-xs text-rose-200/90 mt-1 leading-relaxed">
              El volumen de <strong className="text-white">141 horas netas en 8 días continuos</strong> supera en más del 120% la capacidad biológica segura sostenida. Para preservar la integridad del investigador, el enjambre SENI-IA ha asumido la vigilancia de compilación, verificación de compuertas y pruebas de contingencia IEEE-57.
            </p>

            <div className="mt-3 pt-2.5 border-t border-rose-800/60 flex items-center justify-between text-xs">
              <span className="text-[11px] text-rose-300 flex items-center gap-1.5 font-medium">
                <ShieldAlert className="w-3.5 h-3.5" />
                Delegación Autónoma al Enjambre:
              </span>
              <button
                onClick={() => setDelegationActive(!delegationActive)}
                className={`px-2.5 py-1 rounded-lg text-xs font-mono font-bold transition-all ${
                  delegationActive
                    ? 'bg-emerald-500 text-black shadow-sm'
                    : 'bg-zinc-700 text-zinc-300'
                }`}
              >
                {delegationActive ? '✓ ACTIVA (Modo Guardia)' : 'Desactivada'}
              </button>
            </div>

            {onNavigateToReport && (
              <div className="mt-2.5 pt-2 border-t border-rose-800/40 flex justify-end">
                <button
                  onClick={() => onNavigateToReport('informe-laboral')}
                  className="px-3 py-1.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-black font-extrabold text-xs shadow-md flex items-center gap-1 transition-all active:scale-95"
                >
                  <span>📖 Leer Informe Laboral Completo (141h)</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* 4 KPIs Destacados de Auditoría */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
        <div className={`p-3 rounded-2xl border text-center flex flex-col justify-between ${theme.cardBgClass} ${theme.borderClass}`}>
          <div>
            <span className="text-[10px] opacity-65 block uppercase tracking-wider font-semibold">
              Horas Netas
            </span>
            <span className="text-2xl font-black text-amber-400 mt-0.5 block">141.0 h</span>
          </div>
          <span className="text-[10px] opacity-60 font-mono mt-1">8 días consecutivos</span>
        </div>

        <div className={`p-3 rounded-2xl border text-center flex flex-col justify-between ${theme.cardBgClass} ${theme.borderClass}`}>
          <div>
            <span className="text-[10px] opacity-65 block uppercase tracking-wider font-semibold">
              Promedio Diario
            </span>
            <span className="text-2xl font-black text-rose-400 mt-0.5 block">17.6 h/d</span>
          </div>
          <span className="text-[10px] opacity-60 font-mono mt-1">Máx: 19.5h (Día 3)</span>
        </div>

        <div className={`p-3 rounded-2xl border text-center flex flex-col justify-between ${theme.cardBgClass} ${theme.borderClass}`}>
          <div>
            <span className="text-[10px] opacity-65 block uppercase tracking-wider font-semibold">
              Multiplicador FTE
            </span>
            <span className="text-2xl font-black text-emerald-400 mt-0.5 block">7.5x - 8.0x</span>
          </div>
          <span className="text-[10px] opacity-60 font-mono mt-1">Full-Time Equiv.</span>
        </div>

        <div className={`p-3 rounded-2xl border text-center flex flex-col justify-between ${theme.cardBgClass} ${theme.borderClass}`}>
          <div>
            <span className="text-[10px] opacity-65 block uppercase tracking-wider font-semibold">
              Horas Combinadas
            </span>
            <span className="text-2xl font-black text-sky-400 mt-0.5 block">~915 h</span>
          </div>
          <span className="text-[10px] opacity-60 font-mono mt-1">Ingeniería homóloga</span>
        </div>
      </div>

      {/* Gráfico Temporal Comparativo (Horas vs Límite Seguro de 8h) */}
      <div className={`p-4 rounded-2xl border ${theme.cardBgClass} ${theme.borderClass}`}>
        <div className="flex items-center justify-between mb-3">
          <div>
            <h3 className="font-extrabold text-xs sm:text-sm flex items-center gap-1.5">
              <TrendingUp className="w-4 h-4 text-amber-400" />
              Gráfico Temporal: Esfuerzo Real vs. Límite Humano Seguro (8h)
            </h3>
            <p className={`text-[11px] ${theme.mutedTextClass}`}>
              Comparación diaria de horas de ingeniería de Junior Alexis Villanueva Rosario
            </p>
          </div>
          <div className="flex items-center gap-2 text-[10px] font-mono shrink-0">
            <span className="flex items-center gap-1">
              <span className="w-2.5 h-2.5 rounded bg-amber-400 inline-block" /> Real
            </span>
            <span className="flex items-center gap-1">
              <span className="w-2.5 h-1 rounded bg-rose-500 inline-block" /> Límite 8h
            </span>
          </div>
        </div>

        {/* Visual Bar Chart */}
        <div className="space-y-2 mt-2">
          {FTE_DAILY_HOURS.map((item, idx) => {
            const isSelected = selectedDayIndex === idx;
            const maxScale = 22; // max hours on bar
            const percentReal = (item.humanHours / maxScale) * 100;
            const percentSafe = (item.safeLimit / maxScale) * 100;

            return (
              <button
                key={idx}
                onClick={() => setSelectedDayIndex(idx)}
                className={`w-full text-left p-2 rounded-xl transition-all border ${
                  isSelected
                    ? 'border-amber-400 bg-amber-400/10 shadow-sm'
                    : 'border-white/5 bg-black/20 hover:border-white/15'
                }`}
              >
                <div className="flex items-center justify-between text-xs mb-1">
                  <span className="font-bold font-mono text-[11px]">{item.day}</span>
                  <div className="flex items-center gap-2 font-mono text-[11px]">
                    <span className="text-amber-400 font-bold">{item.humanHours}h</span>
                    <span className="text-emerald-400 text-[10px]">({item.fteEquiv}x FTE)</span>
                  </div>
                </div>

                {/* Progress bar container */}
                <div className="relative w-full h-3 bg-black/50 rounded-full overflow-hidden border border-white/10">
                  {/* Real hours bar */}
                  <div 
                    className="h-full bg-gradient-to-r from-amber-500 to-amber-300 rounded-full transition-all duration-300"
                    style={{ width: `${percentReal}%` }}
                  />
                  {/* Safe limit mark line (8h) */}
                  <div 
                    className="absolute top-0 bottom-0 w-0.5 bg-rose-500 z-10 shadow-[0_0_4px_#F43F5E]"
                    style={{ left: `${percentSafe}%` }}
                    title="Límite Humano Seguro: 8h"
                  />
                </div>
              </button>
            );
          })}
        </div>

        {/* Detalle del Día Seleccionado */}
        {selectedDay && (
          <div className="mt-3 p-3 rounded-xl bg-black/30 border border-white/10 text-xs animate-fadeIn">
            <div className="flex items-center justify-between mb-1">
              <span className="font-bold text-amber-300">{selectedDay.day} · Bitácora Operativa:</span>
              <span className="font-mono text-[10px] text-emerald-400 font-bold">{selectedDay.fteEquiv}x Multiplicador</span>
            </div>
            <p className="opacity-80 text-[11px] leading-relaxed">
              {selectedDay.tasks}
            </p>
          </div>
        )}
      </div>

      {/* Auditoría de Contribución y Desglose de Paquetes de Trabajo */}
      <div className={`p-4 rounded-2xl border ${theme.cardBgClass} ${theme.borderClass}`}>
        <h3 className="font-extrabold text-xs uppercase tracking-wider mb-2 text-sky-400 flex items-center gap-1.5">
          <Award className="w-4 h-4" />
          Desglose de Ingeniería & Aporte Técnico
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
          <div className="p-2.5 rounded-xl bg-black/25 border border-white/5">
            <span className="font-bold text-white block">IEEE-57 Power Flow & Contingencias</span>
            <span className="text-[11px] opacity-75 mt-0.5 block">
              69/86 contingencias N-0/N-1 verificadas en 44.8s. Resuelve flujo de potencia con Newton-Raphson.
            </span>
            <span className="font-mono text-[10px] text-emerald-400 mt-1 block">42.5 h netas invertidas</span>
          </div>

          <div className="p-2.5 rounded-xl bg-black/25 border border-white/5">
            <span className="font-bold text-white block">Macro-Sandbox v2.7.5 & SHA-512</span>
            <span className="text-[11px] opacity-75 mt-0.5 block">
              Ensamblado de 45 artefactos inmutables en 59 MiB. Cero dependencias externas no auditadas.
            </span>
            <span className="font-mono text-[10px] text-sky-400 mt-1 block">38.0 h netas invertidas</span>
          </div>

          <div className="p-2.5 rounded-xl bg-black/25 border border-white/5">
            <span className="font-bold text-white block">Orquestación de Enjambre (GLM, Luna, Mimo, Bepo)</span>
            <span className="text-[11px] opacity-75 mt-0.5 block">
              Canal de telemetría mTLS, sincronización de compuertas G0-G7 y cola de procesos OpenCluster.
            </span>
            <span className="font-mono text-[10px] text-indigo-400 mt-1 block">34.5 h netas invertidas</span>
          </div>

          <div className="p-2.5 rounded-xl bg-black/25 border border-white/5">
            <span className="font-bold text-white block">Suite Notarial de 20 Temas & Móvil Hub</span>
            <span className="text-[11px] opacity-75 mt-0.5 block">
              UI adaptada a AMOLED 120Hz para Realme P3, modo OLED puro, accesibilidad tipográfica y PDF.
            </span>
            <span className="font-mono text-[10px] text-amber-400 mt-1 block">26.0 h netas invertidas</span>
          </div>
        </div>
      </div>
    </div>
  );
};
