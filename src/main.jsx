import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { RouterProvider } from "react-router-dom";
import router from "./router/Router.jsx";
import { Toaster } from "react-hot-toast";
import AppContextProvider from "./contexts/AppContextProvider.jsx";

createRoot(document.getElementById("root")).render(
    <StrictMode>
        <AppContextProvider>
            <RouterProvider router={router} />
            <Toaster />
        </AppContextProvider>
    </StrictMode>
);
