import React, { useState } from 'react';
import { Plus } from 'lucide-react'; // simpler than PlusCircle
import TaskModal from './TaskModal';

function AddTasks() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button
        className="cursor-pointer flex items-center justify-center w-10 h-10 rounded-full bg-white dark:bg-[#0E0E0E] border border-gray-300 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-[#1a1a1a] transition-colors duration-200"
        onClick={() => setIsOpen(true)}
        title="Add Task"
      >
        <Plus className="w-5 h-5 text-black dark:text-white" />
      </button>

      {isOpen && <TaskModal setIsOpen={setIsOpen} />}
    </>
  );
}

export default AddTasks;