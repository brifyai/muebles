export function MarqueeStrip() {
  const items = [
    'Hecho a Mano con Cariño',
    'Materiales de Origen Sostenible',
    'Envío Gratuito con Guante Blanco',
    'Diseño Ergonómico',
    'Garantía de 5 Años',
    'Fabricado a Medida',
    'Diseñado para Vivir',
    'Calidad Premium',
  ];

  return (
    <div className="bg-dark py-4 overflow-hidden">
      <div className="flex animate-marquee whitespace-nowrap">
        {[...items, ...items, ...items].map((item, i) => (
          <span key={i} className="flex items-center mx-8">
            <span className="w-2 h-2 bg-brand rounded-full mr-8" />
            <span className="text-xs font-semibold tracking-[0.25em] uppercase text-white/70">
              {item}
            </span>
          </span>
        ))}
      </div>
      <style>{`
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-33.333%); }
        }
        .animate-marquee {
          animation: marquee 40s linear infinite;
        }
      `}</style>
    </div>
  );
}
