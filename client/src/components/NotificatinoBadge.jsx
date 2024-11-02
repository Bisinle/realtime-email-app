import React, { useEffect, useState } from "react";
import { Bell } from "lucide-react";
import { useStateContext } from "../contexts/ContextProvider";
import NewEmails from "../views/emails/NewEmails";

function NotificatinoBadge() {
  const { newEmails } = useStateContext();

  return (
    <div className="relative">
      <button
        // onClick={() => setIsNotificationOpen(!isNotificationOpen)}
        className="relative group flex items-center justify-center w-10 h-10 rounded-full 
                   bg-white shadow-sm border border-gray-200 hover:bg-gray-50 
                   transition-all duration-200 hover:shadow-md"
      >
        {/* Notification Count Badge */}
        {newEmails.length > 0 && (
          <span
            className="absolute -top-1 -right-1 w-5 h-5 flex items-center justify-center
                         bg-red-500 text-white text-xs font-medium rounded-full
                         transform transition-transform duration-200 
                         group-hover:scale-110 animate-in
                         shadow-sm"
          >
            {newEmails.length}
          </span>
        )}

        {/* Bell Icon */}
        <Bell
          className="w-5 h-5 text-gray-600 group-hover:text-indigo-600 
                        transition-colors duration-200"
        />

        {/* Focus Ring */}
        <span
          className="absolute inset-0 rounded-full border-2 border-transparent 
                       group-focus-visible:border-indigo-500 group-focus-visible:ring-2 
                       group-focus-visible:ring-indigo-500 group-focus-visible:ring-offset-2"
        />
      </button>

      {/* Optional hover/active state indicator */}
      <span
        className="absolute -inset-0.5 rounded-full bg-gray-50/50 opacity-0 
                     group-hover:opacity-100 -z-10 transition-opacity duration-200"
      />

      {/* Notification Panel Mount Point */}
      {/* {isNotificationOpen && <NewEmails />} */}
    </div>
  );
}

export default NotificatinoBadge;
