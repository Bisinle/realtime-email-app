import React from "react";
import { Link } from "react-router-dom";
import { MdDashboard } from "react-icons/md";
import { IoHome, IoSettingsSharp, IoChevronBack } from "react-icons/io5";
import { MdEmail } from "react-icons/md";
import { FaPlusCircle } from "react-icons/fa";
import logo from "../assets/logo.png";

const SideBar = ({ isCollapsed, setIsCollapsed }) => {
  return (
    <aside
      className={`${
        isCollapsed ? "w-16" : "w-64"
      } bg-indigo-700 text-white p-6 transition-all duration-300 ease-in-out relative`}
    >
      <button
        onClick={() => setIsCollapsed(!isCollapsed)}
        className="absolute -right-3 top-6 bg-indigo-700 rounded-full p-1 text-white hover:bg-indigo-600 z-50"
      >
        <IoChevronBack
          className={`transform transition-transform duration-300 ${
            isCollapsed ? "rotate-180" : ""
          }`}
        />
      </button>

      <div
        className={`mb-8 flex justify-center transition-all duration-300 ${
          isCollapsed ? "w-8 h-8" : "w-full"
        }`}
      >
        <img
          src={logo}
          alt="Logo"
          className={`rounded-full transition-all duration-300 ${
            isCollapsed ? "w-8 h-8" : "w-48 h-48"
          }`}
        />
      </div>
      <nav
        className={`flex flex-col gap-6 relative mt-8 ${
          isCollapsed ? "items-center" : "items-stretch"
        }`}
      >
        <Link
          to="/dashboard"
          className={`flex items-center ${
            isCollapsed ? "justify-center w-10 h-10 p-0" : "w-full px-4 py-3"
          } text-gray-300 hover:bg-indigo-600 rounded-lg transition-all duration-300 ease-in-out group relative`}
        >
          <MdDashboard
            className={`${
              isCollapsed ? "text-2xl" : "text-xl"
            } text-white transition-all duration-300`}
          />
          <span
            className={`${
              isCollapsed
                ? "opacity-0 absolute left-full ml-3 bg-indigo-800 px-2 py-1 rounded invisible group-hover:visible group-hover:opacity-100"
                : "opacity-100 ml-3"
            } whitespace-nowrap transition-all duration-300`}
          >
            Dashboard
          </span>
        </Link>

        <Link
          to="/inbox/receivedEmails"
          className={`flex items-center ${
            isCollapsed ? "justify-center w-10 h-10 p-0" : "w-full px-4 py-3"
          } text-gray-300 hover:bg-indigo-600 rounded-lg transition-all duration-300 ease-in-out group relative`}
        >
          <MdEmail
            className={`${
              isCollapsed ? "text-2xl" : "text-xl"
            } text-white transition-all duration-300`}
          />
          <span
            className={`${
              isCollapsed
                ? "opacity-0 absolute left-full ml-3 bg-indigo-800 px-2 py-1 rounded invisible group-hover:visible group-hover:opacity-100"
                : "opacity-100 ml-3"
            } whitespace-nowrap transition-all duration-300`}
          >
            Inbox
          </span>
        </Link>

        <Link
          to="/compose-email"
          className={`flex items-center ${
            isCollapsed ? "justify-center w-10 h-10 p-0" : "w-full px-4 py-3"
          } text-gray-300 hover:bg-indigo-600 rounded-full border border-gray-500 transition-all duration-300 ease-in-out group relative`}
        >
          <FaPlusCircle
            className={`${
              isCollapsed ? "text-2xl" : "text-xl"
            } text-white transition-all duration-300`}
          />
          <span
            className={`${
              isCollapsed
                ? "opacity-0 absolute left-full ml-3 bg-indigo-800 px-2 py-1 rounded invisible group-hover:visible group-hover:opacity-100"
                : "opacity-100 ml-3"
            } whitespace-nowrap transition-all duration-300`}
          >
            Compose Email
          </span>
        </Link>

        <Link
          to="/settings"
          className={`flex items-center ${
            isCollapsed ? "justify-center w-10 h-10 p-0" : "w-full px-4 py-3"
          } text-gray-300 hover:bg-indigo-600 rounded-lg transition-all duration-300 ease-in-out group relative`}
        >
          <IoSettingsSharp
            className={`${
              isCollapsed ? "text-2xl" : "text-xl"
            } text-white transition-all duration-300`}
          />
          <span
            className={`${
              isCollapsed
                ? "opacity-0 absolute left-full ml-3 bg-indigo-800 px-2 py-1 rounded invisible group-hover:visible group-hover:opacity-100"
                : "opacity-100 ml-3"
            } whitespace-nowrap transition-all duration-300`}
          >
            Settings
          </span>
        </Link>
      </nav>
    </aside>
  );
};

export default SideBar;
