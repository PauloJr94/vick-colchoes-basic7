import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import ProductCard from "./ProductCard";
import { Skeleton } from "@/components/ui/skeleton";
import { useCategoryFilter } from "@/hooks/useCategoryFilter";

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
  const { selectedCategory } = useCategoryFilter();

  useEffect(() => {
    fetchProducts();
  }, [selectedCategory]);

  const fetchProducts = async () => {
    try {
      setLoading(true);

      // Fetch categories
      const { data: categories, error: categoriesError } = await supabase
        .from("categories")
        .select("id, name");

      if (categoriesError) throw categoriesError;

      // Create a map of category IDs to names
      const categoryMap: Record<string, string> = {};
      categories?.forEach((cat: any) => {
        categoryMap[cat.id] = cat.name;
      });

      console.log("Category map:", categoryMap);

      // Fetch products
      const { data, error } = await supabase
        .from("products")
        .select("id, name, description, price, discount, image_url, is_featured, category_id")
        .order("created_at", { ascending: false });

      if (error) throw error;

      // Add categories to products
      const productsWithCategories = (data || []).map((product: any) => ({
        ...product,
        categories: product.category_id && categoryMap[product.category_id]
          ? { name: categoryMap[product.category_id] }
          : null
      }));

      console.log("Produtos carregados:", productsWithCategories);
      if (productsWithCategories.length > 0) {
        console.log("Primeiros 3 produtos com categorias:");
        productsWithCategories.slice(0, 3).forEach((p: any, i: number) => {
          console.log(`Produto ${i}:`, p.name, "Category:", p.categories?.name);
        });
      }

      setProducts(productsWithCategories);
    } catch (error) {
      console.error("Erro ao carregar produtos:", error);
      setProducts([]);
    } finally {
      setLoading(false);
    }
  };

  const filteredProducts = selectedCategory === "all"
    ? products
    : products.filter((product) => {
        if (!product.categories?.name) return false;
        const match = product.categories.name.toLowerCase() === selectedCategory.toLowerCase();
        return match;
      });

  console.log("selectedCategory:", selectedCategory);
  console.log("filteredProducts:", filteredProducts);

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
          <h2 className="text-3xl md:text-4xl font-bold text-foreground">
            Nossos Produtos
          </h2>
        </div>

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
      </div>
    </section>
  );
};

export default ProductList;
