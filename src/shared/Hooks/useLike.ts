import { useMutation } from "@tanstack/react-query";
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
    return { like, likeIsPending, likeIsSuccess }

}