'use client';

import React, { useEffect } from 'react';
import { X } from 'lucide-react';
import { getYouTubeEmbedUrl } from '@/lib/youtube';

interface VideoPlayerModalProps {
  isOpen: boolean;
  onClose: () => void;
  videoUrl: string;
  title?: string;
  aspectRatio?: '16/9' | '9/16';
}

export default function VideoPlayerModal({
  isOpen,
  onClose,
  videoUrl,
  title,
  aspectRatio = '16/9',
}: VideoPlayerModalProps) {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };

    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }

    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen || !videoUrl) return null;

  const embedUrl = getYouTubeEmbedUrl(videoUrl, true);

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-stone-950/80 backdrop-blur-md animate-in fade-in duration-300"
      onClick={onClose}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className={`relative w-full bg-stone-900 rounded-3xl overflow-hidden shadow-2xl border border-stone-800 ${
          aspectRatio === '9/16' ? 'max-w-sm aspect-[9/16]' : 'max-w-4xl aspect-video'
        }`}
      >
        {/* Botón de cerrar */}
        <button
          type="button"
          onClick={onClose}
          aria-label="Cerrar video"
          className="absolute top-4 right-4 z-20 p-2.5 rounded-full bg-stone-950/60 hover:bg-stone-950 text-stone-300 hover:text-white backdrop-blur-md transition duration-200 cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {embedUrl ? (
          <iframe
            src={embedUrl}
            title={title || 'Testimonio en video'}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
            className="w-full h-full border-0"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-stone-400 p-8 text-center">
            No se pudo cargar el video de YouTube.
          </div>
        )}
      </div>
    </div>
  );
}
