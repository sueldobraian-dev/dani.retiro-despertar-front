/**
 * Utilidades para manejo y extracción de identificadores de videos de YouTube (estándar y Shorts).
 */

export function extractYouTubeId(urlOrId: string): string | null {
  if (!urlOrId || typeof urlOrId !== 'string') return null;

  const trimmed = urlOrId.trim();

  // Si ya es un ID de 11 caracteres alfanuméricos directos
  if (/^[a-zA-Z0-9_-]{11}$/.test(trimmed)) {
    return trimmed;
  }

  // Regex para soportar youtube.com/watch?v=ID, youtube.com/shorts/ID, youtu.be/ID, youtube.com/embed/ID
  const regex = /(?:youtube\.com\/(?:watch\?.*v=|shorts\/|embed\/)|youtu\.be\/)([a-zA-Z0-9_-]{11})/;
  const match = trimmed.match(regex);

  return match ? match[1] : null;
}

export function getYouTubeThumbnailUrl(
  urlOrId: string,
  quality: 'hq' | 'maxres' | 'sd' = 'hq'
): string {
  const videoId = extractYouTubeId(urlOrId);
  if (!videoId) {
    return '/images/experience/meditacion.jpg';
  }

  const qualityFileName = quality === 'maxres' ? 'maxresdefault.jpg' : `${quality}default.jpg`;
  return `https://img.youtube.com/vi/${videoId}/${qualityFileName}`;
}

export function getYouTubeEmbedUrl(urlOrId: string, autoplay = true): string | null {
  const videoId = extractYouTubeId(urlOrId);
  if (!videoId) return null;

  const params = new URLSearchParams({
    rel: '0',
    modestbranding: '1',
    ...(autoplay ? { autoplay: '1' } : {}),
  });

  return `https://www.youtube-nocookie.com/embed/${videoId}?${params.toString()}`;
}
