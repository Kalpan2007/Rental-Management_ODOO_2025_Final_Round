import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '../../contexts/ThemeContext';
import { getProducts } from '../../api/products';
import ProductCard from '../../components/ProductCard';
import LoadingSpinner from '../../components/LoadingSpinner';

const Gaming = () => {
  const { darkMode } = useTheme();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchGamingProducts = async () => {
      try {
        setLoading(true);
        const response = await getProducts({ category: 'Gaming' });
        if (response.success) {
          setProducts(response.data || []);
        } else {
          setError(response.error || 'Failed to load gaming equipment');
        }
        setLoading(false);
      } catch (err) {
        setError('Failed to load gaming equipment');
        setLoading(false);
        console.error('Error fetching gaming products:', err);
      }
    };

    fetchGamingProducts();
  }, []);

  const subcategories = [
    {
      name: 'Gaming Consoles',
      description: 'PlayStation, Xbox, Nintendo Switch, and retro consoles',
      icon: '🎮',
      count: 45
    },
    {
      name: 'Gaming PCs',
      description: 'High-performance gaming computers and laptops',
      icon: '💻',
      count: 30
    },
    {
      name: 'VR Equipment',
      description: 'Virtual reality headsets and accessories',
      icon: '🥽',
      count: 20
    },
    {
      name: 'Gaming Accessories',
      description: 'Controllers, keyboards, mice, and gaming chairs',
      icon: '🖱️',
      count: 80
    },
    {
      name: 'Arcade Machines',
      description: 'Classic arcade games and pinball machines',
      icon: '🕹️',
      count: 15
    },
    {
      name: 'Streaming Equipment',
      description: 'Cameras, microphones, and streaming setups',
      icon: '📹',
      count: 35
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
            <div className="text-6xl mb-6">🎮</div>
            <h1 className={`text-4xl md:text-6xl font-bold mb-6 ${
              darkMode ? 'text-[#ffedd8]' : 'text-[#583101]'
            }`}>
              Gaming Equipment
            </h1>
            <p className={`text-xl md:text-2xl mb-8 max-w-3xl mx-auto ${
              darkMode ? 'text-[#e7bc91]' : 'text-[#8b5e34]'
            }`}>
              Level up your gaming experience with premium equipment and consoles
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
              Gaming Categories
            </h2>
            <p className={`text-lg ${
              darkMode ? 'text-[#e7bc91]' : 'text-[#8b5e34]'
            }`}>
              Find gaming gear for every type of gamer
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
              Available Gaming Equipment
            </h2>
            <p className={`text-lg ${
              darkMode ? 'text-[#e7bc91]' : 'text-[#8b5e34]'
            }`}>
              Premium gaming gear for the ultimate experience
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
                No gaming equipment available at the moment
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

      {/* Why Rent Gaming Equipment */}
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
              Why Rent Gaming Equipment?
            </h2>
            <p className={`text-lg ${
              darkMode ? 'text-[#e7bc91]' : 'text-[#8b5e34]'
            }`}>
              Perfect for gamers and content creators
            </p>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                title: 'Try Latest Games',
                description: 'Experience new consoles and games before buying',
                icon: '🎯'
              },
              {
                title: 'Event Gaming',
                description: 'Perfect for parties and gaming tournaments',
                icon: '🏆'
              },
              {
                title: 'No Depreciation',
                description: 'Avoid rapid value loss of gaming equipment',
                icon: '📈'
              },
              {
                title: 'Always Updated',
                description: 'Access to latest gaming technology',
                icon: '🚀'
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

export default Gaming;