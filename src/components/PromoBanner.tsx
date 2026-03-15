import { ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { useNavigation } from '@/context/NavigationContext';

export function PromoBanner() {
  const { navigate } = useNavigation();
  return (
    <section className="relative overflow-hidden">
      <div className="grid lg:grid-cols-2">
        {/* Imagen Izquierda */}
        <div className="relative min-h-[500px] lg:min-h-[700px]">
          <motion.img
            src="https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?q=80&w=1200&auto=format&fit=crop"
            alt="Artesano elaborando muebles de madera"
            className="absolute inset-0 w-full h-full object-cover"
            initial={{ scale: 1.1 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.5 }}
          />
        </div>

        {/* Contenido Derecha */}
        <div className="bg-dark-brown flex items-center justify-center px-8 lg:px-20 py-20">
          <motion.div
            className="max-w-lg"
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <span className="text-[11px] font-semibold tracking-[0.3em] uppercase text-brand-light">
              Por Qué ErgoCraft
            </span>
            <h2 className="font-serif text-4xl md:text-5xl font-bold text-white mt-4 leading-tight">
              Donde el <span className="italic text-brand-light">Oficio</span> se une a la Conciencia
            </h2>
            <p className="text-white/60 text-lg leading-relaxed mt-6 mb-8">
              Creemos que los grandes muebles comienzan con grandes materiales y las manos que los moldean. Cada pieza nace en nuestro taller a partir de maderas de origen sostenible, telas premium y un profundo respeto por el medio ambiente. Sin atajos, sin compromisos — solo calidad honesta y duradera.
            </p>

            <div className="grid grid-cols-3 gap-6 mb-10">
              <div className="border-t border-white/20 pt-4">
                <p className="font-serif text-3xl font-bold text-brand-light">100%</p>
                <p className="text-xs tracking-widest uppercase text-white/50 mt-1">Madera Natural</p>
              </div>
              <div className="border-t border-white/20 pt-4">
                <p className="font-serif text-3xl font-bold text-brand-light">50+</p>
                <p className="text-xs tracking-widest uppercase text-white/50 mt-1">Artesanos</p>
              </div>
              <div className="border-t border-white/20 pt-4">
                <p className="font-serif text-3xl font-bold text-brand-light">Cero</p>
                <p className="text-xs tracking-widest uppercase text-white/50 mt-1">Residuos</p>
              </div>
            </div>

            <button
              onClick={() => navigate({ type: 'about' })}
              className="inline-flex items-center gap-3 bg-brand text-white px-8 py-4 text-xs font-semibold tracking-widest uppercase hover:bg-brand-light transition-colors duration-300 group"
            >
              Conoce Más Sobre Nosotros
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
