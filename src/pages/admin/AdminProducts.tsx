import React, { useState } from 'react';
import { Plus } from 'lucide-react';
import { useProducts } from '../../hooks/useProducts';
import ProductForm from './components/ProductForm';
import ProductSearch from '../../components/product/ProductSearch';
import ProductTable from '../../components/product/ProductTable';
import { Product } from '../../types';

export default function AdminProducts() {
  const { products, searchTerm, setSearchTerm, addProduct, updateProduct, deleteProduct } = useProducts();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);

  const handleAddProduct = (productData: Omit<Product, 'id'>) => {
    addProduct(productData);
    setIsModalOpen(false);
  };

  const handleEditProduct = (productData: Product) => {
    updateProduct(productData);
    setEditingProduct(null);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Manage Products</h1>
        <button
          onClick={() => setIsModalOpen(true)}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2"
        >
          <Plus className="h-5 w-5" />
          Add Product
        </button>
      </div>

      <ProductSearch
        value={searchTerm}
        onChange={setSearchTerm}
      />

      <ProductTable
        products={products}
        onEdit={setEditingProduct}
        onDelete={deleteProduct}
      />

      {(isModalOpen || editingProduct) && (
        <ProductForm
          initialData={editingProduct || undefined}
          onSubmit={editingProduct ? handleEditProduct : handleAddProduct}
          onClose={() => {
            setIsModalOpen(false);
            setEditingProduct(null);
          }}
        />
      )}
    </div>
  );
}