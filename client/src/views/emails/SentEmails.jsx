import React from "react";
import { Link, useOutletContext } from "react-router-dom";
import { Clock, User } from "lucide-react";

function SentEmails() {
  const { sentEmails } = useOutletContext();

  if (!sentEmails?.length) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500">No sent emails found</p>
      </div>
    );
  }

 

  return (
    <div className="space-y-4">
      {sentEmails.map((email) => (
        <div
          key={email._id}
          className="bg-white border rounded-lg p-4 hover:shadow-md transition-shadow"
        >
          <div className="flex items-center justify-between mb-2">
            <Link
              to={`/inbox/emailDetails/${email._id}`}
              className="font-medium text-lg"
            >
              {email.subject}
            </Link>
            <span className="text-sm text-gray-500 flex items-center gap-1">
              <Clock className="w-4 h-4" />
              {new Date(email.createdAt).toLocaleDateString()}
            </span>
          </div>
          <div className="text-sm text-gray-600 mb-2">
            <span className="font-medium">To: </span>
            {email.recipients.map((r) => r.name).join(", ")}
          </div>
          <p className="text-gray-700 line-clamp-2">{email.body}</p>
        </div>
      ))}
    </div>
  );
}

export default SentEmails;
