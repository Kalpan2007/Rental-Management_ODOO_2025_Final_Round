import { motion } from 'framer-motion';
import { useTheme } from '../../contexts/ThemeContext';
import { Link } from 'react-router-dom';
import { ShieldCheckIcon } from '@heroicons/react/24/outline';

const PrivacyPolicy = () => {
  const { darkMode } = useTheme();

  const sections = [
    {
      title: 'Information We Collect',
      content: `
        <p>We collect information you provide directly to us, such as when you create an account, make a rental, or contact us for support.</p>
        <h3>Personal Information:</h3>
        <ul>
          <li>Name and contact information</li>
          <li>Payment information</li>
          <li>Government-issued ID for verification</li>
          <li>Profile photos and preferences</li>
        </ul>
        <h3>Usage Information:</h3>
        <ul>
          <li>Device information and IP address</li>
          <li>Browsing history on our platform</li>
          <li>Rental history and preferences</li>
          <li>Location data (with your consent)</li>
        </ul>
      `
    },
    {
      title: 'How We Use Your Information',
      content: `
        <p>We use the information we collect to provide, maintain, and improve our services:</p>
        <ul>
          <li>Process rental transactions and payments</li>
          <li>Verify identity and prevent fraud</li>
          <li>Provide customer support</li>
          <li>Send important notifications about your rentals</li>
          <li>Improve our platform and develop new features</li>
          <li>Comply with legal obligations</li>
        </ul>
      `
    },
    {
      title: 'Information Sharing',
      content: `
        <p>We do not sell, trade, or rent your personal information to third parties. We may share information in the following circumstances:</p>
        <ul>
          <li>With service providers who help us operate our platform</li>
          <li>When required by law or to protect our rights</li>
          <li>In connection with a business transaction</li>
          <li>With your consent</li>
        </ul>
      `
    },
    {
      title: 'Data Security',
      content: `
        <p>We implement appropriate security measures to protect your personal information:</p>
        <ul>
          <li>Encryption of sensitive data</li>
          <li>Secure payment processing through Stripe</li>
          <li>Regular security audits and updates</li>
          <li>Access controls and monitoring</li>
          <li>Employee training on data protection</li>
        </ul>
      `
    },
    {
      title: 'Your Rights',
      content: `
        <p>You have certain rights regarding your personal information:</p>
        <ul>
          <li>Access and review your personal data</li>
          <li>Correct inaccurate information</li>
          <li>Delete your account and data</li>
          <li>Opt-out of marketing communications</li>
          <li>Data portability</li>
        </ul>
      `
    },
    {
      title: 'Cookies and Tracking',
      content: `
        <p>We use cookies and similar technologies to enhance your experience:</p>
        <ul>
          <li>Essential cookies for platform functionality</li>
          <li>Analytics cookies to understand usage patterns</li>
          <li>Preference cookies to remember your settings</li>
          <li>Marketing cookies for personalized content</li>
        </ul>
        <p>You can control cookie settings through your browser preferences.</p>
      `
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
            <ShieldCheckIcon className="h-16 w-16 text-primary-600 mx-auto mb-6" />
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Privacy Policy</h1>
            <p className="text-xl mb-8">
              Your privacy is important to us. This policy explains how we collect, use, and protect your information.
            </p>
            <div className={`inline-block px-4 py-2 rounded-lg ${darkMode ? 'bg-gray-800' : 'bg-white'} shadow`}>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Last updated: January 15, 2024
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Content */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="space-y-12">
            {sections.map((section, index) => (
              <motion.div
                key={index}
                className={`p-8 rounded-lg ${darkMode ? 'bg-gray-800' : 'bg-white'} shadow-lg`}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <h2 className="text-2xl font-bold mb-4">{section.title}</h2>
                <div 
                  className={`prose prose-lg max-w-none ${
                    darkMode 
                      ? 'prose-invert prose-headings:text-white prose-p:text-gray-300 prose-li:text-gray-300' 
                      : 'prose-headings:text-gray-900 prose-p:text-gray-700 prose-li:text-gray-700'
                  }`}
                  dangerouslySetInnerHTML={{ __html: section.content }}
                />
              </motion.div>
            ))}
          </div>

          {/* Contact Information */}
          <motion.div
            className={`mt-16 p-8 rounded-lg ${darkMode ? 'bg-gray-800' : 'bg-white'} shadow-lg text-center`}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h3 className="text-2xl font-bold mb-4">Privacy Questions?</h3>
            <p className="text-lg mb-6">
              If you have any questions about this Privacy Policy, please contact our Data Protection Officer
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a 
                href="mailto:privacy@rentalhub.com"
                className="btn-primary"
              >
                Email: privacy@rentalhub.com
              </a>
              <Link to="/contact" className="btn-secondary">
                Contact Form
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default PrivacyPolicy;