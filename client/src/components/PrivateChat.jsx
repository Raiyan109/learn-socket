import { useEffect } from "react"
import { useState } from "react"
import ScrollToBottom from "react-scroll-to-bottom"


const PrivateChat = ({ socket, username, room }) => {
    const [message, setMessage] = useState('')
    const [messageList, setMessageList] = useState([])
    const [typingUsers, setTypingUsers] = useState([]);
    const [typingTimeout, setTypingTimeout] = useState(null);

    const sendMessage = async () => {
        if (message !== '') {
            const messageData = {
                room: room,
                author: username,
                message: message,
                time: new Date(Date.now()).getHours() + ':' + new Date(Date.now()).getMinutes()
            }
            await socket.emit('send-private-message', messageData)
            setMessageList((list) => [...list, messageData])
            setMessage('')
        }
    }

    const handleTyping = () => {
        socket.emit('user-typing', { room, username });
    };

    const handleStopTyping = () => {
        socket.emit('stop-typing', { room, username });
    };

    const handleInputChange = (e) => {
        setMessage(e.target.value);

        if (typingTimeout) {
            clearTimeout(typingTimeout);
        }

        handleTyping();

        // Emit stop-typing event after 2 seconds of no typing
        setTypingTimeout(setTimeout(() => {
            handleStopTyping();
        }, 2000));
    };

    useEffect(() => {
        const showTyping = ({ username }) => {
            setTypingUsers((users) => [...new Set([...users, username])]);
        };

        const hideTyping = ({ username }) => {
            setTypingUsers((users) => users.filter((user) => user !== username));
        };

        socket.on('show-typing', showTyping);
        socket.on('hide-typing', hideTyping);

        return () => {
            socket.off('show-typing', showTyping);
            socket.off('hide-typing', hideTyping);
        };
    }, [socket]);

    useEffect(() => {
        const handleReceiveMessage = (data) => {
            console.log('🔥: A user received a private message', data);
            setMessageList((list) => [...list, data]);
        };

        // Add listener
        socket.on('recieve-private-message', handleReceiveMessage);

        // Cleanup function to avoid duplicate listeners
        return () => {
            socket.off('recieve-private-message', handleReceiveMessage);
        };
    }, [socket]);



    return (
        <div>
            <div className="flex flex-col items-center justify-center w-screen min-h-screen bg-gray-100 text-gray-800 p-10">

                {/* <!-- Component Start --> */}
                <div className="flex flex-col flex-grow w-full max-w-xl bg-white shadow-xl rounded-lg overflow-hidden">
                    <div className="flex flex-col flex-grow h-0 p-4 overflow-auto">
                        {/* <!-- Chat Messages --> */}
                        <ScrollToBottom className="message-scroll-to-bottom">
                            {messageList.map((messageContent, index) =>
                                username !== messageContent.author ? (
                                    <div className="flex w-full mt-2 space-x-3 max-w-xs">
                                        <div className="flex-shrink-0 h-10 w-10 rounded-full bg-gray-300"></div>
                                        <div>
                                            <div className="bg-gray-300 p-3 rounded-r-lg rounded-bl-lg">
                                                <p className="text-sm">{messageContent.message}</p>
                                            </div>
                                            <div className="flex justify-between mt-1">
                                                <span className="text-xs text-gray-500 leading-none">{messageContent.time}</span>
                                                <span className="text-xs text-gray-900 leading-none font-bold">{messageContent.author}</span>
                                            </div>
                                        </div>
                                    </div>
                                ) : (
                                    <div className="flex w-full mt-2 space-x-3 max-w-xs ml-auto justify-end">
                                        <div>
                                            <div className="bg-blue-600 text-white p-3 rounded-l-lg rounded-br-lg">
                                                <p className="text-sm">{messageContent.message}</p>
                                            </div>
                                            <div className="flex justify-between mt-1">
                                                <span className="text-xs text-gray-500 leading-none">{messageContent.time}</span>
                                                <span className="text-xs text-gray-900 leading-none font-bold">{messageContent.author}</span>
                                            </div>
                                        </div>
                                        <div className="flex-shrink-0 h-10 w-10 rounded-full bg-gray-300"></div>
                                    </div>
                                )

                            )}
                        </ScrollToBottom>
                        {/* <div className="flex w-full mt-2 space-x-3 max-w-xs">
                            <div className="flex-shrink-0 h-10 w-10 rounded-full bg-gray-300"></div>
                            <div>
                                <div className="bg-gray-300 p-3 rounded-r-lg rounded-bl-lg">
                                    <p className="text-sm">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. </p>
                                </div>
                                <span className="text-xs text-gray-500 leading-none">2 min ago</span>
                            </div>
                        </div>

                        <div className="flex w-full mt-2 space-x-3 max-w-xs ml-auto justify-end">
                            <div>
                                <div className="bg-blue-600 text-white p-3 rounded-l-lg rounded-br-lg">
                                    <p className="text-sm">Lorem ipsum dolor sit amet.</p>
                                </div>
                                <span className="text-xs text-gray-500 leading-none">2 min ago</span>
                            </div>
                            <div className="flex-shrink-0 h-10 w-10 rounded-full bg-gray-300"></div>
                        </div> */}
                        {/* Typing indicator */}
                        <div className="typing-indicator">
                            {typingUsers.length > 0 && (
                                <p className="text-sm text-gray-500">
                                    {typingUsers.join(', ')} {typingUsers.length === 1 ? 'is' : 'are'} typing...
                                </p>
                            )}
                        </div>
                    </div>



                    <div className="bg-gray-300 p-4 flex items-center gap-3">
                        <input className="flex items-center h-10 w-full rounded px-3 text-sm"
                            type="text"
                            placeholder="Type your message…"
                            value={message}
                            onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
                            onChange={handleInputChange} />

                        <button
                            onClick={sendMessage}

                            className="flex items-center bg-blue-500 text-white gap-1 px-4 py-2 cursor-pointer text-gray-800 font-semibold tracking-widest rounded-md hover:bg-blue-400 duration-300 hover:gap-2 hover:translate-x-3"
                        >
                            Send
                            <svg
                                className="w-5 h-5"
                                stroke="currentColor"
                                strokeWidth="1.5"
                                viewBox="0 0 24 24"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    d="M6 12 3.269 3.125A59.769 59.769 0 0 1 21.485 12 59.768 59.768 0 0 1 3.27 20.875L5.999 12Zm0 0h7.5"
                                    strokeLinejoin="round"
                                    strokeLinecap="round"
                                ></path>
                            </svg>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default PrivateChat