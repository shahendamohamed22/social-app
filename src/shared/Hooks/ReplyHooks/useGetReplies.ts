import { useQuery } from "@tanstack/react-query"
import api from "../../api/axiosRequest"

export default function useGetReplies(postId: string, commentId: string, isReplyOpen: boolean) {
    const { data: replies, isLoading: repliesLoading } = useQuery({
        queryKey: ["replies", postId, commentId],
        queryFn: () =>
            api.get(`posts/${postId}/comments/${commentId}/replies`),
        select: (data) => data.data.data.replies,
        enabled: isReplyOpen
    });

    return { replies, repliesLoading }
}