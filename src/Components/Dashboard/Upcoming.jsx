import React from 'react'
import { Calendar } from 'lucide-react'

function Upcoming() {
  return (
    <div className='bg-primary dark:bg-primary-dark w-full rounded-2xl p-2'>
      <div className='text-center font-bold pb-2'>Upcoming/Due Soon</div>
      <div className='flex flex-col gap-4 px-4'>
        <div className='flex gap-2 '>
          <Calendar />
          <h3>Task 1</h3>
          <p>Yesterday</p>
        </div>
        <div className='flex gap-2 '>
          <Calendar />
          <h3>Task 1</h3>
          <p>Yesterday</p>
        </div>
        <div className='flex gap-2 '>
          <Calendar />
          <h3>Task 1</h3>
          <p>Yesterday</p>
        </div>
        <div className='flex gap-2 '>
          <Calendar />
          <h3>Task 1</h3>
          <p>Yesterday</p>
        </div>
        <div className='flex gap-2 '>
          <Calendar />
          <h3>Task 1</h3>
          <p>Yesterday</p>
        </div>
      </div>
    </div>
  )
}

export default Upcoming