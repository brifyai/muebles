import { ArrowUpRight } from 'lucide-react';
import { useNavigation } from '@/context/NavigationContext';

export function Footer() {
  const { navigate, goHome } = useNavigation();

  const handleFooterLink = (link: string) => {
    if (link === 'Contáctanos') {
      navigate({ type: 'contact' });
    } else if (link === 'Nuestra Historia') {
      navigate({ type: 'about' });
    } else if (link === 'Taller') {
      navigate({ type: 'showroom' });
    } else if (link === 'Artesanos') {
      navigate({ type: 'brands' });
    } else if (link === 'Sostenibilidad') {
      navigate({ type: 'services' });
    } else if (link === 'Envíos y Entregas' || link === 'Devoluciones y Cambios') {
      navigate({ type: 'shipping' });
    } else if (link === 'Sala de Estar') {
      navigate({ type: 'category', slug: 'living-room', name: 'Sala de Estar' });
    } else if (link === 'Oficina en Casa') {
      navigate({ type: 'category', slug: 'home-office', name: 'Oficina en Casa' });
    } else if (link === 'Dormitorio') {
      navigate({ type: 'category', slug: 'bedroom', name: 'Dormitorio' });
    } else if (link === 'Comedor') {
      navigate({ type: 'category', slug: 'dining', name: 'Comedor' });
    } else {
      goHome();
    }
  };

  return (
    <footer className="bg-dark-brown text-white" id="contact">
      {/* Footer Principal */}
      <div className="max-w-[1400px] mx-auto px-6 lg:px-10 py-20">
        <div className="grid md:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-8">
          {/* Marca */}
          <div className="lg:col-span-4">
            <div className="mb-6">
              <span className="font-serif text-3xl font-bold tracking-tight">
                Ergo<span className="text-brand-light">Craft</span>
              </span>
              <p className="text-[8px] tracking-[0.35em] uppercase text-white/40 mt-0.5">
                Muebles &amp; Diseño
              </p>
            </div>
            <p className="text-white/50 text-sm leading-relaxed max-w-sm mb-8">
              Muebles diseñados para la forma en que vives. Cada pieza está elaborada con cuidado, construida para durar y entregada con un compromiso de calidad que ha sido nuestro sello durante más de 15 años.
            </p>
            <div className="flex items-center gap-4">
              {[
                { name: 'Instagram', url: 'https://www.instagram.com/' },
                { name: 'Pinterest', url: 'https://www.pinterest.com/' },
                { name: 'Facebook', url: 'https://www.facebook.com/' },
                { name: 'LinkedIn', url: 'https://www.linkedin.com/' },
              ].map((social) => (
                <a
                  key={social.name}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[11px] font-semibold tracking-widest uppercase text-white/40 hover:text-brand-light transition-colors"
                >
                  {social.name.slice(0, 2)}
                </a>
              ))}
            </div>
          </div>

          {/* Tienda */}
          <div className="lg:col-span-2">
            <h4 className="text-xs font-semibold tracking-[0.25em] uppercase text-white/80 mb-6">Tienda</h4>
            <ul className="space-y-3.5">
              {['Sala de Estar', 'Oficina en Casa', 'Dormitorio', 'Comedor', 'Novedades', 'Ofertas'].map((link) => (
                <li key={link}>
                  <button onClick={() => handleFooterLink(link)} className="text-sm text-white/50 hover:text-brand-light transition-colors">{link}</button>
                </li>
              ))}
            </ul>
          </div>

          {/* Empresa */}
          <div className="lg:col-span-2">
            <h4 className="text-xs font-semibold tracking-[0.25em] uppercase text-white/80 mb-6">Empresa</h4>
            <ul className="space-y-3.5">
              {['Nuestra Historia', 'Taller', 'Artesanos', 'Sostenibilidad', 'Empleos', 'Prensa'].map((link) => (
                <li key={link}>
                  <button onClick={() => handleFooterLink(link)} className="text-sm text-white/50 hover:text-brand-light transition-colors">{link}</button>
                </li>
              ))}
            </ul>
          </div>

          {/* Soporte */}
          <div className="lg:col-span-2">
            <h4 className="text-xs font-semibold tracking-[0.25em] uppercase text-white/80 mb-6">Atención al Cliente</h4>
            <ul className="space-y-3.5">
              {['Contáctanos', 'Preguntas Frecuentes', 'Envíos y Entregas', 'Devoluciones y Cambios', 'Garantía', 'Guía de Cuidado'].map((link) => (
                <li key={link}>
                  <button onClick={() => handleFooterLink(link)} className="text-sm text-white/50 hover:text-brand-light transition-colors">{link}</button>
                </li>
              ))}
            </ul>
          </div>

          {/* Showroom */}
          <div className="lg:col-span-2">
            <h4 className="text-xs font-semibold tracking-[0.25em] uppercase text-white/80 mb-6">Visítanos</h4>
            <div className="text-sm text-white/50 leading-relaxed mb-4">
              <p>245 Distrito de Diseño</p>
              <p>Nueva York, NY 10013</p>
              <p className="mt-3">Lun – Sáb: 10am – 7pm</p>
              <p>Domingo: 12pm – 5pm</p>
            </div>
            <a
              href="#"
              className="inline-flex items-center gap-1.5 text-xs font-semibold tracking-widest uppercase text-brand-light hover:text-white transition-colors group"
            >
              Cómo Llegar
              <ArrowUpRight className="w-3 h-3 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </a>
          </div>
        </div>
      </div>

      {/* Barra Inferior */}
      <div className="border-t border-white/10">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-10 py-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs text-white/30 tracking-wide">
            © 2024 ErgoCraft. Todos los derechos reservados.
          </p>
          <div className="flex items-center gap-6">
            {['Política de Privacidad', 'Términos de Servicio', 'Configuración de Cookies'].map((link) => (
              <a key={link} href="#" className="text-xs text-white/30 hover:text-white/60 transition-colors tracking-wide">
                {link}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
