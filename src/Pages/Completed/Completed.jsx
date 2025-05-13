import { useState } from 'react'
import Task from '../../Components/Task'
import { useTasks } from '../../Contexts/TasksContext'

function Completed() {
  const { tasks } = useTasks()
  const completedTasks = tasks.filter(task => task.completed);

  return (
    <div className='flex flex-col gap-4'>
      {completedTasks.map((task, index) => (
        <Task key={index} task={task} />
      ))}
    </div>
  )
}

export default Completed