import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '../../contexts/ThemeContext';
import { getProducts } from '../../api/products';
import ProductCard from '../../components/ProductCard';
import LoadingSpinner from '../../components/LoadingSpinner';

const Fashion = () => {
  const { darkMode } = useTheme();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchFashionProducts = async () => {
      try {
        setLoading(true);
        const response = await getProducts({ category: 'Fashion' });
        if (response.success) {
          setProducts(response.data || []);
        } else {
          setError(response.error || 'Failed to load fashion items');
        }
        setLoading(false);
      } catch (err) {
        setError('Failed to load fashion items');
        setLoading(false);
        console.error('Error fetching fashion products:', err);
      }
    };

    fetchFashionProducts();
  }, []);

  const subcategories = [
    {
      name: 'Designer Wear',
      description: 'Luxury designer clothing and accessories',
      icon: '👗',
      count: 80
    },
    {
      name: 'Traditional Wear',
      description: 'Ethnic wear for weddings and festivals',
      icon: '🥻',
      count: 120
    },
    {
      name: 'Formal Wear',
      description: 'Business suits and formal attire',
      icon: '👔',
      count: 60
    },
    {
      name: 'Party Wear',
      description: 'Glamorous outfits for special occasions',
      icon: '✨',
      count: 90
    },
    {
      name: 'Accessories',
      description: 'Jewelry, bags, shoes, and fashion accessories',
      icon: '👜',
      count: 150
    },
    {
      name: 'Costumes',
      description: 'Theme party costumes and character outfits',
      icon: '🎭',
      count: 70
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
            <div className="text-6xl mb-6">👗</div>
            <h1 className={`text-4xl md:text-6xl font-bold mb-6 ${
              darkMode ? 'text-[#ffedd8]' : 'text-[#583101]'
            }`}>
              Fashion & Clothing
            </h1>
            <p className={`text-xl md:text-2xl mb-8 max-w-3xl mx-auto ${
              darkMode ? 'text-[#e7bc91]' : 'text-[#8b5e34]'
            }`}>
              Rent designer wear, traditional outfits, and accessories for special occasions
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
              Fashion Categories
            </h2>
            <p className={`text-lg ${
              darkMode ? 'text-[#e7bc91]' : 'text-[#8b5e34]'
            }`}>
              Find the perfect outfit for any occasion
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
                  {category.count} items available
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
              Available Fashion Items
            </h2>
            <p className={`text-lg ${
              darkMode ? 'text-[#e7bc91]' : 'text-[#8b5e34]'
            }`}>
              Designer and premium fashion for every occasion
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
                No fashion items available at the moment
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

      {/* Why Rent Fashion */}
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
              Why Rent Fashion?
            </h2>
            <p className={`text-lg ${
              darkMode ? 'text-[#e7bc91]' : 'text-[#8b5e34]'
            }`}>
              Smart fashion choices for the modern lifestyle
            </p>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                title: 'Designer Access',
                description: 'Wear luxury brands at affordable prices',
                icon: '💎'
              },
              {
                title: 'Special Occasions',
                description: 'Perfect for weddings, parties, and events',
                icon: '🎉'
              },
              {
                title: 'Sustainable Fashion',
                description: 'Reduce fashion waste and environmental impact',
                icon: '🌱'
              },
              {
                title: 'Always Trendy',
                description: 'Stay updated with latest fashion trends',
                icon: '✨'
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

export default Fashion;