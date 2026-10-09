export type TabId = 'reportes' | 'telemetria' | 'auditoria' | 'scout';

export interface ThemeConfig {
  id: string;
  name: string;
  category: 'AMOLED' | 'Académico' | 'Lectura' | 'Cyber' | 'Clásico';
  bgClass: string;
  cardBgClass: string;
  textClass: string;
  mutedTextClass: string;
  accentColor: string;
  accentTextClass: string;
  borderClass: string;
  navBgClass: string;
  headerBgClass: string;
  badgeBgClass: string;
  isOled?: boolean;
  isMatrix?: boolean;
  isLight?: boolean;
}

export interface AgentStatus {
  id: string;
  name: string;
  version: string;
  role: string;
  status: 'ONLINE' | 'ACTIVE' | 'PROCESSING' | 'PASS';
  metricHighlight: string;
  details: string[];
  lastUpdate: string;
  progressPercent?: number;
  pid?: number;
  badgeColor: string;
}

export interface GateStatus {
  id: string;
  name: string;
  status: 'PASS' | 'RUNNING' | 'PENDING';
  latencyMs: number;
  description: string;
}

export interface SystemTelemetry {
  hostCpuPercent: number;
  hostRamMb: number;
  hostRamTotalMb: number;
  nvmeReadMbps: number;
  nvmeWriteMbps: number;
  serverLatencyMs: number;
  jitterMs: number;
  port5678Status: 'ONLINE' | 'CONNECTING' | 'FALLBACK';
  realmeRefreshRateHz: number;
}

export interface DocumentMeta {
  id: string;
  title: string;
  subtitle: string;
  endpointUrl: string;
  badge: string;
  icon: string;
  cachedTimestamp: string;
  hashSha512: string;
}
