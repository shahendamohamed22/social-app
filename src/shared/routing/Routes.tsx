
import { createBrowserRouter } from "react-router-dom";
import Home from "../../pages/Home/Home";
import Login from "../../pages/Auth/Login";
import Register from "../../pages/Auth/Register";
import NotFound from "../../pages/notFound/NotFound";
import AllSuggestions from "../../pages/AllSuggestions/AllSuggestions";
import Profile from "../../pages/Profile/Profile";
import Saved from "../../pages/Saved/Saved";
import PostDetails from "../../pages/PostDetails/PostDetails";
import FollwersAndFollowing from "../../pages/FollowersAndFollowing/FollwersAndFollowing";
import ProtectedRoute from "../Guards/ProtectedRoute";
import Layout from "../../layouts/Layout";
import AuthLayout from "../../layouts/AuthLayout";
import Settings from "../../pages/Settings/Settings";
import Notifications from "../../pages/Notifications/Notifications";

export const routes = createBrowserRouter([
    {
        path: "/", element: <Layout />, children: [
            { path: "/", element: <ProtectedRoute><Home /> </ProtectedRoute> },
            { path: "/suggestions", element: <ProtectedRoute><AllSuggestions /></ProtectedRoute> },
            { path: "/profile", element: <ProtectedRoute><Profile /></ProtectedRoute> },
            { path: "/profile/:userId", element: <ProtectedRoute><Profile /> </ProtectedRoute> },
            { path: "/profile/:userId/:type", element: <ProtectedRoute><FollwersAndFollowing /></ProtectedRoute> },
            { path: "/posts/:postId", element: <ProtectedRoute><PostDetails /> </ProtectedRoute> },
            { path: "/saved-posts", element: <ProtectedRoute><Saved /> </ProtectedRoute> },
            { path: "/settings", element: <ProtectedRoute><Settings /> </ProtectedRoute> },
            { path: "/notifications", element: <ProtectedRoute><Notifications /> </ProtectedRoute> },
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

