import React from 'react';
import { Link } from 'react-router-dom';
import { FaTools, FaClock, FaEnvelope } from 'react-icons/fa';

const Maintenance = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-slate-900 to-slate-800 px-4">
      <div className="max-w-3xl w-full text-center">
        <div className="mb-8 relative">
          <div className="absolute -left-4 top-0 animate-spin-slow">
            <FaTools className="h-12 w-12 text-purple-500 transform -rotate-45" />
          </div>
          <div className="absolute -right-4 top-0 animate-spin-slow">
            <FaTools className="h-12 w-12 text-blue-500 transform rotate-45" />
          </div>
          <FaClock className="mx-auto h-20 w-20 text-yellow-500" />
        </div>
        
        <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
          Under Maintenance
        </h1>
        
        <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-8 shadow-2xl border border-slate-700">
          <p className="text-xl text-slate-300 mb-6">
            We're currently performing scheduled maintenance to improve your experience.
            We'll be back shortly!
          </p>
          
          <div className="grid md:grid-cols-2 gap-6 mb-8">
            <div className="bg-slate-800 rounded-lg p-6 border border-slate-700">
              <h3 className="text-lg font-semibold text-white mb-2">Estimated Duration</h3>
              <p className="text-slate-300">2-3 hours</p>
            </div>
            
            <div className="bg-slate-800 rounded-lg p-6 border border-slate-700">
              <h3 className="text-lg font-semibold text-white mb-2">Status Updates</h3>
              <p className="text-slate-300">Follow us on Twitter</p>
            </div>
          </div>
          
          <div className="space-y-6">
            <div className="flex items-center justify-center space-x-4">
              <FaEnvelope className="h-6 w-6 text-purple-500" />
              <p className="text-slate-300">
                Get notified when we're back:
              </p>
            </div>
            
            <form className="flex flex-col md:flex-row gap-4 justify-center items-center">
              <input
                type="email"
                placeholder="Enter your email"
                className="px-4 py-2 rounded-lg bg-slate-700 border border-slate-600 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-purple-500 w-full md:w-auto"
              />
              <button
                type="submit"
                className="px-6 py-2 bg-gradient-to-r from-purple-600 to-blue-600 text-white font-medium rounded-lg hover:from-purple-700 hover:to-blue-700 transition-all duration-200 w-full md:w-auto"
              >
                Notify Me
              </button>
            </form>
          </div>
        </div>
        
        <div className="mt-8">
          <p className="text-slate-400">
            Need immediate assistance? {' '}
            <Link to="/contact" className="text-purple-400 hover:text-purple-300 underline">
              Contact our support team
            </Link>
          </p>
        </div>
        
        <div className="mt-12 border-t border-slate-700 pt-8">
          <p className="text-slate-400 text-sm">
            We apologize for any inconvenience. Thank you for your patience.
          </p>
        </div>
      </div>
      
      <style jsx>{`
        @keyframes spin-slow {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }
        .animate-spin-slow {
          animation: spin-slow 3s linear infinite;
        }
      `}</style>
    </div>
  );
};

export default Maintenance;