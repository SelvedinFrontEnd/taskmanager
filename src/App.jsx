import { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Sidebar from './Sidebar/Sidebar';
import Dashboard from './Pages/Dashboard/Dashboard';
import Tasks from './Pages/Tasks/Tasks';
import Completed from './Pages/Completed/Completed';
import Profile from './Pages/ProfilePage/Profile';
import Upcoming from './Components/Dashboard/Upcoming';
import Urgent from './Pages/UrgentPage/Urgent';

function App() {
  const [darkMode, setDarkMode] = useState(false);

  // Load theme from localStorage on mount
  useEffect(() => {
    const storedTheme = localStorage.getItem('theme');
    if (storedTheme === 'dark') {
      setDarkMode(true);
    }
  }, []);

  // Update the <html> class and localStorage when theme changes
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [darkMode]);

  const toggleDarkMode = () => setDarkMode(prev => !prev);

  return (
    <BrowserRouter>
      <div className="flex min-h-screen bg-[#e6fced] text-[#1A202C] transition-colors duration-500 ease-in-out dark:bg-[#1A1A1A] dark:text-[#F8FAFC]">
        <Sidebar darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
        
        <main className="flex-1 ml-64 p-6">
          <Routes>
            <Route path='/' element={<Dashboard />} />
            <Route path='/tasks' element={<Tasks />} />
            <Route path='/completed-tasks' element={<Completed />} />
            <Route path='/profile' element={<Profile />} />
            <Route path='/upcoming' element={<Upcoming />} />
            <Route path='/urgent' element={<Urgent />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}

export default App;
