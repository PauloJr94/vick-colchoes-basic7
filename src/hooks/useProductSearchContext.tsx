import { createContext, useContext, useState, ReactNode } from 'react';

interface ProductSearchContextType {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
}

const ProductSearchContext = createContext<ProductSearchContextType | undefined>(undefined);

export const ProductSearchProvider = ({ children }: { children: ReactNode }) => {
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <ProductSearchContext.Provider value={{ searchQuery, setSearchQuery }}>
      {children}
    </ProductSearchContext.Provider>
  );
};

export const useProductSearchContext = () => {
  const context = useContext(ProductSearchContext);
  if (!context) {
    throw new Error('useProductSearchContext must be used within ProductSearchProvider');
  }
  return context;
};
