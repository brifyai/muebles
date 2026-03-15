import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Truck,
  Package,
  RotateCcw,
  Clock,
  ShieldCheck,
  MapPin,
  ChevronDown,
  CheckCircle2,
  AlertCircle,
  Phone,
  Mail,
  MessageCircle,
  Globe,
  Box,
  CreditCard,
  CalendarDays,
  ArrowRight,
} from 'lucide-react';
import { useNavigation } from '@/context/NavigationContext';

const shippingMethods = [
  {
    icon: Truck,
    title: 'Envío Estándar',
    time: '5–7 días hábiles',
    price: 'Gratis en pedidos +$500',
    priceBelow: '$49.00 para pedidos menores',
    description: 'Servicio de mensajería con seguimiento completo hasta la puerta de tu hogar.',
    highlight: true,
  },
  {
    icon: Package,
    title: 'Envío Express',
    time: '2–3 días hábiles',
    price: '$89.00',
    priceBelow: null,
    description: 'Entrega prioritaria con horario preferido y notificación en tiempo real.',
    highlight: false,
  },
  {
    icon: Clock,
    title: 'Entrega Premium',
    time: '1–2 días hábiles',
    price: '$149.00',
    priceBelow: null,
    description: 'Servicio de guante blanco: entrega, desembalaje, instalación y retiro de embalaje.',
    highlight: false,
  },
  {
    icon: Globe,
    title: 'Envío Internacional',
    time: '10–15 días hábiles',
    price: 'Desde $199.00',
    priceBelow: null,
    description: 'Enviamos a más de 40 países. Impuestos y aranceles calculados al finalizar la compra.',
    highlight: false,
  },
];

const deliveryZones = [
  { zone: 'Zona Metropolitana', standard: '3–5 días', express: '1–2 días', premium: 'Día siguiente' },
  { zone: 'Ciudades Principales', standard: '5–7 días', express: '2–3 días', premium: '1–2 días' },
  { zone: 'Resto del País', standard: '7–10 días', express: '3–5 días', premium: '2–3 días' },
  { zone: 'Zonas Remotas', standard: '10–14 días', express: '5–7 días', premium: '3–5 días' },
];

const processSteps = [
  {
    number: '01',
    title: 'Confirmación del Pedido',
    description: 'Recibirás un correo de confirmación con los detalles de tu compra y número de seguimiento.',
    icon: CheckCircle2,
  },
  {
    number: '02',
    title: 'Preparación',
    description: 'Tu mueble es cuidadosamente inspeccionado, protegido y embalado para garantizar que llegue en perfectas condiciones.',
    icon: Box,
  },
  {
    number: '03',
    title: 'En Camino',
    description: 'Podrás rastrear tu pedido en tiempo real. Te notificaremos cada actualización del estado de entrega.',
    icon: Truck,
  },
  {
    number: '04',
    title: 'Entrega y Verificación',
    description: 'Nuestro equipo entrega en la ubicación que elijas. Verifica el estado del producto al momento de la recepción.',
    icon: ShieldCheck,
  },
];

const returnSteps = [
  {
    step: 1,
    title: 'Solicita tu Devolución',
    description: 'Contacta a nuestro equipo dentro de los primeros 30 días desde la recepción. Puedes hacerlo por teléfono, email o chat.',
  },
  {
    step: 2,
    title: 'Aprobación y Etiqueta',
    description: 'Evaluamos tu solicitud en 24 horas y te enviamos una etiqueta de devolución prepagada por correo electrónico.',
  },
  {
    step: 3,
    title: 'Recolección del Producto',
    description: 'Coordinamos la recolección en tu domicilio. Solo necesitas tener el producto en su embalaje original.',
  },
  {
    step: 4,
    title: 'Reembolso o Cambio',
    description: 'Una vez recibido e inspeccionado, procesamos tu reembolso en 5–7 días hábiles al método de pago original.',
  },
];

const faqs = [
  {
    question: '¿Puedo cambiar la dirección de entrega después de realizar mi pedido?',
    answer: 'Sí, puedes modificar la dirección de entrega siempre que el pedido no haya sido despachado. Contacta a nuestro equipo de atención al cliente lo antes posible para realizar el cambio.',
  },
  {
    question: '¿Qué sucede si no estoy en casa al momento de la entrega?',
    answer: 'Nuestro servicio de mensajería intentará contactarte antes de la entrega. Si no te encuentra, programará un segundo intento. También puedes designar a otra persona para recibir el pedido.',
  },
  {
    question: '¿Ofrecen servicio de instalación y montaje?',
    answer: 'Sí, con nuestro servicio de Entrega Premium incluimos instalación completa, montaje y retiro de todo el material de embalaje. Para otros tipos de envío, puedes añadir el servicio de montaje por un costo adicional.',
  },
  {
    question: '¿Cuál es la política de devolución para productos en oferta?',
    answer: 'Los productos adquiridos en oferta o con descuento están sujetos a las mismas condiciones de devolución que los productos a precio regular. Tienes 30 días para devolver el producto en su estado original.',
  },
  {
    question: '¿Puedo devolver un producto personalizado o hecho a medida?',
    answer: 'Los productos personalizados o fabricados a medida no son elegibles para devolución, salvo que presenten defectos de fabricación. Te recomendamos revisar cuidadosamente las especificaciones antes de confirmar tu pedido.',
  },
  {
    question: '¿Cómo puedo rastrear mi pedido?',
    answer: 'Una vez despachado tu pedido, recibirás un correo electrónico con el número de seguimiento y un enlace directo para rastrear tu envío en tiempo real desde nuestra página de seguimiento.',
  },
  {
    question: '¿Realizan envíos a apartados postales o casilleros?',
    answer: 'Debido al tamaño y peso de nuestros muebles, no realizamos envíos a apartados postales ni casilleros. Necesitamos una dirección física con acceso para la entrega.',
  },
  {
    question: '¿Qué pasa si mi producto llega dañado?',
    answer: 'Si tu producto llega con algún daño, toma fotografías del embalaje y del producto, y contacta a nuestro equipo dentro de las primeras 48 horas. Gestionaremos un reemplazo o reembolso completo sin costo adicional.',
  },
];

export function ShippingPage() {
  const { goHome } = useNavigation();
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [activeTab, setActiveTab] = useState<'envios' | 'devoluciones'>('envios');

  return (
    <div className="bg-white">
      {/* Hero */}
      <section className="relative bg-dark-brown overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=1920&q=80"
            alt="Entrega"
            className="w-full h-full object-cover opacity-20"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-dark-brown via-dark-brown/95 to-dark-brown/70" />
        </div>
        <div className="relative max-w-[1400px] mx-auto px-6 lg:px-10 py-24 lg:py-32">
          {/* Breadcrumbs */}
          <div className="flex items-center gap-2 text-sm mb-8">
            <button onClick={goHome} className="text-warm-gray hover:text-brand transition-colors">
              Inicio
            </button>
            <span className="text-warm-gray/50">/</span>
            <span className="text-brand">Envíos y Devoluciones</span>
          </div>

          <div className="max-w-3xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <span className="text-[11px] tracking-[0.3em] uppercase text-brand font-medium">
                Información de Envíos
              </span>
              <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl text-white mt-4 mb-6 leading-[1.15]">
                Envíos y <em className="text-brand">Devoluciones</em>
              </h1>
              <p className="text-lg text-warm-gray leading-relaxed max-w-2xl">
                Nos aseguramos de que cada pieza llegue a tu hogar en perfectas condiciones.
                Conoce nuestras opciones de envío, tiempos de entrega y nuestra política
                de devoluciones sin complicaciones.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Tabs */}
      <section className="border-b border-light-gray sticky top-20 bg-white z-30">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-10">
          <div className="flex gap-0">
            <button
              onClick={() => setActiveTab('envios')}
              className={`relative px-8 py-5 text-sm font-medium tracking-wide uppercase transition-colors ${
                activeTab === 'envios' ? 'text-brand' : 'text-warm-gray hover:text-dark'
              }`}
            >
              Envíos y Entregas
              {activeTab === 'envios' && (
                <motion.div
                  layoutId="shippingTab"
                  className="absolute bottom-0 left-0 right-0 h-0.5 bg-brand"
                />
              )}
            </button>
            <button
              onClick={() => setActiveTab('devoluciones')}
              className={`relative px-8 py-5 text-sm font-medium tracking-wide uppercase transition-colors ${
                activeTab === 'devoluciones' ? 'text-brand' : 'text-warm-gray hover:text-dark'
              }`}
            >
              Devoluciones y Reembolsos
              {activeTab === 'devoluciones' && (
                <motion.div
                  layoutId="shippingTab"
                  className="absolute bottom-0 left-0 right-0 h-0.5 bg-brand"
                />
              )}
            </button>
          </div>
        </div>
      </section>

      <AnimatePresence mode="wait">
        {activeTab === 'envios' ? (
          <motion.div
            key="envios"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
          >
            {/* Métodos de Envío */}
            <section className="py-20 lg:py-28">
              <div className="max-w-[1400px] mx-auto px-6 lg:px-10">
                <div className="text-center mb-16">
                  <span className="text-[11px] tracking-[0.3em] uppercase text-brand font-medium">
                    Opciones de Entrega
                  </span>
                  <h2 className="font-serif text-3xl md:text-4xl text-dark mt-3 mb-4">
                    Métodos de <em className="text-brand">Envío</em>
                  </h2>
                  <p className="text-warm-gray max-w-xl mx-auto">
                    Elige la opción que mejor se adapte a tus necesidades. Todos nuestros
                    envíos incluyen seguimiento en tiempo real y seguro de transporte.
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  {shippingMethods.map((method, i) => (
                    <motion.div
                      key={method.title}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.1 }}
                      className={`relative group p-8 border transition-all duration-300 hover:shadow-lg ${
                        method.highlight
                          ? 'border-brand bg-cream'
                          : 'border-light-gray hover:border-brand/30'
                      }`}
                    >
                      {method.highlight && (
                        <div className="absolute -top-3 left-8 bg-brand text-white text-[10px] tracking-widest uppercase px-4 py-1 font-medium">
                          Más Popular
                        </div>
                      )}
                      <method.icon className="w-8 h-8 text-brand mb-6" strokeWidth={1.2} />
                      <h3 className="font-serif text-xl text-dark mb-2">{method.title}</h3>
                      <div className="flex items-center gap-2 mb-4">
                        <Clock className="w-3.5 h-3.5 text-warm-gray" />
                        <span className="text-sm text-warm-gray">{method.time}</span>
                      </div>
                      <p className="text-sm text-warm-gray leading-relaxed mb-5">
                        {method.description}
                      </p>
                      <div className="border-t border-light-gray pt-4">
                        <span className="text-lg font-semibold text-dark">{method.price}</span>
                        {method.priceBelow && (
                          <p className="text-xs text-warm-gray mt-1">{method.priceBelow}</p>
                        )}
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </section>

            {/* Zonas de Entrega */}
            <section className="py-20 lg:py-28 bg-cream/50">
              <div className="max-w-[1400px] mx-auto px-6 lg:px-10">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                  <div>
                    <span className="text-[11px] tracking-[0.3em] uppercase text-brand font-medium">
                      Cobertura Nacional
                    </span>
                    <h2 className="font-serif text-3xl md:text-4xl text-dark mt-3 mb-6">
                      Zonas de <em className="text-brand">Entrega</em>
                    </h2>
                    <p className="text-warm-gray leading-relaxed mb-8">
                      Realizamos entregas en todo el país. Los tiempos de envío varían según
                      tu ubicación. Consulta nuestra tabla de zonas para conocer los tiempos
                      estimados de entrega a tu región.
                    </p>
                    <div className="flex items-center gap-3 text-sm text-dark">
                      <MapPin className="w-5 h-5 text-brand" />
                      <span>Cobertura en más de 40 países para envíos internacionales</span>
                    </div>
                  </div>
                  <div className="overflow-hidden border border-light-gray bg-white">
                    <table className="w-full">
                      <thead>
                        <tr className="bg-dark-brown text-white">
                          <th className="text-left px-6 py-4 text-[11px] tracking-widest uppercase font-medium">
                            Zona
                          </th>
                          <th className="text-center px-4 py-4 text-[11px] tracking-widest uppercase font-medium">
                            Estándar
                          </th>
                          <th className="text-center px-4 py-4 text-[11px] tracking-widest uppercase font-medium">
                            Express
                          </th>
                          <th className="text-center px-4 py-4 text-[11px] tracking-widest uppercase font-medium">
                            Premium
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {deliveryZones.map((zone, i) => (
                          <tr key={zone.zone} className={i % 2 === 0 ? 'bg-white' : 'bg-cream/30'}>
                            <td className="px-6 py-4 text-sm font-medium text-dark">{zone.zone}</td>
                            <td className="text-center px-4 py-4 text-sm text-warm-gray">{zone.standard}</td>
                            <td className="text-center px-4 py-4 text-sm text-warm-gray">{zone.express}</td>
                            <td className="text-center px-4 py-4 text-sm text-brand font-medium">{zone.premium}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </section>

            {/* Proceso de Envío */}
            <section className="py-20 lg:py-28">
              <div className="max-w-[1400px] mx-auto px-6 lg:px-10">
                <div className="text-center mb-16">
                  <span className="text-[11px] tracking-[0.3em] uppercase text-brand font-medium">
                    Paso a Paso
                  </span>
                  <h2 className="font-serif text-3xl md:text-4xl text-dark mt-3 mb-4">
                    Proceso de <em className="text-brand">Entrega</em>
                  </h2>
                  <p className="text-warm-gray max-w-xl mx-auto">
                    Desde el momento en que realizas tu pedido hasta que recibes tu mueble,
                    te acompañamos en cada paso del proceso.
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-0">
                  {processSteps.map((step, i) => (
                    <motion.div
                      key={step.number}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.15 }}
                      className="relative group"
                    >
                      {i < processSteps.length - 1 && (
                        <div className="hidden lg:block absolute top-12 left-[60%] w-[80%] h-px border-t-2 border-dashed border-light-gray z-0" />
                      )}
                      <div className="relative z-10 p-8 text-center">
                        <div className="w-24 h-24 mx-auto mb-6 bg-cream group-hover:bg-dark-brown rounded-full flex items-center justify-center transition-all duration-500">
                          <step.icon className="w-10 h-10 text-brand group-hover:text-white transition-colors duration-500" strokeWidth={1.2} />
                        </div>
                        <span className="text-[11px] tracking-[0.3em] text-brand font-bold">{step.number}</span>
                        <h3 className="font-serif text-lg text-dark mt-2 mb-3">{step.title}</h3>
                        <p className="text-sm text-warm-gray leading-relaxed">{step.description}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </section>

            {/* Info Banner */}
            <section className="bg-dark-brown py-16">
              <div className="max-w-[1400px] mx-auto px-6 lg:px-10">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-10 text-center">
                  <div>
                    <ShieldCheck className="w-10 h-10 text-brand mx-auto mb-4" strokeWidth={1.2} />
                    <h3 className="font-serif text-xl text-white mb-2">Envío Asegurado</h3>
                    <p className="text-sm text-warm-gray">
                      Todos los envíos incluyen seguro completo contra daños durante el transporte, sin costo adicional.
                    </p>
                  </div>
                  <div>
                    <Package className="w-10 h-10 text-brand mx-auto mb-4" strokeWidth={1.2} />
                    <h3 className="font-serif text-xl text-white mb-2">Embalaje Profesional</h3>
                    <p className="text-sm text-warm-gray">
                      Cada pieza se embala con materiales de protección premium para garantizar que llegue intacta.
                    </p>
                  </div>
                  <div>
                    <CreditCard className="w-10 h-10 text-brand mx-auto mb-4" strokeWidth={1.2} />
                    <h3 className="font-serif text-xl text-white mb-2">Sin Costos Ocultos</h3>
                    <p className="text-sm text-warm-gray">
                      El precio que ves es el que pagas. Sin cargos sorpresa ni recargos de última hora.
                    </p>
                  </div>
                </div>
              </div>
            </section>
          </motion.div>
        ) : (
          <motion.div
            key="devoluciones"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
          >
            {/* Política de Devoluciones */}
            <section className="py-20 lg:py-28">
              <div className="max-w-[1400px] mx-auto px-6 lg:px-10">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                  <div>
                    <span className="text-[11px] tracking-[0.3em] uppercase text-brand font-medium">
                      Sin Complicaciones
                    </span>
                    <h2 className="font-serif text-3xl md:text-4xl text-dark mt-3 mb-6">
                      Política de <em className="text-brand">Devoluciones</em>
                    </h2>
                    <p className="text-warm-gray leading-relaxed mb-8">
                      Queremos que estés completamente satisfecho con tu compra. Si por cualquier
                      motivo no estás conforme, puedes devolver tu producto dentro de los primeros
                      30 días desde la recepción.
                    </p>

                    <div className="space-y-5">
                      <div className="flex items-start gap-4">
                        <div className="w-10 h-10 bg-cream flex items-center justify-center flex-shrink-0 rounded-full">
                          <CalendarDays className="w-5 h-5 text-brand" />
                        </div>
                        <div>
                          <h4 className="text-sm font-semibold text-dark mb-1">30 Días de Garantía</h4>
                          <p className="text-sm text-warm-gray">
                            Tienes hasta 30 días naturales desde la fecha de recepción para solicitar una devolución.
                          </p>
                        </div>
                      </div>
                      <div className="flex items-start gap-4">
                        <div className="w-10 h-10 bg-cream flex items-center justify-center flex-shrink-0 rounded-full">
                          <RotateCcw className="w-5 h-5 text-brand" />
                        </div>
                        <div>
                          <h4 className="text-sm font-semibold text-dark mb-1">Devolución Gratuita</h4>
                          <p className="text-sm text-warm-gray">
                            El costo de la devolución corre por nuestra cuenta. Te enviamos una etiqueta prepagada.
                          </p>
                        </div>
                      </div>
                      <div className="flex items-start gap-4">
                        <div className="w-10 h-10 bg-cream flex items-center justify-center flex-shrink-0 rounded-full">
                          <CreditCard className="w-5 h-5 text-brand" />
                        </div>
                        <div>
                          <h4 className="text-sm font-semibold text-dark mb-1">Reembolso Completo</h4>
                          <p className="text-sm text-warm-gray">
                            Procesamos tu reembolso al método de pago original en un plazo de 5–7 días hábiles.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="relative">
                    <img
                      src="https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?w=800&q=80"
                      alt="Muebles ErgoCraft"
                      className="w-full aspect-[4/5] object-cover"
                    />
                    <div className="absolute bottom-6 left-6 right-6 bg-white/95 backdrop-blur-sm p-6">
                      <div className="flex items-center gap-3">
                        <ShieldCheck className="w-8 h-8 text-brand" />
                        <div>
                          <p className="text-sm font-semibold text-dark">Garantía de Satisfacción</p>
                          <p className="text-xs text-warm-gray">Si no estás satisfecho, te devolvemos tu dinero</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Proceso de Devolución */}
            <section className="py-20 lg:py-28 bg-cream/50">
              <div className="max-w-[1400px] mx-auto px-6 lg:px-10">
                <div className="text-center mb-16">
                  <span className="text-[11px] tracking-[0.3em] uppercase text-brand font-medium">
                    Simple y Transparente
                  </span>
                  <h2 className="font-serif text-3xl md:text-4xl text-dark mt-3 mb-4">
                    Proceso de <em className="text-brand">Devolución</em>
                  </h2>
                  <p className="text-warm-gray max-w-xl mx-auto">
                    Hemos simplificado nuestro proceso de devolución para que sea lo más
                    sencillo posible. Solo necesitas seguir estos cuatro pasos.
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                  {returnSteps.map((step, i) => (
                    <motion.div
                      key={step.step}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.1 }}
                      className="relative"
                    >
                      {i < returnSteps.length - 1 && (
                        <div className="hidden lg:block absolute top-8 left-[55%] w-full">
                          <ArrowRight className="w-5 h-5 text-brand/30" />
                        </div>
                      )}
                      <div className="bg-white p-8 border border-light-gray h-full hover:border-brand/30 transition-colors">
                        <span className="text-4xl font-serif text-brand/20 font-bold">
                          {String(step.step).padStart(2, '0')}
                        </span>
                        <h3 className="font-serif text-lg text-dark mt-3 mb-3">{step.title}</h3>
                        <p className="text-sm text-warm-gray leading-relaxed">{step.description}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </section>

            {/* Condiciones */}
            <section className="py-20 lg:py-28">
              <div className="max-w-[1400px] mx-auto px-6 lg:px-10">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
                  {/* Elegible */}
                  <div className="bg-cream/50 border border-light-gray p-10">
                    <div className="flex items-center gap-3 mb-6">
                      <CheckCircle2 className="w-7 h-7 text-green-600" />
                      <h3 className="font-serif text-2xl text-dark">Elegible para Devolución</h3>
                    </div>
                    <ul className="space-y-4">
                      {[
                        'Productos en su estado original, sin usar y sin daños',
                        'Con embalaje original completo incluyendo accesorios',
                        'Dentro de los primeros 30 días desde la recepción',
                        'Productos con defectos de fabricación (hasta 1 año)',
                        'Pedidos incorrectos o que no coinciden con la descripción',
                        'Productos dañados durante el transporte',
                      ].map((item, i) => (
                        <li key={i} className="flex items-start gap-3">
                          <CheckCircle2 className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                          <span className="text-sm text-dark/80">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* No Elegible */}
                  <div className="bg-cream/50 border border-light-gray p-10">
                    <div className="flex items-center gap-3 mb-6">
                      <AlertCircle className="w-7 h-7 text-red-500" />
                      <h3 className="font-serif text-2xl text-dark">No Elegible</h3>
                    </div>
                    <ul className="space-y-4">
                      {[
                        'Productos personalizados o fabricados a medida',
                        'Artículos usados o con signos de desgaste',
                        'Productos sin embalaje original o con embalaje dañado',
                        'Muestras de telas, muestrarios o materiales promocionales',
                        'Productos adquiridos hace más de 30 días',
                        'Artículos de liquidación marcados como "Venta Final"',
                      ].map((item, i) => (
                        <li key={i} className="flex items-start gap-3">
                          <AlertCircle className="w-4 h-4 text-red-500 mt-0.5 flex-shrink-0" />
                          <span className="text-sm text-dark/80">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </section>

            {/* Banner de Garantía */}
            <section className="bg-dark-brown py-16">
              <div className="max-w-[1400px] mx-auto px-6 lg:px-10">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-10 text-center">
                  <div>
                    <RotateCcw className="w-10 h-10 text-brand mx-auto mb-4" strokeWidth={1.2} />
                    <h3 className="font-serif text-xl text-white mb-2">30 Días para Devolver</h3>
                    <p className="text-sm text-warm-gray">
                      Tienes un mes completo desde la recepción para decidir si el producto es el indicado.
                    </p>
                  </div>
                  <div>
                    <Truck className="w-10 h-10 text-brand mx-auto mb-4" strokeWidth={1.2} />
                    <h3 className="font-serif text-xl text-white mb-2">Recolección a Domicilio</h3>
                    <p className="text-sm text-warm-gray">
                      Coordinamos la recolección del producto en tu domicilio sin costo adicional.
                    </p>
                  </div>
                  <div>
                    <CreditCard className="w-10 h-10 text-brand mx-auto mb-4" strokeWidth={1.2} />
                    <h3 className="font-serif text-xl text-white mb-2">Reembolso en 5–7 Días</h3>
                    <p className="text-sm text-warm-gray">
                      Una vez aprobada la devolución, tu reembolso se procesa en un máximo de 7 días hábiles.
                    </p>
                  </div>
                </div>
              </div>
            </section>
          </motion.div>
        )}
      </AnimatePresence>

      {/* FAQ - Común para ambas tabs */}
      <section className="py-20 lg:py-28 bg-cream/30">
        <div className="max-w-[900px] mx-auto px-6 lg:px-10">
          <div className="text-center mb-14">
            <span className="text-[11px] tracking-[0.3em] uppercase text-brand font-medium">
              Resolvemos tus Dudas
            </span>
            <h2 className="font-serif text-3xl md:text-4xl text-dark mt-3">
              Preguntas <em className="text-brand">Frecuentes</em>
            </h2>
          </div>

          <div className="space-y-3">
            {faqs.map((faq, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                className="bg-white border border-light-gray overflow-hidden"
              >
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="w-full flex items-center justify-between p-6 text-left group"
                >
                  <span className="text-[15px] font-medium text-dark pr-4 group-hover:text-brand transition-colors">
                    {faq.question}
                  </span>
                  <ChevronDown
                    className={`w-5 h-5 text-warm-gray flex-shrink-0 transition-transform duration-300 ${
                      openFaq === i ? 'rotate-180 text-brand' : ''
                    }`}
                  />
                </button>
                <AnimatePresence>
                  {openFaq === i && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <div className="px-6 pb-6 pt-0">
                        <div className="border-t border-light-gray pt-4">
                          <p className="text-sm text-warm-gray leading-relaxed">{faq.answer}</p>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA de Contacto */}
      <section className="py-20 lg:py-28">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-10">
          <div className="text-center mb-14">
            <span className="text-[11px] tracking-[0.3em] uppercase text-brand font-medium">
              Estamos para Ayudarte
            </span>
            <h2 className="font-serif text-3xl md:text-4xl text-dark mt-3 mb-4">
              ¿Necesitas <em className="text-brand">Ayuda</em>?
            </h2>
            <p className="text-warm-gray max-w-xl mx-auto">
              Nuestro equipo de atención al cliente está disponible para responder cualquier
              pregunta sobre envíos, entregas o devoluciones.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            <a
              href="tel:+34900123456"
              className="group flex flex-col items-center p-8 border border-light-gray hover:border-brand/30 hover:shadow-lg transition-all duration-300 text-center"
            >
              <div className="w-16 h-16 bg-cream group-hover:bg-dark-brown flex items-center justify-center rounded-full transition-colors duration-300 mb-5">
                <Phone className="w-7 h-7 text-brand group-hover:text-white transition-colors duration-300" strokeWidth={1.2} />
              </div>
              <h3 className="font-serif text-lg text-dark mb-1">Llámanos</h3>
              <p className="text-sm text-warm-gray mb-3">Lun–Vie, 9:00–18:00</p>
              <span className="text-sm font-medium text-brand">+34 900 123 456</span>
            </a>

            <a
              href="mailto:hola@ergocraft.com"
              className="group flex flex-col items-center p-8 border border-light-gray hover:border-brand/30 hover:shadow-lg transition-all duration-300 text-center"
            >
              <div className="w-16 h-16 bg-cream group-hover:bg-dark-brown flex items-center justify-center rounded-full transition-colors duration-300 mb-5">
                <Mail className="w-7 h-7 text-brand group-hover:text-white transition-colors duration-300" strokeWidth={1.2} />
              </div>
              <h3 className="font-serif text-lg text-dark mb-1">Escríbenos</h3>
              <p className="text-sm text-warm-gray mb-3">Respuesta en 24h</p>
              <span className="text-sm font-medium text-brand">hola@ergocraft.com</span>
            </a>

            <button
              className="group flex flex-col items-center p-8 border border-light-gray hover:border-brand/30 hover:shadow-lg transition-all duration-300 text-center"
            >
              <div className="w-16 h-16 bg-cream group-hover:bg-dark-brown flex items-center justify-center rounded-full transition-colors duration-300 mb-5">
                <MessageCircle className="w-7 h-7 text-brand group-hover:text-white transition-colors duration-300" strokeWidth={1.2} />
              </div>
              <h3 className="font-serif text-lg text-dark mb-1">Chat en Vivo</h3>
              <p className="text-sm text-warm-gray mb-3">Disponible ahora</p>
              <span className="text-sm font-medium text-brand">Iniciar Chat</span>
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
