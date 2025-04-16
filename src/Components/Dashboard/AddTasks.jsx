import React from 'react';
import { PlusCircle } from 'lucide-react'; // Importing a plus icon from lucide-react

function AddTasks() {
  return (
    <div className="flex justify-end p-6">
      <button 
        className="h-13 flex items-center space-x-2 cursor-pointer bg-emerald-500 text-white border-2 rounded-full px-6 py-3 hover:bg-emerald-600 dark:bg-emerald-500 dark:text-white dark:border-emerald-500 dark:hover:bg-emerald-600 transition-all duration-300"
        onClick={() => alert('Add new task functionality here!')}
      >
        <PlusCircle size={24} />
        <span className="text-lg font-semibold">Add Task</span>
      </button>
    </div>
  );
}

export default AddTasks;
