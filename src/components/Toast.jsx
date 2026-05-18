import React, { useContext } from 'react';
import { AppContext } from '../context/AppContext';

export default function Toast() {
  const { toast } = useContext(AppContext);
  if (!toast) return null;

  return (
    <div className="fixed bottom-5 right-5 z-50 bg-gray-900 text-white px-5 py-3 rounded-xl shadow-xl flex items-center gap-2 animate-bounce border border-gray-700">
      <span className="font-medium text-sm">{toast}</span>
    </div>
  );
}