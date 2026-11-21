import React from 'react'
import { createRoot } from 'react-dom/client'
import '@fontsource/anton/400.css'
import '@fontsource/anton-sc/400.css'
import '@fontsource/dm-sans/400.css'
import '@fontsource/dm-sans/500.css'
import '@fontsource/dm-sans/600.css'
import '@fontsource/dm-sans/700.css'
import '@fontsource/space-mono/400.css'
import './index.css'
import PortfolioRouter from './PortfolioRouter.jsx'

createRoot(document.getElementById('root')).render(
  <React.StrictMode><PortfolioRouter /></React.StrictMode>,
)
