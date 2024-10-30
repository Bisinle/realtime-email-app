import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
// import App from "./App.jsx";
import "./index.css";
import { RouterProvider } from "react-router-dom";
import router from "./router.jsx";
import { ContextProvider } from "./contexts/ContextProvider.jsx";
// import { AuthProvider } from "./contexts/Auth.jsx";

createRoot(document.getElementById("root")).render(
    <StrictMode>
        {/* <AuthProvider> */}
            <ContextProvider>
                <RouterProvider router={router} />
            </ContextProvider>
        {/* </AuthProvider> */}
    </StrictMode>
);
