import { User, Menu, MapPin, Phone, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { useAdmin } from "@/hooks/useAdmin";
import { useCategoryFilter } from "@/hooks/useCategoryFilter";
import logo from "@/assets/logo.jpg";

const Header = () => {
  const navigate = useNavigate();
  const { isAdmin } = useAdmin();
  const { setSelectedCategory } = useCategoryFilter();

  const handleCategoryClick = (category: string) => {
    setSelectedCategory(category.toLowerCase());
    const element = document.getElementById("produtos");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <header className="sticky top-0 z-50 bg-background border-b border-border">
      {/* Top Bar */}
      <div className="bg-primary text-primary-foreground">
        <div className="container mx-auto px-4 py-2">
          <div className="flex flex-wrap items-center justify-between gap-2 text-sm">
            <div className="flex items-center gap-4">
              <a href="tel:+5581999999999" className="flex items-center gap-2 hover:text-accent transition-colors">
                <Phone className="h-3 w-3" />
                <span className="hidden sm:inline">(81) 99999-9999</span>
              </a>
              <a href="mailto:contato@vcolchoes.com.br" className="flex items-center gap-2 hover:text-accent transition-colors">
                <Mail className="h-3 w-3" />
                <span className="hidden md:inline">contato@vcolchoes.com.br</span>
              </a>
            </div>
            <div className="flex items-center gap-2">
              <MapPin className="h-3 w-3" />
              <span className="hidden sm:inline">Garanhuns - PE/ Caruaru - PE</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Header */}
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between gap-4">
          {/* Logo */}
          <a href="/" className="flex items-center gap-3">
            <img src={logo} alt="V Colchões" className="h-12 w-12 rounded-full object-cover" />
            <div className="hidden sm:block">
              <h1 className="text-xl font-bold text-foreground">Vick Colchões</h1>
              <p className="text-xs text-muted-foreground">Sua melhor noite de sono</p>
            </div>
          </a>

          {/* Navigation */}
          <nav className="hidden lg:flex items-center gap-6">
            <button
              onClick={() => handleCategoryClick("all")}
              className="text-sm font-medium text-foreground hover:text-accent transition-colors"
            >
              OFERTAS
            </button>
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
            <Button variant="ghost" size="icon" className="lg:hidden">
              <Menu className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
