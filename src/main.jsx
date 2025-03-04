import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { Terminal } from "./components/Terminal";

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Terminal />
  </StrictMode>
)
