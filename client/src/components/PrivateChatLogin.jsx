import { Button, Container, TextField } from '@mui/material';
import { useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { io } from 'socket.io-client';
import PrivateChat from './PrivateChat';


const PrivateChatLogin = () => {
    const [username, setUsername] = useState('')
    const [room, setRoom] = useState('')
    const socket = useMemo(() => io('http://localhost:3000'), [])
    const navigate = useNavigate();

    const joinRoom = (e) => {
        e.preventDefault()

        if (username !== '' && room !== '') {
            socket.emit('join-room', { username, room })
            // navigate(`/private-chat/${room}/${username}`)
        }

    }

    return (
        <div>
            <Container style={{ border: '1px solid #ccc', padding: '20px', marginBottom: '20px', borderRadius: '5px' }}>
                <form onSubmit={joinRoom}>
                    <h2 style={{ textAlign: 'center', padding: '20px' }}>Sign in to Open Private Chat</h2>
                    <TextField
                        id='outlined-basic'
                        label='User Name'
                        variant='outlined'
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                    <TextField
                        id='outlined-basic'
                        label='Room Id'
                        variant='outlined'
                        value={room}
                        onChange={(e) => setRoom(e.target.value)}
                    />

                    <Button
                        type='submit'
                        variant='contained' color='primary'>Sign in</Button>
                </form>

            </Container>


            <Container style={{ border: '1px solid #ccc', padding: '20px', marginBottom: '20px', borderRadius: '5px' }}>
                <PrivateChat socket={socket} username={username} room={room} />
            </Container>
        </div>
    )
}

export default PrivateChatLogin