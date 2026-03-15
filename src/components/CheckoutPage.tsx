import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ChevronRight,
  ChevronDown,
  ChevronUp,
  Lock,
  Truck,
  ShieldCheck,
  RotateCcw,
  CreditCard,
  Building2,
  Wallet,
  Check,
  MapPin,
  Phone,
  Mail,
  User,
  FileText,
  ArrowRight,
  ShoppingBag,
  X,
  Minus,
  Plus,
} from 'lucide-react';
import { useNavigation } from '../context/NavigationContext';
import { useCart } from '../context/CartContext';

type Step = 'information' | 'shipping' | 'payment';

export default function CheckoutPage() {
  const { goHome, navigate } = useNavigation();
  const { items, getSubtotal, getItemCount, updateQuantity, removeFromCart } = useCart();

  const [currentStep, setCurrentStep] = useState<Step>('information');
  const [showOrderSummary, setShowOrderSummary] = useState(false);
  const [orderPlaced, setOrderPlaced] = useState(false);

  // Form states
  const [contactEmail, setContactEmail] = useState('');
  const [contactPhone, setContactPhone] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [address, setAddress] = useState('');
  const [addressLine2, setAddressLine2] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [zipCode, setZipCode] = useState('');
  const [country, setCountry] = useState('México');
  const [saveInfo, setSaveInfo] = useState(true);
  const [notes, setNotes] = useState('');

  // Shipping
  const [shippingMethod, setShippingMethod] = useState<'standard' | 'express' | 'premium'>('standard');

  // Payment
  const [paymentMethod, setPaymentMethod] = useState<'card' | 'transfer' | 'cash'>('card');
  const [cardNumber, setCardNumber] = useState('');
  const [cardName, setCardName] = useState('');
  const [cardExpiry, setCardExpiry] = useState('');
  const [cardCvv, setCardCvv] = useState('');
  const [acceptTerms, setAcceptTerms] = useState(false);

  const subtotal = getSubtotal();
  const shippingCost = shippingMethod === 'standard' ? (subtotal >= 500 ? 0 : 89) : shippingMethod === 'express' ? 149 : 249;
  const tax = Math.round(subtotal * 0.16);
  const total = subtotal + shippingCost + tax;

  const steps: { id: Step; label: string; num: number }[] = [
    { id: 'information', label: 'Información', num: 1 },
    { id: 'shipping', label: 'Envío', num: 2 },
    { id: 'payment', label: 'Pago', num: 3 },
  ];

  const currentStepIndex = steps.findIndex((s) => s.id === currentStep);

  const canProceedToShipping = contactEmail && firstName && lastName && address && city && state && zipCode;
  const canProceedToPayment = shippingMethod;
  const canPlaceOrder = paymentMethod === 'card'
    ? cardNumber && cardName && cardExpiry && cardCvv && acceptTerms
    : acceptTerms;

  const formatCardNumber = (val: string) => {
    const cleaned = val.replace(/\D/g, '').slice(0, 16);
    return cleaned.replace(/(.{4})/g, '$1 ').trim();
  };

  const formatExpiry = (val: string) => {
    const cleaned = val.replace(/\D/g, '').slice(0, 4);
    if (cleaned.length >= 3) return cleaned.slice(0, 2) + '/' + cleaned.slice(2);
    return cleaned;
  };

  const handlePlaceOrder = () => {
    setOrderPlaced(true);
  };

  // Order confirmed screen
  if (orderPlaced) {
    return (
      <div className="min-h-screen bg-[#FAF6EF] pt-32 pb-20">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-2xl mx-auto px-6 text-center"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.3, type: 'spring', stiffness: 200 }}
            className="w-24 h-24 mx-auto mb-8 bg-green-500 rounded-full flex items-center justify-center"
          >
            <Check className="w-12 h-12 text-white" />
          </motion.div>

          <h1
            className="text-4xl md:text-5xl font-bold text-[#2C2418] mb-4"
            style={{ fontFamily: 'Playfair Display, serif' }}
          >
            ¡Pedido <em className="text-[#8B6914]">Confirmado</em>!
          </h1>
          <p className="text-[#8C8577] text-lg mb-2">
            Gracias por tu compra, {firstName}.
          </p>
          <p className="text-[#8C8577] mb-8">
            Hemos enviado un correo de confirmación a <strong className="text-[#2C2418]">{contactEmail}</strong> con los detalles de tu pedido.
          </p>

          <div className="bg-white border border-[#E8E0D0] p-8 mb-8 text-left">
            <div className="flex items-center justify-between mb-6 pb-4 border-b border-[#E8E0D0]">
              <div>
                <p className="text-xs uppercase tracking-[0.15em] text-[#8C8577] mb-1">Número de pedido</p>
                <p className="text-xl font-bold text-[#2C2418]" style={{ fontFamily: 'Playfair Display, serif' }}>
                  #EC-{Math.floor(100000 + Math.random() * 900000)}
                </p>
              </div>
              <div className="text-right">
                <p className="text-xs uppercase tracking-[0.15em] text-[#8C8577] mb-1">Total</p>
                <p className="text-xl font-bold text-[#8B6914]">${total.toLocaleString()}</p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <p className="text-xs uppercase tracking-[0.15em] text-[#8C8577] mb-2">Dirección de envío</p>
                <p className="text-sm text-[#2C2418]">{firstName} {lastName}</p>
                <p className="text-sm text-[#8C8577]">{address}</p>
                {addressLine2 && <p className="text-sm text-[#8C8577]">{addressLine2}</p>}
                <p className="text-sm text-[#8C8577]">{city}, {state} {zipCode}</p>
                <p className="text-sm text-[#8C8577]">{country}</p>
              </div>
              <div>
                <p className="text-xs uppercase tracking-[0.15em] text-[#8C8577] mb-2">Método de envío</p>
                <p className="text-sm text-[#2C2418]">
                  {shippingMethod === 'standard' ? 'Estándar (5-7 días)' : shippingMethod === 'express' ? 'Express (2-3 días)' : 'Premium (1 día)'}
                </p>
                <p className="text-xs uppercase tracking-[0.15em] text-[#8C8577] mb-2 mt-4">Método de pago</p>
                <p className="text-sm text-[#2C2418]">
                  {paymentMethod === 'card' ? `Tarjeta terminada en ${cardNumber.slice(-4)}` : paymentMethod === 'transfer' ? 'Transferencia bancaria' : 'Pago en efectivo'}
                </p>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-[#E8E0D0]">
              <p className="text-xs uppercase tracking-[0.15em] text-[#8C8577] mb-3">Artículos ({getItemCount()})</p>
              <div className="space-y-3">
                {items.map((item) => (
                  <div key={`${item.id}-${item.color}`} className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-[#F0E6D3] overflow-hidden flex-shrink-0">
                      <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm text-[#2C2418] truncate">{item.name}</p>
                      <p className="text-xs text-[#8C8577]">Cant: {item.quantity} · {item.color}</p>
                    </div>
                    <p className="text-sm font-semibold text-[#2C2418]">${(item.price * item.quantity).toLocaleString()}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={goHome}
              className="px-8 py-4 bg-[#2C2418] text-white text-sm tracking-wider uppercase hover:bg-[#8B6914] transition-colors flex items-center justify-center gap-2"
            >
              Volver al Inicio
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </motion.div>
      </div>
    );
  }

  // Empty cart redirect
  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-[#FAF6EF] pt-32 pb-20">
        <div className="max-w-4xl mx-auto px-6 py-20 text-center">
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
            No puedes proceder al checkout sin artículos en tu carrito.
          </p>
          <button
            onClick={goHome}
            className="px-8 py-4 bg-[#2C2418] text-white text-sm tracking-wider uppercase hover:bg-[#8B6914] transition-colors flex items-center justify-center gap-2"
          >
            Explorar Colecciones
            <ArrowRight className="w-4 h-4" />
          </button>
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
          <button
            onClick={() => navigate({ type: 'cart' })}
            className="hover:text-[#8B6914] transition-colors"
          >
            Carrito
          </button>
          <ChevronRight className="w-3 h-3" />
          <span className="text-[#2C2418] font-medium">Checkout</span>
        </div>
      </div>

      {/* Header */}
      <div className="max-w-7xl mx-auto px-6 mb-8">
        <h1
          className="text-3xl md:text-4xl font-bold text-[#2C2418]"
          style={{ fontFamily: 'Playfair Display, serif' }}
        >
          Finalizar <em className="text-[#8B6914] not-italic font-normal italic">Compra</em>
        </h1>
      </div>

      {/* Step Indicator */}
      <div className="max-w-7xl mx-auto px-6 mb-10">
        <div className="flex items-center">
          {steps.map((step, idx) => (
            <div key={step.id} className="flex items-center flex-1 last:flex-none">
              <button
                onClick={() => {
                  if (idx < currentStepIndex) setCurrentStep(step.id);
                }}
                className={`flex items-center gap-3 group ${idx <= currentStepIndex ? 'cursor-pointer' : 'cursor-default'}`}
              >
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-semibold transition-all duration-300 ${
                    idx < currentStepIndex
                      ? 'bg-green-500 text-white'
                      : idx === currentStepIndex
                        ? 'bg-[#8B6914] text-white'
                        : 'bg-[#E8E0D0] text-[#8C8577]'
                  }`}
                >
                  {idx < currentStepIndex ? <Check className="w-5 h-5" /> : step.num}
                </div>
                <span
                  className={`text-sm font-medium hidden sm:block ${
                    idx <= currentStepIndex ? 'text-[#2C2418]' : 'text-[#8C8577]'
                  }`}
                >
                  {step.label}
                </span>
              </button>
              {idx < steps.length - 1 && (
                <div className="flex-1 mx-4">
                  <div className="h-[2px] bg-[#E8E0D0] relative overflow-hidden">
                    <motion.div
                      className="absolute inset-y-0 left-0 bg-[#8B6914]"
                      initial={{ width: '0%' }}
                      animate={{ width: idx < currentStepIndex ? '100%' : '0%' }}
                      transition={{ duration: 0.5 }}
                    />
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6">
        {/* Mobile Order Summary Toggle */}
        <div className="lg:hidden mb-6">
          <button
            onClick={() => setShowOrderSummary(!showOrderSummary)}
            className="w-full flex items-center justify-between bg-white border border-[#E8E0D0] p-4"
          >
            <div className="flex items-center gap-3">
              <ShoppingBag className="w-5 h-5 text-[#8B6914]" />
              <span className="text-sm font-medium text-[#2C2418]">
                {showOrderSummary ? 'Ocultar' : 'Mostrar'} resumen del pedido
              </span>
              {showOrderSummary ? <ChevronUp className="w-4 h-4 text-[#8C8577]" /> : <ChevronDown className="w-4 h-4 text-[#8C8577]" />}
            </div>
            <span className="text-lg font-bold text-[#2C2418]">${total.toLocaleString()}</span>
          </button>
          <AnimatePresence>
            {showOrderSummary && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                className="overflow-hidden"
              >
                <div className="bg-white border border-t-0 border-[#E8E0D0] p-4">
                  {items.map((item) => (
                    <div key={`${item.id}-${item.color}`} className="flex gap-3 py-3 border-b border-[#E8E0D0] last:border-0">
                      <div className="relative w-16 h-16 bg-[#F0E6D3] flex-shrink-0 overflow-hidden">
                        <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                        <div className="absolute -top-1 -right-1 w-5 h-5 bg-[#8B6914] rounded-full text-white text-[10px] flex items-center justify-center font-bold">
                          {item.quantity}
                        </div>
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm text-[#2C2418] font-medium truncate">{item.name}</p>
                        <p className="text-xs text-[#8C8577]">{item.color}</p>
                      </div>
                      <p className="text-sm font-semibold text-[#2C2418]">${(item.price * item.quantity).toLocaleString()}</p>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* Left: Form */}
          <div className="lg:col-span-7">
            <AnimatePresence mode="wait">
              {/* Step 1: Information */}
              {currentStep === 'information' && (
                <motion.div
                  key="information"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  transition={{ duration: 0.3 }}
                >
                  {/* Contact */}
                  <div className="bg-white border border-[#E8E0D0] p-6 md:p-8 mb-6">
                    <h2
                      className="text-xl font-bold text-[#2C2418] mb-6 flex items-center gap-3"
                      style={{ fontFamily: 'Playfair Display, serif' }}
                    >
                      <Mail className="w-5 h-5 text-[#8B6914]" />
                      Información de Contacto
                    </h2>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="md:col-span-2">
                        <label className="block text-xs uppercase tracking-[0.15em] text-[#8C8577] font-medium mb-2">
                          Correo electrónico *
                        </label>
                        <input
                          type="email"
                          value={contactEmail}
                          onChange={(e) => setContactEmail(e.target.value)}
                          placeholder="tu@email.com"
                          className="w-full px-4 py-3.5 border border-[#E8E0D0] bg-[#FAF6EF] text-sm text-[#2C2418] placeholder-[#B8AFA0] focus:outline-none focus:border-[#8B6914] focus:bg-white transition-all"
                        />
                      </div>
                      <div className="md:col-span-2">
                        <label className="block text-xs uppercase tracking-[0.15em] text-[#8C8577] font-medium mb-2">
                          Teléfono *
                        </label>
                        <input
                          type="tel"
                          value={contactPhone}
                          onChange={(e) => setContactPhone(e.target.value)}
                          placeholder="+52 (55) 1234-5678"
                          className="w-full px-4 py-3.5 border border-[#E8E0D0] bg-[#FAF6EF] text-sm text-[#2C2418] placeholder-[#B8AFA0] focus:outline-none focus:border-[#8B6914] focus:bg-white transition-all"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Shipping Address */}
                  <div className="bg-white border border-[#E8E0D0] p-6 md:p-8 mb-6">
                    <h2
                      className="text-xl font-bold text-[#2C2418] mb-6 flex items-center gap-3"
                      style={{ fontFamily: 'Playfair Display, serif' }}
                    >
                      <MapPin className="w-5 h-5 text-[#8B6914]" />
                      Dirección de Envío
                    </h2>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs uppercase tracking-[0.15em] text-[#8C8577] font-medium mb-2">
                          Nombre *
                        </label>
                        <input
                          type="text"
                          value={firstName}
                          onChange={(e) => setFirstName(e.target.value)}
                          placeholder="Juan"
                          className="w-full px-4 py-3.5 border border-[#E8E0D0] bg-[#FAF6EF] text-sm text-[#2C2418] placeholder-[#B8AFA0] focus:outline-none focus:border-[#8B6914] focus:bg-white transition-all"
                        />
                      </div>
                      <div>
                        <label className="block text-xs uppercase tracking-[0.15em] text-[#8C8577] font-medium mb-2">
                          Apellidos *
                        </label>
                        <input
                          type="text"
                          value={lastName}
                          onChange={(e) => setLastName(e.target.value)}
                          placeholder="García López"
                          className="w-full px-4 py-3.5 border border-[#E8E0D0] bg-[#FAF6EF] text-sm text-[#2C2418] placeholder-[#B8AFA0] focus:outline-none focus:border-[#8B6914] focus:bg-white transition-all"
                        />
                      </div>
                      <div className="md:col-span-2">
                        <label className="block text-xs uppercase tracking-[0.15em] text-[#8C8577] font-medium mb-2">
                          Dirección *
                        </label>
                        <input
                          type="text"
                          value={address}
                          onChange={(e) => setAddress(e.target.value)}
                          placeholder="Calle, número exterior e interior"
                          className="w-full px-4 py-3.5 border border-[#E8E0D0] bg-[#FAF6EF] text-sm text-[#2C2418] placeholder-[#B8AFA0] focus:outline-none focus:border-[#8B6914] focus:bg-white transition-all"
                        />
                      </div>
                      <div className="md:col-span-2">
                        <label className="block text-xs uppercase tracking-[0.15em] text-[#8C8577] font-medium mb-2">
                          Colonia / Referencias (opcional)
                        </label>
                        <input
                          type="text"
                          value={addressLine2}
                          onChange={(e) => setAddressLine2(e.target.value)}
                          placeholder="Colonia, edificio, piso, etc."
                          className="w-full px-4 py-3.5 border border-[#E8E0D0] bg-[#FAF6EF] text-sm text-[#2C2418] placeholder-[#B8AFA0] focus:outline-none focus:border-[#8B6914] focus:bg-white transition-all"
                        />
                      </div>
                      <div>
                        <label className="block text-xs uppercase tracking-[0.15em] text-[#8C8577] font-medium mb-2">
                          Ciudad *
                        </label>
                        <input
                          type="text"
                          value={city}
                          onChange={(e) => setCity(e.target.value)}
                          placeholder="Ciudad de México"
                          className="w-full px-4 py-3.5 border border-[#E8E0D0] bg-[#FAF6EF] text-sm text-[#2C2418] placeholder-[#B8AFA0] focus:outline-none focus:border-[#8B6914] focus:bg-white transition-all"
                        />
                      </div>
                      <div>
                        <label className="block text-xs uppercase tracking-[0.15em] text-[#8C8577] font-medium mb-2">
                          Estado *
                        </label>
                        <input
                          type="text"
                          value={state}
                          onChange={(e) => setState(e.target.value)}
                          placeholder="CDMX"
                          className="w-full px-4 py-3.5 border border-[#E8E0D0] bg-[#FAF6EF] text-sm text-[#2C2418] placeholder-[#B8AFA0] focus:outline-none focus:border-[#8B6914] focus:bg-white transition-all"
                        />
                      </div>
                      <div>
                        <label className="block text-xs uppercase tracking-[0.15em] text-[#8C8577] font-medium mb-2">
                          Código Postal *
                        </label>
                        <input
                          type="text"
                          value={zipCode}
                          onChange={(e) => setZipCode(e.target.value)}
                          placeholder="06600"
                          className="w-full px-4 py-3.5 border border-[#E8E0D0] bg-[#FAF6EF] text-sm text-[#2C2418] placeholder-[#B8AFA0] focus:outline-none focus:border-[#8B6914] focus:bg-white transition-all"
                        />
                      </div>
                      <div>
                        <label className="block text-xs uppercase tracking-[0.15em] text-[#8C8577] font-medium mb-2">
                          País
                        </label>
                        <select
                          value={country}
                          onChange={(e) => setCountry(e.target.value)}
                          className="w-full px-4 py-3.5 border border-[#E8E0D0] bg-[#FAF6EF] text-sm text-[#2C2418] focus:outline-none focus:border-[#8B6914] focus:bg-white transition-all appearance-none"
                        >
                          <option>México</option>
                          <option>Estados Unidos</option>
                          <option>Colombia</option>
                          <option>Argentina</option>
                          <option>España</option>
                        </select>
                      </div>
                    </div>

                    {/* Save info checkbox */}
                    <label
                      className="flex items-center gap-3 mt-6 cursor-pointer"
                      onClick={() => setSaveInfo(!saveInfo)}
                    >
                      <div
                        className={`w-5 h-5 border-2 flex items-center justify-center transition-colors ${saveInfo ? 'bg-[#8B6914] border-[#8B6914]' : 'border-[#D1C9B8]'}`}
                      >
                        {saveInfo && (
                          <Check className="w-3 h-3 text-white" />
                        )}
                      </div>
                      <span className="text-sm text-[#8C8577]">
                        Guardar esta información para la próxima compra
                      </span>
                    </label>
                  </div>

                  {/* Order Notes */}
                  <div className="bg-white border border-[#E8E0D0] p-6 md:p-8 mb-6">
                    <h2
                      className="text-xl font-bold text-[#2C2418] mb-6 flex items-center gap-3"
                      style={{ fontFamily: 'Playfair Display, serif' }}
                    >
                      <FileText className="w-5 h-5 text-[#8B6914]" />
                      Notas del Pedido
                    </h2>
                    <textarea
                      value={notes}
                      onChange={(e) => setNotes(e.target.value)}
                      placeholder="Instrucciones especiales de entrega, notas, etc. (opcional)"
                      rows={3}
                      className="w-full px-4 py-3.5 border border-[#E8E0D0] bg-[#FAF6EF] text-sm text-[#2C2418] placeholder-[#B8AFA0] focus:outline-none focus:border-[#8B6914] focus:bg-white transition-all resize-none"
                    />
                  </div>

                  {/* Continue Button */}
                  <div className="flex items-center justify-between">
                    <button
                      onClick={() => navigate({ type: 'cart' })}
                      className="flex items-center gap-2 text-sm text-[#8C8577] hover:text-[#8B6914] transition-colors"
                    >
                      <ArrowRight className="w-4 h-4 rotate-180" />
                      Volver al carrito
                    </button>
                    <button
                      onClick={() => canProceedToShipping && setCurrentStep('shipping')}
                      disabled={!canProceedToShipping}
                      className={`px-8 py-4 text-sm tracking-[0.15em] uppercase font-medium flex items-center gap-2 transition-all ${
                        canProceedToShipping
                          ? 'bg-[#8B6914] text-white hover:bg-[#73570F]'
                          : 'bg-[#E8E0D0] text-[#B8AFA0] cursor-not-allowed'
                      }`}
                    >
                      Continuar al Envío
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </motion.div>
              )}

              {/* Step 2: Shipping */}
              {currentStep === 'shipping' && (
                <motion.div
                  key="shipping"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  transition={{ duration: 0.3 }}
                >
                  {/* Address Summary */}
                  <div className="bg-white border border-[#E8E0D0] p-6 mb-6">
                    <div className="flex items-center justify-between mb-3">
                      <p className="text-xs uppercase tracking-[0.15em] text-[#8C8577] font-medium">Enviar a</p>
                      <button
                        onClick={() => setCurrentStep('information')}
                        className="text-xs text-[#8B6914] hover:underline"
                      >
                        Modificar
                      </button>
                    </div>
                    <div className="flex items-start gap-3">
                      <MapPin className="w-4 h-4 text-[#8B6914] mt-0.5 flex-shrink-0" />
                      <div>
                        <p className="text-sm text-[#2C2418] font-medium">{firstName} {lastName}</p>
                        <p className="text-sm text-[#8C8577]">{address}{addressLine2 ? `, ${addressLine2}` : ''}</p>
                        <p className="text-sm text-[#8C8577]">{city}, {state} {zipCode}, {country}</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3 mt-3 pt-3 border-t border-[#E8E0D0]">
                      <Phone className="w-4 h-4 text-[#8B6914] mt-0.5 flex-shrink-0" />
                      <p className="text-sm text-[#8C8577]">{contactPhone}</p>
                    </div>
                  </div>

                  {/* Shipping Methods */}
                  <div className="bg-white border border-[#E8E0D0] p-6 md:p-8 mb-6">
                    <h2
                      className="text-xl font-bold text-[#2C2418] mb-6 flex items-center gap-3"
                      style={{ fontFamily: 'Playfair Display, serif' }}
                    >
                      <Truck className="w-5 h-5 text-[#8B6914]" />
                      Método de Envío
                    </h2>

                    <div className="space-y-3">
                      {[
                        {
                          id: 'standard' as const,
                          name: 'Envío Estándar',
                          desc: 'Entrega en 5-7 días hábiles',
                          price: subtotal >= 500 ? 'Gratis' : '$89',
                          priceValue: subtotal >= 500 ? 0 : 89,
                          icon: <Truck className="w-5 h-5" />,
                          badge: subtotal >= 500 ? 'GRATIS' : null,
                        },
                        {
                          id: 'express' as const,
                          name: 'Envío Express',
                          desc: 'Entrega en 2-3 días hábiles',
                          price: '$149',
                          priceValue: 149,
                          icon: <Truck className="w-5 h-5" />,
                          badge: 'POPULAR',
                        },
                        {
                          id: 'premium' as const,
                          name: 'Envío Premium',
                          desc: 'Entrega al día siguiente hábil · Instalación incluida',
                          price: '$249',
                          priceValue: 249,
                          icon: <Truck className="w-5 h-5" />,
                          badge: null,
                        },
                      ].map((method) => (
                        <label
                          key={method.id}
                          onClick={() => setShippingMethod(method.id)}
                          className={`flex items-center justify-between p-5 border-2 cursor-pointer transition-all ${
                            shippingMethod === method.id
                              ? 'border-[#8B6914] bg-[#FAF6EF]'
                              : 'border-[#E8E0D0] hover:border-[#D1C9B8]'
                          }`}
                        >
                          <div className="flex items-center gap-4">
                            <div
                              className={`w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0 ${
                                shippingMethod === method.id ? 'border-[#8B6914]' : 'border-[#D1C9B8]'
                              }`}
                            >
                              {shippingMethod === method.id && (
                                <div className="w-2.5 h-2.5 rounded-full bg-[#8B6914]" />
                              )}
                            </div>
                            <div className={`p-2 ${shippingMethod === method.id ? 'text-[#8B6914]' : 'text-[#8C8577]'}`}>
                              {method.icon}
                            </div>
                            <div>
                              <div className="flex items-center gap-2">
                                <p className="text-sm text-[#2C2418] font-semibold">{method.name}</p>
                                {method.badge && (
                                  <span className={`text-[10px] uppercase tracking-wider px-2 py-0.5 font-bold ${
                                    method.badge === 'GRATIS' ? 'bg-green-100 text-green-700' : 'bg-[#F0E6D3] text-[#8B6914]'
                                  }`}>
                                    {method.badge}
                                  </span>
                                )}
                              </div>
                              <p className="text-xs text-[#8C8577] mt-0.5">{method.desc}</p>
                            </div>
                          </div>
                          <span className={`text-sm font-bold flex-shrink-0 ${
                            method.priceValue === 0 ? 'text-green-600' : 'text-[#2C2418]'
                          }`}>
                            {method.price}
                          </span>
                        </label>
                      ))}
                    </div>

                    {/* Estimated Delivery */}
                    <div className="mt-6 p-4 bg-[#FAF6EF] border border-[#E8E0D0]">
                      <div className="flex items-center gap-3">
                        <Truck className="w-5 h-5 text-[#8B6914]" />
                        <div>
                          <p className="text-sm font-medium text-[#2C2418]">Entrega estimada</p>
                          <p className="text-xs text-[#8C8577]">
                            {shippingMethod === 'premium'
                              ? `${new Date(Date.now() + 1 * 86400000).toLocaleDateString('es-ES', { weekday: 'long', day: 'numeric', month: 'long' })}`
                              : shippingMethod === 'express'
                                ? `${new Date(Date.now() + 2 * 86400000).toLocaleDateString('es-ES', { weekday: 'long', day: 'numeric', month: 'long' })} - ${new Date(Date.now() + 3 * 86400000).toLocaleDateString('es-ES', { weekday: 'long', day: 'numeric', month: 'long' })}`
                                : `${new Date(Date.now() + 5 * 86400000).toLocaleDateString('es-ES', { weekday: 'long', day: 'numeric', month: 'long' })} - ${new Date(Date.now() + 7 * 86400000).toLocaleDateString('es-ES', { weekday: 'long', day: 'numeric', month: 'long' })}`}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Navigation */}
                  <div className="flex items-center justify-between">
                    <button
                      onClick={() => setCurrentStep('information')}
                      className="flex items-center gap-2 text-sm text-[#8C8577] hover:text-[#8B6914] transition-colors"
                    >
                      <ArrowRight className="w-4 h-4 rotate-180" />
                      Volver a información
                    </button>
                    <button
                      onClick={() => canProceedToPayment && setCurrentStep('payment')}
                      disabled={!canProceedToPayment}
                      className="px-8 py-4 bg-[#8B6914] text-white text-sm tracking-[0.15em] uppercase font-medium flex items-center gap-2 hover:bg-[#73570F] transition-colors"
                    >
                      Continuar al Pago
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </motion.div>
              )}

              {/* Step 3: Payment */}
              {currentStep === 'payment' && (
                <motion.div
                  key="payment"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  transition={{ duration: 0.3 }}
                >
                  {/* Address & Shipping Summary */}
                  <div className="bg-white border border-[#E8E0D0] p-6 mb-6">
                    <div className="flex items-center justify-between pb-3 mb-3 border-b border-[#E8E0D0]">
                      <div className="flex items-center gap-3">
                        <MapPin className="w-4 h-4 text-[#8B6914]" />
                        <div>
                          <p className="text-xs text-[#8C8577]">Enviar a</p>
                          <p className="text-sm text-[#2C2418]">{address}, {city}, {state} {zipCode}</p>
                        </div>
                      </div>
                      <button onClick={() => setCurrentStep('information')} className="text-xs text-[#8B6914] hover:underline">Modificar</button>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <Truck className="w-4 h-4 text-[#8B6914]" />
                        <div>
                          <p className="text-xs text-[#8C8577]">Método de envío</p>
                          <p className="text-sm text-[#2C2418]">
                            {shippingMethod === 'standard' ? 'Estándar (5-7 días)' : shippingMethod === 'express' ? 'Express (2-3 días)' : 'Premium (1 día)'}
                            {' · '}
                            <span className={shippingCost === 0 ? 'text-green-600 font-medium' : 'font-medium'}>
                              {shippingCost === 0 ? 'Gratis' : `$${shippingCost}`}
                            </span>
                          </p>
                        </div>
                      </div>
                      <button onClick={() => setCurrentStep('shipping')} className="text-xs text-[#8B6914] hover:underline">Modificar</button>
                    </div>
                  </div>

                  {/* Payment Method */}
                  <div className="bg-white border border-[#E8E0D0] p-6 md:p-8 mb-6">
                    <h2
                      className="text-xl font-bold text-[#2C2418] mb-6 flex items-center gap-3"
                      style={{ fontFamily: 'Playfair Display, serif' }}
                    >
                      <CreditCard className="w-5 h-5 text-[#8B6914]" />
                      Método de Pago
                    </h2>

                    <div className="space-y-3 mb-6">
                      {[
                        { id: 'card' as const, name: 'Tarjeta de Crédito / Débito', desc: 'Visa, Mastercard, American Express', icon: <CreditCard className="w-5 h-5" /> },
                        { id: 'transfer' as const, name: 'Transferencia Bancaria', desc: 'SPEI · Recibirás los datos por correo', icon: <Building2 className="w-5 h-5" /> },
                        { id: 'cash' as const, name: 'Pago en Efectivo', desc: 'OXXO, 7-Eleven · Paga en tu tienda más cercana', icon: <Wallet className="w-5 h-5" /> },
                      ].map((method) => (
                        <label
                          key={method.id}
                          onClick={() => setPaymentMethod(method.id)}
                          className={`flex items-center gap-4 p-5 border-2 cursor-pointer transition-all ${
                            paymentMethod === method.id
                              ? 'border-[#8B6914] bg-[#FAF6EF]'
                              : 'border-[#E8E0D0] hover:border-[#D1C9B8]'
                          }`}
                        >
                          <div
                            className={`w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0 ${
                              paymentMethod === method.id ? 'border-[#8B6914]' : 'border-[#D1C9B8]'
                            }`}
                          >
                            {paymentMethod === method.id && (
                              <div className="w-2.5 h-2.5 rounded-full bg-[#8B6914]" />
                            )}
                          </div>
                          <div className={`${paymentMethod === method.id ? 'text-[#8B6914]' : 'text-[#8C8577]'}`}>
                            {method.icon}
                          </div>
                          <div>
                            <p className="text-sm text-[#2C2418] font-semibold">{method.name}</p>
                            <p className="text-xs text-[#8C8577]">{method.desc}</p>
                          </div>
                        </label>
                      ))}
                    </div>

                    {/* Card Form */}
                    <AnimatePresence>
                      {paymentMethod === 'card' && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.3 }}
                          className="overflow-hidden"
                        >
                          <div className="border-t border-[#E8E0D0] pt-6 space-y-4">
                            <div>
                              <label className="block text-xs uppercase tracking-[0.15em] text-[#8C8577] font-medium mb-2">
                                Número de tarjeta *
                              </label>
                              <div className="relative">
                                <input
                                  type="text"
                                  value={cardNumber}
                                  onChange={(e) => setCardNumber(formatCardNumber(e.target.value))}
                                  placeholder="1234 5678 9012 3456"
                                  maxLength={19}
                                  className="w-full px-4 py-3.5 border border-[#E8E0D0] bg-[#FAF6EF] text-sm text-[#2C2418] placeholder-[#B8AFA0] focus:outline-none focus:border-[#8B6914] focus:bg-white transition-all pr-20"
                                />
                                <div className="absolute right-3 top-1/2 -translate-y-1/2 flex gap-1.5">
                                  {['Visa', 'MC', 'Amex'].map((brand) => (
                                    <div key={brand} className="w-9 h-6 bg-[#E8E0D0] rounded flex items-center justify-center text-[8px] font-bold text-[#8C8577]">
                                      {brand}
                                    </div>
                                  ))}
                                </div>
                              </div>
                            </div>
                            <div>
                              <label className="block text-xs uppercase tracking-[0.15em] text-[#8C8577] font-medium mb-2">
                                Nombre en la tarjeta *
                              </label>
                              <input
                                type="text"
                                value={cardName}
                                onChange={(e) => setCardName(e.target.value)}
                                placeholder="JUAN GARCÍA LÓPEZ"
                                className="w-full px-4 py-3.5 border border-[#E8E0D0] bg-[#FAF6EF] text-sm text-[#2C2418] placeholder-[#B8AFA0] focus:outline-none focus:border-[#8B6914] focus:bg-white transition-all uppercase"
                              />
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                              <div>
                                <label className="block text-xs uppercase tracking-[0.15em] text-[#8C8577] font-medium mb-2">
                                  Fecha de expiración *
                                </label>
                                <input
                                  type="text"
                                  value={cardExpiry}
                                  onChange={(e) => setCardExpiry(formatExpiry(e.target.value))}
                                  placeholder="MM/AA"
                                  maxLength={5}
                                  className="w-full px-4 py-3.5 border border-[#E8E0D0] bg-[#FAF6EF] text-sm text-[#2C2418] placeholder-[#B8AFA0] focus:outline-none focus:border-[#8B6914] focus:bg-white transition-all"
                                />
                              </div>
                              <div>
                                <label className="block text-xs uppercase tracking-[0.15em] text-[#8C8577] font-medium mb-2">
                                  CVV *
                                </label>
                                <div className="relative">
                                  <input
                                    type="text"
                                    value={cardCvv}
                                    onChange={(e) => setCardCvv(e.target.value.replace(/\D/g, '').slice(0, 4))}
                                    placeholder="123"
                                    maxLength={4}
                                    className="w-full px-4 py-3.5 border border-[#E8E0D0] bg-[#FAF6EF] text-sm text-[#2C2418] placeholder-[#B8AFA0] focus:outline-none focus:border-[#8B6914] focus:bg-white transition-all"
                                  />
                                  <Lock className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#8C8577]" />
                                </div>
                              </div>
                            </div>
                          </div>
                        </motion.div>
                      )}

                      {paymentMethod === 'transfer' && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.3 }}
                          className="overflow-hidden"
                        >
                          <div className="border-t border-[#E8E0D0] pt-6">
                            <div className="bg-[#FAF6EF] border border-[#E8E0D0] p-5">
                              <div className="flex items-start gap-3">
                                <Building2 className="w-5 h-5 text-[#8B6914] mt-0.5 flex-shrink-0" />
                                <div>
                                  <p className="text-sm font-medium text-[#2C2418] mb-2">Instrucciones de pago por transferencia</p>
                                  <p className="text-xs text-[#8C8577] leading-relaxed">
                                    Al confirmar tu pedido, recibirás un correo con los datos bancarios para realizar tu transferencia SPEI. Tu pedido será procesado una vez que confirmemos el pago (1-2 horas hábiles).
                                  </p>
                                </div>
                              </div>
                            </div>
                          </div>
                        </motion.div>
                      )}

                      {paymentMethod === 'cash' && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.3 }}
                          className="overflow-hidden"
                        >
                          <div className="border-t border-[#E8E0D0] pt-6">
                            <div className="bg-[#FAF6EF] border border-[#E8E0D0] p-5">
                              <div className="flex items-start gap-3">
                                <Wallet className="w-5 h-5 text-[#8B6914] mt-0.5 flex-shrink-0" />
                                <div>
                                  <p className="text-sm font-medium text-[#2C2418] mb-2">Pago en efectivo</p>
                                  <p className="text-xs text-[#8C8577] leading-relaxed">
                                    Recibirás un número de referencia para pagar en OXXO, 7-Eleven u otras tiendas de conveniencia. El pago debe realizarse dentro de las siguientes 48 horas.
                                  </p>
                                </div>
                              </div>
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>

                  {/* Billing same as shipping */}
                  <div className="bg-white border border-[#E8E0D0] p-6 md:p-8 mb-6">
                    <h2
                      className="text-xl font-bold text-[#2C2418] mb-4 flex items-center gap-3"
                      style={{ fontFamily: 'Playfair Display, serif' }}
                    >
                      <User className="w-5 h-5 text-[#8B6914]" />
                      Dirección de Facturación
                    </h2>
                    <label className="flex items-center gap-3 cursor-pointer">
                      <div className="w-5 h-5 border-2 bg-[#8B6914] border-[#8B6914] flex items-center justify-center">
                        <Check className="w-3 h-3 text-white" />
                      </div>
                      <span className="text-sm text-[#8C8577]">
                        Usar la misma dirección de envío
                      </span>
                    </label>
                  </div>

                  {/* Terms */}
                  <div className="bg-white border border-[#E8E0D0] p-6 mb-6">
                    <label
                      className="flex items-start gap-3 cursor-pointer"
                      onClick={() => setAcceptTerms(!acceptTerms)}
                    >
                      <div
                        className={`w-5 h-5 border-2 flex items-center justify-center transition-colors mt-0.5 flex-shrink-0 ${acceptTerms ? 'bg-[#8B6914] border-[#8B6914]' : 'border-[#D1C9B8]'}`}
                      >
                        {acceptTerms && <Check className="w-3 h-3 text-white" />}
                      </div>
                      <span className="text-sm text-[#8C8577] leading-relaxed">
                        He leído y acepto los <span className="text-[#8B6914] underline cursor-pointer">Términos y Condiciones</span> y la <span className="text-[#8B6914] underline cursor-pointer">Política de Privacidad</span> de ErgoCraft. *
                      </span>
                    </label>
                  </div>

                  {/* Navigation */}
                  <div className="flex items-center justify-between">
                    <button
                      onClick={() => setCurrentStep('shipping')}
                      className="flex items-center gap-2 text-sm text-[#8C8577] hover:text-[#8B6914] transition-colors"
                    >
                      <ArrowRight className="w-4 h-4 rotate-180" />
                      Volver al envío
                    </button>
                    <button
                      onClick={() => canPlaceOrder && handlePlaceOrder()}
                      disabled={!canPlaceOrder}
                      className={`px-10 py-4 text-sm tracking-[0.15em] uppercase font-medium flex items-center gap-2 transition-all ${
                        canPlaceOrder
                          ? 'bg-[#8B6914] text-white hover:bg-[#73570F]'
                          : 'bg-[#E8E0D0] text-[#B8AFA0] cursor-not-allowed'
                      }`}
                    >
                      <Lock className="w-4 h-4" />
                      Confirmar Pedido · ${total.toLocaleString()}
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Right: Order Summary (Desktop) */}
          <div className="hidden lg:block lg:col-span-5">
            <div className="sticky top-28">
              <div className="bg-white border border-[#E8E0D0] p-6">
                <h2
                  className="text-lg font-bold text-[#2C2418] pb-4 border-b border-[#E8E0D0] flex items-center gap-2"
                  style={{ fontFamily: 'Playfair Display, serif' }}
                >
                  <ShoppingBag className="w-5 h-5 text-[#8B6914]" />
                  Resumen del Pedido
                  <span className="text-sm font-normal text-[#8C8577]">({getItemCount()})</span>
                </h2>

                {/* Items */}
                <div className="max-h-[340px] overflow-y-auto py-4 space-y-4 border-b border-[#E8E0D0] custom-scrollbar">
                  {items.map((item) => (
                    <div key={`${item.id}-${item.color}`} className="flex gap-3 group">
                      <div className="relative w-20 h-20 bg-[#F0E6D3] flex-shrink-0 overflow-hidden">
                        <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                        <div className="absolute -top-1 -right-1 w-5 h-5 bg-[#8B6914] rounded-full text-white text-[10px] flex items-center justify-center font-bold">
                          {item.quantity}
                        </div>
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm text-[#2C2418] font-medium truncate leading-tight">{item.name}</p>
                        <p className="text-xs text-[#8C8577] mt-0.5">{item.color}</p>
                        <div className="flex items-center gap-2 mt-1.5">
                          <div className="flex items-center border border-[#E8E0D0]">
                            <button
                              onClick={() => updateQuantity(item.id, item.color, item.quantity - 1)}
                              className="w-6 h-6 flex items-center justify-center hover:bg-[#F0E6D3] transition-colors"
                            >
                              <Minus className="w-2.5 h-2.5 text-[#8C8577]" />
                            </button>
                            <span className="w-6 h-6 flex items-center justify-center text-xs text-[#2C2418] border-x border-[#E8E0D0]">
                              {item.quantity}
                            </span>
                            <button
                              onClick={() => updateQuantity(item.id, item.color, item.quantity + 1)}
                              className="w-6 h-6 flex items-center justify-center hover:bg-[#F0E6D3] transition-colors"
                            >
                              <Plus className="w-2.5 h-2.5 text-[#8C8577]" />
                            </button>
                          </div>
                          <button
                            onClick={() => removeFromCart(item.id, item.color)}
                            className="opacity-0 group-hover:opacity-100 transition-opacity"
                          >
                            <X className="w-3.5 h-3.5 text-[#8C8577] hover:text-red-500" />
                          </button>
                        </div>
                      </div>
                      <div className="text-right flex-shrink-0">
                        <p className="text-sm font-semibold text-[#2C2418]">${(item.price * item.quantity).toLocaleString()}</p>
                        {item.originalPrice && (
                          <p className="text-[10px] text-[#8C8577] line-through">${(item.originalPrice * item.quantity).toLocaleString()}</p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Totals */}
                <div className="py-4 space-y-2.5 border-b border-[#E8E0D0]">
                  <div className="flex justify-between text-sm">
                    <span className="text-[#8C8577]">Subtotal</span>
                    <span className="text-[#2C2418] font-medium">${subtotal.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-[#8C8577]">Envío</span>
                    <span className={`font-medium ${shippingCost === 0 ? 'text-green-600' : 'text-[#2C2418]'}`}>
                      {shippingCost === 0 ? 'Gratis' : `$${shippingCost.toLocaleString()}`}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-[#8C8577]">IVA (16%)</span>
                    <span className="text-[#2C2418] font-medium">${tax.toLocaleString()}</span>
                  </div>
                </div>

                {/* Total */}
                <div className="py-4">
                  <div className="flex justify-between items-center">
                    <span
                      className="text-lg font-bold text-[#2C2418]"
                      style={{ fontFamily: 'Playfair Display, serif' }}
                    >
                      Total
                    </span>
                    <div className="text-right">
                      <span className="text-2xl font-bold text-[#2C2418]">${total.toLocaleString()}</span>
                      <p className="text-[10px] text-[#8C8577]">IVA incluido</p>
                    </div>
                  </div>
                </div>

                {/* Trust */}
                <div className="pt-4 border-t border-[#E8E0D0] space-y-2.5">
                  {[
                    { icon: <Lock className="w-3.5 h-3.5" />, text: 'Pago 100% seguro con encriptación SSL' },
                    { icon: <Truck className="w-3.5 h-3.5" />, text: 'Envío asegurado y con seguimiento' },
                    { icon: <RotateCcw className="w-3.5 h-3.5" />, text: 'Devolución gratuita en 30 días' },
                    { icon: <ShieldCheck className="w-3.5 h-3.5" />, text: 'Garantía de 5 años incluida' },
                  ].map((badge, i) => (
                    <div key={i} className="flex items-center gap-2.5 text-xs text-[#8C8577]">
                      <span className="text-[#8B6914]">{badge.icon}</span>
                      {badge.text}
                    </div>
                  ))}
                </div>

                {/* Payment logos */}
                <div className="mt-4 pt-4 border-t border-[#E8E0D0]">
                  <div className="flex justify-center gap-2">
                    {['Visa', 'MC', 'Amex', 'SPEI', 'OXXO'].map((method) => (
                      <div
                        key={method}
                        className="w-11 h-7 bg-[#F0E6D3] rounded flex items-center justify-center text-[8px] font-bold text-[#8C8577]"
                      >
                        {method}
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Need Help */}
              <div className="mt-4 bg-[#2C2418] text-white p-5">
                <p className="text-sm font-medium mb-1">¿Necesitas ayuda?</p>
                <p className="text-xs text-[#a89e8c] mb-3">Nuestro equipo está disponible para asistirte.</p>
                <div className="flex items-center gap-4">
                  <a href="#" className="flex items-center gap-1.5 text-xs text-[#8B6914] hover:text-white transition-colors">
                    <Phone className="w-3.5 h-3.5" />
                    Llamar
                  </a>
                  <a href="#" className="flex items-center gap-1.5 text-xs text-[#8B6914] hover:text-white transition-colors">
                    <Mail className="w-3.5 h-3.5" />
                    Email
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
