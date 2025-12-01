import { useState, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { useAdmin } from '@/hooks/useAdmin';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import { ProductTable } from '@/components/admin/ProductTable';
import { ProductFormDialog } from '@/components/admin/ProductFormDialog';
import { toast } from '@/hooks/use-toast';
import { LogOut, Plus, Settings, Home, Menu, Search } from 'lucide-react';

const Dashboard = () => {
  const { isAdmin, loading, user } = useAdmin();
  const navigate = useNavigate();
  const [products, setProducts] = useState<any[]>([]);
  const [categories, setCategories] = useState<any[]>([]);
  const [loadingProducts, setLoadingProducts] = useState(true);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<any>(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    if (!loading && !isAdmin) {
      toast({
        title: 'Acesso negado',
        description: 'Você não tem permissão para acessar esta página.',
        variant: 'destructive',
      });
      navigate('/');
    }
  }, [isAdmin, loading, navigate]);

  useEffect(() => {
    if (isAdmin) {
      fetchProducts();
      fetchCategories();
    }
  }, [isAdmin]);

  const fetchProducts = async () => {
    setLoadingProducts(true);
    try {
      const { data, error } = await supabase
        .from('products')
        .select(`
          *,
          categories (
            id,
            name
          )
        `)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setProducts(data || []);
    } catch (error: any) {
      toast({
        title: 'Erro ao carregar produtos',
        description: error.message,
        variant: 'destructive',
      });
    } finally {
      setLoadingProducts(false);
    }
  };

  const fetchCategories = async () => {
    try {
      const { data, error } = await supabase
        .from('categories')
        .select('*')
        .order('name');

      if (error) throw error;
      setCategories(data || []);
    } catch (error: any) {
      toast({
        title: 'Erro ao carregar categorias',
        description: error.message,
        variant: 'destructive',
      });
    }
  };

  const handleLogout = async () => {
    try {
      await supabase.auth.signOut();
      toast({
        title: 'Logout realizado',
        description: 'Até logo!',
      });
    } catch (error) {
      console.error('Erro ao fazer logout:', error);
    }
    window.location.href = '/';
  };

  const handleEdit = (product: any) => {
    setEditingProduct(product);
    setIsFormOpen(true);
  };

  const handleDelete = async (productId: string) => {
    if (!confirm('Tem certeza que deseja excluir este produto?')) return;

    try {
      const { error } = await supabase
        .from('products')
        .delete()
        .eq('id', productId);

      if (error) throw error;

      toast({
        title: 'Produto excluído',
        description: 'O produto foi removido com sucesso.',
      });

      fetchProducts();
    } catch (error: any) {
      toast({
        title: 'Erro ao excluir produto',
        description: error.message,
        variant: 'destructive',
      });
    }
  };

  const handleFormClose = () => {
    setIsFormOpen(false);
    setEditingProduct(null);
    fetchProducts();
  };

  const filteredProducts = useMemo(() => {
    if (!searchQuery.trim()) {
      return products;
    }

    const query = searchQuery.toLowerCase().trim();
    return products.filter((product) => {
      const name = product.name.toLowerCase();
      const description = (product.description || '').toLowerCase();
      const category = (product.categories?.name || '').toLowerCase();

      return (
        name.includes(query) ||
        description.includes(query) ||
        category.includes(query)
      );
    });
  }, [products, searchQuery]);

  if (loading || !isAdmin) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>Carregando...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b bg-card">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold">Painel Administrativo</h1>
            <p className="text-sm text-muted-foreground">Vick Colchões - Gestão de Produtos</p>
          </div>
          <Button
            variant="outline"
            size="icon"
            onClick={() => setSidebarOpen(true)}
          >
            <Menu className="w-5 h-5" />
          </Button>
        </div>
      </header>

      <Sheet open={sidebarOpen} onOpenChange={setSidebarOpen}>
        <SheetContent side="right" className="w-[250px]">
          <SheetHeader>
            <SheetTitle>Menu</SheetTitle>
          </SheetHeader>
          <div className="flex flex-col gap-4 mt-6">
            <Button
              variant="ghost"
              className="justify-start gap-2 h-auto py-2"
              onClick={() => {
                navigate('/');
                setSidebarOpen(false);
              }}
            >
              <Home className="w-4 h-4" />
              <span>Catálogo</span>
            </Button>
            <Button
              variant="ghost"
              className="justify-start gap-2 h-auto py-2"
              onClick={() => {
                navigate('/admin/settings');
                setSidebarOpen(false);
              }}
            >
              <Settings className="w-4 h-4" />
              <span>Configurações</span>
            </Button>
            <Button
              variant="ghost"
              className="justify-start gap-2 h-auto py-2 text-red-600 hover:text-red-700 hover:bg-red-50"
              onClick={() => {
                handleLogout();
                setSidebarOpen(false);
              }}
            >
              <LogOut className="w-4 h-4" />
              <span>Sair</span>
            </Button>
          </div>
        </SheetContent>
      </Sheet>

      <main className="container mx-auto px-4 py-8">
        <div className="mb-6">
          <div className="mb-4">
            <h2 className="text-xl font-semibold">Produtos</h2>
            <p className="text-sm text-muted-foreground">
              Gerencie o catálogo de produtos da loja
            </p>
          </div>

          <div className="flex items-center justify-between gap-3">
            <div className="relative max-w-xs flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                type="text"
                placeholder="Buscar por nome ou categoria..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 pr-4 py-2 w-full"
              />
            </div>
            <Button onClick={() => setIsFormOpen(true)}>
              <Plus className="w-4 h-4 mr-2" />
              Novo Produto
            </Button>
          </div>
        </div>

        <ProductTable
          products={filteredProducts}
          loading={loadingProducts}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />

        <ProductFormDialog
          open={isFormOpen}
          onClose={handleFormClose}
          product={editingProduct}
          categories={categories}
        />
      </main>
    </div>
  );
};

export default Dashboard;
