// components/layout/Navbar.jsx
import Link from 'next/link';
import { useState } from 'react';
import { Menu, X } from 'react-icons/bs';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = [
    { label: 'Inicio', href: '/' },
    { label: 'Equipo', href: '/equipo' },
    { label: 'Prácticas', href: '/practicas' },
    { label: 'Contacto', href: '#footer' }
  ];

  return (
    <nav className="sticky top-0 z-50 bg-light shadow-sm">
      <div className="max-w-6xl mx-auto px-4 py-4 flex justify-between items-center">
        {/* Logo */}
        <Link href="/" className="font-playfair text-2xl font-bold text-primary">
          El Retiro
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex gap-8">
          {navLinks.map(link => (
            <Link
              key={link.href}
              href={link.href}
              className="text-text hover:text-primary transition"
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* CTA Button (Desktop) */}
        <button className="hidden md:block bg-primary text-white px-6 py-2 rounded-lg hover:bg-primary/90 transition">
          Reservar
        </button>

        {/* Mobile Menu Toggle */}
        <button
          className="md:hidden"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-light border-t border-border">
          <div className="px-4 py-4 flex flex-col gap-4">
            {navLinks.map(link => (
              <Link
                key={link.href}
                href={link.href}
                className="text-text hover:text-primary transition"
                onClick={() => setIsOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            <button className="bg-primary text-white w-full py-2 rounded-lg hover:bg-primary/90 transition">
              Reservar
            </button>
          </div>
        </div>
      )}
    </nav>
  );
}
