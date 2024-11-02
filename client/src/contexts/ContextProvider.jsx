import React, { createContext, useContext, useState, useCallback } from "react";
import { axiosApi } from "../axiosClient";
import { redirect, useNavigate } from "react-router-dom";

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

  const [isBadgeOpen, setIsBadgeOpen] = useState(false);
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

  //^handle email read reciept
  const handleMarkAsRead = async (e, emailId, navigate) => {
    e.preventDefault(); // Prevent immediate navigation

    const targetedEmail = emailData.receivedEmails.find(
      (email) => email._id === emailId
    );
    targetedEmail.isRead = true;
    try {
      const res = await axiosApi.put(`/emails/${emailId}`, targetedEmail);
      const filteredNewEmails = newEmails.filter(
        (email) => email._id !== emailId
      );
      setNewEmails(filteredNewEmails);
      setIsBadgeOpen(false);

      navigate(`/inbox/emailDetails/${emailId}`); // Navigate after successful update
    } catch (error) {
      console.error("Error marking email as read:", error);
      navigate(`/inbox/emailDetails/${emailId}`);
    }
  };
  // Context value object
  const contextValue = {
    // Auth state
    currentUser,
    setCurrentUser: updateCurrentUser,
    token,
    setToken: setTokenAndStorage,
    isBadgeOpen,
    setIsBadgeOpen,

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

    //read reciept and fet emails functions
    fetchUserData,
    handleMarkAsRead,
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
