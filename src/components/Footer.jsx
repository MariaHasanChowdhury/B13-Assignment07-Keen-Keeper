import React from 'react';
import { Heart } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-white border-t border-gray-100 py-8 mt-auto">
      <div className="max-w-7xl mx-auto px-4 text-center text-gray-500 text-sm">
        <p className="flex items-center justify-center gap-1 font-medium text-gray-700">
          Made with <Heart className="w-4 h-4 text-rose-500 fill-current" /> for keeping bonds alive.
        </p>
        <p className="mt-2">&copy; {new Date().getFullYear()} KinKeeper. All rights reserved.</p>
      </div>
    </footer>
  );
}