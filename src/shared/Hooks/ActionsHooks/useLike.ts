import { useMutation, useQuery } from "@tanstack/react-query";
import api from "../../api/axiosRequest";
import useInvalidateQueries from "../InvalidQueries/InvalidQueries";

export default function useLike(postId: string) {
    const { invalidatePosts, invalidateComments } = useInvalidateQueries()

    function likePost() {
        return api.put(`posts/${postId}/like`)
    }
    const { mutate: like, isPending: likeIsPending, isSuccess: likeIsSuccess } = useMutation({
        mutationFn: likePost,
        onSuccess: () => {
            invalidatePosts(postId)
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
            invalidatePosts(postId)
            invalidateComments(postId)
        }
    })

    return { like, likeIsPending, likeIsSuccess, postLikes, postLikesLoading, likeComment, likeCommentIsSuccess }
}