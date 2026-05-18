//banner & friends grid
import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AppContext } from '../context/AppContext';
import { UserPlus, Clock, CheckCircle2, AlertCircle, Users, ArrowRight } from 'lucide-react';

const Home = () => {
  const { friends, loading } = useContext(AppContext);

  const totalFriends = friends.length;
  const overdue = friends.filter(f => f.status === 'overdue').length;
  const almostDue = friends.filter(f => f.status === 'almost-due').length;
  const onTrack = friends.filter(f => f.status === 'on-track').length;

  // Figma Exact Color Palettes
  const getStatusCardStyles = (status) => {
    switch (status) {
      case 'overdue': return 'border-l-4 border-l-red-500 bg-white shadow-sm hover:shadow-md';
      case 'almost-due': return 'border-l-4 border-l-amber-500 bg-white shadow-sm hover:shadow-md';
      case 'on-track': return 'border-l-4 border-l-emerald-500 bg-white shadow-sm hover:shadow-md';
      default: return 'border-gray-200 bg-white';
    }
  };

  const getBadgeStyles = (status) => {
    switch (status) {
      case 'overdue': return 'bg-red-100 text-red-700 ring-1 ring-red-600/10';
      case 'almost-due': return 'bg-amber-100 text-amber-700 ring-1 ring-amber-600/10';
      case 'on-track': return 'bg-emerald-100 text-emerald-700 ring-1 ring-emerald-600/10';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  if (loading) {
    return (
      <div className="flex flex-col justify-center items-center h-96 space-y-4">
        <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-b-4 border-indigo-600"></div>
        <p className="text-gray-500 font-medium animate-pulse">Loading Friends Data...</p>
      </div>
    );
  }

  return (
    <div className="space-y-12 py-10 bg-slate-50/50 min-h-screen">
      {/* Banner - Centered Title & Subtitle */}
      <section className="text-center max-w-2xl mx-auto space-y-5 px-4">
        <h1 className="text-4xl sm:text-5xl font-black text-slate-900 tracking-tight leading-none">
          Keep Your Friendships Alive
        </h1>
        <p className="text-base sm:text-lg text-slate-500 max-w-lg mx-auto font-medium leading-relaxed">
          Track interactions, set personal goals, and never lose touch with the people who matter most.
        </p>
        <button className="inline-flex items-center gap-2 bg-indigo-600 text-white px-5 py-3 rounded-xl font-semibold hover:bg-indigo-700 shadow-lg shadow-indigo-200 transition-all transform hover:-translate-y-0.5 active:translate-y-0">
          <UserPlus size={18} />
          Add a Friend
        </button>
      </section>

      {/* 4 Summary Cards Below the Banner */}
      <section className="grid grid-cols-2 lg:grid-cols-4 gap-4 px-4 max-w-7xl mx-auto">
        <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm flex items-center gap-4">
          <div className="p-3 bg-indigo-50 rounded-xl text-indigo-600"><Users size={22} /></div>
          <div><p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Total Network</p><p className="text-2xl font-extrabold text-slate-800">{totalFriends}</p></div>
        </div>
        <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm flex items-center gap-4">
          <div className="p-3 bg-emerald-50 rounded-xl text-emerald-600"><CheckCircle2 size={22} /></div>
          <div><p className="text-xs font-bold text-slate-400 uppercase tracking-wider">On-Track</p><p className="text-2xl font-extrabold text-slate-800">{onTrack}</p></div>
        </div>
        <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm flex items-center gap-4">
          <div className="p-3 bg-amber-50 rounded-xl text-amber-500"><Clock size={22} /></div>
          <div><p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Almost Due</p><p className="text-2xl font-extrabold text-slate-800">{almostDue}</p></div>
        </div>
        <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm flex items-center gap-4">
          <div className="p-3 bg-red-50 rounded-xl text-red-500"><AlertCircle size={22} /></div>
          <div><p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Overdue</p><p className="text-2xl font-extrabold text-slate-800">{overdue}</p></div>
        </div>
      </section>

      {/* Your Friends Section (4-column grid layout on large screens) */}
      <section className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-slate-900">Your Friends</h2>
          <span className="text-sm font-semibold text-indigo-600 bg-indigo-50 px-3 py-1 rounded-full">Active Circles</span>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {friends.map((friend) => (
            <Link 
              to={`/friend/${friend.id}`} 
              key={friend.id} 
              className={`group rounded-2xl border border-slate-150 p-4 transition-all duration-300 flex flex-col justify-between ${getStatusCardStyles(friend.status)}`}
            >
              <div>
                {/* Image Wrapper */}
                <div className="relative mb-4 overflow-hidden rounded-xl bg-slate-100">
                  <img 
                    src={friend.picture} 
                    alt={friend.name} 
                    className="w-full h-44 object-cover rounded-xl group-hover:scale-105 transition-transform duration-500"
                    onError={(e) => { e.target.src = 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=400'; }}
                  />
                  {/* Status Badge */}
                  <span className={`absolute top-2.5 right-2.5 text-[11px] font-bold px-2.5 py-0.5 rounded-full uppercase tracking-wider shadow-sm ${getBadgeStyles(friend.status)}`}>
                    {friend.status.replace('-', ' ')}
                  </span>
                </div>

                <h3 className="text-lg font-bold text-slate-800 tracking-tight group-hover:text-indigo-600 transition-colors">{friend.name}</h3>
                <p className="text-xs font-medium text-slate-400 mt-0.5">Last Contact: <span className="text-slate-700 font-bold">{friend.days_since_contact} days ago</span></p>
              </div>

              {/* Tags Field */}
              <div className="flex flex-wrap gap-1 mt-4 pt-3 border-t border-slate-50">
                {friend.tags.map((tag, idx) => (
                  <span key={idx} className="bg-slate-100 border border-slate-200/40 text-slate-600 text-[10px] px-2 py-0.5 rounded-md font-bold tracking-wide">
                    {tag}
                  </span>
                ))}
              </div>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Home;