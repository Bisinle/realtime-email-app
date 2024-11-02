import React from "react";
import { useStateContext } from "../../contexts/ContextProvider";
import { Link, useNavigate } from "react-router-dom";
import { User } from "lucide-react";

function NewEmails({ email, setIsNotificationOpen }) {
  const { handleMarkAsRead } = useStateContext();
  const navigate = useNavigate();

  return (
    <Link
      to={`/inbox/emailDetails/${email._id}`}
      onClick={(e) => handleMarkAsRead(e, email._id, navigate)}
      key={email._id}
      className={`block relative border rounded-lg p-1.5 transition-all duration-200 
        hover:shadow-md transform hover:-translate-y-0.5
        ${
          email.isRead
            ? "bg-white hover:bg-gray-50"
            : "bg-blue-50 hover:bg-blue-100"
        }`}
    >
      <div className="flex items-center gap-1">
        <div className="flex items-center gap-1.5 flex-1">
          <span className="font-semibold text-xs text-black">From: </span>
          <div className="flex items-center gap-1">
            <div className="bg-gray-100 p-1 rounded-full">
              <User className="w-3 h-3 text-black" />
            </div>
            <span className="truncate max-w-[180px] text-black text-xs font-medium">
              {email.sender.name}
            </span>
          </div>
        </div>

        {!email.isRead && (
          <span className="w-1.5 h-1.5 bg-blue-500 rounded-full flex-shrink-0" />
        )}
      </div>

      <p
        className={`text-gray-500 text-xs line-clamp-2 mt-0.5
          ${email.isRead ? "font-normal" : "font-medium"}
        `}
      >
        {email.body}
      </p>
    </Link>
  );
}

export default NewEmails;