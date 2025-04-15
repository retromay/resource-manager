import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import ResourceCard from './components/ResourceCard.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
    <ResourceCard/>
  </StrictMode>,
)
