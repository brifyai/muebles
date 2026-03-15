import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronRight, ArrowRight, Award, MapPin, X, ExternalLink } from 'lucide-react';
import { useNavigation } from '@/context/NavigationContext';

interface Artisan {
  id: number;
  name: string;
  specialty: string;
  location: string;
  experience: string;
  image: string;
  portrait: string;
  bio: string;
  philosophy: string;
  pieces: string[];
  awards: string[];
  featured: { img: string; title: string }[];
}

const artisans: Artisan[] = [
  {
    id: 1,
    name: 'Maestro Carlos Mendoza',
    specialty: 'Ebanistería & Tallado en Madera',
    location: 'Michoacán, México',
    experience: '32 años',
    image: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=800&q=80',
    portrait: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&q=80',
    bio: 'Carlos aprendió el oficio de su padre y su abuelo en los talleres de Pátzcuaro. Con más de tres décadas de experiencia, es reconocido como uno de los mejores ebanistas del país, especializado en uniones japonesas y acabados naturales.',
    philosophy: 'Cada pieza de madera tiene una historia que contar. Mi trabajo es simplemente revelarla.',
    pieces: ['Mesa de Café Nogal', 'Aparador Roble Americano', 'Mesa Comedor Rústica'],
    awards: ['Premio Nacional de Artesanía 2019', 'Maestro Artesano Certificado'],
    featured: [
      { img: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=400&q=80', title: 'Colección Raíces' },
      { img: 'https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?w=400&q=80', title: 'Serie Nogal' },
    ],
  },
  {
    id: 2,
    name: 'Maestra Lucía Hernández',
    specialty: 'Tapicería & Textiles Artesanales',
    location: 'Oaxaca, México',
    experience: '25 años',
    image: 'https://images.unsplash.com/photo-1616627547584-bf28cee262db?w=800&q=80',
    portrait: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400&q=80',
    bio: 'Lucía fusiona técnicas ancestrales de tejido oaxaqueño con el diseño de mobiliario contemporáneo. Su trabajo ha sido expuesto en museos de diseño en Nueva York, Milán y Tokio.',
    philosophy: 'El textil es la piel del mueble. Define cómo nos sentimos cuando lo tocamos, nos sentamos, lo vivimos.',
    pieces: ['Sofá Meridian', 'Sillón Lounge Copenhagen', 'Cabecera Tejida Artesanal'],
    awards: ['Bienal de Diseño Iberoamericano 2021', 'Artesana del Año — FONART 2020'],
    featured: [
      { img: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400&q=80', title: 'Colección Textil' },
      { img: 'https://images.unsplash.com/photo-1631679706909-1844bbd07221?w=400&q=80', title: 'Serie Oaxaca' },
    ],
  },
  {
    id: 3,
    name: 'Maestro Roberto Sánchez',
    specialty: 'Metalurgia & Forja Artística',
    location: 'Guanajuato, México',
    experience: '28 años',
    image: 'https://images.unsplash.com/photo-1611269154421-4e27233ac5c7?w=800&q=80',
    portrait: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&q=80',
    bio: 'Roberto transforma el acero y el latón en estructuras que desafían la gravedad. Sus bases y marcos metálicos son la columna vertebral de muchas de nuestras piezas más icónicas, combinando resistencia con elegancia escultural.',
    philosophy: 'El metal parece frío y duro, pero en las manos correctas puede ser tan fluido y expresivo como la música.',
    pieces: ['Lámpara de Pie Arco', 'Base Mesa Nórdica', 'Estantería Modular Industrial'],
    awards: ['Mención Honorífica — Salón del Mueble Milán 2022', 'Artesano Innovador 2018'],
    featured: [
      { img: 'https://images.unsplash.com/photo-1618220179428-22790b461013?w=400&q=80', title: 'Colección Forja' },
      { img: 'https://images.unsplash.com/photo-1600585152220-90363fe7e115?w=400&q=80', title: 'Serie Metal' },
    ],
  },
  {
    id: 4,
    name: 'Maestra Elena Torres',
    specialty: 'Acabados & Restauración',
    location: 'Jalisco, México',
    experience: '20 años',
    image: 'https://images.unsplash.com/photo-1600585152220-90363fe7e115?w=800&q=80',
    portrait: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&q=80',
    bio: 'Elena es la guardiana del color y la textura. Especializada en acabados naturales con aceites y ceras de origen botánico, cada superficie que pasa por sus manos adquiere una profundidad y calidez imposible de replicar industrialmente.',
    philosophy: 'Un buen acabado no esconde la madera, la celebra. Cada veta, cada nudo, cada imperfección es parte de su belleza.',
    pieces: ['Acabados Colección Heritage', 'Restauración Piezas Vintage', 'Serie de Mesas Barnizadas a Mano'],
    awards: ['Especialista en Acabados Certificada — CREFAL', 'Primer Lugar Expo Mueble 2023'],
    featured: [
      { img: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400&q=80', title: 'Acabados Naturales' },
      { img: 'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?w=400&q=80', title: 'Restauración' },
    ],
  },
  {
    id: 5,
    name: 'Maestro Diego Ramírez',
    specialty: 'Diseño & Prototipado',
    location: 'CDMX, México',
    experience: '18 años',
    image: 'https://images.unsplash.com/photo-1631679706909-1844bbd07221?w=800&q=80',
    portrait: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&q=80',
    bio: 'Diego es el puente entre la idea y el objeto. Con formación en diseño industrial y años de experiencia en carpintería, traduce los conceptos más ambiciosos en prototipos funcionales que luego se convierten en las piezas que llegan a tu hogar.',
    philosophy: 'Diseñar muebles es diseñar momentos: la cena en familia, la lectura del domingo, la conversación con amigos.',
    pieces: ['Escritorio Oslo', 'Cama Nórdica', 'Silla Esculpida Comedor'],
    awards: ['Red Dot Design Award 2021', 'A\' Design Award 2020'],
    featured: [
      { img: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=400&q=80', title: 'Prototipos' },
      { img: 'https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?w=400&q=80', title: 'Bocetos & Modelos' },
    ],
  },
  {
    id: 6,
    name: 'Maestra Patricia Vega',
    specialty: 'Cuero & Marroquinería',
    location: 'León, Guanajuato',
    experience: '22 años',
    image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800&q=80',
    portrait: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&q=80',
    bio: 'Patricia proviene de la tradición curtidora de León. Selecciona personalmente cada piel en las tenerías, buscando la textura, el grosor y la flexibilidad perfectos para cada aplicación: desde asientos de sillones hasta detalles de cajones y tiradores.',
    philosophy: 'El buen cuero mejora con el tiempo. Como los buenos muebles, como las buenas relaciones.',
    pieces: ['Sillón Club Cuero', 'Taburete Piel Natural', 'Detalles de la Colección Executive'],
    awards: ['Mejor Artesana en Cuero — Sapica 2022', 'Certificación en Curtido Vegetal Sostenible'],
    featured: [
      { img: 'https://images.unsplash.com/photo-1618220179428-22790b461013?w=400&q=80', title: 'Cueros Naturales' },
      { img: 'https://images.unsplash.com/photo-1616627547584-bf28cee262db?w=400&q=80', title: 'Selección de Pieles' },
    ],
  },
];

export function BrandsPage() {
  const { goHome } = useNavigation();
  const [selectedArtisan, setSelectedArtisan] = useState<Artisan | null>(null);

  return (
    <div className="bg-white">
      {/* Hero */}
      <section className="relative h-[70vh] min-h-[500px] overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=1600&q=80"
          alt="Artesanos ErgoCraft"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-dark-brown/90 via-dark-brown/50 to-dark-brown/30" />
        <div className="absolute inset-0 flex items-end pb-20">
          <div className="max-w-[1400px] mx-auto px-6 lg:px-10 w-full">
            <div className="flex items-center gap-2 text-white/60 text-xs tracking-widest uppercase mb-6">
              <button onClick={goHome} className="hover:text-white transition-colors">Inicio</button>
              <ChevronRight className="w-3 h-3" />
              <span className="text-white">Artesanos</span>
            </div>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="max-w-3xl"
            >
              <h1 className="font-serif text-5xl md:text-6xl lg:text-7xl text-white leading-[1.1] mb-6">
                Las Manos Detrás de Cada <em className="text-brand">Pieza</em>
              </h1>
              <p className="text-white/80 text-lg leading-relaxed max-w-2xl">
                Conoce a los maestros artesanos que dan vida a cada mueble ErgoCraft. 
                Décadas de experiencia, pasión heredada y un compromiso inquebrantable con la excelencia.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Stats Bar */}
      <section className="bg-dark-brown text-white">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-10">
          <div className="grid grid-cols-2 md:grid-cols-4 divide-x divide-white/10">
            {[
              { value: '50+', label: 'Artesanos Activos' },
              { value: '145+', label: 'Años de Experiencia Combinada' },
              { value: '12', label: 'Especialidades' },
              { value: '8', label: 'Estados de México' },
            ].map(stat => (
              <div key={stat.label} className="py-8 lg:py-10 text-center">
                <p className="font-serif text-3xl lg:text-4xl text-brand mb-1">{stat.value}</p>
                <p className="text-white/50 text-xs tracking-widest uppercase">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Intro */}
      <section className="py-24 lg:py-32">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-10">
          <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
            <div>
              <p className="text-brand text-xs tracking-[0.3em] uppercase mb-4 font-medium">Nuestra Filosofía</p>
              <h2 className="font-serif text-4xl lg:text-5xl text-dark leading-tight mb-8">
                Artesanía <em className="text-brand">Humana</em> en la Era Digital
              </h2>
              <div className="space-y-5 text-warm-gray leading-relaxed">
                <p>
                  En un mundo dominado por la producción en masa, en ErgoCraft elegimos un camino diferente. 
                  Cada pieza que creamos pasa por las manos de artesanos que han dedicado su vida a perfeccionar 
                  su oficio, heredando técnicas de generaciones anteriores y adaptándolas al diseño contemporáneo.
                </p>
                <p>
                  Trabajamos directamente con comunidades artesanales de todo México, desde los ebanistas de 
                  Michoacán hasta los tejedores de Oaxaca y los curtidores de León. Esta relación directa 
                  nos permite garantizar condiciones justas de trabajo y preservar oficios que están en riesgo 
                  de desaparecer.
                </p>
                <p>
                  El resultado: piezas con alma, con historia, con la calidez que solo las manos humanas 
                  pueden dar a un objeto.
                </p>
              </div>
            </div>
            <div className="relative">
              <img
                src="https://images.unsplash.com/photo-1611269154421-4e27233ac5c7?w=800&q=80"
                alt="Artesano trabajando"
                className="w-full aspect-[4/5] object-cover"
              />
              <div className="absolute -bottom-8 -left-8 bg-brand text-white p-8 hidden lg:block">
                <p className="font-serif text-4xl mb-1">100%</p>
                <p className="text-xs tracking-widest uppercase text-white/80">Hecho a Mano</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Artisans Grid */}
      <section className="py-24 lg:py-32 bg-cream">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-10">
          <div className="text-center mb-16">
            <p className="text-brand text-xs tracking-[0.3em] uppercase mb-4 font-medium">Equipo Artesanal</p>
            <h2 className="font-serif text-4xl lg:text-5xl text-dark mb-4">
              Maestros <em className="text-brand">Artesanos</em>
            </h2>
            <p className="text-warm-gray max-w-xl mx-auto">
              Conoce a algunos de los talentosos artesanos que forman parte de nuestra familia ErgoCraft.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {artisans.map((artisan, i) => (
              <motion.div
                key={artisan.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className="bg-white group cursor-pointer border border-sand hover:border-brand/20 hover:shadow-xl transition-all duration-500"
                onClick={() => setSelectedArtisan(artisan)}
              >
                <div className="relative overflow-hidden">
                  <img
                    src={artisan.image}
                    alt={artisan.name}
                    className="w-full aspect-[4/3] object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-dark-brown/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end p-6">
                    <p className="text-white text-sm flex items-center gap-2">
                      Ver Perfil Completo <ArrowRight className="w-4 h-4" />
                    </p>
                  </div>
                  <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1.5 text-xs tracking-wider uppercase text-dark-brown font-medium">
                    {artisan.experience}
                  </div>
                </div>
                <div className="p-6">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h3 className="font-serif text-xl text-dark group-hover:text-brand transition-colors">{artisan.name}</h3>
                      <p className="text-brand text-xs tracking-widest uppercase mt-1">{artisan.specialty}</p>
                    </div>
                    <img
                      src={artisan.portrait}
                      alt={artisan.name}
                      className="w-12 h-12 rounded-full object-cover border-2 border-sand"
                    />
                  </div>
                  <div className="flex items-center gap-1.5 text-warm-gray text-xs mb-4">
                    <MapPin className="w-3 h-3" />
                    {artisan.location}
                  </div>
                  <p className="text-warm-gray text-sm leading-relaxed line-clamp-3">{artisan.bio}</p>
                  <div className="flex flex-wrap gap-2 mt-4 pt-4 border-t border-sand">
                    {artisan.awards.slice(0, 1).map(award => (
                      <span key={award} className="flex items-center gap-1 text-[10px] tracking-wider uppercase text-brand bg-brand/5 px-2.5 py-1">
                        <Award className="w-3 h-3" /> {award}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Artisan Detail Modal */}
      <AnimatePresence>
        {selectedArtisan && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-black/70 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto"
            onClick={() => setSelectedArtisan(null)}
          >
            <motion.div
              initial={{ opacity: 0, y: 50, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 50, scale: 0.95 }}
              transition={{ type: 'spring', damping: 25 }}
              className="bg-white max-w-4xl w-full max-h-[90vh] overflow-y-auto relative my-8"
              onClick={e => e.stopPropagation()}
            >
              <button
                onClick={() => setSelectedArtisan(null)}
                className="absolute top-4 right-4 z-10 w-10 h-10 bg-white/90 hover:bg-white flex items-center justify-center transition-colors shadow-md"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Header */}
              <div className="relative h-72 overflow-hidden">
                <img
                  src={selectedArtisan.image}
                  alt={selectedArtisan.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-dark-brown/80 to-transparent" />
                <div className="absolute bottom-6 left-8 right-8 flex items-end gap-6">
                  <img
                    src={selectedArtisan.portrait}
                    alt={selectedArtisan.name}
                    className="w-20 h-20 rounded-full object-cover border-4 border-white shadow-lg"
                  />
                  <div>
                    <h2 className="font-serif text-3xl text-white">{selectedArtisan.name}</h2>
                    <p className="text-brand text-xs tracking-widest uppercase">{selectedArtisan.specialty}</p>
                  </div>
                </div>
              </div>

              <div className="p-8 lg:p-10">
                {/* Meta */}
                <div className="grid grid-cols-3 gap-4 mb-8 pb-8 border-b border-sand">
                  <div>
                    <p className="text-[10px] tracking-widest uppercase text-warm-gray mb-1">Ubicación</p>
                    <p className="text-dark text-sm font-medium flex items-center gap-1"><MapPin className="w-3 h-3 text-brand" /> {selectedArtisan.location}</p>
                  </div>
                  <div>
                    <p className="text-[10px] tracking-widest uppercase text-warm-gray mb-1">Experiencia</p>
                    <p className="text-dark text-sm font-medium">{selectedArtisan.experience}</p>
                  </div>
                  <div>
                    <p className="text-[10px] tracking-widest uppercase text-warm-gray mb-1">Piezas Creadas</p>
                    <p className="text-dark text-sm font-medium">{Math.floor(Math.random() * 500 + 200)}+</p>
                  </div>
                </div>

                {/* Bio */}
                <div className="mb-8">
                  <h3 className="font-serif text-xl text-dark mb-4">Biografía</h3>
                  <p className="text-warm-gray leading-relaxed">{selectedArtisan.bio}</p>
                </div>

                {/* Quote */}
                <div className="bg-cream p-8 mb-8 border-l-4 border-brand">
                  <p className="font-serif text-xl text-dark italic leading-relaxed">"{selectedArtisan.philosophy}"</p>
                  <p className="text-brand text-xs tracking-widest uppercase mt-4">— {selectedArtisan.name}</p>
                </div>

                {/* Awards */}
                <div className="mb-8">
                  <h3 className="font-serif text-xl text-dark mb-4">Reconocimientos</h3>
                  <div className="space-y-3">
                    {selectedArtisan.awards.map(award => (
                      <div key={award} className="flex items-center gap-3 p-3 bg-brand/5 border border-brand/10">
                        <Award className="w-5 h-5 text-brand flex-shrink-0" />
                        <span className="text-dark text-sm">{award}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Pieces */}
                <div className="mb-8">
                  <h3 className="font-serif text-xl text-dark mb-4">Piezas Destacadas</h3>
                  <div className="flex flex-wrap gap-2">
                    {selectedArtisan.pieces.map(piece => (
                      <span key={piece} className="px-4 py-2 border border-sand text-sm text-dark hover:border-brand hover:text-brand transition-colors cursor-pointer">
                        {piece}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Featured Work */}
                <div>
                  <h3 className="font-serif text-xl text-dark mb-4">Trabajo Reciente</h3>
                  <div className="grid grid-cols-2 gap-4">
                    {selectedArtisan.featured.map(work => (
                      <div key={work.title} className="relative group overflow-hidden">
                        <img
                          src={work.img}
                          alt={work.title}
                          className="w-full aspect-[4/3] object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-dark-brown/0 group-hover:bg-dark-brown/50 transition-colors flex items-center justify-center">
                          <span className="text-white font-serif opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-2">
                            {work.title} <ExternalLink className="w-4 h-4" />
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Process */}
      <section className="py-24 lg:py-32">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-10">
          <div className="text-center mb-16">
            <p className="text-brand text-xs tracking-[0.3em] uppercase mb-4 font-medium">El Proceso</p>
            <h2 className="font-serif text-4xl lg:text-5xl text-dark">
              De las Manos del <em className="text-brand">Artesano</em> a Tu Hogar
            </h2>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-0">
            {[
              { step: '01', title: 'Selección de Materiales', desc: 'Cada artesano selecciona personalmente los materiales, buscando la veta, textura y calidad perfectas.', img: 'https://images.unsplash.com/photo-1611269154421-4e27233ac5c7?w=400&q=80' },
              { step: '02', title: 'Trabajo Manual', desc: 'Utilizando herramientas tradicionales y técnicas perfeccionadas durante décadas, dan forma a cada pieza.', img: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400&q=80' },
              { step: '03', title: 'Acabado Artesanal', desc: 'Aceites naturales, ceras botánicas y tintes orgánicos que realzan la belleza natural del material.', img: 'https://images.unsplash.com/photo-1600585152220-90363fe7e115?w=400&q=80' },
              { step: '04', title: 'Control de Calidad', desc: 'Cada pieza es inspeccionada minuciosamente antes de recibir la firma del artesano que la creó.', img: 'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?w=400&q=80' },
            ].map((item, i) => (
              <motion.div
                key={item.step}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15 }}
                className="relative group"
              >
                <div className="relative overflow-hidden">
                  <img
                    src={item.img}
                    alt={item.title}
                    className="w-full aspect-square object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-dark-brown/60 group-hover:bg-dark-brown/70 transition-colors" />
                  <div className="absolute inset-0 flex flex-col justify-end p-6 lg:p-8">
                    <span className="font-serif text-5xl text-brand/40 mb-3">{item.step}</span>
                    <h3 className="font-serif text-xl text-white mb-2">{item.title}</h3>
                    <p className="text-white/60 text-sm leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Join CTA */}
      <section className="bg-dark-brown text-white py-24 lg:py-32">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-10 text-center">
          <p className="text-brand text-xs tracking-[0.3em] uppercase mb-4 font-medium">Únete</p>
          <h2 className="font-serif text-4xl lg:text-5xl leading-tight mb-6 max-w-3xl mx-auto">
            ¿Eres Artesano? Trabaja Con <em className="text-brand">Nosotros</em>
          </h2>
          <p className="text-white/60 max-w-xl mx-auto mb-10 leading-relaxed">
            Buscamos constantemente artesanos talentosos que compartan nuestra pasión por la calidad 
            y el diseño. Ofrecemos condiciones justas, proyectos desafiantes y la oportunidad de 
            que tu trabajo llegue a hogares de todo el país.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <button className="bg-brand hover:bg-brand/90 text-white px-10 py-4 text-sm tracking-widest uppercase transition-all">
              Enviar Portafolio
            </button>
            <button onClick={() => { goHome(); }} className="border border-white/30 hover:border-white text-white px-10 py-4 text-sm tracking-widest uppercase transition-all">
              Conocer Más
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
