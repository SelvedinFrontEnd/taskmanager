import React from 'react';

function Task({ task, handleTaskModal }) {
  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'Very Urgent':
        return 'bg-red-600';
      case 'Urgent':
        return 'bg-yellow-400';
      case 'Normal':
      default:
        return 'bg-gray-400';
    }
  };

  return (
    <div onClick={handleTaskModal} className="p-4 rounded-xl cursor-pointer flex flex-col gap-2 bg-primary dark:bg-primary-dark text-primary-dark dark:text-primary shadow-md hover:shadow-lg transition">
      <div className="flex justify-between items-center">
        <h1 className="font-bold text-lg">{task.title}</h1>
        <div className={`w-3 h-3 rounded-full ${getPriorityColor(task.priority)}`}></div>
      </div>

      <div className="flex justify-between text-sm text-gray-600 dark:text-gray-300">
        <p>Start: {task.startDate}</p>
        <p>Due: {task.dueDate}</p>
      </div>

      <div className="flex flex-wrap items-center gap-2 text-sm">
        <span className={`px-2 py-1 rounded-full text-white ${getPriorityColor(task.priority)}`}>
          {task.priority}
        </span>
        {task.tags?.slice(0, 5).map((tag, index) => (
          <span
            key={index}
            className="bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 px-2 py-1 rounded-full"
          >
            {tag}
          </span>
        ))}
      </div>
    </div>
  );
}

export default Task;
