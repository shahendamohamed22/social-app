import { useMutation } from "@tanstack/react-query";
import api from "../../api/axiosRequest";
import { toast } from "@heroui/react";
import useInvalidateQueries from "../InvalidQueries/InvalidQueries";

export default function useShare() {
    const { invalidatePosts } = useInvalidateQueries()

    function share({ postId, body }: { postId: string, body: string }) {
        return api.post(`posts/${postId}/share`, { body })
    }

    const { mutate: sharePost, isPending: shareIsPending } = useMutation({
        mutationFn: share,
        onSuccess: (_,{postId}) => {
            toast.success("Post is shared")
            invalidatePosts(postId)
        },
    })

    return { sharePost, shareIsPending }
}