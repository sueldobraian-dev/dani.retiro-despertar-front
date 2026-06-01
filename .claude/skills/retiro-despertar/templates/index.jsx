// pages/index.jsx - Ejemplo completo
import Head from 'next/head';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import HeroSection from '../components/sections/HeroSection';
import TimelineSection from '../components/sections/TimelineSection';
import PricingSection from '../components/sections/PricingSection';
import { Accordion } from '../components/ui/Accordion';

export default function Home() {
  const faqItems = [
    {
      question: '¿Necesito experiencia en meditación?',
      answer: 'No. El Retiro está diseñado para todos los niveles. Nuestros facilitadores adaptan las prácticas para principiantes y avanzados.'
    },
    {
      question: '¿Cuál es la política de cancelación?',
      answer: 'Oferecemos reembolso completo si cancelas con 30 días de anticipación. Menores plazos pueden aplicar cargos.'
    },
    {
      question: '¿Puedo traer dispositivos electrónicos?',
      answer: 'Alentamos la desconexión digital. Se puede traer, pero el uso en comunidad está limitado. Horarios específicos para conexión.'
    },
    {
      question: '¿Qué incluye la alimentación?',
      answer: 'Desayuno, almuerzo, snacks y té. Menús preparados con ingredientes conscientes. Opciones vegetarianas y alergias contempladas.'
    },
    {
      question: '¿Hay edad mínima?',
      answer: 'Generalmente, mayores de 18 años. Consulta sobre retiros especiales para familias o jóvenes.'
    },
  ];

  return (
    <>
      <Head>
        <title>El Retiro | Retiro de Bienestar Holístico</title>
        <meta name="description" content="Reconecta contigo mismo en El Retiro. Una experiencia inmersiva de meditación, prácticas holísticas y bienestar en armonía con la naturaleza." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta property="og:title" content="El Retiro | Retiro de Bienestar" />
        <meta property="og:description" content="Una experiencia de meditación y bienestar para reconectar contigo mismo." />
        <meta property="og:type" content="website" />
        <link rel="canonical" href="https://elretiro.com" />
      </Head>

      <Navbar />

      <main>
        <HeroSection />

        <TimelineSection />

        {/* Location/Galería Carousel */}
        <section className="py-16 md:py-24 bg-light px-4">
          <div className="max-w-5xl mx-auto">
            <h2 className="font-playfair text-4xl md:text-5xl font-bold text-center text-primary mb-12">
              El Lugar
            </h2>
            <div className="bg-white rounded-lg border-2 border-secondary p-8 text-center h-96 flex items-center justify-center">
              <p className="text-text-light">
                [Carrusel de imágenes del espacio - Implementar con Embla o Swiper]
              </p>
            </div>
          </div>
        </section>

        {/* Testimonios */}
        <section className="py-16 md:py-24 bg-white px-4">
          <div className="max-w-5xl mx-auto">
            <h2 className="font-playfair text-4xl md:text-5xl font-bold text-center text-primary mb-12">
              Testimonios
            </h2>
            <div className="grid md:grid-cols-3 gap-8">
              {[
                {
                  name: 'Laura M.',
                  testimonial: '¡Llegué estresada... volví en paz! La experiencia fue transformadora.'
                },
                {
                  name: 'Pablo S.',
                  testimonial: 'Increíble experiencia. El equipo es atento y el lugar es hermoso. Recomendado 100%.'
                },
                {
                  name: 'María H.',
                  testimonial: 'Claridad mental. Fue exactamente lo que necesitaba.'
                }
              ].map((review, idx) => (
                <div key={idx} className="bg-light rounded-lg p-6 border border-border hover:shadow-lg transition">
                  <p className="text-text-light italic mb-4">"{review.testimonial}"</p>
                  <p className="font-semibold text-primary">— {review.name}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Value Proposition */}
        <section className="py-16 md:py-24 bg-light px-4">
          <div className="max-w-5xl mx-auto">
            <h2 className="font-playfair text-4xl md:text-5xl font-bold text-center text-primary mb-12">
              ¿Qué Incluye la Experiencia?
            </h2>
            <div className="grid md:grid-cols-2 gap-8">
              {[
                {
                  title: 'Hospedaje Premium',
                  description: 'Habitaciones cómodas y acogedoras con vistas a la naturaleza.'
                },
                {
                  title: 'Alimentación Consciente',
                  description: 'Comidas preparadas con ingredientes frescos y nutritivos.'
                },
                {
                  title: 'Actividades Guiadas',
                  description: 'Meditación, yoga, talleres de bienestar y prácticas holísticas.'
                },
                {
                  title: 'Desconexión Digital',
                  description: 'Espacio para conectar contigo mismo sin distracciones tecnológicas.'
                }
              ].map((item, idx) => (
                <div key={idx} className="bg-white p-6 rounded-lg border-2 border-secondary hover:shadow-md transition">
                  <h3 className="font-semibold text-primary text-lg mb-2">{item.title}</h3>
                  <p className="text-text-light text-sm">{item.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <PricingSection />

        {/* FAQs */}
        <section className="py-16 md:py-24 bg-white px-4">
          <div className="max-w-3xl mx-auto">
            <h2 className="font-playfair text-4xl md:text-5xl font-bold text-center text-primary mb-12">
              Preguntas Frecuentes
            </h2>
            <Accordion items={faqItems} />
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}

// SSG - Genera la página estáticamente
export async function getStaticProps() {
  return {
    revalidate: 3600, // ISR - Revalidar cada hora
  };
}
