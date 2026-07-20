'use client';

import React, { useState, useEffect } from 'react';
import { X, MessageSquare, ArrowRight } from 'lucide-react';

export default function WhatsAppFloat() {
  const [isMinimized, setIsMinimized] = useState<boolean>(false);
  const [isShaking, setIsShaking] = useState<boolean>(false);
  const whatsappNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '5492212007660';
  const message = 'Hola me interesa formar parte de la experiencia. Me contás como puedo avanzar?';
  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;

  useEffect(() => {
    // Cargar estado guardado en localStorage
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('whatsapp-minimized');
      if (saved === 'true') {
        setIsMinimized(true);
      }
    }

    const handleOpen = () => {
      setIsMinimized(false);
      localStorage.setItem('whatsapp-minimized', 'false');
      setIsShaking(true);
      // Detener el rebote después de 1.5s
      setTimeout(() => {
        setIsShaking(false);
      }, 1500);
    };

    window.addEventListener('open-whatsapp', handleOpen);
    return () => window.removeEventListener('open-whatsapp', handleOpen);
  }, []);

  const handleMinimize = () => {
    setIsMinimized(true);
    localStorage.setItem('whatsapp-minimized', 'true');
  };

  const handleMaximize = () => {
    setIsMinimized(false);
    localStorage.setItem('whatsapp-minimized', 'false');
  };

  if (isMinimized) {
    return (
      <button
        onClick={handleMaximize}
        className="fixed bottom-6 right-6 z-50 p-4 bg-[#25D366] hover:bg-[#20ba5a] text-white rounded-full shadow-lg shadow-emerald-950/20 hover:scale-110 active:scale-95 transition-all duration-300 group flex items-center justify-center cursor-pointer"
        title="Escríbenos por WhatsApp"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
          className="w-7 h-7"
        >
          <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.514 2.266 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.73-1.464L0 24zm6.59-4.846c1.6.95 3.188 1.449 4.625 1.45 5.426.002 9.855-4.422 9.858-9.849.002-2.628-1.02-5.099-2.88-6.961-1.86-1.861-4.335-2.883-6.96-2.884-5.43 0-9.86 4.422-9.863 9.848-.001 1.502.4 2.979 1.16 4.314l.24.417-1.004 3.665 3.757-.986.41.244zm9.843-6.72c-.22-.11-1.306-.644-1.507-.718-.202-.074-.349-.11-.497.11-.148.22-.57.717-.698.864-.128.147-.257.165-.477.055-.22-.11-.93-.343-1.771-1.094-.654-.583-1.096-1.303-1.224-1.522-.128-.219-.014-.338.096-.447.1-.1.22-.257.33-.385.11-.128.147-.22.22-.367.073-.147.037-.275-.018-.385-.055-.11-.497-1.197-.68-1.642-.179-.435-.357-.376-.49-.383-.127-.007-.272-.008-.418-.008-.147 0-.385.055-.587.275-.201.22-.77.752-.77 1.834s.789 2.128.899 2.275c.11.147 1.55 2.366 3.755 3.32.524.227.933.362 1.25.463.527.168 1.006.144 1.385.088.422-.063 1.307-.534 1.49-.105.184-.43.184-.796.129-.86-.055-.065-.202-.102-.422-.212z" />
        </svg>
      </button>
    );
  }

  return (
    <div className={`fixed bottom-6 right-6 z-50 w-80 bg-white border border-stone-200 rounded-3xl shadow-xl shadow-stone-900/10 overflow-hidden animate-in fade-in slide-in-from-bottom-5 duration-300 ${isShaking ? 'animate-bounce' : ''}`}>
      {/* Header */}
      <div className="bg-emerald-800 text-stone-50 p-4 relative">
        <button
          onClick={handleMinimize}
          className="absolute top-4 right-4 text-stone-300 hover:text-stone-100 hover:bg-emerald-950/20 p-1 rounded-lg transition-colors cursor-pointer"
          title="Minimizar"
        >
          <X className="w-4 h-4" />
        </button>
        <div className="flex items-center gap-3">
          <div className="relative">
            <div className="w-10 h-10 bg-emerald-700 rounded-full flex items-center justify-center font-bold text-lg text-emerald-100 border border-emerald-600/30">
              RD
            </div>
            <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-emerald-500 rounded-full border-2 border-emerald-800" />
          </div>
          <div>
            <h4 className="font-semibold text-sm">Retiro Despertar</h4>
            <p className="text-xs text-stone-300">En línea</p>
          </div>
        </div>
      </div>

      {/* Body */}
      <div className="p-5 bg-stone-50/50 space-y-4">
        <div className="bg-white p-3 rounded-2xl border border-stone-100 shadow-sm relative">
          {/* Pequeño triángulo para simular burbuja de chat */}
          <div className="absolute top-4 -left-2 w-4 h-4 bg-white border-l border-b border-stone-100 transform rotate-45" />
          <p className="text-stone-700 text-sm leading-relaxed pl-1">
            ¡Hola! ¿Tienes dudas sobre el próximo Retiro Despertar? Escríbenos y te acompañamos.
          </p>
        </div>

        <a
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="w-full py-3 px-4 bg-[#25D366] hover:bg-[#20ba5a] text-white font-medium rounded-full transition-all duration-300 flex items-center justify-center gap-2 group shadow-md shadow-emerald-600/10 cursor-pointer"
        >
          <MessageSquare className="w-4 h-4" />
          <span>Escribir por WhatsApp</span>
          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
        </a>
      </div>
    </div>
  );
}
