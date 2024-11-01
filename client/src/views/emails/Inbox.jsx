import React, { useEffect, useState } from "react";
import { Link, Outlet, useLocation } from "react-router-dom";
import { axiosApi } from "../../axiosClient";
import { Mail, Inbox as InboxIcon, Send, Bell } from "lucide-react";
import { useStateContext } from "../../contexts/ContextProvider";
import { io } from "socket.io-client";

function Inbox() {
  const [emailData, setEmailData] = useState({
    userData: null,
    sentEmails: [],
    receivedEmails: [],
  });
  const [loading, setLoading] = useState(true);
  const location = useLocation();

  const fetchUserData = async (userId) => {
    try {
      const res = await axiosApi.get(`/users/${userId}`);
      setEmailData({
        userData: res.data.user,
        sentEmails: res.data.user.sentEmails,
        receivedEmails: res.data.user.receivedEmails,
      });
      setLoading(false);
    } catch (err) {
      console.log(err);
      setLoading(false);
    }
  };

  const { currentUser } = useStateContext();

  useEffect(() => {
    const currentUserId = currentUser?._id;
    const socket = io(`${import.meta.env.VITE_API_BASE_URL}`, {
      transports: ["websocket"],
      reconnection: false,
    });
    socket.emit("join", currentUserId);
    // console.log("Joined room:", currentUserId);
    socket.on("send", (data) => {
      // console.log("New email received:", data);
      setNewEmailsCount((prev) => prev + 1);
      if (Notification.permission === "granted") {
        new Notification("New Email", {
          body: `Subject: ${data.subject}`,
        });
      }
      fetchUserData(currentUserId);
    });

    if (currentUserId) {
      fetchUserData(currentUserId);
    }

    return () => {
      socket.disconnect();
    };
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  const { userData, sentEmails, receivedEmails } = emailData;

  if (!userData) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-gray-500 flex items-center gap-2">
          <Mail className="w-5 h-5" />
          No emails found
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
              <Mail className="w-6 h-6" />
              Email Client
            </h1>
            <div className="flex items-center gap-4">
              <Bell className="w-6 h-6 text-gray-600 hover:text-indigo-600 cursor-pointer" />
            </div>
          </div>
        </div>
      </div>

      {/*//^ Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-lg shadow">
          {/*//^  Navigation Tabs */}
          <div className="border-b border-gray-200">
            <div className="flex gap-4 p-4">
              <Link
                to="receivedEmails"
                className={`flex items-center gap-2 px-6 py-3 rounded-lg font-medium transition-colors ${
                  location.pathname.includes("receivedEmails")
                    ? "bg-indigo-500 text-white"
                    : "text-gray-600 hover:bg-gray-100"
                }`}
              >
                <InboxIcon className="w-5 h-5" />
                Inbox
                {receivedEmails?.length > 0 && (
                  <span className="ml-2 bg-white text-indigo-500 rounded-full px-2 py-1 text-xs">
                    {receivedEmails.length}
                  </span>
                )}
              </Link>
              <Link
                to="sentEmails"
                className={`flex items-center gap-2 px-6 py-3 rounded-lg font-medium transition-colors ${
                  location.pathname.includes("sentEmails")
                    ? "bg-indigo-500 text-white"
                    : "text-gray-600 hover:bg-gray-100"
                }`}
              >
                <Send className="w-5 h-5" />
                Sent
                {sentEmails?.length > 0 && (
                  <span className="ml-2 bg-white text-indigo-500 rounded-full px-2 py-1 text-xs">
                    {sentEmails.length}
                  </span>
                )}
              </Link>
            </div>
          </div>

          {/* Email Content Area */}
          <div className="p-6">
            <Outlet
              context={{
                sentEmails: sentEmails,
                receivedEmails: receivedEmails,
                userData: userData,
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Inbox;
