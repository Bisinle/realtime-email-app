import React from "react";
import { Link } from "react-router-dom";
 import {MdDashboard} from "react-icons/md";
import {
  
  IoHome,
  IoDocument,
  IoSettingsSharp,
} from "react-icons/io5";

const SideBar = () => {
  return (
    <aside className="w-64 bg-indigo-700 text-white p-6">
      <div className="mb-8">
        <h2 className="text-2xl font-bold">Your App</h2>
      </div>
      <nav className="flex flex-col gap-2 relative">
        <Link
          to="/dashboard"
          className="flex items-center py-2 px-4 text-gray-300 hover:bg-indigo-600 rounded transition duration-150 ease-in-out"
        >
          <MdDashboard className="text-xl mr-3 flex justify-center items-center text-white" />
          Dashboard
        </Link>
        <Link
          to="/home"
          className="flex items-center py-2 px-4 mt-2 text-gray-300 hover:bg-indigo-600 rounded transition duration-150 ease-in-out"
        >
          <IoHome className="text-xl mr-3 flex justify-center items-center text-white" />
          Home
        </Link>
        <Link
          to="/posts"
          className="flex items-center py-2 px-4 mt-2 text-gray-300 hover:bg-indigo-600 rounded transition duration-150 ease-in-out"
        >
          <IoDocument className="text-xl mr-3 flex justify-center items-center text-white" />
          All-Posts
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
