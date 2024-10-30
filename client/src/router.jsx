import { createBrowserRouter, Navigate } from "react-router-dom";
import Login from "./views/Auth/Login";
import Signup from "./views/Auth/Signup";
import NotFound from "./views/NotFound";
import DefaultLayout from "./components/DefaultLayout";
import GuestLayout from "./components/GuestLayout";
import DashBoard from "./views/DashBoard";

import Settings from "./views/Settings";

import ForgotPassword from "./views/Auth/ForgotPassword";

const router = createBrowserRouter([
    {
        path: "/",
        element: <DefaultLayout />,
        children: [
            {
                path: "/",
                element: <Navigate to="/dashBoard" />,
            },
            {
                path: "/dashBoard",
                element: <DashBoard />,
            },
            
            {
                path: "/settings",
                element: <Settings />,
            },
            {
                path: "/*",
                element: <NotFound />,
            },
        ],
    },
    {
        path: "/",
        element: <GuestLayout />,
        children: [
            {
                path: "/login",
                element: <Login />,
            },
            {
                path: "/signup",
                element: <Signup />,
            },
            {
                path: "/forgot-password",
                element: <ForgotPassword />,
            },
        ],
    },

   
]);

export default router;
