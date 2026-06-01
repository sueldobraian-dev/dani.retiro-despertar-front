// components/sections/TimelineSection.jsx
import TimelineItem from './TimelineItem';
import { Sun, Coffee, Users, Utensils, Moon } from 'react-icons/bs';

export default function TimelineSection() {
  const timeline = [
    {
      time: '07:00 AM',
      title: 'Saludo al sol y meditación al aire libre',
      description: 'Un espacio de días en tiempo discretizado para sanar, respetar y volver al origen.',
      icon: <Sun />,
    },
    {
      time: '08:30 AM',
      title: 'Desayuno consciente',
      description: 'Alimentos nutritivos y frescos preparados con intención.',
      icon: <Coffee />,
    },
    {
      time: '11:00 AM',
      title: 'Taller grupal',
      description: 'Prácticas de bienestar, yoga o meditación guiada.',
      icon: <Users />,
    },
    {
      time: '01:30 PM',
      title: 'Almuerzo y tiempo libre',
      description: 'Descanso, lectura, o exploración del espacio natural.',
      icon: <Utensils />,
    },
    {
      time: '05:30 PM',
      title: 'Sesión de relajación y yoga',
      description: 'Finaliza el día con prácticas de desconexión.',
      icon: <Moon />,
    },
  ];

  return (
    <section className="py-16 md:py-24 bg-white px-4">
      <div className="max-w-4xl mx-auto">
        <h2 className="font-playfair text-4xl md:text-5xl font-bold text-center text-primary mb-12">
          Un día en El Retiro
        </h2>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Left column - Visual (mobile hidden) */}
          <div className="hidden md:flex items-center justify-center">
            <div className="w-full h-96 bg-light rounded-lg border-4 border-secondary opacity-60">
              {/* Placeholder for illustration */}
            </div>
          </div>

          {/* Right column - Timeline */}
          <div>
            {timeline.map((item, index) => (
              <TimelineItem
                key={index}
                time={item.time}
                title={item.title}
                description={item.description}
                icon={item.icon}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
