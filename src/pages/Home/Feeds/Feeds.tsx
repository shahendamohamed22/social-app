import PostCard from "../../../components/cards/posts/PostCard";
import type { IPost } from "../../../interfaces/post";
import { Skeleton } from "@heroui/react";
import useGetPosts from "../../../shared/Hooks/PostHooks/useGetPosts";
import { useContext } from "react";
import { authContext } from "../../../shared/context/AuthContext";
import { useNavigate } from "react-router-dom";
import CreatePost from "../../../components/createPost/CreatePost";

export default function Feeds() {

    const { feeds, feedsIsLoading, isError } = useGetPosts("", "");
    const { logout } = useContext(authContext)
    const navigate = useNavigate()

    if (feedsIsLoading) {
        return [1, 2, 3].map((i) => <div key={i} className="mb-3 space-y-4 rounded-2xl bg-card p-4">
            <div className="flex items-center gap-3">
                <Skeleton className="h-11 w-11 shrink-0 rounded-full" />

                <div className="flex-1 space-y-2">
                    <Skeleton className="h-4 w-32 rounded-lg" />
                    <Skeleton className="h-3 w-20 rounded-lg" />
                </div>
            </div>

            <div className="space-y-2">
                <Skeleton className="h-4 w-full rounded-lg" />
                <Skeleton className="h-4 w-4/5 rounded-lg" />
            </div>

            <Skeleton className="h-48 w-full rounded-xl" />
        </div>)
    }

    if (isError) {
        logout()
        navigate("/auth/login");
    }

    return (
        <>
            <section className="mb-4">
                <CreatePost />
            </section>
            {feeds.map((post: IPost) => <PostCard key={post._id} post={post} />)}
        </>
    )
}
