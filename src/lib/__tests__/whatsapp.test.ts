import { describe, it, expect } from 'vitest';
import { getWhatsAppUrl, WHATSAPP_NUMBER, DEFAULT_WHATSAPP_MESSAGE } from '../whatsapp';

describe('whatsapp utility', () => {
  it('generates default whatsapp URL when no custom message provided', () => {
    const url = getWhatsAppUrl();
    expect(url).toContain(`https://wa.me/${WHATSAPP_NUMBER}`);
    expect(url).toContain(encodeURIComponent(DEFAULT_WHATSAPP_MESSAGE));
  });

  it('generates parameterized whatsapp URL with custom message', () => {
    const custom = 'Hola! Quiero mi cupón de preventa. Código: PREVENTA10';
    const url = getWhatsAppUrl(custom);
    expect(url).toContain(encodeURIComponent(custom));
  });
});
