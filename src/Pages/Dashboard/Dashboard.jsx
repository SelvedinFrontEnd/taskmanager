import React from 'react';
import DashboardCard from '../../Components/Dashboard/DashboradCard';
import { CheckCircle, Clipboard, Clock, AlertTriangle } from 'lucide-react';
import SearchBar from '../../Components/Dashboard/SearchBar';
import AddTasks from '../../Components/Dashboard/AddTasks';
import Notifications from '../../Components/Dashboard/Notifications';
import Upcoming from '../../Components/Dashboard/Upcoming';
import ActivityFeed from '../../Components/Dashboard/ActivityFeed';

function Dashboard() {
  

  return (
    <>
      <div className='bg-primary dark:bg-primary-dark rounded-2xl mb-4 flex flex-row items-center justify-items-center'>
        <SearchBar />
        <AddTasks />
        <Notifications />
      </div>
         
      <div className='mt-auto grid grid-cols-2 grid-rows-2 gap-4'>
        <DashboardCard
          title="All Tasks"
          value="30"
          icon={<Clipboard size={28} />}
        />
        <DashboardCard
          title="In Progress Tasks"
          value="10"
          icon={<Clock size={28} />}
        />
        <DashboardCard
          title="Urgent Tasks"
          value="2"
          icon={<AlertTriangle size={28} />}
        />
        <DashboardCard
          title="Completed Tasks"
          value="18"
          icon={<CheckCircle size={28} />}
        />
      </div>
    </>
  );
}

export default Dashboard;
