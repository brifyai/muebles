import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { useNavigation } from '@/context/NavigationContext';

const steps = [
  { num: '01', title: 'Concepto y Diseño', desc: 'Cada pieza comienza como un boceto, refinado a través de innumerables iteraciones hasta que la forma y la función se unen.' },
  { num: '02', title: 'Selección de Materiales', desc: 'Seleccionamos a mano maderas de origen sostenible, cueros y textiles de socios de confianza alrededor del mundo.' },
  { num: '03', title: 'Artesanía Experta', desc: 'Nuestro equipo de más de 50 artesanos especializados da vida a cada diseño utilizando técnicas de ensamblaje y acabado tradicionales.' },
  { num: '04', title: 'Control de Calidad', desc: 'Cada pieza terminada pasa por una inspección rigurosa para asegurar que cumple con nuestros exigentes estándares antes de llegar a tu hogar.' },
];

export function AboutSection() {
  const { navigate } = useNavigation();
  return (
    <section className="py-24 lg:py-32 bg-white" id="about">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-10">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          {/* Imágenes Izquierda */}
          <motion.div
            className="relative"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <div className="grid grid-cols-12 gap-4">
              <div className="col-span-7">
                <img
                  src="https://images.unsplash.com/photo-1631679706909-1844bbd07221?q=80&w=600&auto=format&fit=crop"
                  alt="Taller artesanal"
                  className="w-full h-[450px] object-cover"
                />
              </div>
              <div className="col-span-5 flex flex-col gap-4">
                <img
                  src="https://images.unsplash.com/photo-1555041469-a586c61ea9bc?q=80&w=400&auto=format&fit=crop"
                  alt="Pieza de mobiliario terminada"
                  className="w-full h-[215px] object-cover"
                />
                <div className="bg-brand flex-1 flex flex-col items-center justify-center p-6 text-center">
                  <p className="font-serif text-4xl font-bold text-white">15+</p>
                  <p className="text-[10px] tracking-[0.25em] uppercase text-white/70 mt-1">
                    Años de Maestría
                  </p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Contenido Derecha */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <span className="text-[11px] font-semibold tracking-[0.3em] uppercase text-brand">
              Cómo Trabajamos
            </span>
            <h2 className="font-serif text-4xl md:text-5xl font-bold text-dark mt-3 mb-6 leading-tight">
              Del Boceto a la <span className="italic">Sala de Exposición</span>
            </h2>
            <p className="text-warm-gray text-lg leading-relaxed mb-10">
              Nuestro proceso está guiado por una sola creencia: los muebles deben ser hermosos, funcionales y construidos para resistir el paso del tiempo. Así es como cada pieza cobra vida.
            </p>

            <div className="space-y-6 mb-10">
              {steps.map((step, i) => (
                <motion.div
                  key={step.num}
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.1 }}
                  className="flex gap-5 group"
                >
                  <span className="font-serif text-2xl font-bold text-brand/30 group-hover:text-brand transition-colors min-w-[40px]">
                    {step.num}
                  </span>
                  <div className="border-t border-light-gray pt-3 flex-1">
                    <h4 className="font-semibold text-dark text-[15px] mb-1">{step.title}</h4>
                    <p className="text-sm text-warm-gray">{step.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>

            <button
              onClick={() => navigate({ type: 'showroom' })}
              className="inline-flex items-center gap-3 bg-dark text-white px-8 py-4 text-xs font-semibold tracking-widest uppercase hover:bg-brand transition-colors duration-300 group"
            >
              Descubre Nuestro Taller
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
