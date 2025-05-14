import React, { useState } from 'react'
import Task from '../../Components/Task'
import { useTasks } from '../../Contexts/TasksContext'

function Expired() {
  const { tasks } = useTasks()
  const today = new Date().toISOString().split('T')[0];
  const expiredTasks = tasks.filter(task => task.dueDate < today)
  
  
  return (
    <div className='flex flex-col gap-4'>
      {expiredTasks.map((task, index) => (
        <Task key={index} task={task} />
      ))}
    </div>
  )
}

export default Expired