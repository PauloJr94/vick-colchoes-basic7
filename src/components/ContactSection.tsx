import { MapPin, Phone, Mail, Clock } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const ContactSection = () => {
  const stores = [
    {
      id: 1,
      name: "Garanhuns",
      address: "Rua Quinze de Novembro - Garanhuns, PE",
      phone: "(87) 99101-8888",
      email: "vickcolchoes@gmail.com",
      hours: "Seg - Sex: 8:00 - 18:00 | Sab: 8:00 - 13:00",
      whatsapp: "https://wa.me/5587991018888",
    },
    {
      id: 2,
      name: "Caruaru",
      address: "Rua Tupy - Salgado - Caruaru, PE",
      phone: "(87) 99101-8888",
      email: "vickcolchoes@gmail.com",
      hours: "Seg - Sex: 8:00 - 18:00 | Sab: 8:00 - 13:00",
      whatsapp: "https://wa.me/5587991018888",
    },
  ];

  return (
    <section id="contato" className="py-12 sm:py-16 md:py-20 bg-accent/5">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12 sm:mb-16">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-foreground mb-4">
            Nossas Lojas
          </h2>
          <p className="text-muted-foreground text-base sm:text-lg max-w-2xl mx-auto">
            Visite-nos em uma de nossas lojas em Garanhuns ou Caruaru e conheça pessoalmente nossos produtos
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6 md:gap-8 max-w-4xl mx-auto">
          {stores.map((store) => (
            <Card key={store.id} className="overflow-hidden border-2 border-border hover:border-accent transition-colors hover:shadow-lg">
              <CardHeader className="bg-primary/10 pb-4">
                <CardTitle className="text-2xl text-accent">{store.name}</CardTitle>
              </CardHeader>

              <CardContent className="pt-6 space-y-4">
                {/* Address */}
                <div className="flex items-start gap-3">
                  <MapPin className="h-5 w-5 text-accent flex-shrink-0 mt-1" />
                  <div>
                    <p className="font-semibold text-foreground mb-1">Endereço</p>
                    <p className="text-muted-foreground text-sm">{store.address}</p>
                  </div>
                </div>

                {/* Phone */}
                <div className="flex items-start gap-3">
                  <Phone className="h-5 w-5 text-accent flex-shrink-0 mt-1" />
                  <div>
                    <p className="font-semibold text-foreground mb-1">Telefone</p>
                    <a
                      href={`tel:${store.phone.replace(/\D/g, '')}`}
                      className="text-accent hover:text-accent/80 transition-colors text-sm"
                    >
                      {store.phone}
                    </a>
                  </div>
                </div>

                {/* Email */}
                <div className="flex items-start gap-3">
                  <Mail className="h-5 w-5 text-accent flex-shrink-0 mt-1" />
                  <div>
                    <p className="font-semibold text-foreground mb-1">Email</p>
                    <a
                      href={`mailto:${store.email}`}
                      className="text-accent hover:text-accent/80 transition-colors text-sm break-all"
                    >
                      {store.email}
                    </a>
                  </div>
                </div>

                {/* Hours */}
                <div className="flex items-start gap-3">
                  <Clock className="h-5 w-5 text-accent flex-shrink-0 mt-1" />
                  <div>
                    <p className="font-semibold text-foreground mb-1">Horário</p>
                    <p className="text-muted-foreground text-sm">{store.hours}</p>
                  </div>
                </div>

                {/* WhatsApp Button */}
                <a
                  href={store.whatsapp}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block w-full mt-4 px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded-lg text-center font-semibold transition-colors"
                >
                  Conversar no WhatsApp
                </a>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
