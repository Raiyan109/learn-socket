import React from 'react'
import { RouterProvider } from 'react-router-dom'
import routes from './routes/routes'
import './App.css'
import Header from './components/Header'

const App = () => {
  return (
    <div>
      <Header />
      <RouterProvider router={routes} />
    </div>
  )
}

export default App