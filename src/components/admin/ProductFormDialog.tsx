import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { toast } from '@/hooks/use-toast';
import { Upload, X } from 'lucide-react';

interface ProductFormDialogProps {
  open: boolean;
  onClose: () => void;
  product?: any;
  categories: any[];
}

export const ProductFormDialog = ({ open, onClose, product, categories }: ProductFormDialogProps) => {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    stock: '',
    category_id: '',
    image_url: '',
  });
  const [imageFiles, setImageFiles] = useState<File[]>([]);
  const [imagePreviews, setImagePreviews] = useState<string[]>([]);

  useEffect(() => {
    if (product) {
      setFormData({
        name: product.name || '',
        description: product.description || '',
        price: product.price?.toString() || '',
        stock: product.stock?.toString() || '0',
        category_id: product.category_id || '',
        image_url: product.image_url || '',
      });

      try {
        const images = typeof product.image_url === 'string' && product.image_url.startsWith('[')
          ? JSON.parse(product.image_url)
          : product.image_url ? [product.image_url] : [];
        setImagePreviews(Array.isArray(images) ? images : []);
      } catch {
        setImagePreviews(product.image_url ? [product.image_url] : []);
      }
    } else {
      setFormData({
        name: '',
        description: '',
        price: '',
        stock: '0',
        category_id: '',
        image_url: '',
      });
      setImagePreviews([]);
    }
    setImageFiles([]);
  }, [product, open]);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    const totalImages = imagePreviews.length + files.length;

    if (totalImages > 5) {
      toast({
        title: 'Limite de imagens',
        description: 'Você pode adicionar no máximo 5 imagens.',
        variant: 'destructive',
      });
      return;
    }

    const newFiles = files.slice(0, 5 - imagePreviews.length);
    setImageFiles([...imageFiles, ...newFiles]);

    newFiles.forEach((file) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreviews((prev) => [...prev, reader.result as string]);
      };
      reader.readAsDataURL(file);
    });
  };

  const removeImage = (index: number) => {
    setImagePreviews((prev) => prev.filter((_, i) => i !== index));
    setImageFiles((prev) => prev.filter((_, i) => i !== index));
  };

  const uploadImage = async (file: File): Promise<string> => {
    const fileExt = file.name.split('.').pop();
    const fileName = `${Math.random()}.${fileExt}`;
    const filePath = `${fileName}`;

    try {
      const { error: uploadError, data } = await supabase.storage
        .from('PRODUCTS')
        .upload(filePath, file, {
          cacheControl: '3600',
          upsert: true,
        });

      if (uploadError) {
        console.error('Upload error details:', uploadError);
        throw new Error(`Erro ao fazer upload: ${uploadError.message}`);
      }

      const { data: publicUrl } = supabase.storage.from('PRODUCTS').getPublicUrl(filePath);
      return publicUrl.publicUrl;
    } catch (error: any) {
      console.error('Upload failed:', error);
      throw error;
    }
  };

  const formatPriceBR = (value: string): string => {
    const cleaned = value.replace(/\D/g, '');
    if (!cleaned) return '';

    const padded = cleaned.padStart(3, '0');
    const integerPart = padded.slice(0, -2) || '0';
    const decimalPart = padded.slice(-2);

    const formatter = new Intl.NumberFormat('pt-BR', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });

    return formatter.format(parseFloat(integerPart + '.' + decimalPart));
  };

  const parsePriceBR = (value: string): number => {
    const cleaned = value.replace(/\D/g, '');
    if (!cleaned) return 0;

    const padded = cleaned.padStart(3, '0');
    const integerPart = padded.slice(0, -2) || '0';
    const decimalPart = padded.slice(-2);

    return parseFloat(integerPart + '.' + decimalPart);
  };

  const handlePriceChange = (value: string) => {
    const formatted = formatPriceBR(value);
    setFormData({ ...formData, price: formatted });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      let imageUrls: string[] = [];

      if (imageFiles.length > 0) {
        imageUrls = await Promise.all(imageFiles.map((file) => uploadImage(file)));
      }

      const allImageUrls = [
        ...imagePreviews.filter((preview) => !preview.startsWith('data:')),
        ...imageUrls,
      ];

      const imageUrl = allImageUrls.length > 0 ? JSON.stringify(allImageUrls) : formData.image_url;

      const productData = {
        name: formData.name,
        description: formData.description || null,
        price: parsePriceBR(formData.price),
        stock: parseInt(formData.stock) || 0,
        category_id: formData.category_id || null,
        image_url: imageUrl,
      };

      if (product) {
        const { error } = await supabase
          .from('products')
          .update(productData)
          .eq('id', product.id);

        if (error) throw error;

        toast({
          title: 'Produto atualizado',
          description: 'As alterações foram salvas com sucesso.',
        });
      } else {
        const { error } = await supabase
          .from('products')
          .insert([productData]);

        if (error) throw error;

        toast({
          title: 'Produto criado',
          description: 'O novo produto foi adicionado ao catálogo.',
        });
      }

      onClose();
    } catch (error: any) {
      toast({
        title: 'Erro ao salvar produto',
        description: error.message,
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>
            {product ? 'Editar Produto' : 'Novo Produto'}
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Nome do Produto *</Label>
            <Input
              id="name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Descrição</Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              rows={3}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="price">Preço (R$) *</Label>
              <Input
                id="price"
                type="text"
                placeholder="0,00"
                value={formData.price}
                onChange={(e) => handlePriceChange(e.target.value)}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="stock">Estoque *</Label>
              <Input
                id="stock"
                type="number"
                value={formData.stock}
                onChange={(e) => setFormData({ ...formData, stock: e.target.value })}
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="category">Categoria</Label>
              <Select
                value={formData.category_id}
                onValueChange={(value) => setFormData({ ...formData, category_id: value })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Selecione uma categoria" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((category) => (
                    <SelectItem key={category.id} value={category.id}>
                      {category.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="image">Imagens do Produto (até 5)</Label>
            <div className="flex items-center gap-4">
              <Button
                type="button"
                variant="outline"
                onClick={() => document.getElementById('image')?.click()}
                disabled={imagePreviews.length >= 5}
              >
                <Upload className="w-4 h-4 mr-2" />
                Adicionar Imagem
              </Button>
              <span className="text-sm text-muted-foreground">
                {imagePreviews.length}/5 imagens
              </span>
              <Input
                id="image"
                type="file"
                accept="image/*"
                multiple
                onChange={handleImageChange}
                className="hidden"
              />
            </div>
            {imagePreviews.length > 0 && (
              <div className="mt-4 grid grid-cols-5 gap-4">
                {imagePreviews.map((preview, index) => (
                  <div key={index} className="relative">
                    <img
                      src={preview}
                      alt={`Preview ${index + 1}`}
                      className="w-24 h-24 object-cover rounded"
                    />
                    <button
                      type="button"
                      onClick={() => removeImage(index)}
                      className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="flex justify-end gap-2 pt-4">
            <Button type="button" variant="outline" onClick={onClose}>
              Cancelar
            </Button>
            <Button type="submit" disabled={loading}>
              {loading ? 'Salvando...' : 'Salvar'}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};
