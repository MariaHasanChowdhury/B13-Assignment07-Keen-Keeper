import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AppContext } from '../context/AppContext';
import { UserPlus, AlertCircle, Clock, CheckCircle2, Users } from 'lucide-react';

export default function Home() {
  const { friends, loading } = useContext(AppContext);

  // স্ট্যাটাস অনুসারে কালার স্কিম ম্যাপিং
  const statusStyles = {
    'on-track': { bg: 'bg-emerald-50 text-emerald-700 border-emerald-200', dot: 'bg-emerald-500' },
    'almost-due': { bg: 'bg-amber-50 text-amber-700 border-amber-200', dot: 'bg-amber-500' },
    'overdue': { bg: 'bg-rose-50 text-rose-700 border-rose-200', dot: 'bg-rose-500' }
  };

  // সামারি ডাটা ক্যালকুলেশন
  const totalFriends = friends.length;
  const overdueCount = friends.filter(f => f.status === 'overdue').length;
  const almostDueCount = friends.filter(f => f.status === 'almost-due').length;
  const onTrackCount = friends.filter(f => f.status === 'on-track').length;

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] gap-3">
        <div className="w-12 h-12 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin"></div>
        <p className="text-gray-500 font-medium">Fetching your best friends list...</p>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12">
      {/* Banner Section */}
      <div className="text-center space-y-4 max-w-2xl mx-auto py-6">
        <h1 className="text-4xl sm:text-5xl font-black text-gray-900 tracking-tight">
          Keep Your Friendships <span className="text-indigo-600">Alive & Thriving</span>
        </h1>
        <p className="text-gray-500 text-lg">
          Track interactions, get smart check-in reminders, and never lose touch with the people who matter most.
        </p>
        <button className="inline-flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold px-6 py-3 rounded-xl shadow-lg shadow-indigo-100 transition-all transform hover:-translate-y-0.5">
          <UserPlus className="w-5 h-5" />
          <span>Add a Friend</span>
        </button>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm flex items-center gap-4">
          <div className="p-3 bg-indigo-50 rounded-xl text-indigo-600"><Users className="w-6 h-6"/></div>
          <div><p className="text-2xl font-bold text-gray-900">{totalFriends}</p><p className="text-xs font-medium text-gray-400 uppercase tracking-wider">Total Friends</p></div>
        </div>
        <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm flex items-center gap-4">
          <div className="p-3 bg-rose-50 rounded-xl text-rose-600"><AlertCircle className="w-6 h-6"/></div>
          <div><p className="text-2xl font-bold text-gray-900">{overdueCount}</p><p className="text-xs font-medium text-gray-400 uppercase tracking-wider">Overdue</p></div>
        </div>
        <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm flex items-center gap-4">
          <div className="p-3 bg-amber-50 rounded-xl text-amber-500"><Clock className="w-6 h-6"/></div>
          <div><p className="text-2xl font-bold text-gray-900">{almostDueCount}</p><p className="text-xs font-medium text-gray-400 uppercase tracking-wider">Almost Due</p></div>
        </div>
        <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm flex items-center gap-4">
          <div className="p-3 bg-emerald-50 rounded-xl text-emerald-600"><CheckCircle2 className="w-6 h-6"/></div>
          <div><p className="text-2xl font-bold text-gray-900">{onTrackCount}</p><p className="text-xs font-medium text-gray-400 uppercase tracking-wider">On Track</p></div>
        </div>
      </div>

      {/* Friends Grid Section */}
      <div className="space-y-6">
        <h2 className="text-2xl font-bold text-gray-900">Your Circle</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {friends.map(friend => {
            const styles = statusStyles[friend.status] || statusStyles['on-track'];
            return (
              <Link 
                key={friend.id} 
                to={`/friend/${friend.id}`} 
                className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden hover:shadow-md transition-all group flex flex-col"
              >
                <div className="p-5 flex-1 flex flex-col items-center text-center">
                  <img 
                    src={friend.picture} 
                    alt={friend.name} 
                    className="w-24 h-24 rounded-full object-cover ring-4 ring-gray-50 group-hover:scale-105 transition-transform" 
                  />
                  <h3 className="font-bold text-lg text-gray-900 mt-4 group-hover:text-indigo-600 transition-colors">
                    {friend.name}
                  </h3>
                  <p className="text-sm text-gray-400 mt-1">
                    {friend.days_since_contact === 0 ? 'Contacted today' : `${friend.days_since_contact} days since contact`}
                  </p>

                  {/* Status Badge */}
                  <span className={`inline-flex items-center gap-1.5 px-3 py-1 mt-4 rounded-full text-xs font-bold uppercase tracking-wider border ${styles.bg}`}>
                    <span className={`w-2 h-2 rounded-full ${styles.dot}`}></span>
                    {friend.status.replace('-', ' ')}
                  </span>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-1.5 justify-center mt-4">
                    {friend.tags.map((tag, idx) => (
                      <span key={idx} className="bg-gray-100 text-gray-600 px-2 py-0.5 rounded-md text-xs font-medium">
                        #{tag}
                      </span>
                    ))}
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}