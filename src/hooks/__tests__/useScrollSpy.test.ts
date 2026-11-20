import { describe, it, expect, vi, beforeEach } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { useScrollSpy } from '../useScrollSpy';

describe('useScrollSpy Hook', () => {
  let observerCallback: IntersectionObserverCallback | null = null;
  const observeMock = vi.fn();
  const disconnectMock = vi.fn();

  beforeEach(() => {
    observerCallback = null;
    observeMock.mockClear();
    disconnectMock.mockClear();

    global.IntersectionObserver = class {
      constructor(cb: IntersectionObserverCallback) {
        observerCallback = cb;
      }
      observe = observeMock;
      disconnect = disconnectMock;
      unobserve = vi.fn();
      takeRecords = vi.fn(() => []);
      root = null;
      rootMargin = '';
      thresholds = [];
    } as any;

    document.body.innerHTML = `
      <section id="inicio"></section>
      <section id="proximos-retiros"></section>
      <section id="beneficios"></section>
    `;
  });

  it('observes provided sectionIds and updates activeId on intersection', () => {
    const replaceStateSpy = vi.spyOn(window.history, 'replaceState');

    const { result } = renderHook(() =>
      useScrollSpy({
        sectionIds: ['inicio', 'proximos-retiros', 'beneficios'],
        defaultActiveId: 'inicio',
      })
    );

    expect(result.current.activeId).toBe('inicio');
    expect(observeMock).toHaveBeenCalledTimes(3);

    act(() => {
      if (observerCallback) {
        observerCallback(
          [
            {
              isIntersecting: true,
              target: document.getElementById('beneficios')!,
            } as unknown as IntersectionObserverEntry,
          ],
          {} as IntersectionObserver
        );
      }
    });

    expect(result.current.activeId).toBe('beneficios');
    expect(replaceStateSpy).toHaveBeenCalledWith(null, '', '#beneficios');
  });

  it('does not observe when enabled is false', () => {
    renderHook(() =>
      useScrollSpy({
        sectionIds: ['inicio', 'beneficios'],
        enabled: false,
      })
    );

    expect(observeMock).not.toHaveBeenCalled();
  });
});

