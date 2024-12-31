import { useEffect, useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { io } from 'socket.io-client'
import { Button, Container, TextField, Typography } from '@mui/material'

const Home = () => {
    const [userName, setUserName] = useState('')
    const [room, setRoom] = useState('')
    const socket = useMemo(() => io('http://localhost:3000'), [])
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault()
        localStorage.setItem('userName', userName);
        // Send username and socket id to server
        socket.emit('new-group-user', { userName, id: socket.id })
        navigate('/group-chat');
    }

    return (
        <div>
            <Container>
                <form onSubmit={handleSubmit}>
                    <h2 className="home__header">Sign in to Open Chat</h2>
                    <TextField
                        id='outlined-basic'
                        label='User Name'
                        variant='outlined'
                        value={userName}
                        onChange={(e) => setUserName(e.target.value)}
                    />

                    <Button
                        type='submit'
                        variant='contained' color='primary'>Sign in</Button>
                </form>
                {/* <form onSubmit={handleSubmit}>
                    <TextField
                        id='outlined-basic'
                        label='Message'
                        variant='outlined'
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                    />

                    <Button
                        type='submit'
                        variant='contained' color='primary'>Send</Button>
                </form> */}
            </Container>
        </div>
    )
}

export default Home