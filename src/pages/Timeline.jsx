import React, { useContext, useState } from 'react';
import { AppContext } from '../context/AppContext';
import { Phone, MessageSquare, Video, Calendar } from 'lucide-react';

const Timeline = () => {
  const { timeline } = useContext(AppContext);
  const [filter, setFilter] = useState('All');

  const filteredTimeline = filter === 'All' 
    ? timeline 
    : timeline.filter(item => item.type === filter);

  const getIcon = (type) => {
    switch (type) {
      case 'Call': return <Phone size={18} className="text-indigo-600" />;
      case 'Text': return <MessageSquare size={18} className="text-sky-500" />;
      case 'Video': return <Video size={18} className="text-emerald-600" />;
      default: return <Calendar size={18} className="text-gray-600" />;
    }
  };

  const getIconBg = (type) => {
    switch (type) {
      case 'Call': return 'bg-indigo-50 border-indigo-200';
      case 'Text': return 'bg-sky-50 border-sky-200';
      case 'Video': return 'bg-emerald-50 border-emerald-200';
      default: return 'bg-gray-50 border-gray-200';
    }
  };

  return (
    <div className="max-w-3xl mx-auto px-4 py-8 space-y-6">
      <div className="sm:flex sm:justify-between sm:items-center border-b border-gray-100 pb-4">
        <h2 className="text-3xl font-extrabold text-gray-900 tracking-tight">Timeline</h2>
        
        {/* Challenge Filter Options */}
        <div className="flex gap-1 bg-gray-100 p-1 rounded-xl mt-4 sm:mt-0">
          {['All', 'Call', 'Text', 'Video'].map((type) => (
            <button
              key={type}
              onClick={() => setFilter(type)}
              className={`px-4 py-1.5 rounded-lg text-sm font-medium transition-all ${
                filter === type ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-500 hover:text-gray-900'
              }`}
            >
              {type}
            </button>
          ))}
        </div>
      </div>

      {/* Timeline Tree List */}
      <div className="relative border-l-2 border-gray-200 ml-4 pl-6 space-y-6">
        {filteredTimeline.length === 0 ? (
          <p className="text-gray-500 text-center py-8">No interactions logged for this type.</p>
        ) : (
          filteredTimeline.map((item) => (
            <div key={item.id} className="relative group">
              {/* Timeline Icon Node */}
              <div className={`absolute -left-[35px] top-0.5 p-2 rounded-xl border-2 bg-white transition-transform group-hover:scale-110 ${getIconBg(item.type)}`}>
                {getIcon(item.type)}
              </div>
              
              {/* Content Box */}
              <div className="bg-white border border-gray-100 p-4 rounded-2xl shadow-sm group-hover:border-gray-200 transition-all">
                <span className="text-xs font-semibold text-gray-400">{item.date}</span>
                <h4 className="font-bold text-gray-800 text-base mt-0.5">{item.title}</h4>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Timeline;