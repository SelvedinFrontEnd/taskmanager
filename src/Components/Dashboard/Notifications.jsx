import React from 'react';
import { Bell } from 'lucide-react';

function Notifications() {
  return (
    <button
      className="cursor-pointer flex items-center justify-center w-10 h-10 rounded-full bg-white dark:bg-[#0E0E0E] border border-gray-300 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-[#1a1a1a] transition-colors duration-200"
      title="Notifications"
    >
      <Bell className="w-5 h-5 text-black dark:text-white" />
    </button>
  );
}

export default Notifications;