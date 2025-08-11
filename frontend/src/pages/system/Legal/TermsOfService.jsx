import React from 'react';
import { Link } from 'react-router-dom';
import { FaShieldAlt, FaHandshake, FaUserShield, FaFileContract, FaCreditCard, FaLock } from 'react-icons/fa';

const TermsOfService = () => {
  const sections = [
    {
      id: 1,
      title: 'Acceptance of Terms',
      icon: FaHandshake,
      content: `By accessing and using our rental platform, you acknowledge that you have read, understood, and agree to be bound by these Terms of Service. These terms constitute a legally binding agreement between you and our company.`,
      subsections: [
        'You must be at least 18 years old to use our services',
        'You agree to provide accurate and complete information during registration',
        'You are responsible for maintaining the confidentiality of your account'
      ]
    },
    {
      id: 2,
      title: 'User Responsibilities',
      icon: FaUserShield,
      content: `As a user of our platform, you agree to use our services responsibly and in accordance with all applicable laws and regulations.`,
      subsections: [
        'Maintain accurate account information',
        'Use products according to rental agreements',
        'Report any damages or issues promptly',
        'Return items in the same condition as received'
      ]
    },
    {
      id: 3,
      title: 'Rental Terms',
      icon: FaFileContract,
      content: `Our rental terms outline the specific conditions under which products can be rented, including duration, pricing, and responsibilities.`,
      subsections: [
        'Rental periods are strictly enforced',
        'Late returns may incur additional charges',
        'Security deposits may be required',
        'Damage protection policies must be acknowledged'
      ]
    },
    {
      id: 4,
      title: 'Payment Terms',
      icon: FaCreditCard,
      content: `We accept various payment methods and maintain transparent pricing policies. All fees and charges will be clearly communicated before confirmation.`,
      subsections: [
        'Secure payment processing',
        'Clear refund policies',
        'Damage deposit handling',
        'Late payment consequences'
      ]
    },
    {
      id: 5,
      title: 'Privacy & Security',
      icon: FaLock,
      content: `We are committed to protecting your privacy and securing your personal information. Our privacy practices are detailed in our Privacy Policy.`,
      subsections: [
        'Data collection and usage',
        'Information sharing policies',
        'Security measures',
        'User rights and controls'
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 to-slate-800 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <FaShieldAlt className="mx-auto h-16 w-16 text-purple-500 mb-4" />
          <h1 className="text-4xl font-bold text-white mb-4">Terms of Service</h1>
          <p className="text-xl text-slate-300">
            Please read these terms carefully before using our services
          </p>
        </div>

        {/* Last Updated */}
        <div className="bg-slate-800/50 rounded-lg p-4 mb-8 text-center">
          <p className="text-slate-300">
            Last Updated: {new Date().toLocaleDateString()}
          </p>
        </div>

        {/* Main Content */}
        <div className="space-y-8">
          {sections.map((section) => (
            <div
              key={section.id}
              className="bg-slate-800 rounded-xl p-6 shadow-lg hover:bg-slate-700/80 transition-colors duration-300"
            >
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0">
                  <section.icon className="h-8 w-8 text-purple-500" />
                </div>
                <div className="flex-1">
                  <h2 className="text-2xl font-semibold text-white mb-4">
                    {section.title}
                  </h2>
                  <p className="text-slate-300 mb-4">{section.content}</p>
                  
                  <ul className="space-y-2">
                    {section.subsections.map((subsection, index) => (
                      <li
                        key={index}
                        className="flex items-center text-slate-300"
                      >
                        <span className="w-2 h-2 bg-purple-500 rounded-full mr-3" />
                        {subsection}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Additional Information */}
        <div className="mt-12 bg-slate-800/50 rounded-xl p-8">
          <h3 className="text-xl font-semibold text-white mb-4">
            Additional Information
          </h3>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <p className="text-slate-300">
                For any questions about these terms, please contact our support team:
              </p>
              <ul className="space-y-2 text-slate-300">
                <li>
                  <a
                    href="mailto:support@example.com"
                    className="text-purple-400 hover:text-purple-300"
                  >
                    support@example.com
                  </a>
                </li>
                <li>
                  <Link
                    to="/contact"
                    className="text-purple-400 hover:text-purple-300"
                  >
                    Contact Form
                  </Link>
                </li>
              </ul>
            </div>
            <div className="space-y-4">
              <p className="text-slate-300">
                Related Policies:
              </p>
              <ul className="space-y-2">
                <li>
                  <Link
                    to="/privacy-policy"
                    className="text-purple-400 hover:text-purple-300"
                  >
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link
                    to="/cookies-policy"
                    className="text-purple-400 hover:text-purple-300"
                  >
                    Cookies Policy
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-12 text-center border-t border-slate-700 pt-8">
          <p className="text-slate-400 text-sm">
            By using our services, you agree to these terms and conditions.
            We reserve the right to modify these terms at any time.
          </p>
        </div>
      </div>
    </div>
  );
};

export default TermsOfService;