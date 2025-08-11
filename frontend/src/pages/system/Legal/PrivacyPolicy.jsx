import React from 'react';
import { Link } from 'react-router-dom';
import { FaUserShield, FaDatabase, FaLock, FaShareAlt, FaCookie, FaUserCog } from 'react-icons/fa';

const PrivacyPolicy = () => {
  const sections = [
    {
      id: 1,
      title: 'Information We Collect',
      icon: FaDatabase,
      content: 'We collect various types of information to provide and improve our services:',
      items: [
        {
          subtitle: 'Personal Information',
          details: [
            'Name and contact information',
            'Government-issued ID for verification',
            'Payment information',
            'Email address and phone number'
          ]
        },
        {
          subtitle: 'Usage Information',
          details: [
            'Browsing history on our platform',
            'Rental history and preferences',
            'Device information and IP address',
            'Location data (with your consent)'
          ]
        }
      ]
    },
    {
      id: 2,
      title: 'How We Use Your Information',
      icon: FaUserCog,
      content: 'Your information helps us provide and personalize our services:',
      items: [
        {
          subtitle: 'Service Provision',
          details: [
            'Process rental transactions',
            'Verify identity and prevent fraud',
            'Provide customer support',
            'Send important notifications'
          ]
        },
        {
          subtitle: 'Service Improvement',
          details: [
            'Analyze usage patterns',
            'Enhance user experience',
            'Develop new features',
            'Conduct market research'
          ]
        }
      ]
    },
    {
      id: 3,
      title: 'Information Sharing',
      icon: FaShareAlt,
      content: 'We share information only in specific circumstances:',
      items: [
        {
          subtitle: 'Third-Party Service Providers',
          details: [
            'Payment processors',
            'Identity verification services',
            'Cloud storage providers',
            'Analytics services'
          ]
        },
        {
          subtitle: 'Legal Requirements',
          details: [
            'Court orders and legal processes',
            'Government requests',
            'Protection of rights and safety',
            'Prevention of fraud or illegal activities'
          ]
        }
      ]
    },
    {
      id: 4,
      title: 'Data Security',
      icon: FaLock,
      content: 'We implement robust security measures to protect your information:',
      items: [
        {
          subtitle: 'Technical Measures',
          details: [
            'Encryption in transit and at rest',
            'Secure data centers',
            'Regular security audits',
            'Access control and monitoring'
          ]
        },
        {
          subtitle: 'Organizational Measures',
          details: [
            'Employee training and policies',
            'Data access restrictions',
            'Incident response plans',
            'Regular security reviews'
          ]
        }
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 to-slate-800 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <FaUserShield className="mx-auto h-16 w-16 text-purple-500 mb-4" />
          <h1 className="text-4xl font-bold text-white mb-4">Privacy Policy</h1>
          <p className="text-xl text-slate-300">
            Your privacy is important to us. This policy explains how we handle your information.
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
                  <p className="text-slate-300 mb-6">{section.content}</p>

                  <div className="grid md:grid-cols-2 gap-6">
                    {section.items.map((item, index) => (
                      <div key={index} className="space-y-4">
                        <h3 className="text-lg font-medium text-white">
                          {item.subtitle}
                        </h3>
                        <ul className="space-y-2">
                          {item.details.map((detail, detailIndex) => (
                            <li
                              key={detailIndex}
                              className="flex items-center text-slate-300"
                            >
                              <span className="w-2 h-2 bg-purple-500 rounded-full mr-3" />
                              {detail}
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Your Rights Section */}
        <div className="mt-12 bg-slate-800/50 rounded-xl p-8">
          <h3 className="text-2xl font-semibold text-white mb-6">
            Your Rights and Choices
          </h3>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="space-y-4">
              <h4 className="text-lg font-medium text-white">Access and Control</h4>
              <ul className="space-y-2 text-slate-300">
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-purple-500 rounded-full mr-3" />
                  Request access to your personal data
                </li>
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-purple-500 rounded-full mr-3" />
                  Update or correct your information
                </li>
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-purple-500 rounded-full mr-3" />
                  Delete your account and data
                </li>
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-purple-500 rounded-full mr-3" />
                  Opt-out of marketing communications
                </li>
              </ul>
            </div>
            <div className="space-y-4">
              <h4 className="text-lg font-medium text-white">Contact Us</h4>
              <p className="text-slate-300 mb-4">
                For privacy-related inquiries or to exercise your rights, please contact our
                Data Protection Officer:
              </p>
              <ul className="space-y-2">
                <li>
                  <a
                    href="mailto:privacy@example.com"
                    className="text-purple-400 hover:text-purple-300"
                  >
                    privacy@example.com
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
          </div>
        </div>

        {/* Related Policies */}
        <div className="mt-12 bg-slate-800 rounded-xl p-6">
          <h3 className="text-xl font-semibold text-white mb-4">
            Related Policies
          </h3>
          <div className="flex flex-wrap gap-4">
            <Link
              to="/terms-of-service"
              className="px-4 py-2 bg-slate-700 rounded-lg text-white hover:bg-slate-600 transition-colors"
            >
              Terms of Service
            </Link>
            <Link
              to="/cookies-policy"
              className="px-4 py-2 bg-slate-700 rounded-lg text-white hover:bg-slate-600 transition-colors"
            >
              Cookies Policy
            </Link>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-12 text-center border-t border-slate-700 pt-8">
          <p className="text-slate-400 text-sm">
            This privacy policy is effective as of {new Date().toLocaleDateString()} and will
            remain in effect except with respect to any changes in its provisions in the
            future, which will be in effect immediately after being posted on this page.
          </p>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;