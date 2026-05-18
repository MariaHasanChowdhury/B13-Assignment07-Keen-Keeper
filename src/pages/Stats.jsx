import React, { useContext } from 'react';
import { AppContext } from '../context/AppContext';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';

export default function Stats() {
  const { timeline } = useContext(AppContext);

  // চার্ট ডাটা এগ্রিগেশন
  const callCount = timeline.filter(t => t.type === 'Call').length;
  const textCount = timeline.filter(t => t.type === 'Text').length;
  const videoCount = timeline.filter(t => t.type === 'Video').length;

  const data = [
    { name: 'Calls', value: callCount },
    { name: 'Texts', value: textCount },
    { name: 'Video Calls', value: videoCount },
  ];

  const COLORS = ['#4f46e5', '#0ea5e9', '#059669'];

  return (
    <div className="max-w-3xl mx-auto px-4 py-10 space-y-6">
      <div>
        <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">Friendship Analytics</h1>
        <p className="text-sm text-gray-400 mt-1">Visualizing your interaction metrics across your network.</p>
      </div>

      <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex flex-col items-center">
        <h3 className="font-bold text-gray-700 text-lg mb-4 text-center">Interaction Breakthrough Breakdown</h3>
        
        {callCount === 0 && textCount === 0 && videoCount === 0 ? (
          <p className="text-sm text-gray-400 py-20 italic">No logged records to display chart data.</p>
        ) : (
          <div className="w-full h-80">
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
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip 
                  contentStyle={{ backgroundColor: '#1f2937', borderRadius: '12px', color: '#fff', border: 'none' }}
                  itemStyle={{ color: '#fff' }}
                />
                <Legend iconType="circle" wrapperStyle={{ paddingTop: '20px' }} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        )}
      </div>
    </div>
  );
}