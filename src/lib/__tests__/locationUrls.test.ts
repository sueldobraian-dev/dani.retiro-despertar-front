import { describe, it, expect } from 'vitest';
import { extractLocationSlug, getGalleryUrl, getExperienceUrl, DEFAULT_LOCATION_SLUG } from '../locationUrls';

describe('locationUrls utility', () => {
  it('extracts location slug from full gallery URL', () => {
    const slug = extractLocationSlug('/galeria#retiro-despertar/chascomus-finca-los-coipos');
    expect(slug).toBe('retiro-despertar/chascomus-finca-los-coipos');
  });

  it('extracts location slug from full experience URL', () => {
    const slug = extractLocationSlug('/experiencia#retiro-despertar/tigre-delta-minahasa');
    expect(slug).toBe('retiro-despertar/tigre-delta-minahasa');
  });

  it('returns DEFAULT_LOCATION_SLUG when null or empty', () => {
    expect(extractLocationSlug(null)).toBe(DEFAULT_LOCATION_SLUG);
    expect(extractLocationSlug('')).toBe(DEFAULT_LOCATION_SLUG);
  });

  it('generates correct gallery and experience URLs', () => {
    const raw = '/galeria#retiro-despertar/chascomus-finca-los-coipos';
    expect(getGalleryUrl(raw)).toBe('/galeria#retiro-despertar/chascomus-finca-los-coipos');
    expect(getExperienceUrl(raw)).toBe('/experiencia#retiro-despertar/chascomus-finca-los-coipos');
  });
});
