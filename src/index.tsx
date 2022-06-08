import React from 'react'
import ReactDOM from 'react-dom/client'
import reportWebVitals from './reportWebVitals'
import { BrowserRouter as Router } from 'react-router-dom'
import App from '@/App'
import GlobalStyle from '@/globalStyles'

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)
root.render(
  <React.StrictMode>
    <Router>
      <App />
      <GlobalStyle />
    </Router>
  </React.StrictMode>
)

reportWebVitals()
