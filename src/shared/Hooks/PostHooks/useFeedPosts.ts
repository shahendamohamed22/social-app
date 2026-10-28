import { useQuery } from "@tanstack/react-query"
import api from "../../api/axiosRequest"

export default function useFeedPosts() {


    // FEEDS POSTS 
    function getPosts() {
        return api.get("posts?limit=20")
    }

    const { isLoading: feedsIsLoading, data: feeds, isError } = useQuery({
        queryKey: ["feeds"],
        queryFn: getPosts,
        select: (data) => data?.data.data.posts
    })


    return { feeds, isError, feedsIsLoading }
}