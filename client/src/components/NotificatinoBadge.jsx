import React, { useEffect, useState, useRef } from "react";
import { Bell } from "lucide-react";
import { useStateContext } from "../contexts/ContextProvider";
import NewEmails from "../views/emails/NewEmails";

function NotificationBadge() {
  const { newEmails, setNewEmails, isBadgeOpen, setIsBadgeOpen } = useStateContext();
  const dropdownRef = useRef(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsBadgeOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleMarkAsRead = (emailId) => {
    setNewEmails(newEmails.filter((email) => email.id !== emailId));
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsBadgeOpen(!isBadgeOpen)}
        className="relative group flex items-center justify-center w-10 h-10 rounded-full 
                   bg-white shadow-sm border border-gray-200 hover:bg-gray-50 
                   transition-all duration-200 hover:shadow-md"
      >
        {newEmails.length > 0 && (
          <span
            className="absolute -top-1 -right-1 w-5 h-5 flex items-center justify-center
                         bg-red-500 text-white text-xs font-medium rounded-full
                         transform transition-transform duration-200 
                         group-hover:scale-110 animate-in shadow-sm"
          >
            {newEmails.length}
          </span>
        )}

        <Bell
          className="w-5 h-5 text-gray-600 group-hover:text-indigo-600 
                        transition-colors duration-200"
        />

        <span
          className="absolute inset-0 rounded-full border-2 border-transparent 
                       group-focus-visible:border-indigo-500 group-focus-visible:ring-2 
                       group-focus-visible:ring-indigo-500 group-focus-visible:ring-offset-2"
        />
      </button>

      <span
        className="absolute -inset-0.5 rounded-full bg-gray-50/50 opacity-0 
                     group-hover:opacity-100 -z-10 transition-opacity duration-200"
      />

      {/* Notification Dropdown */}
      {isBadgeOpen && (
        <div className="absolute right-0 mt-2 w-80 bg-white rounded-lg shadow-lg border border-gray-200 z-50">
          <div className="p-4 border-b border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900">
              Notifications
            </h3>
            <p className="text-sm text-gray-500">
              You have {newEmails.length} unread messages
            </p>
          </div>

          <div className="max-h-96 overflow-y-auto">
            {newEmails.length === 0 ? (
              <div className="p-4 text-center text-gray-500">
                No new notifications
              </div>
            ) : (
              <div className="divide-y divide-gray-200">
                {newEmails.map((email) => (
                  <NewEmails
                    key={email.id}
                    email={email}
                  />
                ))}
              </div>
            )}
          </div>

          
        </div>
      )}
    </div>
  );
}

export default NotificationBadge;
