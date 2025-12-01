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
            <TableHead className="p-2 text-right">Ações</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {products.map((product) => (
            <TableRow key={product.id}>
              <TableCell className="w-20 min-w-20">
                {product.image_url ? (
                  <img
                    src={product.image_url}
                    alt={product.name}
                    className="w-16 h-16 object-cover rounded"
                  />
                ) : (
                  <div className="w-16 h-16 bg-muted rounded flex items-center justify-center">
                    <span className="text-xs text-muted-foreground">Sem imagem</span>
                  </div>
                )}
              </TableCell>
              <TableCell className="font-medium min-w-32">{product.name}</TableCell>
              <TableCell className="max-w-xs truncate min-w-40">
                {product.description || '-'}
              </TableCell>
              <TableCell className="min-w-24">
                R$ {product.price?.toFixed(2).replace('.', ',')}
              </TableCell>
              <TableCell className="min-w-24">
                <Badge variant={product.stock > 0 ? 'default' : 'destructive'}>
                  {product.stock || 0}
                </Badge>
              </TableCell>
              <TableCell className="min-w-28">
                {product.categories?.name || '-'}
              </TableCell>
              <TableCell className="text-right min-w-20">
                <div className="flex justify-end gap-2">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => onEdit(product)}
                  >
                    <Edit className="w-4 h-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => onDelete(product.id)}
                  >
                    <Trash2 className="w-4 h-4" />
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
