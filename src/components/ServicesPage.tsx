import { motion } from 'framer-motion';
import { ChevronRight, Leaf, Droplets, Recycle, TreePine, Award, Heart, Globe, ArrowRight, CheckCircle, Target, Zap, ShieldCheck } from 'lucide-react';
import { useNavigation } from '@/context/NavigationContext';

const commitments = [
  {
    icon: TreePine,
    title: 'Madera Certificada FSC',
    desc: 'El 100% de nuestra madera proviene de bosques gestionados de forma responsable, con certificación FSC que garantiza la reforestación y el manejo sostenible.',
    stat: '100%',
    statLabel: 'Madera Certificada',
  },
  {
    icon: Droplets,
    title: 'Acabados al Agua',
    desc: 'Utilizamos exclusivamente barnices, tintes y selladores de base acuosa, eliminando por completo los compuestos orgánicos volátiles (COV) de nuestro proceso.',
    stat: '0%',
    statLabel: 'COV en Acabados',
  },
  {
    icon: Recycle,
    title: 'Residuo Cero',
    desc: 'Nuestro programa de residuo cero asegura que el 98% de los desechos de producción se reutilizan, reciclan o compostan. Los recortes de madera se convierten en piezas pequeñas o biomasa.',
    stat: '98%',
    statLabel: 'Residuos Reciclados',
  },
  {
    icon: Leaf,
    title: 'Empaque Ecológico',
    desc: 'Empacamos con cartón reciclado, esquineros de pulpa moldeada y mantas de algodón reutilizables. Cero plástico de un solo uso en nuestros envíos.',
    stat: '0',
    statLabel: 'Plástico de Un Solo Uso',
  },
];

const initiatives = [
  {
    title: 'Programa de Reforestación',
    desc: 'Por cada pieza vendida, plantamos un árbol en comunidades forestales de México. Desde 2018, hemos plantado más de 25,000 árboles en colaboración con organizaciones locales.',
    img: 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=800&q=80',
    stats: [
      { value: '25,000+', label: 'Árboles Plantados' },
      { value: '12', label: 'Comunidades Beneficiadas' },
    ],
  },
  {
    title: 'Energía Renovable',
    desc: 'Nuestro taller funciona con 100% energía solar. Los 450 paneles instalados en nuestras instalaciones generan toda la electricidad que necesitamos, con excedente que devolvemos a la red.',
    img: 'https://images.unsplash.com/photo-1509391366360-2e959784a276?w=800&q=80',
    stats: [
      { value: '100%', label: 'Energía Solar' },
      { value: '450', label: 'Paneles Solares' },
    ],
  },
  {
    title: 'Comercio Justo',
    desc: 'Pagamos precios justos a nuestros artesanos y proveedores, garantizando salarios dignos, condiciones seguras y beneficios que superan los estándares de la industria.',
    img: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=800&q=80',
    stats: [
      { value: '40%', label: 'Sobre Salario Promedio' },
      { value: '100%', label: 'Seguro Médico' },
    ],
  },
];

const certifications = [
  { name: 'FSC Certified', desc: 'Forest Stewardship Council — Cadena de custodia certificada' },
  { name: 'B Corp', desc: 'Empresa con impacto social y ambiental positivo verificado' },
  { name: 'GREENGUARD Gold', desc: 'Bajas emisiones químicas para interiores saludables' },
  { name: 'Carbono Neutro', desc: 'Compensamos el 100% de nuestra huella de carbono desde 2022' },
  { name: 'Comercio Justo México', desc: 'Certificación de prácticas comerciales justas y transparentes' },
  { name: 'ISO 14001', desc: 'Sistema de gestión ambiental certificado internacionalmente' },
];

const timeline = [
  { year: '2010', title: 'Fundación Sostenible', desc: 'ErgoCraft nace con la sostenibilidad como pilar fundacional, no como un añadido posterior.' },
  { year: '2014', title: 'Residuo Cero', desc: 'Alcanzamos nuestra meta de desviar el 95% de los residuos de producción del vertedero.' },
  { year: '2016', title: 'FSC Completo', desc: 'Toda nuestra cadena de suministro de madera obtiene la certificación FSC.' },
  { year: '2018', title: 'Programa Forestal', desc: 'Lanzamos nuestro programa "Un Mueble, Un Árbol" con la meta de plantar 50,000 árboles.' },
  { year: '2020', title: 'Energía Solar', desc: 'Instalamos 450 paneles solares, logrando la autosuficiencia energética del taller.' },
  { year: '2022', title: 'Carbono Neutro', desc: 'Certificamos nuestra operación como carbono neutro, compensando todas las emisiones.' },
  { year: '2024', title: 'B Corp', desc: 'Obtenemos la certificación B Corp, validando nuestro compromiso integral con el planeta.' },
];

const services = [
  {
    icon: Target,
    title: 'Consultoría de Diseño Sostenible',
    desc: 'Nuestros diseñadores te ayudan a crear espacios hermosos con materiales responsables. Analizamos tu espacio, tus necesidades y te proponemos soluciones que cuidan del planeta.',
    features: ['Análisis de espacio personalizado', 'Propuesta de materiales sostenibles', 'Visualización 3D del proyecto', 'Presupuesto detallado'],
    price: 'Gratuita',
  },
  {
    icon: Recycle,
    title: 'Programa de Recompra',
    desc: 'Cuando quieras renovar tus muebles, los recompramos. Les damos una segunda vida restaurándolos para nuestra línea "Revive" o los reciclamos responsablemente.',
    features: ['Valoración a domicilio', 'Hasta 40% del valor original', 'Recolección sin costo', 'Certificado de reciclaje'],
    price: 'Sin Costo',
  },
  {
    icon: Zap,
    title: 'Restauración & Nueva Vida',
    desc: 'Tu mueble ErgoCraft fue diseñado para durar décadas. Nuestro servicio de restauración le devuelve el esplendor original con acabados renovados y tapicería fresca.',
    features: ['Diagnóstico del estado actual', 'Restauración estructural', 'Re-acabado con productos eco', 'Retapizado con telas orgánicas'],
    price: 'Desde $2,500',
  },
  {
    icon: ShieldCheck,
    title: 'Garantía Extendida Verde',
    desc: 'Extiende la vida útil de tus piezas con nuestra garantía verde de 10 años. Incluye mantenimiento preventivo anual y reparaciones con materiales certificados.',
    features: ['Cobertura de 10 años', 'Mantenimiento anual incluido', 'Reparaciones con materiales FSC', 'Servicio a domicilio'],
    price: 'Desde $1,200/año',
  },
];

export function ServicesPage() {
  const { goHome, navigate } = useNavigation();

  return (
    <div className="bg-white">
      {/* Hero */}
      <section className="relative h-[75vh] min-h-[550px] overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=1600&q=80"
          alt="Sostenibilidad"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-dark-brown/80 via-dark-brown/50 to-transparent" />
        <div className="absolute inset-0 flex items-center">
          <div className="max-w-[1400px] mx-auto px-6 lg:px-10 w-full">
            <div className="flex items-center gap-2 text-white/60 text-xs tracking-widest uppercase mb-8">
              <button onClick={goHome} className="hover:text-white transition-colors">Inicio</button>
              <ChevronRight className="w-3 h-3" />
              <span className="text-white">Sostenibilidad</span>
            </div>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="max-w-2xl"
            >
              <p className="text-green-400 text-xs tracking-[0.3em] uppercase mb-4 font-medium flex items-center gap-2">
                <Leaf className="w-4 h-4" /> Compromiso Ambiental
              </p>
              <h1 className="font-serif text-5xl md:text-6xl lg:text-7xl text-white leading-[1.1] mb-6">
                Diseño que <em className="text-green-400">Respeta</em> el Planeta
              </h1>
              <p className="text-white/80 text-lg leading-relaxed mb-8 max-w-xl">
                La sostenibilidad no es una tendencia para nosotros. Es el principio fundamental 
                que guía cada decisión, desde la selección del primer material hasta la entrega 
                final en tu hogar.
              </p>
              <button onClick={() => navigate({ type: 'showroom' })} className="bg-green-600 hover:bg-green-700 text-white px-8 py-4 text-sm tracking-widest uppercase transition-all">
                Visitar Nuestro Taller Verde
              </button>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Impact Numbers */}
      <section className="relative -mt-16 z-10">
        <div className="max-w-[1200px] mx-auto px-6 lg:px-10">
          <div className="bg-white shadow-2xl grid grid-cols-2 md:grid-cols-4">
            {[
              { value: '25,000+', label: 'Árboles Plantados', icon: TreePine },
              { value: '100%', label: 'Energía Renovable', icon: Zap },
              { value: '98%', label: 'Residuos Reciclados', icon: Recycle },
              { value: '0', label: 'Plástico de Un Solo Uso', icon: Leaf },
            ].map((item, i) => (
              <motion.div
                key={item.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 + i * 0.1 }}
                className="p-8 text-center border-r border-b border-sand last:border-r-0 md:[&:nth-child(4)]:border-r-0 md:border-b-0"
              >
                <item.icon className="w-6 h-6 text-green-600 mx-auto mb-3" />
                <p className="font-serif text-3xl text-dark mb-1">{item.value}</p>
                <p className="text-xs tracking-widest uppercase text-warm-gray">{item.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Core Commitments */}
      <section className="py-24 lg:py-32">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-10">
          <div className="text-center mb-16">
            <p className="text-green-600 text-xs tracking-[0.3em] uppercase mb-4 font-medium">Nuestros Compromisos</p>
            <h2 className="font-serif text-4xl lg:text-5xl text-dark mb-4">
              Cuatro Pilares de <em className="text-green-600">Sostenibilidad</em>
            </h2>
            <p className="text-warm-gray max-w-xl mx-auto">
              Cada pieza ErgoCraft cumple con nuestros cuatro compromisos ambientales fundamentales.
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {commitments.map((item, i) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="group border border-sand hover:border-green-200 p-8 transition-all duration-500 hover:shadow-lg relative overflow-hidden text-center"
              >
                <div className="absolute top-0 left-0 w-full h-1 bg-green-600 scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
                <div className="w-16 h-16 bg-green-50 group-hover:bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6 transition-colors">
                  <item.icon className="w-7 h-7 text-green-600" strokeWidth={1.5} />
                </div>
                <p className="font-serif text-4xl text-green-600 mb-1">{item.stat}</p>
                <p className="text-[10px] tracking-widest uppercase text-warm-gray mb-4">{item.statLabel}</p>
                <h3 className="font-serif text-lg text-dark mb-3">{item.title}</h3>
                <p className="text-warm-gray text-sm leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Initiatives */}
      <section className="py-24 lg:py-32 bg-cream">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-10">
          <div className="text-center mb-16">
            <p className="text-green-600 text-xs tracking-[0.3em] uppercase mb-4 font-medium">Iniciativas</p>
            <h2 className="font-serif text-4xl lg:text-5xl text-dark">
              Acciones <em className="text-green-600">Concretas</em>
            </h2>
          </div>
          {initiatives.map((item, i) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className={`grid lg:grid-cols-2 gap-0 mb-8 last:mb-0 ${i % 2 === 1 ? 'direction-rtl' : ''}`}
            >
              <div className={`relative overflow-hidden ${i % 2 === 1 ? 'lg:order-2' : ''}`}>
                <img
                  src={item.img}
                  alt={item.title}
                  className="w-full h-full min-h-[350px] object-cover"
                />
              </div>
              <div className={`bg-white p-10 lg:p-16 flex flex-col justify-center ${i % 2 === 1 ? 'lg:order-1' : ''}`}>
                <h3 className="font-serif text-3xl text-dark mb-4">{item.title}</h3>
                <p className="text-warm-gray leading-relaxed mb-8">{item.desc}</p>
                <div className="flex gap-8">
                  {item.stats.map(stat => (
                    <div key={stat.label}>
                      <p className="font-serif text-3xl text-green-600">{stat.value}</p>
                      <p className="text-xs tracking-widest uppercase text-warm-gray mt-1">{stat.label}</p>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Timeline */}
      <section className="py-24 lg:py-32">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-10">
          <div className="text-center mb-16">
            <p className="text-green-600 text-xs tracking-[0.3em] uppercase mb-4 font-medium">Nuestra Trayectoria</p>
            <h2 className="font-serif text-4xl lg:text-5xl text-dark">
              El Camino Hacia la <em className="text-green-600">Sostenibilidad</em>
            </h2>
          </div>
          <div className="relative">
            {/* Line */}
            <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-px bg-sand md:-translate-x-px" />
            <div className="space-y-12">
              {timeline.map((item, i) => (
                <motion.div
                  key={item.year}
                  initial={{ opacity: 0, x: i % 2 === 0 ? -30 : 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.1 }}
                  className={`relative grid md:grid-cols-2 gap-8 md:gap-16 items-center ${
                    i % 2 === 0 ? '' : 'md:direction-rtl'
                  }`}
                >
                  {/* Dot */}
                  <div className="absolute left-4 md:left-1/2 w-3 h-3 bg-green-600 rounded-full -translate-x-1.5 md:-translate-x-1.5 border-4 border-white shadow-sm z-10" />

                  <div className={`pl-12 md:pl-0 ${i % 2 === 0 ? 'md:text-right md:pr-16' : 'md:order-2 md:pl-16'}`}>
                    <span className="font-serif text-4xl text-green-600/30">{item.year}</span>
                    <h3 className="font-serif text-xl text-dark mt-1 mb-2">{item.title}</h3>
                    <p className="text-warm-gray text-sm leading-relaxed">{item.desc}</p>
                  </div>
                  <div className={`hidden md:block ${i % 2 === 0 ? 'md:order-2 md:pl-16' : 'md:text-right md:pr-16'}`} />
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="py-24 lg:py-32 bg-dark-brown text-white">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-10">
          <div className="text-center mb-16">
            <p className="text-green-400 text-xs tracking-[0.3em] uppercase mb-4 font-medium">Servicios Verdes</p>
            <h2 className="font-serif text-4xl lg:text-5xl leading-tight mb-4">
              Servicios de <em className="text-green-400">Sostenibilidad</em>
            </h2>
            <p className="text-white/50 max-w-xl mx-auto">
              Ofrecemos servicios diseñados para maximizar la vida útil de tus muebles y minimizar 
              el impacto ambiental.
            </p>
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            {services.map((service, i) => (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="border border-white/10 hover:border-green-400/30 p-8 lg:p-10 transition-all duration-500 group"
              >
                <div className="flex items-start justify-between mb-6">
                  <div className="w-14 h-14 bg-white/5 group-hover:bg-green-400/10 flex items-center justify-center transition-colors">
                    <service.icon className="w-6 h-6 text-green-400" strokeWidth={1.5} />
                  </div>
                  <span className="text-green-400 font-serif text-lg">{service.price}</span>
                </div>
                <h3 className="font-serif text-2xl text-white mb-3">{service.title}</h3>
                <p className="text-white/50 text-sm leading-relaxed mb-6">{service.desc}</p>
                <div className="space-y-2 mb-6">
                  {service.features.map(feat => (
                    <div key={feat} className="flex items-center gap-2 text-white/70 text-sm">
                      <CheckCircle className="w-4 h-4 text-green-400 flex-shrink-0" />
                      {feat}
                    </div>
                  ))}
                </div>
                <button className="text-green-400 text-xs tracking-widest uppercase flex items-center gap-2 hover:gap-3 transition-all group-hover:underline">
                  Solicitar Servicio <ArrowRight className="w-3 h-3" />
                </button>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Certifications */}
      <section className="py-24 lg:py-32">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-10">
          <div className="text-center mb-16">
            <p className="text-green-600 text-xs tracking-[0.3em] uppercase mb-4 font-medium">Avales</p>
            <h2 className="font-serif text-4xl lg:text-5xl text-dark mb-4">
              Certificaciones y <em className="text-green-600">Reconocimientos</em>
            </h2>
            <p className="text-warm-gray max-w-xl mx-auto">
              Nuestro compromiso ambiental está respaldado por certificaciones internacionales 
              reconocidas y auditorías independientes.
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {certifications.map((cert, i) => (
              <motion.div
                key={cert.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className="flex items-start gap-4 p-6 border border-sand hover:border-green-200 hover:shadow-md transition-all group"
              >
                <div className="w-12 h-12 bg-green-50 group-hover:bg-green-100 flex items-center justify-center flex-shrink-0 transition-colors">
                  <Award className="w-5 h-5 text-green-600" />
                </div>
                <div>
                  <h3 className="font-medium text-dark text-sm mb-1">{cert.name}</h3>
                  <p className="text-warm-gray text-xs leading-relaxed">{cert.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Pledge Banner */}
      <section className="relative py-32 overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=1600&q=80"
          alt="Bosque"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-dark-brown/75" />
        <div className="relative text-center text-white max-w-3xl mx-auto px-6">
          <Globe className="w-12 h-12 text-green-400 mx-auto mb-6" />
          <h2 className="font-serif text-4xl lg:text-5xl leading-tight mb-6">
            Nuestro Compromiso: <em className="text-green-400">Carbono Neutro</em> para 2025
          </h2>
          <p className="text-white/70 text-lg mb-10 max-w-xl mx-auto leading-relaxed">
            Nos comprometemos a compensar todas nuestras emisiones de carbono y a continuar 
            invirtiendo en energía renovable, reforestación y prácticas de producción limpia.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <button className="bg-green-600 hover:bg-green-700 text-white px-10 py-4 text-sm tracking-widest uppercase transition-all flex items-center gap-2">
              <Heart className="w-4 h-4" /> Apoyar la Causa
            </button>
            <button onClick={goHome} className="border border-white/30 hover:border-white text-white px-10 py-4 text-sm tracking-widest uppercase transition-all">
              Explorar Colecciones Eco
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
