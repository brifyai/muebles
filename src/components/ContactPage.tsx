import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  MapPin, Phone, Mail, Clock, Send, ChevronRight,
  MessageCircle, ArrowUpRight, CheckCircle2, ChevronDown,
  Instagram, Facebook, Linkedin
} from 'lucide-react';
import { useNavigation } from '@/context/NavigationContext';

const contactInfo = [
  {
    icon: Phone,
    title: 'Llámanos',
    subtitle: 'Lun – Sáb, 9am – 7pm',
    value: '+52 (55) 1234 5678',
    action: 'tel:+525512345678',
    color: 'bg-brand/10 text-brand',
  },
  {
    icon: Mail,
    title: 'Escríbenos',
    subtitle: 'Respondemos en 24 horas',
    value: 'hola@ergocraft.mx',
    action: 'mailto:hola@ergocraft.mx',
    color: 'bg-emerald-50 text-emerald-600',
  },
  {
    icon: MessageCircle,
    title: 'Chat en Vivo',
    subtitle: 'Disponible ahora',
    value: 'Iniciar conversación',
    action: '#',
    color: 'bg-blue-50 text-blue-600',
  },
  {
    icon: MapPin,
    title: 'Visítanos',
    subtitle: 'Showroom & Taller',
    value: 'Av. Diseño 245, CDMX',
    action: '#',
    color: 'bg-purple-50 text-purple-600',
  },
];

const departments = [
  { label: 'Seleccionar departamento', value: '' },
  { label: 'Ventas y Pedidos', value: 'ventas' },
  { label: 'Atención al Cliente', value: 'atencion' },
  { label: 'Diseño y Consultoría', value: 'diseno' },
  { label: 'Envíos y Entregas', value: 'envios' },
  { label: 'Devoluciones y Garantía', value: 'devoluciones' },
  { label: 'Colaboraciones y Prensa', value: 'prensa' },
  { label: 'Empleo', value: 'empleo' },
  { label: 'Otro', value: 'otro' },
];

const faqs = [
  {
    q: '¿Cuánto tarda en llegar mi pedido?',
    a: 'El tiempo de entrega estándar es de 5 a 7 días hábiles para la zona metropolitana. Para envíos al interior de la república, el tiempo estimado es de 7 a 12 días hábiles. Los pedidos con envío express se entregan en 2 a 3 días hábiles.',
  },
  {
    q: '¿Puedo visitar el showroom sin cita previa?',
    a: 'Nuestro showroom está abierto al público de lunes a sábado de 10am a 7pm y domingos de 12pm a 5pm. No necesitas cita previa, pero si deseas una consultoría personalizada de diseño, te recomendamos agendar una cita para que uno de nuestros especialistas te atienda de forma exclusiva.',
  },
  {
    q: '¿Ofrecen servicio de diseño de interiores?',
    a: 'Sí, contamos con un equipo de diseñadores de interiores que pueden ayudarte a planificar y amueblar tu espacio. Ofrecemos una primera consulta gratuita donde evaluamos tus necesidades, estilo y presupuesto. Después, elaboramos una propuesta personalizada con renders 3D para que visualices el resultado final.',
  },
  {
    q: '¿Cuál es la política de devoluciones?',
    a: 'Tienes 30 días naturales a partir de la recepción de tu pedido para solicitar una devolución. El producto debe estar en su empaque original y sin signos de uso. Nosotros nos encargamos de la recolección a domicilio sin costo adicional y el reembolso se procesa en un plazo de 5 a 7 días hábiles.',
  },
  {
    q: '¿Hacen muebles a medida?',
    a: 'Sí, ofrecemos un servicio de muebles a medida donde puedes personalizar dimensiones, materiales, acabados y colores. El proceso incluye una consulta de diseño, elaboración de planos, aprobación del prototipo y fabricación artesanal. El tiempo de producción es de 4 a 8 semanas dependiendo de la complejidad del proyecto.',
  },
  {
    q: '¿Qué garantía tienen sus productos?',
    a: 'Todos nuestros muebles incluyen una garantía de 5 años que cubre defectos de fabricación y materiales. Además, ofrecemos un programa de garantía extendida verde de hasta 10 años para productos de nuestra línea sostenible. La garantía no cubre daños por uso inadecuado o desgaste natural.',
  },
];

const scheduleItems = [
  { day: 'Lunes a Viernes', hours: '10:00 am – 7:00 pm' },
  { day: 'Sábado', hours: '10:00 am – 6:00 pm' },
  { day: 'Domingo', hours: '12:00 pm – 5:00 pm' },
  { day: 'Días Festivos', hours: 'Consultar disponibilidad' },
];

export function ContactPage() {
  const { goHome } = useNavigation();
  const [formData, setFormData] = useState({
    nombre: '',
    apellido: '',
    email: '',
    telefono: '',
    departamento: '',
    asunto: '',
    mensaje: '',
    privacidad: false,
  });
  const [submitted, setSubmitted] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 5000);
  };

  const handleChange = (field: string, value: string | boolean) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="bg-white">
      {/* Hero */}
      <section className="relative h-[50vh] min-h-[400px] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1497366216548-37526070297c?w=1920&q=80"
            alt="Contacto"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-dark-brown/70" />
        </div>
        <div className="relative z-10 text-center max-w-3xl mx-auto px-6">
          {/* Breadcrumbs */}
          <div className="flex items-center justify-center gap-2 text-white/50 text-xs tracking-widest uppercase mb-8">
            <button onClick={goHome} className="hover:text-white transition-colors">Inicio</button>
            <ChevronRight className="w-3 h-3" />
            <span className="text-white">Contáctanos</span>
          </div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6"
          >
            ¿Cómo Podemos <span className="italic text-brand-light">Ayudarte</span>?
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-white/70 text-lg leading-relaxed max-w-xl mx-auto"
          >
            Estamos aquí para responder tus preguntas, ayudarte a encontrar la pieza perfecta
            o simplemente escuchar tus ideas. No dudes en comunicarte con nosotros.
          </motion.p>
        </div>
      </section>

      {/* Tarjetas de Contacto */}
      <section className="max-w-[1400px] mx-auto px-6 lg:px-10 -mt-16 relative z-20">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {contactInfo.map((item, i) => (
            <motion.a
              key={item.title}
              href={item.action}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="bg-white border border-light-gray p-7 hover:shadow-xl hover:-translate-y-1 transition-all duration-500 group"
            >
              <div className={`w-12 h-12 rounded-full ${item.color} flex items-center justify-center mb-5 group-hover:scale-110 transition-transform`}>
                <item.icon className="w-5 h-5" />
              </div>
              <h3 className="font-serif text-lg font-bold text-dark mb-1">{item.title}</h3>
              <p className="text-xs text-warm-gray mb-3">{item.subtitle}</p>
              <p className="text-sm font-medium text-dark group-hover:text-brand transition-colors flex items-center gap-1.5">
                {item.value}
                <ArrowUpRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition-opacity" />
              </p>
            </motion.a>
          ))}
        </div>
      </section>

      {/* Formulario + Mapa */}
      <section className="max-w-[1400px] mx-auto px-6 lg:px-10 py-24">
        <div className="grid lg:grid-cols-5 gap-12 lg:gap-16">
          {/* Formulario */}
          <div className="lg:col-span-3">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <span className="text-[11px] font-bold tracking-[0.25em] uppercase text-brand mb-3 block">
                Formulario de Contacto
              </span>
              <h2 className="font-serif text-3xl md:text-4xl font-bold text-dark mb-3">
                Envíanos un <span className="italic">Mensaje</span>
              </h2>
              <p className="text-warm-gray text-sm leading-relaxed mb-10 max-w-lg">
                Completa el formulario a continuación y nos pondremos en contacto contigo
                lo antes posible. Todos los campos marcados con * son obligatorios.
              </p>

              <AnimatePresence mode="wait">
                {submitted ? (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    className="bg-emerald-50 border border-emerald-200 p-10 text-center"
                  >
                    <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-5">
                      <CheckCircle2 className="w-8 h-8 text-emerald-600" />
                    </div>
                    <h3 className="font-serif text-2xl font-bold text-dark mb-3">
                      ¡Mensaje Enviado!
                    </h3>
                    <p className="text-warm-gray text-sm leading-relaxed max-w-md mx-auto">
                      Hemos recibido tu mensaje correctamente. Nuestro equipo lo revisará y te
                      responderá en un plazo máximo de 24 horas. Gracias por contactarnos.
                    </p>
                  </motion.div>
                ) : (
                  <motion.form
                    key="form"
                    initial={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onSubmit={handleSubmit}
                    className="space-y-6"
                  >
                    <div className="grid sm:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-xs font-semibold tracking-wide uppercase text-dark mb-2">
                          Nombre <span className="text-brand">*</span>
                        </label>
                        <input
                          type="text"
                          required
                          value={formData.nombre}
                          onChange={e => handleChange('nombre', e.target.value)}
                          placeholder="Tu nombre"
                          className="w-full border border-light-gray px-4 py-3.5 text-sm text-dark placeholder:text-warm-gray/50 focus:outline-none focus:border-brand transition-colors bg-white"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-semibold tracking-wide uppercase text-dark mb-2">
                          Apellido <span className="text-brand">*</span>
                        </label>
                        <input
                          type="text"
                          required
                          value={formData.apellido}
                          onChange={e => handleChange('apellido', e.target.value)}
                          placeholder="Tu apellido"
                          className="w-full border border-light-gray px-4 py-3.5 text-sm text-dark placeholder:text-warm-gray/50 focus:outline-none focus:border-brand transition-colors bg-white"
                        />
                      </div>
                    </div>

                    <div className="grid sm:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-xs font-semibold tracking-wide uppercase text-dark mb-2">
                          Email <span className="text-brand">*</span>
                        </label>
                        <input
                          type="email"
                          required
                          value={formData.email}
                          onChange={e => handleChange('email', e.target.value)}
                          placeholder="tu@email.com"
                          className="w-full border border-light-gray px-4 py-3.5 text-sm text-dark placeholder:text-warm-gray/50 focus:outline-none focus:border-brand transition-colors bg-white"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-semibold tracking-wide uppercase text-dark mb-2">
                          Teléfono
                        </label>
                        <input
                          type="tel"
                          value={formData.telefono}
                          onChange={e => handleChange('telefono', e.target.value)}
                          placeholder="+52 (55) 0000 0000"
                          className="w-full border border-light-gray px-4 py-3.5 text-sm text-dark placeholder:text-warm-gray/50 focus:outline-none focus:border-brand transition-colors bg-white"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold tracking-wide uppercase text-dark mb-2">
                        Departamento <span className="text-brand">*</span>
                      </label>
                      <div className="relative">
                        <select
                          required
                          value={formData.departamento}
                          onChange={e => handleChange('departamento', e.target.value)}
                          className="w-full border border-light-gray px-4 py-3.5 text-sm text-dark focus:outline-none focus:border-brand transition-colors bg-white appearance-none cursor-pointer"
                        >
                          {departments.map(d => (
                            <option key={d.value} value={d.value}>{d.label}</option>
                          ))}
                        </select>
                        <ChevronDown className="w-4 h-4 text-warm-gray absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none" />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold tracking-wide uppercase text-dark mb-2">
                        Asunto <span className="text-brand">*</span>
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.asunto}
                        onChange={e => handleChange('asunto', e.target.value)}
                        placeholder="¿En qué podemos ayudarte?"
                        className="w-full border border-light-gray px-4 py-3.5 text-sm text-dark placeholder:text-warm-gray/50 focus:outline-none focus:border-brand transition-colors bg-white"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold tracking-wide uppercase text-dark mb-2">
                        Mensaje <span className="text-brand">*</span>
                      </label>
                      <textarea
                        required
                        rows={6}
                        value={formData.mensaje}
                        onChange={e => handleChange('mensaje', e.target.value)}
                        placeholder="Cuéntanos los detalles de tu consulta..."
                        className="w-full border border-light-gray px-4 py-3.5 text-sm text-dark placeholder:text-warm-gray/50 focus:outline-none focus:border-brand transition-colors bg-white resize-none"
                      />
                    </div>

                    <div className="flex items-start gap-3">
                      <input
                        type="checkbox"
                        id="privacidad"
                        required
                        checked={formData.privacidad}
                        onChange={e => handleChange('privacidad', e.target.checked)}
                        className="mt-1 w-4 h-4 accent-brand cursor-pointer"
                      />
                      <label htmlFor="privacidad" className="text-xs text-warm-gray leading-relaxed cursor-pointer">
                        He leído y acepto la <span className="text-dark font-medium underline">Política de Privacidad</span> y
                        consiento el tratamiento de mis datos personales para la gestión de esta consulta. <span className="text-brand">*</span>
                      </label>
                    </div>

                    <div className="flex items-center gap-4 pt-2">
                      <button
                        type="submit"
                        className="bg-dark-brown text-white px-10 py-4 text-sm font-semibold tracking-widest uppercase hover:bg-brand transition-colors flex items-center gap-3 group"
                      >
                        Enviar Mensaje
                        <Send className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                      </button>
                      <span className="text-[11px] text-warm-gray">
                        Respuesta en menos de 24 hrs
                      </span>
                    </div>
                  </motion.form>
                )}
              </AnimatePresence>
            </motion.div>
          </div>

          {/* Sidebar Derecha */}
          <div className="lg:col-span-2 space-y-8">
            {/* Mapa */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="border border-light-gray overflow-hidden"
            >
              <div className="aspect-[4/3] bg-cream relative">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3763.0!2d-99.17!3d19.43!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMTnCsDI1JzQ4LjAiTiA5OcKwMTAnMTIuMCJX!5e0!3m2!1ses!2smx!4v1"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="absolute inset-0"
                  title="Ubicación ErgoCraft"
                />
              </div>
              <div className="p-6 bg-white">
                <div className="flex items-start gap-3 mb-4">
                  <MapPin className="w-5 h-5 text-brand flex-shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-serif font-bold text-dark text-sm">Showroom & Taller</h4>
                    <p className="text-xs text-warm-gray mt-1 leading-relaxed">
                      Av. Diseño 245, Col. Roma Norte<br />
                      Cuauhtémoc, CDMX, 06700
                    </p>
                  </div>
                </div>
                <a
                  href="#"
                  className="inline-flex items-center gap-1.5 text-[11px] font-bold tracking-widest uppercase text-brand hover:text-dark transition-colors"
                >
                  Obtener Indicaciones
                  <ArrowUpRight className="w-3 h-3" />
                </a>
              </div>
            </motion.div>

            {/* Horarios */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="border border-light-gray p-7"
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-brand/10 rounded-full flex items-center justify-center">
                  <Clock className="w-4 h-4 text-brand" />
                </div>
                <h3 className="font-serif text-lg font-bold text-dark">Horario de Atención</h3>
              </div>
              <div className="space-y-0">
                {scheduleItems.map((item, i) => (
                  <div
                    key={item.day}
                    className={`flex items-center justify-between py-3.5 ${
                      i !== scheduleItems.length - 1 ? 'border-b border-light-gray' : ''
                    }`}
                  >
                    <span className="text-sm text-dark font-medium">{item.day}</span>
                    <span className="text-sm text-warm-gray">{item.hours}</span>
                  </div>
                ))}
              </div>
              <div className="mt-5 pt-5 border-t border-light-gray">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
                  <span className="text-xs text-emerald-600 font-semibold">Abierto ahora</span>
                </div>
              </div>
            </motion.div>

            {/* Redes Sociales */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="border border-light-gray p-7"
            >
              <h3 className="font-serif text-lg font-bold text-dark mb-4">Síguenos</h3>
              <p className="text-xs text-warm-gray leading-relaxed mb-5">
                Mantente al día con nuestras novedades, inspiración de diseño y eventos exclusivos.
              </p>
              <div className="flex items-center gap-3">
                {[
                  { icon: Instagram, label: 'Instagram', color: 'hover:bg-pink-500' },
                  { icon: Facebook, label: 'Facebook', color: 'hover:bg-blue-600' },
                  { icon: Linkedin, label: 'LinkedIn', color: 'hover:bg-blue-700' },
                ].map(social => (
                  <a
                    key={social.label}
                    href="#"
                    className={`w-11 h-11 border border-light-gray flex items-center justify-center text-warm-gray hover:text-white ${social.color} transition-all duration-300 group`}
                  >
                    <social.icon className="w-4 h-4" />
                  </a>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Preguntas Frecuentes */}
      <section className="bg-cream py-24">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-10">
          <div className="grid lg:grid-cols-5 gap-12 lg:gap-16">
            {/* Texto */}
            <div className="lg:col-span-2">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <span className="text-[11px] font-bold tracking-[0.25em] uppercase text-brand mb-3 block">
                  Preguntas Frecuentes
                </span>
                <h2 className="font-serif text-3xl md:text-4xl font-bold text-dark mb-5">
                  Resolvemos Tus <span className="italic">Dudas</span>
                </h2>
                <p className="text-warm-gray text-sm leading-relaxed mb-8">
                  Hemos reunido las preguntas más comunes de nuestros clientes para ayudarte
                  a encontrar respuestas de forma rápida. Si no encuentras lo que buscas,
                  no dudes en contactarnos directamente.
                </p>
                <div className="bg-white border border-light-gray p-6">
                  <h4 className="font-serif font-bold text-dark mb-2">¿No encuentras tu respuesta?</h4>
                  <p className="text-xs text-warm-gray leading-relaxed mb-4">
                    Nuestro equipo de atención al cliente está listo para ayudarte con cualquier
                    consulta adicional que tengas.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-3">
                    <a
                      href="tel:+525512345678"
                      className="inline-flex items-center justify-center gap-2 bg-dark-brown text-white px-5 py-3 text-xs font-semibold tracking-widest uppercase hover:bg-brand transition-colors"
                    >
                      <Phone className="w-3.5 h-3.5" />
                      Llamar Ahora
                    </a>
                    <a
                      href="#"
                      className="inline-flex items-center justify-center gap-2 border border-dark-brown text-dark px-5 py-3 text-xs font-semibold tracking-widest uppercase hover:bg-dark-brown hover:text-white transition-colors"
                    >
                      <MessageCircle className="w-3.5 h-3.5" />
                      Chat en Vivo
                    </a>
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Acordeón */}
            <div className="lg:col-span-3">
              <div className="space-y-0">
                {faqs.map((faq, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: i * 0.05 }}
                    className="border-b border-light-gray"
                  >
                    <button
                      onClick={() => setOpenFaq(openFaq === i ? null : i)}
                      className="w-full flex items-center justify-between py-6 text-left group"
                    >
                      <span className="font-serif text-base md:text-lg font-semibold text-dark group-hover:text-brand transition-colors pr-8">
                        {faq.q}
                      </span>
                      <div className={`w-8 h-8 border border-light-gray flex items-center justify-center flex-shrink-0 transition-all duration-300 ${
                        openFaq === i ? 'bg-dark-brown border-dark-brown rotate-180' : 'group-hover:border-brand'
                      }`}>
                        <ChevronDown className={`w-4 h-4 transition-colors ${openFaq === i ? 'text-white' : 'text-dark'}`} />
                      </div>
                    </button>
                    <AnimatePresence>
                      {openFaq === i && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.3 }}
                          className="overflow-hidden"
                        >
                          <p className="text-warm-gray text-sm leading-[1.8] pb-6 pr-12">
                            {faq.a}
                          </p>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Razones para visitarnos */}
      <section className="py-24">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-10">
          <div className="text-center mb-16">
            <span className="text-[11px] font-bold tracking-[0.25em] uppercase text-brand mb-3 block">
              Experiencia en Tienda
            </span>
            <h2 className="font-serif text-3xl md:text-4xl font-bold text-dark mb-4">
              Razones para <span className="italic">Visitarnos</span>
            </h2>
            <p className="text-warm-gray text-sm max-w-xl mx-auto leading-relaxed">
              Nada se compara con la experiencia de ver, tocar y sentir nuestros muebles en persona.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                img: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=600&q=80',
                title: 'Toca los Materiales',
                desc: 'Siente la calidad de nuestras maderas, telas y acabados. Nada se compara con la experiencia táctil de nuestros materiales premium seleccionados a mano.',
              },
              {
                img: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=600&q=80',
                title: 'Ambientes Reales',
                desc: 'Explora nuestros espacios diseñados para inspirarte. Cada zona del showroom recrea un ambiente real donde podrás visualizar cómo lucirán los muebles en tu hogar.',
              },
              {
                img: 'https://images.unsplash.com/photo-1524758631624-e2822e304c36?w=600&q=80',
                title: 'Asesoría Experta',
                desc: 'Nuestros diseñadores te guiarán en cada decisión. Recibe recomendaciones personalizadas basadas en tu estilo de vida, espacio disponible y presupuesto.',
              },
            ].map((item, i) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.15 }}
                className="group"
              >
                <div className="aspect-[4/3] overflow-hidden mb-6">
                  <img
                    src={item.img}
                    alt={item.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                </div>
                <h3 className="font-serif text-xl font-bold text-dark mb-3">{item.title}</h3>
                <p className="text-warm-gray text-sm leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Final */}
      <section className="relative py-24 overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=1920&q=80"
            alt="Interior"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-dark-brown/80" />
        </div>
        <div className="relative z-10 max-w-3xl mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="font-serif text-3xl md:text-5xl font-bold text-white mb-5">
              ¿Listo para Transformar <span className="italic text-brand-light">Tu Espacio</span>?
            </h2>
            <p className="text-white/60 text-sm md:text-base leading-relaxed max-w-xl mx-auto mb-10">
              Agenda una consulta de diseño gratuita con nuestro equipo de expertos.
              Te ayudaremos a crear el hogar de tus sueños, pieza por pieza.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <button
                onClick={goHome}
                className="bg-brand text-white px-10 py-4 text-sm font-semibold tracking-widest uppercase hover:bg-brand-light transition-colors"
              >
                Explorar Colecciones
              </button>
              <button
                onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                className="border border-white/30 text-white px-10 py-4 text-sm font-semibold tracking-widest uppercase hover:bg-white hover:text-dark transition-colors"
              >
                Agendar Consulta
              </button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
