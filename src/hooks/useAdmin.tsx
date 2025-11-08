import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';

export const useAdmin = () => {
  const [isAdmin, setIsAdmin] = useState<boolean>(false);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      try {
        setUser(session?.user ?? null);
        if (session?.user) {
          setIsAdmin(true);
        } else {
          setIsAdmin(false);
        }
      } catch (error) {
        console.error('Error in auth state change:', error);
        setIsAdmin(false);
      } finally {
        setLoading(false);
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  const checkAuthStatus = async () => {
    try {
      const { data: { session } } = await supabase.auth.getSession();

      if (!session?.user) {
        setIsAdmin(false);
        setUser(null);
        setLoading(false);
        return;
      }

      const { data: { user }, error } = await supabase.auth.getUser();

      if (error || !user) {
        setIsAdmin(false);
        setUser(null);
        setLoading(false);
        return;
      }

      setUser(user);
      setIsAdmin(true);
      setLoading(false);
    } catch (error: any) {
      setIsAdmin(false);
      setUser(null);
      setLoading(false);
    }
  };

  return { isAdmin, loading, user };
};
