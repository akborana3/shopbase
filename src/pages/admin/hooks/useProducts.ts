import { useState, useCallback } from 'react';
import { Product } from '../../../types';
import { products as initialProducts } from '../../../data/products';

export function useProducts() {
  const [products, setProducts] = useState<Product[]>(initialProducts);
  const [searchTerm, setSearchTerm] = useState('');

  const filteredProducts = products.filter(
    (product) =>
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const deleteProduct = useCallback((id: string) => {
    setProducts((prev) => prev.filter((product) => product.id !== id));
  }, []);

  const updateProduct = useCallback((updatedProduct: Product) => {
    setProducts((prev) =>
      prev.map((product) =>
        product.id === updatedProduct.id ? updatedProduct : product
      )
    );
  }, []);

  return {
    products: filteredProducts,
    searchTerm,
    setSearchTerm,
    deleteProduct,
    updateProduct,
  };
}