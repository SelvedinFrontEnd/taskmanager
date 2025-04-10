import React from 'react';
import { Link } from 'react-router-dom';
import { Sun, Moon } from 'lucide-react';

function Sidebar({ darkMode, toggleDarkMode }) {
  return ( 
    <div className="w-64 h-screen fixed left-0 top-0 shadow-rightdark dark:shadow-rightdark bg-[#d1f8dd] text-[#1A202C] dark:bg-[#0E0E0E] dark:text-[#F8FAFC] p-8 flex flex-col transition-colors duration-500 ease-in-out">
      
      <div className="mb-10 text-2xl font-extrabold tracking-tight">
        <Link to="/profile" className="hover:text-emerald-500 transition-colors duration-200">
          Profile
        </Link>
      </div>

      <ul className="space-y-5 text-lg font-semibold">
        <li>
          <Link to="/" className="hover:text-emerald-500 transition-colors duration-200">
            Dashboard
          </Link>
        </li>
        <li>
          <Link to="/tasks" className="hover:text-emerald-500 transition-colors duration-200">
            Tasks
          </Link>
        </li>
        <li>
          <Link to="/completed-tasks" className="hover:text-emerald-500 transition-colors duration-200">
            Completed
          </Link>
        </li>
        <li>
          <Link to="/urgent" className="hover:text-emerald-500 transition-colors duration-200">
            Urgent
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
