import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Edit, Trash2 } from 'lucide-react';

interface ProductTableProps {
  products: any[];
  loading: boolean;
  onEdit: (product: any) => void;
  onDelete: (productId: string) => void;
}

export const ProductTable = ({ products, loading, onEdit, onDelete }: ProductTableProps) => {
  if (loading) {
    return (
      <div className="flex justify-center items-center py-12">
        <p className="text-muted-foreground">Carregando produtos...</p>
      </div>
    );
  }

  if (products.length === 0) {
    return (
      <div className="flex justify-center items-center py-12 border rounded-lg">
        <p className="text-muted-foreground">Nenhum produto cadastrado</p>
      </div>
    );
  }

  return (
    <div className="border rounded-lg">
      <Table className="w-full text-sm">
        <TableHeader>
          <TableRow>
            <TableHead className="p-2 w-16">Imagem</TableHead>
            <TableHead className="p-2">Nome</TableHead>
            <TableHead className="p-2 max-w-32">Descrição</TableHead>
            <TableHead className="p-2 whitespace-nowrap">Preço</TableHead>
            <TableHead className="p-2 whitespace-nowrap">Estoque</TableHead>
            <TableHead className="p-2 whitespace-nowrap">Categoria</TableHead>
            <TableHead className="p-2 text-center">Ações</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {products.map((product) => (
            <TableRow key={product.id}>
              <TableCell className="p-2 w-16">
                {product.image_url ? (
                  <img
                    src={product.image_url}
                    alt={product.name}
                    className="w-12 h-12 object-cover rounded"
                  />
                ) : (
                  <div className="w-12 h-12 bg-muted rounded flex items-center justify-center">
                    <span className="text-xs text-muted-foreground">-</span>
                  </div>
                )}
              </TableCell>
              <TableCell className="p-2 font-medium text-sm">{product.name}</TableCell>
              <TableCell className="p-2 text-xs truncate max-w-32">
                {product.description || '-'}
              </TableCell>
              <TableCell className="p-2 whitespace-nowrap text-sm">
                R$ {product.price?.toFixed(2).replace('.', ',')}
              </TableCell>
              <TableCell className="p-2 whitespace-nowrap">
                <Badge variant={product.stock > 0 ? 'default' : 'destructive'} className="text-xs">
                  {product.stock || 0}
                </Badge>
              </TableCell>
              <TableCell className="p-2 whitespace-nowrap text-sm">
                {product.categories?.name || '-'}
              </TableCell>
              <TableCell className="p-2 text-center">
                <div className="flex justify-center gap-1">
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-8 w-8 p-0"
                    onClick={() => onEdit(product)}
                  >
                    <Edit className="w-3.5 h-3.5" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-8 w-8 p-0"
                    onClick={() => onDelete(product.id)}
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};
