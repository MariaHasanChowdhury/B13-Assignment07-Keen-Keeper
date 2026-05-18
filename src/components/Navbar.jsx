import React from 'react';
import { NavLink } from 'react-router-dom';
import { Home, Calendar, BarChart3, Users } from 'lucide-react';

export default function Navbar() {
  const linkClass = ({ isActive }) => 
    `flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all ${
      isActive 
        ? 'bg-indigo-600 text-white shadow-md shadow-indigo-200' 
        : 'text-gray-600 hover:bg-gray-100'
    }`;

  return (
    <nav className="bg-white border-b border-gray-100 sticky top-0 z-50 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          {/* Logo */}
          <NavLink to="/" className="flex items-center gap-2 text-indigo-600 font-extrabold text-2xl tracking-tight">
            <Users className="w-7 h-7" />
            <span>KinKeeper</span>
          </NavLink>
          
          {/* Links */}
          <div className="flex gap-2">
            <NavLink to="/" className={linkClass}>
              <Home className="w-4 h-4" /> <span className="hidden sm:inline">Home</span>
            </NavLink>
            <NavLink to="/timeline" className={linkClass}>
              <Calendar className="w-4 h-4" /> <span className="hidden sm:inline">Timeline</span>
            </NavLink>
            <NavLink to="/stats" className={linkClass}>
              <BarChart3 className="w-4 h-4" /> <span className="hidden sm:inline">Stats</span>
            </NavLink>
          </div>
        </div>
      </div>
    </nav>
  );
}