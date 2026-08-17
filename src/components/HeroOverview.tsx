'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { getExperienceUrl } from '@/lib/locationUrls';
import { supabase } from '@/lib/supabase';

export default function HeroOverview() {
  const [nextExperienceUrl, setNextExperienceUrl] = useState<string>(getExperienceUrl());

  useEffect(() => {
    const fetchNextRetreatLocation = async () => {
      try {
        const today = new Date().toISOString().split('T')[0];
        const { data, error } = await supabase
          .from('retreats')
          .select('*, locations(*)')
          .gte('end_date', today)
          .order('start_date', { ascending: true })
          .limit(1);

        if (!error && data && data.length > 0 && data[0].locations?.gallery_url) {
          setNextExperienceUrl(getExperienceUrl(data[0].locations.gallery_url));
        }
      } catch (err) {
        console.error('Error fetching next retreat location for Hero:', err);
      }
    };

    fetchNextRetreatLocation();
  }, []);

  return (
    <section id="inicio" className="relative overflow-hidden py-16 sm:py-24 lg:py-0 lg:min-h-[85vh] lg:flex lg:items-center bg-stone-50">
      {/* Imagen de fondo disponible en todas las resoluciones */}
      <div className="absolute inset-0 z-0 w-full h-full">
        <Image
          src="/images/experience/circulo_infinito.jpg"
          alt="Entorno natural del Retiro Despertar"
          fill
          priority
          className="object-cover"
        />
        {/* Degradado responsivo: velo protector en móviles, degradado horizontal en pantallas grandes */}
        <div className="absolute inset-0 bg-stone-50/85 lg:bg-transparent lg:bg-gradient-to-r lg:from-stone-50 lg:via-stone-50/90 lg:to-transparent w-full h-full" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        {/* Contenido de texto */}
        <div className="w-full lg:w-[55%] flex flex-col space-y-6 text-left">
          <span className="text-emerald-800 font-semibold tracking-wider uppercase text-sm">
            Un Encuentro de Almas y Sanación
          </span>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-serif text-stone-800 leading-tight">
            Retiro Despertar
          </h1>
          <p className="text-lg text-stone-600 leading-relaxed max-w-xl">
            Regálate un fin de semana de paz y conexión profunda. Combinamos el poder de las <strong>Constelaciones Familiares</strong>, la armonía del <strong>Reiki</strong> y el bienestar del <strong>Yoga</strong> en un entorno natural único, acompañado por la propuesta gastronómica de nuestro <strong>chef privado</strong> para tu renovación integral.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 pt-4">
            <Link
              href={nextExperienceUrl}
              className="px-8 py-4 bg-emerald-700 hover:bg-emerald-800 text-stone-50 rounded-full font-medium transition duration-300 ease-in-out text-center shadow-md shadow-emerald-900/10 hover:shadow-emerald-900/20 cursor-pointer"
            >
              Próximo Retiro
            </Link>
            <Link
              href="/experiencia"
              className="px-8 py-4 border border-stone-200 hover:border-stone-400 text-stone-700 hover:text-stone-900 rounded-full font-medium transition duration-300 ease-in-out text-center bg-white/50 cursor-pointer"
            >
              Conocer la experiencia
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
