/**
 * Utilidades para normalizar y construir URLs reutilizables entre Galería y Experiencia.
 */

export const DEFAULT_LOCATION_SLUG = 'retiro-despertar/chascomus-finca-los-coipos';

/**
 * Extrae la clave/slug limpia de la ubicación a partir de un hash, path completo o slug simple.
 * Ejemplo:
 * - "/galeria#retiro-despertar/chascomus-finca-los-coipos" -> "retiro-despertar/chascomus-finca-los-coipos"
 * - "/experiencia#retiro-despertar/chascomus-finca-los-coipos" -> "retiro-despertar/chascomus-finca-los-coipos"
 * - "#chascomus-finca-los-coipos" -> "retiro-despertar/chascomus-finca-los-coipos"
 */
export function extractLocationSlug(urlOrSlug?: string | null): string {
  if (!urlOrSlug || typeof urlOrSlug !== 'string') {
    return DEFAULT_LOCATION_SLUG;
  }

  let cleaned = urlOrSlug.trim();

  // Remover prefijos conocidos
  if (cleaned.includes('#')) {
    cleaned = cleaned.substring(cleaned.indexOf('#') + 1);
  }

  cleaned = cleaned.replace(/^\/+/, '').replace(/\/+$/, '');

  if (!cleaned) {
    return DEFAULT_LOCATION_SLUG;
  }

  return cleaned;
}

/**
 * Genera la URL para la sección de Galería a partir de una ubicación o slug.
 */
export function getGalleryUrl(urlOrSlug?: string | null): string {
  const slug = extractLocationSlug(urlOrSlug);
  return `/galeria#${slug}`;
}

/**
 * Genera la URL para la sección de Experiencia a partir de una ubicación o slug.
 */
export function getExperienceUrl(urlOrSlug?: string | null): string {
  const slug = extractLocationSlug(urlOrSlug);
  return `/experiencia#${slug}`;
}
