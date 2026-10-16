import { useMutation } from "@tanstack/react-query";
import api from "../api/axiosRequest";

export default function useLike(postId: string) {

    function likePost() {
        return api.put(`posts/${postId}/like`)
    }
    const { mutate: like, isPending : likeIsPending ,isSuccess : likeIsSuccess  } = useMutation({
        mutationFn: likePost
    })
   
    return { like, likeIsPending , likeIsSuccess }

}