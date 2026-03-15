import { ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { useNavigation } from '@/context/NavigationContext';

export function Hero() {
  const { navigate } = useNavigation();
  return (
    <section className="relative bg-cream overflow-hidden">
      <div className="max-w-[1400px] mx-auto">
        <div className="grid lg:grid-cols-2 min-h-[85vh]">
          {/* Texto Izquierda */}
          <div className="flex flex-col justify-center px-6 lg:px-16 py-20 lg:py-0 order-2 lg:order-1">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <span className="inline-block text-[11px] font-semibold tracking-[0.3em] uppercase text-brand mb-6 border border-brand/30 px-4 py-1.5 rounded-full">
                Nueva Temporada 2024
              </span>

              <h1 className="font-serif text-5xl md:text-6xl xl:text-7xl font-bold text-dark leading-[1.05] mb-6 text-balance">
                Diseñado para abrazar{' '}
                <span className="italic text-brand">espacios</span>.{' '}
                Forjado para abrir caminos
              </h1>

              <p className="text-warm-gray text-lg md:text-xl leading-relaxed max-w-lg mb-10">
                Descubre muebles que transforman tus espacios en refugios de estilo y bienestar. Cada pieza está elaborada con precisión, pasión y propósito.
              </p>

              <div className="flex flex-wrap items-center gap-4 mb-14">
                <button
                  onClick={() => navigate({ type: 'category', slug: 'living-room', name: 'Sala de Estar' })}
                  className="inline-flex items-center gap-3 bg-dark text-white px-8 py-4 text-sm font-semibold tracking-wider uppercase hover:bg-brand transition-colors duration-300 group"
                >
                  Comprar Ahora
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>
                <button
                  onClick={() => navigate({ type: 'about' })}
                  className="inline-flex items-center gap-2 px-6 py-4 text-sm font-semibold tracking-wider uppercase text-dark hover:text-brand transition-colors border-b-2 border-dark hover:border-brand"
                >
                  Nuestra Historia
                </button>
              </div>

              <div className="flex items-center gap-10">
                <div>
                  <p className="font-serif text-3xl font-bold text-dark">12k<span className="text-brand">+</span></p>
                  <p className="text-xs tracking-widest uppercase text-warm-gray mt-1">Clientes Felices</p>
                </div>
                <div className="w-px h-12 bg-light-gray" />
                <div>
                  <p className="font-serif text-3xl font-bold text-dark">250<span className="text-brand">+</span></p>
                  <p className="text-xs tracking-widest uppercase text-warm-gray mt-1">Diseños Únicos</p>
                </div>
                <div className="w-px h-12 bg-light-gray" />
                <div>
                  <p className="font-serif text-3xl font-bold text-dark">15</p>
                  <p className="text-xs tracking-widest uppercase text-warm-gray mt-1">Años de Oficio</p>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Imagen Derecha */}
          <div className="relative order-1 lg:order-2 min-h-[400px] lg:min-h-0">
            <motion.div
              className="absolute inset-0"
              initial={{ opacity: 0, scale: 1.05 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1.2 }}
            >
              <img
                src="https://images.unsplash.com/photo-1618220179428-22790b461013?q=80&w=1400&auto=format&fit=crop"
                alt="Interior moderno de sala de estar con muebles de diseño"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-cream/30 via-transparent to-transparent lg:block hidden" />
            </motion.div>

            {/* Badge Flotante */}
            <motion.div
              className="absolute bottom-8 left-8 bg-white/90 backdrop-blur-md p-5 shadow-xl hidden lg:block"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.8 }}
            >
              <p className="font-serif text-lg font-bold text-dark">Diseño Premiado</p>
              <p className="text-xs text-warm-gray mt-1">Mejor Diseño de Mobiliario 2024</p>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
