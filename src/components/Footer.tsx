import { MessageCircle, Instagram, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import logo from "@/assets/logo.jpg";

const Footer = () => {
  return (
    <footer className="bg-primary text-primary-foreground">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Logo e Descrição */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <img src={logo} alt="V Colchões" className="h-12 w-12 rounded-full object-cover" />
              <div>
                <h3 className="text-xl font-bold">V Colchões</h3>
                <p className="text-sm opacity-90">Sua melhor noite de sono</p>
              </div>
            </div>
            <p className="text-sm opacity-80">
              Qualidade, conforto e durabilidade em colchões, bases e acessórios para o seu descanso perfeito.
            </p>
            <div className="flex gap-3">
              <a href="https://wa.me/5587991018888" target="_blank" rel="noopener noreferrer">
                <Button size="icon" variant="outline" className="bg-primary-foreground/10 border-primary-foreground/20 hover:bg-accent hover:text-accent-foreground" title="WhatsApp">
                  <MessageCircle className="h-4 w-4" />
                </Button>
              </a>
              <a href="https://www.instagram.com/vickcolchoes?igsh=YjdlcDA0cXR0anJs" target="_blank" rel="noopener noreferrer">
                <Button size="icon" variant="outline" className="bg-primary-foreground/10 border-primary-foreground/20 hover:bg-accent hover:text-accent-foreground" title="Instagram">
                  <Instagram className="h-4 w-4" />
                </Button>
              </a>
            </div>
          </div>

          {/* Links Rápidos */}
          <div>
            <h4 className="font-semibold text-lg mb-4">Links Rápidos</h4>
            <ul className="space-y-2">
              {["Sobre Nós", "Produtos", "Ofertas", "Blog", "Contato"].map((item) => (
                <li key={item}>
                  <a href="#" className="text-sm opacity-80 hover:opacity-100 hover:text-accent transition-colors">
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Categorias */}
          <div>
            <h4 className="font-semibold text-lg mb-4">Categorias</h4>
            <ul className="space-y-2">
              {["Colchões", "Bases", "Conjuntos", "Cabeceiras", "Travesseiros", "Acessórios"].map((item) => (
                <li key={item}>
                  <a href="#" className="text-sm opacity-80 hover:opacity-100 hover:text-accent transition-colors">
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contato */}
          <div>
            <h4 className="font-semibold text-lg mb-4">Contato</h4>
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <MessageCircle className="h-5 w-5 mt-0.5 flex-shrink-0" />
                <div className="text-sm">
                  <p className="opacity-80">WhatsApp</p>
                  <a href="https://wa.me/5587991018888" target="_blank" rel="noopener noreferrer" className="hover:text-accent transition-colors">
                    (87) 99101-8888
                  </a>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <Mail className="h-5 w-5 mt-0.5 flex-shrink-0" />
                <div className="text-sm">
                  <p className="opacity-80">E-mail</p>
                  <a href="mailto:contato@vcolchoes.com.br" className="hover:text-accent transition-colors">
                    contato@vcolchoes.com.br
                  </a>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <Instagram className="h-5 w-5 mt-0.5 flex-shrink-0" />
                <div className="text-sm">
                  <p className="opacity-80">Instagram</p>
                  <a href="https://www.instagram.com/vickcolchoes?igsh=YjdlcDA0cXR0anJs" target="_blank" rel="noopener noreferrer" className="hover:text-accent transition-colors">
                    @vickcolchoes
                  </a>
                </div>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-primary-foreground/20 mt-8 pt-8 text-center">
          <p className="text-sm opacity-80">
            © {new Date().getFullYear()} V Colchões. Todos os direitos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
