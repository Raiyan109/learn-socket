
import { useEffect, useMemo, useState } from 'react'
import './App.css'
import { io } from 'socket.io-client'
import { Button, Container, TextField, Typography } from '@mui/material'

function App() {
  const [message, setMessage] = useState('')
  const [showMessage, setShowMessage] = useState('')
  const [room, setRoom] = useState('')
  const [socketId, setSocketId] = useState('')
  const socket = useMemo(() => io('http://localhost:3000'), [])

  useEffect(() => {
    socket.on('connect', () => {
      setSocketId(socket.id)
      console.log('Connected to server', socket.id)
    })

    socket.on('recieve-message', (data) => {
      console.log('Received message:', data)
      localStorage.setItem('message', data.message)
      const message = localStorage.getItem('message')
      setShowMessage(message)
    })


    // socket.on('disconnect', () => {
    //   console.log('Disconnected from server')
    // })

    // return () => {
    //   socket.disconnect()
    // }
  }, [])

  const handleSubmit = (e) => {
    e.preventDefault()
    socket.emit('send_message', { message })
    setMessage('')
    setRoom('')
  }
  return (
    <div>
      <Container>

        <Typography variant="h6" component='div' gutterBottom>{socketId}</Typography>

        <form onSubmit={handleSubmit}>
          <TextField
            id='outlined-basic'
            label='Message'
            variant='outlined'
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
          {/* <TextField
            id='outlined-basic'
            label='Room'
            variant='outlined'
            value={room}
            onChange={(e) => setRoom(e.target.value)}
          /> */}
          <Button
            type='submit'
            variant='contained' color='primary'>Send</Button>
        </form>
      </Container>

      <Container>
        <Typography variant="h6" component='div' gutterBottom>{showMessage}</Typography>
      </Container>
    </div>
  )
}

export default App
