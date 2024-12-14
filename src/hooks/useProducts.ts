import { useState, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store/store';
import { Product } from '../types';
import { addProduct, updateProduct, deleteProduct } from '../store/slices/productSlice';

export function useProducts() {
  const dispatch = useDispatch();
  const products = useSelector((state: RootState) => state.products.items);
  const [searchTerm, setSearchTerm] = useState('');

  const filteredProducts = products.filter(
    (product) =>
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAddProduct = useCallback((productData: Omit<Product, 'id'>) => {
    const newProduct = {
      ...productData,
      id: Date.now().toString(),
    };
    dispatch(addProduct(newProduct));
    return newProduct;
  }, [dispatch]);

  const handleUpdateProduct = useCallback((product: Product) => {
    dispatch(updateProduct(product));
  }, [dispatch]);

  const handleDeleteProduct = useCallback((id: string) => {
    dispatch(deleteProduct(id));
  }, [dispatch]);

  return {
    products: filteredProducts,
    searchTerm,
    setSearchTerm,
    addProduct: handleAddProduct,
    updateProduct: handleUpdateProduct,
    deleteProduct: handleDeleteProduct,
  };
}