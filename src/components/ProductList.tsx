import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import ProductCard from "./ProductCard";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Skeleton } from "@/components/ui/skeleton";

interface Product {
  id: string;
  name: string;
  description: string | null;
  price: number;
  discount: number;
  image_url: string | null;
  is_featured: boolean;
  category_id: string | null;
  categories: {
    name: string;
  } | null;
}

const ProductList = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState("all");

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from("products")
        .select(`
          *,
          categories (
            name
          )
        `)
        .order("created_at", { ascending: false });

      if (error) throw error;
      setProducts(data || []);
    } catch (error) {
      console.error("Erro ao carregar produtos:", error);
      setProducts([]);
    } finally {
      setLoading(false);
    }
  };

  const filteredProducts = selectedCategory === "all"
    ? products
    : products.filter(
        (product) => product.categories?.name.toLowerCase() === selectedCategory.toLowerCase()
      );

  if (loading) {
    return (
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {[...Array(8)].map((_, i) => (
              <div key={i} className="space-y-4">
                <Skeleton className="aspect-[4/3] w-full" />
                <Skeleton className="h-6 w-3/4" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-8 w-1/2" />
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-16" id="produtos">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-foreground">
            Nossos Produtos
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Mostrando {filteredProducts.length} produtos
          </p>
        </div>

        <Tabs defaultValue="all" className="mb-8">
          <TabsList className="flex flex-wrap justify-center gap-2 h-auto bg-transparent">
            <TabsTrigger
              value="all"
              onClick={() => setSelectedCategory("all")}
              className="data-[state=active]:bg-accent data-[state=active]:text-accent-foreground"
            >
              Todos
            </TabsTrigger>
            <TabsTrigger
              value="colchões"
              onClick={() => setSelectedCategory("colchões")}
              className="data-[state=active]:bg-accent data-[state=active]:text-accent-foreground"
            >
              Colchões
            </TabsTrigger>
            <TabsTrigger
              value="bases"
              onClick={() => setSelectedCategory("bases")}
              className="data-[state=active]:bg-accent data-[state=active]:text-accent-foreground"
            >
              Bases
            </TabsTrigger>
            <TabsTrigger
              value="conjuntos"
              onClick={() => setSelectedCategory("conjuntos")}
              className="data-[state=active]:bg-accent data-[state=active]:text-accent-foreground"
            >
              Conjuntos
            </TabsTrigger>
          </TabsList>

          <TabsContent value={selectedCategory} className="mt-8">
            {filteredProducts.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-muted-foreground text-lg">
                  Nenhum produto encontrado nesta categoria.
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {filteredProducts.map((product) => (
                  <ProductCard
                    key={product.id}
                    {...product}
                    category={product.categories?.name}
                  />
                ))}
              </div>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </section>
  );
};

export default ProductList;
