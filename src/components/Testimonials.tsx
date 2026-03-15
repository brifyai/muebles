import { Star, ChevronLeft, ChevronRight } from 'lucide-react';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const testimonials = [
  {
    id: 1,
    name: 'Isabelle Laurent',
    role: 'Arquitecta de Interiores',
    location: 'París, Francia',
    image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=200&auto=format&fit=crop',
    content: "Llevo más de una década seleccionando muebles para clientes, y ErgoCraft entrega consistentemente piezas que superan las expectativas. La atención al detalle en sus ensamblajes y acabados es notable — puedes sentir la calidad en el momento en que los tocas.",
    rating: 5,
    product: 'Sillón Meridian',
  },
  {
    id: 2,
    name: 'James Whitfield',
    role: 'Director Creativo',
    location: 'Londres, Reino Unido',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=200&auto=format&fit=crop',
    content: "El Escritorio Oslo transformó completamente mi estudio en casa. Es una de esas raras piezas que logra ser tanto un caballo de batalla funcional como una verdadera declaración de diseño. Mi productividad ha aumentado y también mi ánimo.",
    rating: 5,
    product: 'Escritorio Oslo',
  },
  {
    id: 3,
    name: 'Sofía Andersen',
    role: 'Coach de Bienestar',
    location: 'Copenhague, Dinamarca',
    image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=200&auto=format&fit=crop',
    content: "Como alguien apasionada por la vida sostenible, encontrar ErgoCraft fue una revelación. Su compromiso con materiales ecológicos y producción sin residuos es genuino, no solo marketing. Y el Sofá Velvet Cloud se ha convertido en el corazón de nuestro hogar.",
    rating: 5,
    product: 'Sofá Velvet Cloud',
  },
];

export function Testimonials() {
  const [current, setCurrent] = useState(0);

  const next = () => setCurrent((prev) => (prev + 1) % testimonials.length);
  const prev = () => setCurrent((prev) => (prev - 1 + testimonials.length) % testimonials.length);

  const t = testimonials[current];

  return (
    <section className="py-24 lg:py-32 bg-cream">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Izquierda */}
          <div>
            <span className="text-[11px] font-semibold tracking-[0.3em] uppercase text-brand">
              Testimonios
            </span>
            <h2 className="font-serif text-4xl md:text-5xl font-bold text-dark mt-3 mb-10">
              Lo Que Dicen Nuestros <span className="italic">Clientes</span>
            </h2>

            <AnimatePresence mode="wait">
              <motion.div
                key={t.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.4 }}
              >
                <div className="flex gap-1 mb-6">
                  {[...Array(t.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 text-brand fill-brand" />
                  ))}
                </div>

                <blockquote className="font-serif text-2xl md:text-3xl text-dark leading-snug mb-8 italic">
                  "{t.content}"
                </blockquote>

                <div className="flex items-center gap-4 mb-2">
                  <img
                    src={t.image}
                    alt={t.name}
                    className="w-14 h-14 rounded-full object-cover border-2 border-brand"
                  />
                  <div>
                    <p className="font-bold text-dark">{t.name}</p>
                    <p className="text-sm text-warm-gray">{t.role} — {t.location}</p>
                  </div>
                </div>
                <p className="text-xs tracking-widest uppercase text-brand mt-3">
                  Compró: {t.product}
                </p>
              </motion.div>
            </AnimatePresence>

            {/* Controles */}
            <div className="flex items-center gap-4 mt-10">
              <button
                onClick={prev}
                className="w-12 h-12 border border-dark flex items-center justify-center hover:bg-dark hover:text-white transition-all"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                onClick={next}
                className="w-12 h-12 border border-dark flex items-center justify-center hover:bg-dark hover:text-white transition-all"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
              <span className="text-sm text-warm-gray ml-4">
                {String(current + 1).padStart(2, '0')} / {String(testimonials.length).padStart(2, '0')}
              </span>
            </div>
          </div>

          {/* Imagen Derecha */}
          <div className="relative hidden lg:block">
            <AnimatePresence mode="wait">
              <motion.div
                key={t.id}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 1.05 }}
                transition={{ duration: 0.5 }}
                className="relative"
              >
                <img
                  src="https://images.unsplash.com/photo-1600210492493-0946911123ea?q=80&w=800&auto=format&fit=crop"
                  alt="Hermoso espacio interior"
                  className="w-full h-[600px] object-cover"
                />
                <div className="absolute -bottom-6 -left-6 bg-brand p-6 text-white">
                  <p className="font-serif text-4xl font-bold">4.9</p>
                  <p className="text-xs tracking-widest uppercase mt-1 text-white/70">Valoración Promedio</p>
                  <div className="flex gap-0.5 mt-2">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-3 h-3 fill-white text-white" />
                    ))}
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
