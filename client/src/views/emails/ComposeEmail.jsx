import React, { useState, useEffect } from "react";
import { axiosApi } from "../../axiosClient";
import { Send, X, Users } from "lucide-react";

function ComposeEmail() {
  const [formData, setFormData] = useState({
    subject: "",
    body: "",
    recipients: [],
  });
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [selectedUsers, setSelectedUsers] = useState([]);

  const currentUser = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axiosApi.get("/users");
        // Filter out current user from the list
        const otherUsers = response.data.users.filter(
          (user) => user._id !== currentUser._id
        );
        setUsers(otherUsers);
      } catch (err) {
        console.error("Error fetching users:", err);
      }
    };
    fetchUsers();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const emailData = {
        sender: currentUser._id,
        recipients: formData.recipients,
        subject: formData.subject,
        body: formData.body,
        isRead: false,
      };

      await axiosApi.post("/emails", emailData);
      // console.log(emailData);

      // Clear form after successful submission
      setFormData({
        subject: "",
        body: "",
        recipients: [],
      });
      setSelectedUsers([]);
    } catch (err) {
      setError(err.response?.data?.message || "Error sending email");
    } finally {
      setLoading(false);
    }
  };

  const handleUserSelect = (user) => {
    if (!formData.recipients.includes(user._id)) {
      setFormData((prev) => ({
        ...prev,
        recipients: [...prev.recipients, user._id],
      }));
      setSelectedUsers((prev) => [...prev, user]);
    }
  };

  const removeRecipient = (userId) => {
    setFormData((prev) => ({
      ...prev,
      recipients: prev.recipients.filter((id) => id !== userId),
    }));
    setSelectedUsers((prev) => prev.filter((user) => user._id !== userId));
  };

  return (
    <div className="max-w-4xl mx-auto p-4">
      <div className="bg-white rounded-lg shadow-sm">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-indigo-600 to-indigo-700 bg-clip-text text-transparent">
            Send a Message to Favorite Person
          </h1>
          <div className="mt-2 flex items-center justify-center gap-2 text-gray-600">
       
          </div>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4 p-6">
          {/* Recipients Selection */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              To:
            </label>
            <div className="relative">
              <select
                className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                onChange={(e) =>
                  handleUserSelect(users.find((u) => u._id === e.target.value))
                }
                value=""
              >
                <option value="">Select recipients...</option>
                {users.map((user) => (
                  <option
                    key={user._id}
                    value={user._id}
                    disabled={formData.recipients.includes(user._id)}
                  >
                    {user.firstName} {user.lastName} ({user.email})
                  </option>
                ))}
              </select>
              <Users className="absolute right-3 top-2.5 h-5 w-5 text-gray-400" />
            </div>

            {/* Selected Recipients Tags */}
            <div className="flex flex-wrap gap-2 mt-2">
              {selectedUsers.map((user) => (
                <span
                  key={user._id}
                  className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-indigo-100 text-indigo-800"
                >
                  {user.firstName} {user.lastName}
                  <button
                    type="button"
                    onClick={() => removeRecipient(user._id)}
                    className="ml-2 focus:outline-none"
                  >
                    <X className="h-4 w-4 text-indigo-600 hover:text-indigo-800" />
                  </button>
                </span>
              ))}
            </div>
          </div>

          {/* Subject */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Subject:
            </label>
            <input
              type="text"
              value={formData.subject}
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  subject: e.target.value,
                }))
              }
              className="mt-1 block w-full p-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              required
            />
          </div>

          {/* Body */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Message:
            </label>
            <textarea
              value={formData.body}
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  body: e.target.value,
                }))
              }
              rows={6}
              className="mt-1 block w-full p-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent resize-none"
              required
            />
          </div>

          {/* Error Message */}
          {error && <div className="text-red-500 text-sm">{error}</div>}

          {/* Submit Button */}
          <div className="flex justify-end">
            <button
              type="submit"
              disabled={loading || formData.recipients.length === 0}
              className="px-4 py-2 bg-indigo-500 text-white rounded-lg hover:bg-indigo-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
            >
              <Send className="h-5 w-5" />
              {loading ? "Sending..." : "Send Email"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default ComposeEmail;
