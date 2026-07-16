'use client';

import React, { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { Menu, X, Sparkles } from 'lucide-react';

const NAV_ITEMS = [
  { id: 'inicio', label: 'Inicio', path: '/' },
  { id: 'experiencia', label: 'La Experiencia', path: '/#experiencia' },
  { id: 'proximos-retiros', label: 'Próximos Retiros', path: '/#proximos-retiros' },
  { id: 'galeria', label: 'Galería', path: '/galeria' },
  { id: 'testimonios', label: 'Testimonios', path: '/#testimonios' },
];

export default function Header() {
  const pathname = usePathname();
  const [activeSection, setActiveSection] = useState('inicio');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    // Detectar el scroll para cambiar la opacidad/sombra del header
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);

    // Si estamos en la página de galería, la sección activa es 'galeria'
    if (pathname === '/galeria') {
      setActiveSection('galeria');
      return () => window.removeEventListener('scroll', handleScroll);
    }

    // Configurar Intersection Observer para detectar en qué sección estamos en la home
    const observerOptions = {
      root: null,
      rootMargin: '-50% 0px -50% 0px',
      threshold: 0,
    };

    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const id = entry.target.id;
          setActiveSection(id);
          window.history.replaceState(null, '', `#${id}`);
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);

    NAV_ITEMS.forEach((item) => {
      if (item.id !== 'galeria') {
        const element = document.getElementById(item.id);
        if (element) observer.observe(element);
      }
    });

    return () => {
      window.removeEventListener('scroll', handleScroll);
      observer.disconnect();
    };
  }, [pathname]);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, item: typeof NAV_ITEMS[0]) => {
    setIsMobileMenuOpen(false);

    if (item.id === 'inscripcion') {
      e.preventDefault();
      window.dispatchEvent(new CustomEvent('open-whatsapp'));
      return;
    }

    if (item.id === 'galeria') {
      // Dejar navegar normalmente a la página de galería
      return;
    }

    if (pathname === '/') {
      // Si estamos en la Home, hacemos scroll suave
      e.preventDefault();
      const element = document.getElementById(item.id);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        setActiveSection(item.id);
        window.history.replaceState(null, '', `#${item.id}`);
      }
    }
  };

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-stone-50/90 backdrop-blur-md shadow-sm shadow-stone-200/40 border-b border-stone-100/80 py-4'
          : 'bg-stone-50/50 backdrop-blur-sm border-b border-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Logo */}
        <Link
          href="/"
          onClick={(e) => {
            setIsMobileMenuOpen(false);
            if (pathname === '/') {
              e.preventDefault();
              const element = document.getElementById('inicio');
              if (element) element.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
          }}
          className="flex items-center gap-2 group cursor-pointer"
        >
          <div className="w-8 h-8 rounded-full bg-emerald-700/10 flex items-center justify-center text-emerald-800 group-hover:bg-emerald-700 group-hover:text-stone-50 transition-colors duration-300">
            <Sparkles className="w-4 h-4" />
          </div>
          <span className="font-serif font-bold text-stone-800 text-lg sm:text-xl tracking-tight">
            Retiro Despertar
          </span>
        </Link>

        {/* Navegación Desktop */}
        <nav className="hidden md:flex items-center gap-8">
          {NAV_ITEMS.map((item) => (
            <Link
              key={item.id}
              href={item.path}
              onClick={(e) => handleNavClick(e, item)}
              className={`text-sm font-medium tracking-wide transition-colors duration-300 relative py-1 ${
                activeSection === item.id
                  ? 'text-emerald-800 font-semibold'
                  : 'text-stone-600 hover:text-stone-900'
              }`}
            >
              {item.label}
              {activeSection === item.id && (
                <span className="absolute bottom-0 left-0 w-full h-0.5 bg-emerald-700 rounded-full" />
              )}
            </Link>
          ))}
          <button
            onClick={() => window.dispatchEvent(new CustomEvent('open-whatsapp'))}
            className="px-5 py-2.5 bg-emerald-700 hover:bg-emerald-800 text-stone-50 rounded-full text-xs font-semibold uppercase tracking-wider transition-all duration-300 shadow-sm shadow-emerald-950/10 hover:shadow-emerald-950/20 cursor-pointer"
          >
            Contactanos
          </button>
        </nav>

        {/* Botón menú móvil */}
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="md:hidden p-2 text-stone-600 hover:text-stone-900 hover:bg-stone-100 rounded-full transition-colors duration-300 focus:outline-none"
          aria-label="Abrir menú"
        >
          {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Menú Móvil desplegable */}
      <div
        className={`md:hidden fixed inset-x-0 top-[73px] bg-stone-50 border-b border-stone-100 shadow-lg transition-all duration-300 ease-in-out ${
          isMobileMenuOpen ? 'opacity-100 max-h-screen py-6' : 'opacity-0 max-h-0 overflow-hidden py-0'
        }`}
      >
        <nav className="flex flex-col px-6 space-y-4">
          {NAV_ITEMS.map((item) => (
            <Link
              key={item.id}
              href={item.path}
              onClick={(e) => handleNavClick(e, item)}
              className={`text-base font-medium py-2 px-3 rounded-xl transition duration-300 ${
                activeSection === item.id
                  ? 'bg-emerald-50 text-emerald-800 font-semibold'
                  : 'text-stone-600 hover:text-stone-900 hover:bg-stone-100'
              }`}
            >
              {item.label}
            </Link>
          ))}
          <button
            onClick={() => {
              setIsMobileMenuOpen(false);
              window.dispatchEvent(new CustomEvent('open-whatsapp'));
            }}
            className="w-full py-3 bg-emerald-700 hover:bg-emerald-800 text-stone-50 rounded-xl text-center font-semibold tracking-wide transition duration-300 shadow-sm cursor-pointer"
          >
            Contactanos
          </button>
        </nav>
      </div>
    </header>
  );
}
