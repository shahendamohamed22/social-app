import { useMutation } from "@tanstack/react-query";
import api from "../../api/axiosRequest";
import type { IUpdateComment } from "../../../interfaces/comment";
import useInvalidateQueries from "../InvalidQueries/InvalidQueries";

export default function useCommentActions() {

    const { invalidateComments } = useInvalidateQueries()

    const { mutate: updateComment, isPending: updatePending } = useMutation({
        mutationFn: ({ postId, formdata, commentId }: IUpdateComment) => {
            return api.put(`posts/${postId}/comments/${commentId}`, formdata)
        },

        onSuccess: (_, {postId}) => {
            invalidateComments(postId)
        }
    })

    const { mutate: deleteComment } = useMutation({
        mutationFn: ({ postId, commentId }: IUpdateComment) => {
            return api.delete(`posts/${postId}/comments/${commentId}`)
        },

        onSuccess: (_, {postId}) => {
            invalidateComments(postId)
        }
    })

    return { deleteComment, updateComment, updatePending }
}


