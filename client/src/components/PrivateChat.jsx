import React, { useEffect, useMemo, useRef, useState } from 'react';
import { Box, IconButton, InputAdornment, TextField } from '@mui/material';
import { Button, Container } from "@mui/material"
import { CiSearch } from "react-icons/ci";
import { MdFavorite } from "react-icons/md";
import { IoIosAttach, IoMdSend } from "react-icons/io";
import { io } from 'socket.io-client';
import { useNavigate } from "react-router-dom";
import { GiEntryDoor } from "react-icons/gi";

const PrivateChat = () => {
    const [socketId, setSocketId] = useState('')
    const [message, setMessage] = useState('');
    const [privateUsers, setPrivateUsers] = useState([])
    const [recipientId, setRecipientId] = useState('');
    const socket = useMemo(() => io('http://localhost:3000'), [])
    const navigate = useNavigate();
    console.log(recipientId, 'reciepentId');


    useEffect(() => {
        socket.on('connect', () => {
            setSocketId(socket.id)
            console.log('Connected to server', socket.id)
        })

        // Private chat


        // Private chat response
        socket.on('new-private-user-response', (data) => {
            setPrivateUsers(data)
        })

        return () => {
            socket.off('connect')
            // socket.off('recieve-group-message')
            socket.off('new-private-user-response')
        }
    }, [socket])

    console.log(privateUsers, 'private Users')

    const handleSubmit = (e) => {
        e.preventDefault()
        // if (message.trim() && localStorage.getItem('groupUserName')) {
        //     socket.emit('send-group-message', {
        //         text: message,
        //         name: localStorage.getItem('groupUserName'),
        //         id: `${socketId}${Math.random()}`,
        //         socketId: socketId,
        //     })
        // }
        // setMessage('')
    }

    // Leave chat
    const handleLeaveChat = () => {
        localStorage.removeItem('groupUserName');
        navigate('/');
        window.location.reload();
    };

    return (
        <div>

            <div className="container mx-auto shadow-lg rounded-lg">
                {/* <!-- headaer --> */}
                <div className="px-5 py-5 flex justify-between items-center bg-white border-b-2">
                    <header className="chat__mainHeader">
                        <button onClick={handleLeaveChat} title="Save" className="cursor-pointer flex items-center fill-red-400 bg-red-950 hover:bg-red-900 active:border active:border-red-400 rounded-md duration-100 p-2">
                            <GiEntryDoor className="text-red-400 font-bold " />
                            <span className="text-sm text-red-400 font-bold pr-1">Leave Chat</span>
                        </button>

                    </header>

                    <div className="w-1/2">
                        <input
                            type="text"
                            name=""
                            id=""
                            placeholder="search IRL"
                            className="rounded-2xl bg-gray-100 py-3 px-5 w-full"
                        />
                    </div>
                    <div
                        className="h-12 w-12 p-2 bg-yellow-500 rounded-full text-white font-semibold flex items-center justify-center"
                    >
                        RA
                    </div>
                </div>
                {/* <!-- end header --> */}
                {/* <!-- Chatting --> */}
                <div className="flex flex-row justify-between bg-white">
                    {/* <!-- chat list --> */}
                    <div className="flex flex-col w-2/5 border-r-2 overflow-y-auto">
                        {/* <!-- search compt --> */}
                        <div className="border-b-2 py-4 px-2">
                            <input
                                type="text"
                                placeholder="search chatting"
                                className="py-2 px-2 border-2 border-gray-200 rounded-2xl w-full"
                            />
                        </div>
                        {/* <!-- end search compt --> */}
                        {/* <!-- user list --> */}
                        {privateUsers.map((user) => (
                            <div
                                className="flex flex-row py-4 px-2 justify-center items-center border-b-2" key={user.id}
                            >

                                <p>{user.privateUserName}</p>
                                <button className='' onClick={() => setRecipientId(user.id)}>
                                    Chat with <span style={{ backgroundColor: '#000000', color: '#ffffff', borderRadius: '9px', padding: '6px' }}>{user.privateUserName}</span>
                                </button>
                            </div>
                        ))}

                        {/* <!-- end user list --> */}
                    </div>
                    {/* <!-- end chat list --> */}
                    {/* <!-- message --> */}
                    <div className="w-full px-5 flex flex-col justify-between">
                        <div className="flex flex-col mt-5">

                            <div className="message__status">
                                <p>Someone is typing...</p>
                            </div>


                        </div>
                        <div className="py-5">
                            {/* <input
                                className="w-full bg-gray-300 py-5 px-3 rounded-xl"
                                type="text"
                                placeholder="type your message here..."
                            /> */}
                            <Container>

                                <form onSubmit={handleSubmit}>
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
                                </form>
                            </Container>
                        </div>
                    </div>
                    {/* <!-- end message --> */}
                    <div className="w-2/5 border-l-2 px-5">
                        <div className="flex flex-col">
                            <div className="font-semibold text-xl py-4">Mern Stack Group</div>
                            <img
                                src="https://source.unsplash.com/L2cxSuKWbpo/600x600"
                                className="object-cover rounded-xl h-64"
                                alt=""
                            />
                            <div className="font-semibold py-4">Created 22 Sep 2021</div>
                            <div className="font-light">
                                Lorem ipsum dolor sit amet consectetur adipisicing elit. Deserunt,
                                perspiciatis!
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div >
    );
};

export default PrivateChat;
