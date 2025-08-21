import { motion } from 'framer-motion';
import { useTheme } from '../../contexts/ThemeContext';
import { Link } from 'react-router-dom';
import { 
  CheckIcon,
  XMarkIcon,
  CurrencyRupeeIcon,
  ClockIcon,
  ShieldCheckIcon,
  TruckIcon
} from '@heroicons/react/24/outline';

const Pricing = () => {
  const { darkMode } = useTheme();

  const pricingPlans = [
    {
      name: 'Basic',
      price: '₹0',
      period: 'Free',
      description: 'Perfect for occasional renters',
      features: [
        'Browse all products',
        'Basic customer support',
        'Standard delivery',
        'Basic insurance coverage',
        'Up to 3 active bookings'
      ],
      limitations: [
        'No priority support',
        'Limited booking modifications',
        'Standard delivery only'
      ],
      cta: 'Get Started',
      popular: false
    },
    {
      name: 'Premium',
      price: '₹299',
      period: 'per month',
      description: 'Best for regular renters',
      features: [
        'Everything in Basic',
        'Priority customer support',
        'Express delivery options',
        'Enhanced insurance coverage',
        'Unlimited active bookings',
        'Booking modification flexibility',
        '10% discount on all rentals',
        'Early access to new products'
      ],
      limitations: [],
      cta: 'Start Premium',
      popular: true
    },
    {
      name: 'Business',
      price: '₹999',
      period: 'per month',
      description: 'Ideal for businesses and teams',
      features: [
        'Everything in Premium',
        'Dedicated account manager',
        'Bulk rental discounts',
        'Custom rental agreements',
        'Priority product access',
        'Advanced analytics',
        '20% discount on all rentals',
        'Custom billing solutions'
      ],
      limitations: [],
      cta: 'Contact Sales',
      popular: false
    }
  ];

  const additionalFees = [
    {
      title: 'Delivery Charges',
      description: 'Based on distance and product size',
      price: '₹50 - ₹500'
    },
    {
      title: 'Security Deposit',
      description: 'Refundable deposit for high-value items',
      price: '10-30% of product value'
    },
    {
      title: 'Late Return Fee',
      description: 'Charged per day for late returns',
      price: '₹100 - ₹1000 per day'
    },
    {
      title: 'Damage Fee',
      description: 'Repair costs for damaged items',
      price: 'Actual repair cost'
    }
  ];

  const faqs = [
    {
      question: 'How is rental pricing calculated?',
      answer: 'Pricing is based on the product value, rental duration, and demand. Longer rentals often get better daily rates.'
    },
    {
      question: 'Are there any hidden charges?',
      answer: 'No hidden charges! All fees including delivery, taxes, and deposits are clearly shown before payment.'
    },
    {
      question: 'Can I get a refund if I cancel?',
      answer: 'Cancellations made 24+ hours before rental start get full refund. Within 24 hours may incur cancellation fees.'
    },
    {
      question: 'Do you offer discounts for long-term rentals?',
      answer: 'Yes! We offer progressive discounts for rentals longer than 7 days, 30 days, and 90 days.'
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
            <CurrencyRupeeIcon className="h-16 w-16 text-primary-600 mx-auto mb-6" />
            <h1 className="text-4xl md:text-6xl font-bold mb-6">Simple, Transparent Pricing</h1>
            <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto">
              Choose the plan that works best for you. No hidden fees, no surprises.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Pricing Plans */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {pricingPlans.map((plan, index) => (
              <motion.div
                key={index}
                className={`relative p-8 rounded-lg shadow-lg ${
                  plan.popular 
                    ? 'ring-2 ring-primary-600 scale-105' 
                    : ''
                } ${darkMode ? 'bg-gray-800' : 'bg-white'}`}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <span className="bg-primary-600 text-white px-4 py-1 rounded-full text-sm font-medium">
                      Most Popular
                    </span>
                  </div>
                )}
                
                <div className="text-center mb-8">
                  <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
                  <div className="mb-4">
                    <span className="text-4xl font-bold">{plan.price}</span>
                    {plan.period !== 'Free' && (
                      <span className="text-gray-600 dark:text-gray-400 ml-2">{plan.period}</span>
                    )}
                  </div>
                  <p className="text-gray-600 dark:text-gray-300">{plan.description}</p>
                </div>
                
                <ul className="space-y-3 mb-8">
                  {plan.features.map((feature, idx) => (
                    <li key={idx} className="flex items-center">
                      <CheckIcon className="h-5 w-5 text-green-500 mr-3" />
                      <span>{feature}</span>
                    </li>
                  ))}
                  {plan.limitations.map((limitation, idx) => (
                    <li key={idx} className="flex items-center text-gray-500">
                      <XMarkIcon className="h-5 w-5 text-red-500 mr-3" />
                      <span>{limitation}</span>
                    </li>
                  ))}
                </ul>
                
                <button
                  className={`w-full py-3 px-4 rounded-lg font-semibold transition-colors ${
                    plan.popular
                      ? 'bg-primary-600 hover:bg-primary-700 text-white'
                      : darkMode
                      ? 'bg-gray-700 hover:bg-gray-600 text-white'
                      : 'bg-gray-200 hover:bg-gray-300 text-gray-900'
                  }`}
                >
                  {plan.cta}
                </button>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Additional Fees */}
      <section className={`py-16 px-4 sm:px-6 lg:px-8 ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
        <div className="max-w-7xl mx-auto">
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl font-bold mb-4">Additional Fees</h2>
            <p className="text-lg">Transparent pricing for additional services</p>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {additionalFees.map((fee, index) => (
              <motion.div
                key={index}
                className={`p-6 rounded-lg ${darkMode ? 'bg-gray-700' : 'bg-gray-50'} text-center`}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <h3 className="text-lg font-semibold mb-2">{fee.title}</h3>
                <p className="text-sm text-gray-600 dark:text-gray-300 mb-3">{fee.description}</p>
                <div className="text-xl font-bold text-primary-600">{fee.price}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl font-bold mb-4">Pricing FAQs</h2>
            <p className="text-lg">Common questions about our pricing</p>
          </motion.div>
          
          <div className="space-y-6">
            {faqs.map((faq, index) => (
              <motion.div
                key={index}
                className={`p-6 rounded-lg ${darkMode ? 'bg-gray-800' : 'bg-white'} shadow-lg`}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <h3 className="text-lg font-semibold mb-3">{faq.question}</h3>
                <p className="text-gray-600 dark:text-gray-300">{faq.answer}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className={`py-16 px-4 sm:px-6 lg:px-8 ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h3 className="text-3xl font-bold mb-4">Start Renting Today</h3>
            <p className="text-lg mb-8">
              Join our community and discover the convenience of renting
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/products" className="btn-primary">
                Browse Products
              </Link>
              <Link to="/contact" className="btn-secondary">
                Have Questions?
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Pricing;