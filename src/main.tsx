import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'  // ← Esta linha deve existir!
import App from './App.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)