import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import { AppContextProvider } from './context/appContext'
// import './index.scss'

import '@fontsource/roboto/300.css'
import '@fontsource/roboto/400.css'
import '@fontsource/roboto/500.css'
import '@fontsource/roboto/700.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  // <React.StrictMode> 因為在本機執行，會導致 useEffect 執行兩次，故註解
  <AppContextProvider>
    <App />
  </AppContextProvider>
  // </React.StrictMode>
)
