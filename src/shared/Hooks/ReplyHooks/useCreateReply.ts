import { useMutation } from "@tanstack/react-query";
import api from "../../api/axiosRequest";
import type { ICreatReply } from "../../../interfaces/comment";
import useInvalidateQueries from "../InvalidQueries/InvalidQueries";

export default function useCreatReply() {
    const { invalidateReplies } = useInvalidateQueries()

    const { mutate: createReply, isPending: creatReplyPending } = useMutation({
        mutationFn: ({ postId, formdata, commentId }: ICreatReply) => {
            return api.post(`posts/${postId}/comments/${commentId}/replies`, formdata)
        },

        onSuccess: (_, { postId, commentId }) => {
            invalidateReplies(postId, commentId)
        }
    })
    return { createReply, creatReplyPending }
}
