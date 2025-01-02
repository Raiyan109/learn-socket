import { useEffect } from "react"
import { useState } from "react"
import ScrollToBottom from "react-scroll-to-bottom"


const PrivateChat = ({ socket, username, room }) => {
    const [message, setMessage] = useState('')
    const [messageList, setMessageList] = useState([])

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
                    </div>

                    <div className="bg-gray-300 p-4 flex items-center gap-3">
                        <input className="flex items-center h-10 w-full rounded px-3 text-sm"
                            type="text"
                            placeholder="Type your message…"
                            value={message}
                            onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
                            onChange={(e) => setMessage(e.target.value)} />

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
                {/* <!-- Component End  --> */}

            </div>
            {/* <div className="bg-white border border-slate-200 grid grid-cols-6 gap-2 rounded-xl p-2 text-sm">
                <h1 className="text-center text-slate-800 text-xl font-bold col-span-6">Send Message</h1>
                <input
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Type your message..." className="bg-slate-100 text-slate-600 h-28 placeholder:text-slate-600 placeholder:opacity-50 border border-slate-200 col-span-6 resize-none outline-none rounded-lg p-2 duration-300 focus:border-slate-600" />
                <button className="fill-slate-600 col-span-1 flex justify-center items-center rounded-lg p-2 duration-300 bg-slate-100 hover:border-slate-600 focus:fill-blue-200 focus:bg-blue-400 border border-slate-200">
                    <svg xmlns="http://www.w3.org/2000/svg" height="20px" viewBox="0 0 512 512">
                        <path d="M464 256A208 208 0 1 0 48 256a208 208 0 1 0 416 0zM0 256a256 256 0 1 1 512 0A256 256 0 1 1 0 256zm177.6 62.1C192.8 334.5 218.8 352 256 352s63.2-17.5 78.4-33.9c9-9.7 24.2-10.4 33.9-1.4s10.4 24.2 1.4 33.9c-22 23.8-60 49.4-113.6 49.4s-91.7-25.5-113.6-49.4c-9-9.7-8.4-24.9 1.4-33.9s24.9-8.4 33.9 1.4zM144.4 208a32 32 0 1 1 64 0 32 32 0 1 1 -64 0zm192-32a32 32 0 1 1 0 64 32 32 0 1 1 0-64z"></path>
                    </svg>
                </button>
                <button className="fill-slate-600 col-span-1 flex justify-center items-center rounded-lg p-2 duration-300 bg-slate-100 hover:border-slate-600 focus:fill-blue-200 focus:bg-blue-400 border border-slate-200">
                    <svg xmlns="http://www.w3.org/2000/svg" height="20px" viewBox="0 0 512 512">
                        <path d="M464 256A208 208 0 1 0 48 256a208 208 0 1 0 416 0zM0 256a256 256 0 1 1 512 0A256 256 0 1 1 0 256zM174.6 384.1c-4.5 12.5-18.2 18.9-30.7 14.4s-18.9-18.2-14.4-30.7C146.9 319.4 198.9 288 256 288s109.1 31.4 126.6 79.9c4.5 12.5-2 26.2-14.4 30.7s-26.2-2-30.7-14.4C328.2 358.5 297.2 336 256 336s-72.2 22.5-81.4 48.1zM144.4 208a32 32 0 1 1 64 0 32 32 0 1 1 -64 0zm192-32a32 32 0 1 1 0 64 32 32 0 1 1 0-64z"></path></svg>
                </button>
                <span className="col-span-2"></span>
                <button
                    onClick={sendMessage}
                    className="bg-slate-100 stroke-slate-600 border border-slate-200 col-span-2 flex justify-center rounded-lg p-2 duration-300 hover:border-slate-600 hover:text-white focus:stroke-blue-200 focus:bg-blue-400">
                    <svg fill="none" viewBox="0 0 24 24" height="30px" width="30px" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinejoin="round" strokeLinecap="round" strokeWidth="1.5" d="M7.39999 6.32003L15.89 3.49003C19.7 2.22003 21.77 4.30003 20.51 8.11003L17.68 16.6C15.78 22.31 12.66 22.31 10.76 16.6L9.91999 14.08L7.39999 13.24C1.68999 11.34 1.68999 8.23003 7.39999 6.32003Z"></path>
                        <path strokeLinejoin="round" strokeLinecap="round" strokeWidth="1.5" d="M10.11 13.6501L13.69 10.0601"></path>
                    </svg>
                </button>

            </div> */}
            {/* <div className="chat-header">
                <p>Live chat</p>
            </div>
            <div className="chat-body"></div>
            <div className="chat-footer">
                <input type="text" placeholder="Type a message" />
                <button>Send</button>
            </div> */}
        </div>
    )
}

export default PrivateChat