import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from '../../contexts/ThemeContext';
import { 
  ChevronDownIcon, 
  MagnifyingGlassIcon,
  QuestionMarkCircleIcon 
} from '@heroicons/react/24/outline';

const FAQ = () => {
  const { darkMode } = useTheme();
  const [searchTerm, setSearchTerm] = useState('');
  const [activeCategory, setActiveCategory] = useState('all');
  const [expandedItems, setExpandedItems] = useState([]);

  const categories = [
    { id: 'all', name: 'All Questions' },
    { id: 'booking', name: 'Booking & Rentals' },
    { id: 'payment', name: 'Payments' },
    { id: 'delivery', name: 'Delivery & Pickup' },
    { id: 'account', name: 'Account & Profile' },
    { id: 'support', name: 'Support' }
  ];

  const faqs = [
    {
      category: 'booking',
      question: 'How do I book a product?',
      answer: 'Browse our products, select your desired item, choose rental dates, and complete the payment process. You\'ll receive a confirmation email with all details.'
    },
    {
      category: 'booking',
      question: 'Can I modify or cancel my booking?',
      answer: 'Yes, you can modify or cancel bookings up to 24 hours before the rental start date. Cancellations made within 24 hours may incur charges.'
    },
    {
      category: 'booking',
      question: 'What is the minimum rental period?',
      answer: 'The minimum rental period varies by product. Most items have a 1-day minimum, while some specialized equipment may require longer periods.'
    },
    {
      category: 'payment',
      question: 'What payment methods do you accept?',
      answer: 'We accept all major credit/debit cards, UPI, net banking, and digital wallets through our secure Stripe payment gateway.'
    },
    {
      category: 'payment',
      question: 'When will I be charged?',
      answer: 'Payment is processed immediately upon booking confirmation. For longer rentals, we may require a security deposit.'
    },
    {
      category: 'payment',
      question: 'Are there any hidden fees?',
      answer: 'No hidden fees! All charges including taxes, delivery fees, and security deposits are clearly displayed before payment.'
    },
    {
      category: 'delivery',
      question: 'Do you provide delivery and pickup?',
      answer: 'Yes, we offer delivery and pickup services in most cities. Delivery charges vary based on location and product size.'
    },
    {
      category: 'delivery',
      question: 'What are your delivery hours?',
      answer: 'Standard delivery is available Monday-Saturday, 9AM-8PM. Express delivery and weekend slots are available for an additional fee.'
    },
    {
      category: 'account',
      question: 'How do I create an account?',
      answer: 'Click "Sign Up" and provide your basic information. Verify your email address and you\'re ready to start renting!'
    },
    {
      category: 'account',
      question: 'Can I list my own products for rent?',
      answer: 'Absolutely! Create an account, go to "List Product" and add your items. We\'ll review and approve them within 24 hours.'
    },
    {
      category: 'support',
      question: 'What if a product is damaged during rental?',
      answer: 'Report any damage immediately. We have insurance coverage for most items. You may be responsible for repair costs depending on the damage.'
    },
    {
      category: 'support',
      question: 'How do I contact customer support?',
      answer: 'Use our live chat, call our support line, or send an email. We\'re available Monday-Saturday, 9AM-8PM IST.'
    }
  ];

  const filteredFaqs = faqs.filter(faq => {
    const matchesCategory = activeCategory === 'all' || faq.category === activeCategory;
    const matchesSearch = faq.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         faq.answer.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const toggleExpanded = (index) => {
    setExpandedItems(prev => 
      prev.includes(index) 
        ? prev.filter(i => i !== index)
        : [...prev, index]
    );
  };

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
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Frequently Asked Questions</h1>
            <p className="text-xl mb-8">
              Find answers to the most common questions about our rental service
            </p>
          </motion.div>
        </div>
      </section>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        {/* Search Bar */}
        <motion.div
          className="mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <div className="relative">
            <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search questions..."
              className="input w-full pl-10"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </motion.div>

        {/* Categories */}
        <motion.div
          className="mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setActiveCategory(category.id)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  activeCategory === category.id
                    ? 'bg-primary-600 text-white'
                    : darkMode
                    ? 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                    : 'bg-white text-gray-700 hover:bg-gray-100'
                }`}
              >
                {category.name}
              </button>
            ))}
          </div>
        </motion.div>

        {/* FAQ Items */}
        <motion.div
          className="space-y-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          {filteredFaqs.map((faq, index) => (
            <motion.div
              key={index}
              className={`rounded-lg ${darkMode ? 'bg-gray-800' : 'bg-white'} shadow-md overflow-hidden`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.05 }}
            >
              <button
                onClick={() => toggleExpanded(index)}
                className="w-full px-6 py-4 text-left flex justify-between items-center hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
              >
                <h3 className="text-lg font-semibold pr-4">{faq.question}</h3>
                <motion.div
                  animate={{ rotate: expandedItems.includes(index) ? 180 : 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <ChevronDownIcon className="h-5 w-5 text-gray-500" />
                </motion.div>
              </button>
              
              <AnimatePresence>
                {expandedItems.includes(index) && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <div className="px-6 pb-4 text-gray-600 dark:text-gray-300">
                      {faq.answer}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </motion.div>

        {/* No Results */}
        {filteredFaqs.length === 0 && (
          <motion.div
            className="text-center py-12"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
          >
            <QuestionMarkCircleIcon className="h-16 w-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2">No questions found</h3>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              Try adjusting your search terms or browse all categories
            </p>
            <button
              onClick={() => {
                setSearchTerm('');
                setActiveCategory('all');
              }}
              className="btn-primary"
            >
              Show All Questions
            </button>
          </motion.div>
        )}

        {/* Contact Support */}
        <motion.div
          className={`mt-16 p-8 rounded-lg ${darkMode ? 'bg-gray-800' : 'bg-white'} shadow-lg text-center`}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h3 className="text-2xl font-bold mb-4">Still have questions?</h3>
          <p className="text-lg mb-6">
            Our support team is here to help you with any specific questions
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="/contact" className="btn-primary">
              Contact Support
            </a>
            <a href="/support" className="btn-secondary">
              Browse Help Center
            </a>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default FAQ;