import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { AuthProvider } from './context/AuthContext.jsx'
import { RoleProvider } from './context/RoleContext.jsx'
import AppRouter from './router/index.jsx'
import 'leaflet/dist/leaflet.css';
import GoogleTranslate from './context/GoogleTranslate.jsx'
import { GoogleOAuthProvider } from '@react-oauth/google'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}>
        <AuthProvider>
          <RoleProvider>
            <AppRouter />
          </RoleProvider>
        </AuthProvider>
    </GoogleOAuthProvider>
  </StrictMode>,
)