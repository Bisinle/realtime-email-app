// src/components/Inbox/Inbox.jsx
import React, { useEffect, useState } from "react";
import { Link, Outlet, useLocation } from "react-router-dom";
import { axiosApi } from "../../axiosClient";
import { Mail, Inbox as InboxIcon, Send } from 'lucide-react';

function Inbox() {
  const [userData, setUserData] = useState(null);
  const [currentUserSentEmails, setCurrentUserSentEmails] = useState(null);
  const [currentUsserReceivedEmails, setCurrentUsserReceivedEmails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("received");
  const location = useLocation();

  useEffect(() => {
    const currentUser = JSON.parse(localStorage.getItem("user"));
    const currentUserId = currentUser?._id;

    if (currentUserId) {
      axiosApi
        .get(`/users/${currentUserId}`)
        .then((res) => {
          setUserData(res.data.user);
          setCurrentUserSentEmails(res.data.user.sentEmails);
          setCurrentUsserReceivedEmails(res.data.user.receivedEmails);
          setLoading(false);
        })
        .catch((err) => {
          console.log(err);
          setLoading(false);
        });
    }
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

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
              <span className="text-gray-600">
                Welcome, {userData.firstName}
              </span>
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
                  location.pathname.includes('receivedEmails')
                    ? 'bg-indigo-500 text-white'
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                <InboxIcon className="w-5 h-5" />
                Inbox
                {currentUsserReceivedEmails?.length > 0 && (
                  <span className="ml-2 bg-white text-indigo-500 rounded-full px-2 py-1 text-xs">
                    {currentUsserReceivedEmails.length}
                  </span>
                )}
              </Link>
              <Link
                to="sentEmails"
                className={`flex items-center gap-2 px-6 py-3 rounded-lg font-medium transition-colors ${
                  location.pathname.includes('sentEmails')
                    ? 'bg-indigo-500 text-white'
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                <Send className="w-5 h-5" />
                Sent
                {currentUserSentEmails?.length > 0 && (
                  <span className="ml-2 bg-white text-indigo-500 rounded-full px-2 py-1 text-xs">
                    {currentUserSentEmails.length}
                  </span>
                )}
              </Link>
            </div>
          </div>

          {/* Email Content Area */}
          <div className="p-6">
            <Outlet context={{ 
              sentEmails: currentUserSentEmails, 
              receivedEmails: currentUsserReceivedEmails,
              userData: userData 
            }} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Inbox;