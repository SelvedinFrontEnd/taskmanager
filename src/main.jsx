import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { ThemeProvider } from './Contexts/ThemeContext';
import { LoadingProvider } from './Contexts/LoadingContext.jsx';
import { AuthProvider } from './Contexts/AuthContext.jsx';
import { UserProvider } from './Contexts/UserContext.jsx';
import { TasksProvider } from './Contexts/TasksContext.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <LoadingProvider>
      <AuthProvider>
        <UserProvider>
          <TasksProvider> 
            <ThemeProvider>
              <App />
            </ThemeProvider>
          </TasksProvider>
        </UserProvider>
      </AuthProvider>
    </LoadingProvider>
  </StrictMode>,
)

