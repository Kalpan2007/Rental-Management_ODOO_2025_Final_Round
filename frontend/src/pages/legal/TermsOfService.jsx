import { motion } from 'framer-motion';
import { useTheme } from '../../contexts/ThemeContext';
import { Link } from 'react-router-dom';
import { DocumentTextIcon } from '@heroicons/react/24/outline';

const TermsOfService = () => {
  const { darkMode } = useTheme();

  const sections = [
    {
      title: 'Acceptance of Terms',
      content: `By accessing and using RentalHub, you acknowledge that you have read, understood, and agree to be bound by these Terms of Service. These terms constitute a legally binding agreement between you and RentalHub.`
    },
    {
      title: 'User Accounts',
      content: `To use our services, you must create an account and provide accurate information. You are responsible for maintaining the confidentiality of your account credentials and for all activities that occur under your account.`
    },
    {
      title: 'Rental Services',
      content: `RentalHub provides a platform for users to rent products from other users. We facilitate transactions but are not responsible for the quality, safety, or legality of the products listed.`
    },
    {
      title: 'Payment Terms',
      content: `All payments are processed securely through Stripe. Rental fees, security deposits, and any additional charges will be clearly displayed before payment confirmation.`
    },
    {
      title: 'User Responsibilities',
      content: `Users must treat rental items with care, return them in the same condition, and comply with all rental terms. Any damage or loss may result in additional charges.`
    },
    {
      title: 'Prohibited Uses',
      content: `Users may not use our platform for illegal activities, fraudulent transactions, or any purpose that violates these terms or applicable laws.`
    },
    {
      title: 'Limitation of Liability',
      content: `RentalHub's liability is limited to the maximum extent permitted by law. We are not liable for any indirect, incidental, or consequential damages.`
    },
    {
      title: 'Modifications to Terms',
      content: `We reserve the right to modify these terms at any time. Users will be notified of significant changes, and continued use constitutes acceptance of the modified terms.`
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
            <DocumentTextIcon className="h-16 w-16 text-primary-600 mx-auto mb-6" />
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Terms of Service</h1>
            <p className="text-xl mb-8">
              Please read these terms carefully before using our services
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
                  className="prose prose-lg max-w-none dark:prose-invert"
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
            <h3 className="text-2xl font-bold mb-4">Questions About These Terms?</h3>
            <p className="text-lg mb-6">
              If you have any questions about these Terms of Service, please contact us
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/contact" className="btn-primary">
                Contact Us
              </Link>
              <Link to="/support" className="btn-secondary">
                Get Support
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default TermsOfService;