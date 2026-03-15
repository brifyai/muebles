import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MapPin, Clock, Phone, Mail, ChevronRight, Play, Camera, ArrowRight, Star, Calendar, Users, Compass } from 'lucide-react';
import { useNavigation } from '@/context/NavigationContext';

const galleryImages = [
  { src: 'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?w=800&q=80', title: 'Sala de Exposición Principal', tag: 'Planta Baja' },
  { src: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800&q=80', title: 'Zona de Sofás & Estar', tag: 'Planta Baja' },
  { src: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=800&q=80', title: 'Colección Premium', tag: 'Primera Planta' },
  { src: 'https://images.unsplash.com/photo-1618220179428-22790b461013?w=800&q=80', title: 'Comedor & Cocina', tag: 'Planta Baja' },
  { src: 'https://images.unsplash.com/photo-1631679706909-1844bbd07221?w=800&q=80', title: 'Zona de Dormitorio', tag: 'Primera Planta' },
  { src: 'https://images.unsplash.com/photo-1600585152220-90363fe7e115?w=800&q=80', title: 'Espacio Home Office', tag: 'Primera Planta' },
  { src: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=800&q=80', title: 'Taller de Acabados', tag: 'Sótano' },
  { src: 'https://images.unsplash.com/photo-1611269154421-4e27233ac5c7?w=800&q=80', title: 'Sala de Materiales', tag: 'Sótano' },
];

const experiences = [
  {
    icon: Compass,
    title: 'Recorrido Guiado',
    desc: 'Explora nuestras instalaciones de 2,000m² con un diseñador experto que te guiará por cada colección, materiales y procesos de fabricación.',
    duration: '45 min',
  },
  {
    icon: Users,
    title: 'Consultoría de Diseño',
    desc: 'Sesión personalizada con nuestro equipo de diseño interior. Trae las medidas de tu espacio y crearemos un plan completo a tu medida.',
    duration: '90 min',
  },
  {
    icon: Camera,
    title: 'Taller de Artesanía',
    desc: 'Sumérgete en el proceso artesanal. Aprende técnicas de carpintería y tapicería junto a nuestros maestros artesanos.',
    duration: '2 horas',
  },
  {
    icon: Calendar,
    title: 'Evento Privado',
    desc: 'Reserva nuestro showroom para eventos corporativos, lanzamientos de producto o reuniones exclusivas en un entorno único.',
    duration: 'Personalizable',
  },
];

const reviews = [
  { name: 'Marta R.', rating: 5, text: 'El taller es impresionante. Ver cómo trabajan la madera y los acabados me convenció de la calidad. Compré un comedor completo.', date: 'Hace 2 semanas' },
  { name: 'José L.', rating: 5, text: 'La consultoría de diseño fue increíble. Llegamos sin idea y salimos con un proyecto completo para todo el departamento.', date: 'Hace 1 mes' },
  { name: 'Ana G.', rating: 5, text: 'El taller de artesanía fue una experiencia única. Mis hijos disfrutaron aprendiendo carpintería básica. Volveremos sin duda.', date: 'Hace 3 semanas' },
];

export function ShowroomPage() {
  const { goHome } = useNavigation();
  const [selectedImage, setSelectedImage] = useState<number | null>(null);
  const [activeTab, setActiveTab] = useState(0);

  return (
    <div className="bg-white">
      {/* Hero */}
      <section className="relative h-[75vh] min-h-[550px] overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?w=1600&q=80"
          alt="Taller ErgoCraft"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-dark-brown/80 via-dark-brown/50 to-transparent" />
        <div className="absolute inset-0 flex items-center">
          <div className="max-w-[1400px] mx-auto px-6 lg:px-10 w-full">
            {/* Breadcrumbs */}
            <div className="flex items-center gap-2 text-white/60 text-xs tracking-widest uppercase mb-8">
              <button onClick={goHome} className="hover:text-white transition-colors">Inicio</button>
              <ChevronRight className="w-3 h-3" />
              <span className="text-white">Taller & Showroom</span>
            </div>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="max-w-2xl"
            >
              <p className="text-brand text-xs tracking-[0.3em] uppercase mb-4 font-medium">Visítanos en Persona</p>
              <h1 className="font-serif text-5xl md:text-6xl lg:text-7xl text-white leading-[1.1] mb-6">
                Nuestro <em className="text-brand">Taller</em> & Showroom
              </h1>
              <p className="text-white/80 text-lg leading-relaxed mb-8 max-w-xl">
                Más de 2,000m² dedicados al diseño y la artesanía. Ven a tocar los materiales, 
                sentir la calidad y descubrir el proceso detrás de cada pieza ErgoCraft.
              </p>
              <div className="flex flex-wrap gap-4">
                <button className="bg-brand hover:bg-brand/90 text-white px-8 py-4 text-sm tracking-widest uppercase transition-all">
                  Agendar Visita
                </button>
                <button className="border border-white/30 hover:border-white text-white px-8 py-4 text-sm tracking-widest uppercase transition-all flex items-center gap-3">
                  <Play className="w-4 h-4" /> Ver Recorrido Virtual
                </button>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Info Cards */}
      <section className="relative -mt-20 z-10">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-10">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-0">
            {[
              { icon: MapPin, title: 'Ubicación', lines: ['Av. Revolución 1425', 'Col. Campestre, CDMX', 'C.P. 01040'] },
              { icon: Clock, title: 'Horario', lines: ['Lun — Vie: 10:00 — 20:00', 'Sábado: 10:00 — 18:00', 'Domingo: 11:00 — 16:00'] },
              { icon: Phone, title: 'Contacto', lines: ['+52 (55) 1234-5678', 'taller@ergocraft.mx', 'WhatsApp disponible'] },
            ].map((item, i) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 + i * 0.1 }}
                className={`bg-dark-brown text-white p-8 lg:p-10 ${i === 1 ? 'bg-brand' : ''}`}
              >
                <item.icon className="w-6 h-6 mb-4 opacity-80" strokeWidth={1.5} />
                <h3 className="font-serif text-xl mb-3">{item.title}</h3>
                {item.lines.map((line, j) => (
                  <p key={j} className="text-white/70 text-sm leading-relaxed">{line}</p>
                ))}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* About the Space */}
      <section className="py-24 lg:py-32">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-10">
          <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <p className="text-brand text-xs tracking-[0.3em] uppercase mb-4 font-medium">El Espacio</p>
              <h2 className="font-serif text-4xl lg:text-5xl text-dark leading-tight mb-8">
                Donde la <em className="text-brand">Artesanía</em> Cobra Vida
              </h2>
              <div className="space-y-5 text-warm-gray leading-relaxed">
                <p>
                  Nuestro taller y showroom en el corazón de la Ciudad de México es mucho más que una sala 
                  de exposición. Es un espacio vivo donde cada día nuestros artesanos dan forma a la madera, 
                  trabajan el cuero y crean las piezas que definen el hogar contemporáneo.
                </p>
                <p>
                  Distribuido en tres plantas, el espacio combina una zona de exposición con más de 250 piezas 
                  en exhibición, un taller de producción artesanal abierto al público y salas de consultoría 
                  de diseño para proyectos personalizados.
                </p>
                <p>
                  Te invitamos a vivir la experiencia ErgoCraft en primera persona: toca los materiales, 
                  siéntate en cada pieza, conoce a los artesanos y descubre por qué cada detalle importa.
                </p>
              </div>
              <div className="grid grid-cols-3 gap-8 mt-10 pt-10 border-t border-sand">
                {[
                  { value: '2,000m²', label: 'De Espacio' },
                  { value: '250+', label: 'Piezas en Exhibición' },
                  { value: '35', label: 'Artesanos' },
                ].map(stat => (
                  <div key={stat.label}>
                    <p className="font-serif text-3xl text-brand">{stat.value}</p>
                    <p className="text-xs text-warm-gray tracking-wider uppercase mt-1">{stat.label}</p>
                  </div>
                ))}
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-4">
                  <img
                    src="https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=600&q=80"
                    alt="Taller"
                    className="w-full aspect-[3/4] object-cover"
                  />
                  <img
                    src="https://images.unsplash.com/photo-1631679706909-1844bbd07221?w=600&q=80"
                    alt="Showroom"
                    className="w-full aspect-square object-cover"
                  />
                </div>
                <div className="space-y-4 pt-12">
                  <img
                    src="https://images.unsplash.com/photo-1618220179428-22790b461013?w=600&q=80"
                    alt="Exposición"
                    className="w-full aspect-square object-cover"
                  />
                  <img
                    src="https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=600&q=80"
                    alt="Detalle"
                    className="w-full aspect-[3/4] object-cover"
                  />
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Gallery */}
      <section className="py-24 lg:py-32 bg-cream">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-10">
          <div className="text-center mb-16">
            <p className="text-brand text-xs tracking-[0.3em] uppercase mb-4 font-medium">Galería</p>
            <h2 className="font-serif text-4xl lg:text-5xl text-dark">
              Recorre Nuestro <em className="text-brand">Espacio</em>
            </h2>
          </div>

          {/* Tabs */}
          <div className="flex justify-center gap-1 mb-12">
            {['Todos', 'Showroom', 'Taller', 'Eventos'].map((tab, i) => (
              <button
                key={tab}
                onClick={() => setActiveTab(i)}
                className={`px-6 py-3 text-xs tracking-widest uppercase transition-all ${
                  activeTab === i
                    ? 'bg-dark-brown text-white'
                    : 'text-warm-gray hover:text-dark'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
            {galleryImages.map((img, i) => (
              <motion.button
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                onClick={() => setSelectedImage(i)}
                className={`relative overflow-hidden group ${
                  i === 0 ? 'col-span-2 row-span-2' : ''
                } ${i === 5 ? 'col-span-2' : ''}`}
              >
                <img
                  src={img.src}
                  alt={img.title}
                  className={`w-full object-cover transition-transform duration-700 group-hover:scale-110 ${
                    i === 0 ? 'aspect-square' : 'aspect-[4/3]'
                  }`}
                />
                <div className="absolute inset-0 bg-dark-brown/0 group-hover:bg-dark-brown/60 transition-all duration-500 flex items-end p-6 opacity-0 group-hover:opacity-100">
                  <div className="text-left">
                    <p className="text-brand text-[10px] tracking-[0.2em] uppercase">{img.tag}</p>
                    <p className="text-white font-serif text-lg">{img.title}</p>
                  </div>
                </div>
              </motion.button>
            ))}
          </div>
        </div>
      </section>

      {/* Lightbox */}
      <AnimatePresence>
        {selectedImage !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-black/95 flex items-center justify-center p-4"
            onClick={() => setSelectedImage(null)}
          >
            <motion.img
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
              src={galleryImages[selectedImage].src.replace('w=800', 'w=1400')}
              alt={galleryImages[selectedImage].title}
              className="max-w-full max-h-[85vh] object-contain"
              onClick={e => e.stopPropagation()}
            />
            <div className="absolute bottom-8 text-center text-white">
              <p className="text-brand text-[10px] tracking-[0.2em] uppercase mb-1">{galleryImages[selectedImage].tag}</p>
              <p className="font-serif text-xl">{galleryImages[selectedImage].title}</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Experiences */}
      <section className="py-24 lg:py-32">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-10">
          <div className="text-center mb-16">
            <p className="text-brand text-xs tracking-[0.3em] uppercase mb-4 font-medium">Experiencias</p>
            <h2 className="font-serif text-4xl lg:text-5xl text-dark mb-4">
              Vive la Experiencia <em className="text-brand">ErgoCraft</em>
            </h2>
            <p className="text-warm-gray max-w-xl mx-auto">
              Ofrecemos experiencias únicas para que descubras de cerca la calidad, el proceso y la pasión 
              que hay detrás de cada una de nuestras piezas.
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {experiences.map((exp, i) => (
              <motion.div
                key={exp.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="group border border-sand hover:border-brand/30 p-8 transition-all duration-500 hover:shadow-lg relative overflow-hidden"
              >
                <div className="absolute top-0 left-0 w-full h-1 bg-brand scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
                <div className="w-14 h-14 bg-cream group-hover:bg-brand/10 flex items-center justify-center mb-6 transition-colors">
                  <exp.icon className="w-6 h-6 text-brand" strokeWidth={1.5} />
                </div>
                <h3 className="font-serif text-xl text-dark mb-3">{exp.title}</h3>
                <p className="text-warm-gray text-sm leading-relaxed mb-6">{exp.desc}</p>
                <div className="flex items-center justify-between pt-4 border-t border-sand">
                  <span className="text-xs text-warm-gray tracking-wider uppercase">
                    <Clock className="w-3 h-3 inline mr-1" /> {exp.duration}
                  </span>
                  <button className="text-brand text-xs tracking-widest uppercase flex items-center gap-1 hover:gap-2 transition-all">
                    Reservar <ArrowRight className="w-3 h-3" />
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Map / Directions */}
      <section className="relative">
        <div className="grid lg:grid-cols-2">
          <div className="bg-dark-brown text-white p-12 lg:p-20 flex flex-col justify-center">
            <p className="text-brand text-xs tracking-[0.3em] uppercase mb-4 font-medium">Cómo Llegar</p>
            <h2 className="font-serif text-4xl lg:text-5xl leading-tight mb-8">
              Te Esperamos en Nuestro <em className="text-brand">Taller</em>
            </h2>
            <div className="space-y-6">
              <div className="flex gap-4">
                <MapPin className="w-5 h-5 text-brand flex-shrink-0 mt-1" />
                <div>
                  <p className="font-medium mb-1">Dirección</p>
                  <p className="text-white/60 text-sm">Av. Revolución 1425, Col. Campestre, Álvaro Obregón, CDMX, C.P. 01040</p>
                </div>
              </div>
              <div className="flex gap-4">
                <Phone className="w-5 h-5 text-brand flex-shrink-0 mt-1" />
                <div>
                  <p className="font-medium mb-1">Teléfono</p>
                  <p className="text-white/60 text-sm">+52 (55) 1234-5678</p>
                </div>
              </div>
              <div className="flex gap-4">
                <Mail className="w-5 h-5 text-brand flex-shrink-0 mt-1" />
                <div>
                  <p className="font-medium mb-1">Email</p>
                  <p className="text-white/60 text-sm">taller@ergocraft.mx</p>
                </div>
              </div>
              <div className="flex gap-4">
                <Clock className="w-5 h-5 text-brand flex-shrink-0 mt-1" />
                <div>
                  <p className="font-medium mb-1">Horario</p>
                  <p className="text-white/60 text-sm">Lun — Vie: 10:00 — 20:00</p>
                  <p className="text-white/60 text-sm">Sáb: 10:00 — 18:00 · Dom: 11:00 — 16:00</p>
                </div>
              </div>
            </div>
            <div className="flex flex-wrap gap-4 mt-10">
              <button className="bg-brand hover:bg-brand/90 text-white px-8 py-4 text-xs tracking-widest uppercase transition-all">
                Agendar Visita Guiada
              </button>
              <a
                href="https://maps.google.com"
                target="_blank"
                rel="noopener noreferrer"
                className="border border-white/30 hover:border-white text-white px-8 py-4 text-xs tracking-widest uppercase transition-all flex items-center gap-2"
              >
                Abrir en Google Maps <ArrowRight className="w-3 h-3" />
              </a>
            </div>
          </div>
          <div className="h-[400px] lg:h-auto bg-sand relative">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3763.7894!2d-99.1847!3d19.3594!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMTnCsDIxJzMzLjgiTiA5OcKwMTEnMDQuOSJX!5e0!3m2!1ses!2smx!4v1600000000000!5m2!1ses!2smx"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Ubicación ErgoCraft"
              className="absolute inset-0"
            />
          </div>
        </div>
      </section>

      {/* Reviews */}
      <section className="py-24 lg:py-32 bg-cream">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-10">
          <div className="text-center mb-16">
            <p className="text-brand text-xs tracking-[0.3em] uppercase mb-4 font-medium">Testimonios</p>
            <h2 className="font-serif text-4xl lg:text-5xl text-dark">
              Lo Que Dicen Nuestros <em className="text-brand">Visitantes</em>
            </h2>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {reviews.map((review, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-white p-8 border border-sand"
              >
                <div className="flex gap-1 mb-4">
                  {Array.from({ length: review.rating }).map((_, j) => (
                    <Star key={j} className="w-4 h-4 fill-brand text-brand" />
                  ))}
                </div>
                <p className="text-dark leading-relaxed mb-6 italic font-serif">"{review.text}"</p>
                <div className="flex items-center justify-between pt-4 border-t border-sand">
                  <span className="font-medium text-dark text-sm">{review.name}</span>
                  <span className="text-xs text-warm-gray">{review.date}</span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="relative py-32 overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1600585152220-90363fe7e115?w=1600&q=80"
          alt="Showroom"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-dark-brown/80" />
        <div className="relative text-center text-white max-w-3xl mx-auto px-6">
          <p className="text-brand text-xs tracking-[0.3em] uppercase mb-4 font-medium">Agenda Tu Visita</p>
          <h2 className="font-serif text-4xl lg:text-5xl leading-tight mb-6">
            Ven a Conocer la <em className="text-brand">Diferencia</em> ErgoCraft
          </h2>
          <p className="text-white/70 text-lg mb-10 max-w-xl mx-auto">
            Nada se compara con la experiencia de sentir nuestros muebles en persona. 
            Agenda tu visita y descubre tu próxima pieza favorita.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <button className="bg-brand hover:bg-brand/90 text-white px-10 py-4 text-sm tracking-widest uppercase transition-all">
              Reservar Visita Gratuita
            </button>
            <button onClick={goHome} className="border border-white/30 hover:border-white text-white px-10 py-4 text-sm tracking-widest uppercase transition-all">
              Explorar Colecciones
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
