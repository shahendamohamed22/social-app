import { useQuery } from "@tanstack/react-query"
import api from "../../api/axiosRequest"

export default function useUserPosts(userId: string | undefined) {

    // PROFILE POSTS 
    function getUserPosts() {
        return api.get(`users/${userId}/posts`)
    }

    const { data: posts, isLoading: postIsLoading } = useQuery({
        queryKey: ["posts", userId],
        queryFn: getUserPosts,
        select: (data) => data?.data.data.posts,
        enabled: !!userId
    })

    return { posts, postIsLoading }
}