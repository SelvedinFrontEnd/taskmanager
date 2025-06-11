import React from 'react';
import { useAuth } from '../Contexts/AuthContext';
import { useUser } from '../Contexts/UserContext';
import { Link, useLocation } from 'react-router-dom';
import { useTheme } from '../Contexts/ThemeContext';
import { Moon, Sun } from 'lucide-react';

function MobileSidebar({ setIsOpen }) {
  const location = useLocation();
  const { darkMode, toggleDarkMode } = useTheme();
  const { user } = useAuth();
  const { userData } = useUser();


  return (
    <div className="md:hidden fixed top-0 left-0 w-full h-full z-50 bg-[#d1f8dd] dark:bg-[#0E0E0E] overflow-y-auto p-6">
      <div className="fixed top-5 right-10">
        <button
          onClick={() => setIsOpen(false)}
          className="text-black dark:text-white text-xl font-bold"
        >
          ✕
        </button>
      </div>
      <div className="mb-10 text-2xl font-extrabold tracking-tight">
        <Link to="/profile" className="hover:text-emerald-500 transition-colors duration-200">
          Profile
        </Link>
        <p className='text-[16px] font-normal'>{userData?.username || user?.displayName || "No username"}</p>
      </div>
      
      <ul className="space-y-5 text-lg font-semibold">
        <li className="relative flex gap-2">
          <div className={`circle ${location.pathname === "/" ? "active" : ""}`}></div>
          <Link to="/" className="hover:text-emerald-500 transition-colors duration-200">
            Dashboard
          </Link>
        </li>
        <li className="relative flex gap-2">
          <div className={`circle ${location.pathname === "/tasks" ? "active" : ""}`}></div>
          <Link to="/tasks" className="hover:text-emerald-500 transition-colors duration-200">
            Tasks
          </Link>
        </li>
        <li className="relative flex gap-2">
          <div className={`circle ${location.pathname === "/completed-tasks" ? "active" : ""}`}></div>
          <Link to="/completed-tasks" className="hover:text-emerald-500 transition-colors duration-200">
            Completed
          </Link>
        </li>
        <li className="relative flex gap-2">
          <div className={`circle ${location.pathname === "/expired-tasks" ? "active" : ""}`}></div>
          <Link to="/expired-tasks" className="hover:text-emerald-500 transition-colors duration-200">
            Expired
          </Link>
        </li>
        <li className="relative flex gap-2">
          <div className={`circle ${location.pathname === "/urgent" ? "active" : ""}`}></div>
          <Link to="/urgent" className="hover:text-emerald-500 transition-colors duration-200">
            Very Urgent
          </Link>
        </li>
        <li className="relative flex gap-2">
          <div className={`circle ${location.pathname === "/calendar" ? "active" : ""}`}></div>
          <Link to="/calendar" className="hover:text-emerald-500 transition-colors duration-200">
            Calendar
          </Link>
        </li>
      </ul>

      <div 
        onClick={toggleDarkMode}
        className="mt-auto w-10 h-10 flex items-center justify-center rounded-full bg-emerald-500 hover:bg-emerald-600 transition-colors duration-200 cursor-pointer"
        title={darkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
      >
        {darkMode ? (
          <Sun size={20} className="text-white" />
        ) : (
          <Moon size={20} className="text-white" />
        )}
      </div>
    </div>

  );
}

export default MobileSidebar;
