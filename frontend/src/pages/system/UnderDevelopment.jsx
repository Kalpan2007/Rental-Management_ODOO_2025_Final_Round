import React from 'react';
import { Link } from 'react-router-dom';
import { FaTools, FaClock, FaBell, FaRocket, FaEnvelope } from 'react-icons/fa';

const UnderDevelopment = () => {
  const features = [
    {
      icon: FaRocket,
      title: 'Coming Soon',
      description: 'We\'re working hard to bring you an amazing new feature'
    },
    {
      icon: FaClock,
      title: 'Estimated Time',
      description: 'This section will be ready in the next few weeks'
    },
    {
      icon: FaBell,
      title: 'Get Notified',
      description: 'Subscribe to receive updates when we launch'
    }
  ];

  const progressStages = [
    { stage: 'Planning', progress: 100 },
    { stage: 'Design', progress: 80 },
    { stage: 'Development', progress: 60 },
    { stage: 'Testing', progress: 30 },
    { stage: 'Launch', progress: 10 }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 to-slate-800 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <FaTools className="mx-auto h-16 w-16 text-yellow-500 animate-bounce mb-4" />
          <h1 className="text-4xl font-bold text-white mb-4">Under Development</h1>
          <p className="text-xl text-slate-300">
            We're building something awesome for you
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-3 gap-8 mb-12">
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-slate-800 rounded-xl p-6 text-center hover:bg-slate-700/80 transition-colors duration-300"
            >
              <feature.icon className="mx-auto h-12 w-12 text-yellow-500 mb-4" />
              <h2 className="text-xl font-semibold text-white mb-2">{feature.title}</h2>
              <p className="text-slate-300">{feature.description}</p>
            </div>
          ))}
        </div>

        {/* Progress Section */}
        <div className="bg-slate-800 rounded-xl p-8 mb-12">
          <h2 className="text-2xl font-semibold text-white mb-6 text-center">
            Development Progress
          </h2>
          <div className="space-y-6">
            {progressStages.map((stage, index) => (
              <div key={index} className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-slate-300">{stage.stage}</span>
                  <span className="text-slate-400">{stage.progress}%</span>
                </div>
                <div className="h-2 bg-slate-700 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-yellow-500 rounded-full transition-all duration-500"
                    style={{ width: `${stage.progress}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Newsletter Subscription */}
        <div className="bg-slate-800 rounded-xl p-8 mb-12">
          <div className="text-center mb-6">
            <FaBell className="mx-auto h-10 w-10 text-yellow-500 mb-4" />
            <h2 className="text-2xl font-semibold text-white mb-2">
              Stay Updated
            </h2>
            <p className="text-slate-300">
              Subscribe to receive notifications when this feature launches
            </p>
          </div>
          <form className="max-w-md mx-auto">
            <div className="flex gap-4">
              <div className="flex-1 relative">
                <FaEnvelope className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" />
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="w-full pl-10 pr-4 py-3 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-yellow-500"
                />
              </div>
              <button
                type="submit"
                className="px-6 py-3 bg-yellow-500 text-slate-900 font-semibold rounded-lg hover:bg-yellow-400 transition-colors focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:ring-offset-2 focus:ring-offset-slate-800"
              >
                Notify Me
              </button>
            </div>
          </form>
        </div>

        {/* Alternative Actions */}
        <div className="text-center space-y-6">
          <h3 className="text-xl font-semibold text-white">
            In the meantime, you can:
          </h3>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              to="/"
              className="px-6 py-3 bg-slate-700 text-white rounded-lg hover:bg-slate-600 transition-colors"
            >
              Return Home
            </Link>
            <Link
              to="/support"
              className="px-6 py-3 bg-slate-700 text-white rounded-lg hover:bg-slate-600 transition-colors"
            >
              Contact Support
            </Link>
            <Link
              to="/faq"
              className="px-6 py-3 bg-slate-700 text-white rounded-lg hover:bg-slate-600 transition-colors"
            >
              Browse FAQ
            </Link>
          </div>
        </div>

        {/* Estimated Timeline */}
        <div className="mt-12 text-center text-slate-400 text-sm">
          <p>Estimated completion: Q2 2024</p>
          <p>Thank you for your patience!</p>
        </div>
      </div>
    </div>
  );
};

export default UnderDevelopment;