import { useState, useMemo } from 'react';

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

export const useProductSearch = (products: Product[]) => {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredProducts = useMemo(() => {
    if (!searchQuery.trim()) {
      return products;
    }

    const query = searchQuery.toLowerCase().trim();

    return products.filter((product) => {
      const name = product.name.toLowerCase();
      const description = (product.description || '').toLowerCase();
      const category = (product.categories?.name || '').toLowerCase();
      const price = product.price.toString();
      const discount = (product.discount || 0).toString();

      return (
        name.includes(query) ||
        description.includes(query) ||
        category.includes(query) ||
        price.includes(query) ||
        discount.includes(query)
      );
    });
  }, [products, searchQuery]);

  return {
    searchQuery,
    setSearchQuery,
    filteredProducts
  };
};
