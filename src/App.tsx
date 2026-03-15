import { NavigationProvider, useNavigation } from "@/context/NavigationContext";
import { CartProvider } from "@/context/CartContext";
import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { LogoStrip } from "@/components/LogoStrip";
import { MarqueeStrip } from "@/components/MarqueeStrip";
import { Categories } from "@/components/Categories";
import { ProductGrid } from "@/components/ProductGrid";
import { PromoBanner } from "@/components/PromoBanner";
import { AboutSection } from "@/components/AboutSection";
import { Features } from "@/components/Features";
import { Testimonials } from "@/components/Testimonials";
import { BlogPreview } from "@/components/BlogPreview";
import { GallerySection } from "@/components/GallerySection";
import { Newsletter } from "@/components/Newsletter";
import { Footer } from "@/components/Footer";
import { CategoryPage } from "@/components/CategoryPage";
import { ProductPage } from "@/components/ProductPage";
import { AboutPage } from "@/components/AboutPage";
import { ShippingPage } from "@/components/ShippingPage";
import CartPage from "@/components/CartPage";
import CheckoutPage from "@/components/CheckoutPage";
import { ShowroomPage } from "@/components/ShowroomPage";
import { BrandsPage } from "@/components/BrandsPage";
import { ServicesPage } from "@/components/ServicesPage";
import { BlogPage } from "@/components/BlogPage";
import { ContactPage } from "@/components/ContactPage";

function AppContent() {
  const { currentRoute } = useNavigation();

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <main>
        {currentRoute.type === 'home' && (
          <>
            <Hero />
            <LogoStrip />
            <MarqueeStrip />
            <Categories />
            <ProductGrid />
            <PromoBanner />
            <AboutSection />
            <Features />
            <Testimonials />
            <BlogPreview />
            <GallerySection />
            <Newsletter />
          </>
        )}
        {currentRoute.type === 'category' && (
          <CategoryPage categorySlug={currentRoute.slug} />
        )}
        {currentRoute.type === 'product' && (
          <ProductPage productSlug={currentRoute.slug} />
        )}
        {currentRoute.type === 'about' && (
          <AboutPage />
        )}
        {currentRoute.type === 'shipping' && (
          <ShippingPage />
        )}
        {currentRoute.type === 'cart' && (
          <CartPage />
        )}
        {currentRoute.type === 'checkout' && (
          <CheckoutPage />
        )}
        {currentRoute.type === 'showroom' && (
          <ShowroomPage />
        )}
        {currentRoute.type === 'brands' && (
          <BrandsPage />
        )}
        {currentRoute.type === 'services' && (
          <ServicesPage />
        )}
        {currentRoute.type === 'blog' && (
          <BlogPage blogSlug={currentRoute.slug} />
        )}
        {currentRoute.type === 'contact' && (
          <ContactPage />
        )}
      </main>
      <Footer />
    </div>
  );
}

export function App() {
  return (
    <NavigationProvider>
      <CartProvider>
        <AppContent />
      </CartProvider>
    </NavigationProvider>
  );
}
