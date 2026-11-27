import { describe, it, expect, vi } from 'vitest';
import LinksRedirectPage from '../page';

const redirectMock = vi.fn();

vi.mock('next/navigation', () => ({
  redirect: (url: string) => redirectMock(url),
}));

describe('LinksRedirectPage (/links)', () => {
  it('redirects automatically to /redes', () => {
    LinksRedirectPage();
    expect(redirectMock).toHaveBeenCalledWith('/redes');
  });
});

