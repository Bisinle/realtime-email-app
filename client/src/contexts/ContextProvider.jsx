import React, {
    createContext,
    useContext,
    useState,
    useCallback,
    useEffect,
} from "react";

const StateContext = createContext(null);

export const ContextProvider = ({ children }) => {
    const [currentUser, setCurrentUser] = useState({});
    const [token, setToken] = useState(localStorage.getItem("ACCESS_TOKEN"));
    const [notification, setNotification] = useState("");
    const [userPosts, setUserPosts] = useState({});
    const [loading, setLoading] = useState(true);

    const setTokenAndStorage = useCallback((newToken) => {
        setToken(newToken);
        if (newToken) {
            localStorage.setItem("ACCESS_TOKEN", newToken);
        } else {
            localStorage.removeItem("ACCESS_TOKEN");
        }
    }, []);

    const showNotification = useCallback((message) => {
        setNotification(message);
        setTimeout(() => setNotification(""), 2000);
    }, []);

    const updateUserPosts = useCallback((posts) => {
        setUserPosts(posts);
        // setLoading(!posts);
    }, []);

    const contextValue = {
        currentUser,
        setCurrentUser,
        token,
        setToken: setTokenAndStorage,
        notification,
        showNotification,
        userPosts,
        setUserPosts: updateUserPosts,
        loading,
        setLoading,
    };

    return (
        <StateContext.Provider value={contextValue}>
            {children}
        </StateContext.Provider>
    );
};

export const useStateContext = () => {
    const context = useContext(StateContext);
    if (!context) {
        throw new Error(
            "useStateContext must be used within a ContextProvider"
        );
    }
    return context;
};
