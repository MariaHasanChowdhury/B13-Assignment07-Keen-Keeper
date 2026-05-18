import React, { useContext } from 'react';
import { useParams, Link } from 'react-router-dom';
import { AppContext } from '../context/AppContext';
import { Phone, MessageSquare, Video, Snooze, Archive, Trash2, Calendar, Target, Clock, ArrowLeft, Mail } from 'lucide-react';

export default function FriendDetails() {
  const { id } = useParams();
  const { friends, timeline, addTimelineEntry } = useContext(AppContext);
  
  const friend = friends.find(f => f.id === parseInt(id));

  if (!friend) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-20 text-center">
        <h2 className="text-2xl font-bold text-gray-900">Friend profile not found!</h2>
        <Link to="/" className="text-indigo-600 font-medium inline-flex items-center gap-1 mt-4 hover:underline">
          <ArrowLeft className="w-4 h-4"/> Back to home
        </Link>
      </div>
    );
  }

  const statusStyles = {
    'on-track': 'bg-emerald-50 text-emerald-700 border-emerald-200',
    'almost-due': 'bg-amber-50 text-amber-700 border-amber-200',
    'overdue': 'bg-rose-50 text-rose-700 border-rose-200'
  };

  // নির্দিষ্ট ফ্রেন্ডের ফিল্টার্ড ইন্টারঅ্যাকশন হিস্ট্রি 
  const friendTimeline = timeline.filter(t => t.friendId === friend.id);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <Link to="/" className="inline-flex items-center gap-1 text-sm font-semibold text-gray-500 hover:text-indigo-600 mb-6 transition-colors">
        <ArrowLeft className="w-4 h-4" /> Back to Dashboard
      </Link>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
        {/* Left Column — Friend Info Card */}
        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex flex-col items-center text-center space-y-5">
          <img src={friend.picture} alt={friend.name} className="w-32 h-32 rounded-full object-cover ring-4 ring-indigo-50" />
          
          <div>
            <h2 className="text-2xl font-bold text-gray-900">{friend.name}</h2>
            <div className="flex items-center justify-center gap-1.5 text-sm text-gray-500 mt-1">
              <Mail className="w-4 h-4" /> <span>{friend.email}</span>
            </div>
          </div>

          <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider border ${statusStyles[friend.status]}`}>
            {friend.status.replace('-', ' ')}
          </span>

          <p className="text-gray-500 text-sm bg-gray-50 p-4 rounded-xl italic">"{friend.bio}"</p>

          <div className="flex flex-wrap gap-1.5 justify-center">
            {friend.tags.map((tag, idx) => (
              <span key={idx} className="bg-indigo-50 text-indigo-600 px-2.5 py-1 rounded-md text-xs font-medium">#{tag}</span>
            ))}
          </div>

          {/* Action Buttons */}
          <div className="w-full pt-4 border-t border-gray-100 grid grid-cols-3 gap-2">
            <button className="flex flex-col items-center justify-center p-2.5 bg-gray-50 hover:bg-indigo-50 hover:text-indigo-600 rounded-xl text-gray-600 transition-colors">
              <Snooze className="w-5 h-5 mb-1" /> <span className="text-xs font-semibold">Snooze</span>
            </button>
            <button className="flex flex-col items-center justify-center p-2.5 bg-gray-50 hover:bg-amber-50 hover:text-amber-600 rounded-xl text-gray-600 transition-colors">
              <Archive className="w-5 h-5 mb-1" /> <span className="text-xs font-semibold">Archive</span>
            </button>
            <button className="flex flex-col items-center justify-center p-2.5 bg-gray-50 hover:bg-rose-50 hover:text-rose-600 rounded-xl text-gray-600 transition-colors">
              <Trash2 className="w-5 h-5 mb-1" /> <span className="text-xs font-semibold">Delete</span>
            </button>
          </div>
        </div>

        {/* Right Column — Stats & Interactions */}
        <div className="lg:col-span-2 space-y-6">
          {/* ① Stats Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm flex items-center gap-4">
              <div className="p-3 bg-blue-50 text-blue-600 rounded-xl"><Clock className="w-5 h-5"/></div>
              <div><p className="text-sm font-medium text-gray-400">Last Contact</p><p className="text-lg font-bold text-gray-900">{friend.days_since_contact} Days Ago</p></div>
            </div>
            <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm flex items-center gap-4">
              <div className="p-3 bg-purple-50 text-purple-600 rounded-xl"><Target className="w-5 h-5"/></div>
              <div><p className="text-sm font-medium text-gray-400">Goal Interval</p><p className="text-lg font-bold text-gray-900">Every {friend.goal} Days</p></div>
            </div>
            <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm flex items-center gap-4">
              <div className="p-3 bg-orange-50 text-orange-600 rounded-xl"><Calendar className="w-5 h-5"/></div>
              <div><p className="text-sm font-medium text-gray-400">Next Due Date</p><p className="text-lg font-bold text-gray-900">{friend.next_due_date}</p></div>
            </div>
          </div>

          {/* ② Relationship Goal Card */}
          <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm flex justify-between items-center">
            <div>
              <h4 className="font-bold text-gray-900">Current Contact Frequency</h4>
              <p className="text-sm text-gray-500 mt-0.5">You target to catch up once every {friend.goal} days.</p>
            </div>
            <button className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-xl text-sm font-semibold transition-colors">Edit</button>
          </div>

          {/* ③ Quick Check-In Card */}
          <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm space-y-4">
            <h4 className="font-bold text-gray-900">Quick Check-In Log</h4>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <button 
                onClick={() => addTimelineEntry(friend.id, friend.name, 'Call')}
                className="flex items-center justify-center gap-2 py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl font-semibold transition-all shadow-md shadow-indigo-100"
              >
                <Phone className="w-4 h-4" /> Call
              </button>
              <button 
                onClick={() => addTimelineEntry(friend.id, friend.name, 'Text')}
                className="flex items-center justify-center gap-2 py-3 bg-sky-500 hover:bg-sky-600 text-white rounded-xl font-semibold transition-all shadow-md shadow-sky-100"
              >
                <MessageSquare className="w-4 h-4" /> Text
              </button>
              <button 
                onClick={() => addTimelineEntry(friend.id, friend.name, 'Video')}
                className="flex items-center justify-center gap-2 py-3 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl font-semibold transition-all shadow-md shadow-emerald-100"
              >
                <Video className="w-4 h-4" /> Video Call
              </button>
            </div>
          </div>

          {/* Personal Recent Timeline */}
          <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm space-y-4">
            <h4 className="font-bold text-gray-900">Recent History with {friend.name}</h4>
            {friendTimeline.length === 0 ? (
              <p className="text-sm text-gray-400 italic">No recent log entry found.</p>
            ) : (
              <div className="space-y-3">
                {friendTimeline.map(log => (
                  <div key={log.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-xl border border-gray-100">
                    <div className="flex items-center gap-3">
                      <span className="p-2 bg-white rounded-lg text-indigo-600 shadow-sm">
                        {log.type === 'Call' && <Phone className="w-4 h-4"/>}
                        {log.type === 'Text' && <MessageSquare className="w-4 h-4"/>}
                        {log.type === 'Video' && <Video className="w-4 h-4"/>}
                      </span>
                      <p className="font-medium text-sm text-gray-800">{log.title}</p>
                    </div>
                    <span className="text-xs text-gray-400 font-medium">{log.date}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}