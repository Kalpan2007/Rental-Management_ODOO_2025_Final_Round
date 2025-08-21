import { motion } from 'framer-motion';
import { useTheme } from '../../contexts/ThemeContext';
import { Link } from 'react-router-dom';
import { 
  MagnifyingGlassIcon,
  CalendarDaysIcon,
  CreditCardIcon,
  TruckIcon,
  CheckCircleIcon,
  ArrowRightIcon
} from '@heroicons/react/24/outline';

const HowItWorks = () => {
  const { darkMode } = useTheme();

  const steps = [
    {
      icon: MagnifyingGlassIcon,
      title: 'Browse & Search',
      description: 'Explore our wide range of products or search for specific items you need.',
      details: [
        'Use filters to find exactly what you need',
        'Check product details and reviews',
        'Compare prices and features',
        'View high-quality photos'
      ]
    },
    {
      icon: CalendarDaysIcon,
      title: 'Select Dates',
      description: 'Choose your rental period and check availability in real-time.',
      details: [
        'Pick your start and end dates',
        'See real-time availability',
        'Get instant price calculations',
        'Choose delivery preferences'
      ]
    },
    {
      icon: CreditCardIcon,
      title: 'Secure Payment',
      description: 'Complete your booking with our secure payment system.',
      details: [
        'Multiple payment options available',
        'Secure Stripe payment processing',
        'Instant booking confirmation',
        'Digital receipts and invoices'
      ]
    },
    {
      icon: TruckIcon,
      title: 'Delivery & Pickup',
      description: 'We handle delivery and pickup at your convenience.',
      details: [
        'Flexible delivery time slots',
        'Professional delivery team',
        'Product inspection on delivery',
        'Easy return process'
      ]
    }
  ];

  const benefits = [
    {
      title: 'Cost Effective',
      description: 'Save money by renting instead of buying expensive equipment',
      icon: '💰'
    },
    {
      title: 'No Storage Hassle',
      description: 'No need to worry about storage space for items you use occasionally',
      icon: '📦'
    },
    {
      title: 'Try Before Buy',
      description: 'Test products before making a purchase decision',
      icon: '🔍'
    },
    {
      title: 'Latest Models',
      description: 'Access to the newest and most advanced equipment',
      icon: '🚀'
    },
    {
      title: 'Maintenance Free',
      description: 'No maintenance costs or repair worries',
      icon: '🔧'
    },
    {
      title: 'Flexible Duration',
      description: 'Rent for hours, days, weeks, or months',
      icon: '⏰'
    }
  ];

  const rentalTypes = [
    {
      title: 'Short-term Rentals',
      description: 'Perfect for events, projects, or trying new equipment',
      duration: '1 day - 1 week',
      examples: ['Party equipment', 'Photography gear', 'Tools for DIY projects']
    },
    {
      title: 'Medium-term Rentals',
      description: 'Ideal for seasonal needs or extended projects',
      duration: '1 week - 1 month',
      examples: ['Camping gear', 'Fitness equipment', 'Office furniture']
    },
    {
      title: 'Long-term Rentals',
      description: 'Great for ongoing needs without the commitment of buying',
      duration: '1 month+',
      examples: ['Appliances', 'Vehicles', 'Professional equipment']
    }
  ];

  return (
    <div className={`min-h-screen ${darkMode ? 'bg-gray-900 text-white' : 'bg-gray-50 text-gray-900'}`}>
      {/* Hero Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-4xl md:text-6xl font-bold mb-6">How It Works</h1>
            <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto">
              Renting with RentalHub is simple, secure, and convenient. Here's how to get started.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Steps Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="space-y-16">
            {steps.map((step, index) => (
              <motion.div
                key={index}
                className={`grid grid-cols-1 lg:grid-cols-2 gap-12 items-center ${
                  index % 2 === 1 ? 'lg:grid-flow-col-dense' : ''
                }`}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <div className={index % 2 === 1 ? 'lg:col-start-2' : ''}>
                  <div className="flex items-center mb-6">
                    <div className="flex items-center justify-center w-16 h-16 bg-primary-600 text-white rounded-full mr-4">
                      <span className="text-2xl font-bold">{index + 1}</span>
                    </div>
                    <step.icon className="h-12 w-12 text-primary-600" />
                  </div>
                  <h3 className="text-3xl font-bold mb-4">{step.title}</h3>
                  <p className="text-lg mb-6">{step.description}</p>
                  <ul className="space-y-2">
                    {step.details.map((detail, idx) => (
                      <li key={idx} className="flex items-center">
                        <CheckCircleIcon className="h-5 w-5 text-green-500 mr-2" />
                        <span>{detail}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className={`${index % 2 === 1 ? 'lg:col-start-1' : ''} relative`}>
                  <div className={`p-8 rounded-lg ${darkMode ? 'bg-gray-800' : 'bg-white'} shadow-lg`}>
                    <step.icon className="h-24 w-24 text-primary-600 mx-auto mb-4" />
                    <div className="text-center">
                      <h4 className="text-xl font-semibold mb-2">Step {index + 1}</h4>
                      <p className="text-gray-600 dark:text-gray-300">{step.title}</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className={`py-16 px-4 sm:px-6 lg:px-8 ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
        <div className="max-w-7xl mx-auto">
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl font-bold mb-4">Why Rent Instead of Buy?</h2>
            <p className="text-lg">Discover the advantages of the rental economy</p>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {benefits.map((benefit, index) => (
              <motion.div
                key={index}
                className={`p-6 rounded-lg ${darkMode ? 'bg-gray-700' : 'bg-gray-50'} text-center`}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ y: -5 }}
              >
                <div className="text-4xl mb-4">{benefit.icon}</div>
                <h3 className="text-xl font-semibold mb-2">{benefit.title}</h3>
                <p className="text-gray-600 dark:text-gray-300">{benefit.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Rental Types */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl font-bold mb-4">Rental Options</h2>
            <p className="text-lg">Choose the rental duration that fits your needs</p>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {rentalTypes.map((type, index) => (
              <motion.div
                key={index}
                className={`p-6 rounded-lg ${darkMode ? 'bg-gray-800' : 'bg-white'} shadow-lg`}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <h3 className="text-xl font-semibold mb-2">{type.title}</h3>
                <p className="text-primary-600 font-medium mb-3">{type.duration}</p>
                <p className="text-gray-600 dark:text-gray-300 mb-4">{type.description}</p>
                <div>
                  <h4 className="font-medium mb-2">Popular for:</h4>
                  <ul className="space-y-1">
                    {type.examples.map((example, idx) => (
                      <li key={idx} className="text-sm text-gray-600 dark:text-gray-300">
                        • {example}
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            className={`p-8 rounded-lg ${darkMode ? 'bg-gray-800' : 'bg-white'} shadow-lg`}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h3 className="text-3xl font-bold mb-4">Ready to Get Started?</h3>
            <p className="text-lg mb-8">
              Join thousands of satisfied customers and start renting today!
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/products" className="btn-primary">
                Browse Products
              </Link>
              <Link to="/signup" className="btn-secondary">
                Create Account
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default HowItWorks;