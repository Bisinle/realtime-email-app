import React from "react";
import { Eye, Pencil, Trash2 } from "lucide-react";

const EmailTable = ({ emails, onView, onEdit, onDelete }) => {
  return (
    <div className="overflow-x-auto relative shadow-md sm:rounded-lg">
      <table className="w-full text-sm text-left text-gray-500">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50">
          <tr>
            <th className="py-3 px-6">Subject</th>
            <th className="py-3 px-6">Sender</th>
            <th className="py-3 px-6">Status</th>
            <th className="py-3 px-6">Date</th>
            <th className="py-3 px-6">Actions</th>
          </tr>
        </thead>
        <tbody>
          {emails.map((email) => (
            <tr key={email._id} className="bg-white border-b hover:bg-gray-50">
              <td className="py-4 px-6">{email.subject}</td>
              <td className="py-4 px-6">{email.sender}</td>
              <td className="py-4 px-6">
                <span
                  className={`px-2 py-1 rounded-full text-xs font-semibold ${
                    email.isRead
                      ? "bg-green-100 text-green-800"
                      : "bg-yellow-100 text-yellow-800"
                  }`}
                >
                  {email.isRead ? "Read" : "Unread"}
                </span>
              </td>
              <td className="py-4 px-6">
                {new Date(email.createdAt).toLocaleDateString()}
              </td>
              <td className="py-4 px-6">
                <div className="flex gap-2">
                  <button
                    onClick={() => onView(email._id)}
                    className="p-1 text-blue-600 hover:bg-blue-50 rounded"
                  >
                    <Eye className="h-5 w-5" />
                  </button>
                  <button
                    onClick={() => onEdit(email._id)}
                    className="p-1 text-green-600 hover:bg-green-50 rounded"
                  >
                    <Pencil className="h-5 w-5" />
                  </button>
                  <button
                    onClick={() => onDelete(email._id)}
                    className="p-1 text-red-600 hover:bg-red-50 rounded"
                  >
                    <Trash2 className="h-5 w-5" />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default EmailTable;
