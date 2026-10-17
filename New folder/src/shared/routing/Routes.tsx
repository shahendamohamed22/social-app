
import { createBrowserRouter } from "react-router-dom";
import Home from "../../pages/Home/Home";
import Layout from "../../layouts/Layout";
import AuthLayout from "../../layouts/AuthLayout";
import Login from "../../pages/Auth/Login";
import Register from "../../pages/Auth/Register";
import NotFound from "../../pages/notFound/NotFound";
import AllSuggestions from "../../pages/AllSuggestions/AllSuggestions";
import Profile from "../../pages/Profile/Profile";
import Saved from "../../pages/Saved/Saved";

export const routes = createBrowserRouter([
    {
        path: "/", element: <Layout />, children: [
            { path: "/", element: <Home /> },
            { path: "/suggestions", element: <AllSuggestions /> },
            { path: "/profile", element: <Profile /> },
            { path: "/profile/:userId", element: <Profile /> },
            { path: "/saved-posts", element: <Saved /> },
            { path: "*", element: <NotFound /> },
        ]
    },

    {
        path: "auth", element: <AuthLayout />, children: [
            { index: true, element: <Login /> },
            { path: "login", element: <Login /> },
            { path: "register", element: <Register /> },
            { path: "*", element: <NotFound /> },
        ]
    },


])

