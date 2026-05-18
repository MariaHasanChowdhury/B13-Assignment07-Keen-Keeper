import React from 'react';
import { Link } from 'react-router-dom';
import { Home, Compass } from 'lucide-react';

const NotFound = () => {
  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center text-center px-4">
      <div className="p-4 bg-indigo-50 text-indigo-600 rounded-full animate-bounce mb-6">
        <Compass size={48} />
      </div>
      <h1 className="text-6xl font-extrabold text-indigo-600">404</h1>
      <h2 className="text-2xl font-bold text-gray-900 mt-2">Page Not Found</h2>
      <p className="text-gray-500 max-w-sm mt-2">
        Oops! The link you followed might be broken, or the page may have been removed.
      </p>
      <Link 
        to="/" 
        className="mt-6 inline-flex items-center gap-2 bg-indigo-600 text-white px-5 py-2.5 rounded-xl font-medium hover:bg-indigo-700 transition-colors shadow-md shadow-indigo-100"
      >
        <Home size={18} /> Back to Dashboard
      </Link>
    </div>
  );
};

export default NotFound;