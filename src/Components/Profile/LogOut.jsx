import React from 'react'

function LogOut({handleLogout}) {
  return (
    <>
        <button onClick={handleLogout} className='cursor-pointer bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600'>Logout</button>
    </>
  )
}

export default LogOut