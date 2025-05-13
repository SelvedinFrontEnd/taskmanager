import React from 'react';

const Loading = () => {
  return (
    <div className="flex items-center justify-center h-screen bg-white dark:bg-[#1A1A1A] transition-colors duration-500">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-blue-500 border-opacity-75 mx-auto mb-4"></div>
        <p className="text-gray-700 dark:text-gray-300 text-lg font-medium">Loading...</p>
      </div>
    </div>
  );
};

export default Loading;
