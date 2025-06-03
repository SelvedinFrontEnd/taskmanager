import { useState } from 'react'
import Task from '../../Components/Task'
import { useTasks } from '../../Contexts/TasksContext'
import { RiCloseLine } from 'react-icons/ri';

function Completed() {
  const { tasks } = useTasks()
  const completedTasks = tasks.filter(task => task.completed);
  const itemsPerPage = 10;
  const [currentPage, setCurrentPage] = useState(1)
  const indexOfLast = currentPage * itemsPerPage;
  const indefOfFirst = indexOfLast - itemsPerPage;
  const currentItems = completedTasks.slice(indefOfFirst, indexOfLast)
  const [selectedTask, setSelectedTask] = useState(null)
  const [isOpen, setIsOpen] = useState(false)
  const [isEditing, setIsEditing] = useState(false)

  
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

  return (
    <>
      <div className='flex flex-col gap-4'>
        {completedTasks.map((task, index) => (
          <Task key={index} task={task} handleTaskModal={() => handleTaskModal(task)} />
        ))}
      </div>
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
        

        <div className="flex items-center space-x-2">
          <input
            className='w-5 h-5 accent-blue-500'
            type="checkbox"
            checked={selectedTask.completed}
          />
          <label className="text-sm">Completed</label>
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

export default Completed

