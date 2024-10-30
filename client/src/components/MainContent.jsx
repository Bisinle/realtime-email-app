import React from "react";
import { Outlet } from "react-router-dom";
// import CreatePostButton from "../views/posts/CreatPostButton";

const MainContent = ({ notification }) => {
  return (
    <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-100">
      {notification && (
        <div className="bg-blue-500 text-white p-4">{notification}</div>
      )}
      <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        {/* <CreatePostButton /> */}
        <Outlet />
      </div>
    </main>
  );
};

export default MainContent;
