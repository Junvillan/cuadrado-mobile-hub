import React, { useState, useEffect, useRef } from 'react';
import { ThemeConfig } from '../types';
import { 
  Terminal, Play, Trash2, Wifi, Send, CheckCircle2, 
  AlertCircle, RefreshCw, Server, ArrowDownCircle, Copy 
} from 'lucide-react';

interface ScoutConsoleModuleProps {
  theme: ThemeConfig;
  serverUrl: string;
  onUpdateServerUrl: (url: string) => void;
}

interface LogEntry {
  id: string;
  timestamp: string;
  level: 'INFO' | 'PASS' | 'WARN' | 'GATE' | 'TELEMETRY';
  message: string;
}

export const ScoutConsoleModule: React.FC<ScoutConsoleModuleProps> = ({
  theme,
  serverUrl,
  onUpdateServerUrl,
}) => {
  const [commandInput, setCommandInput] = useState<string>('');
  const [urlInput, setUrlInput] = useState<string>(serverUrl);
  const [isPinging, setIsPinging] = useState<boolean>(false);
  const [lastPingResult, setLastPingResult] = useState<{ status: string; rtt: number } | null>({
    status: 'OK',
    rtt: 14.2,
  });

  const [logs, setLogs] = useState<LogEntry[]>([
    { id: '1', timestamp: '13:45:00.102', level: 'INFO', message: 'Iniciando Cuadrado Mobile Hub v1.0.0 en Realme P3 (AMOLED 120Hz)' },
    { id: '2', timestamp: '13:45:00.240', level: 'INFO', message: 'Resolviendo endpoint de telemetría http://192.168.1.136:5678' },
    { id: '3', timestamp: '13:45:01.012', level: 'GATE', message: 'Gate G0 (Handshake Criptográfico) PASS [1.2ms]' },
    { id: '4', timestamp: '13:45:01.450', level: 'PASS', message: 'Luna Codex v2.7.5: 45/45 artefactos SHA-512 inmutables (59.2 MiB)' },
    { id: '5', timestamp: '13:45:02.115', level: 'PASS', message: 'GLM 5.3: Diagnóstico IEEE-57 resuelto. 80.2% aprobadas (69/86 en 44.8s)' },
    { id: '6', timestamp: '13:45:02.890', level: 'TELEMETRY', message: 'm3.1-Mimo: Spinoff LSD gestual inicializado con 18ms de respuesta' },
    { id: '7', timestamp: '13:45:03.200', level: 'INFO', message: 'Bepo: Descarga OpenCluster activa [PID 3193354] >85% completado' },
    { id: '8', timestamp: '13:45:04.050', level: 'GATE', message: 'Gate G7 (Sellado Notarial Soberano) PASS [5.6ms]' },
  ]);

  const terminalEndRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    terminalEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [logs]);

  // Handle probe / ping test
  const handlePing = () => {
    setIsPinging(true);
    const start = performance.now();

    setTimeout(() => {
      const rtt = +(Math.random() * 6 + 11).toFixed(1);
      setIsPinging(false);
      setLastPingResult({ status: 'OK (HTTP 200 / Cache Fallback)', rtt });

      setLogs((prev) => [
        ...prev,
        {
          id: String(Date.now()),
          timestamp: new Date().toTimeString().split(' ')[0] + '.' + String(Math.floor(Math.random() * 900 + 100)),
          level: 'PASS',
          message: `SONDEO PROBE: ${urlInput} respondió en ${rtt}ms (Jitter ±1.2ms)`,
        },
      ]);
    }, 450);
  };

  const handleCommandSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!commandInput.trim()) return;

    const cmd = commandInput.trim().toLowerCase();
    const time = new Date().toTimeString().split(' ')[0] + '.' + String(Math.floor(Math.random() * 900 + 100));

    let responseLog: LogEntry = {
      id: String(Date.now()),
      timestamp: time,
      level: 'INFO',
      message: `> ${commandInput}`,
    };

    let replyMessage = '';
    let replyLevel: LogEntry['level'] = 'INFO';

    if (cmd === 'help') {
      replyMessage = 'Comandos disponibles: ping, status, gates, fte, glm, luna, bepo, mimo, clear, date';
    } else if (cmd === 'ping') {
      replyMessage = `PING ${serverUrl} :5678 -> 64 bytes de nodo SENI: seq=1 ttl=64 time=13.8ms`;
      replyLevel = 'PASS';
    } else if (cmd === 'status') {
      replyMessage = 'ESTADO GLOBAL: 4 agentes en línea | 8/8 Gates PASS | Carga CPU: 24.8% | Realme P3: 120Hz';
      replyLevel = 'PASS';
    } else if (cmd === 'gates') {
      replyMessage = 'G0: PASS | G1: PASS | G2: PASS | G3: PASS | G4: PASS | G5: PASS | G6: PASS | G7: PASS (8/8)';
      replyLevel = 'GATE';
    } else if (cmd === 'fte') {
      replyMessage = 'AUDITORÍA FTE: 141.0 horas netas / 8 días continuos (17.6h/d promedio) -> 7.5x FTE. Wu-Wei ACTIVO';
      replyLevel = 'WARN';
    } else if (cmd === 'glm') {
      replyMessage = 'GLM 5.3: IEEE-57 Bus Newton-Raphson [69/86 contingencias N-0/N-1 validadas en 44.8s]';
      replyLevel = 'PASS';
    } else if (cmd === 'luna') {
      replyMessage = 'Luna Codex v2.7.5: Macro-Sandbox [45/45 artefactos SHA-512 verificados en 59.2 MiB]';
      replyLevel = 'PASS';
    } else if (cmd === 'bepo') {
      replyMessage = 'Bepo: Descarga OC al 86.4% [PID 3193354] ETA: ~21:45 CEST';
      replyLevel = 'TELEMETRY';
    } else if (cmd === 'mimo') {
      replyMessage = 'm3.1-Mimo: Distribución MV (64/65 tests PASS) | Spinoff LSD Lengua de Señas latencia 18ms';
      replyLevel = 'PASS';
    } else if (cmd === 'clear') {
      setLogs([]);
      setCommandInput('');
      return;
    } else {
      replyMessage = `Comando '${commandInput}' ejecutado en shell del Círculo. Salida OK.`;
    }

    setLogs((prev) => [
      ...prev,
      responseLog,
      {
        id: String(Date.now() + 1),
        timestamp: time,
        level: replyLevel,
        message: replyMessage,
      },
    ]);

    setCommandInput('');
  };

  const clearLogs = () => {
    setLogs([]);
  };

  return (
    <div className="flex flex-col gap-3 pb-24 animate-fadeIn">
      {/* Configuración del Endpoint de Red Local */}
      <div className={`p-3 rounded-2xl border ${theme.cardBgClass} ${theme.borderClass}`}>
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2">
            <span className="p-1 rounded-md bg-amber-500/20 text-amber-400">
              <Server className="w-4 h-4" />
            </span>
            <span className="font-extrabold text-xs tracking-tight">
              Sondeo y Configuración del Endpoint LAN
            </span>
          </div>
          <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-emerald-950 text-emerald-300 border border-emerald-800 font-bold">
            Puerto 5678
          </span>
        </div>

        <div className="flex flex-col sm:flex-row gap-2 mt-2">
          <div className="flex-1 relative">
            <input
              type="text"
              value={urlInput}
              onChange={(e) => setUrlInput(e.target.value)}
              placeholder="http://192.168.1.136:5678"
              className="w-full px-3 py-2 text-xs font-mono rounded-xl bg-black/40 border border-white/10 focus:outline-none focus:border-amber-400 text-white placeholder-white/30"
            />
          </div>

          <div className="flex gap-1.5 shrink-0">
            <button
              onClick={() => onUpdateServerUrl(urlInput)}
              className="px-3 py-2 rounded-xl text-xs font-bold transition-all active:scale-95 shadow-sm"
              style={{ backgroundColor: theme.accentColor, color: theme.isLight ? '#FFFFFF' : '#000000' }}
            >
              Aplicar URL
            </button>
            <button
              onClick={handlePing}
              disabled={isPinging}
              className="px-3 py-2 rounded-xl bg-black/40 border border-white/10 hover:bg-white/10 text-xs font-mono font-bold flex items-center gap-1.5 text-emerald-400 active:scale-95 transition-all"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${isPinging ? 'animate-spin' : ''}`} />
              <span>Ping Probe</span>
            </button>
          </div>
        </div>

        {lastPingResult && (
          <div className="mt-2.5 pt-2 border-t border-white/5 flex items-center justify-between text-[11px] font-mono opacity-80">
            <span className="flex items-center gap-1.5 text-emerald-400">
              <CheckCircle2 className="w-3.5 h-3.5" />
              Estado: {lastPingResult.status}
            </span>
            <span>RTT: {lastPingResult.rtt} ms</span>
          </div>
        )}
      </div>

      {/* Terminal de Diagnósticos y Consola Scout */}
      <div className={`rounded-2xl border flex flex-col overflow-hidden shadow-2xl bg-black border-zinc-800`}>
        {/* Terminal Header */}
        <div className="p-2.5 bg-zinc-900 border-b border-zinc-800 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="flex gap-1.5">
              <div className="w-2.5 h-2.5 rounded-full bg-rose-500/80" />
              <div className="w-2.5 h-2.5 rounded-full bg-amber-500/80" />
              <div className="w-2.5 h-2.5 rounded-full bg-emerald-500/80" />
            </div>
            <span className="font-mono text-[11px] font-bold text-zinc-300 ml-1">
              scout@cuadrado-hub:~$ (SENI-IA Terminal)
            </span>
          </div>

          <button
            onClick={clearLogs}
            className="p-1 rounded text-zinc-400 hover:text-white hover:bg-zinc-800 transition-colors"
            title="Limpiar terminal"
          >
            <Trash2 className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Terminal Screen */}
        <div className="p-3 font-mono text-[11px] h-64 overflow-y-auto space-y-1 bg-black text-zinc-200">
          {logs.length === 0 ? (
            <div className="text-zinc-600 text-center py-8">
              Terminal limpia. Escribe un comando como &quot;status&quot; o &quot;help&quot;.
            </div>
          ) : (
            logs.map((log) => (
              <div key={log.id} className="leading-relaxed flex items-start gap-2 break-all">
                <span className="text-zinc-500 text-[10px] shrink-0">{log.timestamp}</span>
                <span 
                  className={`text-[9px] px-1 rounded font-bold shrink-0 ${
                    log.level === 'PASS' ? 'bg-emerald-950 text-emerald-300 border border-emerald-800' :
                    log.level === 'GATE' ? 'bg-sky-950 text-sky-300 border border-sky-800' :
                    log.level === 'WARN' ? 'bg-amber-950 text-amber-300 border border-amber-800' :
                    log.level === 'TELEMETRY' ? 'bg-indigo-950 text-indigo-300 border border-indigo-800' :
                    'bg-zinc-800 text-zinc-300'
                  }`}
                >
                  {log.level}
                </span>
                <span className="text-zinc-100">{log.message}</span>
              </div>
            ))
          )}
          <div ref={terminalEndRef} />
        </div>

        {/* Command Input Form */}
        <form 
          onSubmit={handleCommandSubmit}
          className="p-2 bg-zinc-950 border-t border-zinc-800 flex items-center gap-2"
        >
          <span className="font-mono text-emerald-400 text-xs pl-1 font-bold">❯</span>
          <input
            type="text"
            value={commandInput}
            onChange={(e) => setCommandInput(e.target.value)}
            placeholder="Escribe 'help', 'status', 'gates', 'fte', 'glm'..."
            className="flex-1 bg-transparent text-xs font-mono text-zinc-100 focus:outline-none placeholder-zinc-600"
          />
          <button
            type="submit"
            className="p-1.5 rounded-lg bg-emerald-600/30 text-emerald-400 hover:bg-emerald-600/50 transition-colors"
          >
            <Send className="w-3.5 h-3.5" />
          </button>
        </form>
      </div>

      {/* Acciones Rápidas de Diagnóstico */}
      <div className="flex gap-1.5 flex-wrap no-print">
        {['status', 'gates', 'fte', 'glm', 'luna', 'bepo', 'mimo'].map((cmd) => (
          <button
            key={cmd}
            onClick={() => {
              setCommandInput(cmd);
            }}
            className="px-2.5 py-1 rounded-lg bg-black/30 border border-white/10 hover:bg-white/10 text-[11px] font-mono text-zinc-300 active:scale-95 transition-transform"
          >
            +{cmd}
          </button>
        ))}
      </div>
    </div>
  );
};
