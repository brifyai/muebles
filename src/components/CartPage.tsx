import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ChevronRight,
  Minus,
  Plus,
  X,
  Truck,
  ShieldCheck,
  RotateCcw,
  Tag,
  Lock,
  ArrowRight,
  ShoppingBag,
  Gift,
  ChevronDown,
  ChevronUp,
  Info,
  Percent,
} from 'lucide-react';
import { useNavigation } from '../context/NavigationContext';
import { useCart } from '../context/CartContext';

export default function CartPage() {
  const { goHome, navigate } = useNavigation();
  const {
    items,
    removeFromCart,
    updateQuantity,
    clearCart,
    getSubtotal,
    getItemCount,
  } = useCart();

  const [couponCode, setCouponCode] = useState('');
  const [couponApplied, setCouponApplied] = useState(false);
  const [couponDiscount, setCouponDiscount] = useState(0);
  const [showCoupon, setShowCoupon] = useState(false);
  const [giftWrap, setGiftWrap] = useState(false);
  const [giftMessage, setGiftMessage] = useState('');
  const [showGift, setShowGift] = useState(false);
  const [removingItem, setRemovingItem] = useState<string | null>(null);
  const [shippingMethod, setShippingMethod] = useState<'free' | 'express' | 'premium'>('free');

  const subtotal = getSubtotal();
  const shippingCost = shippingMethod === 'free' ? 0 : shippingMethod === 'express' ? 89 : 149;
  const giftWrapCost = giftWrap ? 25 : 0;
  const discount = couponDiscount;
  const total = subtotal + shippingCost + giftWrapCost - discount;
  const savings = items.reduce((sum, item) => {
    if (item.originalPrice) {
      return sum + (item.originalPrice - item.price) * item.quantity;
    }
    return sum;
  }, 0);

  const freeShippingThreshold = 500;
  const freeShippingProgress = Math.min((subtotal / freeShippingThreshold) * 100, 100);
  const amountToFreeShipping = Math.max(freeShippingThreshold - subtotal, 0);

  const handleApplyCoupon = () => {
    if (couponCode.toUpperCase() === 'ERGO10') {
      setCouponApplied(true);
      setCouponDiscount(Math.round(subtotal * 0.1));
    } else if (couponCode.toUpperCase() === 'WELCOME') {
      setCouponApplied(true);
      setCouponDiscount(50);
    }
  };

  const handleRemove = (id: number, color: string) => {
    setRemovingItem(`${id}-${color}`);
    setTimeout(() => {
      removeFromCart(id, color);
      setRemovingItem(null);
    }, 300);
  };

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-[#FAF6EF] pt-32">
        <div className="max-w-4xl mx-auto px-6 py-20 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="w-32 h-32 mx-auto mb-8 bg-[#F0E6D3] rounded-full flex items-center justify-center">
              <ShoppingBag className="w-16 h-16 text-[#8B6914]" />
            </div>
            <h1
              className="text-4xl md:text-5xl font-bold text-[#2C2418] mb-4"
              style={{ fontFamily: 'Playfair Display, serif' }}
            >
              Tu carrito está <em className="text-[#8B6914]">vacío</em>
            </h1>
            <p className="text-[#8C8577] text-lg max-w-md mx-auto mb-10">
              Parece que aún no has añadido ningún artículo a tu carrito. Explora
              nuestras colecciones y encuentra piezas que transformen tu hogar.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={goHome}
                className="px-8 py-4 bg-[#2C2418] text-white text-sm tracking-wider uppercase hover:bg-[#8B6914] transition-colors duration-300 flex items-center justify-center gap-2"
              >
                Explorar Colecciones
                <ArrowRight className="w-4 h-4" />
              </button>
              <button
                onClick={() =>
                  navigate({
                    type: 'category',
                    slug: 'living-room',
                    name: 'Sala de Estar',
                  })
                }
                className="px-8 py-4 border-2 border-[#2C2418] text-[#2C2418] text-sm tracking-wider uppercase hover:bg-[#2C2418] hover:text-white transition-colors duration-300"
              >
                Ver Más Vendidos
              </button>
            </div>
          </motion.div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FAF6EF] pt-28 pb-20">
      {/* Breadcrumbs */}
      <div className="max-w-7xl mx-auto px-6 py-6">
        <div className="flex items-center gap-2 text-sm text-[#8C8577]">
          <button onClick={goHome} className="hover:text-[#8B6914] transition-colors">
            Inicio
          </button>
          <ChevronRight className="w-3 h-3" />
          <span className="text-[#2C2418] font-medium">Carrito de Compras</span>
        </div>
      </div>

      {/* Header */}
      <div className="max-w-7xl mx-auto px-6 mb-10">
        <div className="flex items-end justify-between">
          <div>
            <h1
              className="text-4xl md:text-5xl font-bold text-[#2C2418]"
              style={{ fontFamily: 'Playfair Display, serif' }}
            >
              Tu <em className="text-[#8B6914] not-italic font-normal italic">Carrito</em>
            </h1>
            <p className="text-[#8C8577] mt-2">
              {getItemCount()} {getItemCount() === 1 ? 'artículo' : 'artículos'} en tu carrito
            </p>
          </div>
          <button
            onClick={clearCart}
            className="text-sm text-[#8C8577] hover:text-red-500 transition-colors underline underline-offset-4"
          >
            Vaciar carrito
          </button>
        </div>
      </div>

      {/* Free Shipping Progress */}
      {subtotal < freeShippingThreshold && (
        <div className="max-w-7xl mx-auto px-6 mb-8">
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white border border-[#E8E0D0] p-4 flex items-center gap-4"
          >
            <Truck className="w-5 h-5 text-[#8B6914] flex-shrink-0" />
            <div className="flex-1">
              <p className="text-sm text-[#2C2418]">
                ¡Te faltan <strong className="text-[#8B6914]">${amountToFreeShipping.toLocaleString()}</strong> para obtener{' '}
                <strong>envío gratuito</strong>!
              </p>
              <div className="w-full h-2 bg-[#F0E6D3] rounded-full mt-2 overflow-hidden">
                <motion.div
                  className="h-full bg-gradient-to-r from-[#8B6914] to-[#B8960C] rounded-full"
                  initial={{ width: 0 }}
                  animate={{ width: `${freeShippingProgress}%` }}
                  transition={{ duration: 1, ease: 'easeOut' }}
                />
              </div>
            </div>
          </motion.div>
        </div>
      )}
      {subtotal >= freeShippingThreshold && (
        <div className="max-w-7xl mx-auto px-6 mb-8">
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-green-50 border border-green-200 p-4 flex items-center gap-4"
          >
            <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
              <Truck className="w-4 h-4 text-white" />
            </div>
            <p className="text-sm text-green-800">
              🎉 ¡Felicidades! Tu pedido califica para <strong>envío gratuito</strong>.
            </p>
          </motion.div>
        </div>
      )}

      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          {/* Left: Cart Items */}
          <div className="lg:col-span-2">
            {/* Column Headers */}
            <div className="hidden md:grid grid-cols-12 gap-4 pb-4 border-b border-[#E8E0D0] text-xs uppercase tracking-[0.15em] text-[#8C8577] font-medium">
              <div className="col-span-6">Producto</div>
              <div className="col-span-2 text-center">Precio</div>
              <div className="col-span-2 text-center">Cantidad</div>
              <div className="col-span-2 text-right">Total</div>
            </div>

            {/* Items */}
            <AnimatePresence>
              {items.map((item) => (
                <motion.div
                  key={`${item.id}-${item.color}`}
                  layout
                  initial={{ opacity: 1, x: 0 }}
                  animate={{
                    opacity: removingItem === `${item.id}-${item.color}` ? 0 : 1,
                    x: removingItem === `${item.id}-${item.color}` ? -100 : 0,
                  }}
                  exit={{ opacity: 0, x: -100, height: 0 }}
                  transition={{ duration: 0.3 }}
                  className="grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-4 py-6 border-b border-[#E8E0D0] items-center"
                >
                  {/* Product Info */}
                  <div className="col-span-6 flex gap-4 md:gap-5">
                    <div className="relative w-24 h-28 md:w-28 md:h-32 bg-[#F0E6D3] flex-shrink-0 overflow-hidden group cursor-pointer">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        onClick={() =>
                          navigate({ type: 'product', slug: `product-${item.id}` })
                        }
                      />
                      {item.originalPrice && (
                        <div className="absolute top-2 left-2 bg-red-500 text-white text-[10px] uppercase tracking-wider px-2 py-0.5 font-medium">
                          Oferta
                        </div>
                      )}
                    </div>
                    <div className="flex flex-col justify-between py-1">
                      <div>
                        <button
                          onClick={() =>
                            navigate({ type: 'product', slug: `product-${item.id}` })
                          }
                          className="text-[#2C2418] font-semibold hover:text-[#8B6914] transition-colors text-left leading-tight"
                          style={{ fontFamily: 'Playfair Display, serif' }}
                        >
                          {item.name}
                        </button>
                        <p className="text-xs text-[#8C8577] mt-1.5">
                          Color: <span className="text-[#2C2418]">{item.color}</span>
                        </p>
                        <p className="text-xs text-[#8C8577] mt-0.5">
                          Categoría:{' '}
                          <span className="text-[#2C2418]">{item.category}</span>
                        </p>
                      </div>
                      <button
                        onClick={() => handleRemove(item.id, item.color)}
                        className="flex items-center gap-1 text-xs text-[#8C8577] hover:text-red-500 transition-colors mt-2 w-fit"
                      >
                        <X className="w-3 h-3" />
                        Eliminar
                      </button>
                    </div>
                  </div>

                  {/* Price */}
                  <div className="col-span-2 text-center">
                    <div className="flex md:flex-col items-center md:items-center gap-2 md:gap-0.5">
                      {item.originalPrice && (
                        <span className="text-xs text-[#8C8577] line-through">
                          ${item.originalPrice.toLocaleString()}
                        </span>
                      )}
                      <span className="text-sm font-semibold text-[#2C2418]">
                        ${item.price.toLocaleString()}
                      </span>
                    </div>
                  </div>

                  {/* Quantity */}
                  <div className="col-span-2 flex justify-center">
                    <div className="flex items-center border border-[#E8E0D0] bg-white">
                      <button
                        onClick={() =>
                          updateQuantity(item.id, item.color, item.quantity - 1)
                        }
                        className="w-9 h-9 flex items-center justify-center hover:bg-[#F0E6D3] transition-colors text-[#8C8577] hover:text-[#2C2418]"
                      >
                        <Minus className="w-3 h-3" />
                      </button>
                      <span className="w-10 h-9 flex items-center justify-center text-sm font-medium text-[#2C2418] border-x border-[#E8E0D0]">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() =>
                          updateQuantity(item.id, item.color, item.quantity + 1)
                        }
                        className="w-9 h-9 flex items-center justify-center hover:bg-[#F0E6D3] transition-colors text-[#8C8577] hover:text-[#2C2418]"
                      >
                        <Plus className="w-3 h-3" />
                      </button>
                    </div>
                  </div>

                  {/* Total */}
                  <div className="col-span-2 text-right">
                    <span className="text-sm font-bold text-[#2C2418]">
                      ${(item.price * item.quantity).toLocaleString()}
                    </span>
                    {item.originalPrice && (
                      <p className="text-[10px] text-green-600 mt-0.5">
                        Ahorras ${((item.originalPrice - item.price) * item.quantity).toLocaleString()}
                      </p>
                    )}
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>

            {/* Below Cart Actions */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mt-6">
              <button
                onClick={goHome}
                className="flex items-center gap-2 text-sm text-[#8C8577] hover:text-[#8B6914] transition-colors"
              >
                <ArrowRight className="w-4 h-4 rotate-180" />
                Continuar comprando
              </button>
            </div>

            {/* Coupon Section */}
            <div className="mt-8 border-t border-[#E8E0D0] pt-6">
              <button
                onClick={() => setShowCoupon(!showCoupon)}
                className="flex items-center gap-2 text-sm font-medium text-[#2C2418] hover:text-[#8B6914] transition-colors"
              >
                <Tag className="w-4 h-4" />
                ¿Tienes un código de descuento?
                {showCoupon ? (
                  <ChevronUp className="w-4 h-4" />
                ) : (
                  <ChevronDown className="w-4 h-4" />
                )}
              </button>
              <AnimatePresence>
                {showCoupon && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <div className="flex gap-3 mt-4">
                      <input
                        type="text"
                        placeholder="Ingresa tu código"
                        value={couponCode}
                        onChange={(e) => setCouponCode(e.target.value)}
                        className="flex-1 max-w-xs px-4 py-3 border border-[#E8E0D0] bg-white text-sm text-[#2C2418] placeholder-[#8C8577] focus:outline-none focus:border-[#8B6914] transition-colors"
                      />
                      <button
                        onClick={handleApplyCoupon}
                        className="px-6 py-3 bg-[#2C2418] text-white text-sm tracking-wider uppercase hover:bg-[#8B6914] transition-colors"
                      >
                        Aplicar
                      </button>
                    </div>
                    {couponApplied && (
                      <motion.p
                        initial={{ opacity: 0, y: -5 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-sm text-green-600 mt-3 flex items-center gap-2"
                      >
                        <Percent className="w-4 h-4" />
                        ¡Código aplicado! Descuento de ${discount.toLocaleString()}
                      </motion.p>
                    )}
                    <p className="text-xs text-[#8C8577] mt-2 flex items-center gap-1">
                      <Info className="w-3 h-3" />
                      Prueba: ERGO10 (10% desc.) o WELCOME ($50 desc.)
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Gift Wrap */}
            <div className="mt-6 border-t border-[#E8E0D0] pt-6">
              <button
                onClick={() => setShowGift(!showGift)}
                className="flex items-center gap-2 text-sm font-medium text-[#2C2418] hover:text-[#8B6914] transition-colors"
              >
                <Gift className="w-4 h-4" />
                ¿Es un regalo?
                {showGift ? (
                  <ChevronUp className="w-4 h-4" />
                ) : (
                  <ChevronDown className="w-4 h-4" />
                )}
              </button>
              <AnimatePresence>
                {showGift && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <div className="mt-4 bg-white border border-[#E8E0D0] p-5">
                      <label className="flex items-center gap-3 cursor-pointer" onClick={() => setGiftWrap(!giftWrap)}>
                        <div
                          className={`w-5 h-5 border-2 flex items-center justify-center transition-colors ${giftWrap ? 'bg-[#8B6914] border-[#8B6914]' : 'border-[#D1C9B8]'}`}
                        >
                          {giftWrap && (
                            <svg
                              className="w-3 h-3 text-white"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={3}
                                d="M5 13l4 4L19 7"
                              />
                            </svg>
                          )}
                        </div>
                        <span className="text-sm text-[#2C2418]">
                          Agregar envoltorio de regalo (+$25)
                        </span>
                      </label>
                      {giftWrap && (
                        <motion.div
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          className="mt-4"
                        >
                          <textarea
                            placeholder="Escribe un mensaje personalizado (opcional)"
                            value={giftMessage}
                            onChange={(e) => setGiftMessage(e.target.value)}
                            rows={3}
                            className="w-full px-4 py-3 border border-[#E8E0D0] text-sm text-[#2C2418] placeholder-[#8C8577] focus:outline-none focus:border-[#8B6914] transition-colors resize-none"
                          />
                        </motion.div>
                      )}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

          {/* Right: Order Summary */}
          <div className="lg:col-span-1">
            <div className="sticky top-28">
              <div className="bg-white border border-[#E8E0D0] p-6">
                <h2
                  className="text-xl font-bold text-[#2C2418] pb-4 border-b border-[#E8E0D0]"
                  style={{ fontFamily: 'Playfair Display, serif' }}
                >
                  Resumen del Pedido
                </h2>

                <div className="py-4 space-y-3 border-b border-[#E8E0D0]">
                  <div className="flex justify-between text-sm">
                    <span className="text-[#8C8577]">
                      Subtotal ({getItemCount()} artículos)
                    </span>
                    <span className="text-[#2C2418] font-medium">
                      ${subtotal.toLocaleString()}
                    </span>
                  </div>
                  {savings > 0 && (
                    <div className="flex justify-between text-sm">
                      <span className="text-green-600">Ahorros en productos</span>
                      <span className="text-green-600 font-medium">
                        -${savings.toLocaleString()}
                      </span>
                    </div>
                  )}
                  {couponApplied && (
                    <div className="flex justify-between text-sm">
                      <span className="text-green-600 flex items-center gap-1">
                        <Tag className="w-3 h-3" />
                        Cupón ({couponCode.toUpperCase()})
                      </span>
                      <span className="text-green-600 font-medium">
                        -${discount.toLocaleString()}
                      </span>
                    </div>
                  )}
                  {giftWrap && (
                    <div className="flex justify-between text-sm">
                      <span className="text-[#8C8577]">Envoltorio de regalo</span>
                      <span className="text-[#2C2418]">$25</span>
                    </div>
                  )}
                </div>

                {/* Shipping Options */}
                <div className="py-4 border-b border-[#E8E0D0]">
                  <p className="text-xs uppercase tracking-[0.15em] text-[#8C8577] font-medium mb-3">
                    Método de envío
                  </p>
                  <div className="space-y-2">
                    {[
                      {
                        id: 'free' as const,
                        label: 'Estándar',
                        price: 'Gratis',
                        time: '5-7 días hábiles',
                        disabled: subtotal < 500,
                      },
                      {
                        id: 'express' as const,
                        label: 'Express',
                        price: '$89',
                        time: '2-3 días hábiles',
                        disabled: false,
                      },
                      {
                        id: 'premium' as const,
                        label: 'Premium',
                        price: '$149',
                        time: '1 día hábil',
                        disabled: false,
                      },
                    ].map((method) => (
                                              <label
                          key={method.id}
                          onClick={() => !method.disabled && setShippingMethod(method.id)}
                          className={`flex items-center justify-between p-3 border cursor-pointer transition-all ${
                            shippingMethod === method.id
                              ? 'border-[#8B6914] bg-[#FAF6EF]'
                              : 'border-[#E8E0D0] hover:border-[#D1C9B8]'
                          } ${method.disabled ? 'opacity-50 cursor-not-allowed' : ''}`}
                        >
                        <div className="flex items-center gap-3">
                          <div
                            className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${
                              shippingMethod === method.id
                                ? 'border-[#8B6914]'
                                : 'border-[#D1C9B8]'
                            }`}
                          >
                            {shippingMethod === method.id && (
                              <div className="w-2 h-2 rounded-full bg-[#8B6914]" />
                            )}
                          </div>
                          <div>
                            <p className="text-sm text-[#2C2418] font-medium">
                              {method.label}
                            </p>
                            <p className="text-[10px] text-[#8C8577]">{method.time}</p>
                          </div>
                        </div>
                        <span
                          className={`text-sm font-semibold ${
                            method.id === 'free' && !method.disabled
                              ? 'text-green-600'
                              : 'text-[#2C2418]'
                          }`}
                        >
                          {method.disabled ? '$89' : method.price}
                        </span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Total */}
                <div className="py-4 border-b border-[#E8E0D0]">
                  <div className="flex justify-between items-center">
                    <span
                      className="text-lg font-bold text-[#2C2418]"
                      style={{ fontFamily: 'Playfair Display, serif' }}
                    >
                      Total
                    </span>
                    <div className="text-right">
                      <span className="text-2xl font-bold text-[#2C2418]">
                        ${total.toLocaleString()}
                      </span>
                      <p className="text-[10px] text-[#8C8577]">Impuestos incluidos</p>
                    </div>
                  </div>
                </div>

                {/* Checkout Button */}
                <div className="pt-4 space-y-3">
                  <button
                    onClick={() => navigate({ type: 'checkout' })}
                    className="w-full py-4 bg-[#8B6914] text-white text-sm tracking-[0.15em] uppercase font-medium hover:bg-[#73570F] transition-colors flex items-center justify-center gap-2 group"
                  >
                    <Lock className="w-4 h-4" />
                    Finalizar Compra
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </button>
                </div>

                {/* Trust Badges */}
                <div className="mt-6 pt-4 border-t border-[#E8E0D0] space-y-3">
                  {[
                    {
                      icon: <Lock className="w-4 h-4" />,
                      text: 'Pago 100% seguro con SSL',
                    },
                    {
                      icon: <Truck className="w-4 h-4" />,
                      text: 'Envío asegurado y rastreable',
                    },
                    {
                      icon: <RotateCcw className="w-4 h-4" />,
                      text: 'Devolución gratuita en 30 días',
                    },
                    {
                      icon: <ShieldCheck className="w-4 h-4" />,
                      text: 'Garantía de 5 años incluida',
                    },
                  ].map((badge, i) => (
                    <div key={i} className="flex items-center gap-3 text-xs text-[#8C8577]">
                      <span className="text-[#8B6914]">{badge.icon}</span>
                      {badge.text}
                    </div>
                  ))}
                </div>

                {/* Payment Methods */}
                <div className="mt-4 pt-4 border-t border-[#E8E0D0]">
                  <p className="text-[10px] uppercase tracking-[0.15em] text-[#8C8577] mb-3 text-center">
                    Métodos de pago aceptados
                  </p>
                  <div className="flex justify-center gap-3">
                    {['Visa', 'MC', 'Amex', 'PayPal'].map((method) => (
                      <div
                        key={method}
                        className="w-12 h-8 bg-[#F0E6D3] rounded flex items-center justify-center text-[10px] font-bold text-[#8C8577]"
                      >
                        {method}
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Estimated Delivery */}
              <div className="mt-4 bg-[#2C2418] text-white p-5">
                <div className="flex items-center gap-3 mb-2">
                  <Truck className="w-5 h-5 text-[#8B6914]" />
                  <p className="text-sm font-medium">Entrega estimada</p>
                </div>
                <p className="text-[#a89e8c] text-xs ml-8">
                  {shippingMethod === 'premium'
                    ? 'Mañana'
                    : shippingMethod === 'express'
                      ? `${new Date(Date.now() + 3 * 86400000).toLocaleDateString('es-ES', { weekday: 'long', month: 'long', day: 'numeric' })}`
                      : `${new Date(Date.now() + 7 * 86400000).toLocaleDateString('es-ES', { weekday: 'long', month: 'long', day: 'numeric' })}`}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Suggested Products */}
        <div className="mt-20 pt-10 border-t border-[#E8E0D0]">
          <h3
            className="text-2xl md:text-3xl font-bold text-[#2C2418] text-center mb-2"
            style={{ fontFamily: 'Playfair Display, serif' }}
          >
            También te puede <em className="text-[#8B6914]">gustar</em>
          </h3>
          <p className="text-[#8C8577] text-center text-sm mb-10">
            Complementa tu pedido con estas piezas seleccionadas
          </p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
            {[
              {
                id: 10,
                name: 'Silla Meridian Lounge',
                price: 1299,
                image:
                  'https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?w=400',
                category: 'Sala de Estar',
              },
              {
                id: 11,
                name: 'Escritorio Oslo',
                price: 1199,
                originalPrice: 1399,
                image:
                  'https://images.unsplash.com/photo-1518455027359-f3f8164ba6bd?w=400',
                category: 'Oficina',
              },
              {
                id: 14,
                name: 'Cama Nórdica',
                price: 2199,
                image:
                  'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=400',
                category: 'Dormitorio',
              },
              {
                id: 17,
                name: 'Mesa de Comedor Rústica',
                price: 1899,
                image:
                  'https://images.unsplash.com/photo-1617806118233-18e1de247200?w=400',
                category: 'Comedor',
              },
            ].map((product) => (
              <motion.div
                key={product.id}
                whileHover={{ y: -5 }}
                className="group cursor-pointer"
                onClick={() =>
                  navigate({ type: 'product', slug: `product-${product.id}` })
                }
              >
                <div className="aspect-[3/4] bg-[#F0E6D3] overflow-hidden mb-3 relative">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  {product.originalPrice && (
                    <div className="absolute top-3 left-3 bg-red-500 text-white text-[10px] uppercase tracking-wider px-2 py-0.5">
                      Oferta
                    </div>
                  )}
                  <div className="absolute inset-x-0 bottom-0 p-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                      }}
                      className="w-full py-2.5 bg-[#2C2418] text-white text-xs tracking-wider uppercase hover:bg-[#8B6914] transition-colors"
                    >
                      Añadir al Carrito
                    </button>
                  </div>
                </div>
                <h4 className="text-sm font-medium text-[#2C2418] group-hover:text-[#8B6914] transition-colors">
                  {product.name}
                </h4>
                <div className="flex items-center gap-2 mt-1">
                  {product.originalPrice && (
                    <span className="text-xs text-[#8C8577] line-through">
                      ${product.originalPrice.toLocaleString()}
                    </span>
                  )}
                  <span className="text-sm font-semibold text-[#2C2418]">
                    ${product.price.toLocaleString()}
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
