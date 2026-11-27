/**
 * Generador declarativo de matriz y SVG de Código QR (ISO/IEC 18004, Modo Byte, Nivel M).
 * Soporta entrelazado multi-bloque (Versiones 1 a 6) para URLs cortas y URLs con parámetros UTM.
 */

interface VersionSpec {
  version: number;
  size: number;
  totalDataCodewords: number;
  numBlocks: number;
  ecCodewordsPerBlock: number;
  alignmentCenters: number[];
}

const VERSION_SPECS: VersionSpec[] = [
  {
    version: 1,
    size: 21,
    totalDataCodewords: 16,
    numBlocks: 1,
    ecCodewordsPerBlock: 10,
    alignmentCenters: [],
  },
  {
    version: 2,
    size: 25,
    totalDataCodewords: 28,
    numBlocks: 1,
    ecCodewordsPerBlock: 16,
    alignmentCenters: [6, 18],
  },
  {
    version: 3,
    size: 29,
    totalDataCodewords: 44,
    numBlocks: 1,
    ecCodewordsPerBlock: 26,
    alignmentCenters: [6, 22],
  },
  {
    version: 4,
    size: 33,
    totalDataCodewords: 64,
    numBlocks: 2,
    ecCodewordsPerBlock: 18,
    alignmentCenters: [6, 26],
  },
  {
    version: 5,
    size: 37,
    totalDataCodewords: 86,
    numBlocks: 2,
    ecCodewordsPerBlock: 24,
    alignmentCenters: [6, 30],
  },
  {
    version: 6,
    size: 41,
    totalDataCodewords: 108,
    numBlocks: 4,
    ecCodewordsPerBlock: 16,
    alignmentCenters: [6, 34],
  },
];

// Tablas de Cuerpo Finito GF(256) con polinomio primitivo 0x11d
const GF_EXP = new Uint8Array(512);
const GF_LOG = new Uint8Array(256);

(() => {
  let value = 1;
  for (let i = 0; i < 255; i++) {
    GF_EXP[i] = value;
    GF_LOG[value] = i;
    value <<= 1;
    if (value & 0x100) {
      value ^= 0x11d;
    }
  }
  for (let i = 255; i < 512; i++) {
    GF_EXP[i] = GF_EXP[i - 255];
  }
})();

function gfMultiply(a: number, b: number): number {
  if (a === 0 || b === 0) return 0;
  return GF_EXP[GF_LOG[a] + GF_LOG[b]];
}

function buildGeneratorPolynomial(degree: number): number[] {
  let poly = [1];
  for (let i = 0; i < degree; i++) {
    const next = new Array(poly.length + 1).fill(0);
    for (let j = 0; j < poly.length; j++) {
      next[j] ^= poly[j];
      next[j + 1] ^= gfMultiply(poly[j], GF_EXP[i]);
    }
    poly = next;
  }
  return poly;
}

function computeReedSolomon(data: number[], ecLength: number): number[] {
  const generator = buildGeneratorPolynomial(ecLength);
  const message = [...data, ...new Array(ecLength).fill(0)];

  for (let i = 0; i < data.length; i++) {
    const coef = message[i];
    if (coef !== 0) {
      for (let j = 0; j < generator.length; j++) {
        message[i + j] ^= gfMultiply(generator[j], coef);
      }
    }
  }

  return message.slice(data.length);
}

function selectVersionSpec(byteLength: number): VersionSpec {
  const matched = VERSION_SPECS.find((spec) => byteLength + 2 <= spec.totalDataCodewords);
  if (!matched) {
    throw new Error(
      `Texto demasiado extenso para las versiones QR configuradas (${byteLength} bytes).`
    );
  }
  return matched;
}

function encodeDataCodewords(text: string, totalDataCodewords: number): number[] {
  const utf8Bytes = Array.from(new TextEncoder().encode(text));
  let bitString = '0100' + utf8Bytes.length.toString(2).padStart(8, '0');

  for (const byte of utf8Bytes) {
    bitString += byte.toString(2).padStart(8, '0');
  }

  const maxBits = totalDataCodewords * 8;
  const terminatorLength = Math.min(4, maxBits - bitString.length);
  bitString += '0'.repeat(terminatorLength);

  while (bitString.length % 8 !== 0) {
    bitString += '0';
  }

  const codewords: number[] = [];
  for (let i = 0; i < bitString.length; i += 8) {
    codewords.push(parseInt(bitString.slice(i, i + 8), 2));
  }

  const padBytes = [0xec, 0x11];
  let padIdx = 0;
  while (codewords.length < totalDataCodewords) {
    codewords.push(padBytes[padIdx % 2]);
    padIdx++;
  }

  return codewords;
}

function buildInterleavedCodewords(data: number[], spec: VersionSpec): number[] {
  const { totalDataCodewords, numBlocks, ecCodewordsPerBlock } = spec;
  const dataPerBlock = totalDataCodewords / numBlocks;

  const dataBlocks: number[][] = [];
  const ecBlocks: number[][] = [];

  for (let b = 0; b < numBlocks; b++) {
    const start = b * dataPerBlock;
    const blockData = data.slice(start, start + dataPerBlock);
    dataBlocks.push(blockData);
    ecBlocks.push(computeReedSolomon(blockData, ecCodewordsPerBlock));
  }

  const interleaved: number[] = [];

  for (let i = 0; i < dataPerBlock; i++) {
    for (let b = 0; b < numBlocks; b++) {
      interleaved.push(dataBlocks[b][i]);
    }
  }

  for (let i = 0; i < ecCodewordsPerBlock; i++) {
    for (let b = 0; b < numBlocks; b++) {
      interleaved.push(ecBlocks[b][i]);
    }
  }

  return interleaved;
}

function placeFinderPattern(
  modules: boolean[][],
  reserved: boolean[][],
  rowOffset: number,
  colOffset: number
): void {
  const size = modules.length;
  for (let r = -1; r <= 7; r++) {
    for (let c = -1; c <= 7; c++) {
      const row = rowOffset + r;
      const col = colOffset + c;
      if (row < 0 || row >= size || col < 0 || col >= size) continue;

      const isBorder = r === 0 || r === 6 || c === 0 || c === 6;
      const isInner = r >= 2 && r <= 4 && c >= 2 && c <= 4;
      const isInsideFinder = r >= 0 && r <= 6 && c >= 0 && c <= 6;

      modules[row][col] = isInsideFinder && (isBorder || isInner);
      reserved[row][col] = true;
    }
  }
}

function placeAlignmentPattern(
  modules: boolean[][],
  reserved: boolean[][],
  centerRow: number,
  centerCol: number
): void {
  for (let r = -2; r <= 2; r++) {
    for (let c = -2; c <= 2; c++) {
      const row = centerRow + r;
      const col = centerCol + c;
      const isBorder = Math.abs(r) === 2 || Math.abs(c) === 2;
      const isCenter = r === 0 && c === 0;
      modules[row][col] = isBorder || isCenter;
      reserved[row][col] = true;
    }
  }
}

function placeFormatBits(modules: boolean[][], reserved: boolean[][]): void {
  const size = modules.length;
  // Nivel M (00) + Máscara 0 (000) -> palabra BCH(15,5) con máscara XOR 0x5412
  const formatWord = 0x5412;
  const getBit = (bitIndex: number): boolean => ((formatWord >> bitIndex) & 1) === 1;

  const topLeftRowCoords = [0, 1, 2, 3, 4, 5, 7, 8];
  topLeftRowCoords.forEach((col, idx) => {
    modules[8][col] = getBit(14 - idx);
    reserved[8][col] = true;
  });

  const topLeftColCoords = [7, 5, 4, 3, 2, 1, 0];
  topLeftColCoords.forEach((row, idx) => {
    modules[row][8] = getBit(6 - idx);
    reserved[row][8] = true;
  });

  for (let i = 0; i < 7; i++) {
    const row = size - 1 - i;
    modules[row][8] = getBit(14 - i);
    reserved[row][8] = true;
  }

  for (let i = 0; i < 8; i++) {
    const col = size - 8 + i;
    modules[8][col] = getBit(7 - i);
    reserved[8][col] = true;
  }

  // Módulo oscuro fijo según estándar ISO
  modules[size - 8][8] = true;
  reserved[size - 8][8] = true;
}

export function generateQrMatrix(text: string): boolean[][] {
  const byteLength = new TextEncoder().encode(text).length;
  const spec = selectVersionSpec(byteLength);
  const { size, totalDataCodewords, alignmentCenters } = spec;

  const modules: boolean[][] = Array.from({ length: size }, () =>
    new Array<boolean>(size).fill(false)
  );
  const reserved: boolean[][] = Array.from({ length: size }, () =>
    new Array<boolean>(size).fill(false)
  );

  placeFinderPattern(modules, reserved, 0, 0);
  placeFinderPattern(modules, reserved, 0, size - 7);
  placeFinderPattern(modules, reserved, size - 7, 0);

  for (const r of alignmentCenters) {
    for (const c of alignmentCenters) {
      const overlapsFinder =
        (r <= 8 && c <= 8) ||
        (r <= 8 && c >= size - 9) ||
        (r >= size - 9 && c <= 8);
      if (!overlapsFinder) {
        placeAlignmentPattern(modules, reserved, r, c);
      }
    }
  }

  for (let i = 8; i < size - 8; i++) {
    if (!reserved[6][i]) {
      modules[6][i] = i % 2 === 0;
      reserved[6][i] = true;
    }
    if (!reserved[i][6]) {
      modules[i][6] = i % 2 === 0;
      reserved[i][6] = true;
    }
  }

  placeFormatBits(modules, reserved);

  const data = encodeDataCodewords(text, totalDataCodewords);
  const allCodewords = buildInterleavedCodewords(data, spec);

  const bits: boolean[] = [];
  for (const byte of allCodewords) {
    for (let b = 7; b >= 0; b--) {
      bits.push(((byte >> b) & 1) === 1);
    }
  }

  let bitIdx = 0;
  let upward = true;

  for (let rightCol = size - 1; rightCol >= 1; rightCol -= 2) {
    const colPair = rightCol <= 6 ? rightCol - 1 : rightCol;

    for (let step = 0; step < size; step++) {
      const row = upward ? size - 1 - step : step;

      for (let dCol = 0; dCol < 2; dCol++) {
        const col = colPair - dCol;
        if (reserved[row][col]) continue;

        const rawBit = bitIdx < bits.length ? bits[bitIdx++] : false;
        const maskBit = (row + col) % 2 === 0;
        modules[row][col] = rawBit ? !maskBit : maskBit;
      }
    }
    upward = !upward;
  }

  return modules;
}

export interface QrSvgOptions {
  margin?: number;
  darkColor?: string;
  lightColor?: string;
}

export function generateQrSvgString(text: string, options: QrSvgOptions = {}): string {
  const {
    margin = 4,
    darkColor = '#292524',
    lightColor = '#fafaf9',
  } = options;

  const matrix = generateQrMatrix(text);
  const matrixSize = matrix.length;
  const totalSize = matrixSize + margin * 2;

  const pathSegments: string[] = [];
  for (let r = 0; r < matrixSize; r++) {
    for (let c = 0; c < matrixSize; c++) {
      if (matrix[r][c]) {
        pathSegments.push(`M${c + margin} ${r + margin}h1v1h-1z`);
      }
    }
  }

  return [
    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${totalSize} ${totalSize}" shape-rendering="crispEdges">`,
    `<rect width="${totalSize}" height="${totalSize}" fill="${lightColor}" rx="2"/>`,
    `<path d="${pathSegments.join('')}" fill="${darkColor}"/>`,
    `</svg>`,
  ].join('');
}
