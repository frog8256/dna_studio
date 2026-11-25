import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { LanguageProvider } from './LanguageProvider'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <LanguageProvider><App isPlanTo={document.body.dataset.page === 'plan-to'} /></LanguageProvider>
  </StrictMode>,
)
