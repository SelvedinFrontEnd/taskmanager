import React from 'react';
import DashboardCard from '../../Components/Dashboard/DashboradCard';
import { CheckCircle, Clipboard, Clock, AlertTriangle } from 'lucide-react';
import SearchBar from '../../Components/Dashboard/SearchBar';
import AddTasks from '../../Components/Dashboard/AddTasks';
import Notifications from '../../Components/Dashboard/Notifications';
import Upcoming from '../../Components/Dashboard/Upcoming';
import ActivityFeed from '../../Components/Dashboard/ActivityFeed';
import HamburgerMenu from '../../Components/Dashboard/HamburgerMenu';

function Dashboard() {
  

  return (
    <>
       <div className='bg-primary dark:bg-primary-dark rounded-2xl p-2 mb-4 gap-2 flex flex-row items-center justify-items-center'>
        <SearchBar />
        <AddTasks />
        <div className='m-auto'>
          Dashboard
        </div>
        <Notifications />
        <HamburgerMenu />
      </div> 
         
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-4 sm:px-0">
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
