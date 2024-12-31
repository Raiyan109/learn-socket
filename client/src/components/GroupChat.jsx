import { Button, Container, TextField } from "@mui/material"
import { useEffect, useMemo, useState } from "react"
import { io } from "socket.io-client"
import { RxAvatar } from "react-icons/rx";
import { useNavigate } from "react-router-dom";
import { GiEntryDoor } from "react-icons/gi";


const GroupChat = () => {
    const [message, setMessage] = useState('')
    const [socketId, setSocketId] = useState('')
    const [showMessage, setShowMessage] = useState([])
    const [users, setUsers] = useState([])
    const socket = useMemo(() => io('http://localhost:3000'), [])
    const navigate = useNavigate();

    useEffect(() => {
        socket.on('connect', () => {
            setSocketId(socket.id)
            console.log('Connected to server', socket.id)
        })

        socket.on('recieve-message', (data) => {
            setShowMessage((prevMessages) => [...prevMessages, data]);
            // localStorage.setItem('message', data.text)
            // const message = localStorage.getItem('message')
            // setShowMessage(message)
        })

        socket.on('newUserResponse', (data) => {
            setUsers(data)
        })

        return () => {
            socket.off('connect')
            socket.off('recieve-message')
            socket.off('newUserResponse')
        }
    }, [socket])

    console.log('new user response', users)


    const handleSubmit = (e) => {
        e.preventDefault()
        if (message.trim() && localStorage.getItem('userName')) {
            socket.emit('send_message', {
                text: message,
                name: localStorage.getItem('userName'),
                id: `${socketId}${Math.random()}`,
                socketId: socketId,
            })
        }
        setMessage('')
    }

    // Leave chat
    const handleLeaveChat = () => {
        localStorage.removeItem('userName');
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
                        {users.map((user) => (
                            <div
                                className="flex flex-row py-4 px-2 justify-center items-center border-b-2" key={user.id}
                            >

                                <p>{user.userName}</p>

                            </div>
                        ))}
                        {/* <div className="flex flex-row py-4 px-2 items-center border-b-2">
                            <div className="w-1/4">
                                <img
                                    src="https://source.unsplash.com/otT2199XwI8/600x600"
                                    className="object-cover h-12 w-12 rounded-full"
                                    alt=""
                                />
                            </div>
                            <div className="w-full">
                                <div className="text-lg font-semibold">Everest Trip 2021</div>
                                <span className="text-gray-500">Hi Sam, Welcome</span>
                            </div>
                        </div> */}
                        {/* <div
                            className="flex flex-row py-4 px-2 items-center border-b-2 border-l-4 border-blue-400"
                        >
                            <div className="w-1/4">
                                <img
                                    src="https://source.unsplash.com/L2cxSuKWbpo/600x600"
                                    className="object-cover h-12 w-12 rounded-full"
                                    alt=""
                                />
                            </div>
                            <div className="w-full">
                                <div className="text-lg font-semibold">MERN Stack</div>
                                <span className="text-gray-500">Lusi : Thanks Everyone</span>
                            </div>
                        </div>
                        <div className="flex flex-row py-4 px-2 items-center border-b-2">
                            <div className="w-1/4">
                                <img
                                    src="https://source.unsplash.com/vpOeXr5wmR4/600x600"
                                    className="object-cover h-12 w-12 rounded-full"
                                    alt=""
                                />
                            </div>
                            <div className="w-full">
                                <div className="text-lg font-semibold">Javascript Indonesia</div>
                                <span className="text-gray-500">Evan : some one can fix this</span>
                            </div>
                        </div>
                        <div className="flex flex-row py-4 px-2 items-center border-b-2">
                            <div className="w-1/4">
                                <img
                                    src="https://source.unsplash.com/vpOeXr5wmR4/600x600"
                                    className="object-cover h-12 w-12 rounded-full"
                                    alt=""
                                />
                            </div>
                            <div className="w-full">
                                <div className="text-lg font-semibold">Javascript Indonesia</div>
                                <span className="text-gray-500">Evan : some one can fix this</span>
                            </div>
                        </div>

                        <div className="flex flex-row py-4 px-2 items-center border-b-2">
                            <div className="w-1/4">
                                <img
                                    src="https://source.unsplash.com/vpOeXr5wmR4/600x600"
                                    className="object-cover h-12 w-12 rounded-full"
                                    alt=""
                                />
                            </div>
                            <div className="w-full">
                                <div className="text-lg font-semibold">Javascript Indonesia</div>
                                <span className="text-gray-500">Evan : some one can fix this</span>
                            </div>
                        </div> */}
                        {/* <!-- end user list --> */}
                    </div>
                    {/* <!-- end chat list --> */}
                    {/* <!-- message --> */}
                    <div className="w-full px-5 flex flex-col justify-between">
                        <div className="flex flex-col mt-5">
                            {showMessage.map((data) => data.name === localStorage.getItem('userName') ? (
                                <div className="flex justify-end mb-4">
                                    <div
                                        className="mr-2 py-3 px-4 bg-blue-400 rounded-bl-3xl rounded-tl-3xl rounded-tr-xl text-white"
                                    >

                                        {data.text}
                                    </div>
                                    {/* <img
                                        src="https://source.unsplash.com/vpOeXr5wmR4/600x600"
                                        className="object-cover h-8 w-8 rounded-full"
                                        alt=""
                                    /> */}
                                    {/* <RxAvatar className="object-cover h-8 w-8 rounded-full" /> */}
                                    <span>you</span>
                                    {/* <span>{data.name}</span> */}
                                </div>
                            ) : (
                                <div className="flex justify-start mb-4">
                                    {/* <img
                                        src="https://source.unsplash.com/vpOeXr5wmR4/600x600"
                                        className="object-cover h-8 w-8 rounded-full"
                                        alt=""
                                    /> */}
                                    {/* <RxAvatar className="object-cover h-8 w-8 rounded-full" /> */}
                                    <span>{data.name}</span>
                                    <div
                                        className="ml-2 py-3 px-4 bg-gray-400 rounded-br-3xl rounded-tr-3xl rounded-tl-xl text-white"
                                    >
                                        {data.text}
                                    </div>
                                </div>
                            ))}
                            <div className="message__status">
                                <p>Someone is typing...</p>
                            </div>

                            {/* <div className="flex justify-end mb-4">
                                <div>
                                    <div
                                        className="mr-2 py-3 px-4 bg-blue-400 rounded-bl-3xl rounded-tl-3xl rounded-tr-xl text-white"
                                    >
                                        Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                                        Magnam, repudiandae.
                                    </div>

                                    <div
                                        className="mt-4 mr-2 py-3 px-4 bg-blue-400 rounded-bl-3xl rounded-tl-3xl rounded-tr-xl text-white"
                                    >
                                        Lorem ipsum dolor sit amet consectetur adipisicing elit.
                                        Debitis, reiciendis!
                                    </div>
                                </div>
                                <img
                                    src="https://source.unsplash.com/vpOeXr5wmR4/600x600"
                                    className="object-cover h-8 w-8 rounded-full"
                                    alt=""
                                />
                            </div>
                            <div className="flex justify-start mb-4">
                                <img
                                    src="https://source.unsplash.com/vpOeXr5wmR4/600x600"
                                    className="object-cover h-8 w-8 rounded-full"
                                    alt=""
                                />
                                <div
                                    className="ml-2 py-3 px-4 bg-gray-400 rounded-br-3xl rounded-tr-3xl rounded-tl-xl text-white"
                                >
                                    happy holiday guys!
                                </div>
                            </div> */}
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

    )
}

export default GroupChat