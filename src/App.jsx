import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Sidebar from './Sidebar/Sidebar';
import Dashboard from './Pages/Dashboard/Dashboard';
import Tasks from './Pages/Tasks/Tasks';
import Completed from './Pages/Completed/Completed';
import Profile from './Pages/ProfilePage/Profile';
import Upcoming from './Components/Dashboard/Upcoming';
import Urgent from './Pages/UrgentPage/Urgent';
import Expired from './Pages/Expired/Expired';
import AuthPage from './Pages/AuthPage/AuthPage';
import { useLoading } from './Contexts/LoadingContext';
import Loading from './Loading/Loading';
import { useAuth } from './Contexts/AuthContext';
import CalendarPage from './Pages/CalendarPage/CalendarPage';

function App() {
  const { isLoading, setIsLoading } = useLoading()
  const { isLoggedIn, setIsLoggedIn } = useAuth()

  if(isLoading){
    return <Loading />
  }

  return (
    <BrowserRouter>
      <div className="bg-[#e6fced] text-[#1A202C] transition-colors duration-500 ease-in-out dark:bg-[#1A1A1A] dark:text-[#F8FAFC]">
        {isLoggedIn ? (
          <>
          <Sidebar /> 
          
           <main className="flex-1 ml-64 p-6"> 
         
            <Routes>
              <Route path='/' element={<Dashboard />} />
              <Route path='/tasks' element={<Tasks />} />
              <Route path='/completed-tasks' element={<Completed />} />
              <Route path='/expired-tasks' element={<Expired />} />
              <Route path='/profile' element={<Profile />} />
              <Route path='/upcoming' element={<Upcoming />} />
              <Route path='/urgent' element={<Urgent />} />
              <Route path='/calendar' element={<CalendarPage />} />
              <Route path="/auth" element={<Navigate to="/" />} />
            </Routes>
          </main>
          </>
          
        ) : (
          <Routes>
            <Route path="*" element={<Navigate to="/auth" />} />
            <Route path="/auth" element={<AuthPage />} />
          </Routes>
        )}
        
      </div>
    </BrowserRouter>
  );
}

export default App;
