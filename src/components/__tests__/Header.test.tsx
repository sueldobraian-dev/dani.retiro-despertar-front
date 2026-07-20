import React from 'react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import Header from '../Header';

let mockPathname = '/';

vi.mock('next/navigation', () => {
  return {
    usePathname: () => mockPathname,
  };
});

vi.mock('next/link', () => {
  return {
    default: ({ children, href, onClick, ...props }: any) => (
      <a href={href} onClick={onClick} {...props}>
        {children}
      </a>
    ),
  };
});

describe('Header Component', () => {
  beforeEach(() => {
    mockPathname = '/';
    vi.stubGlobal('dispatchEvent', vi.fn());
    // Mock getElementById y scrollIntoView
    const mockElement = {
      scrollIntoView: vi.fn(),
    };
    vi.spyOn(document, 'getElementById').mockReturnValue(mockElement as any);
  });

  it('renders logo and all navigation items', () => {
    render(<Header />);

    expect(screen.getByText('Retiro Despertar')).toBeInTheDocument();
    // Obtener los enlaces por rol y validar que existen múltiples ocurrencias debido al responsive
    expect(screen.getAllByRole('link', { name: /Inicio/i }).length).toBeGreaterThan(0);
    expect(screen.getAllByRole('link', { name: /La Experiencia/i }).length).toBeGreaterThan(0);
    expect(screen.getAllByRole('link', { name: /Galería/i }).length).toBeGreaterThan(0);
  });

  it('dispatches open-whatsapp event when Contactanos button is clicked', () => {
    const dispatchMock = vi.fn();
    vi.stubGlobal('dispatchEvent', dispatchMock);

    render(<Header />);

    // Hacemos click en el botón de contactanos (desktop)
    const contactanosButton = screen.getAllByRole('button', { name: /Contactanos/i })[0];
    fireEvent.click(contactanosButton);

    expect(dispatchMock).toHaveBeenCalledWith(
      expect.objectContaining({ type: 'open-whatsapp' })
    );
  });

  it('scrolls to element when clicking section links on Home page', () => {
    const scrollMock = vi.fn();
    vi.spyOn(document, 'getElementById').mockReturnValue({
      scrollIntoView: scrollMock,
    } as any);

    render(<Header />);

    const experienciaLink = screen.getAllByRole('link', { name: /La Experiencia/i })[0];
    fireEvent.click(experienciaLink);

    expect(document.getElementById).toHaveBeenCalledWith('experiencia');
    expect(scrollMock).toHaveBeenCalledWith({ behavior: 'smooth', block: 'start' });
  });

  it('allows natural navigation to /galeria without scrollIntoView', () => {
    const scrollMock = vi.fn();
    vi.spyOn(document, 'getElementById').mockReturnValue({
      scrollIntoView: scrollMock,
    } as any);

    render(<Header />);

    const galeriaLink = screen.getAllByRole('link', { name: /Galería/i })[0];
    fireEvent.click(galeriaLink);

    // No debe buscar ni hacer scroll a un elemento de galería
    expect(scrollMock).not.toHaveBeenCalled();
  });

  it('toggles mobile menu on drawer button click', () => {
    const { container } = render(<Header />);

    const menuButton = screen.getByLabelText(/Abrir menú/i);
    
    // Buscar el contenedor del menú móvil
    const mobileMenuContainer = container.querySelector('.md\\:hidden.fixed');
    
    // Inicialmente debe estar colapsado (opacidad 0 y max-h-0)
    expect(mobileMenuContainer).toHaveClass('opacity-0');
    expect(mobileMenuContainer).toHaveClass('max-h-0');

    // Click para abrir
    fireEvent.click(menuButton);
    expect(mobileMenuContainer).toHaveClass('opacity-100');
    expect(mobileMenuContainer).toHaveClass('max-h-screen');

    // Click para cerrar
    fireEvent.click(menuButton);
    expect(mobileMenuContainer).toHaveClass('opacity-0');
    expect(mobileMenuContainer).toHaveClass('max-h-0');
  });
});
