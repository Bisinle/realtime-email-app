import React, { createContext, useContext, useState, useCallback } from "react";
import { axiosApi } from "../axiosClient";

const StateContext = createContext(undefined);

export const ContextProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(() => {
    const savedUser = localStorage.getItem("user");
    return savedUser ? JSON.parse(savedUser) : null;
  });

  //^ email related states
  const [newEmails, setNewEmails] = useState([]);
  const [unreadEmailsCount, setUnreadEmailsCount] = useState(false);
  const [emailData, setEmailData] = useState({
    userData: null,
    sentEmails: [],
    receivedEmails: [],
  });

  const [token, setToken] = useState(
    () => localStorage.getItem("ACCESS_TOKEN") || null
  );

  const [notification, setNotification] = useState("");
  const [loading, setLoading] = useState(false);

  const setTokenAndStorage = useCallback((newToken) => {
    if (newToken) {
      localStorage.setItem("ACCESS_TOKEN", newToken);
      setToken(newToken);
    } else {
      localStorage.removeItem("ACCESS_TOKEN");
      localStorage.removeItem("user");
      setToken(null);
      setCurrentUser(null);
    }
  }, []);

  const updateCurrentUser = useCallback((userData) => {
    if (userData) {
      localStorage.setItem("user", JSON.stringify(userData));
      setCurrentUser(userData);
    }
  }, []);

  // Notification system
  const showNotification = useCallback((message, duration = 2000) => {
    setNotification(message);
    const timer = setTimeout(() => {
      setNotification("");
    }, duration);
    return () => clearTimeout(timer);
  }, []);

  const fetchUserData = async (userId) => {
    try {
      const res = await axiosApi.get(`/users/${userId}`);
      setEmailData({
        userData: res.data.user,
        sentEmails: res.data.user.sentEmails,
        receivedEmails: res.data.user.receivedEmails,
      });
      setLoading(false);
      const unreadEmails = res.data.user.receivedEmails.filter(
        (email) => !email.isRead
      );
      setNewEmails(unreadEmails);
    } catch (err) {
      console.log(err);
    }
  };

  // Context value object
  const contextValue = {
    // Auth state
    currentUser,
    setCurrentUser: updateCurrentUser,
    token,
    setToken: setTokenAndStorage,

    // UI state
    notification,
    showNotification,
    loading,
    setLoading,

    //for the email notification
    newEmails,
    setNewEmails,
    unreadEmailsCount,
    setUnreadEmailsCount,
    emailData,
    setEmailData,

    fetchUserData,
  };

  return (
    <StateContext.Provider value={contextValue}>
      {children}
    </StateContext.Provider>
  );
};

// Custom hook with type checking
export const useStateContext = () => {
  const context = useContext(StateContext);

  if (context === undefined) {
    throw new Error("useStateContext must be used within a ContextProvider");
  }

  return context;
};

// Export the context for testing purposes
export { StateContext };
