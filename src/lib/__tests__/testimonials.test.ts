import { describe, it, expect, beforeEach, vi } from 'vitest';

vi.mock('@/lib/supabase', () => ({
  supabase: {
    from: vi.fn(() => ({
      select: vi.fn(() => ({
        eq: vi.fn(() => ({
          eq: vi.fn(() => ({
            order: vi.fn(() => ({
              order: vi.fn(() => ({
                range: vi.fn(async () => ({ data: null, error: new Error('Simulated network error') })),
                limit: vi.fn(async () => ({ data: null, error: new Error('Simulated network error') })),
              })),
            })),
          })),
        })),
      })),
    })),
    rpc: vi.fn(async () => ({ data: 43, error: null })),
  },
}));

import {
  mapSupabaseTestimonial,
  getLikedIdsFromStorage,
  saveLikedIdToStorage,
  isTestimonialLikedLocally,
  fetchWrittenTestimonials,
  fetchTopLikedWrittenTestimonials,
  fetchVideoTestimonials,
  toggleTestimonialLike,
} from '../testimonials';


describe('Testimonials Service & Helpers', () => {
  let localStorageMock: Record<string, string> = {};

  beforeEach(() => {
    localStorageMock = {};
    vi.stubGlobal('localStorage', {
      getItem: (key: string) => localStorageMock[key] || null,
      setItem: (key: string, val: string) => {
        localStorageMock[key] = val;
      },
      removeItem: (key: string) => {
        delete localStorageMock[key];
      },
      clear: () => {
        localStorageMock = {};
      },
    });
  });

  describe('Local Storage Like Handlers', () => {
    it('returns empty array when no likes saved', () => {
      expect(getLikedIdsFromStorage()).toEqual([]);
    });

    it('saves liked ID and returns true for isTestimonialLikedLocally', () => {
      saveLikedIdToStorage('test-id-1', true);
      expect(isTestimonialLikedLocally('test-id-1')).toBe(true);
      expect(getLikedIdsFromStorage()).toContain('test-id-1');
    });

    it('removes liked ID when isLiked is false', () => {
      saveLikedIdToStorage('test-id-1', true);
      expect(isTestimonialLikedLocally('test-id-1')).toBe(true);

      saveLikedIdToStorage('test-id-1', false);
      expect(isTestimonialLikedLocally('test-id-1')).toBe(false);
      expect(getLikedIdsFromStorage()).not.toContain('test-id-1');
    });
  });

  describe('mapSupabaseTestimonial', () => {
    it('correctly maps polymorphic database object to Testimonial', () => {
      const raw = {
        id: '123',
        title: 'Ana',
        subtitle: 'Yoga',
        content: 'Hermoso retiro',
        avatar_url: 'https://example.com/avatar.jpg',
        rating: 5,
        type: 'written',
        likes_count: 10,
        is_published: true,
        created_at: '2026-08-01T10:00:00Z',
      };

      const mapped = mapSupabaseTestimonial(raw);
      expect(mapped.id).toBe('123');
      expect(mapped.title).toBe('Ana');
      expect(mapped.subtitle).toBe('Yoga');
      expect(mapped.content).toBe('Hermoso retiro');
      expect(mapped.avatarUrl).toBe('https://example.com/avatar.jpg');
      expect(mapped.likesCount).toBe(10);
      expect(mapped.type).toBe('written');
    });

    it('gracefully supports legacy/alternative name, comment, role and videoUrl keys', () => {
      const legacyRaw = {
        id: '456',
        name: 'Pedro',
        role: 'Reiki',
        comment: 'Paz profunda',
        avatar_url: '',
        type: 'written',
      };

      const mapped = mapSupabaseTestimonial(legacyRaw);
      expect(mapped.title).toBe('Pedro');
      expect(mapped.subtitle).toBe('Reiki');
      expect(mapped.content).toBe('Paz profunda');
    });
  });

  describe('fetchWrittenTestimonials & Pagination', () => {
    it('fetches initial batch of 10 written testimonials ordered by likes', async () => {
      const result = await fetchWrittenTestimonials({ offset: 0, limit: 10 });
      expect(result.items.length).toBeLessThanOrEqual(10);
      expect(result.items.length).toBeGreaterThan(0);
      expect(result.items[0].type).toBe('written');

      // Verify descending order of likes
      for (let i = 0; i < result.items.length - 1; i++) {
        expect(result.items[i].likesCount).toBeGreaterThanOrEqual(result.items[i + 1].likesCount);
      }
    });

    it('handles pagination with offset and indicates hasMore', async () => {
      const firstBatch = await fetchWrittenTestimonials({ offset: 0, limit: 5 });
      expect(firstBatch.items.length).toBe(5);
      expect(firstBatch.hasMore).toBe(true);

      const secondBatch = await fetchWrittenTestimonials({ offset: 5, limit: 5 });
      expect(secondBatch.items.length).toBe(5);
      // Ensure different items are returned
      expect(firstBatch.items[0].id).not.toBe(secondBatch.items[0].id);
    });
  });

  describe('fetchTopLikedWrittenTestimonials', () => {
    it('returns exactly 4 most liked testimonials for the Home page', async () => {
      const top4 = await fetchTopLikedWrittenTestimonials(4);
      expect(top4.length).toBe(4);
      expect(top4[0].likesCount).toBeGreaterThanOrEqual(top4[1].likesCount);
      expect(top4[1].likesCount).toBeGreaterThanOrEqual(top4[2].likesCount);
      expect(top4[2].likesCount).toBeGreaterThanOrEqual(top4[3].likesCount);
    });
  });

  describe('fetchVideoTestimonials', () => {
    it('fetches 16:9 YouTube videos', async () => {
      const videos = await fetchVideoTestimonials('video');
      expect(videos.length).toBeGreaterThan(0);
      expect(videos.every((v) => v.type === 'video')).toBe(true);
      expect(videos[0].content).toContain('youtube.com');
    });

    it('fetches 9:16 YouTube Shorts', async () => {
      const shorts = await fetchVideoTestimonials('short');
      expect(shorts.length).toBeGreaterThan(0);
      expect(shorts.every((s) => s.type === 'short')).toBe(true);
      expect(shorts[0].content).toContain('shorts');
    });
  });


  describe('toggleTestimonialLike', () => {
    it('toggles like state from unliked to liked and stores in localStorage', async () => {
      const id = '11111111-1111-1111-1111-000000000001';
      expect(isTestimonialLikedLocally(id)).toBe(false);

      const result = await toggleTestimonialLike(id, false);
      expect(result.newLikedState).toBe(true);
      expect(isTestimonialLikedLocally(id)).toBe(true);
    });
  });
});
