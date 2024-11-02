import React, { useState } from "react";
import { Bell } from "lucide-react";
import { useStateContext } from "../contexts/ContextProvider";
import NewEmails from "../views/emails/NewEmails";

function NotificatinoBadge() {
  const { newEmails, setNewEmails,isNotificationOpen,setIsNotificationOpen } = useStateContext();

  return (
    <>
    <div className="border-2 border-indigo-500 p rounded-full">

      <div className="flex items-center gap-4 relative   text-white p-2 rounded  justify-center">
        {newEmails.length === 0 ? (
          0
        ) : (
          <span className="absolute -top-1 -right-1 bg-red-500 text-white rounded-full w-5 h-5 text-xs flex items-center justify-center">
            {newEmails.length}
          </span>
        )}

        <Bell onClick={()=>setIsNotificationOpen(!isNotificationOpen)} className="w-6 h-6 text-gray-600 hover:text-indigo-600 cursor-pointer" />
      </div>
      {/* {isNotificationOpen && <NewEmails />} */}
    </div>
    </>
  );
}

export default NotificatinoBadge;
