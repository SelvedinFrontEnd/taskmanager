import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { ThemeProvider } from './Contexts/ThemeContext';
import { LoadingProvider } from './Contexts/LoadingContext.jsx';
import { AuthProvider } from './Contexts/AuthContext.jsx';
import { UserProvider } from './Contexts/UserContext.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <LoadingProvider>
      <AuthProvider>
        <UserProvider>
          <ThemeProvider>
            <App />
          </ThemeProvider>
        </UserProvider>
      </AuthProvider>
    </LoadingProvider>
  </StrictMode>,
)

