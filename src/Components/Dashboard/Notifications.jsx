import React from 'react'
import { Bell } from 'lucide-react'

function Notifications() {
  return (
    <div className='ml-auto mr-4 p-3 bg-accent rounded-2xl cursor-pointer'>
        <Bell className=' text-black' />
    </div>
  )
}

export default Notifications