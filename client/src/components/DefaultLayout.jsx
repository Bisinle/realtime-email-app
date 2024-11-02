import React, { useState } from "react";
import { Navigate } from "react-router-dom";
import { useStateContext } from "../contexts/ContextProvider";
import SideBar from "./SideBar";
import Header from "./Header";
import MainContent from "./MainContent";
import { de } from "date-fns/locale";
import { axiosAuth, axiosApi } from "../axiosClient";

export default function DefaultLayout() {
  const { currentUser, token, setCurrentUser, setToken, notification } =
    useStateContext();
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

  if (!token) {
    return <Navigate to="/login" />;
  }

  const onLogout = (ev) => {
    ev.preventDefault();
    axiosAuth.post("/logout").then(() => {
      setCurrentUser({});
      setToken(null);
      localStorage.removeItem("user");
    });
  };

  return (
    <div className="flex h-screen bg-gray-100">
      <SideBar isCollapsed={isSidebarCollapsed} setIsCollapsed={setIsSidebarCollapsed} />
      <div className="z-10 flex-1 h-full overflow-y-auto focus:outline-none">
        <Header 
          userName={currentUser.firstName} 
          onLogout={onLogout}
          isSidebarCollapsed={isSidebarCollapsed}
          setIsSidebarCollapsed={setIsSidebarCollapsed}
        />
        <MainContent notification={notification} />
      </div>
    </div>
  );
}
