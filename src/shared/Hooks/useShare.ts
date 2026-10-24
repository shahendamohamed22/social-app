import { useMutation } from "@tanstack/react-query";
import api from "../api/axiosRequest";
import { toast } from "@heroui/react";
import { queryClient } from "../../App";

export default function useShare() {
    function share({ postId, body }: { postId: string, body: string }) {
        return api.post(`posts/${postId}/share`, { body })
    }

    const { mutate: sharePost, isPending: shareIsPending } = useMutation({
        mutationFn: share,
        onSuccess: () => {
            toast.success("Post is shared")
            queryClient.invalidateQueries({ queryKey: ["feeds"] });
            queryClient.invalidateQueries({ queryKey: ["posts"] });
        },
    })

    return { sharePost, shareIsPending }
}