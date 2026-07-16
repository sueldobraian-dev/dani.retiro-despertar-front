'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { Calendar, MapPin, Clock, Info, RefreshCw, AlertCircle } from 'lucide-react';
import { supabase } from '@/lib/supabase';

interface Location {
  id: string;
  name: string;
  address: string;
  maps_url: string;
  directions: string | null;
}

interface Retreat {
  id: string;
  title: string;
  start_date: string;
  end_date: string;
  location_id: string;
  is_confirmed: boolean;
  status_text: string | null;
  locations: Location | null;
}

function CountdownTimer({ targetDate }: { targetDate: string }) {
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  const [hasEnded, setHasEnded] = useState(false);

  useEffect(() => {
    const calculateTime = () => {
      // Tomamos la fecha del retiro a las 09:00 AM
      const difference = +new Date(`${targetDate}T09:00:00`) - +new Date();

      if (difference <= 0) {
        setHasEnded(true);
        return;
      }

      setTimeLeft({
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      });
    };

    calculateTime();
    const interval = setInterval(calculateTime, 1000);
    return () => clearInterval(interval);
  }, [targetDate]);

  if (hasEnded) {
    return (
      <div className="text-emerald-800 font-serif text-xl font-semibold mt-4 bg-emerald-50 py-3 px-6 rounded-2xl inline-block border border-emerald-100">
        ¡El retiro ha comenzado!
      </div>
    );
  }

  const TimeBlock = ({ value, label }: { value: number; label: string }) => (
    <div className="flex flex-col items-center bg-white border border-stone-200/60 rounded-2xl p-4 min-w-[70px] sm:min-w-[90px] shadow-sm">
      <span className="text-3xl sm:text-4xl font-serif text-emerald-800 font-bold">{String(value).padStart(2, '0')}</span>
      <span className="text-[10px] sm:text-xs text-stone-500 uppercase tracking-wider font-semibold mt-1">{label}</span>
    </div>
  );

  return (
    <div className="flex gap-3 sm:gap-4 mt-6 justify-center md:justify-start">
      <TimeBlock value={timeLeft.days} label="Días" />
      <TimeBlock value={timeLeft.hours} label="Horas" />
      <TimeBlock value={timeLeft.minutes} label="Minutos" />
      <TimeBlock value={timeLeft.seconds} label="Segundos" />
    </div>
  );
}

export default function UpcomingRetreats() {
  const [retreats, setRetreats] = useState<Retreat[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<boolean>(false);

  const fetchRetreats = useCallback(async () => {
    setLoading(true);
    setError(false);
    try {
      const today = new Date().toISOString().split('T')[0]; // Formato YYYY-MM-DD
      const { data, error: dbError } = await supabase
        .from('retreats')
        .select('*, locations(*)')
        .gte('end_date', today)
        .order('start_date', { ascending: true });

      if (dbError) {
        throw dbError;
      }

      setRetreats((data as Retreat[]) || []);
    } catch (err) {
      console.error('Error fetching retreats from Supabase:', err);
      setError(true);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchRetreats();
  }, [fetchRetreats]);

  // Helper para formatear fechas a texto legible en español
  const formatRetreatDate = (start: string, end: string) => {
    const startDate = new Date(`${start}T00:00:00`);
    const endDate = new Date(`${end}T00:00:00`);

    const startDay = startDate.getDate();
    const endDay = endDate.getDate();
    const month = startDate.toLocaleDateString('es-ES', { month: 'long' });
    const year = startDate.getFullYear();

    const capitalizedMonth = month.charAt(0).toUpperCase() + month.slice(1);

    if (startDate.getMonth() === endDate.getMonth()) {
      return `${startDay} y ${endDay} de ${capitalizedMonth} de ${year}`;
    }

    const endMonth = endDate.toLocaleDateString('es-ES', { month: 'long' });
    const capitalizedEndMonth = endMonth.charAt(0).toUpperCase() + endMonth.slice(1);
    return `${startDay} de ${capitalizedMonth} al ${endDay} de ${capitalizedEndMonth} de ${year}`;
  };

  return (
    <section id="proximos-retiros" className="py-16 bg-stone-50 border-y border-stone-200/30 min-h-[400px] flex items-center">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">

        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-emerald-800 font-semibold tracking-wider uppercase text-sm">
            Fechas Programadas
          </span>
          <h2 className="text-3xl md:text-4xl font-serif text-stone-800 mt-2">
            Próximos Retiros
          </h2>
          <p className="text-stone-600 mt-3 text-base">
            Reserva las fechas en tu calendario y da el primer paso hacia esta experiencia de introspección y bienestar.
          </p>
        </div>

        {/* Estado de Carga (Skeleton) */}
        {loading && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 animate-pulse">
            <div className="lg:col-span-2 bg-white rounded-3xl h-80 border border-stone-200/40 p-8 flex flex-col justify-between">
              <div className="space-y-4">
                <div className="h-4 bg-stone-200 rounded w-1/4" />
                <div className="h-8 bg-stone-200 rounded w-3/4" />
                <div className="h-4 bg-stone-200 rounded w-1/2" />
              </div>
              <div className="h-16 bg-stone-200 rounded w-2/3" />
            </div>
            <div className="bg-white rounded-3xl h-80 border border-stone-200/40 p-8 flex flex-col justify-between">
              <div className="space-y-4">
                <div className="h-5 bg-stone-200 rounded w-1/2" />
                <div className="h-4 bg-stone-200 rounded w-5/6" />
                <div className="h-4 bg-stone-200 rounded w-4/6" />
              </div>
              <div className="h-10 bg-stone-200 rounded w-full" />
            </div>
          </div>
        )}

        {/* Estado de Error con Reintento */}
        {!loading && error && (
          <div className="max-w-md mx-auto bg-white border border-red-100 rounded-3xl shadow-lg p-8 text-center flex flex-col items-center">
            <div className="w-12 h-12 bg-red-50 text-red-700 rounded-full flex items-center justify-center mb-4">
              <AlertCircle className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-serif font-bold text-stone-800">
              No pudimos cargar las fechas
            </h3>
            <p className="text-stone-500 text-sm mt-2 leading-relaxed">
              Hubo un problema de conexión con el servidor. Por favor, reintenta cargar los próximos retiros.
            </p>
            <button
              onClick={fetchRetreats}
              className="mt-6 px-6 py-3 bg-emerald-800 hover:bg-emerald-900 text-white font-medium rounded-full transition-all duration-300 flex items-center gap-2 shadow-md shadow-emerald-950/10 active:scale-95 cursor-pointer"
            >
              <RefreshCw className="w-4 h-4" />
              <span>Reintentar</span>
            </button>
          </div>
        )}

        {/* Estado Vacío (Sin Retiros Programados) */}
        {!loading && !error && retreats.length === 0 && (
          <div className="max-w-md mx-auto bg-white border border-stone-200/60 rounded-3xl shadow-sm p-8 text-center flex flex-col items-center">
            <div className="w-12 h-12 bg-emerald-50 text-emerald-800 rounded-full flex items-center justify-center mb-4">
              <Calendar className="w-5 h-5" />
            </div>
            <h3 className="text-lg font-serif font-bold text-stone-800">
              Sin fechas disponibles
            </h3>
            <p className="text-stone-500 text-sm mt-2 leading-relaxed">
              No hay nuevos retiros programados por el momento. Próximamente confirmaremos nuevas fechas para compartir la experiencia.
            </p>
            <a
              href="#inscripcion"
              className="mt-6 px-6 py-2.5 bg-stone-100 hover:bg-stone-200/80 text-stone-700 font-semibold rounded-2xl text-xs transition duration-300 border border-stone-200/30"
            >
              Consultar por privado
            </a>
          </div>
        )}

        {/* Renderizado de Datos */}
        {!loading && !error && retreats.length > 0 && (
          (() => {
            const nextRetreat = retreats.find(r => r.is_confirmed) || retreats[0];
            const otherRetreats = retreats.filter(r => r.id !== nextRetreat?.id);

            return (
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

                {/* Próximo Retiro Destacado (Grande) */}
                {nextRetreat && (
                  <div className="lg:col-span-2 bg-white rounded-3xl border border-stone-200/50 shadow-md p-6 sm:p-8 md:p-10 flex flex-col justify-between relative overflow-hidden animate-in fade-in slide-in-from-bottom-4 duration-500">
                    <div className="absolute -top-10 -right-10 w-40 h-40 bg-emerald-50 rounded-full blur-3xl opacity-60 pointer-events-none" />

                    <div className="relative z-10">
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-800 border border-emerald-100">
                        <Clock className="w-3.5 h-3.5" /> Próxima Fecha
                      </span>

                      <h3 className="text-2xl sm:text-3xl font-serif text-stone-800 mt-4 font-bold">
                        {nextRetreat.title}
                      </h3>

                      <div className="mt-6 space-y-4 text-stone-600">
                        <div className="flex items-center gap-3">
                          <Calendar className="w-5 h-5 text-emerald-800 flex-shrink-0" />
                          <span className="text-sm sm:text-base font-medium text-stone-800">
                            {formatRetreatDate(nextRetreat.start_date, nextRetreat.end_date)}
                          </span>
                        </div>

                        <div className="flex items-start gap-3">
                          <MapPin className="w-5 h-5 text-emerald-800 flex-shrink-0 mt-0.5" />
                          <div className="flex flex-col gap-1">
                            <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2">
                              <span className="text-sm sm:text-base text-stone-800 font-semibold">
                                {nextRetreat.locations?.name || 'Ubicación a confirmar'}
                              </span>
                              {nextRetreat.locations?.address && (
                                <span className="text-xs sm:text-sm text-stone-500">
                                  ({nextRetreat.locations.address})
                                </span>
                              )}
                              {nextRetreat.locations?.maps_url && (
                                <a
                                  href={nextRetreat.locations.maps_url}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="text-xs text-emerald-700 hover:text-emerald-900 underline font-semibold transition"
                                >
                                  (Ver en Google Maps)
                                </a>
                              )}
                            </div>
                            {nextRetreat.locations?.directions && (
                              <p className="text-xs text-stone-500 bg-stone-50 border border-stone-200/50 p-3 rounded-2xl mt-1.5 leading-relaxed max-w-lg">
                                <span className="font-semibold text-emerald-800">Cómo llegar:</span> {nextRetreat.locations.directions}
                              </p>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="mt-8 relative z-10 border-t border-stone-100 pt-6">
                      <span className="block text-xs font-bold text-stone-400 uppercase tracking-wider">
                        La experiencia comienza en:
                      </span>
                      <CountdownTimer targetDate={nextRetreat.start_date} />
                    </div>
                  </div>
                )}

                {/* Calendario de fechas programadas secundarias (Pequeñas) */}
                <div className="bg-white rounded-3xl border border-stone-200/50 shadow-md p-6 sm:p-8 flex flex-col justify-between animate-in fade-in slide-in-from-bottom-4 duration-500 delay-100">
                  <div>
                    <h3 className="text-lg font-serif font-bold text-stone-800 border-b border-stone-100 pb-4">
                      Calendario de Retiros
                    </h3>

                    <div className="mt-6 space-y-6">
                      {otherRetreats.length > 0 ? (
                        otherRetreats.map((retreat) => (
                          <div key={retreat.id} className="flex flex-col space-y-2 border-b border-stone-50 pb-4 last:border-0 last:pb-0">
                            <div className="flex items-start justify-between gap-3">
                              <h4 className="font-semibold text-stone-800 text-sm leading-snug">
                                {retreat.title}
                              </h4>
                              {!retreat.is_confirmed && (
                                <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-md text-[10px] font-semibold bg-amber-50 text-amber-800 border border-amber-200/50 flex-shrink-0">
                                  <Info className="w-3 h-3" /> Proximamente
                                </span>
                              )}
                            </div>

                            <div className="space-y-2 text-xs text-stone-500">
                              <div className="flex items-center gap-2">
                                <Calendar className="w-4 h-4 text-stone-400 flex-shrink-0" />
                                <span>
                                  {retreat.is_confirmed
                                    ? formatRetreatDate(retreat.start_date, retreat.end_date)
                                    : retreat.status_text || 'Próximamente confirmamos'}
                                </span>
                              </div>

                              <div className="flex items-start gap-2">
                                <MapPin className="w-4 h-4 text-stone-400 flex-shrink-0 mt-0.5" />
                                <div className="flex flex-col gap-0.5">
                                  <div className="text-stone-700">
                                    <span className="font-semibold">{retreat.locations?.name || 'A confirmar'}</span>
                                    {retreat.locations?.address && <span className="text-stone-400"> ({retreat.locations.address})</span>}
                                  </div>
                                  <div className="flex items-center gap-2 mt-0.5">
                                    {retreat.locations?.maps_url && (
                                      <a
                                        href={retreat.locations.maps_url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-[10px] text-emerald-700 hover:text-emerald-900 underline font-semibold transition inline-block"
                                      >
                                        Ver mapa
                                      </a>
                                    )}
                                    {retreat.locations?.directions && (
                                      <span className="text-[10px] text-stone-400" title={retreat.locations.directions}>
                                        • indicaciones disponibles
                                      </span>
                                    )}
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        ))
                      ) : (
                        <p className="text-sm text-stone-500">No hay otras fechas programadas en este momento.</p>
                      )}
                    </div>
                  </div>

                  <div className="mt-8 pt-4 border-t border-stone-100">
                    <a
                      href="#inscripcion"
                      className="block w-full py-3 text-center bg-stone-100 hover:bg-stone-200/80 text-stone-700 hover:text-stone-900 font-semibold rounded-2xl text-xs transition duration-300 border border-stone-200/30"
                    >
                      Consultar por otras fechas
                    </a>
                  </div>
                </div>

              </div>
            );
          })()
        )}

      </div>
    </section>
  );
}
