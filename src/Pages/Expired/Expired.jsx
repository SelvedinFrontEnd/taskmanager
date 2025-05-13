import React, { useState } from 'react'
import Task from '../../Components/Task'
import { useTasks } from '../../Contexts/TasksContext'

function Expired() {
  const { tasks } = useTasks()

  return (
    <div className='flex flex-col gap-4'>
     
    </div>
  )
}

export default Expired