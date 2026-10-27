import { useQuery } from "@tanstack/react-query"
import api from "../../api/axiosRequest"

export default function useGetComments(postId: string) {
    
    function getcomments(postId: string) {
        return api.get(`posts/${postId}/comments`)
    }
    const { data: comments, isLoading } = useQuery({
        queryKey: ['comments', postId],
        queryFn: () => getcomments(postId),
        select: (data) => data?.data.data.comments,
    })

    return { comments, isLoading }
}