import { useState } from 'react'
import Task from '../../Components/Task'
import { useTasks } from '../../Contexts/TasksContext'

function Completed() {
  const { tasks } = useTasks()
  const completedTasks = tasks.filter(task => task.completed);
  const itemsPerPage = 10;
  const [currentPage, setCurrentPage] = useState(1)

  const indexOfLast = currentPage * itemsPerPage;
  const indefOfFirst = indexOfLast - itemsPerPage;
  const currentItems = completedTasks.slice(indefOfFirst, indexOfLast)

  console.log(currentItems)

  return (
    <div className='flex flex-col gap-4'>
      {completedTasks.map((task, index) => (
        <Task key={index} task={task} />
      ))}
    </div>
  )
}

export default Completed

