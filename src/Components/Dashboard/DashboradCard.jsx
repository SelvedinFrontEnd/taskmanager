import React from 'react';

function DashboardCard({ title, value, icon }) {
  return (
    <div
      className={`bg-primary dark:bg-primary-dark cursor-pointer w-2xl mb-6 text-primary-dark dark:text-primary shadow-md rounded-2xl p-6 flex items-center space-x-4 transition-all duration-300 transform hover:scale-105 hover:shadow-xl border-l-4 border-accent relative`}
    >
      <div className="text-accent">{icon}</div>
      <div className="flex-1">
        <div className="text-xl font-semibold text-gray-800 dark:text-white">{value}</div>
        <div className="text-sm text-gray-500 dark:text-gray-300">{title}</div>
      </div>

      {/* Hover Effect with More Info */}
      <div className="absolute inset-0 bg-black opacity-0 hover:opacity-50 transition-opacity duration-300 rounded-2xl flex justify-center items-center text-white text-lg font-semibold">
        <p>Click to View More</p>
      </div>
    </div>
  );
}

export default DashboardCard;
