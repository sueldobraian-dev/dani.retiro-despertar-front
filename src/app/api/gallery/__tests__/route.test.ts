import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { GET } from '../route';
import { UBICACIONES_FOLDERS, TEMATICAS_FOLDERS } from '@/data/galleryMock';

// Guardar variables de entorno originales
const originalEnv = { ...process.env };

describe('Gallery API Route', () => {
  beforeEach(() => {
    vi.stubGlobal('fetch', vi.fn());
    process.env.CLOUDINARY_CLOUD_NAME = 'test_cloud';
    process.env.CLOUDINARY_CLIENT_ID = 'test_api_key';
    process.env.CLOUDINARY_CLIENT_SECRET = 'test_api_secret';
  });

  afterEach(() => {
    vi.unstubAllGlobals();
    process.env = { ...originalEnv };
  });

  it('should return 500 when Cloudinary credentials are missing', async () => {
    delete process.env.CLOUDINARY_CLOUD_NAME;

    const req = new Request('http://localhost:3000/api/gallery?getFolders=true');
    const response = await GET(req);
    expect(response.status).toBe(500);

    const json = await response.json();
    expect(json.error).toContain('Falta configuración de Cloudinary');
  });

  it('should return folders when getFolders=true parameter is provided', async () => {
    const req = new Request('http://localhost:3000/api/gallery?getFolders=true');
    const response = await GET(req);
    expect(response.status).toBe(200);

    const json = await response.json();
    expect(json.ubicaciones).toEqual(UBICACIONES_FOLDERS);
    expect(json.tematicas).toEqual(TEMATICAS_FOLDERS);
  });

  it('should return 400 when no valid parameter is provided', async () => {
    const req = new Request('http://localhost:3000/api/gallery');
    const response = await GET(req);
    expect(response.status).toBe(400);

    const json = await response.json();
    expect(json.error).toContain('Falta parámetro');
  });

  it('should return resource list from handleTag strategy when tag parameter is provided', async () => {
    const mockCloudinaryResources = {
      resources: [
        {
          asset_id: 'asset123',
          public_id: 'gallery/gastronomia/plate1',
          version: 123456,
          format: 'jpg',
        }
      ]
    };

    const mockFetch = vi.mocked(fetch).mockResolvedValueOnce({
      ok: true,
      json: async () => mockCloudinaryResources,
    } as Response);

    const req = new Request('http://localhost:3000/api/gallery?tag=gastronomia');
    const response = await GET(req);
    expect(response.status).toBe(200);

    expect(mockFetch).toHaveBeenCalledWith(
      'https://res.cloudinary.com/test_cloud/image/list/gastronomia.json',
      expect.any(Object)
    );

    const json = await response.json();
    expect(json).toHaveLength(1);
    expect(json[0].id).toBe('asset123');
    expect(json[0].src).toContain('gallery/gastronomia/plate1.jpg');
    expect(json[0].folder).toBe('gastronomia');
  });

  it('should return subfolders from handleParentFolder strategy when parentFolder is provided', async () => {
    const mockSubfolders = {
      folders: [
        { name: '2026-chascomus-abril', path: '2026-chascomus-abril' }
      ]
    };

    const mockFetch = vi.mocked(fetch).mockResolvedValueOnce({
      ok: true,
      json: async () => mockSubfolders,
    } as Response);

    const req = new Request('http://localhost:3000/api/gallery?parentFolder=retiro-despertar');
    const response = await GET(req);
    expect(response.status).toBe(200);

    expect(mockFetch).toHaveBeenCalledWith(
      'https://api.cloudinary.com/v1_1/test_cloud/folders/retiro-despertar',
      expect.any(Object)
    );

    const json = await response.json();
    expect(json.folders).toEqual(mockSubfolders.folders);
  });

  it('should return resource list from handleFolder strategy when folder parameter is provided', async () => {
    const mockResources = {
      resources: [
        {
          asset_id: 'img456',
          public_id: 'retiro/2026-chascomus/01-yoga',
          version: 7890,
          format: 'png',
        }
      ]
    };

    const mockFetch = vi.mocked(fetch).mockResolvedValueOnce({
      ok: true,
      json: async () => mockResources,
    } as Response);

    const req = new Request('http://localhost:3000/api/gallery?folder=retiro/2026-chascomus');
    const response = await GET(req);
    expect(response.status).toBe(200);

    expect(mockFetch).toHaveBeenCalledWith(
      expect.stringContaining('resources/image?prefix=retiro%2F2026-chascomus'),
      expect.any(Object)
    );

    const json = await response.json();
    expect(json).toHaveLength(1);
    expect(json[0].id).toBe('img456');
    expect(json[0].order).toBe(1); // Parsed order from prefix '01-yoga'
  });
});
