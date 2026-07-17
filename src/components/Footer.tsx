'use client';

import Link from 'next/link';

export default function Footer() {
  // Can be hardcoded to "Julio 2026" matching current local date
  const lastUpdate = 'Julio 2026';

  return (
    <footer className="bg-stone-900 text-stone-400 py-12 border-t border-stone-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Logo & Copyright */}
          <div className="text-center md:text-left">
            <h3 className="font-serif text-stone-100 text-lg tracking-wider font-semibold">
              Retiro Despertar
            </h3>
            <p className="text-xs text-stone-500 mt-1">
              © {new Date().getFullYear()} Todos los derechos reservados.
            </p>
          </div>

          {/* Metadata & Credits */}
          <div className="flex flex-col items-center md:items-end gap-2 text-sm text-stone-400">
            <div>
              <span className="text-stone-500">Última actualización:</span>{' '}
              <span className="text-stone-300 font-medium">{lastUpdate}</span>
            </div>
            <div className="flex flex-wrap justify-center md:justify-end gap-x-2 gap-y-1 text-xs">
              <span>
                Designed by{' '}
                <a
                  href="https://www.linkedin.com/in/braian-sueldo/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-stone-300 hover:text-emerald-400 transition-colors duration-300 underline underline-offset-4 decoration-stone-700 hover:decoration-emerald-400"
                >
                  Braian Sueldo
                </a>
              </span>
              <span className="text-stone-700">|</span>
              <span>
                Administered by{' '}
                <a
                  href="https://www.linkedin.com/in/pm-daniela-belen-garcia-cabrera/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-stone-300 hover:text-emerald-400 transition-colors duration-300 underline underline-offset-4 decoration-stone-700 hover:decoration-emerald-400"
                >
                  Daniela Garcia Cabrera
                </a>
              </span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
