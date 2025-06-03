import React from 'react';

function DashboardCard({ title, value, icon }) {
  return (
    <div
  className="text-sm bg-primary dark:bg-primary-dark cursor-pointer text-primary-dark dark:text-primary shadow-md rounded-2xl p-4 sm:p-6 flex flex-col gap-4 sm:gap-6 transition-all duration-300 transform hover:scale-105 hover:shadow-xl border-l-4 border-accent relative"
>
      <div className='flex gap-4 items-start'>
        <div className="text-accent mt-1">{icon}</div> 
        <div className="flex flex-col">
          <div className="text-xl font-semibold text-gray-800 dark:text-white">{value}</div>
          <div className="text-sm text-gray-500 dark:text-gray-300">{title}</div>
        </div>
      </div>
      <div className='flex flex-col gap-4'>
        <div>
          Uradi zadacu
        </div>
        <div>
          Uradi ovo
        </div>
        <div>
          Uradi ovo
        </div>
      </div>
      
      

      <div className="absolute inset-0 bg-black opacity-0 hover:opacity-50 transition-opacity duration-300 rounded-2xl flex justify-center items-center text-white text-lg font-semibold">
        <p>Click to View More</p>
      </div>
    </div>
  );
}


export default DashboardCard;
