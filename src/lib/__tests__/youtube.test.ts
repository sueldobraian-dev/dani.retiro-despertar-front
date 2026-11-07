import { describe, it, expect } from 'vitest';
import { extractYouTubeId, getYouTubeThumbnailUrl, getYouTubeEmbedUrl } from '../youtube';

describe('YouTube Utilities', () => {
  it('extracts ID from standard watch URL', () => {
    const url = 'https://www.youtube.com/watch?v=cIjc8wOTLwk';
    expect(extractYouTubeId(url)).toBe('cIjc8wOTLwk');
  });

  it('extracts ID from YouTube Shorts URL', () => {
    const url = 'https://www.youtube.com/shorts/TSQ96WksY9w';
    expect(extractYouTubeId(url)).toBe('TSQ96WksY9w');
  });

  it('extracts ID from youtu.be short URL', () => {
    const url = 'https://youtu.be/cIjc8wOTLwk';
    expect(extractYouTubeId(url)).toBe('cIjc8wOTLwk');
  });

  it('handles direct 11-char video ID', () => {
    expect(extractYouTubeId('cIjc8wOTLwk')).toBe('cIjc8wOTLwk');
  });

  it('returns null for invalid or empty input', () => {
    expect(extractYouTubeId('')).toBeNull();
    expect(extractYouTubeId('not-a-youtube-url')).toBeNull();
  });

  it('generates correct thumbnail URL', () => {
    expect(getYouTubeThumbnailUrl('cIjc8wOTLwk', 'hq')).toBe(
      'https://img.youtube.com/vi/cIjc8wOTLwk/hqdefault.jpg'
    );
    expect(getYouTubeThumbnailUrl('https://www.youtube.com/shorts/TSQ96WksY9w')).toBe(
      'https://img.youtube.com/vi/TSQ96WksY9w/hqdefault.jpg'
    );
  });

  it('generates secure embed URL with autoplay', () => {
    const embedUrl = getYouTubeEmbedUrl('cIjc8wOTLwk', true);
    expect(embedUrl).toContain('https://www.youtube-nocookie.com/embed/cIjc8wOTLwk');
    expect(embedUrl).toContain('autoplay=1');
    expect(embedUrl).toContain('rel=0');
  });
});
