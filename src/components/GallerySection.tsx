import { motion } from 'framer-motion';
import { Instagram, ArrowUpRight } from 'lucide-react';

const images = [
  'https://images.unsplash.com/photo-1631679706909-1844bbd07221?q=80&w=500&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?q=80&w=500&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1600210492493-0946911123ea?q=80&w=500&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?q=80&w=500&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1618220179428-22790b461013?q=80&w=500&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?q=80&w=500&auto=format&fit=crop',
];

export function GallerySection() {
  return (
    <section className="py-24 lg:py-32 bg-white">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-10 mb-14 text-center">
        <span className="text-[11px] font-semibold tracking-[0.3em] uppercase text-brand">
          @ergocraft
        </span>
        <h2 className="font-serif text-4xl md:text-5xl font-bold text-dark mt-3">
          Sigue Nuestro <span className="italic">Camino</span>
        </h2>
        <p className="mt-4 text-warm-gray text-lg max-w-xl mx-auto mb-6">
          Mira cómo nuestra comunidad decora con sus piezas ErgoCraft. Etiquétanos con #MiErgoCraft para tener la oportunidad de aparecer.
        </p>
        <a
          href="https://www.instagram.com/"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 text-xs font-semibold tracking-widest uppercase text-brand hover:text-dark transition-colors group"
        >
          <Instagram className="w-4 h-4" />
          Seguir en Instagram
          <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
        </a>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-2">
        {images.map((img, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: i * 0.08 }}
            className="relative group aspect-square overflow-hidden cursor-pointer"
          >
            <img
              src={img}
              alt={`Foto de la comunidad ${i + 1}`}
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-dark/0 group-hover:bg-dark/50 transition-colors duration-300 flex items-center justify-center">
              <Instagram className="w-6 h-6 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300" strokeWidth={1.5} />
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
