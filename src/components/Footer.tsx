import { MessageCircle, Instagram, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import logo from "@/assets/logo.jpg";

const Footer = () => {
  return (
    <footer className="bg-primary text-primary-foreground">
      <div className="container mx-auto px-3 sm:px-4 py-6 sm:py-8 md:py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 md:gap-8">
          {/* Logo e Descrição */}
          <div className="space-y-3 sm:space-y-4">
            <div className="flex items-center gap-2">
              <img src={logo} alt="V Colchões" className="h-10 sm:h-12 w-10 sm:w-12 rounded-full object-cover" />
              <div className="min-w-0">
                <h3 className="text-base sm:text-lg md:text-xl font-bold">V Colchões</h3>
                <p className="text-xs sm:text-sm opacity-90">Sua melhor noite de sono</p>
              </div>
            </div>
            <p className="text-xs sm:text-sm opacity-80">
              Qualidade, conforto e durabilidade em colchões, bases e acessórios para o seu descanso perfeito.
            </p>
            <div className="flex gap-2 sm:gap-3">
              <a href="https://wa.me/5587991018888" target="_blank" rel="noopener noreferrer">
                <Button size="icon" variant="outline" className="bg-primary-foreground/10 border-primary-foreground/20 hover:bg-accent hover:text-accent-foreground h-8 sm:h-10 w-8 sm:w-10" title="WhatsApp">
                  <MessageCircle className="h-3.5 sm:h-4 w-3.5 sm:w-4" />
                </Button>
              </a>
              <a href="https://www.instagram.com/vickcolchoes?igsh=YjdlcDA0cXR0anJs" target="_blank" rel="noopener noreferrer">
                <Button size="icon" variant="outline" className="bg-primary-foreground/10 border-primary-foreground/20 hover:bg-accent hover:text-accent-foreground h-8 sm:h-10 w-8 sm:w-10" title="Instagram">
                  <Instagram className="h-3.5 sm:h-4 w-3.5 sm:w-4" />
                </Button>
              </a>
            </div>
          </div>

          {/* Links Rápidos */}
          <div>
            <h4 className="font-semibold text-sm sm:text-base md:text-lg mb-2 sm:mb-4">Links Rápidos</h4>
            <ul className="space-y-1.5 sm:space-y-2">
              {["Sobre Nós", "Produtos", "Ofertas", "Blog", "Contato"].map((item) => (
                <li key={item}>
                  <a href="#" className="text-xs sm:text-sm opacity-80 hover:opacity-100 hover:text-accent transition-colors">
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Categorias */}
          <div>
            <h4 className="font-semibold text-sm sm:text-base md:text-lg mb-2 sm:mb-4">Categorias</h4>
            <ul className="space-y-1.5 sm:space-y-2">
              {["Colchões", "Bases", "Conjuntos", "Cabeceiras", "Travesseiros", "Acessórios"].map((item) => (
                <li key={item}>
                  <a href="#" className="text-xs sm:text-sm opacity-80 hover:opacity-100 hover:text-accent transition-colors">
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contato */}
          <div>
            <h4 className="font-semibold text-sm sm:text-base md:text-lg mb-2 sm:mb-4">Contato</h4>
            <ul className="space-y-2 sm:space-y-3">
              <li className="flex items-start gap-2 sm:gap-3">
                <MessageCircle className="h-4 sm:h-5 w-4 sm:w-5 mt-0.5 flex-shrink-0" />
                <div className="text-xs sm:text-sm min-w-0">
                  <p className="opacity-80">WhatsApp</p>
                  <a href="https://wa.me/5587991018888" target="_blank" rel="noopener noreferrer" className="hover:text-accent transition-colors break-all">
                    (87) 99101-8888
                  </a>
                </div>
              </li>
              <li className="flex items-start gap-2 sm:gap-3">
                <Mail className="h-4 sm:h-5 w-4 sm:w-5 mt-0.5 flex-shrink-0" />
                <div className="text-xs sm:text-sm min-w-0">
                  <p className="opacity-80">E-mail</p>
                  <a href="mailto:vickcolchoes@gmail.com" className="hover:text-accent transition-colors break-all">
                    vickcolchoes@gmail.com
                  </a>
                </div>
              </li>
              <li className="flex items-start gap-2 sm:gap-3">
                <Instagram className="h-4 sm:h-5 w-4 sm:w-5 mt-0.5 flex-shrink-0" />
                <div className="text-xs sm:text-sm min-w-0">
                  <p className="opacity-80">Instagram</p>
                  <a href="https://www.instagram.com/vickcolchoes?igsh=YjdlcDA0cXR0anJs" target="_blank" rel="noopener noreferrer" className="hover:text-accent transition-colors">
                    @vickcolchoes
                  </a>
                </div>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-primary-foreground/20 mt-4 sm:mt-6 md:mt-8 pt-4 sm:pt-6 md:pt-8 text-center">
          <p className="text-xs sm:text-sm opacity-80">
            © {new Date().getFullYear()} V Colchões. Todos os direitos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
