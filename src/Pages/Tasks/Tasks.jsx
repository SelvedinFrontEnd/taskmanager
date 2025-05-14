import React, { useState } from 'react'
import Task from '../../Components/Task'
import { useTasks } from '../../Contexts/TasksContext'
import Pagination from '../../Components/Pagination/Pagination';


function Tasks() {
  const { tasks } = useTasks()
  const itemsPerPage = 10;
  const [currentPage, setCurrentPage] = useState(1)

  const indexOfLast = currentPage * itemsPerPage;
 const indexOfFirst = indexOfLast - itemsPerPage;
const currentItems = tasks.slice(indexOfFirst, indexOfLast);

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
          <Task key={index} task={task} />
        ))}
      </div>
        <Pagination
        currentPage={currentPage}
        totalItems={tasks.length}
        itemsPerPage={itemsPerPage}
        onPageChange={(page) => setCurrentPage(page)}
      />
    </>
    
  )
}

export default Tasks