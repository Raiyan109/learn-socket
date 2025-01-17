import { useEffect, useMemo, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { io } from 'socket.io-client'
import { Button, Container, TextField, Typography } from '@mui/material'

const Home = () => {
    const [groupUserName, setGroupUserName] = useState('')
    const [privateUserName, setPrivateUserName] = useState([])
    const [room, setRoom] = useState('')
    const socket = useMemo(() => io('http://localhost:3000'), [])
    const navigate = useNavigate();

    const handleGroupChatSubmit = (e) => {
        e.preventDefault()
        localStorage.setItem('groupUserName', groupUserName);
        // Send username and socket id to server
        socket.emit('new-group-user', { groupUserName, id: socket.id })
        navigate('/group-chat');
    }

    // const handlePrivateChatSubmit = (e) => {
    //     e.preventDefault()
    //     localStorage.setItem('privateUserName', privateUserName);
    //     // // Send username and socket id to server
    //     socket.emit('new-private-user', { privateUserName, id: socket.id })
    //     navigate('/private-chat');
    // }


    return (
        <div>
            <Container style={{ border: '1px solid #ccc', padding: '20px', marginBottom: '20px', borderRadius: '5px' }}>
                <form onSubmit={handleGroupChatSubmit}>
                    <h2 className="" style={{ textAlign: 'center', padding: '20px' }}>Sign in to Open Group Chat</h2>
                    <TextField
                        id='outlined-basic'
                        label='User Name'
                        variant='outlined'
                        value={groupUserName}
                        onChange={(e) => setGroupUserName(e.target.value)}
                    />

                    <Button
                        type='submit'
                        variant='contained' color='primary'>Sign in</Button>
                </form>
            </Container>

            <Link to='/private-chat-login'>
                <Button
                    type='submit'
                    variant='contained' color='primary'>Login in private chat room</Button>
            </Link>
            {/* <Container style={{ border: '1px solid #ccc', padding: '20px', marginBottom: '20px', borderRadius: '5px' }}>
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

            </Container> */}
        </div>
    )
}

export default Home