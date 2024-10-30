// import React, { createContext, useState, useContext, useEffect } from "react";
// // import axiosClient from "../axiosClient";
// import { axiosApi } from "../axiosClient";

// const AuthContext = createContext();

// export const getCurrentUser = async () => {
//     try {
//         const response = await axiosApi.get("/user");
//         localStorage.setItem("user", JSON.stringify(response.data));

//         return response.data;
//     } catch (error) {
//         console.error("Failed to fetch user:", error);
//         throw error;
//     }
// };

// export const AuthProvider = ({ children }) => {
//     const [user, setUser] = useState(null);
//     const [loading, setLoading] = useState(true);

//     const fetchCurrentUser = async () => {
//         try {
//             const userData = await getCurrentUser();
//             console.log(userData);
//             setUser(userData);
//         } catch (error) {
//             console.error("Error in Auth context fetching user:", error);
//         } finally {
//             setLoading(false);
//         }
//     };

//     useEffect(() => {
//         fetchCurrentUser();
//     }, []);

//     return (
//         <AuthContext.Provider
//             value={{ user, setUser, fetchCurrentUser, loading }}
//         >
//             {children}
//         </AuthContext.Provider>
//     );
// };

// export const useAuth = () => useContext(AuthContext);

// export default AuthContext;
