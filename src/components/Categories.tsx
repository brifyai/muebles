import { ArrowUpRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { useNavigation } from '@/context/NavigationContext';
import { categories } from '@/data/products';

export function Categories() {
  const { navigate } = useNavigation();

  return (
    <section className="py-24 lg:py-32 bg-white" id="collections">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-10">
        {/* Encabezado */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-16">
          <div>
            <span className="text-[11px] font-semibold tracking-[0.3em] uppercase text-brand">
              Comprar por Categoría
            </span>
            <h2 className="font-serif text-4xl md:text-5xl font-bold text-dark mt-3">
              Explora Nuestras <span className="italic">Colecciones</span>
            </h2>
          </div>
          <button
            className="mt-4 md:mt-0 inline-flex items-center gap-2 text-sm font-semibold tracking-wider uppercase text-dark hover:text-brand transition-colors group"
          >
            Ver Todas las Categorías
            <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </button>
        </div>

        {/* Grid - 4 columnas iguales */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {categories.map((cat, i) => (
            <motion.button
              key={cat.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              onClick={() =>
                navigate({ type: 'category', slug: cat.slug, name: cat.name })
              }
              className="group relative overflow-hidden cursor-pointer text-left aspect-[3/4]"
            >
              <img
                src={cat.image}
                alt={cat.name}
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

              <div className="absolute bottom-0 left-0 w-full p-6 lg:p-8">
                <p className="text-[10px] tracking-[0.25em] uppercase text-white/70 mb-1">
                  {cat.count} Productos
                </p>
                <h3 className="font-serif text-2xl lg:text-3xl font-bold text-white mb-1">
                  {cat.name}
                </h3>
                <p className="text-sm text-white/70 mb-4">{cat.subtitle}</p>
                <span className="inline-flex items-center gap-2 text-xs font-semibold tracking-widest uppercase text-white opacity-0 translate-y-3 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
                  Comprar Ahora <ArrowUpRight className="w-3.5 h-3.5" />
                </span>
              </div>
            </motion.button>
          ))}
        </div>
      </div>
    </section>
  );
}
