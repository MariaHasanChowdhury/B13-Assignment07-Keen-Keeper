import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AppProvider } from './context/AppContext';
import { Toaster } from 'react-hot-toast';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import FriendDetails from './pages/FriendDetails';
import Timeline from './pages/Timeline';
import Stats from './pages/Stats';
import NotFound from './pages/NotFound';

function App() {
  return (
    <AppProvider>
      <Router>
        <div className="min-h-screen bg-slate-50/50 flex flex-col text-gray-800 font-sans antialiased">
          {/* Navbar */}
          <Navbar />
          
          {/* Main App Screens */}
          <main className="flex-grow">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/friend/:id" element={<FriendDetails />} />
              <Route path="/timeline" element={<Timeline />} />
              <Route path="/stats" element={<Stats />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </main>

          {/* Toast Notification Container */}
          <Toaster position="bottom-right" reverseOrder={false} />

          {/* Footer */}
          <Footer />
        </div>
      </Router>
    </AppProvider>
  );
}

export default App;