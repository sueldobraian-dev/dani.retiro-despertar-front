'use client';

import { useEffect } from 'react';
import Link from 'next/link';

interface ErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function GalleryError({ error, reset }: ErrorProps) {
  const showDetailed = process.env.NEXT_PUBLIC_SHOW_DETAILED_ERRORS === 'true';

  useEffect(() => {
    // Log the error to an external service or console for developers
    console.error('Gallery Route Error:', error);
  }, [error]);

  return (
    <div className="min-h-[70vh] flex items-center justify-center bg-stone-50 px-4 py-16">
      <div className="max-w-xl w-full bg-white rounded-3xl border border-stone-200/60 p-8 md:p-10 shadow-sm text-center">
        {showDetailed ? (
          // Vista detallada de desarrollo
          <div className="text-left">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-red-100 text-red-800 border border-red-200">
              Modo Desarrollo Activo
            </span>
            <h2 className="text-2xl font-serif text-stone-800 mt-4 font-bold">
              Error Detectado en Galería
            </h2>
            <div className="mt-4 p-4 bg-stone-100 rounded-xl border border-stone-200 overflow-x-auto text-xs font-mono text-stone-700 space-y-2">
              <p><strong>Mensaje:</strong> {error.message}</p>
              {error.digest && <p><strong>Digest:</strong> {error.digest}</p>}
              {error.stack && (
                <pre className="whitespace-pre-wrap mt-2 pt-2 border-t border-stone-200 text-[10px]">
                  {error.stack}
                </pre>
              )}
            </div>
            <div className="mt-6 flex flex-wrap gap-4">
              <button
                onClick={() => reset()}
                className="px-6 py-2.5 bg-red-600 hover:bg-red-700 text-stone-50 rounded-full text-sm font-semibold transition"
              >
                Reintentar Renderizado
              </button>
              <Link
                href="/"
                className="px-6 py-2.5 border border-stone-200 hover:bg-stone-50 text-stone-700 rounded-full text-sm font-semibold transition"
              >
                Volver al Inicio
              </Link>
            </div>
          </div>
        ) : (
          // Vista amigable para el cliente
          <div className="flex flex-col items-center">
            <div className="w-16 h-16 rounded-full bg-amber-50 border border-amber-200/50 flex items-center justify-center text-amber-600 mb-6 animate-pulse">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-8 h-8"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z"
                />
              </svg>
            </div>

            <span className="text-emerald-800 font-semibold tracking-wider uppercase text-xs">
              Conexión Externa
            </span>
            <h2 className="text-3xl font-serif text-stone-800 mt-2">
              Galería en Mantenimiento
            </h2>
            <p className="text-stone-600 mt-4 text-sm md:text-base leading-relaxed max-w-sm">
              Estamos teniendo dificultades para conectar con el servidor multimedia. Por favor, intenta de nuevo en unos instantes.
            </p>

            <div className="mt-8 flex flex-col sm:flex-row gap-4 w-full justify-center">
              <button
                onClick={() => reset()}
                className="px-8 py-3 bg-emerald-700 hover:bg-emerald-800 text-stone-50 rounded-full font-medium transition duration-300 shadow-sm"
              >
                Intentar Nuevamente
              </button>
              <Link
                href="/"
                className="px-8 py-3 border border-stone-200 hover:border-stone-400 text-stone-700 rounded-full font-medium transition duration-300 bg-white/50"
              >
                Volver al Inicio
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
