import App               from './App'
import { ModalProvider } from './context/ModalContext'
import { createRoot    } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'

createRoot(document.getElementById('root')).render
(
  <BrowserRouter>
    <ModalProvider>
      <App/>
    </ModalProvider>
  </BrowserRouter>
)