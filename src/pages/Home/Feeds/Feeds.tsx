import { useQuery } from "@tanstack/react-query";
import PostCard from "../../../components/cards/posts/PostCard";
import type { IPost } from "../../../interfaces/post";
import api from "../../../shared/api/axiosRequest";
import { Skeleton } from "@heroui/react";

export default function Feeds() {

    function getPosts() {
        return api.get("posts?limit=20")
    }

    const { isLoading, data } = useQuery({
        queryKey: ["feeds"],
        queryFn: getPosts
    })

    if (isLoading) {
        return [1, 2, 3].map(() => <div className="mb-3 space-y-4 rounded-2xl bg-card p-4">
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

    return (
        <>
            {data?.data.data.posts.map((post: IPost) => <PostCard key={post._id} post={post} />)}
        </>
    )
}
