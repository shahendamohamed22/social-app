import { useQuery } from "@tanstack/react-query"
import api from "../../shared/api/axiosRequest"
import SavedCard from "../../components/cards/savedCard/SavedCard";
import type { IPost } from "../../interfaces/post";
import { Skeleton } from "@heroui/react";

export default function Saved() {

    function getSavedPosts() {
        return api.get("users/bookmarks")
    }

    const { data, isLoading } = useQuery({
        queryKey: ["savedPosts"],
        queryFn: getSavedPosts
    })


    const posts = data?.data.data.bookmarks
    return (
        <div className="mx-auto max-w-7xl space-y-4 px-4 py-6">
            <div className="mb-6">
                <h2 className="text-2xl font-bold text-gray-900">
                    Saved Posts
                </h2>
                <p className="mt-1 text-sm font-medium text-gray-500">
                    All the posts you saved in one place.
                </p>
            </div>

            {isLoading ?
                ([1, 2, 3].map(() => <div className="rounded-xl bg-white p-4 shadow-sm space-y-3">
                    <Skeleton className="h-4 w-full rounded-lg" />
                    <Skeleton className="h-4 w-3/4 rounded-lg" />
                    <div className="flex items-center gap-3">
                        <Skeleton className="h-10 w-10 shrink-0 rounded-full" />
                        <div className="space-y-2">
                            <Skeleton className="h-3 w-24 rounded-lg" />
                            <Skeleton className="h-3 w-16 rounded-lg" />
                        </div>
                    </div>
                </div>)) : posts?.length > 0 ? (posts.map((post: IPost) => (
                    <SavedCard key={post._id} post={post} />)))
                    : <h3 className="text-paragraph text-center font-medium">"There is no saved posts yet"</h3>}
        </div>
    )
}
