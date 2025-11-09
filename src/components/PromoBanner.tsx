import heroBanner from "@/assets/hero-banner.jpg";

const PromoBanner = () => {
  return (
    <section className="relative w-full max-w-[400px] h-[400px] lg:max-w-[1400px] lg:h-[450px] overflow-hidden rounded-2xl mx-auto my-8">
      <div className="absolute inset-0">
        <img
          src={heroBanner}
          alt="Promoção"
          className="w-full h-full object-cover"
        />
      </div>

      <div className="relative h-full flex items-end pb-12 md:pb-16">
        <div className="w-full px-4">
          <h2 className="text-4xl md:text-6xl font-bold leading-tight text-white drop-shadow-lg">
            Colchão dos seus Sonhos
          </h2>
          <p className="text-lg md:text-xl text-white drop-shadow-lg mt-4 max-w-2xl">
            Condições especiais por tempo limitado! Frete grátis a partir de R$ 300
          </p>
        </div>
      </div>
    </section>
  );
};

export default PromoBanner;
