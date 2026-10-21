import { useMutation, useQuery } from "@tanstack/react-query";
import api from "../api/axiosRequest";
import { queryClient } from "../../App";

export default function useLike(postId: string) {

    function likePost() {
        return api.put(`posts/${postId}/like`)
    }
    const { mutateAsync: like, isPending: likeIsPending, isSuccess: likeIsSuccess } = useMutation({
        mutationFn: likePost,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["feeds"] });
            queryClient.invalidateQueries({ queryKey: ["posts"] });
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
    return { like, likeIsPending, likeIsSuccess, postLikes, postLikesLoading }

}