import React from 'react';
import { Users, Heart } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-white border-t border-gray-200 py-8 mt-auto">
      <div className="max-w-7xl mx-auto px-4 text-center sm:flex sm:justify-between sm:items-center">
        <div className="flex items-center justify-center gap-2 text-gray-900 font-semibold mb-4 sm:mb-0">
          <Users className="text-indigo-600" size={20} />
          KeenKeeper
        </div>
        <p className="text-sm text-gray-500 flex items-center justify-center gap-1">
          Made with <Heart size={14} className="text-red-500 fill-current" /> to keep friendships strong &copy; {new Date().getFullYear()}
        </p>
      </div>
    </footer>
  );
};

export default Footer;