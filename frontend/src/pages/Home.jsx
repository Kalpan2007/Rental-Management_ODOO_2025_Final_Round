import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import SearchBar from '../components/SearchBar';
import ProductCard from '../components/ProductCard';
import { getProducts } from '../api/products';
import LoadingSpinner from '../components/LoadingSpinner';
import { useTheme } from '../contexts/ThemeContext';

const Home = () => {
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { darkMode } = useTheme();

  useEffect(() => {
    const fetchFeaturedProducts = async () => {
      try {
        setLoading(true);
        const response = await getProducts({ featured: true, limit: 6 });
        setFeaturedProducts(response.data || []);
        {
          featuredProducts?.length > 0 ? (
            featuredProducts.map((product) => (
              <ProductCard key={product._id} product={product} />
            ))
          ) : (
          <p className="col-span-full text-center py-10">No featured products available at the moment.</p>
        )
        }
        setLoading(false);
      } catch (err) {
        setError('Failed to load featured products');
        setLoading(false);
        console.error('Error fetching featured products:', err);
      }
    };

    fetchFeaturedProducts();
  }, []);

  const heroVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.8,
        when: "beforeChildren",
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration: 0.5 } }
  };

  return (
    <div className={`min-h-screen ${darkMode ? 'bg-gray-900 text-white' : 'bg-gray-50 text-gray-900'}`}>
      {/* Hero Section */}
      <motion.section
        className="relative py-20 px-4 sm:px-6 lg:px-8 flex flex-col items-center justify-center text-center"
        initial="hidden"
        animate="visible"
        variants={heroVariants}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-primary-500/30 to-transparent z-0"></div>
        <div className="relative z-10 max-w-5xl mx-auto">
          <motion.h1
            className="text-4xl md:text-6xl font-bold mb-6"
            variants={itemVariants}
          >
            Rent Premium Equipment for Your Next Adventure
          </motion.h1>
          <motion.p
            className="text-xl md:text-2xl mb-10 max-w-3xl mx-auto"
            variants={itemVariants}
          >
            Access high-quality gear without the commitment of ownership. Easy booking, flexible returns.
          </motion.p>
          <motion.div variants={itemVariants}>
            <SearchBar />
          </motion.div>
          <motion.div
            className="mt-10 flex flex-wrap gap-4 justify-center"
            variants={itemVariants}
          >
            <Link to="/products" className="btn-primary">
              Browse All Products
            </Link>
            <Link to="/how-it-works" className="btn-secondary">
              How It Works
            </Link>
          </motion.div>
        </div>
      </motion.section>

      {/* Featured Products Section */}
      <section className={`py-16 px-4 sm:px-6 lg:px-8 ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between items-center mb-10">
            <h2 className="text-3xl font-bold">Featured Products</h2>
            <Link to="/products" className="text-primary-500 hover:text-primary-600 font-medium">
              View All →
            </Link>
          </div>

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
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {featuredProducts.length > 0 ? (
                featuredProducts.map((product) => (
                  <ProductCard key={product._id} product={product} />
                ))
              ) : (
                <p className="col-span-full text-center py-10">No featured products available at the moment.</p>
              )}
            </div>
          )}
        </div>
      </section>

      {/* How It Works Section */}
      <section className={`py-16 px-4 sm:px-6 lg:px-8 ${darkMode ? 'bg-gray-900' : 'bg-gray-50'}`}>
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-16">How It Works</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {[
              {
                title: "Browse & Select",
                description: "Explore our wide range of high-quality equipment and choose what you need.",
                icon: "🔍"
              },
              {
                title: "Book & Pay",
                description: "Select your rental dates and complete the secure payment process.",
                icon: "📅"
              },
              {
                title: "Receive & Return",
                description: "Get your equipment delivered and return it when your rental period ends.",
                icon: "🔄"
              }
            ].map((step, index) => (
              <motion.div
                key={index}
                className={`card p-8 text-center ${darkMode ? 'bg-gray-800' : 'bg-white'}`}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2 }}
              >
                <div className="text-4xl mb-4">{step.icon}</div>
                <h3 className="text-xl font-semibold mb-3">{step.title}</h3>
                <p>{step.description}</p>
              </motion.div>
            ))}
          </div>
          <div className="text-center mt-12">
            <Link to="/how-it-works" className="btn-primary">
              Learn More
            </Link>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className={`py-16 px-4 sm:px-6 lg:px-8 ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-16">What Our Customers Say</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                name: "Sarah Johnson",
                text: "The quality of the camera I rented was exceptional. The booking process was smooth, and the return was hassle-free. Will definitely use this service again!",
                rating: 5
              },
              {
                name: "Michael Chen",
                text: "Rented camping gear for a weekend trip. Everything was in perfect condition and the prices were very reasonable. Highly recommend!",
                rating: 5
              },
              {
                name: "Emily Rodriguez",
                text: "Great service! The DJ equipment I rented worked flawlessly for my event. The staff was also very helpful with setup instructions.",
                rating: 4
              }
            ].map((testimonial, index) => (
              <motion.div
                key={index}
                className={`card p-6 ${darkMode ? 'bg-gray-900' : 'bg-gray-50'}`}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <div className="flex items-center mb-4">
                  {[...Array(5)].map((_, i) => (
                    <span key={i} className={i < testimonial.rating ? "text-yellow-400" : "text-gray-300"}>
                      ★
                    </span>
                  ))}
                </div>
                <p className="mb-4 italic">{testimonial.text}</p>
                <p className="font-semibold">{testimonial.name}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-primary-500 text-white">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-8">Ready to Get Started?</h2>
          <p className="text-lg mb-12">Join our community of satisfied customers and experience the convenience of renting high-quality equipment.</p>
          <Link to="/register" className="btn-secondary">
            Sign Up Now
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Home;