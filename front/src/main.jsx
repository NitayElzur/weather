import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import { ResultProvider } from './Contexts/ResultContext.jsx'
import { OnlineProvider } from './Contexts/OnlineContext.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <OnlineProvider>
      <ResultProvider>
        <App />
      </ResultProvider>
    </OnlineProvider>
  </React.StrictMode>
)
