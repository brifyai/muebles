import { Star, Heart, ShoppingBag, ArrowRight } from 'lucide-react';
import { useState } from 'react';
import { motion } from 'framer-motion';
import { allProducts } from '@/data/products';
import { useNavigation } from '@/context/NavigationContext';
import { useCart } from '@/context/CartContext';

const tabs = ['Todos', 'Sillas', 'Sofás', 'Mesas', 'Iluminación'];

const categoryMap: Record<string, string[]> = {
  Sillas: ['chairs-living-room', 'chairs-office', 'chairs-dining'],
  Sofás: ['sofas-living-room'],
  Mesas: ['tables-living-room', 'tables-dining', 'desks-office'],
  Iluminación: ['lighting-living-room'],
};

export function ProductGrid() {
  const [activeTab, setActiveTab] = useState('Todos');
  const { navigate } = useNavigation();
  const { addToCart } = useCart();

  const featured = allProducts.filter(p =>
    p.badge || p.rating >= 4.8
  ).slice(0, 8);

  const filtered = activeTab === 'Todos'
    ? featured
    : featured.filter(p => categoryMap[activeTab]?.includes(p.subcategory));

  return (
    <section className="py-24 lg:py-32 bg-cream" id="shop">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-10">
        {/* Encabezado */}
        <div className="text-center mb-14">
          <span className="text-[11px] font-semibold tracking-[0.3em] uppercase text-brand">
            Nuestros Más Vendidos
          </span>
          <h2 className="font-serif text-4xl md:text-5xl font-bold text-dark mt-3">
            Las Piezas Más <span className="italic">Queridas</span>
          </h2>
          <p className="mt-4 text-warm-gray text-lg max-w-xl mx-auto">
            Explora nuestras creaciones más populares — cada una diseñada, perfeccionada y construida a mano en nuestro taller.
          </p>
        </div>

        {/* Pestañas */}
        <div className="flex flex-wrap justify-center gap-2 mb-14">
          {tabs.map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-6 py-2.5 text-xs font-semibold tracking-widest uppercase transition-all duration-300 ${
                activeTab === tab
                  ? 'bg-dark text-white'
                  : 'bg-white text-dark hover:bg-dark hover:text-white'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Productos */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {filtered.map((product, i) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.05 }}
              className="group bg-white"
            >
              {/* Imagen */}
              <div
                className="relative aspect-[3/4] overflow-hidden cursor-pointer"
                onClick={() => navigate({ type: 'product', slug: product.slug })}
              >
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                {product.badge && (
                  <span className={`absolute top-4 left-4 text-[10px] font-bold tracking-widest uppercase px-3 py-1.5 ${
                    product.badge === 'Oferta' ? 'bg-red-600 text-white' :
                    product.badge === 'Nuevo' ? 'bg-brand text-white' :
                    'bg-dark text-white'
                  }`}>
                    {product.badge}
                  </span>
                )}
                <button className="absolute top-4 right-4 w-9 h-9 bg-white/80 backdrop-blur-sm flex items-center justify-center text-dark hover:text-red-500 transition-colors opacity-0 group-hover:opacity-100">
                  <Heart className="w-4 h-4" strokeWidth={1.5} />
                </button>
                <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      addToCart({
                        id: product.id,
                        name: product.name,
                        price: product.price,
                        originalPrice: product.oldPrice,
                        image: product.image,
                        color: product.colorNames?.[0] || 'Natural',
                        category: product.category,
                      });
                    }}
                    className="w-full bg-dark/90 backdrop-blur-sm text-white py-3.5 text-xs font-semibold tracking-widest uppercase flex items-center justify-center gap-2 hover:bg-brand transition-colors"
                  >
                    <ShoppingBag className="w-4 h-4" strokeWidth={1.5} />
                    Añadir al Carrito
                  </button>
                </div>
              </div>

              {/* Info */}
              <div className="p-5">
                <div className="flex items-center gap-1 mb-2">
                  {[...Array(5)].map((_, j) => (
                    <Star
                      key={j}
                      className={`w-3 h-3 ${j < Math.floor(product.rating) ? 'text-brand fill-brand' : 'text-light-gray fill-light-gray'}`}
                    />
                  ))}
                  <span className="text-[11px] text-warm-gray ml-1">({product.reviews})</span>
                </div>
                <h3
                  className="font-semibold text-dark text-[15px] mb-2 group-hover:text-brand transition-colors cursor-pointer"
                  onClick={() => navigate({ type: 'product', slug: product.slug })}
                >
                  {product.name}
                </h3>
                <div className="flex items-center gap-3">
                  <span className="text-lg font-bold text-dark">${product.price.toLocaleString()}</span>
                  {product.oldPrice && (
                    <span className="text-sm text-warm-gray line-through">${product.oldPrice.toLocaleString()}</span>
                  )}
                </div>
                {/* Muestras de color */}
                <div className="flex items-center gap-1.5 mt-3">
                  {product.colors.map((color, ci) => (
                    <span
                      key={ci}
                      className="w-4 h-4 rounded-full border border-light-gray cursor-pointer hover:scale-125 transition-transform"
                      style={{ backgroundColor: color }}
                    />
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center mt-16">
          <button
            onClick={() => navigate({ type: 'category', slug: 'living-room', name: 'Sala de Estar' })}
            className="inline-flex items-center gap-3 border-2 border-dark px-10 py-4 text-xs font-semibold tracking-widest uppercase text-dark hover:bg-dark hover:text-white transition-all duration-300 group"
          >
            Ver Todos los Productos
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </div>
    </section>
  );
}
