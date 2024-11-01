import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useStateContext } from "../contexts/ContextProvider";
import sideImage from "../assets/sideImage.jpg";

export default function GuestLayout() {
  const { token } = useStateContext();
  if (token) {
    return <Navigate to="/" />;
  }
  return (
    <div className="min-h-screen bg-indigo-50 flex flex-col   items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="text-center">
        <h1 className="text-6xl font-bold text-gray-900 mb-2">Me-Maill</h1>
        <p className="text-gray-700">Your Personal Email Assistant</p>
      </div>
      <div className="max-w-6xl w-full flex gap-8 mt-10 items-center">
        <div className="flex-1 max-w-md w-full space-y-8 bg-white p-8 rounded-lg shadow-md">
          <Outlet />
        </div>

        <div className="flex-1 hidden lg:block">
          <div className="w-full h-[600px]  bg-gray-200 rounded-lg flex items-center justify-center">
            <img src={sideImage} alt="" className="w-full rounded-lg h-full" />
          </div>
        </div>
      </div>
    </div>
  );
}
