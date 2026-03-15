import { ArrowRight, Check } from 'lucide-react';
import { useState } from 'react';
import { motion } from 'framer-motion';

export function Newsletter() {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      setSubscribed(true);
      setTimeout(() => { setSubscribed(false); setEmail(''); }, 3000);
    }
  };
  return (
    <section className="relative py-28 lg:py-36 overflow-hidden">
      {/* Imagen de Fondo */}
      <div className="absolute inset-0">
        <img
          src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=2000&auto=format&fit=crop"
          alt="Fondo de interior"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-dark/75" />
      </div>

      <div className="relative z-10 max-w-[700px] mx-auto px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <span className="text-[11px] font-semibold tracking-[0.3em] uppercase text-brand-light">
            Mantente al Día
          </span>
          <h2 className="font-serif text-4xl md:text-5xl font-bold text-white mt-4 mb-5">
            Únete a la Comunidad <span className="italic text-brand-light">ErgoCraft</span>
          </h2>
          <p className="text-white/60 text-lg mb-10 leading-relaxed">
            Sé el primero en conocer nuevas colecciones, ofertas exclusivas e inspiración de diseño directamente en tu bandeja de entrada.
          </p>

          <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-3 max-w-lg mx-auto">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Tu correo electrónico"
              className="flex-1 bg-white/10 border border-white/20 text-white placeholder:text-white/40 px-6 py-4 text-sm tracking-wide focus:outline-none focus:border-brand-light transition-colors"
              required
            />
            <button
              type="submit"
              className={`px-8 py-4 text-xs font-semibold tracking-widest uppercase transition-colors duration-300 flex items-center justify-center gap-2 group ${subscribed ? 'bg-green-600 text-white' : 'bg-brand hover:bg-brand-light text-white'}`}
            >
              {subscribed ? (<><Check className="w-4 h-4" /> ¡Suscrito!</>) : (<>Suscribirse <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" /></>)}
            </button>
          </form>

          <p className="text-xs text-white/30 mt-5 tracking-wide">
            Sin spam, nunca. Cancela cuando quieras. Lee nuestra Política de Privacidad.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
