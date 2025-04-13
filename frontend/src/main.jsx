import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import './index.css'
import App from './App.jsx'
import Authentication from './pages/authentication.jsx';
import { ChatProvider } from './context/ChatProvider.jsx';

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <Routes>
        <Route path='/' element={
          <ChatProvider>
            <Authentication/>
          </ChatProvider>
          }/>
        <Route path='/chats' element={
          <ChatProvider>
            <App/>
          </ChatProvider>
          }/>
    </Routes>
  </BrowserRouter>
)
