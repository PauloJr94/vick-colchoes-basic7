import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ShoppingCart } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

interface Product {
  id: string;
  name: string;
  description: string | null;
  price: number;
  discount: number;
  image_url: string | null;
  category_id: string | null;
  categories: {
    name: string;
  } | null;
  product_images?: Array<{
    id: string;
    image_url: string;
  }>;
}

const ProductDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState<string>("");
  const [images, setImages] = useState<string[]>([]);

  useEffect(() => {
    if (id) {
      fetchProduct(id);
    }
  }, [id]);

  const fetchProduct = async (productId: string) => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from("products")
        .select(`
          *,
          categories (
            name
          ),
          product_images (
            id,
            image_url
          )
        `)
        .eq("id", productId)
        .single();

      if (error) throw error;

      setProduct(data);

      const allImages = [];
      if (data.image_url) {
        allImages.push(data.image_url);
        setSelectedImage(data.image_url);
      }

      if (data.product_images && data.product_images.length > 0) {
        allImages.push(...data.product_images.map((pi: any) => pi.image_url));
        if (!data.image_url && data.product_images.length > 0) {
          setSelectedImage(data.product_images[0].image_url);
        }
      }

      setImages(allImages);
    } catch (error) {
      console.error("Erro ao carregar produto:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1 flex items-center justify-center">
          <div className="text-center">Carregando...</div>
        </main>
        <Footer />
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1 flex items-center justify-center">
          <div className="text-center">Produto não encontrado</div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />
      <main className="flex-1 container mx-auto px-4 py-8">
        <Button
          variant="ghost"
          onClick={() => navigate("/")}
          className="mb-6 flex items-center gap-2"
        >
          <ArrowLeft className="h-4 w-4" />
          Voltar
        </Button>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Image Gallery */}
          <div className="space-y-4">
            <div className="aspect-[4/3] bg-muted rounded-lg overflow-hidden">
              <img
                src={selectedImage}
                alt={product.name}
                className="w-full h-full object-cover"
              />
            </div>

            {images.length > 1 && (
              <div className="grid grid-cols-4 gap-2">
                {images.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImage(image)}
                    className={`aspect-square rounded-lg overflow-hidden border-2 transition-all ${
                      selectedImage === image
                        ? "border-accent"
                        : "border-border hover:border-accent/50"
                    }`}
                  >
                    <img
                      src={image}
                      alt={`${product.name} ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            {product.categories && (
              <div className="text-sm text-muted-foreground">
                {product.categories.name}
              </div>
            )}

            <h1 className="text-3xl font-bold text-foreground">
              {product.name}
            </h1>

            {product.description && (
              <p className="text-muted-foreground text-base">
                {product.description}
              </p>
            )}

            <div className="space-y-2 border-t border-b border-border py-6">
              <div className="flex items-baseline gap-2">
                <span className="text-4xl font-bold text-foreground">
                  R$ {product.price.toFixed(2).replace(".", ",")}
                </span>
              </div>
            </div>

            <Button
              className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-semibold py-6 text-lg"
              onClick={() => console.log("Adicionar ao carrinho:", product.id)}
            >
              <ShoppingCart className="mr-2 h-5 w-5" />
              Comprar Agora
            </Button>

            <div className="bg-accent/10 rounded-lg p-4 text-sm">
              <h3 className="font-semibold text-foreground mb-2">Informações</h3>
              <ul className="space-y-1 text-muted-foreground">
                <li>✓ Produto disponível</li>
                <li>✓ Entrega em todo o Brasil</li>
                <li>✓ Garantia do fabricante</li>
              </ul>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default ProductDetail;
