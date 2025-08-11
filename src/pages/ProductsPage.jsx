import React, { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { mockApi } from '../data/mockData';
import { 
  SearchIcon, 
  FilterIcon, 
  XIcon,
  AdjustmentsIcon 
} from '@heroicons/react/outline';
import ProductCard from '../components/ProductCard';
import { LoadingCard } from '../components/LoadingSpinner';
import Button from '../components/Button';
import Input from '../components/Input';
import Card from '../components/Card';

const ProductsPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showFilters, setShowFilters] = useState(false);
  
  const [filters, setFilters] = useState({
    search: searchParams.get('search') || '',
    category: searchParams.get('category') || '',
    minPrice: searchParams.get('minPrice') || '',
    maxPrice: searchParams.get('maxPrice') || '',
    availability: searchParams.get('availability') === 'true' ? true : searchParams.get('availability') === 'false' ? false : undefined
  });

  const categories = ['Electronics', 'Vehicles', 'Audio Equipment', 'Sports Equipment', 'Tools'];

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const cleanFilters = Object.fromEntries(
        Object.entries(filters).filter(([_, value]) => value !== '' && value !== undefined)
      );
      const response = await mockApi.getProducts(cleanFilters);
      setProducts(response.data);
    } catch (error) {
      console.error('Error fetching products:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  useEffect(() => {
    // Update URL params when filters change
    const params = new URLSearchParams();
    Object.entries(filters).forEach(([key, value]) => {
      if (value !== '' && value !== undefined) {
        params.set(key, value.toString());
      }
    });
    setSearchParams(params);
  }, [filters, setSearchParams]);

  const handleFilterChange = (key, value) => {
    setFilters(prev => ({
      ...prev,
      [key]: value
    }));
  };

  const applyFilters = () => {
    fetchProducts();
    setShowFilters(false);
  };

  const clearFilters = () => {
    setFilters({
      search: '',
      category: '',
      minPrice: '',
      maxPrice: '',
      availability: undefined
    });
    fetchProducts();
  };

  const handleBookNow = (product) => {
    navigate(`/products/${product.id}`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Navigation */}
      <nav className="glass-dark border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-r from-violet-500 to-purple-500 rounded-lg flex items-center justify-center">
                <SearchIcon className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold text-white">Browse Products</span>
            </div>
            
            <div className="flex items-center space-x-4">
              <Button
                variant="ghost"
                onClick={() => navigate('/')}
              >
                Home
              </Button>
              <Button
                variant="ghost"
                onClick={() => navigate('/login')}
              >
                Sign In
              </Button>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Search & Filters Header */}
        <div className="space-y-6 mb-8">
          {/* Search Bar */}
          <div className="relative max-w-2xl">
            <Input
              type="text"
              placeholder="Search for products..."
              value={filters.search}
              onChange={(e) => handleFilterChange('search', e.target.value)}
              icon={<SearchIcon className="w-5 h-5" />}
              className="pr-24"
            />
            <Button 
              onClick={applyFilters}
              className="absolute right-2 top-2 bottom-2"
              size="sm"
            >
              Search
            </Button>
          </div>

          {/* Filter Toggle & Quick Filters */}
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex flex-wrap items-center gap-4">
              <Button
                variant="secondary"
                onClick={() => setShowFilters(!showFilters)}
                icon={<FilterIcon className="w-4 h-4" />}
                size="sm"
              >
                Filters
              </Button>

              {/* Quick Category Filters */}
              <div className="hidden md:flex items-center space-x-2">
                {categories.slice(0, 3).map(category => (
                  <button
                    key={category}
                    onClick={() => {
                      handleFilterChange('category', filters.category === category ? '' : category);
                      fetchProducts();
                    }}
                    className={`px-3 py-1 text-sm rounded-lg transition-all ${
                      filters.category === category
                        ? 'bg-violet-600 text-white'
                        : 'glass text-slate-300 hover:text-white hover:bg-white/10'
                    }`}
                  >
                    {category}
                  </button>
                ))}
              </div>
            </div>

            <div className="text-sm text-slate-400">
              {products.length} products found
            </div>
          </div>

          {/* Advanced Filters Panel */}
          {showFilters && (
            <Card className="space-y-6">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-white">Filters</h3>
                <button
                  onClick={() => setShowFilters(false)}
                  className="text-gray-400 hover:text-white"
                >
                  <XIcon className="w-5 h-5" />
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">
                    Category
                  </label>
                  <select
                    value={filters.category}
                    onChange={(e) => handleFilterChange('category', e.target.value)}
                    className="input-glass w-full"
                  >
                    <option value="">All Categories</option>
                    {categories.map(category => (
                      <option key={category} value={category}>{category}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">
                    Min Price (₹/day)
                  </label>
                  <Input
                    type="number"
                    placeholder="0"
                    value={filters.minPrice}
                    onChange={(e) => handleFilterChange('minPrice', e.target.value)}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">
                    Max Price (₹/day)
                  </label>
                  <Input
                    type="number"
                    placeholder="No limit"
                    value={filters.maxPrice}
                    onChange={(e) => handleFilterChange('maxPrice', e.target.value)}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">
                    Availability
                  </label>
                  <select
                    value={filters.availability === undefined ? '' : filters.availability.toString()}
                    onChange={(e) => handleFilterChange('availability', e.target.value === '' ? undefined : e.target.value === 'true')}
                    className="input-glass w-full"
                  >
                    <option value="">All Products</option>
                    <option value="true">Available Only</option>
                    <option value="false">Unavailable Only</option>
                  </select>
                </div>
              </div>

              <div className="flex items-center space-x-4">
                <Button onClick={applyFilters}>
                  Apply Filters
                </Button>
                <Button variant="ghost" onClick={clearFilters}>
                  Clear All
                </Button>
              </div>
            </Card>
          )}
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {loading ? (
            Array.from({ length: 8 }).map((_, index) => (
              <LoadingCard key={index} />
            ))
          ) : products.length > 0 ? (
            products.map((product) => (
              <ProductCard 
                key={product.id} 
                product={product}
                onBookNow={handleBookNow}
              />
            ))
          ) : (
            <div className="col-span-full">
              <Card className="text-center py-12">
                <AdjustmentsIcon className="w-16 h-16 text-slate-400 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-white mb-2">No Products Found</h3>
                <p className="text-slate-400 mb-6">
                  Try adjusting your search criteria or browse all products.
                </p>
                <Button onClick={clearFilters}>
                  Clear Filters
                </Button>
              </Card>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductsPage;