'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import {
  Instagram,
  ExternalLink,
  Share2,
  Check,
  Sparkles,
} from 'lucide-react';
import DespertarIcon from './DespertarIcon';
import {
  OFFICIAL_REDES_URL,
  SOCIAL_LINKS_ITEMS,
  SocialLinkCategory,
  SocialLinkItem,
} from '@/config/socialLinksConfig';

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

  const handleShareLink = async () => {
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

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-14">
      <div className="relative max-w-xl mx-auto bg-white/90 backdrop-blur-sm rounded-3xl shadow-sm border border-stone-200/70 p-6 sm:p-10 space-y-8">
        {/* Ícono discreto de compartir enlace */}
        <button
          type="button"
          onClick={handleShareLink}
          aria-label="Compartir enlace"
          title="Compartir enlace"
          className="absolute top-5 right-5 w-10 h-10 rounded-full bg-stone-100 hover:bg-stone-200/80 text-stone-600 hover:text-stone-900 flex items-center justify-center transition-colors cursor-pointer"
        >
          {copied ? (
            <Check className="w-4 h-4 text-emerald-700" aria-hidden="true" />
          ) : (
            <Share2 className="w-4 h-4" aria-hidden="true" />
          )}
        </button>

        {/* Cabecera de identidad dual: Retiro Despertar + Despierta Indumentaria */}
        <div className="flex flex-col items-center text-center space-y-4">
              <div className="flex items-center justify-center gap-4 sm:gap-5">
                <div className="relative w-24 h-24 sm:w-28 sm:h-28 aspect-square rounded-full overflow-hidden shadow-md border-2 border-emerald-700/30 bg-stone-100">
                  <Image
                    src="/images/experience/circulo_infinito.jpg"
                    alt="Círculo de manos Retiro Despertar"
                    className="object-cover object-center"
                    fill
                    priority
                    sizes="(max-width: 640px) 96px, 112px"
                  />
                </div>
                  <div className="relative w-24 h-24 sm:w-28 sm:h-28 aspect-square rounded-full overflow-hidden shadow-md border-2 border-amber-200/80 bg-amber-50/40">
                    <Image
                      src="/images/indumentaria/logo-despierta.jpg"
                      alt="Logo Despierta Indumentaria Holística"
                      className="object-cover object-center"
                      fill
                      priority
                      sizes="(max-width: 640px) 96px, 112px"
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
            </div>
          </section>
          );
}
