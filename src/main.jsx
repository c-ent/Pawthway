import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { BrowserRouter } from 'react-router-dom';
import { SessionProvider } from './components/SessionContext.jsx';

ReactDOM.createRoot(document.getElementById('root')).render(
  
  <React.StrictMode>
    <BrowserRouter>
      <SessionProvider> {/* Wrap App with SessionProvider */}
          <App />
      </SessionProvider>
    </BrowserRouter>
  </React.StrictMode>,
)
