import type { IPost, IPostsProps } from "../../../interfaces/post"
import PostCard from "../../../components/cards/posts/PostCard"
import CreatePost from "../../../components/createPost/CreatePost"
import { Skeleton } from "@heroui/react"
import useGetPosts from "../../../shared/Hooks/useGetPosts"

export default function Posts({ id, isMyProfile }: IPostsProps) {

    const { posts, postIsLoading } = useGetPosts("", id);

    if (postIsLoading) {
        return <div className="space-y-4 rounded-2xl bg-card p-4">
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
        </div>
    }

    return (
        <>
            {isMyProfile && <CreatePost />}

            {!postIsLoading && posts.length ? (posts.map((post: IPost) => <PostCard key={post._id} post={post} />))
                : <p className="text-paragraph text-center mt-6 font-medium">"There is no posts yet .."</p>}

        </>
    )
}
