import React, { useState } from 'react'
import Task from '../../Components/Task'
import { useTasks } from '../../Contexts/TasksContext'
import Pagination from '../../Components/Pagination/Pagination';
import { RiCloseLine } from 'react-icons/ri';


function Tasks() {
  const { tasks } = useTasks();
  const itemsPerPage = 10;
  const [currentPage, setCurrentPage] = useState(1);
  const indexOfLast = currentPage * itemsPerPage;
  const indexOfFirst = indexOfLast - itemsPerPage;
  const currentItems = tasks.slice(indexOfFirst, indexOfLast);
  const [selectedTask, setSelectedTask] = useState(null)
  const [isOpen, setIsOpen] = useState(false)
  const [isEditing, setIsEditing] = useState(false)
  const [editedTask, setEditedTask] = useState({
    title: "",
    description: "", 
    tags: "",
    completed: "",
    priority: "",
  })

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

  const handleTaskModal = (task) => {
    setSelectedTask(task)
    setIsOpen(true)
  }

  const handleClick = () => {
    setIsEditing(false)
    setIsOpen(false)
  }

  console.log(tasks)

  return (
    <>
      <div className='flex'>
        <h1 className="text-2xl font-bold mb-4">All Tasks</h1>
        <div className='ml-auto mr-8'>
          SEARCH BAR HERE
        </div>
      </div>
      <div className='flex flex-col gap-4'>
        {currentItems.map((task, index) => (
          <Task key={index} task={task} handleTaskModal={() => handleTaskModal(task)} />
        ))}
      </div>
        <Pagination
        currentPage={currentPage}
        totalItems={tasks.length}
        itemsPerPage={itemsPerPage}
        onPageChange={(page) => setCurrentPage(page)}
      />
      {isOpen && 
      <div className="fixed inset-0 z-50 flex items-center justify-center">
        <div
        className="absolute inset-0 bg-[rgba(0,0,0,0.4)]"
        onClick={handleClick}
      />
      <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-xl w-full max-w-lg p-6 space-y-4 relative">
        <button
          onClick={() => setIsOpen(false)}
          className="cursor-pointer absolute top-3 right-3 text-gray-500 hover:text-gray-700 transition"
        >
          <RiCloseLine size={24} />
        </button>
        
         {isEditing ? 
          <div className='text-xl font-semibold'>
            Change task title: 
            <input
              className='ml-4 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400 dark:bg-gray-800 dark:border-gray-600 dark:text-white'
              placeholder='Change task title'
              type='text'
              value={selectedTask.title}
            />
          </div>
          
          : 
          <h2 className="text-2xl font-semibold">{selectedTask.title}</h2>}

         <div className="flex items-center justify-between">
          <span className={`text-white text-sm px-3 py-1 rounded-full ${getPriorityColor(selectedTask.priority)}`}>
            {selectedTask.priority}
          </span>
          <span className="text-sm text-gray-600 dark:text-gray-300">Start: {selectedTask.startDate}</span>
          <span className="text-sm text-gray-600 dark:text-gray-300">Due: {selectedTask.dueDate}</span>
        </div>

        <div className="flex flex-wrap gap-2">
          {selectedTask.tags?.map((tag, i) => (
            <span key={i} className="bg-gray-200 dark:bg-gray-700 text-sm px-3 py-1 rounded-full text-gray-800 dark:text-gray-200">
              #{tag}
            </span>
          ))}
        </div>

        {isEditing ? 
        <div>
          <h3 className="font-semibold text-lg mb-1">Edit description</h3>
          <textarea
            className='w-full mt-2 p-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400 dark:bg-gray-800 dark:border-gray-600 dark:text-white'
            name="description"
          />
        </div>
        :
        <div>
          <h3 className="font-semibold text-lg mb-1">Description</h3>
          <p className="text-gray-700 dark:text-gray-300 text-sm">
            {selectedTask.description || 'No description provided.'}
          </p>
        </div>}
                
        <div className='flex items-center m-0 gap-2'>
          <input
            className='w-5 h-5 accent-blue-500 m-0 p-0'
            type="checkbox"
            checked={!!selectedTask?.completed} // ensures it's always true or false
            disabled={selectedTask?.completed}
            onChange={() => {
              if (!selectedTask?.completed) {
                setSelectedTask(prev => ({
                  ...prev,
                  completed: true
                }));
              }
            }}
          />
          <label htmlFor="Checkbox">Mark as completed</label>
        </div>
        

        <div className="flex justify-between space-x-3 pt-4">
         {isEditing ? 
         <button onClick={() => setIsEditing(!isEditing)} className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded cursor-pointer">Save Changes</button>    
         :
         <button onClick={() => setIsEditing(!isEditing)} className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded cursor-pointer">Edit</button>}
          <button className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded cursor-pointer">Delete</button>
        </div>

      </div>
      </div>
      }
    </>
    
  )
}

export default Tasks