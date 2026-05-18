import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AppContext } from '../context/AppContext';
import { UserPlus, Clock, CheckCircle2, AlertCircle, Users } from 'lucide-react';

const Home = () => {
  const { friends, loading } = useContext(AppContext);

  // Calculate dynamic stats for dashboard cards
  const totalFriends = friends.length;
  const overdue = friends.filter(f => f.status === 'overdue').length;
  const almostDue = friends.filter(f => f.status === 'almost due').length;
  const onTrack = friends.filter(f => f.status === 'on-track').length;

  const getStatusStyles = (status) => {
    switch (status) {
      case 'overdue': return 'bg-red-50 text-red-700 border-red-200';
      case 'almost due': return 'bg-amber-50 text-amber-700 border-amber-200';
      case 'on-track': return 'bg-emerald-50 text-emerald-700 border-emerald-200';
      default: return 'bg-gray-50 text-gray-700 border-gray-200';
    }
  };

  const getBadgeStyles = (status) => {
    switch (status) {
      case 'overdue': return 'bg-red-500 text-white';
      case 'almost due': return 'bg-amber-500 text-white';
      case 'on-track': return 'bg-emerald-500 text-white';
      default: return 'bg-gray-500 text-white';
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-96">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  return (
    <div className="space-y-12 py-8">
      {/* Banner */}
      <section className="text-center max-w-3xl mx-auto space-y-6 px-4">
        <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-900 tracking-tight">
          Keep Your Friendships Alive & Close
        </h1>
        <p className="text-lg text-gray-500">
          In the hustle of life, don't let beautiful connections fade away. Track your interactions, set reach-out goals, and nurture your inner circle.
        </p>
        <button className="inline-flex items-center gap-2 bg-indigo-600 text-white px-6 py-3 rounded-xl font-medium hover:bg-indigo-700 shadow-lg shadow-indigo-100 transition-all transform hover:-translate-y-0.5">
          <UserPlus size={20} />
          Add a Friend
        </button>
      </section>

      {/* Summary Cards */}
      <section className="grid grid-cols-2 lg:grid-cols-4 gap-4 px-4 max-w-7xl mx-auto">
        <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm flex items-center gap-4">
          <div className="p-3 bg-indigo-50 rounded-xl text-indigo-600"><Users size={24} /></div>
          <div><p className="text-sm text-gray-400 font-medium">Total Network</p><p className="text-2xl font-bold text-gray-900">{totalFriends}</p></div>
        </div>
        <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm flex items-center gap-4">
          <div className="p-3 bg-emerald-50 rounded-xl text-emerald-600"><CheckCircle2 size={24} /></div>
          <div><p className="text-sm text-gray-400 font-medium">On-Track</p><p className="text-2xl font-bold text-gray-900">{onTrack}</p></div>
        </div>
        <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm flex items-center gap-4">
          <div className="p-3 bg-amber-50 rounded-xl text-amber-500"><Clock size={24} /></div>
          <div><p className="text-sm text-gray-400 font-medium">Almost Due</p><p className="text-2xl font-bold text-gray-900">{almostDue}</p></div>
        </div>
        <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm flex items-center gap-4">
          <div className="p-3 bg-red-50 rounded-xl text-red-500"><AlertCircle size={24} /></div>
          <div><p className="text-sm text-gray-400 font-medium">Overdue</p><p className="text-2xl font-bold text-gray-900">{overdue}</p></div>
        </div>
      </section>

      {/* Friends Grid */}
      <section className="max-w-7xl mx-auto px-4">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Your Friends</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {friends.map((friend) => (
            <Link 
              to={`/friend/${friend.id}`} 
              key={friend.id} 
              className={`group bg-white rounded-2xl border p-5 transition-all shadow-sm hover:shadow-md flex flex-col justify-between ${getStatusStyles(friend.status)}`}
            >
              <div>
                <div className="relative mb-4">
                  <img 
                    src={friend.picture} 
                    alt={friend.name} 
                    className="w-full h-48 object-cover rounded-xl group-hover:scale-[1.02] transition-transform duration-300"
                  />
                  <span className={`absolute top-3 right-3 text-xs font-semibold px-2.5 py-1 rounded-full uppercase tracking-wider shadow ${getBadgeStyles(friend.status)}`}>
                    {friend.status}
                  </span>
                </div>

                <h3 className="text-xl font-bold text-gray-900 mb-1 group-hover:text-indigo-600 transition-colors">{friend.name}</h3>
                <p className="text-sm text-gray-500 mb-3 font-medium">Last Contact: {friend.days_since_contact} days ago</p>
              </div>

              <div className="flex flex-wrap gap-1.5 mt-2">
                {friend.tags.map((tag, idx) => (
                  <span key={idx} className="bg-white/70 backdrop-blur-sm border border-gray-200/60 text-gray-600 text-xs px-2.5 py-0.5 rounded-md font-medium">
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