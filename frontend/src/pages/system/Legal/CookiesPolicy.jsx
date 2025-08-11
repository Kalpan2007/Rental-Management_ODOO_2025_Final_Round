import React from 'react';
import { Link } from 'react-router-dom';
import { FaCookie, FaShieldAlt, FaCogs, FaInfoCircle, FaUserCog } from 'react-icons/fa';

const CookiesPolicy = () => {
  const cookieTypes = [
    {
      id: 1,
      title: 'Essential Cookies',
      icon: FaShieldAlt,
      description: 'These cookies are necessary for the website to function properly. They enable core functionality such as security, network management, and accessibility.',
      examples: [
        'Authentication cookies',
        'Security cookies',
        'Load balancing cookies',
        'User interface customization cookies'
      ]
    },
    {
      id: 2,
      title: 'Performance Cookies',
      icon: FaCogs,
      description: 'These cookies help us understand how visitors interact with our website by collecting and reporting information anonymously.',
      examples: [
        'Analytics cookies',
        'Load time tracking cookies',
        'Error logging cookies',
        'A/B testing cookies'
      ]
    },
    {
      id: 3,
      title: 'Functionality Cookies',
      icon: FaUserCog,
      description: 'These cookies enable the website to provide enhanced functionality and personalization based on your preferences and choices.',
      examples: [
        'Language preference cookies',
        'Theme preference cookies',
        'Region selection cookies',
        'User customization cookies'
      ]
    },
    {
      id: 4,
      title: 'Targeting Cookies',
      icon: FaInfoCircle,
      description: 'These cookies may be set through our site by our advertising partners to build a profile of your interests and show you relevant ads on other sites.',
      examples: [
        'Advertising cookies',
        'Social media cookies',
        'Content targeting cookies',
        'Retargeting cookies'
      ]
    }
  ];

  const managementOptions = [
    {
      title: 'Browser Settings',
      description: 'You can set your browser to block or alert you about these cookies, but some parts of the site may not work.',
      steps: [
        'Access your browser settings',
        'Navigate to privacy/security section',
        'Locate cookie settings',
        'Choose your preferred configuration'
      ]
    },
    {
      title: 'Cookie Consent',
      description: 'When you first visit our site, we will ask for your consent to use cookies. You can change your preferences at any time.',
      steps: [
        'Review cookie categories',
        'Select your preferences',
        'Save your choices',
        'Update anytime via cookie settings'
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 to-slate-800 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <FaCookie className="mx-auto h-16 w-16 text-amber-500 mb-4" />
          <h1 className="text-4xl font-bold text-white mb-4">Cookies Policy</h1>
          <p className="text-xl text-slate-300">
            Understanding how and why we use cookies to improve your experience
          </p>
        </div>

        {/* Last Updated */}
        <div className="bg-slate-800/50 rounded-lg p-4 mb-8 text-center">
          <p className="text-slate-300">
            Last Updated: {new Date().toLocaleDateString()}
          </p>
        </div>

        {/* Introduction */}
        <div className="bg-slate-800 rounded-xl p-6 mb-8">
          <h2 className="text-2xl font-semibold text-white mb-4">What Are Cookies?</h2>
          <p className="text-slate-300 leading-relaxed">
            Cookies are small text files that are placed on your device when you visit our website. 
            They help us provide you with a better experience by remembering your preferences, 
            analyzing site usage, and assisting with our marketing efforts. We use different types 
            of cookies for various purposes, as explained below.
          </p>
        </div>

        {/* Cookie Types */}
        <div className="space-y-6 mb-12">
          <h2 className="text-2xl font-semibold text-white mb-6">Types of Cookies We Use</h2>
          {cookieTypes.map((type) => (
            <div
              key={type.id}
              className="bg-slate-800 rounded-xl p-6 hover:bg-slate-700/80 transition-colors duration-300"
            >
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0">
                  <type.icon className="h-8 w-8 text-amber-500" />
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-semibold text-white mb-3">
                    {type.title}
                  </h3>
                  <p className="text-slate-300 mb-4">{type.description}</p>
                  <div className="bg-slate-900/50 rounded-lg p-4">
                    <h4 className="text-white font-medium mb-2">Examples:</h4>
                    <ul className="grid grid-cols-1 md:grid-cols-2 gap-2">
                      {type.examples.map((example, index) => (
                        <li
                          key={index}
                          className="flex items-center text-slate-300"
                        >
                          <span className="w-2 h-2 bg-amber-500 rounded-full mr-3" />
                          {example}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Cookie Management */}
        <div className="bg-slate-800 rounded-xl p-6 mb-12">
          <h2 className="text-2xl font-semibold text-white mb-6">Managing Your Cookie Preferences</h2>
          <div className="grid md:grid-cols-2 gap-6">
            {managementOptions.map((option, index) => (
              <div key={index} className="bg-slate-900/50 rounded-lg p-6">
                <h3 className="text-xl font-semibold text-white mb-3">{option.title}</h3>
                <p className="text-slate-300 mb-4">{option.description}</p>
                <div className="space-y-2">
                  {option.steps.map((step, stepIndex) => (
                    <div key={stepIndex} className="flex items-center text-slate-300">
                      <span className="w-6 h-6 flex items-center justify-center bg-amber-500 rounded-full mr-3 text-slate-900 text-sm font-medium">
                        {stepIndex + 1}
                      </span>
                      {step}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Third-Party Cookies */}
        <div className="bg-slate-800 rounded-xl p-6 mb-12">
          <h2 className="text-2xl font-semibold text-white mb-4">Third-Party Cookies</h2>
          <p className="text-slate-300 mb-4">
            Some of our pages display content from external providers, such as YouTube, Facebook,
            and Twitter. To view this third-party content, you first have to accept their specific
            terms and conditions. This includes their cookie policies, which we have no control over.
          </p>
          <p className="text-slate-300">
            If you do not see the content, you need to accept their terms and conditions. However,
            we do not recommend accepting their cookies if you are unsure about their privacy practices.
          </p>
        </div>

        {/* Related Policies */}
        <div className="bg-slate-800 rounded-xl p-6 mb-12">
          <h3 className="text-xl font-semibold text-white mb-4">Related Policies</h3>
          <div className="flex flex-wrap gap-4">
            <Link
              to="/privacy-policy"
              className="px-4 py-2 bg-slate-700 rounded-lg text-white hover:bg-slate-600 transition-colors"
            >
              Privacy Policy
            </Link>
            <Link
              to="/terms-of-service"
              className="px-4 py-2 bg-slate-700 rounded-lg text-white hover:bg-slate-600 transition-colors"
            >
              Terms of Service
            </Link>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center border-t border-slate-700 pt-8">
          <p className="text-slate-400 text-sm">
            This cookies policy is effective as of {new Date().toLocaleDateString()} and will
            remain in effect except with respect to any changes in its provisions in the
            future, which will be in effect immediately after being posted on this page.
          </p>
        </div>
      </div>
    </div>
  );
};

export default CookiesPolicy;