import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import App from './App'
import reportWebVitals from './reportWebVitals'
import { BrowserRouter as Router } from 'react-router'
import { ToastContainer } from 'react-toastify'
import { AuthProvider, AuthContext } from './context/AuthContext'
import { EventContext, EventProvider } from './context/EventContext'
import { FilterContext, FilterProvider } from './context/FilterContext'

export { AuthContext, EventContext, FilterContext }
const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
  <React.StrictMode>
    <ToastContainer />
    <Router>
      <EventProvider>
        <AuthProvider>
          <FilterProvider>
            <App />
          </FilterProvider>
        </AuthProvider>
      </EventProvider>
    </Router>
  </React.StrictMode>
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
