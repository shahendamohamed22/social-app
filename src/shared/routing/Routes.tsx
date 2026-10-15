
import { createBrowserRouter } from "react-router-dom";
import Home from "../../pages/Home/Home";
import Layout from "../../layouts/Layout";
import AuthLayout from "../../layouts/AuthLayout";
import Login from "../../pages/Auth/Login";
import Register from "../../pages/Auth/Register";
import NotFound from "../../pages/notFound/NotFound";
import AllSuggestions from "../../pages/AllSuggestions/AllSuggestions";

export const routes = createBrowserRouter([
    {
        path: "/", element: <Layout />, children: [
            { path: "/", element: <Home /> },
            { path: "*", element: <NotFound /> },
            { path: "/suggestions", element: <AllSuggestions /> },
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

