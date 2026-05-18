import React, { createContext, useState, useEffect } from 'react';

export const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [friends, setFriends] = useState([]);
  const [loading, setLoading] = useState(true);
  
  //demo instruction history with initial timeline data
  const [timeline, setTimeline] = useState([
    { id: 1, friendId: 1, friendName: "Sarah Ahmed", type: "Call", date: "2026-05-17", title: "Call with Sarah Ahmed" },
    { id: 2, friendId: 2, friendName: "Tanvir Rahman", type: "Text", date: "2026-05-16", title: "Text with Tanvir Rahman" },
    { id: 3, friendId: 3, friendName: "Arif Islam", type: "Video", date: "2026-05-10", title: "Video with Arif Islam" },
  ]);

  const [toast, setToast] = useState(null);

  const showToast = (message) => {
    setToast(message);
    setTimeout(() => setToast(null), 3000);
  };

  useEffect(() => {
    fetch('/friends.json')
      .then(res => res.json())
      .then(data => {
        setFriends(data);
        setLoading(false);
      })
      .catch(err => {
        console.error("Error fetching data: ", err);
        setLoading(false);
      });
  }, []);

  const addTimelineEntry = (friendId, friendName, type) => {
    const today = new Date().toISOString().split('T')[0];
    const newEntry = {
      id: Date.now(),
      friendId,
      friendName,
      type,
      date: today,
      title: `${type} with ${friendName}`
    };
    setTimeline([newEntry, ...timeline]);
    showToast(`✅ Successfully logged ${type} interaction with ${friendName}!`);
  };

  return (
    <AppContext.Provider value={{ friends, loading, timeline, addTimelineEntry, toast }}>
      {children}
    </AppContext.Provider>
  );
};