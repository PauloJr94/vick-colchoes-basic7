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
    <section className="bg-secondary/10 py-6 sm:py-8 md:py-10">
      {/* Desktop Grid */}
      <div className="hidden md:block container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          {benefits.map((benefit, index) => {
            const Icon = benefit.icon;
            return (
              <div key={index} className="flex flex-col items-center text-center space-y-3 py-4 px-2">
                <div className="p-3 bg-accent/10 rounded-lg">
                  <Icon className="h-6 w-6 md:h-7 md:w-7 text-accent" />
                </div>
                <div>
                  <h3 className="font-semibold text-sm md:text-base text-foreground">
                    {benefit.title}
                  </h3>
                  {benefit.description && (
                    <p className="text-xs md:text-sm text-muted-foreground mt-1">
                      {benefit.description}
                    </p>
                  )}
                  {benefit.subtext && (
                    <p className="text-xs text-muted-foreground mt-1">
                      {benefit.subtext}
                    </p>
                  )}
                  {benefit.footnote && (
                    <p className="text-xs text-muted-foreground/70 mt-1 italic">
                      {benefit.footnote}
                    </p>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Mobile Carousel */}
      <div className="md:hidden">
        <div className="overflow-hidden" ref={emblaRef}>
          <div className="flex">
            {benefits.map((benefit, index) => {
              const Icon = benefit.icon;
              return (
                <div
                  key={index}
                  className="flex-[0_0_100%] px-4 py-6 flex flex-col items-center text-center space-y-3 min-w-0"
                >
                  <div className="p-3 bg-accent/10 rounded-lg">
                    <Icon className="h-6 w-6 text-accent" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-sm text-foreground">
                      {benefit.title}
                    </h3>
                    {benefit.description && (
                      <p className="text-xs text-muted-foreground mt-1">
                        {benefit.description}
                      </p>
                    )}
                    {benefit.subtext && (
                      <p className="text-xs text-muted-foreground mt-1">
                        {benefit.subtext}
                      </p>
                    )}
                    {benefit.footnote && (
                      <p className="text-xs text-muted-foreground/70 mt-1 italic">
                        {benefit.footnote}
                      </p>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Carousel Dots Indicators */}
        <div className="flex justify-center gap-2 mt-4 pb-2">
          {benefits.map((_, index) => (
            <button
              key={index}
              onClick={() => emblaApi?.scrollToIndex(index)}
              className="h-2 w-2 rounded-full bg-accent/40 transition-all hover:bg-accent/60"
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default BenefitsSection;
