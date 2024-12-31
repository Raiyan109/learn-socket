import { createBrowserRouter } from "react-router-dom";
import Home from "../components/Home";
import GroupChat from "../components/GroupChat";

const routes = createBrowserRouter([
    {
        path: '/',
        element: <Home />
    },
    {
        path: '/group-chat',
        element: <GroupChat />
    },
])

export default routes