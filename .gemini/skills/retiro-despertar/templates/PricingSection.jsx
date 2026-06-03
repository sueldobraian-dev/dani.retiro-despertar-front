// components/sections/PricingSection.jsx
import Button from '../ui/Button';
import Badge from '../ui/Badge';

export default function PricingSection() {
  const plans = [
    {
      name: 'Early Bird',
      price: '$XXX',
      description: 'Precio especial por registro temprano',
      popular: false,
      features: [
        'Hospedaje Premium',
        'Alimentación Consciente',
        'Actividades Guiadas',
        'Desconexión Digital',
        'Certificado de participación'
      ],
    },
    {
      name: 'Precio Regular',
      price: '$XXX',
      description: 'Acceso a todos los beneficios del retiro',
      popular: true,
      features: [
        'Hospedaje Premium',
        'Alimentación Consciente',
        'Actividades Guiadas',
        'Desconexión Digital',
        'Certificado de participación',
        'Seguimiento post-retiro'
      ],
    },
  ];

  return (
    <section className="py-16 md:py-24 bg-light px-4">
      <div className="max-w-5xl mx-auto">
        <h2 className="font-playfair text-4xl md:text-5xl font-bold text-center text-primary mb-4">
          Precios e Inversión
        </h2>
        <p className="text-center text-text-light mb-12">
          Elige el plan que mejor se adapte a ti. Ambos incluyen la experiencia completa de El Retiro.
        </p>

        <div className="grid md:grid-cols-2 gap-8">
          {plans.map((plan, index) => (
            <div
              key={index}
              className={`relative p-8 rounded-lg border-2 transition-transform hover:scale-105 ${
                plan.popular
                  ? 'border-secondary bg-white shadow-lg'
                  : 'border-border bg-white'
              }`}
            >
              {plan.popular && (
                <Badge variant="secondary" className="absolute -top-4 left-1/2 -translate-x-1/2">
                  Recomendado
                </Badge>
              )}

              <h3 className="font-playfair text-2xl font-bold text-primary mb-2">
                {plan.name}
              </h3>
              <p className="text-text-light text-sm mb-4">
                {plan.description}
              </p>

              <p className="font-playfair text-4xl font-bold text-accent mb-6">
                {plan.price}
              </p>

              <ul className="space-y-3 mb-8">
                {plan.features.map((feature, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <span className="text-secondary font-bold mt-1">✓</span>
                    <span className="text-text text-sm">{feature}</span>
                  </li>
                ))}
              </ul>

              <Button
                variant={plan.popular ? 'secondary' : 'outline'}
                className="w-full"
              >
                Reservar ahora
              </Button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
