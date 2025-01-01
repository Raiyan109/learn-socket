import { Button, Container, TextField } from '@mui/material';
import { useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { io } from 'socket.io-client';


const PrivateChatLogin = () => {
    const [privateUserName, setPrivateUserName] = useState([])
    const socket = useMemo(() => io('http://localhost:3000'), [])
    const navigate = useNavigate();

    const handlePrivateChatSubmit = (e) => {
        e.preventDefault()
        localStorage.setItem('privateUserName', privateUserName);
        // // Send username and socket id to server
        socket.emit('new-private-user', { privateUserName, id: socket.id })
        navigate('/private-chat');
    }

    return (
        <div>
            <Container style={{ border: '1px solid #ccc', padding: '20px', marginBottom: '20px', borderRadius: '5px' }}>
                <form onSubmit={handlePrivateChatSubmit}>
                    <h2 style={{ textAlign: 'center', padding: '20px' }}>Sign in to Open Private Chat</h2>
                    <TextField
                        id='outlined-basic'
                        label='User Name'
                        variant='outlined'
                        value={privateUserName}
                        onChange={(e) => setPrivateUserName(e.target.value)}
                    />

                    <Button
                        type='submit'
                        variant='contained' color='primary'>Sign in</Button>
                </form>

            </Container>
        </div>
    )
}

export default PrivateChatLogin