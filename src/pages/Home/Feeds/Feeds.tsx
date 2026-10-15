import { useQuery } from "@tanstack/react-query";
import PostCard from "../../../components/cards/posts/PostCard";
import type { IPost } from "../../../interfaces/post";
import api from "../../../shared/api/axiosRequest";

export default function Feeds() {

    function getPosts() {
        return api.get("posts?limit=20")
    }

    const { isLoading, data } = useQuery({
        queryKey: ["posts"],
        queryFn: getPosts
    })

    if (isLoading) {
        return 
    }

    return (
        <>
            {data?.data.data.posts.map((post: IPost) => <PostCard key={post._id} post={post} />)}
        </>
    )
}
