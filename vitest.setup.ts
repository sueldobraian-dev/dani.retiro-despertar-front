import '@testing-library/jest-dom';
import { vi } from 'vitest';
import React from 'react';

class MockIntersectionObserver {
  readonly root: Element | null = null;
  readonly rootMargin: string = '';
  readonly thresholds: ReadonlyArray<number> = [];
  disconnect = vi.fn();
  observe = vi.fn();
  takeRecords = vi.fn(() => []);
  unobserve = vi.fn();
}

global.IntersectionObserver = MockIntersectionObserver as any;

// Mock scrollIntoView para evitar fallos en jsdom
window.HTMLElement.prototype.scrollIntoView = vi.fn();

// Mock history.replaceState/pushState para evitar excepciones de navegación en jsdom
window.history.replaceState = vi.fn();
window.history.pushState = vi.fn();

// Mock next/image para evitar cargas de recursos de red en jsdom y disparos automáticos de onError
vi.mock('next/image', () => {
  return {
    default: ({ src, alt, onError, ...props }: any) => {
      return React.createElement('img', {
        alt,
        onError,
        'data-src': src,
        ...props
      });
    }
  };
});
