import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { getProducts } from '../../api/products';

const ProductFilter = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [categories, setCategories] = useState([]);
  const [filters, setFilters] = useState({
    search: searchParams.get('search') || '',
    category: searchParams.get('category') || '',
    minPrice: searchParams.get('minPrice') || '',
    maxPrice: searchParams.get('maxPrice') || '',
    availability: searchParams.get('availability') || ''
  });

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
    <motion.div 
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="mb-8 p-4 rounded-lg bg-white dark:bg-gray-800 shadow"
    >
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
            <option value="true">Available</option>
            <option value="false">Unavailable</option>
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
    </motion.div>
  );
};

export default ProductFilter;