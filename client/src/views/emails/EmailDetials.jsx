import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { axiosApi } from "../../axiosClient";
import { ArrowLeft, Clock, Mail, User } from "lucide-react";

function EmailDetails() {
  const [email, setEmail] = useState(null);
  const [loading, setLoading] = useState(true);
  const { id } = useParams();
  const navigate = useNavigate();
  const currentUser = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    const fetchEmailDetails = async () => {
      try {
        const response = await axiosApi.get(`/emails/${id}`);
        setEmail(response.data.email);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching email:", error);
        setLoading(false);
      }
    };
console.log(email);

    fetchEmailDetails();
  }, [id]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-indigo-500"></div>
      </div>
    );
  }

  if (!email) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500">Email not found</p>
      </div>
    );
  }

  const isCurrentUserSender = email.sender === currentUser._id;

  return (
    <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-sm">
      {/* Header */}
      <div className="border-b border-gray-200">
        <div className="p-6">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center text-indigo-600 hover:text-indigo-800 mb-4"
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            Back
          </button>

          <h1 className="text-2xl font-bold text-gray-900 mb-4">
            {email.subject}
          </h1>

          <div className="space-y-3">
            {/* Sender Info */}
            <div className="flex items-center text-gray-600">
              <User className="w-5 h-5 mr-3 text-indigo-500" />
              <span className="font-medium mr-2">From:</span>
              <span className="text-gray-800">
                {isCurrentUserSender ? "You" : email.sender.firstName} <span className=" underline">-- {email.sender.email} --</span>
              </span>
            </div>

            {/* Recipient Info */}
            <div className="flex items-center text-gray-600">
              <Mail className="w-5 h-5 mr-3 text-indigo-500" />
              <span className="font-medium mr-2">To:</span>
              <span className="text-gray-800">
                {isCurrentUserSender 
                  ? email.recipients.join(", ")
                  : "You"}
              </span>
            </div>

            {/* Timestamp */}
            <div className="flex items-center text-gray-600">
              <Clock className="w-5 h-5 mr-3 text-indigo-500" />
              <span className="font-medium mr-2">Sent:</span>
              <span className="text-gray-800">
                {new Date(email.createdAt).toLocaleString()}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Email Body */}
      <div className="p-6">
        <div className="prose max-w-none">
          <div className="bg-gray-50 rounded-lg p-6 text-gray-800 whitespace-pre-wrap">
            {email.body}
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="border-t border-gray-200 p-6">
        <div className="flex justify-between items-center">
          <div className="flex items-center text-gray-600">
            <span className="text-sm">
              {email.isRead ? "Read" : "Unread"}
            </span>
          </div>
          <div className="flex gap-4">
            <button
              onClick={() => navigate(-1)}
              className="px-4 py-2 bg-indigo-500 text-white rounded-lg hover:bg-indigo-600 transition-colors flex items-center gap-2"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to {isCurrentUserSender ? "Sent" : "Inbox"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EmailDetails;