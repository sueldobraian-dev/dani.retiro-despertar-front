import { supabase } from '@/lib/supabase';
import { Testimonial, TestimonialType } from '@/types';
import fallbackTestimonials from '@/data/testimonials.json';

const STORAGE_KEY = 'retiro_liked_testimonials';

/**
 * Mapea una fila de Supabase (snake_case) o fallback JSON al tipo estricto Testimonial.
 */
export function mapSupabaseTestimonial(raw: any): Testimonial {
  return {
    id: raw.id,
    title: raw.title || raw.name || '',
    content: raw.content || raw.comment || raw.video_url || raw.videoUrl || '',
    subtitle: raw.subtitle || raw.role || undefined,
    avatarUrl: raw.avatar_url || raw.avatarUrl || '',
    rating: raw.rating ?? 5,
    type: raw.type as TestimonialType,
    likesCount: raw.likes_count ?? raw.likesCount ?? 0,
    isPublished: raw.is_published ?? raw.isPublished ?? true,
    createdAt: raw.created_at || raw.createdAt || new Date().toISOString(),
  };
}


/**
 * Obtiene los IDs de testimonios likeados guardados en localStorage.
 */
export function getLikedIdsFromStorage(): string[] {
  if (typeof window === 'undefined') return [];
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    return JSON.parse(raw);
  } catch (err) {
    console.error('Error reading liked testimonials from localStorage:', err);
    return [];
  }
}

/**
 * Guarda o quita un ID en el localStorage.
 */
export function saveLikedIdToStorage(id: string, isLiked: boolean): void {
  if (typeof window === 'undefined' || !id) return;
  try {
    const current = new Set(getLikedIdsFromStorage());
    if (isLiked) {
      current.add(id);
    } else {
      current.delete(id);
    }
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(Array.from(current)));
  } catch (err) {
    console.error('Error saving liked testimonial to localStorage:', err);
  }
}

/**
 * Verifica si un testimonio específico fue likeado por el usuario actual.
 */
export function isTestimonialLikedLocally(id: string): boolean {
  if (typeof window === 'undefined' || !id) return false;
  return getLikedIdsFromStorage().includes(id);
}

/**
 * Consulta de testimonios escritos con paginación progresiva (límite de a 10).
 * Ordenados por likes_count DESC y created_at DESC.
 */
export async function fetchWrittenTestimonials({
  offset = 0,
  limit = 10,
}: {
  offset?: number;
  limit?: number;
}): Promise<{ items: Testimonial[]; hasMore: boolean }> {
  try {
    const { data, error } = await supabase
      .from('testimonials')
      .select('*')
      .eq('type', 'written')
      .eq('is_published', true)
      .order('likes_count', { ascending: false })
      .order('created_at', { ascending: false })
      .range(offset, offset + limit);

    if (error || !data || data.length === 0) {
      // Fallback a dataset local
      return getFallbackWrittenTestimonials(offset, limit);
    }

    const hasMore = data.length > limit;
    const items = data.slice(0, limit).map(mapSupabaseTestimonial);

    return { items, hasMore };
  } catch (err) {
    console.error('Unexpected error in fetchWrittenTestimonials:', err);
    return getFallbackWrittenTestimonials(offset, limit);
  }
}

/**
 * Consulta del Top N testimonios más gustados (para la Home).
 */
export async function fetchTopLikedWrittenTestimonials(limit = 4): Promise<Testimonial[]> {
  try {
    const { data, error } = await supabase
      .from('testimonials')
      .select('*')
      .eq('type', 'written')
      .eq('is_published', true)
      .order('likes_count', { ascending: false })
      .order('created_at', { ascending: false })
      .limit(limit);

    if (error || !data || data.length === 0) {
      return getFallbackWrittenTestimonials(0, limit).then((res) => res.items);
    }

    return data.map(mapSupabaseTestimonial);
  } catch (err) {
    console.error('Unexpected error in fetchTopLikedWrittenTestimonials:', err);
    return (await getFallbackWrittenTestimonials(0, limit)).items;
  }
}

/**
 * Consulta de videos o shorts testimoniales de YouTube.
 */
export async function fetchVideoTestimonials(
  type: 'video' | 'short'
): Promise<Testimonial[]> {
  try {
    const { data, error } = await supabase
      .from('testimonials')
      .select('*')
      .eq('type', type)
      .eq('is_published', true)
      .order('likes_count', { ascending: false })
      .order('created_at', { ascending: false });

    if (error || !data || data.length === 0) {
      return getFallbackVideoTestimonials(type);
    }

    return data.map(mapSupabaseTestimonial);
  } catch (err) {
    console.error(`Unexpected error in fetchVideoTestimonials for type ${type}:`, err);
    return getFallbackVideoTestimonials(type);
  }
}

/**
 * Toggle de Like: llama a la RPC en Supabase y actualiza localStorage.
 */
export async function toggleTestimonialLike(
  id: string,
  currentlyLiked: boolean
): Promise<{ success: boolean; newLikedState: boolean }> {
  const newLikedState = !currentlyLiked;
  saveLikedIdToStorage(id, newLikedState);

  try {
    const rpcName = newLikedState ? 'increment_testimonial_like' : 'decrement_testimonial_like';
    const { error } = await supabase.rpc(rpcName, { testimonial_id: id });

    if (error) {
      console.warn(`RPC ${rpcName} warning:`, error.message);
    }

    return { success: true, newLikedState };
  } catch (err) {
    console.error('Unexpected error toggling testimonial like:', err);
    return { success: true, newLikedState };
  }
}

// ---------------------------------------------------------------------------
// Helpers de Resiliencia / Contingencia Local
// ---------------------------------------------------------------------------

async function getFallbackWrittenTestimonials(
  offset: number,
  limit: number
): Promise<{ items: Testimonial[]; hasMore: boolean }> {
  const allWritten = (fallbackTestimonials as any[])
    .filter((item) => item.type === 'written' && (item.isPublished ?? item.is_published ?? true))
    .sort((a, b) => {
      const likesA = a.likesCount ?? a.likes_count ?? 0;
      const likesB = b.likesCount ?? b.likes_count ?? 0;
      if (likesB !== likesA) return likesB - likesA;
      const dateA = new Date(a.createdAt ?? a.created_at ?? 0).getTime();
      const dateB = new Date(b.createdAt ?? b.created_at ?? 0).getTime();
      return dateB - dateA;
    });

  const slice = allWritten.slice(offset, offset + limit);
  const hasMore = offset + limit < allWritten.length;

  return {
    items: slice.map(mapSupabaseTestimonial),
    hasMore,
  };
}

function getFallbackVideoTestimonials(type: 'video' | 'short'): Testimonial[] {
  return (fallbackTestimonials as any[])
    .filter((item) => item.type === type && (item.isPublished ?? item.is_published ?? true))
    .sort((a, b) => {
      const likesA = a.likesCount ?? a.likes_count ?? 0;
      const likesB = b.likesCount ?? b.likes_count ?? 0;
      return likesB - likesA;
    })
    .map(mapSupabaseTestimonial);
}
