// components/layout/Footer.jsx
import { Mail, Phone, MapPin } from 'react-icons/bs';

export default function Footer() {
  return (
    <footer id="footer" className="bg-text text-light py-16">
      <div className="max-w-6xl mx-auto px-4">
        <div className="grid md:grid-cols-3 gap-12 mb-12">
          {/* Logo/Branding */}
          <div>
            <h3 className="font-playfair text-2xl font-bold text-white mb-2">
              El Retiro
            </h3>
            <p className="text-light/80 text-sm">
              Un espacio para reconectarte contigo mismo y descubrir el poder del bienestar holístico.
            </p>
          </div>

          {/* Links */}
          <div>
            <h4 className="font-semibold text-white mb-4">Enlaces</h4>
            <ul className="space-y-2">
              <li>
                <a href="/" className="text-light/80 hover:text-accent transition text-sm">
                  Inicio
                </a>
              </li>
              <li>
                <a href="/equipo" className="text-light/80 hover:text-accent transition text-sm">
                  Equipo
                </a>
              </li>
              <li>
                <a href="/practicas" className="text-light/80 hover:text-accent transition text-sm">
                  Prácticas
                </a>
              </li>
              <li>
                <a href="/politica-privacidad" className="text-light/80 hover:text-accent transition text-sm">
                  Política de Privacidad
                </a>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-semibold text-white mb-4">Contacto</h4>
            <ul className="space-y-3">
              <li className="flex items-center gap-2 text-light/80 text-sm">
                <Mail size={16} className="text-accent flex-shrink-0" />
                <a href="mailto:info@elretiro.com" className="hover:text-accent transition">
                  info@elretiro.com
                </a>
              </li>
              <li className="flex items-center gap-2 text-light/80 text-sm">
                <Phone size={16} className="text-accent flex-shrink-0" />
                <a href="tel:+123456789" className="hover:text-accent transition">
                  +1 (234) 567-89
                </a>
              </li>
              <li className="flex items-start gap-2 text-light/80 text-sm">
                <MapPin size={16} className="text-accent flex-shrink-0 mt-0.5" />
                <span>
                  Ubicación disponible tras confirmación de reserva
                </span>
              </li>
            </ul>
          </div>
        </div>

        {/* Social Links & Bottom */}
        <div className="border-t border-light/20 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="text-light/60 text-sm text-center md:text-left">
            © 2026 El Retiro. Todos los derechos reservados.
          </div>
          <div className="flex gap-4">
            <a href="#" className="text-light/80 hover:text-accent transition">
              Instagram
            </a>
            <a href="#" className="text-light/80 hover:text-accent transition">
              Facebook
            </a>
            <a href="#" className="text-light/80 hover:text-accent transition">
              LinkedIn
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
