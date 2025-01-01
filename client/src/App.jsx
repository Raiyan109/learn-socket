import React from 'react'
import { RouterProvider } from 'react-router-dom'
import routes from './routes/routes'
import './App.css'
import Header from './components/Header'

const App = () => {
  return (
    <div>
      <Header logoSrc="https://www.svgrepo.com/show/499962/music.svg"
        logoText="Chat App"
        menuItems={[
          { text: 'Home', link: '/' },
          { text: 'Group Chat', link: '/group-chat' },
          { text: 'Private Chat Login', link: '/private-chat-login' },
          { text: 'Private Chat', link: '/private-chat' },
        ]}
        buttonText="Download"
        buttonLink="https://themesberg.com/product/tailwind-css/landing-page" />
      <RouterProvider router={routes} />
    </div>
  )
}

export default App

