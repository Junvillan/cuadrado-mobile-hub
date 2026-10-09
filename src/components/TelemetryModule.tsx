import React, { useState, useEffect } from 'react';
import { ThemeConfig, AgentStatus, GateStatus, SystemTelemetry } from '../types';
import { INITIAL_AGENTS, INITIAL_GATES, INITIAL_TELEMETRY } from '../data/mockReports';
import { 
  Cpu, HardDrive, Wifi, Activity, CheckCircle2, 
  Clock, Zap, RefreshCw, ChevronDown, ChevronUp, Server, Shield
} from 'lucide-react';

interface TelemetryModuleProps {
  theme: ThemeConfig;
  onNavigateToReport?: (docId: string) => void;
}

export const TelemetryModule: React.FC<TelemetryModuleProps> = ({ theme, onNavigateToReport }) => {
  const [agents, setAgents] = useState<AgentStatus[]>(INITIAL_AGENTS);
  const [gates, setGates] = useState<GateStatus[]>(INITIAL_GATES);
  const [telemetry, setTelemetry] = useState<SystemTelemetry>(INITIAL_TELEMETRY);
  const [expandedAgentId, setExpandedAgentId] = useState<string | null>('glm');
  const [isLiveActive, setIsLiveActive] = useState<boolean>(true);

  // Live telemetry pulse simulation for realistic real-time telemetry
  useEffect(() => {
    if (!isLiveActive) return;

    const interval = setInterval(() => {
      setTelemetry((prev) => ({
        ...prev,
        hostCpuPercent: Math.min(85, Math.max(12, +(prev.hostCpuPercent + (Math.random() * 4 - 2)).toFixed(1))),
        hostRamMb: Math.min(11500, Math.max(3800, prev.hostRamMb + Math.floor(Math.random() * 30 - 15))),
        serverLatencyMs: Math.min(28, Math.max(8, +(prev.serverLatencyMs + (Math.random() * 1.5 - 0.75)).toFixed(1))),
        jitterMs: +(Math.random() * 1.5 + 0.8).toFixed(1),
        nvmeReadMbps: Math.min(350, Math.max(80, +(prev.nvmeReadMbps + (Math.random() * 20 - 10)).toFixed(1))),
      }));

      // Advance Bepo download progress slightly
      setAgents((prevAgents) =>
        prevAgents.map((ag) => {
          if (ag.id === 'bepo' && ag.progressPercent && ag.progressPercent < 99.8) {
            const nextProgress = +(ag.progressPercent + 0.05).toFixed(1);
            return {
              ...ag,
              progressPercent: nextProgress,
              metricHighlight: `${nextProgress}% Completado (PID 3193354)`,
            };
          }
          return ag;
        })
      );
    }, 2000);

    return () => clearInterval(interval);
  }, [isLiveActive]);

  const toggleAgent = (id: string) => {
    setExpandedAgentId(expandedAgentId === id ? null : id);
  };

  return (
    <div className="flex flex-col gap-3 pb-24 animate-fadeIn">
      {/* Banner de Acceso Directo a los Reportes Notariales */}
      {onNavigateToReport && (
        <div className="p-3 rounded-2xl bg-gradient-to-r from-amber-950/40 via-black/40 to-amber-950/40 border border-amber-600/50 flex items-center justify-between gap-2 shadow-lg">
          <div className="flex items-center gap-2 min-w-0">
            <span className="text-xl">📜</span>
            <div className="min-w-0">
              <span className="font-extrabold text-xs text-amber-300 block truncate">
                Lector de Reportes Notariales
              </span>
              <span className="text-[10px] opacity-75 truncate block">
                Actas oficiales, 20 temas dinámicos y envío a Kindle
              </span>
            </div>
          </div>
          <button
            onClick={() => onNavigateToReport('parte-situacion')}
            className="px-3 py-1.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-black font-extrabold text-xs shadow-md transition-all shrink-0 active:scale-95"
          >
            Abrir Reporte
          </button>
        </div>
      )}

      {/* Panel Superior: Monitor de Recursos del Host & Dispositivo */}
      <div className={`p-3 rounded-2xl border ${theme.cardBgClass} ${theme.borderClass}`}>
        <div className="flex items-center justify-between mb-2.5">
          <div className="flex items-center gap-2">
            <span className="p-1 rounded-md bg-emerald-500/20 text-emerald-400">
              <Server className="w-4 h-4" />
            </span>
            <span className="font-extrabold text-xs tracking-tight">
              Recursos de Infraestructura & Nodo :5678
            </span>
          </div>

          <div className="flex items-center gap-1.5">
            <button
              onClick={() => setIsLiveActive(!isLiveActive)}
              className={`px-2 py-0.5 rounded-full text-[10px] font-mono flex items-center gap-1 transition-colors ${
                isLiveActive 
                  ? 'bg-emerald-950 text-emerald-300 border border-emerald-800' 
                  : 'bg-zinc-800 text-zinc-400 border border-zinc-700'
              }`}
            >
              <span className={`w-1.5 h-1.5 rounded-full ${isLiveActive ? 'bg-emerald-400 animate-ping' : 'bg-zinc-500'}`} />
              {isLiveActive ? 'EN VIVO 120Hz' : 'PAUSADO'}
            </button>
          </div>
        </div>

        {/* 4 KPIs de hardware */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs">
          {/* CPU */}
          <div className="p-2 rounded-xl bg-black/30 border border-white/5 flex flex-col justify-between">
            <div className="flex items-center justify-between text-[10px] opacity-70">
              <span className="flex items-center gap-1">
                <Cpu className="w-3 h-3 text-sky-400" /> Host CPU
              </span>
              <span className="font-mono">{telemetry.hostCpuPercent}%</span>
            </div>
            <div className="w-full bg-white/10 h-1 rounded-full mt-2 overflow-hidden">
              <div 
                className="h-full bg-sky-400 rounded-full transition-all duration-500"
                style={{ width: `${telemetry.hostCpuPercent}%` }}
              />
            </div>
            <span className="text-[9px] opacity-50 mt-1 font-mono">8 Cores Círculo</span>
          </div>

          {/* NVMe */}
          <div className="p-2 rounded-xl bg-black/30 border border-white/5 flex flex-col justify-between">
            <div className="flex items-center justify-between text-[10px] opacity-70">
              <span className="flex items-center gap-1">
                <HardDrive className="w-3 h-3 text-purple-400" /> NVMe I/O
              </span>
              <span className="font-mono">{telemetry.nvmeReadMbps} MB/s</span>
            </div>
            <div className="w-full bg-white/10 h-1 rounded-full mt-2 overflow-hidden">
              <div 
                className="h-full bg-purple-400 rounded-full transition-all duration-500"
                style={{ width: `${Math.min(100, (telemetry.nvmeReadMbps / 400) * 100)}%` }}
              />
            </div>
            <span className="text-[9px] opacity-50 mt-1 font-mono">Lectura continua</span>
          </div>

          {/* RAM */}
          <div className="p-2 rounded-xl bg-black/30 border border-white/5 flex flex-col justify-between">
            <div className="flex items-center justify-between text-[10px] opacity-70">
              <span className="flex items-center gap-1">
                <Activity className="w-3 h-3 text-emerald-400" /> Realme P3 RAM
              </span>
              <span className="font-mono">{(telemetry.hostRamMb / 1024).toFixed(1)}/12 GB</span>
            </div>
            <div className="w-full bg-white/10 h-1 rounded-full mt-2 overflow-hidden">
              <div 
                className="h-full bg-emerald-400 rounded-full transition-all duration-500"
                style={{ width: `${(telemetry.hostRamMb / telemetry.hostRamTotalMb) * 100}%` }}
              />
            </div>
            <span className="text-[9px] opacity-50 mt-1 font-mono">AMOLED Activo</span>
          </div>

          {/* Red Latencia */}
          <div className="p-2 rounded-xl bg-black/30 border border-white/5 flex flex-col justify-between">
            <div className="flex items-center justify-between text-[10px] opacity-70">
              <span className="flex items-center gap-1">
                <Wifi className="w-3 h-3 text-amber-400" /> Puerto 5678
              </span>
              <span className="font-mono text-emerald-400 font-bold">{telemetry.serverLatencyMs} ms</span>
            </div>
            <div className="w-full bg-white/10 h-1 rounded-full mt-2 overflow-hidden">
              <div 
                className="h-full bg-emerald-400 rounded-full transition-all duration-500"
                style={{ width: '92%' }}
              />
            </div>
            <span className="text-[9px] opacity-50 mt-1 font-mono">Jitter: ±{telemetry.jitterMs}ms</span>
          </div>
        </div>
      </div>

      {/* Tacómetro de Gates G0 - G7 */}
      <div className={`p-3 rounded-2xl border ${theme.cardBgClass} ${theme.borderClass}`}>
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2">
            <span className="p-1 rounded-md bg-sky-500/20 text-sky-400">
              <Shield className="w-4 h-4" />
            </span>
            <span className="font-extrabold text-xs tracking-tight">
              Tacómetro de Gates G0 - G7 (Compuertas Notariales)
            </span>
          </div>
          <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-emerald-950 text-emerald-300 border border-emerald-800 font-bold">
            8/8 PASS
          </span>
        </div>

        {/* Matriz 8 Gates con Luces Verdes Pulsantes */}
        <div className="grid grid-cols-4 sm:grid-cols-8 gap-1.5 mt-2">
          {gates.map((g) => (
            <div
              key={g.id}
              className="p-1.5 rounded-xl bg-black/30 border border-emerald-900/60 flex flex-col items-center justify-center text-center relative group hover:border-emerald-500 transition-colors"
              title={`${g.name}: ${g.description}`}
            >
              {/* LED Verde Pulsante */}
              <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 shadow-[0_0_8px_#10B981] animate-pulse mb-1" />
              <span className="font-mono font-bold text-[10px] text-white">{g.id}</span>
              <span className="text-[9px] font-mono text-emerald-400">{g.latencyMs}ms</span>
            </div>
          ))}
        </div>
        <p className="text-[10px] opacity-60 mt-2 font-mono text-center">
          ✓ Todas las compuertas cumplen estricto handshake criptográfico y vectorización IEEE-57.
        </p>
      </div>

      {/* Enjambre de Agentes: Tarjetas de Estado en Vivo */}
      <div>
        <div className="flex items-center justify-between px-1 mb-2">
          <span className="text-[11px] font-bold uppercase tracking-wider opacity-70">
            Enjambre Activo de Agentes SENI-IA
          </span>
          <span className="text-[10px] font-mono opacity-60">
            4 Nodos Coordinados
          </span>
        </div>

        <div className="flex flex-col gap-2">
          {agents.map((agent) => {
            const isExpanded = expandedAgentId === agent.id;
            return (
              <div
                key={agent.id}
                className={`rounded-2xl border transition-all overflow-hidden ${theme.cardBgClass} ${theme.borderClass}`}
              >
                {/* Header Tarjeta */}
                <button
                  onClick={() => toggleAgent(agent.id)}
                  className="w-full p-3 flex items-center justify-between text-left hover:bg-white/5 transition-colors"
                >
                  <div className="flex items-center gap-2.5 min-w-0">
                    <div 
                      className={`w-9 h-9 rounded-xl flex items-center justify-center font-bold font-mono text-xs shadow-md shrink-0 ${
                        agent.id === 'glm' ? 'bg-emerald-950 text-emerald-300 border border-emerald-700' :
                        agent.id === 'luna' ? 'bg-sky-950 text-sky-300 border border-sky-700' :
                        agent.id === 'mimo' ? 'bg-amber-950 text-amber-300 border border-amber-700' :
                        'bg-indigo-950 text-indigo-300 border border-indigo-700'
                      }`}
                    >
                      {agent.id.toUpperCase().slice(0, 3)}
                    </div>

                    <div className="min-w-0">
                      <div className="flex items-center gap-1.5 flex-wrap">
                        <span className="font-extrabold text-xs text-white truncate">{agent.name}</span>
                        <span className="text-[10px] font-mono opacity-60 bg-black/30 px-1 py-0.2 rounded border border-white/5">
                          {agent.version}
                        </span>
                      </div>
                      <p className="text-[11px] opacity-75 truncate mt-0.5">{agent.role}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    <div className="text-right">
                      <span 
                        className={`text-[10px] font-mono px-2 py-0.5 rounded-full font-bold border block ${
                          agent.status === 'PASS' || agent.status === 'ONLINE'
                            ? 'bg-emerald-950 text-emerald-300 border-emerald-800'
                            : agent.status === 'ACTIVE'
                            ? 'bg-amber-950 text-amber-300 border-amber-800'
                            : 'bg-indigo-950 text-indigo-300 border-indigo-800'
                        }`}
                      >
                        {agent.status}
                      </span>
                      <span className="text-[9px] font-mono opacity-50 block mt-0.5">{agent.lastUpdate}</span>
                    </div>
                    {isExpanded ? <ChevronUp className="w-4 h-4 opacity-60" /> : <ChevronDown className="w-4 h-4 opacity-60" />}
                  </div>
                </button>

                {/* Metric Highlight Bar */}
                <div className="px-3 py-1.5 bg-black/20 border-t border-b border-white/5 flex items-center justify-between text-xs font-mono">
                  <span className="opacity-70 text-[10px]">Métrica Clave:</span>
                  <span className="font-bold text-sky-300 text-[11px]">{agent.metricHighlight}</span>
                </div>

                {/* Barra de progreso si aplica (Bepo) */}
                {agent.progressPercent !== undefined && (
                  <div className="px-3 pt-2">
                    <div className="flex justify-between text-[10px] font-mono mb-1">
                      <span className="opacity-70">Progreso Descarga OC:</span>
                      <span className="font-bold text-indigo-300">{agent.progressPercent}%</span>
                    </div>
                    <div className="w-full bg-white/10 h-1.5 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-indigo-400 rounded-full transition-all duration-300"
                        style={{ width: `${agent.progressPercent}%` }}
                      />
                    </div>
                  </div>
                )}

                {/* Detalles desplegables */}
                {isExpanded && (
                  <div className="p-3 bg-black/30 border-t border-white/5 space-y-1.5 animate-fadeIn text-xs">
                    <span className="text-[10px] font-bold uppercase tracking-wider opacity-60 block">
                      Registros de Ejecución:
                    </span>
                    {agent.details.map((detail, idx) => (
                      <div key={idx} className="flex items-start gap-2 text-[11px] opacity-90 leading-relaxed">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                        <span>{detail}</span>
                      </div>
                    ))}
                    {agent.pid && (
                      <div className="mt-2 pt-2 border-t border-white/10 flex justify-between text-[10px] font-mono opacity-70">
                        <span>Proceso Host PID: {agent.pid}</span>
                        <span>Prioridad RT / Nice -10</span>
                      </div>
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
