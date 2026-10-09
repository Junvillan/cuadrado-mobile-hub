import { DocumentMeta, AgentStatus, GateStatus, SystemTelemetry } from '../types';

export const DOCUMENTS: DocumentMeta[] = [
  {
    id: 'reportes-maestro',
    title: 'Portal Maestro de Reportes',
    subtitle: 'Actas Notariales y Telemetría del Círculo (Suite 20 Temas)',
    endpointUrl: 'http://192.168.1.136:5678/reportes_circulo/index.html',
    badge: '20 Temas',
    icon: '📜',
    cachedTimestamp: '2026-10-09 13:45:12 CEST',
    hashSha512: 'e4d8a1c90f23b7e61899ad5f2b8429107ccfa10863bd112e45da7721be0932af',
  },
  {
    id: 'informe-laboral',
    title: 'Auditoría Laboral y FTE',
    subtitle: 'Informe de Carga Cognitiva y Multiplicador 7.5x - 8.0x',
    endpointUrl: 'http://192.168.1.136:5678/informe_laboral_circulo.html',
    badge: '141h Netas',
    icon: '⏱️',
    cachedTimestamp: '2026-10-09 12:00:00 CEST',
    hashSha512: 'bc52981fae61910ad542ccba33948e9d0124719280efea5461129ccbb71a6291',
  },
  {
    id: 'parte-situacion',
    title: 'Parte de Situación Operativa',
    subtitle: 'Estado en Vivo del Macro-Sandbox y Enjambre SENI-IA',
    endpointUrl: 'http://192.168.1.136:5678/dashboard/REPORTE_SITUACION_CIRCULO_20261009_1345.html',
    badge: 'LIVE 13:45',
    icon: '🛡️',
    cachedTimestamp: '2026-10-09 13:45:00 CEST',
    hashSha512: '72ca169eb9c51ff821735cb293a7d41f53d526715201a4db52f08a1c02e5f3aa',
  },
];

export const INITIAL_AGENTS: AgentStatus[] = [
  {
    id: 'glm',
    name: 'GLM 5.3',
    version: 'v5.3-turbo',
    role: 'Diagnóstico Eléctrico IEEE-57 N-0/N-1',
    status: 'PASS',
    metricHighlight: '80.2% Aprobadas (69/86 en 44.8s)',
    details: [
      'Topología IEEE 57-Bus: 80.2% contingencias verificadas',
      'Velocidad de cómputo: 69/86 casos resueltos en 44.8 segundos',
      'Cumplimiento de compuertas: 8/8 Gates PASS (G0-G7)',
      'Algoritmo Newton-Raphson vectorizado sin divergencias',
    ],
    lastUpdate: 'Hace 4s',
    badgeColor: 'emerald',
  },
  {
    id: 'luna',
    name: 'Luna Codex',
    version: 'v2.7.5',
    role: 'Macro-Sandbox y Ensamblado de Artefactos',
    status: 'ONLINE',
    metricHighlight: '45/45 SHA-512 PASS (59 MiB ensamblado)',
    details: [
      'Macro-Sandbox v2.7.5 compilado con empaquetado hermético',
      'Verificación criptográfica: 45 de 45 artefactos con hash SHA-512 idéntico',
      'Volumen de artefactos: 59.2 MiB sin dependencias huérfanas',
      'Inmutabilidad del árbol de fuentes garantizada',
    ],
    lastUpdate: 'Hace 12s',
    badgeColor: 'sky',
  },
  {
    id: 'mimo',
    name: 'm3.1-Mimo',
    version: 'v3.1-rc2',
    role: 'Distribución MV y Spinoff LSD (Lengua de Señas)',
    status: 'ACTIVE',
    metricHighlight: '64/65 Tests PASS (98.4%)',
    details: [
      'Suite de validación MV: 64/65 pruebas unitarias exitosas',
      'Spinoff LSD: Reducción de latencia a 18ms en reconocimiento gestual',
      'Matriz de compatibilidad léxica validada',
      '1 prueba pendiente en calibración cinemática de baja luminosidad',
    ],
    lastUpdate: 'Hace 8s',
    badgeColor: 'amber',
  },
  {
    id: 'bepo',
    name: 'Bepo',
    version: 'v1.4.1',
    role: 'Descarga y Sincronización OC',
    status: 'PROCESSING',
    metricHighlight: '86.4% Completado (PID 3193354)',
    details: [
      'Descarga de artefactos OpenCluster en curso',
      'Progreso actual: 86.4% (ETA estimado ~21:45 CEST)',
      'PID en host: 3193354 (Consumo 1.4 GiB RAM, 14.2 MiB/s I/O)',
      'Comprobación de paridad de bloques en segundo plano activa',
    ],
    progressPercent: 86.4,
    pid: 3193354,
    lastUpdate: 'En vivo',
    badgeColor: 'indigo',
  },
];

export const INITIAL_GATES: GateStatus[] = [
  { id: 'G0', name: 'G0 · Handshake Criptográfico', status: 'PASS', latencyMs: 1.2, description: 'Certificado de Círculo y canal TLS mTLS mutuo verificado' },
  { id: 'G1', name: 'G1 · Integridad de Artefactos', status: 'PASS', latencyMs: 4.8, description: '45/45 SHA-512 hashes concordantes en Macro-Sandbox' },
  { id: 'G2', name: 'G2 · IEEE-57 Flujo de Potencia', status: 'PASS', latencyMs: 44.8, description: '69/86 contingencias N-0 y N-1 dentro de límites de tensión' },
  { id: 'G3', name: 'G3 · Verificación Multiverso MV', status: 'PASS', latencyMs: 12.3, description: '64/65 suites de comportamiento unitario superadas' },
  { id: 'G4', name: 'G4 · Inyección de Seguridad SENI', status: 'PASS', latencyMs: 3.1, description: 'Cero vectores de inyección en AST y memoria estricta' },
  { id: 'G5', name: 'G5 · Latencia de Bus Táctil', status: 'PASS', latencyMs: 0.8, description: 'Render a 120Hz para pantalla AMOLED Realme P3' },
  { id: 'G6', name: 'G6 · Respaldo en Red Privada', status: 'PASS', latencyMs: 2.4, description: 'Sincronización al puerto 5678 del nodo maestro' },
  { id: 'G7', name: 'G7 · Sellado Notarial Soberano', status: 'PASS', latencyMs: 5.6, description: 'Estampa cronológica inmutable registrada en informe final' },
];

export const INITIAL_TELEMETRY: SystemTelemetry = {
  hostCpuPercent: 24.8,
  hostRamMb: 4120,
  hostRamTotalMb: 12288,
  nvmeReadMbps: 182.4,
  nvmeWriteMbps: 64.1,
  serverLatencyMs: 14.2,
  jitterMs: 1.8,
  port5678Status: 'ONLINE',
  realmeRefreshRateHz: 120,
};

export const FTE_DAILY_HOURS = [
  { day: 'Día 1 (02 Oct)', humanHours: 16.5, safeLimit: 8, fteEquiv: 7.2, tasks: 'Arquitectura inicial, diseño G0-G3, setup IEEE-57' },
  { day: 'Día 2 (03 Oct)', humanHours: 18.0, safeLimit: 8, fteEquiv: 7.8, tasks: 'Macro-Sandbox v2.7.5, compilación hermética SHA-512' },
  { day: 'Día 3 (04 Oct)', humanHours: 19.5, safeLimit: 8, fteEquiv: 8.4, tasks: 'Pruebas intensivas de flujo de carga y contingencias N-1' },
  { day: 'Día 4 (05 Oct)', humanHours: 17.0, safeLimit: 8, fteEquiv: 7.4, tasks: 'Spinoff LSD de gestos y suite MV en m3.1-Mimo' },
  { day: 'Día 5 (06 Oct)', humanHours: 18.5, safeLimit: 8, fteEquiv: 8.0, tasks: 'Pipeline de descarga OpenCluster Bepo (PID 3193354)' },
  { day: 'Día 6 (07 Oct)', humanHours: 17.5, safeLimit: 8, fteEquiv: 7.6, tasks: 'Generación y sellado de actas notariales de 20 temas' },
  { day: 'Día 7 (08 Oct)', humanHours: 18.0, safeLimit: 8, fteEquiv: 7.8, tasks: 'Cuadrado Mobile Hub, optimización Realme P3 120Hz' },
  { day: 'Día 8 (09 Oct)', humanHours: 16.0, safeLimit: 8, fteEquiv: 7.0, tasks: 'Consolidación de auditoría, parte de situación 13:45' },
];
