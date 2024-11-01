import React from "react";
import { Link } from "react-router-dom";
import { MdDashboard } from "react-icons/md";
import { IoHome, IoDocument, IoSettingsSharp } from "react-icons/io5";
import { FaPlusCircle } from "react-icons/fa";
import logo from "../assets/logo.png";

const SideBar = () => {
  return (
    <aside className="w-64 bg-indigo-700 text-white p-6">
      <div className="mb-8 w-full flex justify-center">
        <img src={logo} alt="Logo" className="w-48 h-48 rounded-full" />
      </div>
      <nav className="flex flex-col gap-2 relative">
        <Link
          to="/dashboard"
          className="flex items-center py-2 px-4 mt-2 text-gray-300 hover:bg-indigo-600 rounded transition duration-150 ease-in-out"
        >
          <IoHome className="text-xl mr-3 flex justify-center items-center text-white" />
          Dashboard
        </Link>
        <Link
          to="/inbox/receivedEmails"
          className="flex items-center py-2 px-4 text-gray-300 hover:bg-indigo-600 rounded transition duration-150 ease-in-out"
        >
          <MdDashboard className="text-xl mr-3 flex justify-center items-center text-white" />
          Inbox
        </Link>
        <Link
          to="/compose-email"
          className="flex items-center border  py-2 px-4 mt-2 text-gray-300 hover:bg-indigo-600 rounded-full transition duration-150 ease-in-out"
        >
          <FaPlusCircle className="text-xl mr-3 flex justify-center items-center text-white" />
          Compose Email
        </Link>
        <Link
          to="/settings"
          className="flex items-center py-2 px-4 mt-2 text-gray-300 hover:bg-indigo-600 rounded transition duration-150 ease-in-out"
        >
          <IoSettingsSharp className="text-xl mr-3 flex justify-center items-center text-white" />
          Settings
        </Link>
      </nav>
    </aside>
  );
};

export default SideBar;
