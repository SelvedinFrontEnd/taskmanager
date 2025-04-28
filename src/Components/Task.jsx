import React from 'react'

function Task({ tasks }) {
  return (
    <>
        <div className='p-4 rounded-xl cursor-pointer flex justify-between bg-primary dark:bg-primary-dark text-primary-dark dark:text-primary'>
            <h1 className='font-bold'>Prvi Task</h1>
            <p>22/9/2001</p>
            <p>11/7/2005</p>
            <div className='flex gap-2'>
                <div>RED COLOR</div>
                <p>Very urgent</p>
            </div>
        </div>
        
    </>
  )
}

export default Task