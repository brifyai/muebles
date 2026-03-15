import { useState, useMemo } from 'react';
import { Star, Heart, ShoppingBag, ChevronDown, Grid3X3, LayoutList, X, SlidersHorizontal, ChevronRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigation } from '@/context/NavigationContext';
import { allProducts, categories, type Product } from '@/data/products';

type SortOption = 'default' | 'price-asc' | 'price-desc' | 'rating' | 'newest';

interface Filters {
  priceRange: [number, number];
  materials: string[];
  colors: string[];
  inStock: boolean;
  subcategory: string;
}

const colorOptions = [
  { name: 'Black', value: '#1A1A1A' },
  { name: 'Brown', value: '#2C2418' },
  { name: 'Gold', value: '#8B6914' },
  { name: 'Cream', value: '#E8E4DD' },
  { name: 'Gray', value: '#8C8577' },
  { name: 'Green', value: '#556B2F' },
  { name: 'Light Gold', value: '#C4A237' },
];

const materialOptions = ['Leather', 'Velvet', 'Linen', 'Wood', 'Walnut', 'Oak', 'Marble', 'Metal', 'Glass', 'Mesh', 'Rattan'];

export function CategoryPage({ categorySlug }: { categorySlug: string }) {
  const { navigate, goHome } = useNavigation();
  const category = categories.find(c => c.slug === categorySlug);

  const [sortBy, setSortBy] = useState<SortOption>('default');
  const [gridCols, setGridCols] = useState<3 | 4>(3);
  const [showFilters, setShowFilters] = useState(true);
  const [mobileFilters, setMobileFilters] = useState(false);
  const [filters, setFilters] = useState<Filters>({
    priceRange: [0, 6000],
    materials: [],
    colors: [],
    inStock: false,
    subcategory: '',
  });

  // Collapsible filter sections
  const [openSections, setOpenSections] = useState({
    subcategories: true,
    price: true,
    color: true,
    material: true,
    availability: false,
  });

  const toggleSection = (key: keyof typeof openSections) => {
    setOpenSections(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const categoryProducts = useMemo(() => {
    if (!category) return [];
    let products = allProducts.filter(p => p.category === categorySlug);

    // Apply filters
    if (filters.subcategory) {
      products = products.filter(p => p.subcategory === filters.subcategory);
    }
    if (filters.materials.length > 0) {
      products = products.filter(p => filters.materials.includes(p.material));
    }
    if (filters.colors.length > 0) {
      products = products.filter(p =>
        p.colors.some(c => filters.colors.includes(c))
      );
    }
    if (filters.inStock) {
      products = products.filter(p => p.inStock);
    }
    products = products.filter(
      p => p.price >= filters.priceRange[0] && p.price <= filters.priceRange[1]
    );

    // Sort
    switch (sortBy) {
      case 'price-asc':
        products.sort((a, b) => a.price - b.price);
        break;
      case 'price-desc':
        products.sort((a, b) => b.price - a.price);
        break;
      case 'rating':
        products.sort((a, b) => b.rating - a.rating);
        break;
      case 'newest':
        products.sort((a, b) => (b.badge === 'New' ? 1 : 0) - (a.badge === 'New' ? 1 : 0));
        break;
    }

    return products;
  }, [category, categorySlug, filters, sortBy]);

  const activeFilterCount = [
    filters.subcategory ? 1 : 0,
    filters.materials.length,
    filters.colors.length,
    filters.inStock ? 1 : 0,
    filters.priceRange[0] > 0 || filters.priceRange[1] < 6000 ? 1 : 0,
  ].reduce((a, b) => a + b, 0);

  const clearFilters = () => {
    setFilters({
      priceRange: [0, 6000],
      materials: [],
      colors: [],
      inStock: false,
      subcategory: '',
    });
  };

  if (!category) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <p className="text-warm-gray">Category not found.</p>
      </div>
    );
  }

  const FilterSidebar = ({ mobile = false }: { mobile?: boolean }) => (
    <div className={mobile ? '' : 'sticky top-28'}>
      {/* Subcategories */}
      {category.subcategories && category.subcategories.length > 0 && (
        <div className="border-b border-light-gray pb-6 mb-6">
          <button
            onClick={() => toggleSection('subcategories')}
            className="flex items-center justify-between w-full text-left mb-4"
          >
            <h4 className="text-xs font-bold tracking-[0.2em] uppercase text-dark">
              Product Categories
            </h4>
            <ChevronDown
              className={`w-4 h-4 text-warm-gray transition-transform ${openSections.subcategories ? 'rotate-180' : ''}`}
            />
          </button>
          {openSections.subcategories && (
            <ul className="space-y-2.5">
              <li>
                <button
                  onClick={() => setFilters(f => ({ ...f, subcategory: '' }))}
                  className={`text-sm transition-colors flex items-center justify-between w-full ${
                    !filters.subcategory ? 'text-brand font-semibold' : 'text-warm-gray hover:text-dark'
                  }`}
                >
                  <span>All {category.name}</span>
                  <span className="text-xs text-warm-gray">({allProducts.filter(p => p.category === categorySlug).length})</span>
                </button>
              </li>
              {category.subcategories.map(sub => (
                <li key={sub.slug}>
                  <button
                    onClick={() => setFilters(f => ({ ...f, subcategory: sub.slug }))}
                    className={`text-sm transition-colors flex items-center justify-between w-full ${
                      filters.subcategory === sub.slug ? 'text-brand font-semibold' : 'text-warm-gray hover:text-dark'
                    }`}
                  >
                    <span>{sub.name}</span>
                    <span className="text-xs text-warm-gray">({allProducts.filter(p => p.subcategory === sub.slug).length})</span>
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
      )}

      {/* Price Range */}
      <div className="border-b border-light-gray pb-6 mb-6">
        <button
          onClick={() => toggleSection('price')}
          className="flex items-center justify-between w-full text-left mb-4"
        >
          <h4 className="text-xs font-bold tracking-[0.2em] uppercase text-dark">
            Price Range
          </h4>
          <ChevronDown
            className={`w-4 h-4 text-warm-gray transition-transform ${openSections.price ? 'rotate-180' : ''}`}
          />
        </button>
        {openSections.price && (
          <div>
            <div className="relative pt-2 pb-4">
              <input
                type="range"
                min="0"
                max="6000"
                step="100"
                value={filters.priceRange[1]}
                onChange={(e) =>
                  setFilters(f => ({
                    ...f,
                    priceRange: [f.priceRange[0], Number(e.target.value)],
                  }))
                }
                className="w-full h-1 bg-light-gray rounded-lg appearance-none cursor-pointer accent-brand"
              />
            </div>
            <div className="flex items-center gap-3">
              <div className="flex-1 border border-light-gray px-3 py-2">
                <span className="text-[10px] text-warm-gray uppercase tracking-wider block">Min</span>
                <span className="text-sm font-semibold text-dark">${filters.priceRange[0].toLocaleString()}</span>
              </div>
              <span className="text-warm-gray">—</span>
              <div className="flex-1 border border-light-gray px-3 py-2">
                <span className="text-[10px] text-warm-gray uppercase tracking-wider block">Max</span>
                <span className="text-sm font-semibold text-dark">${filters.priceRange[1].toLocaleString()}</span>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Colors */}
      <div className="border-b border-light-gray pb-6 mb-6">
        <button
          onClick={() => toggleSection('color')}
          className="flex items-center justify-between w-full text-left mb-4"
        >
          <h4 className="text-xs font-bold tracking-[0.2em] uppercase text-dark">
            Color
          </h4>
          <ChevronDown
            className={`w-4 h-4 text-warm-gray transition-transform ${openSections.color ? 'rotate-180' : ''}`}
          />
        </button>
        {openSections.color && (
          <div className="flex flex-wrap gap-2.5">
            {colorOptions.map(color => {
              const isActive = filters.colors.includes(color.value);
              return (
                <button
                  key={color.value}
                  onClick={() =>
                    setFilters(f => ({
                      ...f,
                      colors: isActive
                        ? f.colors.filter(c => c !== color.value)
                        : [...f.colors, color.value],
                    }))
                  }
                  className="group flex flex-col items-center gap-1.5"
                  title={color.name}
                >
                  <span
                    className={`w-8 h-8 rounded-full border-2 transition-all ${
                      isActive ? 'border-brand scale-110 ring-2 ring-brand/20' : 'border-light-gray hover:border-warm-gray'
                    }`}
                    style={{ backgroundColor: color.value }}
                  />
                  <span className="text-[9px] tracking-wider uppercase text-warm-gray group-hover:text-dark transition-colors">
                    {color.name}
                  </span>
                </button>
              );
            })}
          </div>
        )}
      </div>

      {/* Material */}
      <div className="border-b border-light-gray pb-6 mb-6">
        <button
          onClick={() => toggleSection('material')}
          className="flex items-center justify-between w-full text-left mb-4"
        >
          <h4 className="text-xs font-bold tracking-[0.2em] uppercase text-dark">
            Material
          </h4>
          <ChevronDown
            className={`w-4 h-4 text-warm-gray transition-transform ${openSections.material ? 'rotate-180' : ''}`}
          />
        </button>
        {openSections.material && (
          <div className="space-y-2.5">
            {materialOptions.map(mat => {
              const isActive = filters.materials.includes(mat);
              const count = allProducts.filter(p => p.category === categorySlug && p.material === mat).length;
              if (count === 0) return null;
              return (
                <label
                  key={mat}
                  className="flex items-center gap-3 cursor-pointer group"
                >
                  <span
                    className={`w-4 h-4 border flex items-center justify-center transition-all ${
                      isActive ? 'bg-brand border-brand' : 'border-light-gray group-hover:border-warm-gray'
                    }`}
                  >
                    {isActive && (
                      <svg className="w-2.5 h-2.5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                      </svg>
                    )}
                  </span>
                  <span
                    className={`text-sm transition-colors flex-1 ${isActive ? 'text-dark font-medium' : 'text-warm-gray group-hover:text-dark'}`}
                    onClick={() =>
                      setFilters(f => ({
                        ...f,
                        materials: isActive
                          ? f.materials.filter(m => m !== mat)
                          : [...f.materials, mat],
                      }))
                    }
                  >
                    {mat}
                  </span>
                  <span className="text-xs text-warm-gray">({count})</span>
                </label>
              );
            })}
          </div>
        )}
      </div>

      {/* In Stock */}
      <div className="pb-6">
        <button
          onClick={() => toggleSection('availability')}
          className="flex items-center justify-between w-full text-left mb-4"
        >
          <h4 className="text-xs font-bold tracking-[0.2em] uppercase text-dark">
            Availability
          </h4>
          <ChevronDown
            className={`w-4 h-4 text-warm-gray transition-transform ${openSections.availability ? 'rotate-180' : ''}`}
          />
        </button>
        {openSections.availability && (
          <label className="flex items-center gap-3 cursor-pointer group">
            <span
              className={`w-4 h-4 border flex items-center justify-center transition-all ${
                filters.inStock ? 'bg-brand border-brand' : 'border-light-gray group-hover:border-warm-gray'
              }`}
              onClick={() => setFilters(f => ({ ...f, inStock: !f.inStock }))}
            >
              {filters.inStock && (
                <svg className="w-2.5 h-2.5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
              )}
            </span>
            <span className="text-sm text-warm-gray group-hover:text-dark transition-colors">
              In Stock Only
            </span>
          </label>
        )}
      </div>

      {activeFilterCount > 0 && (
        <button
          onClick={clearFilters}
          className="w-full mt-4 py-3 text-xs font-semibold tracking-widest uppercase text-brand border border-brand hover:bg-brand hover:text-white transition-all"
        >
          Clear All Filters ({activeFilterCount})
        </button>
      )}
    </div>
  );

  return (
    <section className="bg-white min-h-screen">
      {/* Category Hero Banner */}
      <div className="relative h-[280px] md:h-[340px] overflow-hidden">
        <img
          src={category.image}
          alt={category.name}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-dark/80 via-dark/40 to-dark/20" />
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-6">
          {/* Breadcrumbs */}
          <nav className="flex items-center gap-2 text-xs text-white/60 mb-5 tracking-wider uppercase">
            <button onClick={goHome} className="hover:text-white transition-colors">
              Home
            </button>
            <ChevronRight className="w-3 h-3" />
            <button onClick={goHome} className="hover:text-white transition-colors">
              Shop
            </button>
            <ChevronRight className="w-3 h-3" />
            <span className="text-white font-medium">{category.name}</span>
          </nav>
          <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-3">
            {category.name}
          </h1>
          <p className="text-white/70 text-base md:text-lg max-w-2xl leading-relaxed">
            {category.description}
          </p>
        </div>
      </div>

      {/* Toolbar */}
      <div className="border-b border-light-gray bg-cream/50">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-10">
          <div className="flex items-center justify-between py-4">
            {/* Left */}
            <div className="flex items-center gap-4">
              <button
                onClick={() => setShowFilters(!showFilters)}
                className="hidden lg:flex items-center gap-2 text-xs font-semibold tracking-widest uppercase text-dark hover:text-brand transition-colors"
              >
                <SlidersHorizontal className="w-4 h-4" />
                {showFilters ? 'Hide' : 'Show'} Filters
              </button>
              <button
                onClick={() => setMobileFilters(true)}
                className="lg:hidden flex items-center gap-2 text-xs font-semibold tracking-widest uppercase text-dark"
              >
                <SlidersHorizontal className="w-4 h-4" />
                Filters
                {activeFilterCount > 0 && (
                  <span className="bg-brand text-white text-[10px] w-5 h-5 flex items-center justify-center rounded-full">
                    {activeFilterCount}
                  </span>
                )}
              </button>
              <span className="text-sm text-warm-gray hidden md:inline">
                Showing {categoryProducts.length} {categoryProducts.length === 1 ? 'result' : 'results'}
              </span>
            </div>

            {/* Right */}
            <div className="flex items-center gap-4">
              {/* Sort */}
              <div className="relative">
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as SortOption)}
                  className="appearance-none bg-white border border-light-gray pl-4 pr-10 py-2.5 text-xs font-medium tracking-wider uppercase text-dark cursor-pointer focus:outline-none focus:border-brand"
                >
                  <option value="default">Default Sorting</option>
                  <option value="price-asc">Price: Low to High</option>
                  <option value="price-desc">Price: High to Low</option>
                  <option value="rating">Highest Rated</option>
                  <option value="newest">Newest First</option>
                </select>
                <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-warm-gray pointer-events-none" />
              </div>

              {/* Grid Toggle */}
              <div className="hidden md:flex items-center border border-light-gray">
                <button
                  onClick={() => setGridCols(3)}
                  className={`p-2.5 transition-colors ${gridCols === 3 ? 'bg-dark text-white' : 'text-warm-gray hover:text-dark'}`}
                >
                  <Grid3X3 className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setGridCols(4)}
                  className={`p-2.5 transition-colors ${gridCols === 4 ? 'bg-dark text-white' : 'text-warm-gray hover:text-dark'}`}
                >
                  <LayoutList className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Active Filters Tags */}
      {activeFilterCount > 0 && (
        <div className="border-b border-light-gray bg-white">
          <div className="max-w-[1400px] mx-auto px-6 lg:px-10 py-3">
            <div className="flex items-center flex-wrap gap-2">
              <span className="text-xs font-semibold tracking-wider uppercase text-warm-gray mr-2">Active:</span>
              {filters.subcategory && (
                <FilterTag
                  label={category.subcategories?.find(s => s.slug === filters.subcategory)?.name || ''}
                  onRemove={() => setFilters(f => ({ ...f, subcategory: '' }))}
                />
              )}
              {filters.materials.map(m => (
                <FilterTag
                  key={m}
                  label={m}
                  onRemove={() => setFilters(f => ({ ...f, materials: f.materials.filter(x => x !== m) }))}
                />
              ))}
              {filters.colors.map(c => (
                <FilterTag
                  key={c}
                  label={colorOptions.find(co => co.value === c)?.name || c}
                  onRemove={() => setFilters(f => ({ ...f, colors: f.colors.filter(x => x !== c) }))}
                  color={c}
                />
              ))}
              {(filters.priceRange[0] > 0 || filters.priceRange[1] < 6000) && (
                <FilterTag
                  label={`$${filters.priceRange[0]} - $${filters.priceRange[1]}`}
                  onRemove={() => setFilters(f => ({ ...f, priceRange: [0, 6000] }))}
                />
              )}
              <button
                onClick={clearFilters}
                className="ml-2 text-xs font-semibold tracking-wider uppercase text-brand hover:text-brand-dark transition-colors underline"
              >
                Clear all
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Main Content */}
      <div className="max-w-[1400px] mx-auto px-6 lg:px-10 py-10 lg:py-14">
        <div className="flex gap-10">
          {/* Sidebar */}
          <AnimatePresence>
            {showFilters && (
              <motion.aside
                initial={{ width: 0, opacity: 0 }}
                animate={{ width: 280, opacity: 1 }}
                exit={{ width: 0, opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="hidden lg:block flex-shrink-0 overflow-hidden"
              >
                <div className="w-[280px] pr-4">
                  <FilterSidebar />
                </div>
              </motion.aside>
            )}
          </AnimatePresence>

          {/* Product Grid */}
          <div className="flex-1 min-w-0">
            {categoryProducts.length === 0 ? (
              <div className="text-center py-20">
                <p className="text-warm-gray text-lg mb-2">No products found</p>
                <p className="text-sm text-warm-gray mb-6">Try adjusting your filters to find what you're looking for.</p>
                <button
                  onClick={clearFilters}
                  className="inline-flex items-center gap-2 bg-dark text-white px-8 py-3 text-xs font-semibold tracking-widest uppercase hover:bg-brand transition-colors"
                >
                  Clear Filters
                </button>
              </div>
            ) : (
              <div className={`grid gap-6 ${
                gridCols === 3
                  ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3'
                  : 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'
              }`}>
                {categoryProducts.map((product, i) => (
                  <ProductCard key={product.id} product={product} index={i} />
                ))}
              </div>
            )}

            {/* Results count bottom */}
            {categoryProducts.length > 0 && (
              <div className="mt-12 pt-8 border-t border-light-gray text-center">
                <p className="text-sm text-warm-gray">
                  Showing all {categoryProducts.length} results
                </p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Related Categories */}
      <div className="border-t border-light-gray bg-cream/50">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-10 py-16">
          <h3 className="font-serif text-2xl font-bold text-dark mb-8 text-center">
            Explore Other <span className="italic">Collections</span>
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {categories
              .filter(c => c.slug !== categorySlug)
              .map(cat => (
                <button
                  key={cat.id}
                  onClick={() =>
                    navigate({ type: 'category', slug: cat.slug, name: cat.name })
                  }
                  className="group relative h-48 overflow-hidden"
                >
                  <img
                    src={cat.image}
                    alt={cat.name}
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-dark/40 group-hover:bg-dark/55 transition-colors" />
                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <h4 className="font-serif text-xl font-bold text-white">{cat.name}</h4>
                    <p className="text-xs text-white/60 tracking-wider uppercase mt-1">{cat.count} Products</p>
                  </div>
                </button>
              ))}
          </div>
        </div>
      </div>

      {/* Mobile Filter Drawer */}
      <AnimatePresence>
        {mobileFilters && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-dark/50 z-50"
              onClick={() => setMobileFilters(false)}
            />
            <motion.div
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'tween', duration: 0.3 }}
              className="fixed inset-y-0 left-0 w-[320px] max-w-[90vw] bg-white z-50 overflow-y-auto"
            >
              <div className="p-6">
                <div className="flex items-center justify-between mb-8">
                  <h3 className="text-sm font-bold tracking-[0.2em] uppercase text-dark">Filters</h3>
                  <button onClick={() => setMobileFilters(false)}>
                    <X className="w-5 h-5 text-dark" />
                  </button>
                </div>
                <FilterSidebar mobile />
                <button
                  onClick={() => setMobileFilters(false)}
                  className="w-full mt-6 bg-dark text-white py-3.5 text-xs font-semibold tracking-widest uppercase hover:bg-brand transition-colors"
                >
                  Apply Filters ({categoryProducts.length} results)
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </section>
  );
}

function ProductCard({ product, index }: { product: Product; index: number }) {
  const [isHovered, setIsHovered] = useState(false);
  const { navigate } = useNavigation();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.05 }}
      className="group bg-white cursor-pointer"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={() => navigate({ type: 'product', slug: product.slug })}
    >
      {/* Image */}
      <div className="relative aspect-[3/4] overflow-hidden bg-cream/50">
        <img
          src={isHovered && product.hoverImage ? product.hoverImage : product.image}
          alt={product.name}
          className="w-full h-full object-cover transition-all duration-700 group-hover:scale-105"
        />
        {product.badge && (
          <span
            className={`absolute top-4 left-4 text-[10px] font-bold tracking-widest uppercase px-3 py-1.5 ${
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

        {/* Wishlist */}
        <button className="absolute top-4 right-4 w-9 h-9 bg-white/80 backdrop-blur-sm flex items-center justify-center text-dark hover:text-red-500 transition-all opacity-0 group-hover:opacity-100">
          <Heart className="w-4 h-4" strokeWidth={1.5} />
        </button>

        {/* Add to Cart */}
        <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
          <button className="w-full bg-dark/90 backdrop-blur-sm text-white py-3.5 text-xs font-semibold tracking-widest uppercase flex items-center justify-center gap-2 hover:bg-brand transition-colors">
            <ShoppingBag className="w-4 h-4" strokeWidth={1.5} />
            Add to Cart
          </button>
        </div>
      </div>

      {/* Info */}
      <div className="p-5">
        <div className="flex items-center gap-1 mb-2">
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
          <span className="text-[11px] text-warm-gray ml-1">({product.reviews})</span>
        </div>
        <h3 className="font-semibold text-dark text-[15px] mb-2 group-hover:text-brand transition-colors leading-snug">
          {product.name}
        </h3>
        <div className="flex items-center gap-3">
          <span className="text-lg font-bold text-dark">
            ${product.price.toLocaleString()}
          </span>
          {product.oldPrice && (
            <span className="text-sm text-warm-gray line-through">
              ${product.oldPrice.toLocaleString()}
            </span>
          )}
        </div>
        {/* Color swatches */}
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
  );
}

function FilterTag({
  label,
  onRemove,
  color,
}: {
  label: string;
  onRemove: () => void;
  color?: string;
}) {
  return (
    <span className="inline-flex items-center gap-1.5 bg-cream border border-light-gray px-3 py-1.5 text-xs font-medium tracking-wider text-dark">
      {color && (
        <span className="w-3 h-3 rounded-full border border-light-gray" style={{ backgroundColor: color }} />
      )}
      {label}
      <button onClick={onRemove} className="text-warm-gray hover:text-dark transition-colors ml-0.5">
        <X className="w-3 h-3" />
      </button>
    </span>
  );
}
