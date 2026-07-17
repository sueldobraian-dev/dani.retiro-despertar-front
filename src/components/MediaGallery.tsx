'use client';

import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { MediaItem, Folder } from '@/data/galleryMock';

export default function MediaGallery() {
  const [activeFolder, setActiveFolder] = useState<string>('gastronomia');
  const [mediaItems, setMediaItems] = useState<MediaItem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [loadingFolders, setLoadingFolders] = useState<boolean>(true);

  // Carpetas cargadas dinámicamente desde la API
  const [ubicaciones, setUbicaciones] = useState<Folder[]>([]);
  const [tematicas, setTematicas] = useState<Folder[]>([]);

  // Subcarpetas de ubicación activa
  const [subfolders, setSubfolders] = useState<Folder[]>([]);
  const [activeSubfolder, setActiveSubfolder] = useState<Folder | null>(null);
  const [loadingSubfolders, setLoadingSubfolders] = useState<boolean>(false);

  // Cantidad de imágenes visibles (paginación de a 10)
  const [visibleCount, setVisibleCount] = useState<number>(10);

  // Lightbox state
  const [selectedImageIndex, setSelectedImageIndex] = useState<number | null>(null);

  // Caché de recursos de la galería en memoria
  const cacheRef = useRef<Record<string, MediaItem[]>>({});

  const imagesOnly = mediaItems.filter((item) => item.type === 'image');

  const handleNextImage = () => {
    if (selectedImageIndex === null || imagesOnly.length === 0) return;
    setSelectedImageIndex((prev) => (prev !== null && prev < imagesOnly.length - 1 ? prev + 1 : 0));
  };

  const handlePrevImage = () => {
    if (selectedImageIndex === null || imagesOnly.length === 0) return;
    setSelectedImageIndex((prev) => (prev !== null && prev > 0 ? prev - 1 : imagesOnly.length - 1));
  };

  const triggerDownload = (url: string, filename: string) => {
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', filename);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const downloadImage = async (url: string, filename: string) => {
    try {
      if (url.includes('res.cloudinary.com')) {
        const downloadUrl = url.replace('/upload/', '/upload/fl_attachment/');
        triggerDownload(downloadUrl, filename);
        return;
      }
      
      const response = await fetch(url);
      const blob = await response.blob();
      const blobUrl = window.URL.createObjectURL(blob);
      triggerDownload(blobUrl, filename);
      window.URL.revokeObjectURL(blobUrl);
    } catch (error) {
      console.error('Error downloading image:', error);
      window.open(url, '_blank');
    }
  };

  // Keyboard navigation for Lightbox
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (selectedImageIndex === null) return;
      if (e.key === 'Escape') {
        setSelectedImageIndex(null);
      } else if (e.key === 'ArrowRight') {
        handleNextImage();
      } else if (e.key === 'ArrowLeft') {
        handlePrevImage();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedImageIndex, imagesOnly.length]);

  // 1. Obtener la estructura de carpetas de forma dinámica al montar
  useEffect(() => {
    const fetchFolders = async () => {
      try {
        const response = await fetch('/api/gallery?getFolders=true');
        if (response.ok) {
          const data = await response.json();
          setUbicaciones(data.ubicaciones || []);
          setTematicas(data.tematicas || []);
        }
      } catch (error) {
        console.error('Error fetching folders:', error);
      } finally {
        setLoadingFolders(false);
      }
    };
    fetchFolders();
  }, []);

  // 2. Escuchar cambios en la URL (hash) para activar carpetas específicas
  useEffect(() => {
    const handleHashChange = () => {
      if (window.location.hash === '#galeria-testimonios') {
        setActiveFolder('testimonios');
        const el = document.getElementById('galeria');
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      } else if (window.location.hash === '#galeria') {
        const el = document.getElementById('galeria');
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }
    };

    window.addEventListener('hashchange', handleHashChange);
    handleHashChange(); // Check on mount
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  // 3. Obtener subcarpetas cuando se selecciona una ubicación
  useEffect(() => {
    const isLocation = ubicaciones.some((u) => u.path === activeFolder);
    if (!isLocation) {
      setSubfolders([]);
      setActiveSubfolder(null);
      return;
    }

    const fetchSubfolders = async () => {
      setLoadingSubfolders(true);
      try {
        const response = await fetch(`/api/gallery?parentFolder=${activeFolder}`);
        if (response.ok) {
          const data = await response.json();
          const folders = data.folders || [];
          setSubfolders(folders);
          if (folders.length > 0) {
            setActiveSubfolder(folders[0]);
          } else {
            setActiveSubfolder(null);
          }
        }
      } catch (error) {
        console.error('Error fetching subfolders:', error);
        setSubfolders([]);
        setActiveSubfolder(null);
      } finally {
        setLoadingSubfolders(false);
      }
    };

    fetchSubfolders();
  }, [activeFolder, ubicaciones]);

  // 4. Obtener el contenido multimedia de la carpeta activa o subcarpeta dinámicamente
  useEffect(() => {
    const isLocation = ubicaciones.some((u) => u.path === activeFolder);
    const targetTag = isLocation ? activeSubfolder?.name : activeFolder;

    if (isLocation && !activeSubfolder) {
      setMediaItems([]);
      return;
    }

    if (!targetTag) return;

    // Utilizar caché si está disponible para evitar peticiones de red redundantes
    if (cacheRef.current[targetTag]) {
      setMediaItems(cacheRef.current[targetTag]);
      setVisibleCount(10);
      setLoading(false);
      return;
    }

    const fetchMedia = async () => {
      setMediaItems([]);
      setVisibleCount(10);
      setLoading(true);
      try {
        const response = await fetch(`/api/gallery?tag=${encodeURIComponent(targetTag)}`);
        if (response.ok) {
          const data = await response.json();
          cacheRef.current[targetTag] = data;
          setMediaItems(data);
        }
      } catch (error) {
        console.error('Error fetching media assets:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchMedia();
  }, [activeFolder, activeSubfolder, ubicaciones]);

  const FolderButton = ({ folder }: { folder: Folder }) => {
    const isActive = activeFolder === folder.path;
    return (
      <button
        onClick={() => setActiveFolder(folder.path)}
        className={`px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-300 ${isActive
            ? 'bg-emerald-700 text-stone-50 shadow-md shadow-emerald-950/15'
            : 'bg-stone-100 hover:bg-stone-200/80 text-stone-700 hover:text-stone-900 border border-stone-200/50'
          }`}
      >
        <span className="flex items-center gap-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
            className="w-4 h-4"
          >
            <path d="M3.75 3A1.75 1.75 0 002 4.75v10.5c0 .966.784 1.75 1.75 1.75h12.5A1.75 1.75 0 0018 15.25v-8.5A1.75 1.75 0 0016.25 5h-4.836a.25.25 0 01-.177-.073L9.823 3.513A1.75 1.75 0 008.586 3H3.75z" />
          </svg>
          {folder.name}
        </span>
      </button>
    );
  };

  return (
    <section id="galeria" className="py-16 bg-stone-50 border-y border-stone-200/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-10">
          <span className="text-emerald-800 font-semibold tracking-wider uppercase text-sm">
            Galería del Despertar
          </span>
          <h2 className="text-3xl md:text-4xl font-serif text-stone-800 mt-2">
            Galería de Experiencias
          </h2>
          <p className="text-stone-600 mt-3 text-base">
            Descubre los rincones que nos hospedan y las disciplinas que guían nuestro camino.
          </p>
        </div>

        {/* Double-Level Navigation */}
        <div className="bg-white p-6 rounded-3xl border border-stone-200/50 shadow-sm max-w-4xl mx-auto mb-12">
          {loadingFolders ? (
            <div className="space-y-4 animate-pulse">
              <div className="h-4 bg-stone-200 rounded w-1/4" />
              <div className="flex gap-2"><div className="h-8 bg-stone-200 rounded w-24" /><div className="h-8 bg-stone-200 rounded w-24" /></div>
            </div>
          ) : (
            <>
              {/* Level 1: Disciplinas y Vivencias */}
              {tematicas.length > 0 && (
                <div className="mb-5">
                  <span className="block text-xs font-semibold text-stone-400 uppercase tracking-wider mb-3">
                    Disciplinas y Vivencias
                  </span>
                  <div className="flex flex-wrap gap-3">
                    {tematicas.map((folder) => (
                      <FolderButton key={folder.path} folder={folder} />
                    ))}
                  </div>
                </div>
              )}

              {/* Separator */}
              {ubicaciones.length > 0 && tematicas.length > 0 && (
                <div className="border-t border-stone-100 my-4" />
              )}

              {/* Level 2: Ubicaciones / Espacios */}
              {ubicaciones.length > 0 && (
                <div>
                  <span className="block text-xs font-semibold text-stone-400 uppercase tracking-wider mb-3">
                    Ubicaciones / Espacios
                  </span>
                  <div className="flex flex-wrap gap-3">
                    {ubicaciones.map((folder) => (
                      <FolderButton key={folder.path} folder={folder} />
                    ))}
                  </div>
                </div>
              )}

              {/* Level 3: Subfolders for locations */}
              {loadingSubfolders ? (
                <div className="mt-5 pt-5 border-t border-stone-100 animate-pulse">
                  <div className="h-3 bg-stone-200 rounded w-1/6 mb-3" />
                  <div className="flex gap-2"><div className="h-7 bg-stone-200 rounded w-32" /></div>
                </div>
              ) : subfolders.length > 0 && (
                <div className="mt-5 pt-5 border-t border-stone-100">
                  <span className="block text-xs font-semibold text-stone-400 uppercase tracking-wider mb-3">
                    Fechas y Encuentros
                  </span>
                  <div className="flex flex-wrap gap-2.5">
                    {subfolders.map((sub) => {
                      const isSubActive = activeSubfolder?.path === sub.path;
                      return (
                        <button
                          key={sub.path}
                          onClick={() => setActiveSubfolder(sub)}
                          className={`px-4 py-2 rounded-xl text-xs font-medium transition-all duration-300 ${isSubActive
                              ? 'bg-stone-800 text-stone-50 shadow-sm'
                              : 'bg-stone-100 hover:bg-stone-200/80 text-stone-600 hover:text-stone-800 border border-stone-200/30'
                            }`}
                        >
                          {sub.name}
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}
            </>
          )}
        </div>

        {/* Grid (Masonry using CSS Columns) */}
        {loading ? (
          <div className="columns-1 sm:columns-2 md:columns-3 lg:columns-4 gap-6 space-y-6">
            {[1, 2, 3, 4].map((n) => (
              <div key={n} className="break-inside-avoid mb-6 w-full aspect-[4/3] rounded-2xl border border-stone-200/60 overflow-hidden bg-stone-200 animate-pulse" />
            ))}
          </div>
        ) : mediaItems.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-stone-500">No se encontraron archivos en esta carpeta.</p>
          </div>
        ) : (
          <>
            <div className="columns-1 sm:columns-2 md:columns-3 lg:columns-4 gap-6 space-y-6">
              {mediaItems.slice(0, visibleCount).map((item) => (
                <div
                  key={item.id}
                  className={`break-inside-avoid mb-6 w-full rounded-2xl overflow-hidden bg-stone-100 border border-stone-200 shadow-sm hover:shadow-md transition-all duration-300 group inline-block ${
                    item.type === 'image' ? 'cursor-pointer' : ''
                  }`}
                  onClick={() => {
                    if (item.type === 'image') {
                      const idx = imagesOnly.findIndex((img) => img.id === item.id);
                      if (idx !== -1) setSelectedImageIndex(idx);
                    }
                  }}
                >
                  {item.type === 'image' ? (
                    <div className="relative w-full overflow-hidden">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={item.src}
                        alt={item.alt}
                        loading="lazy"
                        className="w-full h-auto object-cover group-hover:scale-105 transition-transform duration-500 ease-out rounded-2xl"
                      />
                    </div>
                  ) : (
                    <div className="relative w-full aspect-video">
                      <iframe
                        src={`https://www.youtube.com/embed/${item.src}?rel=0`}
                        title={item.title}
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                        className="w-full h-full border-0"
                      />
                    </div>
                  )}
                </div>
              ))}
            </div>

            {mediaItems.length > visibleCount && (
              <div className="text-center mt-10">
                <button
                  onClick={() => setVisibleCount((prev) => prev + 10)}
                  className="px-6 py-3 bg-emerald-700 hover:bg-emerald-800 text-stone-50 rounded-full font-medium transition-colors duration-300 shadow-md shadow-emerald-950/10"
                >
                  Cargar más
                </button>
              </div>
            )}
          </>
        )}

        {/* Lightbox Modal */}
        {selectedImageIndex !== null && imagesOnly[selectedImageIndex] && (
          <div className="fixed inset-0 z-50 flex flex-col items-center justify-between p-4 bg-stone-950/95 backdrop-blur-sm transition-opacity duration-300">
            {/* Top Bar */}
            <div className="w-full flex items-center justify-between max-w-7xl px-4 py-2">
              <span className="text-stone-400 text-sm font-medium">
                {selectedImageIndex + 1} de {imagesOnly.length}
              </span>
              <div className="flex items-center gap-3">
                <button
                  onClick={() => downloadImage(imagesOnly[selectedImageIndex].largeSrc || imagesOnly[selectedImageIndex].src, imagesOnly[selectedImageIndex].alt || 'foto-retiro')}
                  className="flex items-center gap-2 px-4 py-2 text-stone-200 hover:text-white bg-stone-900/80 hover:bg-stone-800 rounded-full text-xs font-semibold border border-stone-800 transition-all duration-300 shadow-sm"
                  title="Descargar Foto"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3" />
                  </svg>
                  Descargar
                </button>
                <button
                  onClick={() => setSelectedImageIndex(null)}
                  className="p-2 text-stone-400 hover:text-white bg-stone-900/80 hover:bg-stone-800 rounded-full border border-stone-800 transition-all duration-300"
                  aria-label="Cerrar modal"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-5 h-5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            </div>

            {/* Main Area: Image and Navigation Arrows */}
            <div className="relative flex-1 w-full flex items-center justify-center max-w-7xl">
              {/* Left Arrow */}
              <button
                onClick={handlePrevImage}
                className="absolute left-2 md:left-4 z-10 p-3 text-stone-400 hover:text-white bg-stone-900/60 hover:bg-stone-800 rounded-full transition-all duration-300 border border-stone-800/40"
                aria-label="Imagen anterior"
              >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-6 h-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
                </svg>
              </button>

              {/* Image Container */}
              <div className="relative w-full h-[70vh] max-w-4xl flex items-center justify-center p-2">
                <Image
                  src={imagesOnly[selectedImageIndex].largeSrc || imagesOnly[selectedImageIndex].src}
                  alt={imagesOnly[selectedImageIndex].alt}
                  fill
                  sizes="(max-width: 1024px) 100vw, 1024px"
                  className="object-contain max-h-full max-w-full select-none rounded-2xl"
                  priority
                />
              </div>

              {/* Right Arrow */}
              <button
                onClick={handleNextImage}
                className="absolute right-2 md:right-4 z-10 p-3 text-stone-400 hover:text-white bg-stone-900/60 hover:bg-stone-800 rounded-full transition-all duration-300 border border-stone-800/40"
                aria-label="Imagen siguiente"
              >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-6 h-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                </svg>
              </button>
            </div>

            {/* Bottom Bar: Title/Caption */}
            <div className="w-full text-center py-4 px-6 max-w-2xl">
              <p className="text-stone-300 text-sm tracking-wide font-medium">
                {imagesOnly[selectedImageIndex].title || imagesOnly[selectedImageIndex].alt}
              </p>
            </div>
          </div>
        )}

      </div>
    </section>
  );
}

