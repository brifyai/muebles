const logos = [
  { name: 'Architectural Digest', letters: 'AD' },
  { name: 'Elle Decoration', letters: 'ELLE DECOR' },
  { name: 'Wallpaper Magazine', letters: 'WALLPAPER*' },
  { name: 'Dezeen', letters: 'DEZEEN' },
  { name: 'Monocle', letters: 'MONOCLE' },
  { name: 'Dwell Magazine', letters: 'DWELL' },
];

export function LogoStrip() {
  return (
    <section className="py-14 bg-white border-b border-light-gray">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-10">
        <p className="text-center text-[10px] font-semibold tracking-[0.35em] uppercase text-warm-gray mb-10">
          Como Se Ha Visto En
        </p>
        <div className="flex flex-wrap justify-center items-center gap-x-14 gap-y-6">
          {logos.map((logo, i) => (
            <span
              key={i}
              className="text-xl md:text-2xl font-serif font-bold text-dark/20 hover:text-dark/60 transition-colors duration-300 cursor-pointer select-none tracking-wider"
            >
              {logo.letters}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
