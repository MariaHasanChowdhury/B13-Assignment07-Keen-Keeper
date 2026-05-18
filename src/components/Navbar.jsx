import React from 'react';
import { NavLink } from 'react-router-dom';
import { Home, Calendar, PieChart, Users } from 'lucide-react';

const Navbar = () => {
  const linkClass = ({ isActive }) =>
    `flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-colors ${
      isActive
        ? 'bg-indigo-600 text-white shadow-md'
        : 'text-gray-600 hover:bg-gray-100'
    }`;

  return (
    <nav className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <div className="p-2 bg-indigo-600 rounded-lg text-white">
              <Users size={24} />
            </div>
            <span className="text-xl font-bold text-gray-900 tracking-tight">KeenKeeper</span>
          </div>

          {/* Nav Links */}
          <div className="flex gap-2">
            <NavLink to="/" end className={linkClass}>
              <Home size={18} />
              <span className="hidden sm:inline">Home</span>
            </NavLink>
            <NavLink to="/timeline" className={linkClass}>
              <Calendar size={18} />
              <span className="hidden sm:inline">Timeline</span>
            </NavLink>
            <NavLink to="/stats" className={linkClass}>
              <PieChart size={18} />
              <span className="hidden sm:inline">Stats</span>
            </NavLink>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;