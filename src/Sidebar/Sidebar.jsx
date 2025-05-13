import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Sun, Moon } from 'lucide-react';
import { useTheme } from '../Contexts/ThemeContext';
import { useAuth } from '../Contexts/AuthContext';
import { useUser } from '../Contexts/UserContext';

function Sidebar() {
  const location = useLocation();
  const { darkMode, toggleDarkMode } = useTheme();
  const { user } = useAuth();
  const { userData } = useUser();

  return ( 
    <div className="w-64 h-screen fixed left-0 top-0 shadow-rightdark dark:shadow-rightdark bg-[#d1f8dd] text-[#1A202C] dark:bg-[#0E0E0E] dark:text-[#F8FAFC] p-8 flex flex-col transition-colors duration-500 ease-in-out">
      
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

export default Sidebar;
