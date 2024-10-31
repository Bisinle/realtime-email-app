import { createBrowserRouter, Navigate } from "react-router-dom";
import Login from "./views/Auth/Login";
import Signup from "./views/Auth/Signup";
import NotFound from "./views/NotFound";
import DefaultLayout from "./components/DefaultLayout";
import GuestLayout from "./components/GuestLayout";
import DashBoard from "./views/emails/Inbox";

import Settings from "./views/Settings";

import ForgotPassword from "./views/Auth/ForgotPassword";
import Inbox from "./views/emails/Inbox";
import SentEmails from "./views/emails/SentEmails";
import ReceivedEmails from "./views/emails/ReceivedEmails";
import EmailDetials from "./views/emails/EmailDetials";
import ComposeEmail from "./views/emails/ComposeEmail";
import Dashaboard from "./views/Dashboard";

const router = createBrowserRouter([
  {
    path: "/",
    element: <DefaultLayout />,
    children: [
      {
        path: "/",
        element: <Navigate to="/inbox/receivedEmails" />,
      },
      {
        path: "/inbox",
        element: <Inbox />,
        children: [
          {
            path: "sentEmails",
            element: <SentEmails />,
          },
          {
            path: "receivedEmails",
            element: <ReceivedEmails />,
          },
          {
            path: "emailDetails/:id",
            element: <EmailDetials />,
          },
        ],
      },
      {
        path: "/dashboard",
        element: <Dashaboard />,
      },
      {
        path: "/compose-email",
        element: <ComposeEmail />,
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
