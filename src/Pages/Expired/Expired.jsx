import React, { useState } from 'react'
import Task from '../../Components/Task'

function Expired() {
  const [tasks, setTasks] = useState([
    
  ])

  return (
    <div className='flex flex-col gap-4'>
      <Task tasks={tasks}/>
      <Task tasks={tasks}/>
      <Task tasks={tasks}/>
      <Task tasks={tasks}/>
      <Task tasks={tasks}/>
    </div>
  )
}

export default Expired