// 1. Interfaces & Types
export interface MediaItem {
  id: string;
  type: 'image' | 'video';
  src: string; // Cloudinary optimized URL or YouTube video ID
  alt: string;
  title: string;
  folder: string;
}

export interface Folder {
  name: string;
  path: string;
}

// Helper to generate optimized Cloudinary URLs
const getCloudinaryUrl = (publicId: string, cloudName = 'demo') => {
  return `https://res.cloudinary.com/${cloudName}/image/upload/f_auto,q_auto/${publicId}`;
};

// Estructura de carpetas iniciales
export const UBICACIONES_FOLDERS: Folder[] = [
  { name: 'Finca los Coipos (Chascomús)', path: 'retiro-despertar/chascomus-finca-los-coipos' },
  { name: 'Complejo Minahasa (Tigre - delta)', path: 'retiro-despertar/tigre-delta-minahasa' },
];

export const TEMATICAS_FOLDERS: Folder[] = [
  { name: 'Gastronomía', path: 'gastronomia' },
  { name: 'Actividades', path: 'actividades' },
];

