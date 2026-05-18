import React, { useContext, useState } from 'react';
import { AppContext } from '../context/AppContext';
import { Phone, MessageSquare, Video, Filter } from 'lucide-react';

export default function TimelinePage() {
  const { timeline } = useContext(AppContext);
  const [filterType, setFilterType] = useState('All');

  const filteredTimeline = filterType === 'All' 
    ? timeline 
    : timeline.filter(item => item.type === filterType);

  const icons = {
    'Call': <Phone className="w-4 h-4 text-indigo-600" />,
    'Text': <MessageSquare className="w-4 h-4 text-sky-500" />,
    'Video': <Video className="w-4 h-4 text-emerald-600" />
  };

  const badgeStyles = {
    'Call': 'bg-indigo-50 border-indigo-100 text-indigo-700',
    'Text': 'bg-sky-50 border-sky-100 text-sky-700',
    'Video': 'bg-emerald-50 border-emerald-100 text-emerald-700'
  };

  return (
    <div className="max-w-3xl mx-auto px-4 py-10 space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-gray-100 pb-4">
        <div>
          <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">Timeline</h1>
          <p className="text-sm text-gray-400 mt-1">History of all interactions logged with your circle.</p>
        </div>
        
        {/* Challenge Requirement: Timeline Filter */}
        <div className="flex items-center gap-2">
          <Filter className="w-4 h-4 text-gray-400" />
          <select 
            value={filterType} 
            onChange={(e) => setFilterType(e.target.value)}
            className="bg-white border border-gray-200 text-gray-700 rounded-xl px-3 py-1.5 font-medium text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 cursor-pointer shadow-sm"
          >
            <option value="All">All Interactions</option>
            <option value="Call">Calls Only</option>
            <option value="Text">Texts Only</option>
            <option value="Video">Video Calls Only</option>
          </select>
        </div>
      </div>

      {/* History Loop */}
      {filteredTimeline.length === 0 ? (
        <div className="text-center py-20 bg-white border border-gray-100 rounded-2xl shadow-sm">
          <p className="text-gray-400 font-medium">No matching timeline records found.</p>
        </div>
      ) : (
        <div className="relative border-l-2 border-gray-100 ml-4 pl-6 space-y-6">
          {filteredTimeline.map(entry => (
            <div key={entry.id} className="relative group">
              {/* Timeline Bullet Bullet */}
              <div className="absolute -left-[35px] mt-0.5 bg-white border-2 border-gray-200 rounded-full p-1.5 group-hover:border-indigo-500 transition-colors shadow-sm">
                {icons[entry.type]}
              </div>
              
              {/* Content Panel */}
              <div className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 group-hover:shadow-md transition-shadow">
                <div>
                  <h4 className="font-bold text-gray-800 text-base">{entry.title}</h4>
                  <div className="flex items-center gap-2 mt-1">
                    <span className={`text-[10px] font-bold px-2 py-0.5 uppercase tracking-wider rounded border ${badgeStyles[entry.type]}`}>
                      {entry.type}
                    </span>
                  </div>
                </div>
                <div className="text-xs font-semibold text-gray-400">{entry.date}</div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}