import React, { useContext } from 'react';
import { useParams, Link } from 'react-router-dom';
import { AppContext } from '../context/AppContext';
import { Mail, ShieldAlert, Archive, Trash2, Edit2, Phone, MessageSquare, Video, ArrowLeft } from 'lucide-react';

const FriendDetails = () => {
  const { id } = useParams();
  const { friends, addTimelineEntry } = useContext(AppContext);
  
  const friend = friends.find(f => f.id === parseInt(id));

  if (!friend) {
    return (
      <div className="text-center py-16">
        <h2 className="text-2xl font-bold text-gray-800">Friend not found!</h2>
        <Link to="/" className="text-indigo-600 hover:underline inline-flex items-center gap-2 mt-4"><ArrowLeft size={16}/> Go Back Home</Link>
      </div>
    );
  }

  const getStatusColor = (status) => {
    switch (status) {
      case 'overdue': return 'bg-red-100 text-red-800';
      case 'almost due': return 'bg-amber-100 text-amber-800';
      case 'on-track': return 'bg-emerald-100 text-emerald-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 space-y-6">
      <Link to="/" className="inline-flex items-center gap-2 text-gray-500 hover:text-indigo-600 font-medium transition-colors">
        <ArrowLeft size={18} /> Back to Dashboard
      </Link>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column — Friend Info Card */}
        <div className="bg-white rounded-3xl border border-gray-100 p-6 shadow-sm space-y-6 h-fit">
          <div className="text-center space-y-3">
            <img src={friend.picture} alt={friend.name} className="w-32 h-32 rounded-full mx-auto object-cover border-4 border-indigo-50 shadow-inner" />
            <div>
              <h2 className="text-2xl font-bold text-gray-900">{friend.name}</h2>
              <span className={`inline-block mt-1 px-3 py-0.5 rounded-full text-xs font-semibold uppercase tracking-wider ${getStatusColor(friend.status)}`}>
                {friend.status}
              </span>
            </div>
          </div>

          <div className="flex flex-wrap gap-1.5 justify-center">
            {friend.tags.map((tag, idx) => (
              <span key={idx} className="bg-gray-50 border border-gray-200 text-gray-600 text-xs px-2.5 py-1 rounded-md font-medium">{tag}</span>
            ))}
          </div>

          <hr className="border-gray-100" />

          <div className="space-y-4">
            <div>
              <label className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Bio</label>
              <p className="text-gray-600 text-sm leading-relaxed mt-1">{friend.bio}</p>
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <Mail size={16} className="text-gray-400" />
              <span>{friend.email}</span>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-2 pt-2">
            <button className="flex flex-col items-center gap-1 p-2 border border-gray-200 rounded-xl text-gray-600 hover:bg-gray-50 transition-colors text-xs font-medium">
              <ShieldAlert size={16} /> Snooze
            </button>
            <button className="flex flex-col items-center gap-1 p-2 border border-gray-200 rounded-xl text-gray-600 hover:bg-gray-50 transition-colors text-xs font-medium">
              <Archive size={16} /> Archive
            </button>
            <button className="flex flex-col items-center gap-1 p-2 border border-red-100 text-red-600 hover:bg-red-50 transition-colors text-xs font-medium">
              <Trash2 size={16} /> Delete
            </button>
          </div>
        </div>

        {/* Right Column — Interaction Dashboard */}
        <div className="lg:col-span-2 space-y-6">
          {/* Section 1: Stats Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="bg-white border border-gray-100 p-5 rounded-2xl shadow-sm">
              <span className="text-xs font-semibold text-gray-400 uppercase">Days Since Contact</span>
              <p className="text-3xl font-extrabold text-indigo-600 mt-2">{friend.days_since_contact} Days</p>
            </div>
            <div className="bg-white border border-gray-100 p-5 rounded-2xl shadow-sm">
              <span className="text-xs font-semibold text-gray-400 uppercase">Goal Threshold</span>
              <p className="text-3xl font-extrabold text-gray-800 mt-2">{friend.goal} Days</p>
            </div>
            <div className="bg-white border border-gray-100 p-5 rounded-2xl shadow-sm">
              <span className="text-xs font-semibold text-gray-400 uppercase">Next Due Date</span>
              <p className="text-lg font-bold text-gray-800 mt-3">{friend.next_due_date}</p>
            </div>
          </div>

          {/* Section 2: Relationship Goal Card */}
          <div className="bg-white border border-gray-100 p-5 rounded-2xl shadow-sm flex justify-between items-center">
            <div>
              <h3 className="font-bold text-gray-900 text-lg">Relationship Goal</h3>
              <p className="text-sm text-gray-500 mt-0.5">Keep in touch at least once every {friend.goal} days.</p>
            </div>
            <button className="inline-flex items-center gap-2 border border-gray-200 hover:bg-gray-50 px-4 py-2 rounded-xl text-sm font-medium transition-colors">
              <Edit2 size={14} /> Edit
            </button>
          </div>

          {/* Section 3: Quick Check-In Card */}
          <div className="bg-white border border-gray-100 p-6 rounded-2xl shadow-sm space-y-4">
            <h3 className="font-bold text-gray-900 text-lg">Quick Check-In</h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <button 
                onClick={() => addTimelineEntry(friend.name, friend.id, 'Call')}
                className="flex items-center justify-center gap-2 bg-indigo-600 text-white p-3 rounded-xl font-medium hover:bg-indigo-700 transition-colors"
              >
                <Phone size={18} /> Call
              </button>
              <button 
                onClick={() => addTimelineEntry(friend.name, friend.id, 'Text')}
                className="flex items-center justify-center gap-2 bg-sky-500 text-white p-3 rounded-xl font-medium hover:bg-sky-600 transition-colors"
              >
                <MessageSquare size={18} /> Text
              </button>
              <button 
                onClick={() => addTimelineEntry(friend.name, friend.id, 'Video')}
                className="flex items-center justify-center gap-2 bg-emerald-600 text-white p-3 rounded-xl font-medium hover:bg-emerald-700 transition-colors"
              >
                <Video size={18} /> Video
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FriendDetails;