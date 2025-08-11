import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { getProducts } from '../api/products';
import ProductCard from '../components/ProductCard';
import LoadingSpinner from '../components/LoadingSpinner';
import { useTheme } from '../contexts/ThemeContext';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const Products = () => {
  const { user } = useAuth();
  const [searchParams, setSearchParams] = useSearchParams();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [categories, setCategories] = useState([]);
  const [filters, setFilters] = useState({
    search: searchParams.get('search') || '',
    category: searchParams.get('category') || '',
    minPrice: searchParams.get('minPrice') || '',
    maxPrice: searchParams.get('maxPrice') || '',
    availability: searchParams.get('availability') || ''
  });
  const { darkMode } = useTheme();

  // Fetch products based on filters
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        // Convert filters to query params, removing empty values
        const queryParams = Object.entries(filters).reduce((acc, [key, value]) => {
          if (value) acc[key] = value;
          return acc;
        }, {});
        
        const response = await getProducts(queryParams);
        setProducts(response.data);
        setLoading(false);
      } catch (err) {
        setError('Failed to load products');
        setLoading(false);
        console.error('Error fetching products:', err);
      }
    };

    fetchProducts();
  }, [filters]);

  // Fetch categories for filter
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        // This would typically be a separate API call to get all categories
        // For now, we'll extract unique categories from products
        const response = await getProducts();
        const allProducts = response.data;
        const uniqueCategories = [...new Set(allProducts.map(product => product.category))];
        setCategories(uniqueCategories);
      } catch (err) {
        console.error('Error fetching categories:', err);
      }
    };

    fetchCategories();
  }, []);

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters(prev => ({
      ...prev,
      [name]: value
    }));

    // Update URL search params
    if (value) {
      searchParams.set(name, value);
    } else {
      searchParams.delete(name);
    }
    setSearchParams(searchParams);
  };

  const clearFilters = () => {
    setFilters({
      search: '',
      category: '',
      minPrice: '',
      maxPrice: '',
      availability: ''
    });
    setSearchParams({});
  };

  return (
    <div className={`min-h-screen ${darkMode ? 'bg-gray-900 text-white' : 'bg-gray-50 text-gray-900'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">Browse Products</h1>
          {user && (
            <Link
              to="/products/new"
              className="btn-primary flex items-center space-x-2"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
              </svg>
              <span>Add Product</span>
            </Link>
          )}
        </div>
        
        {/* Filters Section */}
        <div className={`mb-8 p-4 rounded-lg ${darkMode ? 'bg-gray-800' : 'bg-white'} shadow`}>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
            {/* Search Filter */}
            <div>
              <label htmlFor="search" className="block text-sm font-medium mb-1">Search</label>
              <input
                type="text"
                id="search"
                name="search"
                value={filters.search}
                onChange={handleFilterChange}
                placeholder="Search products..."
                className="input w-full"
              />
            </div>
            
            {/* Category Filter */}
            <div>
              <label htmlFor="category" className="block text-sm font-medium mb-1">Category</label>
              <select
                id="category"
                name="category"
                value={filters.category}
                onChange={handleFilterChange}
                className="input w-full"
              >
                <option value="">All Categories</option>
                {categories.map((category, index) => (
                  <option key={index} value={category}>{category}</option>
                ))}
              </select>
            </div>
            
            {/* Price Range Filters */}
            <div>
              <label htmlFor="minPrice" className="block text-sm font-medium mb-1">Min Price</label>
              <input
                type="number"
                id="minPrice"
                name="minPrice"
                value={filters.minPrice}
                onChange={handleFilterChange}
                placeholder="Min Price"
                min="0"
                className="input w-full"
              />
            </div>
            
            <div>
              <label htmlFor="maxPrice" className="block text-sm font-medium mb-1">Max Price</label>
              <input
                type="number"
                id="maxPrice"
                name="maxPrice"
                value={filters.maxPrice}
                onChange={handleFilterChange}
                placeholder="Max Price"
                min="0"
                className="input w-full"
              />
            </div>
            
            {/* Availability Filter */}
            <div>
              <label htmlFor="availability" className="block text-sm font-medium mb-1">Availability</label>
              <select
                id="availability"
                name="availability"
                value={filters.availability}
                onChange={handleFilterChange}
                className="input w-full"
              >
                <option value="">All</option>
                <option value="true">Available Now</option>
                <option value="false">Not Available</option>
              </select>
            </div>
          </div>
          
          <div className="mt-4 flex justify-end">
            <button 
              onClick={clearFilters}
              className="btn-secondary"
            >
              Clear Filters
            </button>
          </div>
        </div>
        
        {/* Products Grid */}
        {loading ? (
          <div className="flex justify-center py-20">
            <LoadingSpinner size="large" />
          </div>
        ) : error ? (
          <div className="text-center py-10">
            <p className="text-red-500">{error}</p>
            <button 
              onClick={() => window.location.reload()} 
              className="mt-4 btn-secondary"
            >
              Try Again
            </button>
          </div>
        ) : (
          <>
            <p className="mb-4">{products.length} products found</p>
            {products.length > 0 ? (
              <motion.div 
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
              >
                {products.map((product) => (
                  <ProductCard key={product._id} product={product} />
                ))}
              </motion.div>
            ) : (
              <div className="text-center py-10">
                <p>No products match your filters.</p>
                <button 
                  onClick={clearFilters} 
                  className="mt-4 btn-primary"
                >
                  Clear Filters
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default Products;