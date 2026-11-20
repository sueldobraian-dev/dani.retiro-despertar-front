'use client';

import { useEffect, useState } from 'react';

export interface UseScrollSpyOptions {
  sectionIds: string[];
  defaultActiveId?: string;
  enabled?: boolean;
  rootMargin?: string;
  updateHash?: boolean;
}

/**
 * Hook modular para observar qué sección está activa durante el scroll vertical
 * utilizando IntersectionObserver.
 */
export function useScrollSpy({
  sectionIds,
  defaultActiveId = sectionIds[0] || '',
  enabled = true,
  rootMargin = '-50% 0px -50% 0px',
  updateHash = true,
}: UseScrollSpyOptions) {
  const [activeId, setActiveId] = useState<string>(defaultActiveId);
  const sectionIdsKey = sectionIds.join(',');

  useEffect(() => {
    const ids = sectionIdsKey ? sectionIdsKey.split(',') : [];
    if (!enabled || typeof window === 'undefined' || ids.length === 0) {
      return;
    }

    const observerOptions: IntersectionObserverInit = {
      root: null,
      rootMargin,
      threshold: 0,
    };

    const observerCallback: IntersectionObserverCallback = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting && entry.target.id) {
          const id = entry.target.id;
          setActiveId(id);
          if (updateHash) {
            window.history.replaceState(null, '', `#${id}`);
          }
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);

    ids.forEach((id) => {
      const element = document.getElementById(id);
      if (element) {
        observer.observe(element);
      }
    });

    return () => {
      observer.disconnect();
    };
  }, [sectionIdsKey, enabled, rootMargin, updateHash]);

  return { activeId, setActiveId };
}
