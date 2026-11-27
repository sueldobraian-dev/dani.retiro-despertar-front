'use client';

import React, { useEffect, useMemo, useState } from 'react';
import Image from 'next/image';
import {
  Instagram,
  ExternalLink,
  QrCode,
  Copy,
  Check,
  Download,
  X,
  Sparkles,
  FileImage,
} from 'lucide-react';
import DespertarIcon from './DespertarIcon';
import {
  OFFICIAL_REDES_URL,
  QR_PRESETS,
  QrPresetId,
  SOCIAL_LINKS_ITEMS,
  SocialLinkCategory,
  SocialLinkItem,
} from '@/config/socialLinksConfig';
import { generateQrMatrix, generateQrSvgString } from '@/lib/qrCode';

interface CategoryVisualConfig {
  renderLeadingVisual: () => React.ReactNode;
  cardAccentClass: string;
  badgeClass: string;
}

const CATEGORY_VISUAL_STRATEGY: Record<SocialLinkCategory, CategoryVisualConfig> = {
  website: {
    renderLeadingVisual: () => (
      <div className="w-14 h-14 rounded-2xl bg-emerald-800 text-stone-50 flex items-center justify-center shadow-sm shrink-0">
        <DespertarIcon className="w-7 h-7" />
      </div>
    ),
    cardAccentClass:
      'border-emerald-200/80 bg-white hover:border-emerald-600/60 hover:bg-emerald-50/20',
    badgeClass: 'bg-emerald-50 text-emerald-800 border-emerald-200/60',
  },
  catalog: {
    renderLeadingVisual: () => (
      <div className="relative w-14 h-14 aspect-square rounded-2xl overflow-hidden border border-stone-200/80 bg-amber-50/40 shadow-sm shrink-0">
        <Image
          src="/images/indumentaria/logo-despierta.jpg"
          alt="Logo Despierta Indumentaria"
          className="object-cover"
          fill
          sizes="56px"
        />
      </div>
    ),
    cardAccentClass:
      'border-amber-200/80 bg-white hover:border-amber-600/60 hover:bg-amber-50/30',
    badgeClass: 'bg-amber-50 text-amber-800 border-amber-200/60',
  },
  'instagram-retiro': {
    renderLeadingVisual: () => (
      <div className="w-14 h-14 rounded-2xl bg-emerald-700/10 text-emerald-800 flex items-center justify-center border border-emerald-200/60 shrink-0">
        <Instagram className="w-6 h-6" />
      </div>
    ),
    cardAccentClass:
      'border-stone-200/80 bg-white hover:border-emerald-600/50 hover:bg-stone-50/80',
    badgeClass: 'bg-stone-100 text-stone-700 border-stone-200',
  },
  'instagram-ropa': {
    renderLeadingVisual: () => (
      <div className="w-14 h-14 rounded-2xl bg-amber-700/10 text-amber-800 flex items-center justify-center border border-amber-200/60 shrink-0">
        <Instagram className="w-6 h-6" />
      </div>
    ),
    cardAccentClass:
      'border-stone-200/80 bg-white hover:border-amber-600/50 hover:bg-stone-50/80',
    badgeClass: 'bg-amber-50/80 text-amber-800 border-amber-200/60',
  },
};

const PRESET_ORDER: QrPresetId[] = ['panfleto', 'banner', 'general'];

export function buildTrackedUrl(baseUrl: string, isExternal: boolean, utmQuery: string): string {
  if (isExternal || !utmQuery) return baseUrl;
  const cleanQuery = utmQuery.startsWith('?') ? utmQuery.slice(1) : utmQuery;
  if (!cleanQuery) return baseUrl;

  const [pathPart, hashPart] = baseUrl.split('#');
  const separator = pathPart.includes('?') ? '&' : '?';
  const trackedPath = `${pathPart}${separator}${cleanQuery}`;
  return hashPart ? `${trackedPath}#${hashPart}` : trackedPath;
}

export default function RedesHubContent() {
  const [isQrModalOpen, setIsQrModalOpen] = useState(false);
  const [selectedPreset, setSelectedPreset] = useState<QrPresetId>('panfleto');
  const [copied, setCopied] = useState(false);
  const [utmQuery, setUtmQuery] = useState('');

  useEffect(() => {
    if (typeof window !== 'undefined' && window.location.search) {
      const params = new URLSearchParams(window.location.search);
      const utmParams = new URLSearchParams();
      ['utm_source', 'utm_medium', 'utm_campaign'].forEach((key) => {
        const value = params.get(key);
        if (value) utmParams.set(key, value);
      });
      const qs = utmParams.toString();
      if (qs) setUtmQuery(qs);
    }
  }, []);

  const activePreset = QR_PRESETS[selectedPreset];

  const qrMatrix = useMemo(
    () => generateQrMatrix(activePreset.targetUrl),
    [activePreset.targetUrl]
  );
  const qrSvgString = useMemo(
    () =>
      generateQrSvgString(activePreset.targetUrl, {
        margin: 4,
        darkColor: '#292524',
        lightColor: '#ffffff',
      }),
    [activePreset.targetUrl]
  );

  const handleCopyLink = async () => {
    try {
      if (typeof navigator !== 'undefined' && navigator.clipboard) {
        await navigator.clipboard.writeText(OFFICIAL_REDES_URL);
      }
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch {
      setCopied(false);
    }
  };

  const handleDownloadSvg = () => {
    const blob = new Blob([qrSvgString], { type: 'image/svg+xml;charset=utf-8' });
    const objectUrl = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = objectUrl;
    link.download = `${activePreset.fileNamePrefix}.svg`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(objectUrl);
  };

  const handleDownloadPng = () => {
    const resolution = 2048;
    const margin = 4;
    const matrixSize = qrMatrix.length;
    const totalModules = matrixSize + margin * 2;
    const modulePixels = resolution / totalModules;

    const canvas = document.createElement('canvas');
    canvas.width = resolution;
    canvas.height = resolution;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctx.fillStyle = '#ffffff';
    ctx.fillRect(0, 0, resolution, resolution);

    ctx.fillStyle = '#292524';
    for (let r = 0; r < matrixSize; r++) {
      for (let c = 0; c < matrixSize; c++) {
        if (qrMatrix[r][c]) {
          const x = Math.floor((c + margin) * modulePixels);
          const y = Math.floor((r + margin) * modulePixels);
          const w = Math.ceil(modulePixels);
          const h = Math.ceil(modulePixels);
          ctx.fillRect(x, y, w, h);
        }
      }
    }

    const dataUrl = canvas.toDataURL('image/png');
    const link = document.createElement('a');
    link.href = dataUrl;
    link.download = `${activePreset.fileNamePrefix}.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const qrTotalSize = qrMatrix.length + 8;

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-14">
      <div className="max-w-xl mx-auto bg-white/90 backdrop-blur-sm rounded-3xl shadow-sm border border-stone-200/70 p-6 sm:p-10 space-y-8">
        {/* Cabecera de identidad dual: Retiro Despertar + Despierta Indumentaria */}
        <div className="flex flex-col items-center text-center space-y-4">
          <div className="flex items-center justify-center gap-3">
            <div className="w-16 h-16 rounded-full bg-emerald-800 text-stone-50 flex items-center justify-center shadow-sm border-2 border-stone-100">
              <DespertarIcon className="w-8 h-8" />
            </div>
            <div className="relative w-16 h-16 aspect-square rounded-full overflow-hidden shadow-sm border-2 border-amber-200/80 bg-amber-50/40">
              <Image
                src="/images/indumentaria/logo-despierta.jpg"
                alt="Logo Despierta Indumentaria Holística"
                className="object-cover"
                fill
                priority
                sizes="64px"
              />
            </div>
          </div>

          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-amber-50/70 border border-amber-200/60 text-amber-800 text-xs font-medium tracking-wide">
            <Sparkles className="w-3.5 h-3.5 text-amber-700" aria-hidden="true" />
            <span>Comunidad & Canales Oficiales</span>
          </div>

          <div className="space-y-2">
            <h1 className="text-2xl sm:text-3xl font-serif font-bold text-stone-800 tracking-tight">
              Retiro Despertar & Despierta Indumentaria
            </h1>
            <p className="text-sm sm:text-base text-stone-600 leading-relaxed max-w-md mx-auto">
              Conecta con nuestras experiencias de retiro holístico, nuestro catálogo de
              indumentaria consciente y nuestras redes oficiales.
            </p>
          </div>
        </div>

        {/* Lista de los 4 enlaces oficiales */}
        <nav aria-label="Enlaces oficiales de Retiro Despertar" className="space-y-3.5">
          {SOCIAL_LINKS_ITEMS.map((item: SocialLinkItem) => {
            const visual = CATEGORY_VISUAL_STRATEGY[item.category];
            const finalHref = buildTrackedUrl(item.url, item.isExternal, utmQuery);
            return (
              <a
                key={item.id}
                href={finalHref}
                target={item.isExternal ? '_blank' : undefined}
                rel={item.isExternal ? 'noopener noreferrer' : undefined}
                className={`group flex items-center gap-4 w-full p-4 rounded-2xl border transition-all duration-300 shadow-sm hover:shadow-md ${visual.cardAccentClass}`}
              >
                {visual.renderLeadingVisual()}

                <div className="flex-1 min-w-0 text-left">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span
                      className={`inline-block text-[11px] font-semibold uppercase tracking-wider px-2.5 py-0.5 rounded-full border ${visual.badgeClass}`}
                    >
                      {item.badge}
                    </span>
                  </div>
                  <h2 className="font-serif font-bold text-stone-800 text-base sm:text-lg mt-1 group-hover:text-emerald-900 transition-colors truncate">
                    {item.title}
                  </h2>
                  <p className="text-xs sm:text-sm text-stone-600 truncate mt-0.5">
                    {item.subtitle}
                  </p>
                </div>

                <div className="w-9 h-9 rounded-full bg-stone-100 group-hover:bg-emerald-700 text-stone-500 group-hover:text-stone-50 flex items-center justify-center transition-colors duration-300 shrink-0">
                  <ExternalLink className="w-4 h-4" aria-hidden="true" />
                </div>
              </a>
            );
          })}
        </nav>

        {/* Barra inferior de herramientas: Copiar link y Descargar QR para imprenta */}
        <div className="pt-4 border-t border-stone-200/70 flex flex-col sm:flex-row items-center justify-between gap-3">
          <button
            type="button"
            onClick={handleCopyLink}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-stone-100 hover:bg-stone-200/80 text-stone-700 text-xs sm:text-sm font-medium transition-colors cursor-pointer"
          >
            {copied ? (
              <>
                <Check className="w-4 h-4 text-emerald-700" aria-hidden="true" />
                <span className="text-emerald-800 font-semibold">¡Enlace copiado!</span>
              </>
            ) : (
              <>
                <Copy className="w-4 h-4 text-stone-600" aria-hidden="true" />
                <span>Copiar enlace de esta página</span>
              </>
            )}
          </button>

          <button
            type="button"
            onClick={() => setIsQrModalOpen(true)}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-emerald-50 hover:bg-emerald-100/80 text-emerald-800 border border-emerald-200/70 text-xs sm:text-sm font-semibold transition-colors cursor-pointer"
          >
            <QrCode className="w-4 h-4" aria-hidden="true" />
            <span>Ver QR para Panfletos / Banners</span>
          </button>
        </div>
      </div>

      {/* Modal con Código QR (selector UTM Panfleto/Banner) y descarga de Panfleto listo para imprimir */}
      {isQrModalOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="qr-modal-title"
          className="fixed inset-0 z-50 flex items-center justify-center bg-stone-900/60 backdrop-blur-sm p-4 overflow-y-auto"
        >
          <div className="bg-white rounded-3xl max-w-md w-full p-6 sm:p-8 shadow-xl border border-stone-200 space-y-5 relative my-auto">
            <button
              type="button"
              onClick={() => setIsQrModalOpen(false)}
              aria-label="Cerrar ventana de código QR"
              className="absolute top-4 right-4 p-2 rounded-full text-stone-500 hover:text-stone-800 hover:bg-stone-100 transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="text-center space-y-1">
              <h2
                id="qr-modal-title"
                className="text-xl sm:text-2xl font-serif font-bold text-stone-800"
              >
                Código QR Oficial
              </h2>
              <p className="text-xs sm:text-sm text-stone-600">
                Elegí el formato con seguimiento UTM para medir escaneos por soporte.
              </p>
            </div>

            {/* Selector de soporte (Panfleto / Banner / General) */}
            <div className="grid grid-cols-3 gap-1.5 bg-stone-100 p-1 rounded-2xl">
              {PRESET_ORDER.map((presetId) => {
                const preset = QR_PRESETS[presetId];
                const isSelected = selectedPreset === presetId;
                return (
                  <button
                    key={presetId}
                    type="button"
                    onClick={() => setSelectedPreset(presetId)}
                    className={`py-2 px-2 rounded-xl text-xs font-semibold transition-all cursor-pointer ${isSelected
                        ? 'bg-white text-emerald-800 shadow-sm'
                        : 'text-stone-600 hover:text-stone-900'
                      }`}
                  >
                    {preset.label}
                  </button>
                );
              })}
            </div>

            {/* Vista previa del QR vectorial */}
            <div className="bg-stone-50 p-4 rounded-2xl border border-stone-200/80 flex flex-col items-center space-y-2.5">
              <div className="w-52 h-52 bg-white p-2 rounded-xl shadow-sm border border-stone-100">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox={`0 0 ${qrTotalSize} ${qrTotalSize}`}
                  shapeRendering="crispEdges"
                  className="w-full h-full"
                  role="img"
                  aria-label="Código QR hacia retiro-despertar.vercel.app/redes"
                >
                  <rect width={qrTotalSize} height={qrTotalSize} fill="#ffffff" rx="2" />
                  {qrMatrix.map((row, rIdx) =>
                    row.map((cell, cIdx) =>
                      cell ? (
                        <rect
                          key={`${rIdx}-${cIdx}`}
                          x={cIdx + 4}
                          y={rIdx + 4}
                          width={1}
                          height={1}
                          fill="#292524"
                        />
                      ) : null
                    )
                  )}
                </svg>
              </div>
              <p className="text-[11px] text-stone-500 text-center">
                {activePreset.description}
              </p>
            </div>

            {/* Botones de descarga para imprenta */}
            <div className="space-y-2">
              <a
                href="/images/panfleto-despertar-qr.png"
                download="panfleto-despertar-qr.png"
                className="w-full inline-flex items-center justify-center gap-2 px-5 py-3 rounded-2xl bg-amber-700 hover:bg-amber-800 text-stone-50 text-xs sm:text-sm font-semibold transition-colors shadow-sm"
              >
                <FileImage className="w-4 h-4" aria-hidden="true" />
                <span>Descargar Panfleto Diseñado Listo para Imprimir (PNG)</span>
              </a>

              <button
                type="button"
                onClick={handleDownloadSvg}
                className="w-full inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-2xl bg-emerald-700 hover:bg-emerald-800 text-stone-50 text-xs sm:text-sm font-semibold transition-colors shadow-sm cursor-pointer"
              >
                <Download className="w-4 h-4" aria-hidden="true" />
                <span>Descargar Solo QR en SVG (Vectorial)</span>
              </button>

              <button
                type="button"
                onClick={handleDownloadPng}
                className="w-full inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-2xl bg-stone-100 hover:bg-stone-200 text-stone-800 text-xs sm:text-sm font-semibold transition-colors cursor-pointer"
              >
                <Download className="w-4 h-4" aria-hidden="true" />
                <span>Descargar Solo QR en PNG (2048px)</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
