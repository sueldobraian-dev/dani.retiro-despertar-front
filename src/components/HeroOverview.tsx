import Image from 'next/image';

export default function HeroOverview() {
  return (
    <section className="py-12 md:py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <div className="flex flex-col lg:flex-row items-center gap-12">
        {/* Contenido de texto */}
        <div className="w-full lg:w-1/2 flex flex-col space-y-6 text-left">
          <span className="text-emerald-800 font-semibold tracking-wider uppercase text-sm">
            Un Encuentro de Almas y Sanación
          </span>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-serif text-stone-800 leading-tight">
            Retiro Despertar
          </h1>
          <p className="text-lg text-stone-600 leading-relaxed max-w-xl">
            Regálate un fin de semana de paz y conexión profunda. Combinamos el poder de las <strong>Constelaciones Familiares</strong>, la armonía del <strong>Reiki</strong> y el bienestar físico-mental del <strong>Yoga</strong> en un entorno natural único diseñado para tu renovación integral.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 pt-4">
            <a
              href="#inscripcion"
              className="px-8 py-4 bg-emerald-700 hover:bg-emerald-800 text-stone-50 rounded-full font-medium transition duration-300 ease-in-out text-center shadow-md shadow-emerald-900/10 hover:shadow-emerald-900/20"
            >
              Reservar mi Lugar
            </a>
            <a
              href="#experiencia"
              className="px-8 py-4 border border-stone-200 hover:border-stone-400 text-stone-700 hover:text-stone-900 rounded-full font-medium transition duration-300 ease-in-out text-center bg-white/50"
            >
              Ver la Experiencia
            </a>
          </div>
        </div>

        {/* Imagen destacada */}
        <div className="w-full lg:w-1/2">
          <div className="relative w-full aspect-square sm:aspect-[4/3] md:aspect-video lg:aspect-[4/3] rounded-3xl overflow-hidden shadow-xl shadow-stone-200 border border-stone-100">
            <Image
              src="/images/experience/vista_aerea.jpg"
              alt="Vista aérea del entorno del Retiro Despertar"
              className="object-cover hover:scale-105 transition-transform duration-700 ease-out"
              fill
              priority
            />
            {/* Overlay sutil para elegancia */}
            <div className="absolute inset-0 bg-gradient-to-t from-stone-900/10 via-transparent to-transparent pointer-events-none" />
          </div>
        </div>
      </div>
    </section>
  );
}
