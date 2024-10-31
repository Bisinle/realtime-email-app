import React, { useEffect, useState } from "react";
import { axiosApi } from "../axiosClient";
import { Link, useNavigate } from "react-router-dom";
import { Mail, Send, Inbox, BellRing, ArrowRight } from 'lucide-react';

function Dashaboard() {
  const [stats, setStats] = useState({
    totalEmails: 0,
    sentEmails: [],
    receivedEmails: []
  });
  const navigate = useNavigate();
  const currentUser = JSON.parse(localStorage.getItem('user'));

  useEffect(() => {
    if (currentUser?._id) {
      axiosApi
        .get(`/users/${currentUser._id}`)
        .then((res) => {
          setStats({
            totalEmails: res.data.user.sentEmails.length + res.data.user.receivedEmails.length,
            sentEmails: res.data.user.sentEmails,
            receivedEmails: res.data.user.receivedEmails
          });
        })
        .catch((err) => console.log(err));
    }
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Welcome Section */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">
          Welcome back, {currentUser?.firstName}!
        </h1>
        <p className="mt-2 text-gray-600">
          Here's an overview of your email activity
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {/* Total Emails */}
        <div className="bg-white rounded-lg shadow p-6 border border-gray-200">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-700">Total Emails</h2>
            <Mail className="w-6 h-6 text-indigo-500" />
          </div>
          <p className="text-3xl font-bold text-gray-900">{stats.totalEmails}</p>
          <p className="text-sm text-gray-500 mt-2">All your email activity</p>
        </div>

        {/* Sent Emails */}
        <div className="bg-white rounded-lg shadow p-6 border border-gray-200">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-700">Sent</h2>
            <Send className="w-6 h-6 text-indigo-500" />
          </div>
          <p className="text-3xl font-bold text-gray-900">{stats.sentEmails.length}</p>
          <Link 
            to="/inbox/sentEmails" 
            className="text-sm text-indigo-600 hover:text-indigo-800 mt-2 inline-flex items-center"
          >
            View sent emails
            <ArrowRight className="w-4 h-4 ml-1" />
          </Link>
        </div>

        {/* Received Emails */}
        <div className="bg-white rounded-lg shadow p-6 border border-gray-200">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-700">Received</h2>
            <Inbox className="w-6 h-6 text-indigo-500" />
          </div>
          <p className="text-3xl font-bold text-gray-900">{stats.receivedEmails.length}</p>
          <Link 
            to="/inbox/receivedEmails" 
            className="text-sm text-indigo-600 hover:text-indigo-800 mt-2 inline-flex items-center"
          >
            View received emails
            <ArrowRight className="w-4 h-4 ml-1" />
          </Link>
        </div>
      </div>

      {/* Real-time Email CTA */}
      <div className="bg-gradient-to-r from-indigo-500 to-purple-600 rounded-lg shadow-lg p-8 text-white">
        <div className="flex items-start space-x-4">
          <div className="flex-shrink-0">
            <BellRing className="w-8 h-8" />
          </div>
          <div className="flex-1">
            <h3 className="text-xl font-semibold mb-2">
              Experience Real-Time Email Communication
            </h3>
            <p className="mb-4 text-indigo-100">
              Send emails that are delivered instantly! Our real-time notification system 
              ensures your recipients are notified the moment you hit send.
            </p>
            <button
              onClick={() => navigate('/compose')}
              className="inline-flex items-center px-6 py-3 bg-white text-indigo-600 rounded-lg font-medium hover:bg-indigo-50 transition-colors"
            >
              <Send className="w-5 h-5 mr-2" />
              Compose New Email
            </button>
          </div>
        </div>
      </div>

      {/* Recent Activity or Users List (Optional) */}
      <div className="mt-8">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Recent Contacts</h2>
        <div className="bg-white rounded-lg shadow border border-gray-200">
          <div className="divide-y divide-gray-200">
            {stats.receivedEmails.slice(0, 5).map((email) => (
              <div key={email._id} className="p-4 hover:bg-gray-50">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="ml-3">
                      <p className="text-sm font-medium text-gray-900">
                        {email.sender.name}
                      </p>
                      <p className="text-sm text-gray-500">
                        {email.subject}
                      </p>
                    </div>
                  </div>
                  <span className="text-sm text-gray-500">
                    {new Date(email.createdAt).toLocaleDateString()}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashaboard;