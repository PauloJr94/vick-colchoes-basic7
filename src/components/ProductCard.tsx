import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Eye } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface ProductCardProps {
  id: string;
  name: string;
  description?: string;
  price: number;
  discount?: number;
  image_url?: string;
  category?: string;
  is_featured?: boolean;
}

const ProductCard = ({
  id,
  name,
  description,
  price,
  image_url,
}: ProductCardProps) => {
  const navigate = useNavigate();

  return (
    <Card className="group overflow-hidden border border-border hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
      <div className="relative aspect-[4/3] overflow-hidden bg-muted">
        <img
          src={image_url || "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=800"}
          alt={name}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
        />
      </div>

      <CardContent className="p-4 space-y-2">
        <h3 className="font-semibold text-foreground text-lg line-clamp-2 group-hover:text-accent transition-colors">
          {name}
        </h3>
        
        {description && (
          <p className="text-sm text-muted-foreground line-clamp-2">
            {description}
          </p>
        )}

        <div className="space-y-1">
          {discount > 0 && (
            <p className="text-sm text-muted-foreground line-through">
              R$ {price.toFixed(2).replace(".", ",")}
            </p>
          )}
          
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-bold text-foreground">
              R$ {finalPrice.toFixed(2).replace(".", ",")}
            </span>
          </div>
          
          <p className="text-sm text-muted-foreground">
            ou até 6x de R$ {installment.toFixed(2).replace(".", ",")} sem juros
          </p>
        </div>
      </CardContent>

      <CardFooter className="p-4 pt-0">
        <Button className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-semibold group/btn">
          <ShoppingCart className="mr-2 h-4 w-4 group-hover/btn:scale-110 transition-transform" />
          Comprar
        </Button>
      </CardFooter>
    </Card>
  );
};

export default ProductCard;
