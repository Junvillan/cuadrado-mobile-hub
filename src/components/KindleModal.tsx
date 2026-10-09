import React, { useState, useEffect } from 'react';
import { DocumentMeta, ThemeConfig } from '../types';
import { 
  BookOpen, Share2, Globe, Mail, Download, X, 
  Check, Copy, ExternalLink, Smartphone, AlertCircle 
} from 'lucide-react';

interface KindleModalProps {
  document: DocumentMeta;
  theme: ThemeConfig;
  isOpen: boolean;
  onClose: () => void;
  documentHtmlContent: string;
}

export const KindleModal: React.FC<KindleModalProps> = ({
  document,
  theme,
  isOpen,
  onClose,
  documentHtmlContent,
}) => {
  const [kindleEmail, setKindleEmail] = useState<string>('');
  const [copiedLink, setCopiedLink] = useState<boolean>(false);
  const [shareSuccess, setShareSuccess] = useState<string | null>(null);

  useEffect(() => {
    const saved = localStorage.getItem('seni_kindle_email');
    if (saved) setKindleEmail(saved);
  }, []);

  if (!isOpen) return null;

  // 1. Web Share API para Android / iOS -> Abre la app Kindle instalada
  const handleShareApp = async () => {
    const shareData = {
      title: `${document.title} · Círculo Soberano SENI-IA`,
      text: `Documento Notarial: ${document.title} (${document.subtitle}). Certificado SHA-512: ${document.hashSha512.slice(0, 16)}.`,
      url: window.location.href,
    };

    if (navigator.share) {
      try {
        await navigator.share(shareData);
        setShareSuccess('Compartido con éxito a la app.');
        setTimeout(() => setShareSuccess(null), 3000);
      } catch (err) {
        // User cancelled or error
      }
    } else {
      // Fallback: Copy to clipboard
      navigator.clipboard.writeText(`${shareData.title}\n${shareData.text}\n${shareData.url}`);
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2500);
    }
  };

  // 2. Enviar vía Amazon Web Send to Kindle
  const handleAmazonWeb = () => {
    window.open('https://www.amazon.com/sendtokindle', '_blank', 'noopener,noreferrer');
  };

  // 3. Enviar por Email a @kindle.com
  const handleSendEmail = () => {
    if (kindleEmail.trim()) {
      localStorage.setItem('seni_kindle_email', kindleEmail.trim());
    }
    const targetEmail = kindleEmail.trim() || 'tu_dispositivo@kindle.com';
    const subject = encodeURIComponent('convert');
    const body = encodeURIComponent(
      `Documento del Círculo Soberano SENI-IA:\n\n${document.title}\n${document.subtitle}\n\nSellado Notarial: ${document.cachedTimestamp}\nHash SHA-512: ${document.hashSha512}\n\nVer documento interactivo en:\n${window.location.href}`
    );
    window.location.href = `mailto:${targetEmail}?subject=${subject}&body=${body}`;
  };

  // 4. Descargar versión para e-Reader (HTML semántico limpio optimizado para Kindle / Kobo / Boox)
  const handleDownloadEreader = () => {
    const cleanHtml = `<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="utf-8">
  <title>${document.title} - Círculo Soberano</title>
  <meta name="author" content="Junior Alexis Villanueva Rosario - Círculo Soberano SENI-IA">
  <style>
    body {
      font-family: Georgia, 'Times New Roman', serif;
      line-height: 1.6;
      max-width: 680px;
      margin: 0 auto;
      padding: 24px;
      color: #111;
      background: #fff;
    }
    h1 { font-size: 24px; border-bottom: 2px solid #222; padding-bottom: 8px; margin-top: 16px; }
    h2 { font-size: 19px; border-bottom: 1px solid #ccc; padding-bottom: 4px; margin-top: 24px; }
    h3 { font-size: 16px; margin-top: 18px; }
    p { margin: 12px 0; text-align: justify; }
    table { width: 100%; border-collapse: collapse; margin: 16px 0; font-size: 14px; }
    th, td { border: 1px solid #444; padding: 6px 10px; text-align: left; }
    th { background: #eee; font-weight: bold; }
    .kpi { border: 1px solid #666; padding: 10px; margin: 12px 0; font-weight: bold; }
    .meta { font-size: 12px; color: #555; font-family: sans-serif; margin-bottom: 20px; }
    .seal { border: 2px dashed #444; padding: 12px; margin-top: 30px; font-size: 13px; text-align: center; }
  </style>
</head>
<body>
  <div class="meta">
    <strong>CÍRCULO SOBERANO SENI-IA · NOTARÍA DIGITAL</strong><br>
    Fecha de Sellado: ${document.cachedTimestamp}<br>
    Hash SHA-512: ${document.hashSha512}<br>
    Dispositivo Autor: Realme P3 (AMOLED 120Hz)
  </div>
  <h1>${document.title}</h1>
  <p><em>${document.subtitle}</em></p>
  <hr/>
  ${documentHtmlContent}
  <div class="seal">
    <strong>CERTIFICACIÓN NOTARIAL DE COPIA ELECTRÓNICA PARA E-READER</strong><br>
    Doy fe de la concordancia íntegra del presente instrumento con el registro primario del Círculo Soberano.<br>
    Firma PGP: 4A89 F201 9B4C 3310 EA82 7701 B119 5CD3
  </div>
</body>
</html>`;

    const blob = new Blob([cleanHtml], { type: 'text/html;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = window.document.createElement('a');
    a.href = url;
    a.download = `${document.id}_kindle_ereader.html`;
    window.document.body.appendChild(a);
    a.click();
    window.document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-black/80 backdrop-blur-sm animate-fadeIn">
      <div 
        className={`w-full max-w-lg rounded-t-3xl sm:rounded-2xl flex flex-col shadow-2xl border ${theme.cardBgClass} ${theme.borderClass} ${theme.textClass} max-h-[90vh] overflow-y-auto`}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-white/10">
          <div className="flex items-center gap-2.5">
            <div 
              className="p-2.5 rounded-xl flex items-center justify-center shadow-md"
              style={{ backgroundColor: `${theme.accentColor}25`, color: theme.accentColor }}
            >
              <BookOpen className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-extrabold text-base leading-tight flex items-center gap-1.5">
                <span>Enviar a Kindle</span>
                <span className="text-[10px] px-1.5 py-0.2 rounded font-mono font-bold bg-amber-500/20 text-amber-300 border border-amber-500/40">
                  e-Reader Suite
                </span>
              </h3>
              <p className={`text-xs ${theme.mutedTextClass} truncate max-w-[280px]`}>
                {document.title}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-lg hover:bg-white/10 active:scale-95 transition-transform"
            aria-label="Cerrar modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Notificación temporal de éxito */}
        {shareSuccess && (
          <div className="mx-4 mt-3 p-2 rounded-xl bg-emerald-950/80 border border-emerald-700 text-emerald-300 text-xs flex items-center gap-2">
            <Check className="w-4 h-4 shrink-0" />
            <span>{shareSuccess}</span>
          </div>
        )}

        {/* 4 Opciones de Envío a Kindle */}
        <div className="p-4 space-y-3">
          {/* Opción 1: Compartir con App Kindle (Android / iOS) */}
          <div className="p-3.5 rounded-2xl bg-black/30 border border-white/10 hover:border-white/20 transition-all">
            <div className="flex items-start justify-between gap-3">
              <div className="flex items-start gap-2.5">
                <div className="p-2 rounded-xl bg-sky-950 text-sky-400 border border-sky-800/80 shrink-0">
                  <Smartphone className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="font-bold text-xs sm:text-sm text-white">
                    1. Compartir con App Kindle (Android / iOS)
                  </h4>
                  <p className="text-[11px] opacity-75 mt-0.5 leading-relaxed">
                    Abre el diálogo nativo del smartphone para compartir directamente con la app de Amazon Kindle instalada.
                  </p>
                </div>
              </div>
            </div>
            <button
              onClick={handleShareApp}
              className="mt-2.5 w-full py-2 px-3 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 active:scale-95 transition-all shadow-md"
              style={{ backgroundColor: theme.accentColor, color: theme.isLight ? '#FFFFFF' : '#000000' }}
            >
              <Share2 className="w-3.5 h-3.5" />
              <span>{copiedLink ? '✓ Enlace Copiado al Portapapeles' : 'Compartir con App del Sistema'}</span>
            </button>
          </div>

          {/* Opción 2: Enviar vía Amazon Web (sendtokindle) */}
          <div className="p-3.5 rounded-2xl bg-black/30 border border-white/10 hover:border-white/20 transition-all">
            <div className="flex items-start gap-2.5">
              <div className="p-2 rounded-xl bg-amber-950 text-amber-400 border border-amber-800/80 shrink-0">
                <Globe className="w-4 h-4" />
              </div>
              <div className="flex-1">
                <h4 className="font-bold text-xs sm:text-sm text-white flex items-center justify-between">
                  <span>2. Enviar vía Amazon Web</span>
                  <span className="text-[10px] font-mono opacity-60">amazon.com</span>
                </h4>
                <p className="text-[11px] opacity-75 mt-0.5 leading-relaxed">
                  Sube el reporte a tu nube oficial de Amazon Send to Kindle para sincronizarlo automáticamente con tu e-Reader.
                </p>
                <button
                  onClick={handleAmazonWeb}
                  className="mt-2.5 w-full py-2 px-3 rounded-xl bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 border border-amber-500/40 text-xs font-bold flex items-center justify-center gap-1.5 active:scale-95 transition-all"
                >
                  <ExternalLink className="w-3.5 h-3.5" />
                  <span>Abrir amazon.com/sendtokindle</span>
                </button>
              </div>
            </div>
          </div>

          {/* Opción 3: Enviar por Email a @kindle.com */}
          <div className="p-3.5 rounded-2xl bg-black/30 border border-white/10 hover:border-white/20 transition-all">
            <div className="flex items-start gap-2.5">
              <div className="p-2 rounded-xl bg-purple-950 text-purple-400 border border-purple-800/80 shrink-0">
                <Mail className="w-4 h-4" />
              </div>
              <div className="flex-1">
                <h4 className="font-bold text-xs sm:text-sm text-white">
                  3. Enviar por Email al Kindle (@kindle.com)
                </h4>
                <p className="text-[11px] opacity-75 mt-0.5 leading-relaxed">
                  Genera un email preconfigurado con asunto <code className="font-mono text-purple-300">convert</code> para que Amazon lo transforme a formato Kindle.
                </p>
                <div className="mt-2 flex gap-1.5">
                  <input
                    type="email"
                    value={kindleEmail}
                    onChange={(e) => setKindleEmail(e.target.value)}
                    placeholder="tu_nombre@kindle.com"
                    className="flex-1 px-2.5 py-1.5 text-xs rounded-xl bg-black/40 border border-white/15 focus:outline-none focus:border-purple-400 placeholder-white/30 font-mono"
                  />
                  <button
                    onClick={handleSendEmail}
                    className="px-3 py-1.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white text-xs font-bold flex items-center gap-1 shrink-0 active:scale-95 transition-all"
                  >
                    <Mail className="w-3.5 h-3.5" />
                    <span>Enviar</span>
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Opción 4: Descargar versión para e-Reader (HTML / EPUB-ready) */}
          <div className="p-3.5 rounded-2xl bg-black/30 border border-white/10 hover:border-white/20 transition-all">
            <div className="flex items-start gap-2.5">
              <div className="p-2 rounded-xl bg-emerald-950 text-emerald-400 border border-emerald-800/80 shrink-0">
                <Download className="w-4 h-4" />
              </div>
              <div className="flex-1">
                <h4 className="font-bold text-xs sm:text-sm text-white">
                  4. Descargar Archivo para e-Reader (.html)
                </h4>
                <p className="text-[11px] opacity-75 mt-0.5 leading-relaxed">
                  Archivo semántico autónomo optimizado con tipografía serif, márgenes de lectura y sellado notarial listo para abrir en Kindle, Kobo o Calibre.
                </p>
                <button
                  onClick={handleDownloadEreader}
                  className="mt-2.5 w-full py-2 px-3 rounded-xl bg-emerald-600/20 hover:bg-emerald-600/30 text-emerald-300 border border-emerald-500/40 text-xs font-bold flex items-center justify-center gap-1.5 active:scale-95 transition-all"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Descargar Archivo Kindle (.html)</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Footer info */}
        <div className="p-3 border-t border-white/10 text-center text-[10px] opacity-60 font-mono">
          📚 Totalmente compatible con Paperwhite, Oasis, Scribe, Android & iOS Kindle App.
        </div>
      </div>
    </div>
  );
};
