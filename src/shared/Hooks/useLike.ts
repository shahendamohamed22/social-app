import { useMutation, useQuery } from "@tanstack/react-query";
import api from "../api/axiosRequest";
import { queryClient } from "../../App";

export default function useLike(postId: string) {

    function likePost() {
        return api.put(`posts/${postId}/like`)
    }
    const { mutate: like, isPending: likeIsPending, isSuccess: likeIsSuccess } = useMutation({
        mutationFn: likePost,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["feeds"] });
            queryClient.invalidateQueries({ queryKey: ["posts"] });
            queryClient.invalidateQueries({ queryKey: ["post", postId] });
        }
    })


    function getPostsLikes() {
        return api.get(`/posts/${postId}/likes`)
    }

    const { data: postLikes, isLoading: postLikesLoading } = useQuery({
        queryKey: ['likes', postId],
        queryFn: getPostsLikes,
        select: (data) => data.data.data.likes
    })

    function likeComm(commentId: string) {
        return api.put(`posts/${postId}/comments/${commentId}/like`)
    }
    const { mutate: likeComment, isSuccess: likeCommentIsSuccess } = useMutation({
        mutationFn: likeComm,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["post", postId] });
            queryClient.invalidateQueries({ queryKey: ["comments"] });
        }
    })

    return { like, likeIsPending, likeIsSuccess, postLikes, postLikesLoading, likeComment, likeCommentIsSuccess }
}