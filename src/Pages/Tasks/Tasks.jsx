import React, { useState } from 'react'
import Task from '../../Components/Task'
import { useTasks } from '../../Contexts/TasksContext'


function Tasks() {
  const { tasks } = useTasks()

  return (
    <>
      <div className='flex'>
        <h1 className="text-2xl font-bold mb-4">All Tasks</h1>
        <div className='ml-auto mr-8'>
          SEARCH BAR HERE
        </div>
      </div>
      <div className='flex flex-col gap-4'>
        {tasks.map((task, index) => (
          <Task key={index} task={task} />
        ))}
      </div>
      <div>
        Pagination 10max tasks per page
      </div>
    </>
    
  )
}

export default Tasks