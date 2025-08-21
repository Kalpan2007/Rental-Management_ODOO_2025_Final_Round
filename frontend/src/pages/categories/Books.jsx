import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '../../contexts/ThemeContext';
import { getProducts } from '../../api/products';
import ProductCard from '../../components/ProductCard';
import LoadingSpinner from '../../components/LoadingSpinner';
import { BookOpenIcon } from '@heroicons/react/24/outline';

const Books = () => {
  const { darkMode } = useTheme();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        setLoading(true);
        const response = await getProducts({ category: 'Books' });
        if (response.success) {
          setProducts(response.data || []);
        } else {
          setError(response.error || 'Failed to load books');
        }
        setLoading(false);
      } catch (err) {
        setError('Failed to load books');
        setLoading(false);
        console.error('Error fetching books:', err);
      }
    };

    fetchBooks();
  }, []);

  const subcategories = [
    {
      name: 'Academic Books',
      description: 'Textbooks, reference books, and study materials',
      icon: '📚',
      count: 500
    },
    {
      name: 'Fiction',
      description: 'Novels, short stories, and literary fiction',
      icon: '📖',
      count: 300
    },
    {
      name: 'Non-Fiction',
      description: 'Biographies, self-help, and educational books',
      icon: '📝',
      count: 250
    },
    {
      name: 'Technical Books',
      description: 'Programming, engineering, and technical manuals',
      icon: '💻',
      count: 180
    },
    {
      name: 'Children\'s Books',
      description: 'Picture books, stories, and educational books for kids',
      icon: '🧸',
      count: 200
    },
    {
      name: 'Rare & Collectible',
      description: 'First editions, signed copies, and rare books',
      icon: '📜',
      count: 50
    }
  ];

  return (
    <div className={`min-h-screen ${
      darkMode 
        ? 'bg-gradient-to-br from-[#583101] via-[#603808] to-[#6f4518]' 
        : 'bg-gradient-to-br from-[#ffedd8] via-[#f3d5b5] to-[#e7bc91]'
    }`}>
      {/* Header */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.div
            className="text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <BookOpenIcon className={`h-16 w-16 mx-auto mb-6 ${
              darkMode ? 'text-[#bc8a5f]' : 'text-[#8b5e34]'
            }`} />
            <h1 className={`text-4xl md:text-6xl font-bold mb-6 ${
              darkMode ? 'text-[#ffedd8]' : 'text-[#583101]'
            }`}>
              Books & Literature
            </h1>
            <p className={`text-xl md:text-2xl mb-8 max-w-3xl mx-auto ${
              darkMode ? 'text-[#e7bc91]' : 'text-[#8b5e34]'
            }`}>
              Access thousands of books without the commitment of buying
            </p>
          </motion.div>
        </div>
      </section>

      {/* Subcategories */}
      <section className={`py-16 px-4 sm:px-6 lg:px-8 ${
        darkMode ? 'bg-[#603808]/50' : 'bg-white/50'
      } backdrop-blur-sm`}>
        <div className="max-w-7xl mx-auto">
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className={`text-3xl font-bold mb-4 ${
              darkMode ? 'text-[#ffedd8]' : 'text-[#583101]'
            }`}>
              Book Categories
            </h2>
            <p className={`text-lg ${
              darkMode ? 'text-[#e7bc91]' : 'text-[#8b5e34]'
            }`}>
              Discover books across all genres and subjects
            </p>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {subcategories.map((category, index) => (
              <motion.div
                key={index}
                className={`p-6 rounded-xl hover:shadow-lg transition-all duration-300 cursor-pointer ${
                  darkMode ? 'bg-[#8b5e34]/30' : 'bg-[#f3d5b5]/50'
                }`}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ y: -5 }}
              >
                <div className="text-4xl mb-4">{category.icon}</div>
                <h3 className={`text-xl font-semibold mb-2 ${
                  darkMode ? 'text-[#ffedd8]' : 'text-[#583101]'
                }`}>
                  {category.name}
                </h3>
                <p className={`mb-3 ${
                  darkMode ? 'text-[#e7bc91]' : 'text-[#6f4518]'
                }`}>
                  {category.description}
                </p>
                <div className={`font-medium ${
                  darkMode ? 'text-[#bc8a5f]' : 'text-[#8b5e34]'
                }`}>
                  {category.count} books available
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Products */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className={`text-3xl font-bold mb-4 ${
              darkMode ? 'text-[#ffedd8]' : 'text-[#583101]'
            }`}>
              Available Books
            </h2>
            <p className={`text-lg ${
              darkMode ? 'text-[#e7bc91]' : 'text-[#8b5e34]'
            }`}>
              Expand your knowledge with our book collection
            </p>
          </motion.div>

          {loading ? (
            <div className="flex justify-center py-20">
              <LoadingSpinner size="large" />
            </div>
          ) : error ? (
            <div className="text-center py-10">
              <p className="text-red-500 mb-4">{error}</p>
              <button 
                onClick={() => window.location.reload()} 
                className={`py-2 px-6 rounded-xl font-semibold transition-all duration-200 border-2 ${
                  darkMode
                    ? 'border-[#bc8a5f] text-[#bc8a5f] hover:bg-[#bc8a5f] hover:text-[#ffedd8]'
                    : 'border-[#8b5e34] text-[#8b5e34] hover:bg-[#8b5e34] hover:text-[#ffedd8]'
                }`}
              >
                Try Again
              </button>
            </div>
          ) : products.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {products.map((product, index) => (
                <ProductCard key={product._id} product={product} index={index} />
              ))}
            </div>
          ) : (
            <div className="text-center py-10">
              <p className={`text-lg mb-4 ${
                darkMode ? 'text-[#ffedd8]' : 'text-[#583101]'
              }`}>
                No books available at the moment
              </p>
              <p className={`${
                darkMode ? 'text-[#e7bc91]' : 'text-[#8b5e34]'
              }`}>
                Check back soon for new additions!
              </p>
            </div>
          )}
        </div>
      </section>

      {/* Why Rent Books */}
      <section className={`py-16 px-4 sm:px-6 lg:px-8 ${
        darkMode ? 'bg-[#603808]/50' : 'bg-white/50'
      } backdrop-blur-sm`}>
        <div className="max-w-7xl mx-auto">
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className={`text-3xl font-bold mb-4 ${
              darkMode ? 'text-[#ffedd8]' : 'text-[#583101]'
            }`}>
              Why Rent Books?
            </h2>
            <p className={`text-lg ${
              darkMode ? 'text-[#e7bc91]' : 'text-[#8b5e34]'
            }`}>
              Smart reading for students and book lovers
            </p>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                title: 'Cost Effective',
                description: 'Save money on expensive textbooks and references',
                icon: '💰'
              },
              {
                title: 'Space Saving',
                description: 'No need to store books after reading',
                icon: '📦'
              },
              {
                title: 'Latest Editions',
                description: 'Access to newest editions and publications',
                icon: '🆕'
              },
              {
                title: 'Try Before Buy',
                description: 'Read books before deciding to purchase',
                icon: '🔍'
              }
            ].map((benefit, index) => (
              <motion.div
                key={index}
                className={`text-center p-6 rounded-xl ${
                  darkMode ? 'bg-[#8b5e34]/30' : 'bg-[#f3d5b5]/50'
                }`}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <div className="text-4xl mb-4">{benefit.icon}</div>
                <h3 className={`text-lg font-semibold mb-2 ${
                  darkMode ? 'text-[#ffedd8]' : 'text-[#583101]'
                }`}>
                  {benefit.title}
                </h3>
                <p className={`${
                  darkMode ? 'text-[#e7bc91]' : 'text-[#6f4518]'
                }`}>
                  {benefit.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Books;