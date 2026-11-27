export type SocialLinkCategory = 'website' | 'catalog' | 'instagram-retiro' | 'instagram-ropa';

export interface SocialLinkItem {
  id: string;
  title: string;
  subtitle: string;
  badge: string;
  url: string;
  category: SocialLinkCategory;
  isExternal: boolean;
}

export type QrPresetId = 'panfleto' | 'banner' | 'general';

export interface QrPresetConfig {
  id: QrPresetId;
  label: string;
  description: string;
  targetUrl: string;
  fileNamePrefix: string;
}

export const OFFICIAL_REDES_URL = 'https://retiro-despertar.vercel.app/redes';

export const QR_PRESETS: Record<QrPresetId, QrPresetConfig> = {
  panfleto: {
    id: 'panfleto',
    label: 'Panfleto / Tarjeta',
    description: 'Incluye medición UTM (?utm_source=panfleto&utm_medium=qr)',
    targetUrl: 'https://retiro-despertar.vercel.app/redes?utm_source=panfleto&utm_medium=qr',
    fileNamePrefix: 'qr-retiro-despertar-panfleto',
  },
  banner: {
    id: 'banner',
    label: 'Banner / Lona',
    description: 'Incluye medición UTM (?utm_source=banner&utm_medium=qr)',
    targetUrl: 'https://retiro-despertar.vercel.app/redes?utm_source=banner&utm_medium=qr',
    fileNamePrefix: 'qr-retiro-despertar-banner',
  },
  general: {
    id: 'general',
    label: 'General (Sin UTM)',
    description: 'URL corta directa sin parámetros adicionales',
    targetUrl: OFFICIAL_REDES_URL,
    fileNamePrefix: 'qr-retiro-despertar-redes',
  },
};

export const SOCIAL_LINKS_ITEMS: SocialLinkItem[] = [
  {
    id: 'sitio-oficial',
    title: 'Retiro Despertar',
    subtitle: 'Constelaciones Familiares, Reiki, Yoga y Chef Privado',
    badge: 'Web Oficial',
    url: 'https://retiro-despertar.vercel.app/#inicio',
    category: 'website',
    isExternal: false,
  },
  {
    id: 'catalogo-indumentaria',
    title: 'Despierta Indumentaria Holística',
    subtitle: 'Catálogo de ropa consciente para tu práctica y bienestar',
    badge: 'Catálogo',
    url: 'https://retiro-despertar.vercel.app/despierta-indumentaria-holistica',
    category: 'catalog',
    isExternal: false,
  },
  {
    id: 'instagram-retiros',
    title: 'Despertar Retiro',
    subtitle: '@despertar.retiroholistico',
    badge: 'Instagram',
    url: 'https://www.instagram.com/despertar.retiroholistico',
    category: 'instagram-retiro',
    isExternal: true,
  },
  {
    id: 'instagram-indumentaria',
    title: 'Despierta Indumentaria',
    subtitle: '@despierta.ropa',
    badge: 'Instagram',
    url: 'https://www.instagram.com/despierta.ropa',
    category: 'instagram-ropa',
    isExternal: true,
  },
];
