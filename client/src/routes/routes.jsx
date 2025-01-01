import { createBrowserRouter } from "react-router-dom";
import Home from "../components/Home";
import GroupChat from "../components/GroupChat";
import PrivateChat from "../components/PrivateChat";
import PrivateChatLogin from "../components/PrivateChatLogin";


const routes = createBrowserRouter([
    {
        path: '/',
        element: <Home />
    },
    {
        path: '/group-chat',
        element: <GroupChat />
    },
    {
        path: '/private-chat-login',
        element: <PrivateChatLogin />
    },
    {
        path: '/private-chat',
        element: <PrivateChat />
    },
])

export default routes