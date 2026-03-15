import { motion } from 'framer-motion';
import { ArrowRight, Play } from 'lucide-react';
import { useNavigation } from '@/context/NavigationContext';

const values = [
  {
    num: '01',
    title: 'Diseño con Propósito',
    desc: 'Cada pieza comienza con un propósito claro. No diseñamos para seguir tendencias — creamos muebles que resuelven problemas reales y mejoran la vida cotidiana.',
  },
  {
    num: '02',
    title: 'Materiales Honestos',
    desc: 'Seleccionamos maderas de bosques gestionados de forma responsable, cueros de curtidurías éticas y textiles de tejedores artesanales. Conocemos el origen de cada material.',
  },
  {
    num: '03',
    title: 'Artesanía Humana',
    desc: 'Más de 50 artesanos especializados dan vida a cada diseño. Sus manos, experiencia y orgullo son el corazón de lo que hacemos.',
  },
  {
    num: '04',
    title: 'Construido para Durar',
    desc: 'Rechazamos la cultura de lo desechable. Cada pieza está construida para durar generaciones, no temporadas. Es mejor para ti y mejor para el planeta.',
  },
];

const stats = [
  { value: '15+', label: 'Años de Experiencia' },
  { value: '12,000+', label: 'Hogares Transformados' },
  { value: '50+', label: 'Artesanos Expertos' },
  { value: '250+', label: 'Diseños Únicos' },
];

const galleryImages = [
  {
    src: 'https://images.unsplash.com/photo-1631679706909-1844bbd07221?q=80&w=800&auto=format&fit=crop',
    alt: 'Taller de carpintería',
    span: 'col-span-2 row-span-2',
  },
  {
    src: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?q=80&w=600&auto=format&fit=crop',
    alt: 'Sofá de terciopelo verde',
    span: 'col-span-1 row-span-1',
  },
  {
    src: 'https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?q=80&w=600&auto=format&fit=crop',
    alt: 'Sillón de cuero',
    span: 'col-span-1 row-span-1',
  },
  {
    src: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?q=80&w=600&auto=format&fit=crop',
    alt: 'Sala de estar moderna',
    span: 'col-span-1 row-span-1',
  },
  {
    src: 'https://images.unsplash.com/photo-1618220179428-22790b461013?q=80&w=800&auto=format&fit=crop',
    alt: 'Interior de diseño',
    span: 'col-span-1 row-span-2',
  },
  {
    src: 'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?q=80&w=600&auto=format&fit=crop',
    alt: 'Artesano trabajando',
    span: 'col-span-1 row-span-1',
  },
  {
    src: 'https://images.unsplash.com/photo-1600210492493-0946911123ea?q=80&w=600&auto=format&fit=crop',
    alt: 'Espacio de trabajo',
    span: 'col-span-1 row-span-1',
  },
  {
    src: 'https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?q=80&w=600&auto=format&fit=crop',
    alt: 'Detalle de sofá',
    span: 'col-span-2 row-span-1',
  },
];

const team = [
  {
    name: 'Elena Marchetti',
    role: 'Directora Creativa & Fundadora',
    image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=400&auto=format&fit=crop',
    quote: 'El buen diseño no grita. Susurra, y te hace sentir como en casa.',
  },
  {
    name: 'Henrik Larsson',
    role: 'Director de Taller',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=400&auto=format&fit=crop',
    quote: 'La madera tiene memoria. Nuestro trabajo es escucharla y darle forma con respeto.',
  },
  {
    name: 'Sofía Torres',
    role: 'Directora de Sostenibilidad',
    image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=400&auto=format&fit=crop',
    quote: 'Cada decisión material es una decisión ambiental. Elegimos con conciencia.',
  },
];

export function AboutPage() {
  const { goHome } = useNavigation();

  return (
    <div className="bg-white">
      {/* ============ HERO ============ */}
      <section className="relative h-[70vh] md:h-[85vh] overflow-hidden">
        <motion.img
          src="https://images.unsplash.com/photo-1631679706909-1844bbd07221?q=80&w=2000&auto=format&fit=crop"
          alt="Taller artesanal ErgoCraft"
          className="absolute inset-0 w-full h-full object-cover"
          initial={{ scale: 1.1 }}
          animate={{ scale: 1 }}
          transition={{ duration: 1.5 }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-dark/80 via-dark/30 to-dark/10" />
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-6">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9 }}
          >
            <span className="inline-block text-[11px] font-semibold tracking-[0.4em] uppercase text-brand-light mb-6">
              Nuestra Historia
            </span>
            <h1 className="font-serif text-5xl md:text-7xl lg:text-8xl font-bold text-white leading-[1.05] mb-6 max-w-4xl mx-auto">
              Inspiración, <span className="italic text-brand-light">Oficio</span> & Alma
            </h1>
            <p className="text-white/70 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed mb-10">
              Desde un pequeño taller hasta hogares alrededor del mundo — esta es la historia de cómo la pasión por los materiales y el diseño se convirtió en ErgoCraft.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4">
              <button
                onClick={goHome}
                className="inline-flex items-center gap-3 bg-white text-dark px-8 py-4 text-xs font-bold tracking-[0.2em] uppercase hover:bg-brand hover:text-white transition-all duration-300 group"
              >
                Explorar Colecciones
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
              <button className="inline-flex items-center gap-3 border-2 border-white/40 text-white px-8 py-4 text-xs font-bold tracking-[0.2em] uppercase hover:bg-white/10 transition-all duration-300 group">
                <Play className="w-4 h-4" fill="currentColor" />
                Ver Nuestro Video
              </button>
            </div>
          </motion.div>
        </div>
        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2">
          <span className="text-[9px] tracking-[0.3em] uppercase text-white/40">Descubre</span>
          <div className="w-px h-10 bg-white/30 relative overflow-hidden">
            <div className="w-full h-1/2 bg-white/70 animate-bounce" />
          </div>
        </div>
      </section>

      {/* ============ INTRO / MANIFIESTO ============ */}
      <section className="py-24 lg:py-32">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-10">
          <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
            {/* Texto */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <span className="text-[11px] font-semibold tracking-[0.3em] uppercase text-brand mb-4 block">
                Quiénes Somos
              </span>
              <h2 className="font-serif text-4xl md:text-5xl font-bold text-dark leading-tight mb-6">
                Creemos que los muebles deben contar una <span className="italic">historia</span>
              </h2>
              <div className="space-y-4 text-warm-gray text-lg leading-relaxed">
                <p>
                  ErgoCraft nació en 2009 en un pequeño taller de carpintería con una idea simple: crear muebles que las personas amen durante décadas, no solo temporadas. Muebles que envejezcan con gracia, que mejoren con el uso, que se conviertan en parte de la familia.
                </p>
                <p>
                  Hoy, más de 50 artesanos trabajan en nuestro taller, cada uno maestro en su oficio. Seleccionamos materiales de fuentes responsables, aplicamos técnicas tradicionales de ensamblaje y terminamos cada pieza a mano. No hay atajos. No hay compromisos.
                </p>
                <p>
                  Cada pieza que sale de nuestro taller lleva la firma de quien la construyó — una marca de orgullo, autenticidad y responsabilidad personal.
                </p>
              </div>
              <div className="mt-10 flex items-center gap-6">
                <img
                  src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=100&auto=format&fit=crop"
                  alt="Elena Marchetti"
                  className="w-14 h-14 rounded-full object-cover border-2 border-brand"
                />
                <div>
                  <p className="font-serif text-lg italic text-dark">"El diseño sin alma es solo decoración."</p>
                  <p className="text-sm text-warm-gray mt-1">— Elena Marchetti, Fundadora</p>
                </div>
              </div>
            </motion.div>

            {/* Imagen */}
            <motion.div
              className="relative"
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <div className="relative">
                <img
                  src="https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?q=80&w=900&auto=format&fit=crop"
                  alt="Artesano en el taller"
                  className="w-full h-[550px] object-cover"
                />
                <div className="absolute -bottom-8 -left-8 bg-brand p-8 text-white hidden lg:block">
                  <p className="font-serif text-5xl font-bold">15+</p>
                  <p className="text-xs tracking-[0.25em] uppercase text-white/70 mt-1">
                    Años Creando
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ============ IMAGEN A PANTALLA COMPLETA ============ */}
      <section className="relative h-[50vh] md:h-[60vh] overflow-hidden">
        <motion.img
          src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=2000&auto=format&fit=crop"
          alt="Interior con muebles ErgoCraft"
          className="absolute inset-0 w-full h-full object-cover"
          initial={{ scale: 1.05 }}
          whileInView={{ scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2 }}
        />
        <div className="absolute inset-0 bg-dark/40" />
        <div className="absolute inset-0 flex items-center justify-center">
          <motion.p
            className="font-serif text-3xl md:text-5xl lg:text-6xl font-bold text-white text-center max-w-4xl px-6 leading-tight"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            "Creemos que el <span className="italic text-brand-light">buen diseño</span> transforma la forma en que vives, trabajas y te conectas."
          </motion.p>
        </div>
      </section>

      {/* ============ NUESTROS VALORES ============ */}
      <section className="py-24 lg:py-32 bg-cream">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-10">
          <div className="text-center mb-20">
            <span className="text-[11px] font-semibold tracking-[0.3em] uppercase text-brand">
              Nuestros Principios
            </span>
            <h2 className="font-serif text-4xl md:text-5xl font-bold text-dark mt-3">
              Lo Que Nos <span className="italic">Guía</span>
            </h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
            {values.map((value, i) => (
              <motion.div
                key={value.num}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
                className="group"
              >
                <span className="font-serif text-5xl font-bold text-brand/20 group-hover:text-brand/40 transition-colors">
                  {value.num}
                </span>
                <div className="border-t border-light-gray mt-4 pt-6">
                  <h3 className="font-serif text-xl font-bold text-dark mb-3">
                    {value.title}
                  </h3>
                  <p className="text-warm-gray text-sm leading-relaxed">
                    {value.desc}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ============ ESTADÍSTICAS ============ */}
      <section className="bg-dark-brown py-20">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-10">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
            {stats.map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="text-center"
              >
                <p className="font-serif text-4xl md:text-5xl font-bold text-brand-light">
                  {stat.value}
                </p>
                <p className="text-xs tracking-[0.25em] uppercase text-white/50 mt-3">
                  {stat.label}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ============ PROCESO / DETRÁS DE ESCENAS ============ */}
      <section className="py-24 lg:py-32">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-10">
          <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
            {/* Imágenes Grid */}
            <motion.div
              className="grid grid-cols-12 gap-4"
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <div className="col-span-7">
                <img
                  src="https://images.unsplash.com/photo-1631679706909-1844bbd07221?q=80&w=700&auto=format&fit=crop"
                  alt="Detalle de carpintería"
                  className="w-full h-[500px] object-cover"
                />
              </div>
              <div className="col-span-5 flex flex-col gap-4">
                <img
                  src="https://images.unsplash.com/photo-1555041469-a586c61ea9bc?q=80&w=400&auto=format&fit=crop"
                  alt="Producto terminado"
                  className="w-full h-[240px] object-cover"
                />
                <img
                  src="https://images.unsplash.com/photo-1532372320572-cda25653a26d?q=80&w=400&auto=format&fit=crop"
                  alt="Selección de materiales"
                  className="w-full h-[240px] object-cover"
                />
              </div>
            </motion.div>

            {/* Contenido */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <span className="text-[11px] font-semibold tracking-[0.3em] uppercase text-brand mb-4 block">
                Nuestro Proceso
              </span>
              <h2 className="font-serif text-4xl md:text-5xl font-bold text-dark leading-tight mb-6">
                Del <span className="italic">Boceto</span> a Tu Hogar
              </h2>
              <p className="text-warm-gray text-lg leading-relaxed mb-8">
                Cada pieza de ErgoCraft pasa por un viaje de meses antes de llegar a tu hogar. Desde la primera línea en papel hasta la inspección final, cada paso refleja nuestro compromiso con la excelencia.
              </p>

              <div className="space-y-6">
                {[
                  { step: 'Concepto', desc: 'Nuestros diseñadores investigan, bocetan e iteran hasta encontrar la intersección perfecta entre forma, función y emoción.' },
                  { step: 'Materiales', desc: 'Viajamos a aserraderos, curtidurías y talleres textiles para seleccionar personalmente cada material que usamos.' },
                  { step: 'Construcción', desc: 'Artesanos especializados dan vida al diseño usando técnicas tradicionales de ensamblaje, tallado y acabado.' },
                  { step: 'Inspección', desc: 'Cada pieza pasa por 12 puntos de control de calidad antes de recibir la firma del artesano y ser empaquetada.' },
                ].map((item, i) => (
                  <div key={i} className="flex gap-5 group">
                    <div className="w-10 h-10 border border-light-gray flex items-center justify-center flex-shrink-0 group-hover:bg-brand group-hover:border-brand transition-all">
                      <span className="text-xs font-bold text-brand group-hover:text-white transition-colors">
                        {String(i + 1).padStart(2, '0')}
                      </span>
                    </div>
                    <div className="border-b border-light-gray pb-4 flex-1">
                      <h4 className="font-semibold text-dark text-[15px] mb-1">{item.step}</h4>
                      <p className="text-sm text-warm-gray leading-relaxed">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ============ GALERÍA INSPIRACIÓN ============ */}
      <section className="py-24 lg:py-32 bg-cream">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-10">
          <div className="text-center mb-16">
            <span className="text-[11px] font-semibold tracking-[0.3em] uppercase text-brand">
              Galería
            </span>
            <h2 className="font-serif text-4xl md:text-5xl font-bold text-dark mt-3">
              Inspiración & <span className="italic">Espacios</span>
            </h2>
            <p className="mt-4 text-warm-gray text-lg max-w-2xl mx-auto">
              Una mirada a los espacios que hemos ayudado a crear — cada uno refleja la personalidad única de quien lo habita.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 auto-rows-[200px] md:auto-rows-[250px]">
            {galleryImages.map((img, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.06 }}
                className={`relative group overflow-hidden cursor-pointer ${img.span}`}
              >
                <img
                  src={img.src}
                  alt={img.alt}
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-dark/0 group-hover:bg-dark/40 transition-colors duration-300 flex items-end">
                  <p className="p-4 text-white text-sm font-medium opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-300">
                    {img.alt}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ============ EQUIPO ============ */}
      <section className="py-24 lg:py-32">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-10">
          <div className="text-center mb-16">
            <span className="text-[11px] font-semibold tracking-[0.3em] uppercase text-brand">
              Nuestro Equipo
            </span>
            <h2 className="font-serif text-4xl md:text-5xl font-bold text-dark mt-3">
              Las <span className="italic">Personas</span> Detrás de Cada Pieza
            </h2>
            <p className="mt-4 text-warm-gray text-lg max-w-2xl mx-auto">
              Apasionados por el diseño, los materiales y el detalle — este es el equipo que hace posible ErgoCraft.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-10">
            {team.map((member, i) => (
              <motion.div
                key={member.name}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
                className="group text-center"
              >
                <div className="relative overflow-hidden aspect-[3/4] mb-6">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-dark/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center pb-6">
                    <p className="font-serif text-white italic text-sm max-w-[80%] leading-relaxed">
                      "{member.quote}"
                    </p>
                  </div>
                </div>
                <h3 className="font-serif text-xl font-bold text-dark mb-1">
                  {member.name}
                </h3>
                <p className="text-sm text-warm-gray tracking-wide">
                  {member.role}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ============ SOSTENIBILIDAD ============ */}
      <section className="relative overflow-hidden">
        <div className="grid lg:grid-cols-2">
          {/* Imagen */}
          <div className="relative min-h-[450px] lg:min-h-[600px] order-2 lg:order-1">
            <motion.img
              src="https://images.unsplash.com/photo-1600210492493-0946911123ea?q=80&w=1200&auto=format&fit=crop"
              alt="Materiales sostenibles"
              className="absolute inset-0 w-full h-full object-cover"
              initial={{ scale: 1.1 }}
              whileInView={{ scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1.2 }}
            />
          </div>

          {/* Contenido */}
          <div className="bg-dark-brown flex items-center px-8 lg:px-20 py-20 order-1 lg:order-2">
            <motion.div
              className="max-w-lg"
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <span className="text-[11px] font-semibold tracking-[0.3em] uppercase text-brand-light mb-4 block">
                Compromiso Ambiental
              </span>
              <h2 className="font-serif text-4xl md:text-5xl font-bold text-white leading-tight mb-6">
                Diseño con <span className="italic text-brand-light">Conciencia</span>
              </h2>
              <p className="text-white/60 text-lg leading-relaxed mb-8">
                La sostenibilidad no es un departamento en ErgoCraft — es una filosofía que permea cada decisión. Desde la selección de materiales hasta el empaquetado, buscamos minimizar nuestro impacto mientras maximizamos la vida útil de cada pieza.
              </p>

              <div className="space-y-5 mb-10">
                {[
                  { title: 'Madera Certificada FSC', desc: '100% de nuestra madera proviene de bosques gestionados de forma responsable.' },
                  { title: 'Acabados al Agua', desc: 'Eliminamos los solventes tóxicos de nuestro proceso. Mejor para los artesanos, mejor para tu hogar.' },
                  { title: 'Cero Residuos al Vertedero', desc: 'Los recortes de madera se convierten en piezas pequeñas. El aserrín se dona para compostaje agrícola.' },
                  { title: 'Empaque Reciclable', desc: 'Sin plásticos de un solo uso. Solo cartón reciclado y protección de fibra natural.' },
                ].map((item, i) => (
                  <div key={i} className="flex gap-4 items-start">
                    <div className="w-2 h-2 bg-brand-light rounded-full mt-2 flex-shrink-0" />
                    <div>
                      <h4 className="text-white font-semibold text-sm mb-0.5">{item.title}</h4>
                      <p className="text-white/50 text-sm leading-relaxed">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>

              <button className="inline-flex items-center gap-3 bg-brand text-white px-8 py-4 text-xs font-bold tracking-[0.2em] uppercase hover:bg-brand-light transition-colors duration-300 group">
                Nuestra Política Ambiental
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ============ CTA FINAL ============ */}
      <section className="py-24 lg:py-32 bg-cream">
        <div className="max-w-[900px] mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <span className="text-[11px] font-semibold tracking-[0.3em] uppercase text-brand mb-4 block">
              ¿Listo para Empezar?
            </span>
            <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold text-dark leading-tight mb-6">
              Transforma Tu Espacio con Piezas que <span className="italic">Perduran</span>
            </h2>
            <p className="text-warm-gray text-lg leading-relaxed mb-10 max-w-2xl mx-auto">
              Visita nuestro showroom, agenda una consulta de diseño gratuita o explora nuestra colección en línea. Cada pieza viene con nuestra garantía de 5 años y entrega con guante blanco incluida.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4">
              <button
                onClick={goHome}
                className="inline-flex items-center gap-3 bg-dark text-white px-10 py-4 text-xs font-bold tracking-[0.2em] uppercase hover:bg-brand transition-colors duration-300 group"
              >
                Explorar Colecciones
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
              <button className="inline-flex items-center gap-3 border-2 border-dark text-dark px-10 py-4 text-xs font-bold tracking-[0.2em] uppercase hover:bg-dark hover:text-white transition-all duration-300">
                Agendar Consulta
              </button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
