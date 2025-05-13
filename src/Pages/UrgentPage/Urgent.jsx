import React, { useState } from 'react'
import Task from '../../Components/Task'
import { useTasks } from '../../Contexts/TasksContext'

function Urgent() {
  const { tasks } = useTasks()
  const urgentTasks = tasks.filter(task => task.priority === "Very Urgent");

  return (
    <div className='flex flex-col gap-4'>
     {urgentTasks.map((task, index) => (
      <Task key={index} task={task} />
     ))}
    </div>
  )
}

export default Urgent