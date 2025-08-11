import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { toast } from 'react-toastify';
import { useForm } from 'react-hook-form';
import { getProduct, createProduct, updateProduct } from '../../api/products';
import { useTheme } from '../../contexts/ThemeContext';
import LoadingSpinner from '../../components/LoadingSpinner';

const ProductForm = () => {
  const { darkMode } = useTheme();
  const { id } = useParams();
  const navigate = useNavigate();
  const isEditMode = Boolean(id);
  const [loading, setLoading] = useState(isEditMode);
  const [submitting, setSubmitting] = useState(false);
  const [imagePreview, setImagePreview] = useState('');
  const [imageFile, setImageFile] = useState(null);
  
  const { register, handleSubmit, setValue, watch, formState: { errors } } = useForm({
    defaultValues: {
      name: '',
      description: '',
      category: '',
      price: '',
      available: true,
      features: [{ name: '', value: '' }]
    }
  });

  const features = watch('features') || [];

  // Predefined categories
  const categories = [
    'Electronics',
    'Photography',
    'Audio Equipment',
    'Video Equipment',
    'Camping Gear',
    'Party Supplies',
    'Tools',
    'Sports Equipment',
    'Musical Instruments',
    'Other'
  ];

  // Fetch product data if in edit mode
  useEffect(() => {
    if (isEditMode) {
      const fetchProduct = async () => {
        try {
          const response = await getProduct(id);
          const product = response.data;
          
          // Set form values
          setValue('name', product.name);
          setValue('description', product.description);
          setValue('category', product.category);
          setValue('price', product.price);
          setValue('available', product.available);
          
          // Set features or default to empty array
          setValue('features', product.features?.length > 0 
            ? product.features 
            : [{ name: '', value: '' }]
          );
          
          // Set image preview
          if (product.imageUrl) {
            setImagePreview(product.imageUrl);
          }
          
          setLoading(false);
        } catch (err) {
          toast.error('Failed to load product');
          console.error('Error fetching product:', err);
          setLoading(false);
          navigate('/admin/products');
        }
      };

      fetchProduct();
    }
  }, [id, isEditMode, setValue, navigate]);

  // Handle image change
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  // Add feature field
  const addFeature = () => {
    setValue('features', [...features, { name: '', value: '' }]);
  };

  // Remove feature field
  const removeFeature = (index) => {
    const updatedFeatures = [...features];
    updatedFeatures.splice(index, 1);
    setValue('features', updatedFeatures);
  };

  // Handle form submission
  const onSubmit = async (data) => {
    setSubmitting(true);
    
    try {
      // Filter out empty features
      const filteredFeatures = data.features.filter(feature => 
        feature.name.trim() !== '' || feature.value.trim() !== ''
      );
      
      // Create form data for file upload
      const formData = new FormData();
      formData.append('name', data.name);
      formData.append('description', data.description);
      formData.append('category', data.category);
      formData.append('price', data.price);
      formData.append('available', data.available);
      formData.append('features', JSON.stringify(filteredFeatures));
      
      if (imageFile) {
        formData.append('image', imageFile);
      }
      
      let response;
      if (isEditMode) {
        response = await updateProduct(id, formData);
        toast.success('Product updated successfully');
      } else {
        response = await createProduct(formData);
        toast.success('Product created successfully');
      }
      
      navigate('/admin/products');
    } catch (err) {
      toast.error(isEditMode ? 'Failed to update product' : 'Failed to create product');
      console.error('Error saving product:', err);
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <LoadingSpinner size="large" />
      </div>
    );
  }

  return (
    <div className={`min-h-screen ${darkMode ? 'bg-gray-900 text-white' : 'bg-gray-50 text-gray-900'}`}>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <motion.div
          className={`${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-lg shadow-md overflow-hidden`}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="p-6">
            <h1 className="text-2xl font-bold mb-6">
              {isEditMode ? 'Edit Product' : 'Add New Product'}
            </h1>
            
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              {/* Basic Information */}
              <div className="space-y-4">
                <h2 className="text-xl font-semibold">Basic Information</h2>
                
                <div>
                  <label className="block text-sm font-medium mb-1">Product Name</label>
                  <input
                    type="text"
                    className={`w-full rounded-md ${darkMode ? 'bg-gray-700 border-gray-600' : 'bg-white border-gray-300'} focus:ring-primary-500 focus:border-primary-500`}
                    {...register('name', { required: 'Product name is required' })}
                  />
                  {errors.name && <p className="mt-1 text-sm text-red-600">{errors.name.message}</p>}
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-1">Description</label>
                  <textarea
                    rows="4"
                    className={`w-full rounded-md ${darkMode ? 'bg-gray-700 border-gray-600' : 'bg-white border-gray-300'} focus:ring-primary-500 focus:border-primary-500`}
                    {...register('description', { required: 'Description is required' })}
                  ></textarea>
                  {errors.description && <p className="mt-1 text-sm text-red-600">{errors.description.message}</p>}
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-1">Category</label>
                    <select
                      className={`w-full rounded-md ${darkMode ? 'bg-gray-700 border-gray-600' : 'bg-white border-gray-300'} focus:ring-primary-500 focus:border-primary-500`}
                      {...register('category', { required: 'Category is required' })}
                    >
                      <option value="">Select a category</option>
                      {categories.map((category, index) => (
                        <option key={index} value={category}>{category}</option>
                      ))}
                    </select>
                    {errors.category && <p className="mt-1 text-sm text-red-600">{errors.category.message}</p>}
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium mb-1">Price (per day)</label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <span className="text-gray-500">$</span>
                      </div>
                      <input
                        type="number"
                        step="0.01"
                        min="0"
                        className={`w-full pl-7 rounded-md ${darkMode ? 'bg-gray-700 border-gray-600' : 'bg-white border-gray-300'} focus:ring-primary-500 focus:border-primary-500`}
                        {...register('price', { 
                          required: 'Price is required',
                          min: { value: 0, message: 'Price must be positive' },
                          pattern: { value: /^\d+(\.\d{1,2})?$/, message: 'Price must be a valid number' }
                        })}
                      />
                    </div>
                    {errors.price && <p className="mt-1 text-sm text-red-600">{errors.price.message}</p>}
                  </div>
                </div>
                
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="available"
                    className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                    {...register('available')}
                  />
                  <label htmlFor="available" className="ml-2 block text-sm">
                    Available for rent
                  </label>
                </div>
              </div>
              
              {/* Product Image */}
              <div className="space-y-4">
                <h2 className="text-xl font-semibold">Product Image</h2>
                
                <div className="flex flex-col items-center space-y-4">
                  {imagePreview ? (
                    <div className="relative">
                      <img 
                        src={imagePreview} 
                        alt="Product preview" 
                        className="h-48 w-48 object-cover rounded-md" 
                      />
                      <button
                        type="button"
                        onClick={() => {
                          setImagePreview('');
                          setImageFile(null);
                        }}
                        className="absolute top-2 right-2 bg-red-600 text-white rounded-full p-1 hover:bg-red-700 transition duration-200"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                        </svg>
                      </button>
                    </div>
                  ) : (
                    <div className="flex justify-center items-center border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-md h-48 w-full">
                      <label className="cursor-pointer text-center p-4">
                        <svg className="mx-auto h-12 w-12 text-gray-400" stroke="currentColor" fill="none" viewBox="0 0 48 48" aria-hidden="true">
                          <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">Click to upload image</p>
                        <input 
                          type="file" 
                          accept="image/*" 
                          className="hidden" 
                          onChange={handleImageChange} 
                        />
                      </label>
                    </div>
                  )}
                  
                  {!imagePreview && (
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      {isEditMode ? 'Leave empty to keep current image' : 'Recommended size: 800x600 pixels'}
                    </p>
                  )}
                </div>
              </div>
              
              {/* Product Features */}
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <h2 className="text-xl font-semibold">Product Features</h2>
                  <button
                    type="button"
                    onClick={addFeature}
                    className="px-3 py-1 bg-primary-600 hover:bg-primary-700 text-white rounded-md transition duration-200"
                  >
                    Add Feature
                  </button>
                </div>
                
                <div className="space-y-3">
                  {features.map((feature, index) => (
                    <div key={index} className="flex space-x-2">
                      <div className="flex-1">
                        <input
                          type="text"
                          placeholder="Feature name"
                          className={`w-full rounded-md ${darkMode ? 'bg-gray-700 border-gray-600' : 'bg-white border-gray-300'} focus:ring-primary-500 focus:border-primary-500`}
                          {...register(`features.${index}.name`)}
                        />
                      </div>
                      <div className="flex-1">
                        <input
                          type="text"
                          placeholder="Feature value"
                          className={`w-full rounded-md ${darkMode ? 'bg-gray-700 border-gray-600' : 'bg-white border-gray-300'} focus:ring-primary-500 focus:border-primary-500`}
                          {...register(`features.${index}.value`)}
                        />
                      </div>
                      <button
                        type="button"
                        onClick={() => removeFeature(index)}
                        className="px-2 py-2 bg-red-600 hover:bg-red-700 text-white rounded-md transition duration-200"
                        disabled={features.length <= 1}
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                        </svg>
                      </button>
                    </div>
                  ))}
                </div>
              </div>
              
              {/* Form Actions */}
              <div className="flex justify-end space-x-3 pt-4 border-t border-gray-200 dark:border-gray-700">
                <button
                  type="button"
                  onClick={() => navigate('/admin/products')}
                  className={`px-4 py-2 rounded-md ${darkMode ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-200 hover:bg-gray-300'} transition duration-200`}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={submitting}
                  className="px-4 py-2 bg-primary-600 hover:bg-primary-700 text-white rounded-md transition duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center"
                >
                  {submitting ? (
                    <>
                      <LoadingSpinner size="small" />
                      <span className="ml-2">Saving...</span>
                    </>
                  ) : (
                    isEditMode ? 'Update Product' : 'Create Product'
                  )}
                </button>
              </div>
            </form>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default ProductForm;