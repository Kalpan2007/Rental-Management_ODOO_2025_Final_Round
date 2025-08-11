import React from 'react';
import { Link } from 'react-router-dom';
import { FaBug, FaRedo, FaExclamationCircle } from 'react-icons/fa';

const SystemCrash = () => {
  const handleRefresh = () => {
    window.location.reload();
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-slate-900 to-slate-800 px-4">
      <div className="max-w-3xl w-full text-center">
        <div className="mb-8 relative">
          <div className="absolute -left-8 top-0 animate-pulse">
            <FaExclamationCircle className="h-12 w-12 text-red-500" />
          </div>
          <div className="absolute -right-8 top-0 animate-pulse delay-100">
            <FaExclamationCircle className="h-12 w-12 text-red-500" />
          </div>
          <FaBug className="mx-auto h-24 w-24 text-red-500 animate-bounce" />
        </div>

        <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-8 shadow-2xl border border-slate-700">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Oops! Something Went Wrong
          </h1>

          <div className="space-y-6 mb-8">
            <p className="text-xl text-slate-300">
              We've encountered an unexpected error and our team has been notified.
              We're working hard to fix this issue.
            </p>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-slate-800 rounded-lg p-6 border border-slate-700">
                <h3 className="text-lg font-semibold text-white mb-2">Error Details</h3>
                <p className="text-slate-300 text-sm">
                  Technical Error Code: SYSTEM_CRASH_001
                  <br />
                  Time: {new Date().toLocaleString()}
                </p>
              </div>

              <div className="bg-slate-800 rounded-lg p-6 border border-slate-700">
                <h3 className="text-lg font-semibold text-white mb-2">What You Can Do</h3>
                <ul className="text-slate-300 text-sm text-left list-disc list-inside">
                  <li>Refresh the page</li>
                  <li>Clear your browser cache</li>
                  <li>Try again in a few minutes</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="flex flex-col md:flex-row gap-4 justify-center items-center">
            <button
              onClick={handleRefresh}
              className="px-6 py-3 bg-red-600 hover:bg-red-700 text-white font-medium rounded-lg transition-all duration-200 flex items-center justify-center w-full md:w-auto"
            >
              <FaRedo className="mr-2" />
              Refresh Page
            </button>

            <Link
              to="/"
              className="px-6 py-3 bg-slate-700 hover:bg-slate-600 text-white font-medium rounded-lg transition-all duration-200 w-full md:w-auto"
            >
              Return Home
            </Link>
          </div>

          <div className="mt-8 pt-6 border-t border-slate-700">
            <p className="text-slate-400 mb-4">
              If the problem persists, please contact our support team:
            </p>
            <div className="flex justify-center space-x-6">
              <Link
                to="/contact"
                className="text-purple-400 hover:text-purple-300 flex items-center"
              >
                Contact Support
              </Link>
              <span className="text-slate-600">|</span>
              <a
                href="mailto:support@example.com"
                className="text-purple-400 hover:text-purple-300"
              >
                support@example.com
              </a>
            </div>
          </div>
        </div>

        <div className="mt-12 text-slate-400 text-sm">
          <p>System Status Updates:</p>
          <p>
            Follow us on{' '}
            <a
              href="https://twitter.com/example"
              target="_blank"
              rel="noopener noreferrer"
              className="text-purple-400 hover:text-purple-300"
            >
              Twitter
            </a>
            {' '}for real-time updates
          </p>
        </div>

        <div className="fixed bottom-4 right-4">
          <div className="animate-pulse bg-red-500/20 rounded-full p-3">
            <div className="animate-spin">
              <FaBug className="h-6 w-6 text-red-500" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SystemCrash;