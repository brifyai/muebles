import { ArrowUpRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { useNavigation } from '@/context/NavigationContext';
import { blogPosts } from '@/data/blog';

export function BlogPreview() {
  const { navigate } = useNavigation();

  return (
    <section className="py-24 lg:py-32 bg-cream" id="journal">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-10">
        {/* Encabezado */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-16">
          <div>
            <span className="text-[11px] font-semibold tracking-[0.3em] uppercase text-brand">
              De Nuestro Blog
            </span>
            <h2 className="font-serif text-4xl md:text-5xl font-bold text-dark mt-3">
              Historias e <span className="italic">Inspiración</span>
            </h2>
          </div>
          <button
            className="mt-4 md:mt-0 inline-flex items-center gap-2 text-sm font-semibold tracking-wider uppercase text-dark hover:text-brand transition-colors group"
          >
            Leer Todos los Artículos
            <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </button>
        </div>

        {/* Artículos */}
        <div className="grid md:grid-cols-3 gap-8">
          {blogPosts.map((post, i) => (
            <motion.article
              key={post.id}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              className="group cursor-pointer"
              onClick={() => navigate({ type: 'blog', slug: post.slug })}
            >
              <div className="relative overflow-hidden aspect-[4/3] mb-6">
                <img
                  src={post.image}
                  alt={post.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-1.5 text-[10px] font-bold tracking-widest uppercase text-dark">
                  {post.category}
                </div>
              </div>

              <div className="flex items-center gap-3 text-xs text-warm-gray mb-3 tracking-wide">
                <span>{post.date}</span>
                <span className="w-1 h-1 rounded-full bg-warm-gray" />
                <span>{post.readTime}</span>
              </div>

              <h3 className="font-serif text-xl font-bold text-dark mb-3 group-hover:text-brand transition-colors leading-snug">
                {post.title}
              </h3>

              <p className="text-warm-gray text-sm leading-relaxed mb-4">
                {post.excerpt}
              </p>

              <span className="inline-flex items-center gap-1.5 text-xs font-semibold tracking-widest uppercase text-dark group-hover:text-brand transition-colors">
                Leer Más <ArrowUpRight className="w-3.5 h-3.5" />
              </span>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
