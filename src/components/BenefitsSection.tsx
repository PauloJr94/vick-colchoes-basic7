import { useEffect, useRef, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { Truck, Tag, CreditCard, Ruler } from "lucide-react";

const benefits = [
  {
    icon: Truck,
    title: "Frete Grátis",
    description: "a partir de R$ 300",
    subtext: "Confira a Política de Entrega",
  },
  {
    icon: Tag,
    title: "Descrições",
    description: "+ 0x sem juros",
    subtext: "Só nesta semana",
    footnote: "*Em itens selecionados",
  },
  {
    icon: CreditCard,
    title: "Parcelamento em até 21x",
    description: "Confira a Política de Pagamento",
    subtext: "",
  },
  {
    icon: Ruler,
    title: "Colchões e bases sob medida",
    description: "Confira o nosso ortobom do seu jeito",
    subtext: "",
  },
];

const BenefitsSection = () => {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true });
  const autoplayIntervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (!emblaApi) return;

    const autoplay = () => {
      emblaApi.scrollNext();
    };

    autoplayIntervalRef.current = setInterval(autoplay, 4000);

    return () => {
      if (autoplayIntervalRef.current) {
        clearInterval(autoplayIntervalRef.current);
      }
    };
  }, [emblaApi]);

  return (
    <section className="bg-secondary/10 py-6 sm:py-8 md:py-8">
      <div className="container mx-auto px-3 sm:px-4">
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 md:gap-4">
          {benefits.map((benefit, index) => {
            const Icon = benefit.icon;
            return (
              <div key={index} className="flex flex-col sm:flex-row sm:items-start gap-2 sm:gap-3 py-2 sm:py-3 px-2 sm:px-3">
                <div className="p-2 bg-accent/10 rounded-lg flex-shrink-0">
                  <Icon className="h-5 w-5 text-accent" />
                </div>
                <div className="flex-1 text-left">
                  <h3 className="font-semibold text-xs sm:text-sm text-foreground leading-tight">
                    {benefit.title}
                  </h3>
                  {benefit.description && (
                    <p className="text-xs text-muted-foreground mt-0.5 leading-tight">
                      {benefit.description}
                    </p>
                  )}
                  {benefit.subtext && (
                    <p className="text-xs text-muted-foreground mt-0.5 leading-tight">
                      {benefit.subtext}
                    </p>
                  )}
                  {benefit.footnote && (
                    <p className="text-xs text-muted-foreground/70 mt-0.5 italic leading-tight">
                      {benefit.footnote}
                    </p>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default BenefitsSection;
