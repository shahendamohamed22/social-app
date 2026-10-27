import { useMutation } from "@tanstack/react-query";
import api from "../../api/axiosRequest";
import type { ICreatComment } from "../../../interfaces/comment";
import useInvalidateQueries from "../InvalidQueries/InvalidQueries";

export default function useCreatComment() {
    
    const { invalidateComments } = useInvalidateQueries()

    const { mutate: addComment, isPending: creatCommentPending } = useMutation({
        mutationFn: ({ postId, formdata }: ICreatComment) => {
            return api.post(`posts/${postId}/comments`, formdata)
        },

        onSuccess: (_, { postId }) => {
            invalidateComments(postId)
        }
    })
    return { addComment, creatCommentPending }
}
