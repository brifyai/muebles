import { Truck, ShieldCheck, Recycle, Headphones } from 'lucide-react';
import { motion } from 'framer-motion';

const features = [
  {
    icon: Truck,
    title: 'Entrega Gratuita',
    description: 'Entrega e instalación con guante blanco incluida en todos los pedidos superiores a $500. Nosotros nos encargamos del trabajo pesado.',
  },
  {
    icon: ShieldCheck,
    title: 'Garantía de 5 Años',
    description: 'Cada pieza está respaldada por nuestra garantía integral, que cubre la integridad estructural y los defectos de fabricación.',
  },
  {
    icon: Recycle,
    title: 'Materiales Eco-Conscientes',
    description: 'Maderas de origen responsable, acabados al agua y embalaje reciclable — porque el gran diseño debe respetar el planeta.',
  },
  {
    icon: Headphones,
    title: 'Asesoría de Diseño',
    description: 'Nuestro equipo de diseño interno está aquí para ayudarte a elegir las piezas, telas y acabados perfectos para tu espacio.',
  },
];

export function Features() {
  return (
    <section className="py-20 bg-white border-t border-b border-light-gray">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-10">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {features.map((feature, i) => {
            const Icon = feature.icon;
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="text-center group"
              >
                <div className="w-16 h-16 mx-auto mb-5 border border-light-gray flex items-center justify-center group-hover:bg-dark group-hover:border-dark transition-all duration-300">
                  <Icon className="w-6 h-6 text-brand group-hover:text-white transition-colors duration-300" strokeWidth={1.5} />
                </div>
                <h3 className="font-serif text-lg font-bold text-dark mb-2">{feature.title}</h3>
                <p className="text-sm text-warm-gray leading-relaxed">{feature.description}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
