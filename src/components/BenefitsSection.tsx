import { useEffect, useRef } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { Truck, Tag, CreditCard, Ruler, ChevronLeft, ChevronRight } from "lucide-react";

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
  const prevButtonRef = useRef<HTMLButtonElement>(null);
  const nextButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!emblaApi || !prevButtonRef.current || !nextButtonRef.current) return;

    const onPrevButtonClick = () => emblaApi.scrollPrev();
    const onNextButtonClick = () => emblaApi.scrollNext();

    prevButtonRef.current.addEventListener("click", onPrevButtonClick);
    nextButtonRef.current.addEventListener("click", onNextButtonClick);

    return () => {
      prevButtonRef.current?.removeEventListener("click", onPrevButtonClick);
      nextButtonRef.current?.removeEventListener("click", onNextButtonClick);
    };
  }, [emblaApi]);

  return (
    <section className="bg-secondary/10 py-3 sm:py-4 md:py-5">
      <div className="container mx-auto px-3 sm:px-4">
        {/* Desktop Grid */}
        <div className="hidden md:grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-2 sm:gap-2 md:gap-3">
          {benefits.map((benefit, index) => {
            const Icon = benefit.icon;
            return (
              <div key={index} className="flex flex-col sm:flex-row sm:items-start gap-2 sm:gap-2 py-1.5 sm:py-2 px-1.5 sm:px-2">
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

        {/* Mobile Carousel */}
        <div className="md:hidden">
          <div className="overflow-hidden" ref={emblaRef}>
            <div className="flex">
              {benefits.map((benefit, index) => {
                const Icon = benefit.icon;
                return (
                  <div key={index} className="flex-[0_0_100%] px-2 py-3 flex flex-row items-start gap-3 min-w-0">
                    <div className="p-2 bg-accent/10 rounded-lg flex-shrink-0">
                      <Icon className="h-5 w-5 text-accent" />
                    </div>
                    <div className="flex-1 text-left">
                      <h3 className="font-semibold text-sm text-foreground leading-tight">
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

          {/* Carousel Controls */}
          <div className="flex items-center justify-between mt-3 px-2">
            <button
              ref={prevButtonRef}
              className="p-1.5 rounded-lg bg-accent/10 hover:bg-accent/20 transition-colors"
              aria-label="Anterior"
            >
              <ChevronLeft className="h-4 w-4 text-accent" />
            </button>
            <button
              ref={nextButtonRef}
              className="p-1.5 rounded-lg bg-accent/10 hover:bg-accent/20 transition-colors"
              aria-label="Próximo"
            >
              <ChevronRight className="h-4 w-4 text-accent" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BenefitsSection;
