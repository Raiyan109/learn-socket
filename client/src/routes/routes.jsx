import { createBrowserRouter } from "react-router-dom";
import Home from "../components/Home";

const routes = createBrowserRouter([
    {
        path: '/',
        element: <Home />
    }
])

export default routes