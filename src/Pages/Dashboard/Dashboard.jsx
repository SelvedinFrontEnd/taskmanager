import React from 'react';
import DashboardCard from '../../Components/Dashboard/DashboradCard';
import { CheckCircle, Clipboard, Clock, AlertTriangle } from 'lucide-react';
import SearchBar from '../../Components/Dashboard/SearchBar';
import AddTasks from '../../Components/Dashboard/AddTasks';


function Dashboard() {
  return (
    <>
      <SearchBar />
      <AddTasks />
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
    </>
  );
}

export default Dashboard;
