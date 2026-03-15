import { useState, useMemo } from 'react';
import {
  Star,
  Heart,
  ShoppingBag,
  ChevronRight,
  Minus,
  Plus,
  Share2,
  Truck,
  ShieldCheck,
  RotateCcw,
  Check,
  ChevronLeft,
  ChevronDown,
  X,
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigation } from '@/context/NavigationContext';
import { useCart } from '@/context/CartContext';
import { allProducts, categories, type Product } from '@/data/products';

type Tab = 'description' | 'additional' | 'reviews';

export function ProductPage({ productSlug }: { productSlug: string }) {
  const { navigate, goHome } = useNavigation();
  const { addToCart } = useCart();
  const product = allProducts.find((p) => p.slug === productSlug);

  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState<Tab>('description');
  const [selectedColor, setSelectedColor] = useState(0);
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [lightbox, setLightbox] = useState(false);
  const [addedToCart, setAddedToCart] = useState(false);

  const category = useMemo(
    () => categories.find((c) => c.slug === product?.category),
    [product]
  );

  const relatedProducts = useMemo(() => {
    if (!product) return [];
    return allProducts
      .filter((p) => p.category === product.category && p.id !== product.id)
      .slice(0, 4);
  }, [product]);

  if (!product) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <p className="text-warm-gray text-lg">Producto no encontrado.</p>
      </div>
    );
  }

  const gallery = product.gallery || [product.image];
  const shortDesc =
    product.shortDescription ||
    'Handcrafted with premium materials and meticulous attention to detail. A timeless piece designed for modern living.';
  const fullDesc =
    product.description ||
    'This exquisite piece exemplifies our commitment to exceptional craftsmanship and thoughtful design. Every detail has been carefully considered to create furniture that is both beautiful and functional.\n\nMade from responsibly sourced materials, each piece is built to last for generations. Our artisans use traditional joinery techniques combined with modern engineering to ensure structural integrity and lasting beauty.';
  const dims = product.dimensions || {
    width: '—',
    height: '—',
    depth: '—',
    weight: '—',
  };
  const sku = product.sku || `EC-${product.id.toString().padStart(3, '0')}`;
  const tags = product.tags || [product.material.toLowerCase(), product.category];
  const colorNames = product.colorNames || product.colors.map((_, i) => `Color ${i + 1}`);

  const handleAddToCart = () => {
    addToCart(
      {
        id: product.id,
        name: product.name,
        price: product.price,
        originalPrice: product.oldPrice,
        image: product.image,
        color: colorNames[selectedColor],
        category: category?.name || '',
      },
      quantity
    );
    setAddedToCart(true);
    setTimeout(() => setAddedToCart(false), 2500);
  };

  const prevImage = () =>
    setSelectedImage((p) => (p - 1 + gallery.length) % gallery.length);
  const nextImage = () =>
    setSelectedImage((p) => (p + 1) % gallery.length);

  return (
    <section className="bg-white">
      {/* Breadcrumbs */}
      <div className="bg-cream/50 border-b border-light-gray">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-10 py-4">
          <nav className="flex items-center gap-2 text-xs tracking-wider uppercase text-warm-gray flex-wrap">
            <button onClick={goHome} className="hover:text-brand transition-colors">
              Home
            </button>
            <ChevronRight className="w-3 h-3 flex-shrink-0" />
            <button onClick={goHome} className="hover:text-brand transition-colors">
              Shop
            </button>
            <ChevronRight className="w-3 h-3 flex-shrink-0" />
            {category && (
              <>
                <button
                  onClick={() =>
                    navigate({
                      type: 'category',
                      slug: category.slug,
                      name: category.name,
                    })
                  }
                  className="hover:text-brand transition-colors"
                >
                  {category.name}
                </button>
                <ChevronRight className="w-3 h-3 flex-shrink-0" />
              </>
            )}
            <span className="text-dark font-medium">{product.name}</span>
          </nav>
        </div>
      </div>

      {/* Product Section */}
      <div className="max-w-[1400px] mx-auto px-6 lg:px-10 py-10 lg:py-16">
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-16">
          {/* Left: Image Gallery */}
          <div className="flex gap-4">
            {/* Thumbnails */}
            <div className="hidden md:flex flex-col gap-3 flex-shrink-0">
              {gallery.map((img, i) => (
                <button
                  key={i}
                  onClick={() => setSelectedImage(i)}
                  className={`w-20 h-20 border-2 overflow-hidden transition-all flex-shrink-0 ${
                    selectedImage === i
                      ? 'border-brand'
                      : 'border-light-gray hover:border-warm-gray'
                  }`}
                >
                  <img
                    src={img}
                    alt={`${product.name} view ${i + 1}`}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>

            {/* Main Image */}
            <div className="flex-1 relative group">
              <div
                className="relative aspect-[3/4] md:aspect-[4/5] overflow-hidden bg-cream/30 cursor-zoom-in"
                onClick={() => setLightbox(true)}
              >
                <AnimatePresence mode="wait">
                  <motion.img
                    key={selectedImage}
                    src={gallery[selectedImage]}
                    alt={product.name}
                    className="w-full h-full object-cover"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                  />
                </AnimatePresence>

                {/* Badge */}
                {product.badge && (
                  <span
                    className={`absolute top-5 left-5 text-[10px] font-bold tracking-widest uppercase px-4 py-2 ${
                      product.badge === 'Sale'
                        ? 'bg-red-600 text-white'
                        : product.badge === 'New'
                        ? 'bg-brand text-white'
                        : 'bg-dark text-white'
                    }`}
                  >
                    {product.badge}
                  </span>
                )}

                {/* Nav arrows */}
                {gallery.length > 1 && (
                  <>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        prevImage();
                      }}
                      className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/80 backdrop-blur-sm flex items-center justify-center text-dark hover:bg-white transition-all opacity-0 group-hover:opacity-100"
                    >
                      <ChevronLeft className="w-5 h-5" />
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        nextImage();
                      }}
                      className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/80 backdrop-blur-sm flex items-center justify-center text-dark hover:bg-white transition-all opacity-0 group-hover:opacity-100"
                    >
                      <ChevronRight className="w-5 h-5" />
                    </button>
                  </>
                )}

                {/* Image counter */}
                <div className="absolute bottom-4 right-4 bg-white/80 backdrop-blur-sm px-3 py-1.5 text-[11px] font-medium text-dark tracking-wider">
                  {selectedImage + 1} / {gallery.length}
                </div>
              </div>

              {/* Mobile thumbnails */}
              <div className="flex md:hidden gap-2 mt-3 overflow-x-auto pb-2">
                {gallery.map((img, i) => (
                  <button
                    key={i}
                    onClick={() => setSelectedImage(i)}
                    className={`w-16 h-16 border-2 overflow-hidden flex-shrink-0 transition-all ${
                      selectedImage === i
                        ? 'border-brand'
                        : 'border-light-gray'
                    }`}
                  >
                    <img
                      src={img}
                      alt={`View ${i + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Right: Product Info */}
          <div className="lg:pt-4">
            {/* Category */}
            {category && (
              <button
                onClick={() =>
                  navigate({
                    type: 'category',
                    slug: category.slug,
                    name: category.name,
                  })
                }
                className="text-[11px] font-semibold tracking-[0.3em] uppercase text-brand hover:text-brand-dark transition-colors mb-3 inline-block"
              >
                {category.name}
              </button>
            )}

            {/* Title */}
            <h1 className="font-serif text-3xl md:text-4xl lg:text-[42px] font-bold text-dark leading-tight mb-4">
              {product.name}
            </h1>

            {/* Rating */}
            <div className="flex items-center gap-3 mb-6">
              <div className="flex gap-0.5">
                {[...Array(5)].map((_, j) => (
                  <Star
                    key={j}
                    className={`w-4 h-4 ${
                      j < Math.floor(product.rating)
                        ? 'text-brand fill-brand'
                        : j < product.rating
                        ? 'text-brand fill-brand/50'
                        : 'text-light-gray fill-light-gray'
                    }`}
                  />
                ))}
              </div>
              <span className="text-sm text-warm-gray">
                {product.rating} ({product.reviews} reseñas)
              </span>
            </div>

            {/* Price */}
            <div className="flex items-baseline gap-4 mb-6 pb-6 border-b border-light-gray">
              <span className="text-3xl font-bold text-dark">
                ${product.price.toLocaleString()}
              </span>
              {product.oldPrice && (
                <>
                  <span className="text-xl text-warm-gray line-through">
                    ${product.oldPrice.toLocaleString()}
                  </span>
                  <span className="text-sm font-semibold text-red-600 bg-red-50 px-2.5 py-1 tracking-wide">
                    AHORRA ${(product.oldPrice - product.price).toLocaleString()}
                  </span>
                </>
              )}
            </div>

            {/* Short Description */}
            <p className="text-warm-gray leading-relaxed mb-8">{shortDesc}</p>

            {/* Color Selector */}
            <div className="mb-8">
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-bold tracking-[0.2em] uppercase text-dark">
                  Color
                </span>
                <span className="text-sm text-warm-gray">
                  {colorNames[selectedColor]}
                </span>
              </div>
              <div className="flex gap-3">
                {product.colors.map((color, i) => (
                  <button
                    key={i}
                    onClick={() => setSelectedColor(i)}
                    className={`w-10 h-10 rounded-full border-2 transition-all relative ${
                      selectedColor === i
                        ? 'border-brand ring-2 ring-brand/20 scale-110'
                        : 'border-light-gray hover:border-warm-gray'
                    }`}
                    style={{ backgroundColor: color }}
                    title={colorNames[i]}
                  >
                    {selectedColor === i && (
                      <Check
                        className={`absolute inset-0 m-auto w-4 h-4 ${
                          color === '#1A1A1A' || color === '#2C2418' || color === '#4A4A4A' || color === '#556B2F'
                            ? 'text-white'
                            : 'text-dark'
                        }`}
                        strokeWidth={3}
                      />
                    )}
                  </button>
                ))}
              </div>
            </div>

            {/* Quantity & Add to Cart */}
            <div className="flex items-stretch gap-4 mb-6">
              {/* Quantity */}
              <div className="flex items-center border border-light-gray">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="w-12 h-full flex items-center justify-center text-dark hover:bg-cream transition-colors"
                >
                  <Minus className="w-4 h-4" />
                </button>
                <span className="w-12 text-center text-sm font-semibold text-dark select-none">
                  {quantity}
                </span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="w-12 h-full flex items-center justify-center text-dark hover:bg-cream transition-colors"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>

              {/* Add to Cart */}
              <button
                onClick={handleAddToCart}
                className={`flex-1 flex items-center justify-center gap-3 py-4 text-xs font-bold tracking-[0.2em] uppercase transition-all duration-300 ${
                  addedToCart
                    ? 'bg-green-600 text-white'
                    : 'bg-dark text-white hover:bg-brand'
                }`}
              >
                {addedToCart ? (
                  <>
                    <Check className="w-5 h-5" />
                    Añadido al Carrito
                  </>
                ) : (
                  <>
                    <ShoppingBag className="w-5 h-5" strokeWidth={1.5} />
                    Añadir al Carrito
                  </>
                )}
              </button>

              {/* Wishlist */}
              <button
                onClick={() => setIsWishlisted(!isWishlisted)}
                className={`w-14 flex items-center justify-center border transition-all ${
                  isWishlisted
                    ? 'bg-red-50 border-red-200 text-red-500'
                    : 'border-light-gray text-dark hover:text-red-500 hover:border-red-200'
                }`}
              >
                <Heart
                  className="w-5 h-5"
                  strokeWidth={1.5}
                  fill={isWishlisted ? 'currentColor' : 'none'}
                />
              </button>
            </div>

            {/* Comprar Ahora */}
            <button
              onClick={() => {
                handleAddToCart();
                navigate({ type: 'checkout' });
              }}
              className="w-full py-4 border-2 border-brand text-brand text-xs font-bold tracking-[0.2em] uppercase hover:bg-brand hover:text-white transition-all duration-300 mb-8"
            >
              Comprar Ahora
            </button>

            {/* Trust badges */}
            <div className="grid grid-cols-3 gap-4 mb-8 pb-8 border-b border-light-gray">
              <div className="flex flex-col items-center text-center gap-2 py-3">
                <Truck className="w-5 h-5 text-brand" strokeWidth={1.5} />
                <span className="text-[10px] font-semibold tracking-wider uppercase text-dark">
                  Envío Gratis
                </span>
              </div>
              <div className="flex flex-col items-center text-center gap-2 py-3">
                <ShieldCheck className="w-5 h-5 text-brand" strokeWidth={1.5} />
                <span className="text-[10px] font-semibold tracking-wider uppercase text-dark">
                  Garantía 5 Años
                </span>
              </div>
              <div className="flex flex-col items-center text-center gap-2 py-3">
                <RotateCcw className="w-5 h-5 text-brand" strokeWidth={1.5} />
                <span className="text-[10px] font-semibold tracking-wider uppercase text-dark">
                  Devolución 30 Días
                </span>
              </div>
            </div>

            {/* Meta */}
            <div className="space-y-3 text-sm">
              <div className="flex items-start gap-3">
                <span className="text-xs font-bold tracking-[0.15em] uppercase text-dark w-24 flex-shrink-0 pt-0.5">
                  SKU
                </span>
                <span className="text-warm-gray">{sku}</span>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-xs font-bold tracking-[0.15em] uppercase text-dark w-24 flex-shrink-0 pt-0.5">
                  Categoría
                </span>
                {category && (
                  <button
                    onClick={() =>
                      navigate({
                        type: 'category',
                        slug: category.slug,
                        name: category.name,
                      })
                    }
                    className="text-warm-gray hover:text-brand transition-colors"
                  >
                    {category.name}
                  </button>
                )}
              </div>
              <div className="flex items-start gap-3">
                <span className="text-xs font-bold tracking-[0.15em] uppercase text-dark w-24 flex-shrink-0 pt-0.5">
                  Material
                </span>
                <span className="text-warm-gray">{product.material}</span>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-xs font-bold tracking-[0.15em] uppercase text-dark w-24 flex-shrink-0 pt-0.5">
                  Etiquetas
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-[11px] text-warm-gray bg-cream px-2.5 py-1 tracking-wide"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
              <div className="flex items-center gap-3 pt-2">
                <span className="text-xs font-bold tracking-[0.15em] uppercase text-dark w-24 flex-shrink-0">
                  Compartir
                </span>
                <div className="flex items-center gap-3">
                  {[
                    { label: 'Fb', url: 'https://www.facebook.com/sharer/sharer.php?u=' + encodeURIComponent(window.location.href) },
                    { label: 'Tw', url: 'https://twitter.com/intent/tweet?url=' + encodeURIComponent(window.location.href) + '&text=' + encodeURIComponent(product.name) },
                    { label: 'Pi', url: 'https://pinterest.com/pin/create/button/?url=' + encodeURIComponent(window.location.href) },
                    { label: 'Li', url: 'https://www.linkedin.com/sharing/share-offsite/?url=' + encodeURIComponent(window.location.href) },
                  ].map((s) => (
                    <a
                      key={s.label}
                      href={s.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-8 h-8 border border-light-gray flex items-center justify-center text-[10px] font-bold text-warm-gray hover:bg-dark hover:text-white hover:border-dark transition-all"
                    >
                      {s.label}
                    </a>
                  ))}
                  <button
                    onClick={() => { navigator.clipboard.writeText(window.location.href); }}
                    className="w-8 h-8 border border-light-gray flex items-center justify-center text-warm-gray hover:bg-dark hover:text-white hover:border-dark transition-all"
                    title="Copiar enlace"
                  >
                    <Share2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs Section */}
      <div className="border-t border-light-gray">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-10">
          {/* Tab Headers */}
          <div className="flex border-b border-light-gray">
            {[
              { key: 'description' as Tab, label: 'Descripción' },
              { key: 'additional' as Tab, label: 'Información Adicional' },
              { key: 'reviews' as Tab, label: `Reseñas (${product.reviews})` },
            ].map((tab) => (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key)}
                className={`relative px-6 lg:px-10 py-5 text-xs font-bold tracking-[0.2em] uppercase transition-colors ${
                  activeTab === tab.key
                    ? 'text-brand'
                    : 'text-warm-gray hover:text-dark'
                }`}
              >
                {tab.label}
                {activeTab === tab.key && (
                  <motion.div
                    layoutId="tabIndicator"
                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-brand"
                  />
                )}
              </button>
            ))}
          </div>

          {/* Tab Content */}
          <div className="py-12 lg:py-16">
            <AnimatePresence mode="wait">
              {activeTab === 'description' && (
                <motion.div
                  key="description"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="grid lg:grid-cols-2 gap-12 lg:gap-20">
                    <div>
                      <h3 className="font-serif text-2xl lg:text-3xl font-bold text-dark mb-6">
                        Detalles del <span className="italic">Producto</span>
                      </h3>
                      {fullDesc.split('\n\n').map((para, i) => (
                        <p
                          key={i}
                          className="text-warm-gray leading-relaxed mb-4 last:mb-0"
                        >
                          {para}
                        </p>
                      ))}
                    </div>
                    <div>
                      <img
                        src={gallery[gallery.length > 1 ? 1 : 0]}
                        alt="Product detail"
                        className="w-full h-[400px] object-cover"
                      />
                      <div className="grid grid-cols-2 gap-6 mt-8">
                        <div className="border-t-2 border-brand pt-4">
                          <p className="font-serif text-2xl font-bold text-dark">
                            100%
                          </p>
                          <p className="text-xs tracking-widest uppercase text-warm-gray mt-1">
                            Materiales Naturales
                          </p>
                        </div>
                        <div className="border-t-2 border-brand pt-4">
                          <p className="font-serif text-2xl font-bold text-dark">
                            Hecho para Durar
                          </p>
                          <p className="text-xs tracking-widest uppercase text-warm-gray mt-1">
                            Calidad Generacional
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}

              {activeTab === 'additional' && (
                <motion.div
                  key="additional"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="max-w-2xl">
                    <h3 className="font-serif text-2xl lg:text-3xl font-bold text-dark mb-8">
                      Especificaciones
                    </h3>
                    <table className="w-full">
                      <tbody>
                        {[
                          { label: 'Ancho', value: dims.width },
                          { label: 'Alto', value: dims.height },
                          { label: 'Profundidad', value: dims.depth },
                          { label: 'Peso', value: dims.weight },
                          { label: 'Material', value: product.material },
                          {
                            label: 'Colores Disponibles',
                            value: colorNames.join(', '),
                          },
                          {
                            label: 'Disponibilidad',
                            value: product.inStock
                              ? 'En Stock'
                              : 'Bajo Pedido (4-6 semanas)',
                          },
                          { label: 'SKU', value: sku },
                          {
                            label: 'Cuidado',
                            value: 'Se recomienda limpieza profesional',
                          },
                          {
                            label: 'Ensamblaje',
                            value: 'Requiere ensamblaje mínimo',
                          },
                        ].map((row, i) => (
                          <tr
                            key={row.label}
                            className={
                              i % 2 === 0 ? 'bg-cream/50' : 'bg-white'
                            }
                          >
                            <td className="py-4 px-6 text-xs font-bold tracking-[0.15em] uppercase text-dark w-48">
                              {row.label}
                            </td>
                            <td className="py-4 px-6 text-sm text-warm-gray">
                              {row.value}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </motion.div>
              )}

              {activeTab === 'reviews' && (
                <motion.div
                  key="reviews"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.3 }}
                >
                  <ReviewsSection product={product} />
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>

      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <div className="border-t border-light-gray bg-cream/30">
          <div className="max-w-[1400px] mx-auto px-6 lg:px-10 py-16 lg:py-24">
            <div className="text-center mb-12">
              <span className="text-[11px] font-semibold tracking-[0.3em] uppercase text-brand">
                You May Also Like
              </span>
              <h2 className="font-serif text-3xl md:text-4xl font-bold text-dark mt-3">
                Related <span className="italic">Products</span>
              </h2>
            </div>

            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
              {relatedProducts.map((rp, i) => (
                <RelatedCard key={rp.id} product={rp} index={i} />
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Lightbox */}
      <AnimatePresence>
        {lightbox && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/90 z-[100] flex items-center justify-center"
            onClick={() => setLightbox(false)}
          >
            <button
              onClick={() => setLightbox(false)}
              className="absolute top-6 right-6 w-12 h-12 bg-white/10 flex items-center justify-center text-white hover:bg-white/20 transition-colors"
            >
              <X className="w-6 h-6" />
            </button>

            <button
              onClick={(e) => {
                e.stopPropagation();
                prevImage();
              }}
              className="absolute left-6 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/10 flex items-center justify-center text-white hover:bg-white/20 transition-colors"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                nextImage();
              }}
              className="absolute right-6 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/10 flex items-center justify-center text-white hover:bg-white/20 transition-colors"
            >
              <ChevronRight className="w-6 h-6" />
            </button>

            <img
              src={gallery[selectedImage]}
              alt={product.name}
              className="max-w-[85vw] max-h-[85vh] object-contain"
              onClick={(e) => e.stopPropagation()}
            />

            {/* Lightbox thumbnails */}
            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2">
              {gallery.map((img, i) => (
                <button
                  key={i}
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelectedImage(i);
                  }}
                  className={`w-14 h-14 border-2 overflow-hidden transition-all ${
                    selectedImage === i
                      ? 'border-white opacity-100'
                      : 'border-transparent opacity-50 hover:opacity-80'
                  }`}
                >
                  <img
                    src={img}
                    alt={`Thumb ${i + 1}`}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

/* Reviews Section Component */
function ReviewsSection({ product }: { product: Product }) {
  const [showForm, setShowForm] = useState(false);

  const fakeReviews = [
    {
      id: 1,
      name: 'Sarah M.',
      date: 'December 15, 2024',
      rating: 5,
      title: 'Absolutely stunning piece',
      content: `The ${product.name} exceeded all my expectations. The craftsmanship is impeccable and it looks even better in person than in the photos. Delivery was smooth and the white-glove service was a nice touch.`,
      verified: true,
    },
    {
      id: 2,
      name: 'James K.',
      date: 'November 28, 2024',
      rating: 5,
      title: 'Worth every penny',
      content:
        'We searched for months to find the perfect piece and this was it. The quality of materials is evident the moment you see it. Our guests always compliment it.',
      verified: true,
    },
    {
      id: 3,
      name: 'Elena R.',
      date: 'November 10, 2024',
      rating: 4,
      title: 'Beautiful design, minor note',
      content:
        'The design and quality are fantastic. Only reason for 4 stars is that the delivery took a bit longer than expected, but the product itself is perfect.',
      verified: true,
    },
  ];

  const avgRating = product.rating;

  return (
    <div>
      <div className="grid lg:grid-cols-3 gap-12">
        {/* Rating Summary */}
        <div className="lg:col-span-1">
          <div className="bg-cream/50 p-8 text-center">
            <p className="font-serif text-6xl font-bold text-dark">
              {avgRating.toFixed(1)}
            </p>
            <div className="flex justify-center gap-1 mt-3 mb-2">
              {[...Array(5)].map((_, j) => (
                <Star
                  key={j}
                  className={`w-5 h-5 ${
                    j < Math.floor(avgRating)
                      ? 'text-brand fill-brand'
                      : 'text-light-gray fill-light-gray'
                  }`}
                />
              ))}
            </div>
            <p className="text-sm text-warm-gray mb-6">
              Based on {product.reviews} reviews
            </p>

            {/* Rating bars */}
            <div className="space-y-2 text-left">
              {[5, 4, 3, 2, 1].map((stars) => {
                const pct =
                  stars === 5 ? 78 : stars === 4 ? 16 : stars === 3 ? 4 : stars === 2 ? 1 : 1;
                return (
                  <div key={stars} className="flex items-center gap-3">
                    <span className="text-xs font-semibold text-dark w-3">
                      {stars}
                    </span>
                    <Star className="w-3 h-3 text-brand fill-brand" />
                    <div className="flex-1 h-2 bg-light-gray overflow-hidden">
                      <div
                        className="h-full bg-brand transition-all"
                        style={{ width: `${pct}%` }}
                      />
                    </div>
                    <span className="text-[11px] text-warm-gray w-8 text-right">
                      {pct}%
                    </span>
                  </div>
                );
              })}
            </div>

            <button
              onClick={() => setShowForm(!showForm)}
              className="w-full mt-8 py-3.5 bg-dark text-white text-xs font-bold tracking-[0.2em] uppercase hover:bg-brand transition-colors"
            >
              Write a Review
            </button>
          </div>
        </div>

        {/* Reviews List */}
        <div className="lg:col-span-2">
          <div className="flex items-center justify-between mb-8">
            <h3 className="font-serif text-2xl font-bold text-dark">
              Customer Reviews
            </h3>
            <div className="relative">
              <select className="appearance-none bg-white border border-light-gray pl-4 pr-10 py-2.5 text-xs font-medium tracking-wider uppercase text-dark cursor-pointer focus:outline-none focus:border-brand">
                <option>Most Recent</option>
                <option>Highest Rated</option>
                <option>Lowest Rated</option>
              </select>
              <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-warm-gray pointer-events-none" />
            </div>
          </div>

          {/* Review Form */}
          <AnimatePresence>
            {showForm && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                className="overflow-hidden mb-8"
              >
                <div className="bg-cream/50 p-8 border border-light-gray">
                  <h4 className="font-serif text-xl font-bold text-dark mb-6">
                    Write Your Review
                  </h4>
                  <div className="space-y-5">
                    <div className="grid md:grid-cols-2 gap-5">
                      <input
                        type="text"
                        placeholder="Your Name"
                        className="w-full bg-white border border-light-gray px-5 py-3.5 text-sm text-dark placeholder:text-warm-gray focus:outline-none focus:border-brand transition-colors"
                      />
                      <input
                        type="email"
                        placeholder="Your Email"
                        className="w-full bg-white border border-light-gray px-5 py-3.5 text-sm text-dark placeholder:text-warm-gray focus:outline-none focus:border-brand transition-colors"
                      />
                    </div>
                    <input
                      type="text"
                      placeholder="Review Title"
                      className="w-full bg-white border border-light-gray px-5 py-3.5 text-sm text-dark placeholder:text-warm-gray focus:outline-none focus:border-brand transition-colors"
                    />
                    <div>
                      <p className="text-xs font-bold tracking-[0.15em] uppercase text-dark mb-2">
                        Your Rating
                      </p>
                      <div className="flex gap-1">
                        {[1, 2, 3, 4, 5].map((s) => (
                          <button key={s}>
                            <Star className="w-6 h-6 text-light-gray hover:text-brand hover:fill-brand transition-colors" />
                          </button>
                        ))}
                      </div>
                    </div>
                    <textarea
                      rows={4}
                      placeholder="Write your review..."
                      className="w-full bg-white border border-light-gray px-5 py-3.5 text-sm text-dark placeholder:text-warm-gray focus:outline-none focus:border-brand transition-colors resize-none"
                    />
                    <button className="bg-dark text-white px-10 py-3.5 text-xs font-bold tracking-[0.2em] uppercase hover:bg-brand transition-colors">
                      Submit Review
                    </button>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Individual Reviews */}
          <div className="divide-y divide-light-gray">
            {fakeReviews.map((review) => (
              <div key={review.id} className="py-8 first:pt-0">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <div className="flex gap-0.5 mb-2">
                      {[...Array(5)].map((_, j) => (
                        <Star
                          key={j}
                          className={`w-4 h-4 ${
                            j < review.rating
                              ? 'text-brand fill-brand'
                              : 'text-light-gray fill-light-gray'
                          }`}
                        />
                      ))}
                    </div>
                    <h4 className="font-semibold text-dark text-[15px]">
                      {review.title}
                    </h4>
                  </div>
                  <span className="text-xs text-warm-gray flex-shrink-0 ml-4">
                    {review.date}
                  </span>
                </div>
                <p className="text-warm-gray text-sm leading-relaxed mb-3">
                  {review.content}
                </p>
                <div className="flex items-center gap-3">
                  <span className="text-sm font-semibold text-dark">
                    {review.name}
                  </span>
                  {review.verified && (
                    <span className="flex items-center gap-1 text-[10px] font-semibold tracking-wider uppercase text-green-600">
                      <Check className="w-3 h-3" /> Verified Purchase
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

/* Related Product Card */
function RelatedCard({ product, index }: { product: Product; index: number }) {
  const { navigate } = useNavigation();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.08 }}
      className="group cursor-pointer"
      onClick={() =>
        navigate({ type: 'product', slug: product.slug })
      }
    >
      <div className="relative aspect-[3/4] overflow-hidden bg-cream/30 mb-4">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
        {product.badge && (
          <span
            className={`absolute top-3 left-3 text-[9px] font-bold tracking-widest uppercase px-3 py-1.5 ${
              product.badge === 'Sale'
                ? 'bg-red-600 text-white'
                : product.badge === 'New'
                ? 'bg-brand text-white'
                : 'bg-dark text-white'
            }`}
          >
            {product.badge}
          </span>
        )}
        <div className="absolute bottom-0 left-0 right-0 p-3 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
          <button className="w-full bg-dark/90 backdrop-blur-sm text-white py-3 text-[10px] font-semibold tracking-widest uppercase hover:bg-brand transition-colors">
            Quick View
          </button>
        </div>
      </div>
      <div className="flex items-center gap-1 mb-1.5">
        {[...Array(5)].map((_, j) => (
          <Star
            key={j}
            className={`w-3 h-3 ${
              j < Math.floor(product.rating)
                ? 'text-brand fill-brand'
                : 'text-light-gray fill-light-gray'
            }`}
          />
        ))}
        <span className="text-[10px] text-warm-gray ml-1">
          ({product.reviews})
        </span>
      </div>
      <h3 className="font-semibold text-dark text-sm mb-1.5 group-hover:text-brand transition-colors leading-snug">
        {product.name}
      </h3>
      <div className="flex items-center gap-2">
        <span className="font-bold text-dark">
          ${product.price.toLocaleString()}
        </span>
        {product.oldPrice && (
          <span className="text-sm text-warm-gray line-through">
            ${product.oldPrice.toLocaleString()}
          </span>
        )}
      </div>
    </motion.div>
  );
}
