import { NextResponse } from 'next/server';
import { UBICACIONES_FOLDERS, TEMATICAS_FOLDERS } from '@/data/galleryMock';

interface CloudinaryCredentials {
  cloudName: string;
  apiKey: string;
  apiSecret: string;
}

const ORDER_PREFIX_REGEX = /^(\d+)[-_]/;

function buildCloudinaryUrl(cloudName: string, resource: any, transformations = 'f_auto,q_auto'): string {
  const template = "https://res.cloudinary.com/{cloudName}/image/upload/{transformations}/v{version}/{public_id}.{format}";
  return template
    .replace('{cloudName}', cloudName)
    .replace('{transformations}', transformations)
    .replace('{version}', String(resource.version))
    .replace('{public_id}', resource.public_id)
    .replace('{format}', resource.format || 'jpg');
}

function getCloudinaryAuthHeader(creds: CloudinaryCredentials): { Authorization: string } {
  const auth = Buffer.from(`${creds.apiKey}:${creds.apiSecret}`).toString('base64');
  return { Authorization: `Basic ${auth}` };
}

function getAssetOrder(resource: any): number {
  const contextOrder = resource.context?.custom?.order ?? resource.context?.order;
  if (contextOrder) {
    const parsed = parseInt(contextOrder, 10);
    if (!Number.isNaN(parsed)) return parsed;
  }

  const filename = (resource.public_id || '').split('/').pop() || '';
  const match = ORDER_PREFIX_REGEX.exec(filename);
  if (match) {
    const parsed = parseInt(match[1], 10);
    if (!Number.isNaN(parsed)) return parsed;
  }

  return Infinity;
}

function getCloudinaryCredentials(): CloudinaryCredentials | null {
  const cloudName = process.env.CLOUDINARY_CLOUD_NAME;
  const apiKey = process.env.CLOUDINARY_CLIENT_ID;
  const apiSecret = process.env.CLOUDINARY_CLIENT_SECRET;

  if (!cloudName || !apiKey || !apiSecret || apiKey.includes('<your_api_key>') || apiSecret.includes('<your_api_secret>')) {
    return null;
  }
  return { cloudName, apiKey, apiSecret };
}

// 1. Handler para obtener las carpetas iniciales
function handleGetFolders() {
  return NextResponse.json({
    ubicaciones: UBICACIONES_FOLDERS,
    tematicas: TEMATICAS_FOLDERS,
  });
}

// 2. Handler para obtener las subcarpetas de una ubicación
async function handleParentFolder(parentFolder: string, creds: CloudinaryCredentials) {
  const url = `https://api.cloudinary.com/v1_1/${creds.cloudName}/folders/${encodeURIComponent(parentFolder)}`;

  const res = await fetch(url, {
    headers: getCloudinaryAuthHeader(creds),
    next: { revalidate: 60 }
  });

  if (!res.ok) {
    return NextResponse.json(
      { error: `Error al obtener subcarpetas de Cloudinary: ${res.statusText}` },
      { status: res.status }
    );
  }

  const data = await res.json();
  return NextResponse.json(data);
}

// 3. Handler para obtener recursos por tag
async function handleTag(tag: string, cloudName: string) {
  const url = `https://res.cloudinary.com/${cloudName}/image/list/${encodeURIComponent(tag)}.json`;
  const res = await fetch(url, {
    next: { revalidate: 60 }
  });

  if (!res.ok) {
    return NextResponse.json(
      { error: `Error al obtener los recursos para el tag "${tag}": ${res.statusText}` },
      { status: res.status }
    );
  }

  const data = await res.json();
  const resources = (data.resources || []).map((resource: any) => ({
    id: resource.asset_id || resource.public_id,
    type: 'image',
    src: buildCloudinaryUrl(cloudName, resource, 'f_auto,q_auto,w_600,c_limit'),
    largeSrc: buildCloudinaryUrl(cloudName, resource, 'f_auto,q_auto,w_1600,c_limit'),
    alt: resource.public_id.split('/').pop() || 'Imagen',
    title: resource.public_id.split('/').pop() || 'Imagen',
    folder: tag,
    order: getAssetOrder(resource),
  }));

  resources.sort((a: any, b: any) => a.order - b.order);
  return NextResponse.json(resources);
}

// 4. Handler para obtener recursos por prefijo de carpeta (compatibilidad)
async function handleFolder(folder: string, creds: CloudinaryCredentials) {
  const url = `https://api.cloudinary.com/v1_1/${creds.cloudName}/resources/image?prefix=${encodeURIComponent(folder)}&type=upload&max_results=50&context=true`;

  const res = await fetch(url, {
    headers: getCloudinaryAuthHeader(creds),
    next: { revalidate: 60 }
  });

  if (!res.ok) {
    return NextResponse.json(
      { error: `Error al obtener recursos del prefijo "${folder}": ${res.statusText}` },
      { status: res.status }
    );
  }

  const data = await res.json();
  const resources = (data.resources || []).map((resource: any) => ({
    id: resource.asset_id,
    type: 'image',
    src: buildCloudinaryUrl(creds.cloudName, resource, 'f_auto,q_auto,w_600,c_limit'),
    largeSrc: buildCloudinaryUrl(creds.cloudName, resource, 'f_auto,q_auto,w_1600,c_limit'),
    alt: resource.public_id.split('/').pop() || 'Imagen',
    title: resource.public_id.split('/').pop() || 'Imagen',
    folder: folder,
    order: getAssetOrder(resource),
  }));

  resources.sort((a: any, b: any) => a.order - b.order);
  return NextResponse.json(resources);
}

export async function GET(request: Request) {
  const creds = getCloudinaryCredentials();
  if (!creds) {
    return NextResponse.json(
      { error: 'Falta configuración de Cloudinary en las variables de entorno' },
      { status: 500 }
    );
  }

  const { searchParams } = new URL(request.url);
  const getFolders = searchParams.get('getFolders');
  const parentFolder = searchParams.get('parentFolder');
  const tag = searchParams.get('tag');
  const folder = searchParams.get('folder');

  try {
    if (getFolders === 'true') {
      return handleGetFolders();
    }
    if (parentFolder) {
      return await handleParentFolder(parentFolder, creds);
    }
    if (tag) {
      return await handleTag(tag, creds.cloudName);
    }
    if (folder) {
      return await handleFolder(folder, creds);
    }

    return NextResponse.json(
      { error: 'Falta parámetro tag, parentFolder, folder o getFolders' },
      { status: 400 }
    );
  } catch (error: any) {
    console.error('API Gallery Handler Error:', error);
    return NextResponse.json(
      { error: 'Error interno del servidor al obtener la galería', details: error.message },
      { status: 500 }
    );
  }
}
