import { useMemo } from 'react';
import { motion } from 'framer-motion';
import {
  ChevronRight,
  Clock,
  Calendar,
  Tag,
  ArrowRight,
  Share2,
  Star,
  MessageCircle,
  Heart,
} from 'lucide-react';
import { useNavigation } from '@/context/NavigationContext';
import { blogPosts } from '@/data/blog';

export function BlogPage({ blogSlug }: { blogSlug: string }) {
  const { goHome, navigate } = useNavigation();
  const post = blogPosts.find((p) => p.slug === blogSlug);

  const relatedPosts = useMemo(() => {
    if (!post) return [];
    return blogPosts.filter((p) => post.relatedIds.includes(p.id));
  }, [post]);

  if (!post) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <p className="text-warm-gray text-lg">Artículo no encontrado.</p>
      </div>
    );
  }

  return (
    <div className="bg-white">
      {/* Hero Image */}
      <section className="relative h-[50vh] md:h-[65vh] overflow-hidden">
        <motion.img
          src={post.heroImage}
          alt={post.title}
          className="absolute inset-0 w-full h-full object-cover"
          initial={{ scale: 1.1 }}
          animate={{ scale: 1 }}
          transition={{ duration: 1.5 }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-dark/80 via-dark/30 to-dark/10" />

        <div className="absolute inset-0 flex flex-col justify-end">
          <div className="max-w-[900px] mx-auto w-full px-6 pb-12 md:pb-16">
            {/* Breadcrumbs */}
            <nav className="flex items-center gap-2 text-xs text-white/60 tracking-wider uppercase mb-6">
              <button onClick={goHome} className="hover:text-white transition-colors">
                Inicio
              </button>
              <ChevronRight className="w-3 h-3" />
              <button onClick={goHome} className="hover:text-white transition-colors">
                Blog
              </button>
              <ChevronRight className="w-3 h-3" />
              <span className="text-white/80">{post.category}</span>
            </nav>

            {/* Category Badge */}
            <span className="inline-block bg-brand text-white text-[10px] font-bold tracking-[0.2em] uppercase px-4 py-1.5 mb-5">
              {post.category}
            </span>

            {/* Title */}
            <motion.h1
              className="font-serif text-3xl md:text-5xl lg:text-6xl font-bold text-white leading-[1.1] mb-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.6 }}
            >
              {post.title}
            </motion.h1>

            {/* Meta */}
            <motion.div
              className="flex flex-wrap items-center gap-4 md:gap-6 text-white/70 text-sm"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.5 }}
            >
              <div className="flex items-center gap-3">
                <img
                  src={post.author.avatar}
                  alt={post.author.name}
                  className="w-10 h-10 rounded-full object-cover border-2 border-white/30"
                />
                <div>
                  <p className="text-white text-sm font-medium">{post.author.name}</p>
                  <p className="text-white/50 text-xs">{post.author.role}</p>
                </div>
              </div>
              <span className="w-px h-6 bg-white/20 hidden md:block" />
              <div className="flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5" />
                <span>{post.date}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5" />
                <span>{post.readTime}</span>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Article Body */}
      <article className="max-w-[800px] mx-auto px-6 py-14 md:py-20">
        {/* Excerpt / Lead */}
        <motion.p
          className="font-serif text-xl md:text-2xl text-dark leading-relaxed mb-12 pb-12 border-b border-light-gray"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
        >
          {post.excerpt}
        </motion.p>

        {/* Content Blocks */}
        <div className="space-y-8">
          {post.content.map((block, i) => {
            switch (block.type) {
              case 'paragraph':
                return (
                  <motion.p
                    key={i}
                    initial={{ opacity: 0, y: 15 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: '-50px' }}
                    transition={{ duration: 0.5 }}
                    className="text-warm-gray text-[17px] leading-[1.85]"
                  >
                    {block.text}
                  </motion.p>
                );
              case 'heading':
                return (
                  <motion.h2
                    key={i}
                    initial={{ opacity: 0, y: 15 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: '-50px' }}
                    transition={{ duration: 0.5 }}
                    className="font-serif text-2xl md:text-3xl font-bold text-dark mt-14 mb-4 leading-tight"
                  >
                    {block.text}
                  </motion.h2>
                );
              case 'image':
                return (
                  <motion.figure
                    key={i}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: '-50px' }}
                    transition={{ duration: 0.6 }}
                    className="my-12"
                  >
                    <div className="relative overflow-hidden -mx-6 md:-mx-16 lg:-mx-24">
                      <img
                        src={block.src}
                        alt={block.caption || ''}
                        className="w-full h-auto object-cover"
                      />
                    </div>
                    {block.caption && (
                      <figcaption className="text-xs text-warm-gray mt-4 italic tracking-wide text-center">
                        {block.caption}
                      </figcaption>
                    )}
                  </motion.figure>
                );
              case 'quote':
                return (
                  <motion.blockquote
                    key={i}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, margin: '-50px' }}
                    transition={{ duration: 0.6 }}
                    className="my-12 pl-8 border-l-4 border-brand py-4"
                  >
                    <p className="font-serif text-xl md:text-2xl text-dark italic leading-relaxed mb-4">
                      "{block.text}"
                    </p>
                    {block.author && (
                      <cite className="text-sm text-brand not-italic font-semibold tracking-wide">
                        — {block.author}
                      </cite>
                    )}
                  </motion.blockquote>
                );
              case 'list':
                return (
                  <motion.ul
                    key={i}
                    initial={{ opacity: 0, y: 15 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: '-50px' }}
                    transition={{ duration: 0.5 }}
                    className="my-8 space-y-4 pl-0"
                  >
                    {block.items?.map((item, j) => (
                      <li key={j} className="flex items-start gap-4">
                        <span className="w-2 h-2 bg-brand rounded-full mt-2.5 flex-shrink-0" />
                        <span className="text-warm-gray text-[17px] leading-[1.85]">
                          {item}
                        </span>
                      </li>
                    ))}
                  </motion.ul>
                );
              default:
                return null;
            }
          })}
        </div>

        {/* Tags */}
        <div className="mt-16 pt-10 border-t border-light-gray">
          <div className="flex items-center gap-3 flex-wrap">
            <Tag className="w-4 h-4 text-brand" />
            {post.tags.map((tag) => (
              <span
                key={tag}
                className="px-4 py-1.5 bg-cream text-dark text-xs tracking-wider uppercase font-medium hover:bg-brand hover:text-white transition-colors cursor-pointer"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>

        {/* Share & Actions */}
        <div className="mt-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 pb-10 border-b border-light-gray">
          <div className="flex items-center gap-4">
            <span className="text-xs font-bold tracking-[0.15em] uppercase text-dark">
              Compartir
            </span>
            <div className="flex items-center gap-2">
              {['Fb', 'Tw', 'Li', 'Pi'].map((s) => (
                <button
                  key={s}
                  className="w-9 h-9 border border-light-gray flex items-center justify-center text-[11px] font-bold text-warm-gray hover:bg-dark hover:text-white hover:border-dark transition-all"
                >
                  {s}
                </button>
              ))}
              <button className="w-9 h-9 border border-light-gray flex items-center justify-center text-warm-gray hover:bg-dark hover:text-white hover:border-dark transition-all">
                <Share2 className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <button className="flex items-center gap-2 text-xs font-semibold tracking-wider uppercase text-warm-gray hover:text-red-500 transition-colors">
              <Heart className="w-4 h-4" />
              Me Gusta
            </button>
            <button className="flex items-center gap-2 text-xs font-semibold tracking-wider uppercase text-warm-gray hover:text-brand transition-colors">
              <MessageCircle className="w-4 h-4" />
              3 Comentarios
            </button>
          </div>
        </div>

        {/* Author Box */}
        <div className="mt-10 bg-cream p-8 md:p-10 flex flex-col sm:flex-row gap-6 items-start">
          <img
            src={post.author.avatar}
            alt={post.author.name}
            className="w-20 h-20 rounded-full object-cover border-4 border-white shadow-md flex-shrink-0"
          />
          <div>
            <p className="text-[10px] tracking-[0.25em] uppercase text-brand font-semibold mb-2">
              Sobre el Autor
            </p>
            <h3 className="font-serif text-xl font-bold text-dark mb-1">
              {post.author.name}
            </h3>
            <p className="text-sm text-warm-gray mb-3">{post.author.role}</p>
            <p className="text-warm-gray text-sm leading-relaxed">
              Especialista en diseño, materiales y bienestar aplicado al mobiliario.
              Escribe regularmente sobre la intersección entre artesanía, ergonomía
              y vida cotidiana.
            </p>
          </div>
        </div>

        {/* Comments Preview */}
        <div className="mt-14">
          <h3 className="font-serif text-2xl font-bold text-dark mb-8 flex items-center gap-3">
            <MessageCircle className="w-5 h-5 text-brand" />
            Comentarios (3)
          </h3>

          <div className="space-y-8">
            {[
              {
                name: 'Laura M.',
                date: 'Hace 3 días',
                text: 'Excelente artículo. Cambié mi silla de oficina después de leer esto y la diferencia ha sido notable. Mi espalda lo agradece cada día.',
                rating: 5,
              },
              {
                name: 'Roberto K.',
                date: 'Hace 1 semana',
                text: 'Muy interesante la parte sobre la inclinación del respaldo. Siempre pensé que sentarse recto era lo mejor, pero tiene sentido lo que explican sobre el movimiento dinámico.',
                rating: 4,
              },
              {
                name: 'Diana P.',
                date: 'Hace 2 semanas',
                text: 'Me encanta el enfoque de ErgoCraft de combinar ciencia con artesanía. No muchas marcas se toman en serio ambos aspectos. Felicidades por este contenido.',
                rating: 5,
              },
            ].map((comment, i) => (
              <div
                key={i}
                className="flex gap-4 pb-8 border-b border-light-gray last:border-0"
              >
                <div className="w-10 h-10 bg-brand/10 rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-brand font-bold text-sm">
                    {comment.name.charAt(0)}
                  </span>
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-2">
                    <div>
                      <span className="text-sm font-semibold text-dark">
                        {comment.name}
                      </span>
                      <span className="text-xs text-warm-gray ml-3">
                        {comment.date}
                      </span>
                    </div>
                    <div className="flex gap-0.5">
                      {Array.from({ length: comment.rating }).map((_, j) => (
                        <Star
                          key={j}
                          className="w-3 h-3 text-brand fill-brand"
                        />
                      ))}
                    </div>
                  </div>
                  <p className="text-warm-gray text-sm leading-relaxed">
                    {comment.text}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Comment Form */}
          <div className="mt-10 bg-cream/50 border border-light-gray p-8">
            <h4 className="font-serif text-xl font-bold text-dark mb-6">
              Deja tu Comentario
            </h4>
            <div className="grid md:grid-cols-2 gap-4 mb-4">
              <input
                type="text"
                placeholder="Tu nombre"
                className="w-full bg-white border border-light-gray px-5 py-3.5 text-sm text-dark placeholder:text-warm-gray focus:outline-none focus:border-brand transition-colors"
              />
              <input
                type="email"
                placeholder="Tu correo electrónico"
                className="w-full bg-white border border-light-gray px-5 py-3.5 text-sm text-dark placeholder:text-warm-gray focus:outline-none focus:border-brand transition-colors"
              />
            </div>
            <textarea
              rows={4}
              placeholder="Escribe tu comentario..."
              className="w-full bg-white border border-light-gray px-5 py-3.5 text-sm text-dark placeholder:text-warm-gray focus:outline-none focus:border-brand transition-colors resize-none mb-4"
            />
            <button className="bg-dark text-white px-8 py-3.5 text-xs font-bold tracking-[0.2em] uppercase hover:bg-brand transition-colors">
              Publicar Comentario
            </button>
          </div>
        </div>
      </article>

      {/* Related Posts */}
      {relatedPosts.length > 0 && (
        <section className="border-t border-light-gray bg-cream/30">
          <div className="max-w-[1400px] mx-auto px-6 lg:px-10 py-20 lg:py-28">
            <div className="text-center mb-14">
              <span className="text-[11px] font-semibold tracking-[0.3em] uppercase text-brand">
                Sigue Leyendo
              </span>
              <h2 className="font-serif text-3xl md:text-4xl font-bold text-dark mt-3">
                Artículos <span className="italic">Relacionados</span>
              </h2>
            </div>

            <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              {relatedPosts.map((rp, i) => (
                <motion.article
                  key={rp.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  className="group cursor-pointer bg-white"
                  onClick={() => navigate({ type: 'blog', slug: rp.slug })}
                >
                  <div className="relative overflow-hidden aspect-[16/10]">
                    <img
                      src={rp.image}
                      alt={rp.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-1.5 text-[10px] font-bold tracking-widest uppercase text-dark">
                      {rp.category}
                    </div>
                  </div>
                  <div className="p-6">
                    <div className="flex items-center gap-3 text-xs text-warm-gray mb-3 tracking-wide">
                      <span>{rp.date}</span>
                      <span className="w-1 h-1 rounded-full bg-warm-gray" />
                      <span>{rp.readTime}</span>
                    </div>
                    <h3 className="font-serif text-xl font-bold text-dark mb-3 group-hover:text-brand transition-colors leading-snug">
                      {rp.title}
                    </h3>
                    <p className="text-warm-gray text-sm leading-relaxed mb-4 line-clamp-2">
                      {rp.excerpt}
                    </p>
                    <span className="inline-flex items-center gap-2 text-xs font-semibold tracking-widest uppercase text-dark group-hover:text-brand transition-colors">
                      Leer Artículo <ArrowRight className="w-3.5 h-3.5" />
                    </span>
                  </div>
                </motion.article>
              ))}
            </div>

            {/* Back to Blog */}
            <div className="text-center mt-14">
              <button
                onClick={goHome}
                className="inline-flex items-center gap-3 border-2 border-dark px-10 py-4 text-xs font-semibold tracking-widest uppercase text-dark hover:bg-dark hover:text-white transition-all duration-300 group"
              >
                Volver al Inicio
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
