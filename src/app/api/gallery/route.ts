import { NextResponse } from 'next/server';
import { UBICACIONES_FOLDERS, TEMATICAS_FOLDERS } from '@/data/galleryMock';

function buildCloudinaryUrl(cloudName: string, resource: any): string {
  const template = "https://res.cloudinary.com/{cloudName}/image/upload/f_auto,q_auto/v{version}/{public_id}.{format}";
  return template
    .replace('{cloudName}', cloudName)
    .replace('{version}', String(resource.version))
    .replace('{public_id}', resource.public_id)
    .replace('{format}', resource.format || 'jpg');
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const getFolders = searchParams.get('getFolders');
  const parentFolder = searchParams.get('parentFolder');
  const folder = searchParams.get('folder');
  const tag = searchParams.get('tag');

  const cloudName = process.env.CLOUDINARY_CLOUD_NAME;
  const apiKey = process.env.CLOUDINARY_CLIENT_ID;
  const apiSecret = process.env.CLOUDINARY_CLIENT_SECRET;

  // Si no hay configuración de Cloudinary
  if (!cloudName || !apiKey || !apiSecret || apiKey.includes('<your_api_key>') || apiSecret.includes('<your_api_secret>')) {
    return NextResponse.json(
      { error: 'Falta configuración de Cloudinary en las variables de entorno' },
      { status: 500 }
    );
  }

  // Si se solicita las carpetas disponibles
  if (getFolders === 'true') {
    return NextResponse.json({
      ubicaciones: UBICACIONES_FOLDERS,
      tematicas: TEMATICAS_FOLDERS,
    });
  }

  // Si se solicita las subcarpetas de una ubicación
  if (parentFolder) {
    try {
      const auth = Buffer.from(`${apiKey}:${apiSecret}`).toString('base64');
      const url = `https://api.cloudinary.com/v1_1/${cloudName}/folders/${parentFolder}`;

      const res = await fetch(url, {
        headers: {
          Authorization: `Basic ${auth}`,
        },
        next: { revalidate: 60 } // caché de 1 minuto
      });

      if (res.ok) {
        const data = await res.json();
        if (data && data.folders) {
          return NextResponse.json(data);
        }
      }
      return NextResponse.json(
        { error: `Error al obtener subcarpetas de Cloudinary: ${res.statusText}` },
        { status: res.status }
      );
    } catch (error: any) {
      console.error('Error fetching folders from Cloudinary Admin API:', error);
      return NextResponse.json({ error: error.message || 'Internal Server Error' }, { status: 500 });
    }
  }

  // Si se solicita por tag (ej. gastronomia, actividades, o subcarpeta de ubicación)
  if (tag) {
    try {
      const url = `https://res.cloudinary.com/${cloudName}/image/list/${encodeURIComponent(tag)}.json`;
      const res = await fetch(url, {
        next: { revalidate: 60 }
      });

      if (res.ok) {
        const data = await res.json();
        if (data && data.resources) {
          const cloudinaryResources = data.resources.map((resource: any) => ({
            id: resource.asset_id || resource.public_id,
            type: 'image',
            src: buildCloudinaryUrl(cloudName, resource),
            alt: resource.public_id.split('/').pop() || 'Imagen de Cloudinary',
            title: resource.public_id.split('/').pop() || 'Imagen',
            folder: tag,
          }));
          return NextResponse.json(cloudinaryResources);
        }
      }
      return NextResponse.json(
        { error: `Error al obtener los recursos para el tag "${tag}": ${res.statusText}` },
        { status: res.status }
      );
    } catch (error: any) {
      console.error('Error fetching by tag from Cloudinary public JSON:', error);
      return NextResponse.json({ error: error.message || 'Internal Server Error' }, { status: 500 });
    }
  }

  // Si se solicita el contenido de una carpeta vieja (compatibilidad/fallback)
  if (folder) {
    try {
      const auth = Buffer.from(`${apiKey}:${apiSecret}`).toString('base64');
      const url = `https://api.cloudinary.com/v1_1/${cloudName}/resources/image?prefix=${encodeURIComponent(folder)}&type=upload&max_results=50`;

      const res = await fetch(url, {
        headers: {
          Authorization: `Basic ${auth}`,
        },
        next: { revalidate: 60 } // caché de 1 minuto
      });

      if (res.ok) {
        const data = await res.json();
        const cloudinaryResources = data.resources.map((resource: any) => ({
          id: resource.asset_id,
          type: 'image',
          src: buildCloudinaryUrl(cloudName, resource),
          alt: resource.public_id.split('/').pop() || 'Imagen de Cloudinary',
          title: resource.public_id.split('/').pop() || 'Imagen',
          folder: folder,
        }));
        return NextResponse.json(cloudinaryResources);
      }
      return NextResponse.json(
        { error: `Error al obtener recursos del prefijo "${folder}": ${res.statusText}` },
        { status: res.status }
      );
    } catch (error: any) {
      console.error('Error fetching from Cloudinary API:', error);
      return NextResponse.json({ error: error.message || 'Internal Server Error' }, { status: 500 });
    }
  }

  return NextResponse.json({ error: 'Falta parámetro tag, parentFolder, folder o getFolders' }, { status: 400 });
}
