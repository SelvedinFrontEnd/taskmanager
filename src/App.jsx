import { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from './Firebase/Firebase';

import Sidebar from './Sidebar/Sidebar';
import Dashboard from './Pages/Dashboard/Dashboard';
import Tasks from './Pages/Tasks/Tasks';
import Completed from './Pages/Completed/Completed';
import Profile from './Pages/ProfilePage/Profile';
import Upcoming from './Components/Dashboard/Upcoming';
import Urgent from './Pages/UrgentPage/Urgent';
import Expired from './Pages/Expired/Expired';
import AuthPage from './Pages/AuthPage/AuthPage';

function App() {
  const [darkMode, setDarkMode] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(null)
  const [isLoading, setIsLoading] = useState(true)

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

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setIsLoggedIn(!!user);
      setIsLoading(false)
    });
    return () => unsubscribe();
  }, [])

  if(isLoading){
    return <div>Loading...</div>
  }

  return (
    <BrowserRouter>
      <div className="flex min-h-screen bg-[#e6fced] text-[#1A202C] transition-colors duration-500 ease-in-out dark:bg-[#1A1A1A] dark:text-[#F8FAFC]">
        {isLoggedIn ? (
          <>
          <Sidebar darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
          
          <main className="flex-1 ml-64 p-6">
            <Routes>
              <Route path='/' element={<Dashboard />} />
              <Route path='/tasks' element={<Tasks />} />
              <Route path='/completed-tasks' element={<Completed />} />
              <Route path='/expired-tasks' element={<Expired />} />
              <Route path='/profile' element={<Profile />} />
              <Route path='/upcoming' element={<Upcoming />} />
              <Route path='/urgent' element={<Urgent />} />
              <Route path="/auth" element={<Navigate to="/" />} />
            </Routes>
          </main>
          </>
          
        ) : (
          <Routes>
            <Route path="*" element={<Navigate to="/auth" />} />
            <Route path="/auth" element={<AuthPage />} />
          </Routes>
        )}
        
      </div>
    </BrowserRouter>
  );
}

export default App;
