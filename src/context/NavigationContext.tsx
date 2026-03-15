import { createContext, useContext, useState, useCallback, type ReactNode } from 'react';

export interface CategoryRoute {
  type: 'category';
  slug: string;
  name: string;
  parentName?: string;
}

export interface ProductRoute {
  type: 'product';
  slug: string;
}

export interface HomeRoute {
  type: 'home';
}

export interface AboutRoute {
  type: 'about';
}

export interface ShippingRoute {
  type: 'shipping';
}

export interface CartRoute {
  type: 'cart';
}

export interface CheckoutRoute {
  type: 'checkout';
}

export interface ShowroomRoute {
  type: 'showroom';
}

export interface BrandsRoute {
  type: 'brands';
}

export interface ServicesRoute {
  type: 'services';
}

export interface BlogRoute {
  type: 'blog';
  slug: string;
}

export interface ContactRoute {
  type: 'contact';
}

export type Route = HomeRoute | CategoryRoute | ProductRoute | AboutRoute | ShippingRoute | CartRoute | CheckoutRoute | ShowroomRoute | BrandsRoute | ServicesRoute | BlogRoute | ContactRoute;

interface NavigationContextType {
  currentRoute: Route;
  navigate: (route: Route) => void;
  goHome: () => void;
}

const NavigationContext = createContext<NavigationContextType | null>(null);

export function NavigationProvider({ children }: { children: ReactNode }) {
  const [currentRoute, setCurrentRoute] = useState<Route>({ type: 'home' });

  const navigate = useCallback((route: Route) => {
    setCurrentRoute(route);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const goHome = useCallback(() => {
    setCurrentRoute({ type: 'home' });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  return (
    <NavigationContext.Provider value={{ currentRoute, navigate, goHome }}>
      {children}
    </NavigationContext.Provider>
  );
}

export function useNavigation() {
  const ctx = useContext(NavigationContext);
  if (!ctx) throw new Error('useNavigation must be used within NavigationProvider');
  return ctx;
}
