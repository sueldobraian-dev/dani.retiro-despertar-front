'use client';

import { useState, useEffect } from 'react';
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

    const fetchMedia = async () => {
      setMediaItems([]);
      setVisibleCount(10);
      if (isLocation) {
        if (!activeSubfolder) {
          return;
        }
        setLoading(true);
        try {
          const response = await fetch(`/api/gallery?tag=${encodeURIComponent(activeSubfolder.name)}`);
          if (response.ok) {
            const data = await response.json();
            setMediaItems(data);
          }
        } catch (error) {
          console.error('Error fetching media assets:', error);
        } finally {
          setLoading(false);
        }
      } else {
        setLoading(true);
        try {
          const response = await fetch(`/api/gallery?tag=${encodeURIComponent(activeFolder)}`);
          if (response.ok) {
            const data = await response.json();
            setMediaItems(data);
          }
        } catch (error) {
          console.error('Error fetching media assets:', error);
        } finally {
          setLoading(false);
        }
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

        {/* Grid */}
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {[1, 2, 3, 4].map((n) => (
              <div key={n} className="w-full aspect-video rounded-2xl border border-stone-200/60 overflow-hidden bg-stone-200 animate-pulse" />
            ))}
          </div>
        ) : mediaItems.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-stone-500">No se encontraron archivos en esta carpeta.</p>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {mediaItems.slice(0, visibleCount).map((item) => (
                <div
                  key={item.id}
                  className="relative w-full aspect-video rounded-2xl overflow-hidden bg-stone-100 border border-stone-200 shadow-sm hover:shadow-md transition-all duration-300 group"
                >
                  {item.type === 'image' ? (
                    <Image
                      src={item.src}
                      alt={item.alt}
                      fill
                      loading="lazy"
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                      className="object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                    />
                  ) : (
                    <iframe
                      src={`https://www.youtube.com/embed/${item.src}?rel=0`}
                      title={item.title}
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                      className="w-full h-full border-0"
                    />
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

      </div>
    </section>
  );
}

