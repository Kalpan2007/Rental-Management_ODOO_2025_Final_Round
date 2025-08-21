import { motion } from 'framer-motion';
import { useTheme } from '../../contexts/ThemeContext';
import { Link } from 'react-router-dom';
import { 
  CogIcon,
  ChartBarIcon,
  UserIcon,
  MegaphoneIcon
} from '@heroicons/react/24/outline';

const CookiesPolicy = () => {
  const { darkMode } = useTheme();

  const cookieTypes = [
    {
      icon: CogIcon,
      title: 'Essential Cookies',
      description: 'These cookies are necessary for the website to function properly.',
      examples: [
        'Authentication cookies',
        'Security cookies',
        'Load balancing cookies',
        'User interface customization'
      ]
    },
    {
      icon: ChartBarIcon,
      title: 'Analytics Cookies',
      description: 'Help us understand how visitors interact with our website.',
      examples: [
        'Google Analytics',
        'Page view tracking',
        'User behavior analysis',
        'Performance monitoring'
      ]
    },
    {
      icon: UserIcon,
      title: 'Functional Cookies',
      description: 'Enable enhanced functionality and personalization.',
      examples: [
        'Language preferences',
        'Theme settings',
        'Location preferences',
        'Saved searches'
      ]
    },
    {
      icon: MegaphoneIcon,
      title: 'Marketing Cookies',
      description: 'Used to deliver relevant advertisements and track campaign effectiveness.',
      examples: [
        'Ad targeting',
        'Social media integration',
        'Campaign tracking',
        'Retargeting pixels'
      ]
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
            <div className="text-6xl mb-6">🍪</div>
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Cookies Policy</h1>
            <p className="text-xl mb-8">
              Learn about how we use cookies to improve your experience on RentalHub
            </p>
            <div className={`inline-block px-4 py-2 rounded-lg ${darkMode ? 'bg-gray-800' : 'bg-white'} shadow`}>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Last updated: January 15, 2024
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* What are Cookies */}
      <section className={`py-16 px-4 sm:px-6 lg:px-8 ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl font-bold mb-6">What are Cookies?</h2>
            <p className="text-lg mb-6">
              Cookies are small text files that are placed on your device when you visit our website. 
              They help us provide you with a better experience by remembering your preferences and 
              analyzing how you use our site.
            </p>
            <p className="text-lg">
              We use different types of cookies for various purposes, all designed to enhance your 
              experience while respecting your privacy.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Cookie Types */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl font-bold mb-4">Types of Cookies We Use</h2>
            <p className="text-lg">Understanding the different categories of cookies on our site</p>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {cookieTypes.map((type, index) => (
              <motion.div
                key={index}
                className={`p-6 rounded-lg ${darkMode ? 'bg-gray-800' : 'bg-white'} shadow-lg`}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <type.icon className="h-12 w-12 text-primary-600 mb-4" />
                <h3 className="text-xl font-semibold mb-3">{type.title}</h3>
                <p className="text-gray-600 dark:text-gray-300 mb-4">{type.description}</p>
                <div>
                  <h4 className="font-medium mb-2">Examples:</h4>
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

      {/* Managing Cookies */}
      <section className={`py-16 px-4 sm:px-6 lg:px-8 ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl font-bold mb-6">Managing Your Cookie Preferences</h2>
            <div className="space-y-6">
              <div>
                <h3 className="text-xl font-semibold mb-3">Browser Settings</h3>
                <p className="text-lg mb-4">
                  You can control cookies through your browser settings. Most browsers allow you to:
                </p>
                <ul className="list-disc list-inside space-y-2 text-gray-600 dark:text-gray-300">
                  <li>View and delete cookies</li>
                  <li>Block cookies from specific sites</li>
                  <li>Block third-party cookies</li>
                  <li>Clear all cookies when you close the browser</li>
                </ul>
              </div>
              
              <div>
                <h3 className="text-xl font-semibold mb-3">Cookie Consent</h3>
                <p className="text-lg">
                  When you first visit our site, we'll ask for your consent to use non-essential cookies. 
                  You can change your preferences at any time through our cookie settings panel.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Third Party Cookies */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl font-bold mb-6">Third-Party Cookies</h2>
            <p className="text-lg mb-6">
              Some cookies are set by third-party services that appear on our pages:
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className={`p-6 rounded-lg ${darkMode ? 'bg-gray-700' : 'bg-gray-50'}`}>
                <h3 className="text-lg font-semibold mb-2">Google Analytics</h3>
                <p className="text-gray-600 dark:text-gray-300">
                  Helps us understand how visitors use our website to improve user experience.
                </p>
              </div>
              <div className={`p-6 rounded-lg ${darkMode ? 'bg-gray-700' : 'bg-gray-50'}`}>
                <h3 className="text-lg font-semibold mb-2">Stripe</h3>
                <p className="text-gray-600 dark:text-gray-300">
                  Secure payment processing and fraud prevention for rental transactions.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Contact */}
      <section className={`py-16 px-4 sm:px-6 lg:px-8 ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h3 className="text-2xl font-bold mb-4">Questions About Cookies?</h3>
            <p className="text-lg mb-6">
              If you have any questions about our use of cookies, please contact us
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/contact" className="btn-primary">
                Contact Us
              </Link>
              <Link to="/privacy" className="btn-secondary">
                Privacy Policy
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default CookiesPolicy;