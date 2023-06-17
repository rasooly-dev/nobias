import React from 'react'
import ReactDOM from 'react-dom/client'
import Landing from './pages/Landing'
import './index.css'

import { createBrowserRouter, RouterProvider } from 'react-router-dom'


const router = createBrowserRouter([
  { path: '/', element: <Landing />},
])

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
