import React from 'react'
import { Provider as ReduxProvider } from 'react-redux'
import ReactDOM from 'react-dom/client'

import App from './App'
import './index.css'
import { AuthProvider } from './components/AuthContext'
import { ThemeProvider } from './context/ThemeContext'
import { createStore } from './store/utils/createStore'

if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    try {
      navigator.serviceWorker.register('/sw.js')
    } catch (error) {
      console.info(error)
    }
  })
}

const store = createStore(window.APP_INITIAL_STATE)

ReactDOM.hydrateRoot(
  document.getElementById('root') as HTMLElement,
  <React.StrictMode>
    <ReduxProvider store={store}>
      <AuthProvider>
        <ThemeProvider>
          <App />
        </ThemeProvider>
      </AuthProvider>
    </ReduxProvider>
  </React.StrictMode>
)
