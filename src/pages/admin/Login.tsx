import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { toast } from '@/hooks/use-toast';
import logo from '@/assets/logo.jpg';

const Login = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) throw error;

      if (data.user) {
        toast({
          title: 'Login realizado com sucesso!',
          description: 'Bem-vindo ao painel administrativo.',
        });
        navigate('/admin/dashboard');
      }
    } catch (error: any) {
      toast({
        title: 'Erro ao fazer login',
        description: error.message,
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
      });

      if (error) throw error;

      if (data.user) {
        await supabase
          .from('profiles')
          .insert([
            {
              id: data.user.id,
              name,
            },
          ]);

        toast({
          title: 'Cadastro realizado com sucesso!',
          description: 'Você pode fazer login agora.',
        });
        setIsLogin(true);
        setEmail('');
        setPassword('');
        setName('');
      }
    } catch (error: any) {
      toast({
        title: 'Erro ao cadastrar',
        description: error.message,
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="w-full max-w-md p-8 space-y-6 bg-card rounded-lg shadow-lg border">
        <div className="text-center space-y-2">
          <img src={logo} alt="Vick Colchões" className="w-16 h-16 rounded-full mx-auto object-cover" />
          <h1 className="text-2xl font-bold">Painel Administrativo</h1>
          <p className="text-muted-foreground">Vick Colchões</p>
        </div>

        <form onSubmit={isLogin ? handleLogin : handleRegister} className="space-y-4">
          {!isLogin && (
            <div className="space-y-2">
              <Label htmlFor="name">Nome</Label>
              <Input
                id="name"
                type="text"
                placeholder="Seu nome"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>
          )}

          <div className="space-y-2">
            <Label htmlFor="email">E-mail</Label>
            <Input
              id="email"
              type="email"
              placeholder="seuemail@exemplo.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="password">Senha</Label>
            <Input
              id="password"
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <Button type="submit" className="w-full" disabled={loading}>
            {loading ? (isLogin ? 'Entrando...' : 'Cadastrando...') : (isLogin ? 'Entrar' : 'Cadastrar')}
          </Button>
        </form>

        <div className="text-center space-y-2">
          <Button
            variant="link"
            onClick={() => {
              setIsLogin(!isLogin);
              setEmail('');
              setPassword('');
              setName('');
            }}
            className="text-sm w-full"
          >
            {isLogin ? 'Não tem conta? Cadastre-se' : 'Já tem conta? Faça login'}
          </Button>
          <Button
            variant="link"
            onClick={() => navigate('/')}
            className="text-sm w-full"
          >
            Voltar para o site
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Login;
