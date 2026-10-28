import { useQuery } from "@tanstack/react-query"
import api from "../../api/axiosRequest"

export default function useGetPost(postId: string | undefined) {

    // SINGLE POST
    function getPostDetails() {
        return api.get(`posts/${postId}`)
    }
    const { data: post, isLoading: PostDetailsIsLoading } = useQuery({
        queryKey: ['post', postId],
        queryFn: getPostDetails,
        select: (data) => data.data.data.post
    })

    return { post, PostDetailsIsLoading }
}