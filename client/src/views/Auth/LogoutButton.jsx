import React from "react";
import { axiosAuth } from "../../axiosClient";
import { IoIosLogOut } from "react-icons/io";
import { useStateContext } from "../../contexts/ContextProvider";

function LogoutButton() {
  const { setCurrentUser, setToken } = useStateContext();
  const onLogout = (ev) => {
    ev.preventDefault();
    axiosAuth.post("/logout").then(() => {
      setCurrentUser({});
      setToken(null);
      localStorage.removeItem("user");
    });
  };

  return (
    <button
      onClick={onLogout}
      className="flex justify-center items-center gap-2 bg-indigo-500 px-3 py-2 rounded-lg text-white hover:bg-indigo-600"
    >
      <IoIosLogOut className="text-2xl" /> Logout
    </button>
  );
}

export default LogoutButton;
