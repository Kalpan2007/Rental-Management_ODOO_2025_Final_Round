import { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useTheme } from '../contexts/ThemeContext';
import {
  QuestionMarkCircleIcon,
  ChatBubbleLeftRightIcon,
  PhoneIcon,
  EnvelopeIcon,
  DocumentTextIcon,
  VideoCameraIcon,
  MagnifyingGlassIcon,
  BookOpenIcon,
  UserGroupIcon,
  ExclamationTriangleIcon
} from '@heroicons/react/24/outline';

const HelpCenter = () => {
  const { darkMode } = useTheme();
  const [searchQuery, setSearchQuery] = useState('');

  const helpCategories = [
    {
      title: 'Getting Started',
      icon: BookOpenIcon,
      description: 'Learn the basics of using RentalHub',
      articles: [
        'How to create an account',
        'Verifying your identity',
        'Setting up your profile',
        'Understanding our policies'
      ],
      color: 'bg-blue-500'
    },
    {
      title: 'Booking & Rentals',
      icon: DocumentTextIcon,
      description: 'Everything about making and managing bookings',
      articles: [
        'How to book a product',
        'Modifying your booking',
        'Cancellation policy',
        'Pickup and return process'
      ],
      color: 'bg-green-500'
    },
    {
      title: 'Payments & Billing',
      icon: CreditCardIcon,
      description: 'Payment methods, billing, and refunds',
      articles: [
        'Accepted payment methods',
        'Understanding pricing',
        'Refund process',
        'Security deposits'
      ],
      color: 'bg-purple-500'
    },
    {
      title: 'Listing Products',
      icon: PlusIcon,
      description: 'How to list and manage your products',
      articles: [
        'Creating a product listing',
        'Setting competitive prices',
        'Managing availability',
        'Product photography tips'
      ],
      color: 'bg-orange-500'
    },
    {
      title: 'Safety & Trust',
      icon: ShieldCheckIcon,
      description: 'Staying safe and building trust',
      articles: [
        'Identity verification',
        'Product condition guidelines',
        'Reporting issues',
        'Insurance coverage'
      ],
      color: 'bg-red-500'
    },
    {
      title: 'Technical Support',
      icon: ExclamationTriangleIcon,
      description: 'Troubleshooting and technical issues',
      articles: [
        'App not working properly',
        'Payment failures',
        'Account access issues',
        'Browser compatibility'
      ],
      color: 'bg-gray-500'
    }
  ];

  const contactOptions = [
    {
      title: 'Live Chat',
      description: 'Get instant help from our support team',
      icon: ChatBubbleLeftRightIcon,
      availability: 'Available 24/7',
      action: 'Start Chat',
      href: '#',
      color: 'bg-blue-500'
    },
    {
      title: 'Phone Support',
      description: 'Speak directly with our experts',
      icon: PhoneIcon,
      availability: 'Mon-Sat: 9AM-8PM',
      action: 'Call Now',
      href: 'tel:+919876543210',
      color: 'bg-green-500'
    },
    {
      title: 'Email Support',
      description: 'Send us your detailed questions',
      icon: EnvelopeIcon,
      availability: 'Response within 2 hours',
      action: 'Send Email',
      href: 'mailto:support@rentalhub.com',
      color: 'bg-purple-500'
    },
    {
      title: 'Video Call',
      description: 'Schedule a video consultation',
      icon: VideoCameraIcon,
      availability: 'By appointment',
      action: 'Schedule',
      href: '#',
      color: 'bg-orange-500'
    }
  ];

  const popularArticles = [
    'How to book your first rental',
    'Understanding our pricing structure',
    'What to do if a product is damaged',
    'How to become a verified host',
    'Payment and refund policies',
    'Safety guidelines for renters'
  ];

  const filteredCategories = helpCategories.filter(category =>
    category.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    category.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
    category.articles.some(article => 
      article.toLowerCase().includes(searchQuery.toLowerCase())
    )
  );

  return (
    <div className={`min-h-screen ${darkMode ? 'bg-gray-900 text-white' : 'bg-gray-50 text-gray-900'}`}>
      {/* Header */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <QuestionMarkCircleIcon className="h-16 w-16 text-primary-600 mx-auto mb-6" />
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Help Center</h1>
            <p className="text-xl mb-8">
              Find answers, get support, and learn how to make the most of RentalHub
            </p>
          </motion.div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        {/* Search Bar */}
        <motion.div
          className="mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <div className="max-w-2xl mx-auto relative">
            <MagnifyingGlassIcon className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search for help articles, guides, or topics..."
              className="input w-full pl-12 py-4 text-lg"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </motion.div>

        {/* Popular Articles */}
        <motion.div
          className="mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <h2 className="text-2xl font-bold mb-6 text-center">Popular Articles</h2>
          <div className="flex flex-wrap justify-center gap-3">
            {popularArticles.map((article, index) => (
              <Link
                key={index}
                to={`/help/article/${article.toLowerCase().replace(/\s+/g, '-')}`}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  darkMode
                    ? 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                    : 'bg-white text-gray-700 hover:bg-gray-100'
                } shadow-md hover:shadow-lg`}
              >
                {article}
              </Link>
            ))}
          </div>
        </motion.div>

        {/* Help Categories */}
        <motion.div
          className="mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <h2 className="text-2xl font-bold mb-8 text-center">Browse by Category</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredCategories.map((category, index) => (
              <motion.div
                key={index}
                className={`${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow`}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ y: -5 }}
              >
                <div className={`w-12 h-12 ${category.color} rounded-lg flex items-center justify-center mb-4`}>
                  <category.icon className="h-6 w-6 text-white" />
                </div>
                <h3 className="text-xl font-semibold mb-2">{category.title}</h3>
                <p className="text-gray-600 dark:text-gray-400 mb-4">{category.description}</p>
                <ul className="space-y-2">
                  {category.articles.map((article, articleIndex) => (
                    <li key={articleIndex}>
                      <Link
                        to={`/help/article/${article.toLowerCase().replace(/\s+/g, '-')}`}
                        className="text-primary-600 hover:text-primary-700 text-sm hover:underline"
                      >
                        {article}
                      </Link>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Contact Support */}
        <motion.div
          className="mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
        >
          <h2 className="text-2xl font-bold mb-8 text-center">Contact Support</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {contactOptions.map((option, index) => (
              <motion.div
                key={index}
                className={`${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-xl shadow-lg p-6 text-center hover:shadow-xl transition-shadow`}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ y: -5 }}
              >
                <div className={`w-16 h-16 ${option.color} rounded-full flex items-center justify-center mx-auto mb-4`}>
                  <option.icon className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-lg font-semibold mb-2">{option.title}</h3>
                <p className="text-gray-600 dark:text-gray-400 mb-3">{option.description}</p>
                <p className="text-sm text-gray-500 dark:text-gray-500 mb-4">{option.availability}</p>
                <a
                  href={option.href}
                  className="btn-primary w-full"
                >
                  {option.action}
                </a>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Community */}
        <motion.div
          className={`${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-xl shadow-lg p-8 text-center`}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          <UserGroupIcon className="h-12 w-12 text-primary-600 mx-auto mb-4" />
          <h3 className="text-2xl font-bold mb-4">Join Our Community</h3>
          <p className="text-lg text-gray-600 dark:text-gray-400 mb-6">
            Connect with other renters, share experiences, and get tips from the community
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/community" className="btn-primary">
              Join Community Forum
            </Link>
            <Link to="/blog" className="btn-secondary">
              Read Our Blog
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default HelpCenter;