import { useMutation } from "@tanstack/react-query";
import api from "../api/axiosRequest";
import { queryClient } from "../../App";
import type { ICreatReply } from "../../interfaces/comment";

export default function useCreatReply() {

    const { mutate: createReply, isPending: creatReplyPending } = useMutation({
        mutationFn: ({ postId, formdata , commentId }: ICreatReply) => {
            return api.post(`posts/${postId}/comments/${commentId}/replies`, formdata)
        },

        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["feeds"] });
            queryClient.invalidateQueries({ queryKey: ["posts"] });
        }
    })
    return { createReply, creatReplyPending }
}
