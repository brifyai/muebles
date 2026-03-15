import { useState, useEffect, useRef } from 'react';
import { ShoppingBag, Search, Menu, X, ChevronDown, User, Heart } from 'lucide-react';
import { useNavigation } from '@/context/NavigationContext';
import { useCart } from '@/context/CartContext';
import { categories, allProducts } from '@/data/products';

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [shopDropdown, setShopDropdown] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<typeof allProducts>([]);
  const searchInputRef = useRef<HTMLInputElement>(null);
  const { navigate, goHome } = useNavigation();
  const { getItemCount } = useCart();
  const itemCount = getItemCount();

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    if (query.trim().length > 1) {
      const q = query.toLowerCase();
      setSearchResults(allProducts.filter(p => p.name.toLowerCase().includes(q) || p.material.toLowerCase().includes(q) || p.category.toLowerCase().includes(q)).slice(0, 6));
    } else {
      setSearchResults([]);
    }
  };

  useEffect(() => {
    if (searchOpen && searchInputRef.current) searchInputRef.current.focus();
  }, [searchOpen]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <>
      {/* Barra Superior */}
      <div className="bg-dark-brown text-white text-xs tracking-widest text-center py-2.5 uppercase">
        Envío gratuito en pedidos superiores a $500 &nbsp;•&nbsp; Devoluciones fáciles en 30 días
      </div>

      <header
        className={`sticky top-0 z-50 transition-all duration-500 ${
          scrolled
            ? 'bg-white/95 backdrop-blur-md shadow-sm'
            : 'bg-cream'
        }`}
      >
        <div className="max-w-[1400px] mx-auto px-6 lg:px-10">
          <div className="flex items-center justify-between h-20">
            {/* Nav Izquierda */}
            <nav className="hidden lg:flex items-center gap-8">
              <div
                className="relative"
                onMouseEnter={() => setShopDropdown(true)}
                onMouseLeave={() => setShopDropdown(false)}
              >
                <button className="text-[13px] font-medium tracking-wide uppercase text-dark hover:text-brand transition-colors flex items-center gap-1">
                  Tienda <ChevronDown className={`w-3 h-3 transition-transform ${shopDropdown ? 'rotate-180' : ''}`} />
                </button>
                {shopDropdown && (
                  <div className="absolute top-full left-0 pt-2 z-50">
                    <div className="bg-white border border-light-gray shadow-xl min-w-[220px] py-3">
                      {categories.map(cat => (
                        <button
                          key={cat.id}
                          onClick={() => {
                            navigate({ type: 'category', slug: cat.slug, name: cat.name });
                            setShopDropdown(false);
                          }}
                          className="w-full text-left px-6 py-2.5 text-sm text-dark hover:text-brand hover:bg-cream/50 transition-colors flex items-center justify-between group"
                        >
                          <span>{cat.name}</span>
                          <span className="text-[10px] text-warm-gray group-hover:text-brand">{cat.count}</span>
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
              <button onClick={() => navigate({ type: 'category', slug: 'living-room', name: 'Sala de Estar' })} className="text-[13px] font-medium tracking-wide uppercase text-dark hover:text-brand transition-colors">
                Colecciones
              </button>
              <button onClick={() => navigate({ type: 'about' })} className="text-[13px] font-medium tracking-wide uppercase text-dark hover:text-brand transition-colors">
                Nosotros
              </button>
              <button onClick={() => navigate({ type: 'showroom' })} className="text-[13px] font-medium tracking-wide uppercase text-dark hover:text-brand transition-colors">
                Taller
              </button>
            </nav>

            {/* Logo */}
            <button onClick={goHome} className="flex items-center gap-1">
              <div className="flex flex-col items-center">
                <span className="font-serif text-2xl lg:text-3xl font-bold tracking-tight text-dark">
                  Ergo<span className="text-brand">Craft</span>
                </span>
                <span className="text-[8px] tracking-[0.35em] uppercase text-warm-gray -mt-1">
                  Muebles &amp; Diseño
                </span>
              </div>
            </button>

            {/* Nav Derecha */}
            <div className="hidden lg:flex items-center gap-8">
              <button onClick={() => navigate({ type: 'brands' })} className="text-[13px] font-medium tracking-wide uppercase text-dark hover:text-brand transition-colors">
                Artesanos
              </button>
              <button onClick={() => navigate({ type: 'services' })} className="text-[13px] font-medium tracking-wide uppercase text-dark hover:text-brand transition-colors">
                Sostenibilidad
              </button>
              <button onClick={() => navigate({ type: 'contact' })} className="text-[13px] font-medium tracking-wide uppercase text-dark hover:text-brand transition-colors">
                Contáctanos
              </button>
              <div className="flex items-center gap-5 ml-4 pl-4 border-l border-light-gray">
                <button onClick={() => setSearchOpen(!searchOpen)} className="text-dark hover:text-brand transition-colors">
                  <Search className="w-[18px] h-[18px]" strokeWidth={1.5} />
                </button>
                <button onClick={() => navigate({ type: 'contact' })} className="text-dark hover:text-brand transition-colors" title="Mi Cuenta">
                  <User className="w-[18px] h-[18px]" strokeWidth={1.5} />
                </button>
                <button onClick={() => navigate({ type: 'cart' })} className="text-dark hover:text-brand transition-colors" title="Lista de Deseos">
                  <Heart className="w-[18px] h-[18px]" strokeWidth={1.5} />
                </button>
                <button onClick={() => navigate({ type: 'cart' })} className="text-dark hover:text-brand transition-colors relative">
                  <ShoppingBag className="w-[18px] h-[18px]" strokeWidth={1.5} />
                  {itemCount > 0 && (
                    <span className="absolute -top-1.5 -right-1.5 bg-brand text-white text-[9px] font-bold w-4 h-4 flex items-center justify-center rounded-full">
                      {itemCount}
                    </span>
                  )}
                </button>
              </div>
            </div>

            {/* Móvil */}
            <div className="lg:hidden flex items-center gap-4">
              <button onClick={() => navigate({ type: 'cart' })} className="text-dark relative">
                <ShoppingBag className="w-5 h-5" strokeWidth={1.5} />
                {itemCount > 0 && (
                  <span className="absolute -top-1.5 -right-1.5 bg-brand text-white text-[9px] font-bold w-4 h-4 flex items-center justify-center rounded-full">
                    {itemCount}
                  </span>
                )}
              </button>
              <button onClick={() => setMobileOpen(!mobileOpen)} className="text-dark">
                {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Menú Móvil */}
        {mobileOpen && (
          <div className="lg:hidden bg-white border-t border-light-gray">
            <div className="px-6 py-6 space-y-4">
              <p className="text-[10px] font-bold tracking-[0.2em] uppercase text-warm-gray mb-2">Comprar por Categoría</p>
              {categories.map(cat => (
                <button
                  key={cat.id}
                  onClick={() => {
                    navigate({ type: 'category', slug: cat.slug, name: cat.name });
                    setMobileOpen(false);
                  }}
                  className="block text-sm font-medium tracking-wide text-dark hover:text-brand transition-colors"
                >
                  {cat.name}
                </button>
              ))}
              <div className="border-t border-light-gray pt-4 mt-4 space-y-4">
                <button onClick={() => { goHome(); setMobileOpen(false); }} className="block text-sm font-medium tracking-wide uppercase text-dark">Colecciones</button>
                <button onClick={() => { navigate({ type: 'about' }); setMobileOpen(false); }} className="block text-sm font-medium tracking-wide uppercase text-dark">Nosotros</button>
                <button onClick={() => { navigate({ type: 'showroom' }); setMobileOpen(false); }} className="block text-sm font-medium tracking-wide uppercase text-dark">Taller</button>
                <button onClick={() => { navigate({ type: 'brands' }); setMobileOpen(false); }} className="block text-sm font-medium tracking-wide uppercase text-dark">Artesanos</button>
                <button onClick={() => { navigate({ type: 'services' }); setMobileOpen(false); }} className="block text-sm font-medium tracking-wide uppercase text-dark">Sostenibilidad</button>
                <button onClick={() => { navigate({ type: 'shipping' }); setMobileOpen(false); }} className="block text-sm font-medium tracking-wide uppercase text-dark">Envíos y Devoluciones</button>
                <button onClick={() => { navigate({ type: 'contact' }); setMobileOpen(false); }} className="block text-sm font-medium tracking-wide uppercase text-dark">Contáctanos</button>
              </div>
            </div>
          </div>
        )}
      </header>

      {/* Buscador Overlay */}
      {searchOpen && (
        <div className="fixed inset-0 z-[60]">
          <div className="absolute inset-0 bg-dark/60 backdrop-blur-sm" onClick={() => { setSearchOpen(false); setSearchQuery(''); setSearchResults([]); }} />
          <div className="relative max-w-2xl mx-auto mt-28 px-6">
            <div className="bg-white shadow-2xl border border-light-gray">
              <div className="flex items-center border-b border-light-gray px-6">
                <Search className="w-5 h-5 text-warm-gray flex-shrink-0" />
                <input
                  ref={searchInputRef}
                  type="text"
                  value={searchQuery}
                  onChange={(e) => handleSearch(e.target.value)}
                  placeholder="Buscar productos, categorías..."
                  className="flex-1 px-4 py-5 text-dark text-lg outline-none placeholder:text-warm-gray bg-transparent"
                />
                <button onClick={() => { setSearchOpen(false); setSearchQuery(''); setSearchResults([]); }} className="text-warm-gray hover:text-dark transition-colors">
                  <X className="w-5 h-5" />
                </button>
              </div>
              {searchResults.length > 0 && (
                <div className="max-h-[400px] overflow-y-auto">
                  {searchResults.map(product => (
                    <button
                      key={product.id}
                      onClick={() => { navigate({ type: 'product', slug: product.slug }); setSearchOpen(false); setSearchQuery(''); setSearchResults([]); }}
                      className="w-full flex items-center gap-4 px-6 py-4 hover:bg-cream/50 transition-colors text-left border-b border-light-gray/50 last:border-0"
                    >
                      <img src={product.image} alt={product.name} className="w-14 h-14 object-cover flex-shrink-0" />
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-semibold text-dark truncate">{product.name}</p>
                        <p className="text-xs text-warm-gray">{product.material}</p>
                      </div>
                      <p className="text-sm font-bold text-dark">${product.price.toLocaleString()}</p>
                    </button>
                  ))}
                </div>
              )}
              {searchQuery.length > 1 && searchResults.length === 0 && (
                <div className="px-6 py-10 text-center">
                  <p className="text-warm-gray text-sm">No se encontraron resultados para "<span className="text-dark font-medium">{searchQuery}</span>"</p>
                </div>
              )}
              {searchQuery.length <= 1 && (
                <div className="px-6 py-6">
                  <p className="text-[10px] font-bold tracking-[0.2em] uppercase text-warm-gray mb-3">Búsquedas populares</p>
                  <div className="flex flex-wrap gap-2">
                    {['Sofá', 'Mesa de café', 'Escritorio', 'Silla', 'Lámpara'].map(term => (
                      <button key={term} onClick={() => handleSearch(term)} className="px-4 py-2 bg-cream text-xs font-medium text-dark hover:bg-brand hover:text-white transition-colors">
                        {term}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
