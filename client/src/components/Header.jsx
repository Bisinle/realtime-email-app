import React from "react";
import { IoMenu } from "react-icons/io5";
import LogoutButton from "../views/Auth/LogoutButton";
import NotificatinoBadge from "./NotificatinoBadge";

const Header = ({
  userName,

  isSidebarCollapsed,
  setIsSidebarCollapsed,
}) => {
  return (
    <header className="bg-white shadow-md">
      <div className="max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8 flex justify-between items-center">
        <div className="flex items-center">
          <button
            onClick={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
            className="mr-4 p-2 rounded-lg hover:bg-gray-100 lg:hidden"
          >
            <IoMenu className="text-2xl" />
          </button>
          <h1 className="flex flex-col items-start">
            <span className="text-sm font-medium text-indigo-600 mb-1">
              Welcome back
            </span>
            <span className="text-3xl font-bold text-gray-900 leading-tight">
              {userName}
              <span className="inline-block animate-wave ml-2">👋</span>
            </span>
          </h1>
        </div>
        <div className="flex items-center  gap-5">
          <NotificatinoBadge />
          <LogoutButton />
        </div>
      </div>
    </header>
  );
};

export default Header;
