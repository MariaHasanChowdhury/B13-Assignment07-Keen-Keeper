import React, { useContext } from 'react';
import { useParams, Link } from 'react-router-dom';
import { AppContext } from '../context/AppContext';
import { Mail, Clock, ShieldAlert, Archive, Trash2, Edit2, Phone, MessageSquare, Video, ArrowLeft, Calendar, Compass } from 'lucide-react';

const FriendDetails = () => {
  const { id } = useParams();
  const { friends, addTimelineEntry } = useContext(AppContext);
  
  const friend = friends.find(f => f.id === parseInt(id));

  if (!friend) {
    return (
      <div className="text-center py-20 bg-slate-50 min-h-screen flex flex-col justify-center items-center">
        <h2 className="text-2xl font-black text-slate-800">Friend Profile Not Found</h2>
        <Link to="/" className="text-indigo-600 font-semibold hover:underline inline-flex items-center gap-2 mt-4"><ArrowLeft size={16}/> Back to Dashboard</Link>
      </div>
    );
  }

  const getStatusBadge = (status) => {
    switch (status) {
      case 'overdue': return 'bg-red-100 text-red-700 ring-1 ring-red-600/10';
      case 'almost-due': return 'bg-amber-100 text-amber-700 ring-1 ring-amber-600/10';
      case 'on-track': return 'bg-emerald-100 text-emerald-700 ring-1 ring-emerald-600/10';
      default: return 'bg-slate-100 text-slate-700';
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 space-y-6 bg-slate-50/30 min-h-screen">
      <Link to="/" className="inline-flex items-center gap-1.5 text-sm text-slate-500 hover:text-indigo-600 font-bold transition-colors">
        <ArrowLeft size={16} /> Back to Dashboard
      </Link>

      {/* Two-Column Layout (Figma UI Design Specs) */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left Column — Friend Info Card */}
        <div className="bg-white rounded-2xl border border-slate-150 p-6 shadow-sm space-y-5 h-fit">
          <div className="text-center space-y-3">
            <img 
              src={friend.picture} 
              alt={friend.name} 
              className="w-28 h-28 rounded-full mx-auto object-cover ring-4 ring-slate-100 shadow-sm"
              onError={(e) => { e.target.src = 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=400'; }}
            />
            <div>
              <h2 className="text-xl font-black text-slate-800">{friend.name}</h2>
              <span className={`inline-block mt-1 px-2.5 py-0.5 rounded-full text-[10px] font-extrabold uppercase tracking-widest ${getStatusBadge(friend.status)}`}>
                {friend.status.replace('-', ' ')}
              </span>
            </div>
          </div>

          <div className="flex flex-wrap gap-1 justify-center">
            {friend.tags.map((tag, idx) => (
              <span key={idx} className="bg-slate-50 border border-slate-200 text-slate-600 text-[10px] px-2 py-0.5 rounded-md font-bold">{tag}</span>
            ))}
          </div>

          <div className="space-y-3 pt-2 text-sm">
            <div>
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Biography</span>
              <p className="text-slate-600 text-xs font-medium leading-relaxed mt-1">{friend.bio}</p>
            </div>
            <div className="flex items-center gap-2 text-xs font-semibold text-slate-500 pt-1">
              <Mail size={14} className="text-slate-400" />
              <span>{friend.email}</span>
            </div>
          </div>

          {/* 3 Action Buttons (Static Required Buttons) */}
          <div className="grid grid-cols-3 gap-1.5 pt-3 border-t border-slate-50">
            <button className="flex items-center justify-center gap-1 py-2 border border-slate-200 rounded-lg text-slate-600 hover:bg-slate-50 text-[11px] font-bold transition-all">
              <Clock size={12} /> Snooze
            </button>
            <button className="flex items-center justify-center gap-1 py-2 border border-slate-200 rounded-lg text-slate-600 hover:bg-slate-50 text-[11px] font-bold transition-all">
              <Archive size={12} /> Archive
            </button>
            <button className="flex items-center justify-center gap-1 py-2 border border-red-100 text-red-600 hover:bg-red-50 text-[11px] font-bold transition-all">
              <Trash2 size={12} /> Delete
            </button>
          </div>
        </div>

        {/* Right Column — 3 Dynamic Layout Rows */}
        <div className="lg:col-span-2 space-y-6">
          
          {/* ① Stats Cards (3 Columns) */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="bg-white border border-slate-150 p-4 rounded-xl shadow-sm">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Days Since Contact</span>
              <p className="text-2xl font-black text-indigo-600 mt-1">{friend.days_since_contact} Days</p>
            </div>
            <div className="bg-white border border-slate-150 p-4 rounded-xl shadow-sm">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Goal Threshold</span>
              <p className="text-2xl font-black text-slate-700 mt-1">{friend.goal} Days</p>
            </div>
            <div className="bg-white border border-slate-150 p-4 rounded-xl shadow-sm">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Next Due Date</span>
              <p className="text-base font-bold text-slate-700 mt-2 flex items-center gap-1.5"><Calendar size={14} className="text-slate-400"/> {friend.next_due_date}</p>
            </div>
          </div>

          {/* ② Relationship Goal Card */}
          <div className="bg-white border border-slate-150 p-5 rounded-xl shadow-sm flex justify-between items-center">
            <div>
              <h3 className="font-bold text-slate-800 text-sm">Relationship Goal</h3>
              <p className="text-xs text-slate-400 font-medium mt-0.5">Keep in touch at least once every {friend.goal} days.</p>
            </div>
            <button className="inline-flex items-center gap-1 border border-slate-200 hover:bg-slate-50 px-3 py-1.5 rounded-lg text-xs font-bold text-slate-700 transition-colors">
              <Edit2 size={12} /> Edit
            </button>
          </div>

          {/* ③ Quick Check-In Card (Functional Interaction Engine) */}
          <div className="bg-white border border-slate-150 p-5 rounded-xl shadow-sm space-y-3.5">
            <h3 className="font-bold text-slate-800 text-sm">Quick Check-In</h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <button 
                onClick={() => addTimelineEntry(friend.name, friend.id, 'Call')}
                className="flex items-center justify-center gap-2 bg-indigo-600 text-white p-2.5 rounded-xl text-xs font-bold hover:bg-indigo-700 shadow-md shadow-indigo-100 transition-all"
              >
                <Phone size={14} /> Call
              </button>
              <button 
                onClick={() => addTimelineEntry(friend.name, friend.id, 'Text')}
                className="flex items-center justify-center gap-2 bg-sky-500 text-white p-2.5 rounded-xl text-xs font-bold hover:bg-sky-600 shadow-md shadow-sky-100 transition-all"
              >
                <MessageSquare size={14} /> Text
              </button>
              <button 
                onClick={() => addTimelineEntry(friend.name, friend.id, 'Video')}
                className="flex items-center justify-center gap-2 bg-emerald-600 text-white p-2.5 rounded-xl text-xs font-bold hover:bg-emerald-700 shadow-md shadow-emerald-100 transition-all"
              >
                <Video size={14} /> Video
              </button>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default FriendDetails;