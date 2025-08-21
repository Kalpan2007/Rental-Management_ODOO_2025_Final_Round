import { motion } from 'framer-motion';
import { useTheme } from '../../contexts/ThemeContext';
import { Link } from 'react-router-dom';
import { 
  CurrencyRupeeIcon,
  ClockIcon,
  ExclamationTriangleIcon,
  CheckCircleIcon
} from '@heroicons/react/24/outline';

const RefundPolicy = () => {
  const { darkMode } = useTheme();

  const refundScenarios = [
    {
      icon: CheckCircleIcon,
      title: 'Full Refund',
      description: 'Cancellation 24+ hours before rental start',
      color: 'text-green-500',
      bgColor: 'bg-green-100 dark:bg-green-900/20'
    },
    {
      icon: ClockIcon,
      title: '50% Refund',
      description: 'Cancellation 12-24 hours before rental start',
      color: 'text-yellow-500',
      bgColor: 'bg-yellow-100 dark:bg-yellow-900/20'
    },
    {
      icon: ExclamationTriangleIcon,
      title: 'No Refund',
      description: 'Cancellation less than 12 hours before rental start',
      color: 'text-red-500',
      bgColor: 'bg-red-100 dark:bg-red-900/20'
    }
  ];

  const refundReasons = [
    {
      title: 'Product Not Available',
      description: 'If the product becomes unavailable due to damage or other issues',
      refund: 'Full refund within 3-5 business days'
    },
    {
      title: 'Product Not as Described',
      description: 'If the delivered product significantly differs from the description',
      refund: 'Full refund or replacement option'
    },
    {
      title: 'Delivery Issues',
      description: 'If we fail to deliver the product on the agreed date and time',
      refund: 'Full refund plus compensation for inconvenience'
    },
    {
      title: 'Quality Issues',
      description: 'If the product has defects that prevent normal use',
      refund: 'Full refund or replacement with working product'
    }
  ];

  const refundProcess = [
    {
      step: 1,
      title: 'Request Refund',
      description: 'Contact our support team or use the refund request form in your account'
    },
    {
      step: 2,
      title: 'Review Process',
      description: 'Our team reviews your request and may ask for additional information'
    },
    {
      step: 3,
      title: 'Approval',
      description: 'Once approved, refund is processed according to our timeline'
    },
    {
      step: 4,
      title: 'Refund Issued',
      description: 'Refund is credited back to your original payment method'
    }
  ];

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
            <CurrencyRupeeIcon className="h-16 w-16 text-primary-600 mx-auto mb-6" />
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Refund Policy</h1>
            <p className="text-xl mb-8">
              Our fair and transparent refund policy designed to protect both renters and product owners
            </p>
            <div className={`inline-block px-4 py-2 rounded-lg ${darkMode ? 'bg-gray-800' : 'bg-white'} shadow`}>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Last updated: January 15, 2024
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Refund Timeline */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl font-bold mb-4">Cancellation Timeline</h2>
            <p className="text-lg">Refund amount depends on when you cancel your booking</p>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {refundScenarios.map((scenario, index) => (
              <motion.div
                key={index}
                className={`p-6 rounded-lg ${scenario.bgColor} text-center`}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <scenario.icon className={`h-16 w-16 ${scenario.color} mx-auto mb-4`} />
                <h3 className="text-xl font-semibold mb-2">{scenario.title}</h3>
                <p className="text-gray-600 dark:text-gray-300">{scenario.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Refund Reasons */}
      <section className={`py-16 px-4 sm:px-6 lg:px-8 ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
        <div className="max-w-7xl mx-auto">
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl font-bold mb-4">Eligible Refund Reasons</h2>
            <p className="text-lg">Situations where you may be eligible for a full refund</p>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {refundReasons.map((reason, index) => (
              <motion.div
                key={index}
                className={`p-6 rounded-lg ${darkMode ? 'bg-gray-700' : 'bg-gray-50'}`}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <h3 className="text-xl font-semibold mb-2">{reason.title}</h3>
                <p className="text-gray-600 dark:text-gray-300 mb-3">{reason.description}</p>
                <div className="text-green-600 dark:text-green-400 font-medium">
                  {reason.refund}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Refund Process */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl font-bold mb-4">How to Request a Refund</h2>
            <p className="text-lg">Simple steps to get your refund processed quickly</p>
          </motion.div>
          
          <div className="space-y-8">
            {refundProcess.map((step, index) => (
              <motion.div
                key={index}
                className="flex items-start"
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <div className="flex-shrink-0 w-12 h-12 bg-primary-600 text-white rounded-full flex items-center justify-center font-bold text-lg mr-6">
                  {step.step}
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
                  <p className="text-gray-600 dark:text-gray-300">{step.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Important Notes */}
      <section className={`py-16 px-4 sm:px-6 lg:px-8 ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl font-bold mb-6">Important Notes</h2>
            <div className="space-y-6">
              <div className={`p-6 rounded-lg ${darkMode ? 'bg-yellow-900/20' : 'bg-yellow-50'} border ${darkMode ? 'border-yellow-800' : 'border-yellow-200'}`}>
                <h3 className="text-lg font-semibold mb-2 text-yellow-600">Processing Time</h3>
                <p>Refunds typically take 3-5 business days to appear in your account, depending on your payment method and bank processing times.</p>
              </div>
              
              <div className={`p-6 rounded-lg ${darkMode ? 'bg-blue-900/20' : 'bg-blue-50'} border ${darkMode ? 'border-blue-800' : 'border-blue-200'}`}>
                <h3 className="text-lg font-semibold mb-2 text-blue-600">Security Deposits</h3>
                <p>Security deposits are refunded separately after product return and inspection, typically within 7 business days.</p>
              </div>
              
              <div className={`p-6 rounded-lg ${darkMode ? 'bg-red-900/20' : 'bg-red-50'} border ${darkMode ? 'border-red-800' : 'border-red-200'}`}>
                <h3 className="text-lg font-semibold mb-2 text-red-600">Non-Refundable Items</h3>
                <p>Certain items like consumables, personalized products, or items damaged by the renter may not be eligible for refunds.</p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Contact */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h3 className="text-2xl font-bold mb-4">Need Help with a Refund?</h3>
            <p className="text-lg mb-6">
              Our support team is here to help you with any refund-related questions
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/contact" className="btn-primary">
                Contact Support
              </Link>
              <a href="mailto:refunds@rentalhub.com" className="btn-secondary">
                Email: refunds@rentalhub.com
              </a>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default RefundPolicy;