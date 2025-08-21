import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAuth } from '../contexts/AuthContext';
import { useTheme } from '../contexts/ThemeContext';
import { getProducts, deleteProduct } from '../api/products';
import LoadingSpinner from '../components/LoadingSpinner';
import { toast } from 'react-toastify';
import {
  PlusCircleIcon,
  PencilIcon,
  TrashIcon,
  EyeIcon,
  ChartBarIcon
} from '@heroicons/react/24/outline';

const MyProducts = () => {
  const { user } = useAuth();
  const { darkMode } = useTheme();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [deletingId, setDeletingId] = useState(null);
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    const fetchMyProducts = async () => {
      try {
        setLoading(true);
        const response = await getProducts({ owner: user._id });
        if (response.success) {
          setProducts(response.data || []);
        } else {
          setError(response.error || 'Failed to load your products');
        }
      } catch (err) {
        setError('Failed to load your products');
        console.error('Error fetching products:', err);
      } finally {
        setLoading(false);
      }
    };

    if (user) {
      fetchMyProducts();
    }
  }, [user]);

  const handleDeleteProduct = async (productId) => {
    if (!window.confirm('Are you sure you want to delete this product?')) {
      return;
    }

    try {
      setDeletingId(productId);
      await deleteProduct(productId);
      setProducts(products.filter(p => p._id !== productId));
      toast.success('Product deleted successfully');
    } catch (err) {
      toast.error('Failed to delete product');
      console.error('Error deleting product:', err);
    } finally {
      setDeletingId(null);
    }
  };

  const filteredProducts = products.filter(product => {
    if (filter === 'all') return true;
    return product.status === filter;
  });

  const getStatusColor = (status) => {
    switch (status) {
      case 'approved':
        return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300';
      case 'rejected':
        return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300';
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
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold mb-2">My Products</h1>
            <p className="text-gray-600 dark:text-gray-400">
              Manage your listed products and track their performance
            </p>
          </div>
          <Link
            to="/products/new"
            className="btn-primary flex items-center mt-4 sm:mt-0"
          >
            <PlusCircleIcon className="h-5 w-5 mr-2" />
            Add New Product
          </Link>
        </div>

        {/* Filters */}
        <div className="mb-6">
          <div className="flex flex-wrap gap-2">
            {[
              { key: 'all', label: 'All Products' },
              { key: 'approved', label: 'Approved' },
              { key: 'pending', label: 'Pending' },
              { key: 'rejected', label: 'Rejected' }
            ].map((filterOption) => (
              <button
                key={filterOption.key}
                onClick={() => setFilter(filterOption.key)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  filter === filterOption.key
                    ? 'bg-primary-600 text-white'
                    : darkMode
                    ? 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                    : 'bg-white text-gray-700 hover:bg-gray-100'
                }`}
              >
                {filterOption.label}
              </button>
            ))}
          </div>
        </div>

        {/* Products Grid */}
        {error ? (
          <div className="text-center py-10">
            <p className="text-red-500 mb-4">{error}</p>
            <button 
              onClick={() => window.location.reload()} 
              className="btn-secondary"
            >
              Try Again
            </button>
          </div>
        ) : filteredProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredProducts.map((product, index) => (
              <motion.div
                key={product._id}
                className={`${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <div className="relative">
                  <img 
                    src={product.imageUrl || 'https://via.placeholder.com/300x200?text=No+Image'} 
                    alt={product.name}
                    className="w-full h-48 object-cover"
                  />
                  <div className="absolute top-3 right-3">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(product.status)}`}>
                      {product.status}
                    </span>
                  </div>
                </div>
                
                <div className="p-4">
                  <h3 className="font-semibold mb-2 line-clamp-2">{product.name}</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-3 line-clamp-2">
                    {product.description}
                  </p>
                  <div className="flex justify-between items-center mb-4">
                    <span className="text-lg font-bold text-primary-600">
                      ₹{product.price}/day
                    </span>
                    <span className="text-sm text-gray-500 dark:text-gray-400">
                      {product.category}
                    </span>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <div className="flex space-x-2">
                      <Link
                        to={`/products/${product._id}`}
                        className="p-2 text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-lg transition-colors"
                        title="View Product"
                      >
                        <EyeIcon className="h-4 w-4" />
                      </Link>
                      <Link
                        to={`/products/edit/${product._id}`}
                        className="p-2 text-green-600 hover:bg-green-50 dark:hover:bg-green-900/20 rounded-lg transition-colors"
                        title="Edit Product"
                      >
                        <PencilIcon className="h-4 w-4" />
                      </Link>
                      <button
                        onClick={() => handleDeleteProduct(product._id)}
                        disabled={deletingId === product._id}
                        className="p-2 text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors disabled:opacity-50"
                        title="Delete Product"
                      >
                        {deletingId === product._id ? (
                          <LoadingSpinner size="small" />
                        ) : (
                          <TrashIcon className="h-4 w-4" />
                        )}
                      </button>
                    </div>
                    <Link
                      to={`/products/${product._id}/analytics`}
                      className="p-2 text-purple-600 hover:bg-purple-50 dark:hover:bg-purple-900/20 rounded-lg transition-colors"
                      title="View Analytics"
                    >
                      <ChartBarIcon className="h-4 w-4" />
                    </Link>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        ) : (
          <motion.div
            className="text-center py-20"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
          >
            <ShoppingBagIcon className="h-16 w-16 text-gray-400 mx-auto mb-6" />
            <h3 className="text-xl font-semibold mb-4">No Products Found</h3>
            <p className="text-gray-600 dark:text-gray-400 mb-8">
              {filter === 'all' 
                ? "You haven't listed any products yet. Start earning by listing your items!"
                : `No ${filter} products found. Try changing the filter.`
              }
            </p>
            {filter === 'all' && (
              <Link to="/products/new" className="btn-primary">
                <PlusCircleIcon className="h-5 w-5 mr-2" />
                List Your First Product
              </Link>
            )}
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default MyProducts;