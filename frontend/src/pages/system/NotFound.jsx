import React from 'react';
import { Link } from 'react-router-dom';
import { FaExclamationTriangle } from 'react-icons/fa';

const NotFound = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-slate-900 to-slate-800 px-4">
      <div className="max-w-2xl w-full text-center">
        <div className="mb-8 animate-bounce">
          <FaExclamationTriangle className="mx-auto h-16 w-16 text-yellow-500" />
        </div>
        <h1 className="text-6xl font-bold text-white mb-4">404</h1>
        <h2 className="text-3xl font-semibold text-white mb-6">Page Not Found</h2>
        <p className="text-lg text-slate-300 mb-8">
          Oops! The page you're looking for doesn't exist or has been moved.
          We suggest you go back to the homepage while we fix this.
        </p>
        <div className="space-y-4">
          <Link
            to="/"
            className="inline-block px-6 py-3 bg-gradient-to-r from-purple-600 to-blue-600 text-white font-medium rounded-lg hover:from-purple-700 hover:to-blue-700 transition-all duration-200 shadow-lg hover:shadow-xl"
          >
            Return Home
          </Link>
          <div className="mt-8">
            <p className="text-slate-400">
              Need assistance? {' '}
              <Link to="/contact" className="text-purple-400 hover:text-purple-300 underline">
                Contact our support team
              </Link>
            </p>
          </div>
        </div>
        <div className="mt-12 border-t border-slate-700 pt-8">
          <p className="text-slate-400 text-sm">
            Error Code: 404 | Page Not Found
          </p>
        </div>
      </div>
    </div>
  );
};

export default NotFound;