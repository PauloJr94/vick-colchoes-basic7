import Header from "@/components/Header";
import PromoBanner from "@/components/PromoBanner";
import CategoryIcons from "@/components/CategoryIcons";
import ProductList from "@/components/ProductList";
import Footer from "@/components/Footer";
import { CategoryFilterProvider } from "@/hooks/useCategoryFilter";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <CategoryFilterProvider>
        <Header />
        <main>
          <PromoBanner />
          <CategoryIcons />
          <ProductList />
        </main>
      </CategoryFilterProvider>
      <Footer />
    </div>
  );
};

export default Index;
