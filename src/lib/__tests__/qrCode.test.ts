import { describe, it, expect } from 'vitest';
import { generateQrMatrix, generateQrSvgString } from '../qrCode';
import { OFFICIAL_REDES_URL } from '@/config/socialLinksConfig';

describe('qrCode Utility', () => {
  it('generates a 29x29 Version 3 QR matrix for OFFICIAL_REDES_URL with intact finder patterns', () => {
    const matrix = generateQrMatrix(OFFICIAL_REDES_URL);

    expect(matrix.length).toBe(29);
    expect(matrix[0].length).toBe(29);

    // Esquinas de los 3 patrones de búsqueda (7x7) deben ser oscuras
    expect(matrix[0][0]).toBe(true);
    expect(matrix[0][6]).toBe(true);
    expect(matrix[6][0]).toBe(true);
    expect(matrix[6][6]).toBe(true);
    expect(matrix[3][3]).toBe(true);

    // Top-right finder
    expect(matrix[0][22]).toBe(true);
    expect(matrix[0][28]).toBe(true);
    expect(matrix[3][25]).toBe(true);

    // Bottom-left finder
    expect(matrix[22][0]).toBe(true);
    expect(matrix[28][0]).toBe(true);
    expect(matrix[25][3]).toBe(true);

    // Separadores blancos alrededor del finder superior izquierdo
    expect(matrix[7][0]).toBe(false);
    expect(matrix[0][7]).toBe(false);
  });

  it('produces a valid vector SVG string with crispEdges and custom colors', () => {
    const svg = generateQrSvgString(OFFICIAL_REDES_URL, {
      margin: 4,
      darkColor: '#111111',
      lightColor: '#ffffff',
    });

    expect(svg).toContain('<svg xmlns="http://www.w3.org/2000/svg"');
    expect(svg).toContain('viewBox="0 0 37 37"');
    expect(svg).toContain('fill="#111111"');
    expect(svg).toContain('fill="#ffffff"');
  });

  it('supports longer UTM URLs using multi-block Version 5 QR matrices', () => {
    const utmUrl = 'https://retiro-despertar.vercel.app/redes?utm_source=panfleto&utm_medium=qr';
    const matrix = generateQrMatrix(utmUrl);
    expect(matrix.length).toBe(37);
    expect(matrix[0].length).toBe(37);
    expect(matrix[0][0]).toBe(true);
    expect(matrix[0][36]).toBe(true);
    expect(matrix[36][0]).toBe(true);
  });

  it('throws a descriptive error when the input exceeds configured QR version capacity', () => {
    const overlyLongInput = 'https://retiro-despertar.vercel.app/' + 'a'.repeat(120);
    expect(() => generateQrMatrix(overlyLongInput)).toThrow(/Texto demasiado extenso/i);
  });
});

