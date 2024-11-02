import React from "react";
import { Link, useOutletContext, useNavigate } from "react-router-dom";
import { Clock, User, Circle, Mail, MailOpen } from "lucide-react";
import { BiCheckDouble } from "react-icons/bi";
import { axiosApi } from "../../axiosClient";
import { useStateContext } from "../../contexts/ContextProvider";

function ReceivedEmails() {
  const { receivedEmails } = useOutletContext();
  const { setNewEmails, newEmails, handleMarkAsRead } = useStateContext();
  const navigate = useNavigate();



  if (!receivedEmails?.length) {
    return (
      <div className="flex items-center justify-center min-h-[200px]">
        <p className="text-gray-500 text-lg">No received emails found</p>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {receivedEmails.map((email) => (
        <Link
          to={`/inbox/emailDetails/${email._id}`}
          onClick={(e) =>
            handleMarkAsRead(e, email._id, receivedEmails, navigate)
          }
          key={email._id}
          className={`block relative border rounded-lg p-4 transition-all duration-200 hover:shadow-md ${
            email.isRead
              ? "bg-white hover:bg-gray-50"
              : "bg-blue-50 hover:bg-blue-100"
          }`}
        >
          {/* Read Status Indicator */}
          <div className="absolute left-4 top-1/2 -translate-y-1/2">
            {email.isRead ? (
              <BiCheckDouble className="w-5 h-5 text-indigo-500" />
            ) : (
              <Circle className="w-4 h-4 fill-blue-600 text-blue-600" />
            )}
          </div>

          {/* Email Content */}
          <div className="ml-8">
            <div className="flex items-center justify-between gap-4 mb-2">
              <span
                className={`font-medium text-lg truncate hover:text-blue-600 transition-colors ${
                  email.isRead ? "text-gray-700" : "text-gray-900"
                }`}
              >
                {email.subject}
              </span>
              <span className="text-sm text-gray-500 flex items-center gap-1.5 whitespace-nowrap">
                <Clock className="w-4 h-4" />
                {new Date(email.createdAt).toLocaleString("en-US", {
                  month: "short",
                  day: "numeric",
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </span>
            </div>

            <div className="flex items-center justify-between gap-4 mb-2">
              <div className="text-sm text-gray-600 flex items-center gap-2">
                <span className="font-medium">From: </span>
                <div className="flex items-center gap-1.5">
                  <User className="w-4 h-4" />
                  <span className="truncate max-w-[200px]">
                    {email.sender.name}
                  </span>
                </div>
              </div>
            </div>

            <p
              className={`text-gray-700 line-clamp-2 ${
                email.isRead ? "font-normal" : "font-medium"
              }`}
            >
              {email.body}
            </p>
          </div>

          {/* Hover Effect */}
          <div className="absolute inset-0 border border-transparent hover:border-blue-300 rounded-lg transition-colors duration-200 pointer-events-none" />
        </Link>
      ))}
    </div>
  );
}

export default ReceivedEmails;
