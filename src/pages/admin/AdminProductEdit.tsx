import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Save, ArrowLeft } from 'lucide-react';
import { products } from '../../data/products';
import FormInput from '../../components/auth/FormInput';

export default function AdminProductEdit() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState({
    name: '',
    description: '',
    price: 0,
    category: '',
    stock: 0,
    image: '',
  });

  useEffect(() => {
    const foundProduct = products.find((p) => p.id === id);
    if (foundProduct) {
      setProduct(foundProduct);
    }
  }, [id]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, this would make an API call to update the product
    console.log('Updated product:', product);
    navigate('/admin/products');
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setProduct((prev) => ({
      ...prev,
      [name]: name === 'price' || name === 'stock' ? Number(value) : value,
    }));
  };

  return (
    <div className="p-6">
      <div className="flex items-center gap-4 mb-8">
        <button
          onClick={() => navigate('/admin/products')}
          className="p-2 hover:bg-gray-100 rounded-full"
        >
          <ArrowLeft className="h-6 w-6" />
        </button>
        <h1 className="text-2xl font-bold">Edit Product</h1>
      </div>

      <div className="max-w-2xl mx-auto">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormInput
                label="Product Name"
                id="name"
                name="name"
                value={product.name}
                onChange={handleChange}
                required
              />

              <FormInput
                label="Category"
                id="category"
                name="category"
                value={product.category}
                onChange={handleChange}
                required
              />

              <FormInput
                label="Price"
                id="price"
                name="price"
                type="number"
                value={product.price}
                onChange={handleChange}
                required
              />

              <FormInput
                label="Stock"
                id="stock"
                name="stock"
                type="number"
                value={product.stock}
                onChange={handleChange}
                required
              />

              <FormInput
                label="Image URL"
                id="image"
                name="image"
                value={product.image}
                onChange={handleChange}
                required
              />
            </div>

            <div>
              <label
                htmlFor="description"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300"
              >
                Description
              </label>
              <textarea
                id="description"
                name="description"
                rows={4}
                value={product.description}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                required
              />
            </div>

            <div className="flex justify-end">
              <button
                type="submit"
                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center gap-2"
              >
                <Save className="h-5 w-5" />
                Save Changes
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}