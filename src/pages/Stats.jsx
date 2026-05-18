import React, { useContext } from 'react';
import { AppContext } from '../context/AppContext';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';

const Stats = () => {
  const { timeline } = useContext(AppContext);

  // Group items count for Recharts data
  const callCount = timeline.filter(t => t.type === 'Call').length;
  const textCount = timeline.filter(t => t.type === 'Text').length;
  const videoCount = timeline.filter(t => t.type === 'Video').length;

  const data = [
    { name: 'Calls', value: callCount, color: '#4f46e5' },   // Indigo
    { name: 'Texts', value: textCount, color: '#0ea5e9' },   // Sky
    { name: 'Videos', value: videoCount, color: '#059669' }, // Emerald
  ];

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 space-y-6">
      <h2 className="text-3xl font-extrabold text-gray-900 tracking-tight border-b border-gray-100 pb-4">
        Friendship Analytics
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Chart Box */}
        <div className="md:col-span-2 bg-white border border-gray-100 p-6 rounded-3xl shadow-sm flex flex-col items-center">
          <h3 className="font-bold text-gray-800 mb-2 self-start">Interaction Distribution</h3>
          
          <div className="w-full h-72">
            {timeline.length === 0 ? (
              <div className="h-full flex items-center justify-center text-gray-400">No interaction data available.</div>
            ) : (
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={data}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={90}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {data.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value) => [`${value} times`, 'Count']} />
                  <Legend verticalAlign="bottom" height={36} />
                </PieChart>
              </ResponsiveContainer>
            )}
          </div>
        </div>

        {/* Breakdown Panel */}
        <div className="bg-white border border-gray-100 p-6 rounded-3xl shadow-sm flex flex-col justify-between">
          <h3 className="font-bold text-gray-800 mb-4">Activity Log Summary</h3>
          <div className="space-y-4 flex-1 flex flex-col justify-center">
            <div className="flex justify-between items-center p-3 rounded-xl bg-indigo-50/50">
              <span className="text-sm font-semibold text-indigo-700">Total Calls</span>
              <span className="text-xl font-bold text-indigo-900">{callCount}</span>
            </div>
            <div className="flex justify-between items-center p-3 rounded-xl bg-sky-50/50">
              <span className="text-sm font-semibold text-sky-700">Total Texts</span>
              <span className="text-xl font-bold text-sky-900">{textCount}</span>
            </div>
            <div className="flex justify-between items-center p-3 rounded-xl bg-emerald-50/50">
              <span className="text-sm font-semibold text-emerald-700">Total Videos</span>
              <span className="text-xl font-bold text-emerald-900">{videoCount}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Stats;