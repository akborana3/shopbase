import React, { useState, useEffect } from 'react';
import { X, Plus, Image as ImageIcon } from 'lucide-react';
import FormInput from '../../../components/auth/FormInput';
import LoadingSpinner from '../../../components/common/LoadingSpinner';

interface ProductFormProps {
  initialData?: {
    id?: string;
    name: string;
    description: string;
    price: number;
    category: string;
    stock: number;
    image: string;
    additionalImages?: string[];
    rating: number;
    features?: string[];
    specifications?: Record<string, string>;
  };
  onSubmit: (data: any) => void;
  onClose: () => void;
}

export default function ProductForm({ initialData, onSubmit, onClose }: ProductFormProps) {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: 0,
    category: '',
    stock: 0,
    image: '',
    additionalImages: ['', '', ''],
    rating: 0,
    features: [''],
    specifications: { '': '' }
  });

  useEffect(() => {
    if (initialData) {
      setFormData({
        ...initialData,
        additionalImages: initialData.additionalImages || ['', '', ''],
        features: initialData.features || [''],
        specifications: initialData.specifications || { '': '' }
      });
    }
  }, [initialData]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'price' || name === 'stock' || name === 'rating' 
        ? Number(value) 
        : value
    }));
  };

  const handleFeatureChange = (index: number, value: string) => {
    const newFeatures = [...formData.features];
    newFeatures[index] = value;
    setFormData(prev => ({ ...prev, features: newFeatures }));
  };

  const addFeature = () => {
    setFormData(prev => ({ ...prev, features: [...prev.features, ''] }));
  };

  const removeFeature = (index: number) => {
    setFormData(prev => ({
      ...prev,
      features: prev.features.filter((_, i) => i !== index)
    }));
  };

  const handleSpecificationChange = (key: string, value: string, oldKey?: string) => {
    const newSpecs = { ...formData.specifications };
    if (oldKey && oldKey !== key) {
      delete newSpecs[oldKey];
    }
    newSpecs[key] = value;
    setFormData(prev => ({ ...prev, specifications: newSpecs }));
  };

  const addSpecification = () => {
    setFormData(prev => ({
      ...prev,
      specifications: { ...prev.specifications, '': '' }
    }));
  };

  const removeSpecification = (key: string) => {
    const newSpecs = { ...formData.specifications };
    delete newSpecs[key];
    setFormData(prev => ({ ...prev, specifications: newSpecs }));
  };

  const handleImageChange = (index: number, value: string) => {
    const newImages = [...formData.additionalImages];
    newImages[index] = value;
    setFormData(prev => ({ ...prev, additionalImages: newImages }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const cleanedData = {
        ...formData,
        features: formData.features.filter(f => f.trim() !== ''),
        specifications: Object.fromEntries(
          Object.entries(formData.specifications).filter(([k, v]) => k.trim() !== '' && v.trim() !== '')
        ),
        additionalImages: formData.additionalImages.filter(img => img.trim() !== '')
      };
      await onSubmit(cleanedData);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white dark:bg-gray-800 rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold">
              {initialData ? 'Edit Product' : 'Add New Product'}
            </h2>
            <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full">
              <X className="h-6 w-6" />
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormInput
                label="Product Name"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
              />

              <FormInput
                label="Category"
                id="category"
                name="category"
                value={formData.category}
                onChange={handleChange}
                required
              />

              <FormInput
                label="Price"
                id="price"
                name="price"
                type="number"
                value={formData.price}
                onChange={handleChange}
                required
              />

              <FormInput
                label="Stock"
                id="stock"
                name="stock"
                type="number"
                value={formData.stock}
                onChange={handleChange}
                required
              />

              <FormInput
                label="Rating"
                id="rating"
                name="rating"
                type="number"
                min="0"
                max="5"
                step="0.1"
                value={formData.rating}
                onChange={handleChange}
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Description
              </label>
              <textarea
                name="description"
                rows={4}
                value={formData.description}
                onChange={handleChange}
                className="w-full rounded-lg border-gray-300 dark:border-gray-600 dark:bg-gray-700"
                required
              />
            </div>

            {/* Product Images Section */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Product Images</h3>
              
              <FormInput
                label="Main Product Image"
                id="image"
                name="image"
                value={formData.image}
                onChange={handleChange}
                required
              />

              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Additional Images
                </label>
                {formData.additionalImages.map((img, index) => (
                  <div key={index} className="flex gap-2">
                    <input
                      type="text"
                      value={img}
                      onChange={(e) => handleImageChange(index, e.target.value)}
                      placeholder={`Additional image URL ${index + 1}`}
                      className="flex-1 rounded-lg border-gray-300 dark:border-gray-600 dark:bg-gray-700"
                    />
                    {img && (
                      <div className="w-12 h-12 rounded-lg overflow-hidden">
                        <img
                          src={img}
                          alt={`Preview ${index + 1}`}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Features Section */}
            <div>
              <div className="flex justify-between items-center mb-2">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Features
                </label>
                <button
                  type="button"
                  onClick={addFeature}
                  className="text-sm text-blue-600 hover:text-blue-700"
                >
                  Add Feature
                </button>
              </div>
              <div className="space-y-2">
                {formData.features.map((feature, index) => (
                  <div key={index} className="flex gap-2">
                    <input
                      type="text"
                      value={feature}
                      onChange={(e) => handleFeatureChange(index, e.target.value)}
                      className="flex-1 rounded-lg border-gray-300 dark:border-gray-600 dark:bg-gray-700"
                      placeholder="Enter feature"
                    />
                    <button
                      type="button"
                      onClick={() => removeFeature(index)}
                      className="p-2 text-red-600 hover:text-red-700"
                    >
                      <X className="h-5 w-5" />
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Specifications Section */}
            <div>
              <div className="flex justify-between items-center mb-2">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Specifications
                </label>
                <button
                  type="button"
                  onClick={addSpecification}
                  className="text-sm text-blue-600 hover:text-blue-700"
                >
                  Add Specification
                </button>
              </div>
              <div className="space-y-2">
                {Object.entries(formData.specifications).map(([key, value], index) => (
                  <div key={index} className="flex gap-2">
                    <input
                      type="text"
                      value={key}
                      onChange={(e) => handleSpecificationChange(e.target.value, value, key)}
                      className="flex-1 rounded-lg border-gray-300 dark:border-gray-600 dark:bg-gray-700"
                      placeholder="Specification name"
                    />
                    <input
                      type="text"
                      value={value}
                      onChange={(e) => handleSpecificationChange(key, e.target.value)}
                      className="flex-1 rounded-lg border-gray-300 dark:border-gray-600 dark:bg-gray-700"
                      placeholder="Specification value"
                    />
                    <button
                      type="button"
                      onClick={() => removeSpecification(key)}
                      className="p-2 text-red-600 hover:text-red-700"
                    >
                      <X className="h-5 w-5" />
                    </button>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex justify-end gap-4">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 text-gray-700 hover:text-gray-900"
                disabled={loading}
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={loading}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center gap-2"
              >
                {loading ? (
                  <LoadingSpinner size="sm" />
                ) : (
                  <>{initialData ? 'Update Product' : 'Add Product'}</>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}