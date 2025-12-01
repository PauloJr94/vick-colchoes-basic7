import { useEffect, useState } from "react";
import { User, Menu, MapPin, Phone, Mail, Search, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useNavigate, useLocation } from "react-router-dom";
import { useAdmin } from "@/hooks/useAdmin";
import { useCategoryFilter } from "@/hooks/useCategoryFilter";
import { useProductSearchContext } from "@/hooks/useProductSearchContext";
import logo from "@/assets/logo.jpg";

const Header = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { isAdmin } = useAdmin();
  const { setSelectedCategory } = useCategoryFilter();
  const { searchQuery, setSearchQuery } = useProductSearchContext();

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsMobileMenuOpen(false);
    };
    if (isMobileMenuOpen) {
      window.addEventListener("keydown", onKeyDown);
      document.body.style.overflow = "hidden";
    }
    return () => {
      window.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = "";
    };
  }, [isMobileMenuOpen]);

  const handleCategoryClick = (category: string) => {
    setSelectedCategory(category.toLowerCase());
    setSearchQuery("");

    const scrollToProducts = () => {
      setTimeout(() => {
        const element = document.getElementById("produtos");
        if (element) {
          element.scrollIntoView({ behavior: "smooth", block: "start" });
        }
      }, 100);
    };

    if (location.pathname !== "/") {
      navigate("/", { replace: false });
      setTimeout(scrollToProducts, 800);
    } else {
      scrollToProducts();
    }
  };

  const handleMobileNav = (category: string | null) => {
    if (category) handleCategoryClick(category);
    setIsMobileMenuOpen(false);
  };

  const handleSearchKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      const scrollToProducts = () => {
        setTimeout(() => {
          const element = document.getElementById("produtos");
          if (element) {
            element.scrollIntoView({ behavior: "smooth", block: "start" });
          }
        }, 100);
      };

      if (location.pathname !== "/") {
        navigate("/", { replace: false });
        setTimeout(scrollToProducts, 800);
      } else {
        scrollToProducts();
      }
    }
  };

  return (
    <header className="sticky top-0 z-50 bg-background border-b border-border">
      {/* Top Bar */}
      <div className="bg-primary text-primary-foreground">
        <div className="container mx-auto px-3 sm:px-4 py-1.5 sm:py-2">
          <div className="flex flex-wrap items-center justify-between gap-1.5 sm:gap-2 text-xs sm:text-sm">
            <div className="flex items-center gap-2 sm:gap-4">
              <a href="tel:+5587991018888" className="flex items-center gap-1 sm:gap-2 hover:text-accent transition-colors">
                <Phone className="h-3 w-3" />
                <span className="hidden sm:inline">(87) 99101-8888</span>
              </a>
              <a href="mailto:vickcolchoes@gmail.com" className="flex items-center gap-1 sm:gap-2 hover:text-accent transition-colors">
                <Mail className="h-3 w-3" />
                <span className="hidden md:inline">vickcolchoes@gmail.com</span>
              </a>
            </div>
            <div className="flex items-center gap-1 sm:gap-2">
              <MapPin className="h-3 w-3" />
              <span className="text-xs">Garanhuns - PE / Caruaru - PE</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Header */}
      <div className="container mx-auto px-3 sm:px-4 py-3 sm:py-4">
        <div className="flex items-center justify-between gap-2 sm:gap-4">
          {/* Logo */}
          <a href="/" className="flex items-center gap-2 sm:gap-3">
            <img src={logo} alt="V Colchões" className="h-10 sm:h-12 w-10 sm:w-12 rounded-full object-cover" />
            <div className="block min-w-0">
              <h1 className="text-base sm:text-lg md:text-xl font-bold text-foreground leading-tight truncate">Vick Colchões</h1>
              <p className="hidden sm:block text-xs text-muted-foreground">Sua melhor noite de sono</p>
            </div>
          </a>

          {/* Navigation */}
          <nav className="hidden lg:flex items-center gap-6">
            <button
              onClick={() => handleCategoryClick("colchões")}
              className="text-sm font-medium text-foreground hover:text-accent transition-colors"
            >
              Colchões
            </button>
            <button
              onClick={() => handleCategoryClick("bases")}
              className="text-sm font-medium text-foreground hover:text-accent transition-colors"
            >
              Bases
            </button>
            <button
              onClick={() => handleCategoryClick("conjuntos")}
              className="text-sm font-medium text-foreground hover:text-accent transition-colors"
            >
              Conjuntos
            </button>
            <button
              onClick={() => handleCategoryClick("cabeceiras")}
              className="text-sm font-medium text-foreground hover:text-accent transition-colors"
            >
              Cabeceiras
            </button>
            <button
              onClick={() => handleCategoryClick("travesseiros")}
              className="text-sm font-medium text-foreground hover:text-accent transition-colors"
            >
              Travesseiros
            </button>
            <button
              onClick={() => handleCategoryClick("acessórios")}
              className="text-sm font-medium text-foreground hover:text-accent transition-colors"
            >
              Acessórios
            </button>
            <a href="#contato" className="text-sm font-medium text-foreground hover:text-accent transition-colors">
              Contato
            </a>
          </nav>

          {/* Actions */}
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="icon"
              className="hover:bg-accent/10"
              onClick={() => navigate(isAdmin ? '/admin/dashboard' : '/admin/login')}
              aria-label="Acessar painel administrativo"
            >
              <User className="h-5 w-5" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="lg:hidden"
              onClick={() => setIsMobileMenuOpen(true)}
              aria-label="Abrir menu"
              aria-expanded={isMobileMenuOpen}
              aria-controls="mobile-menu"
            >
              <Menu className="h-5 w-5" />
            </Button>
          </div>
        </div>

        {/* Search Bar */}
        <div className="mt-2 sm:mt-3 md:mt-4">
          <div className="relative">
            <Search className="absolute left-2 sm:left-3 top-1/2 transform -translate-y-1/2 h-3.5 w-3.5 sm:h-4 sm:w-4 text-muted-foreground" />
            <Input
              type="text"
              placeholder="Buscar por nome ou categoria..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyDown={handleSearchKeyDown}
              className="pl-8 sm:pl-10 pr-3 sm:pr-4 py-1.5 sm:py-2 w-full text-sm sm:text-base"
            />
          </div>
        </div>
      </div>

      {/* Mobile Sidebar Menu */}
      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 z-[60] bg-black/40 backdrop-blur-[1px]"
          onClick={() => setIsMobileMenuOpen(false)}
          aria-hidden="true"
        >
          <div
            id="mobile-menu"
            role="dialog"
            aria-modal="true"
            className="absolute right-0 top-0 h-full w-80 max-w-[85vw] bg-background border-l border-border shadow-xl p-4 animate-in slide-in-from-right fade-in"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <img src={logo} alt="V Colchões" className="h-10 w-10 rounded-full object-cover" />
                <span className="text-base font-semibold">Vick Colchões</span>
              </div>
              <Button
                variant="ghost"
                size="icon"
                aria-label="Fechar menu"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <X className="h-5 w-5" />
              </Button>
            </div>

            <nav className="grid gap-2">
              <button
                onClick={() => handleMobileNav("colchões")}
                className="w-full text-left px-3 py-2 rounded-md hover:bg-accent/40"
              >
                Colchões
              </button>
              <button
                onClick={() => handleMobileNav("bases")}
                className="w-full text-left px-3 py-2 rounded-md hover:bg-accent/40"
              >
                Bases
              </button>
              <button
                onClick={() => handleMobileNav("conjuntos")}
                className="w-full text-left px-3 py-2 rounded-md hover:bg-accent/40"
              >
                Conjuntos
              </button>
              <button
                onClick={() => handleMobileNav("cabeceiras")}
                className="w-full text-left px-3 py-2 rounded-md hover:bg-accent/40"
              >
                Cabeceiras
              </button>
              <button
                onClick={() => handleMobileNav("travesseiros")}
                className="w-full text-left px-3 py-2 rounded-md hover:bg-accent/40"
              >
                Travesseiros
              </button>
              <button
                onClick={() => handleMobileNav("acessórios")}
                className="w-full text-left px-3 py-2 rounded-md hover:bg-accent/40"
              >
                Acessórios
              </button>
              <a
                href="#contato"
                onClick={() => setIsMobileMenuOpen(false)}
                className="w-full px-3 py-2 rounded-md hover:bg-accent/40"
              >
                Contato
              </a>
            </nav>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
