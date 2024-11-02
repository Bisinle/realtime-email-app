import React from "react";
import { useStateContext } from "../../contexts/ContextProvider";
import { Link } from "react-router-dom";
import { Circle, Clock, User } from "lucide-react";
import { BiCheckDouble } from "react-icons/bi";

function NewEmails({ email }) {
  return (
    <Link
      to={`/inbox/emailDetails/${email._id}`}
      onClick={(e) => handleEmailClick(e, email._id)}
      key={email._id}
      className={`block relative border rounded-lg p-4 transition-all duration-200 hover:shadow-md ${
        email.isRead
          ? "bg-white hover:bg-gray-50"
          : "bg-blue-50 hover:bg-blue-100"
      }`}
    >
    
          <div className="text-sm text-gray-600 flex items-center gap-2">
            <span className="font-medium text-black">From: </span>
            <div className="flex items-center gap-1.5">
              <User className="w-4 h-4 text-black" />
              <span className="truncate max-w-[200px] text-black">
                {email.sender.name}
              </span>
            </div>
          </div>
       

        <p
          className={`text-gray-500 line-clamp-2 ${
            email.isRead ? "font-normal" : "font-medium"
          }`}
        >
          {email.body}
        </p>
 

      {/* Hover Effect */}
      <div className="absolute inset-0 border border-transparent hover:border-blue-300 rounded-lg transition-colors duration-200 pointer-events-none" />
    </Link>
  );
}

export default NewEmails;
