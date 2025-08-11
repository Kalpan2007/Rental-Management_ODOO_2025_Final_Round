import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import SearchBar from './SearchBar';

const Hero = () => {
  return (
    <section className="relative bg-gradient-to-br from-primary-50 to-primary-100 dark:from-primary-800 dark:to-primary-900 py-20 overflow-hidden">
      <div className="absolute inset-0 bg-black/5 dark:bg-black/20"></div>
      
      <div className="relative container mx-auto px-4">
        <div className="text-center max-w-4xl mx-auto">
          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-5xl md:text-7xl font-bold text-primary-800 dark:text-primary-100 mb-6"
          >
            Rent Everything
            <span className="block text-primary-600 dark:text-primary-300">You Need</span>
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-xl md:text-2xl text-primary-700 dark:text-primary-200 mb-8 leading-relaxed"
          >
            From tools and equipment to party supplies and electronics. 
            Find what you need, when you need it.
          </motion.p>
          
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="mb-12"
          >
            <SearchBar />
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <Link 
              to="/products"
              className="bg-primary-600 hover:bg-primary-700 text-white px-8 py-4 rounded-lg text-lg font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg"
            >
              Browse Products
            </Link>
            <Link 
              to="/signup"
              className="bg-white hover:bg-primary-50 text-primary-600 border-2 border-primary-600 px-8 py-4 rounded-lg text-lg font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg"
            >
              Get Started
            </Link>
          </motion.div>
        </div>
      </div>
      
      {/* Decorative elements */}
      <div className="absolute top-10 left-10 w-20 h-20 bg-primary-300/30 rounded-full blur-xl"></div>
      <div className="absolute bottom-10 right-10 w-32 h-32 bg-primary-400/20 rounded-full blur-xl"></div>
      <div className="absolute top-1/2 left-1/4 w-16 h-16 bg-primary-200/40 rounded-full blur-lg"></div>
    </section>
  );
};

export default Hero;
