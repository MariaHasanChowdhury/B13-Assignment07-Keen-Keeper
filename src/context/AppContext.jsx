import React, { createContext, useState, useEffect } from 'react';
import { toast } from 'react-hot-toast';

export const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [friends, setFriends] = useState([]);
  const [loading, setLoading] = useState(true);
  const [timeline, setTimeline] = useState([
    { id: 1, date: '2026-05-15', type: 'Call', title: 'Call with Nafis Fuad', friendId: 1 },
    { id: 2, date: '2026-05-14', type: 'Text', title: 'Text with Anika Rahman', friendId: 2 },
    { id: 3, date: '2026-05-17', type: 'Video', title: 'Video with Tanvir Hasan', friendId: 3 },
  ]);

  useEffect(() => {
    fetch('/friends.json')
      .then((res) => res.json())
      .then((data) => {
        setFriends(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching data: ", err);
        setLoading(false);
      });
  }, []);

  const addTimelineEntry = (friendName, friendId, type) => {
    const today = new Date().toISOString().split('T')[0];
    const newEntry = {
      id: Date.now(),
      date: today,
      type: type,
      title: `${type} with ${friendName}`,
      friendId: friendId
    };
    setTimeline([newEntry, ...timeline]);
    toast.success(`${type} interaction logged successfully!`);
  };

  return (
    <AppContext.Provider value={{ friends, loading, timeline, addTimelineEntry }}>
      {children}
    </AppContext.Provider>
  );
};