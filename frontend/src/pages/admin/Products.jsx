import { useState, useEffect } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { toast } from 'react-toastify';
import { getProducts, deleteProduct } from '../../api/products';
import { useTheme } from '../../contexts/ThemeContext';
import LoadingSpinner from '../../components/LoadingSpinner';

const Products = () => {
  const { darkMode } = useTheme();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [isDeleting, setIsDeleting] = useState(false);
  const [sortField, setSortField] = useState('createdAt');
  const [sortOrder, setSortOrder] = useState('desc');
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState('');
  const [categories, setCategories] = useState([]);

  const pageSize = 10;

  useEffect(() => {
    // Get page from URL or default to 1
    const page = parseInt(searchParams.get('page')) || 1;
    setCurrentPage(page);

    // Get search term from URL
    const search = searchParams.get('search') || '';
    setSearchTerm(search);

    // Get category filter from URL
    const category = searchParams.get('category') || '';
    setFilterCategory(category);

    // Get sort from URL
    const sort = searchParams.get('sort') || 'createdAt';
    setSortField(sort);

    // Get order from URL
    const order = searchParams.get('order') || 'desc';
    setSortOrder(order);

    fetchProducts(page, search, category, sort, order);
  }, [searchParams]);

  const fetchProducts = async (page, search, category, sort, order) => {
    setLoading(true);
    try {
      const response = await getProducts({
        page,
        limit: pageSize,
        search,
        category,
        sort,
        order,
        includeUnavailable: true // Admin should see all products
      });

      setProducts(response.data.products);
      setTotalPages(Math.ceil(response.data.total / pageSize));
      
      // Extract unique categories
      const uniqueCategories = [...new Set(response.data.products.map(product => product.category))];
      setCategories(uniqueCategories);
      
      setLoading(false);
    } catch (err) {
      setError('Failed to load products');
      setLoading(false);
      console.error('Error fetching products:', err);
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    updateUrlAndFetch({ search: searchTerm, page: 1 });
  };

  const handleCategoryChange = (e) => {
    const category = e.target.value;
    setFilterCategory(category);
    updateUrlAndFetch({ category, page: 1 });
  };

  const handleSort = (field) => {
    const newOrder = field === sortField && sortOrder === 'asc' ? 'desc' : 'asc';
    setSortField(field);
    setSortOrder(newOrder);
    updateUrlAndFetch({ sort: field, order: newOrder });
  };

  const updateUrlAndFetch = (params) => {
    const newSearchParams = new URLSearchParams(searchParams);
    
    // Update search params
    Object.entries(params).forEach(([key, value]) => {
      if (value) {
        newSearchParams.set(key, value);
      } else {
        newSearchParams.delete(key);
      }
    });
    
    navigate(`/admin/products?${newSearchParams.toString()}`);
  };

  const handlePageChange = (page) => {
    if (page < 1 || page > totalPages) return;
    updateUrlAndFetch({ page });
  };

  const handleSelectProduct = (productId) => {
    setSelectedProducts(prev => {
      if (prev.includes(productId)) {
        return prev.filter(id => id !== productId);
      } else {
        return [...prev, productId];
      }
    });
  };

  const handleSelectAll = () => {
    if (selectedProducts.length === products.length) {
      setSelectedProducts([]);
    } else {
      setSelectedProducts(products.map(product => product._id));
    }
  };

  const handleDeleteSelected = async () => {
    if (window.confirm(`Are you sure you want to delete ${selectedProducts.length} products?`)) {
      setIsDeleting(true);
      try {
        // Delete products one by one
        for (const productId of selectedProducts) {
          await deleteProduct(productId);
        }
        
        toast.success(`${selectedProducts.length} products deleted successfully`);
        setSelectedProducts([]);
        // Refresh the product list
        fetchProducts(currentPage, searchTerm, filterCategory, sortField, sortOrder);
      } catch (err) {
        toast.error('Failed to delete products');
        console.error('Error deleting products:', err);
      } finally {
        setIsDeleting(false);
      }
    }
  };

  const handleDeleteProduct = async (productId) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      setIsDeleting(true);
      try {
        await deleteProduct(productId);
        toast.success('Product deleted successfully');
        // Refresh the product list
        fetchProducts(currentPage, searchTerm, filterCategory, sortField, sortOrder);
      } catch (err) {
        toast.error('Failed to delete product');
        console.error('Error deleting product:', err);
      } finally {
        setIsDeleting(false);
      }
    }
  };

  // Format currency
  const formatCurrency = (value) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(value);
  };

  // Format date
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  return (
    <div className={`min-h-screen ${darkMode ? 'bg-gray-900 text-white' : 'bg-gray-50 text-gray-900'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">Products Management</h1>
          <Link 
            to="/admin/products/new" 
            className="px-4 py-2 bg-primary-600 hover:bg-primary-700 text-white rounded-md transition duration-200"
          >
            Add New Product
          </Link>
        </div>

        {/* Filters and Search */}
        <div className={`${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-lg shadow-md p-6 mb-6`}>
          <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0 md:space-x-4">
            <form onSubmit={handleSearch} className="flex-1">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search products..."
                  className={`w-full pl-10 pr-4 py-2 rounded-md ${darkMode ? 'bg-gray-700 text-white border-gray-600' : 'bg-gray-50 text-gray-900 border-gray-300'} border focus:ring-primary-500 focus:border-primary-500`}
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <svg className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>
                <button 
                  type="submit"
                  className="absolute inset-y-0 right-0 px-3 bg-primary-600 hover:bg-primary-700 text-white rounded-r-md transition duration-200"
                >
                  Search
                </button>
              </div>
            </form>

            <div className="flex space-x-4">
              <select
                className={`rounded-md border ${darkMode ? 'bg-gray-700 text-white border-gray-600' : 'bg-white text-gray-900 border-gray-300'} px-3 py-2 focus:ring-primary-500 focus:border-primary-500`}
                value={filterCategory}
                onChange={handleCategoryChange}
              >
                <option value="">All Categories</option>
                {categories.map((category, index) => (
                  <option key={index} value={category}>{category}</option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Products Table */}
        <motion.div
          className={`${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-lg shadow-md overflow-hidden`}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {loading ? (
            <div className="flex justify-center py-20">
              <LoadingSpinner size="large" />
            </div>
          ) : error ? (
            <div className="text-center py-20">
              <p className="text-red-500 text-xl">{error}</p>
              <button 
                onClick={() => fetchProducts(currentPage, searchTerm, filterCategory, sortField, sortOrder)}
                className="mt-4 px-4 py-2 bg-primary-600 hover:bg-primary-700 text-white rounded-md transition duration-200"
              >
                Try Again
              </button>
            </div>
          ) : (
            <>
              {/* Bulk Actions */}
              {selectedProducts.length > 0 && (
                <div className="p-4 bg-primary-50 dark:bg-primary-900 border-b border-primary-100 dark:border-primary-800 flex items-center justify-between">
                  <p className="text-primary-700 dark:text-primary-300">
                    {selectedProducts.length} {selectedProducts.length === 1 ? 'product' : 'products'} selected
                  </p>
                  <button
                    onClick={handleDeleteSelected}
                    disabled={isDeleting}
                    className="px-3 py-1 bg-red-600 hover:bg-red-700 text-white rounded-md transition duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center"
                  >
                    {isDeleting ? (
                      <>
                        <LoadingSpinner size="small" />
                        <span className="ml-2">Deleting...</span>
                      </>
                    ) : (
                      'Delete Selected'
                    )}
                  </button>
                </div>
              )}

              {/* Table */}
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                  <thead className={`${darkMode ? 'bg-gray-700' : 'bg-gray-50'}`}>
                    <tr>
                      <th className="px-6 py-3 text-left">
                        <div className="flex items-center">
                          <input
                            type="checkbox"
                            className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                            checked={selectedProducts.length === products.length && products.length > 0}
                            onChange={handleSelectAll}
                          />
                        </div>
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider cursor-pointer" onClick={() => handleSort('name')}>
                        <div className="flex items-center">
                          <span>Name</span>
                          {sortField === 'name' && (
                            <span className="ml-1">
                              {sortOrder === 'asc' ? '↑' : '↓'}
                            </span>
                          )}
                        </div>
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider cursor-pointer" onClick={() => handleSort('category')}>
                        <div className="flex items-center">
                          <span>Category</span>
                          {sortField === 'category' && (
                            <span className="ml-1">
                              {sortOrder === 'asc' ? '↑' : '↓'}
                            </span>
                          )}
                        </div>
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider cursor-pointer" onClick={() => handleSort('price')}>
                        <div className="flex items-center">
                          <span>Price</span>
                          {sortField === 'price' && (
                            <span className="ml-1">
                              {sortOrder === 'asc' ? '↑' : '↓'}
                            </span>
                          )}
                        </div>
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider cursor-pointer" onClick={() => handleSort('available')}>
                        <div className="flex items-center">
                          <span>Status</span>
                          {sortField === 'available' && (
                            <span className="ml-1">
                              {sortOrder === 'asc' ? '↑' : '↓'}
                            </span>
                          )}
                        </div>
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider cursor-pointer" onClick={() => handleSort('createdAt')}>
                        <div className="flex items-center">
                          <span>Created</span>
                          {sortField === 'createdAt' && (
                            <span className="ml-1">
                              {sortOrder === 'asc' ? '↑' : '↓'}
                            </span>
                          )}
                        </div>
                      </th>
                      <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                    {products.length > 0 ? (
                      products.map((product) => (
                        <tr key={product._id} className={`${darkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-50'}`}>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <input
                              type="checkbox"
                              className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                              checked={selectedProducts.includes(product._id)}
                              onChange={() => handleSelectProduct(product._id)}
                            />
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center">
                              <div className="h-10 w-10 flex-shrink-0">
                                <img 
                                  className="h-10 w-10 rounded-md object-cover" 
                                  src={product.imageUrl || 'https://via.placeholder.com/150'} 
                                  alt={product.name} 
                                />
                              </div>
                              <div className="ml-4">
                                <div className="text-sm font-medium">
                                  {product.name}
                                </div>
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className="px-2 py-1 text-xs rounded-full bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300">
                              {product.category}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            {formatCurrency(product.price)}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className={`px-2 py-1 text-xs rounded-full ${product.available ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300' : 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300'}`}>
                              {product.available ? 'Available' : 'Unavailable'}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm">
                            {formatDate(product.createdAt)}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                            <div className="flex justify-end space-x-2">
                              <Link 
                                to={`/admin/products/edit/${product._id}`}
                                className="text-primary-600 hover:text-primary-900 dark:hover:text-primary-400"
                              >
                                Edit
                              </Link>
                              <button 
                                onClick={() => handleDeleteProduct(product._id)}
                                disabled={isDeleting}
                                className="text-red-600 hover:text-red-900 dark:hover:text-red-400 disabled:opacity-50 disabled:cursor-not-allowed"
                              >
                                Delete
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan="7" className="px-6 py-10 text-center">
                          <p className="text-gray-500 dark:text-gray-400">No products found</p>
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>

              {/* Pagination */}
              {totalPages > 1 && (
                <div className="px-6 py-4 flex items-center justify-between border-t border-gray-200 dark:border-gray-700">
                  <div className="flex-1 flex justify-between sm:hidden">
                    <button
                      onClick={() => handlePageChange(currentPage - 1)}
                      disabled={currentPage === 1}
                      className="relative inline-flex items-center px-4 py-2 border border-gray-300 dark:border-gray-600 text-sm font-medium rounded-md bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-600 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      Previous
                    </button>
                    <button
                      onClick={() => handlePageChange(currentPage + 1)}
                      disabled={currentPage === totalPages}
                      className="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 dark:border-gray-600 text-sm font-medium rounded-md bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-600 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      Next
                    </button>
                  </div>
                  <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
                    <div>
                      <p className="text-sm text-gray-700 dark:text-gray-300">
                        Showing <span className="font-medium">{(currentPage - 1) * pageSize + 1}</span> to <span className="font-medium">{Math.min(currentPage * pageSize, products.length + (currentPage - 1) * pageSize)}</span> of <span className="font-medium">{totalPages * pageSize}</span> results
                      </p>
                    </div>
                    <div>
                      <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
                        <button
                          onClick={() => handlePageChange(1)}
                          disabled={currentPage === 1}
                          className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-sm font-medium text-gray-500 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-600 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                          <span className="sr-only">First</span>
                          <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                            <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
                            <path fillRule="evenodd" d="M8.707 5.293a1 1 0 010 1.414L5.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
                          </svg>
                        </button>
                        <button
                          onClick={() => handlePageChange(currentPage - 1)}
                          disabled={currentPage === 1}
                          className="relative inline-flex items-center px-2 py-2 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-sm font-medium text-gray-500 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-600 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                          <span className="sr-only">Previous</span>
                          <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                            <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
                          </svg>
                        </button>
                        
                        {/* Page numbers */}
                        {[...Array(totalPages).keys()].map(number => {
                          const page = number + 1;
                          // Show current page, and 1 page before and after
                          if (page === 1 || page === totalPages || (page >= currentPage - 1 && page <= currentPage + 1)) {
                            return (
                              <button
                                key={page}
                                onClick={() => handlePageChange(page)}
                                className={`relative inline-flex items-center px-4 py-2 border ${currentPage === page ? 'border-primary-500 bg-primary-50 dark:bg-primary-900 text-primary-600 dark:text-primary-300' : 'border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-600'}`}
                              >
                                {page}
                              </button>
                            );
                          } else if (page === currentPage - 2 || page === currentPage + 2) {
                            // Show ellipsis
                            return (
                              <span key={page} className="relative inline-flex items-center px-4 py-2 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-200">
                                ...
                              </span>
                            );
                          }
                          return null;
                        })}
                        
                        <button
                          onClick={() => handlePageChange(currentPage + 1)}
                          disabled={currentPage === totalPages}
                          className="relative inline-flex items-center px-2 py-2 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-sm font-medium text-gray-500 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-600 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                          <span className="sr-only">Next</span>
                          <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                            <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                          </svg>
                        </button>
                        <button
                          onClick={() => handlePageChange(totalPages)}
                          disabled={currentPage === totalPages}
                          className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-sm font-medium text-gray-500 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-600 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                          <span className="sr-only">Last</span>
                          <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                            <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                          </svg>
                          <path fillRule="evenodd" d="M11.293 14.707a1 1 0 010-1.414L14.586 10l-3.293-3.293a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                        </button>
                      </nav>
                    </div>
                  </div>
                </div>
              )}
            </>
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default Products;