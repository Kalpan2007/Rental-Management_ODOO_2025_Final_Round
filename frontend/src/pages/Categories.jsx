import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useTheme } from '../contexts/ThemeContext';
import {
  CameraIcon,
  SpeakerWaveIcon,
  VideoCameraIcon,
  FireIcon,
  SparklesIcon,
  WrenchScrewdriverIcon,
  DevicePhoneMobileIcon,
  MusicalNoteIcon,
  TruckIcon,
  HomeIcon
} from '@heroicons/react/24/outline';

const Categories = () => {
  const { darkMode } = useTheme();

  const categories = [
    {
      name: 'Electronics',
      description: 'Smartphones, laptops, tablets, and gadgets',
      icon: DevicePhoneMobileIcon,
      count: 150,
      color: 'from-blue-500 to-blue-600',
      link: '/categories/electronics',
      image: 'https://images.unsplash.com/photo-1498049794561-7780e7231661?w=400&h=300&fit=crop'
    },
    {
      name: 'Photography',
      description: 'Cameras, lenses, tripods, and lighting equipment',
      icon: CameraIcon,
      count: 85,
      color: 'from-purple-500 to-purple-600',
      link: '/categories/photography',
      image: 'https://images.unsplash.com/photo-1502920917128-1aa500764cbd?w=400&h=300&fit=crop'
    },
    {
      name: 'Audio Equipment',
      description: 'Speakers, microphones, DJ equipment, and sound systems',
      icon: SpeakerWaveIcon,
      count: 120,
      color: 'from-green-500 to-green-600',
      link: '/categories/audio-equipment',
      image: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400&h=300&fit=crop'
    },
    {
      name: 'Video Equipment',
      description: 'Video cameras, drones, stabilizers, and recording gear',
      icon: VideoCameraIcon,
      count: 65,
      color: 'from-red-500 to-red-600',
      link: '/categories/video-equipment',
      image: 'https://images.unsplash.com/photo-1492619375914-88005aa9e8fb?w=400&h=300&fit=crop'
    },
    {
      name: 'Camping Gear',
      description: 'Tents, sleeping bags, cooking equipment, and outdoor gear',
      icon: FireIcon,
      count: 95,
      color: 'from-orange-500 to-orange-600',
      link: '/categories/camping-gear',
      image: 'https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?w=400&h=300&fit=crop'
    },
    {
      name: 'Party Supplies',
      description: 'Decorations, furniture, lighting, and entertainment',
      icon: SparklesIcon,
      count: 110,
      color: 'from-pink-500 to-pink-600',
      link: '/categories/party-supplies',
      image: 'https://images.unsplash.com/photo-1530103862676-de8c9debad1d?w=400&h=300&fit=crop'
    },
    {
      name: 'Tools',
      description: 'Power tools, hand tools, construction, and garden equipment',
      icon: WrenchScrewdriverIcon,
      count: 200,
      color: 'from-yellow-500 to-yellow-600',
      link: '/categories/tools',
      image: 'https://images.unsplash.com/photo-1572981779307-38b8cabb2407?w=400&h=300&fit=crop'
    },
    {
      name: 'Musical Instruments',
      description: 'Guitars, keyboards, drums, and recording equipment',
      icon: MusicalNoteIcon,
      count: 75,
      color: 'from-indigo-500 to-indigo-600',
      link: '/categories/musical-instruments',
      image: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400&h=300&fit=crop'
    },
    {
      name: 'Vehicles',
      description: 'Cars, bikes, scooters, and commercial vehicles',
      icon: TruckIcon,
      count: 180,
      color: 'from-gray-500 to-gray-600',
      link: '/categories/vehicles',
      image: 'https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=400&h=300&fit=crop'
    },
    {
      name: 'Home Appliances',
      description: 'Kitchen appliances, cleaning equipment, and home gadgets',
      icon: HomeIcon,
      count: 140,
      color: 'from-teal-500 to-teal-600',
      link: '/categories/home-appliances',
      image: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400&h=300&fit=crop'
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
        <div className="max-w-7xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className={`text-4xl md:text-6xl font-bold mb-6 ${
              darkMode ? 'text-[#ffedd8]' : 'text-[#583101]'
            }`}>
              Browse Categories
            </h1>
            <p className={`text-xl md:text-2xl mb-8 max-w-3xl mx-auto ${
              darkMode ? 'text-[#e7bc91]' : 'text-[#8b5e34]'
            }`}>
              Find exactly what you need from our diverse collection of rental products
            </p>
          </motion.div>
        </div>
      </section>

      {/* Categories Grid */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {categories.map((category, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ y: -8, scale: 1.02 }}
                className="group"
              >
                <Link to={category.link}>
                  <div className={`relative overflow-hidden rounded-2xl backdrop-blur-sm border transition-all duration-300 hover:shadow-2xl ${
                    darkMode 
                      ? 'bg-[#603808]/80 border-[#8b5e34]/50 shadow-lg shadow-[#583101]/30 hover:shadow-[#583101]/50' 
                      : 'bg-white/90 border-[#d4a276]/30 shadow-lg shadow-[#bc8a5f]/20 hover:shadow-[#bc8a5f]/30'
                  }`}>
                    {/* Background Image */}
                    <div className="relative h-48 overflow-hidden">
                      <img 
                        src={category.image} 
                        alt={category.name}
                        className="w-full h-full object-cover transition-all duration-500 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
                      
                      {/* Category Icon */}
                      <div className="absolute top-4 left-4">
                        <div className={`p-3 rounded-xl backdrop-blur-md ${
                          darkMode 
                            ? 'bg-[#8b5e34]/80 border border-[#bc8a5f]/30' 
                            : 'bg-white/80 border border-[#d4a276]/30'
                        }`}>
                          <category.icon className={`h-6 w-6 ${
                            darkMode ? 'text-[#ffedd8]' : 'text-[#583101]'
                          }`} />
                        </div>
                      </div>

                      {/* Count Badge */}
                      <div className="absolute top-4 right-4">
                        <div className={`px-3 py-1.5 rounded-full backdrop-blur-md text-sm font-bold ${
                          darkMode 
                            ? 'bg-[#bc8a5f]/80 text-[#ffedd8]' 
                            : 'bg-[#8b5e34]/80 text-[#ffedd8]'
                        }`}>
                          {category.count}+ items
                        </div>
                      </div>

                      {/* Gradient Overlay */}
                      <div className={`absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t ${
                        darkMode ? 'from-[#603808] to-transparent' : 'from-white to-transparent'
                      }`} />
                    </div>

                    {/* Content */}
                    <div className="p-6">
                      <h3 className={`text-2xl font-bold mb-3 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r transition-all duration-300 ${
                        darkMode 
                          ? 'text-[#ffedd8] group-hover:from-[#f3d5b5] group-hover:to-[#ffedd8]' 
                          : 'text-[#583101] group-hover:from-[#8b5e34] group-hover:to-[#6f4518]'
                      }`}>
                        {category.name}
                      </h3>
                      <p className={`text-base mb-4 ${
                        darkMode ? 'text-[#e7bc91]' : 'text-[#6f4518]'
                      }`}>
                        {category.description}
                      </p>
                      
                      <div className="flex items-center justify-between">
                        <span className={`text-sm font-medium ${
                          darkMode ? 'text-[#d4a276]' : 'text-[#8b5e34]'
                        }`}>
                          Explore Category
                        </span>
                        <svg 
                          className={`w-5 h-5 transition-transform duration-300 group-hover:translate-x-2 ${
                            darkMode ? 'text-[#bc8a5f]' : 'text-[#8b5e34]'
                          }`} 
                          fill="none" 
                          stroke="currentColor" 
                          viewBox="0 0 24 24"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                        </svg>
                      </div>
                    </div>

                    {/* Hover Glow Effect */}
                    <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                      <div className={`absolute inset-0 rounded-2xl ${
                        darkMode 
                          ? 'shadow-[inset_0_0_20px_rgba(188,138,95,0.1)]' 
                          : 'shadow-[inset_0_0_20px_rgba(139,94,52,0.1)]'
                      }`} />
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Popular Categories */}
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
              Most Popular Categories
            </h2>
            <p className={`text-lg ${
              darkMode ? 'text-[#e7bc91]' : 'text-[#8b5e34]'
            }`}>
              Trending rental categories this month
            </p>
          </motion.div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {categories.slice(0, 4).map((category, index) => (
              <motion.div
                key={index}
                className={`text-center p-6 rounded-xl transition-all duration-300 hover:shadow-lg ${
                  darkMode ? 'bg-[#8b5e34]/30' : 'bg-[#f3d5b5]/50'
                }`}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ scale: 1.05 }}
              >
                <Link to={category.link}>
                  <category.icon className={`h-12 w-12 mx-auto mb-3 ${
                    darkMode ? 'text-[#bc8a5f]' : 'text-[#8b5e34]'
                  }`} />
                  <h3 className={`font-bold text-lg mb-2 ${
                    darkMode ? 'text-[#ffedd8]' : 'text-[#583101]'
                  }`}>
                    {category.name}
                  </h3>
                  <p className={`text-sm ${
                    darkMode ? 'text-[#d4a276]' : 'text-[#6f4518]'
                  }`}>
                    {category.count}+ items
                  </p>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            className={`p-8 rounded-2xl backdrop-blur-sm border ${
              darkMode 
                ? 'bg-[#603808]/80 border-[#8b5e34]/50' 
                : 'bg-white/80 border-[#d4a276]/30'
            }`}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h3 className={`text-3xl font-bold mb-4 ${
              darkMode ? 'text-[#ffedd8]' : 'text-[#583101]'
            }`}>
              Can't Find What You're Looking For?
            </h3>
            <p className={`text-lg mb-8 ${
              darkMode ? 'text-[#e7bc91]' : 'text-[#8b5e34]'
            }`}>
              Browse all products or contact us for special requests
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link 
                to="/products" 
                className={`py-3 px-8 rounded-xl font-semibold transition-all duration-200 ${
                  darkMode
                    ? 'bg-[#bc8a5f] hover:bg-[#a47148] text-[#ffedd8]'
                    : 'bg-[#8b5e34] hover:bg-[#6f4518] text-[#ffedd8]'
                }`}
              >
                Browse All Products
              </Link>
              <Link 
                to="/contact" 
                className={`py-3 px-8 rounded-xl font-semibold transition-all duration-200 border-2 ${
                  darkMode
                    ? 'border-[#bc8a5f] text-[#bc8a5f] hover:bg-[#bc8a5f] hover:text-[#ffedd8]'
                    : 'border-[#8b5e34] text-[#8b5e34] hover:bg-[#8b5e34] hover:text-[#ffedd8]'
                }`}
              >
                Contact Support
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Categories;