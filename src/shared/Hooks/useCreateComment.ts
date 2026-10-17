import { useMutation } from "@tanstack/react-query";
import api from "../api/axiosRequest";
import { queryClient } from "../../App";
import type { ICreatComment } from "../../interfaces/comment";

export default function useCreatComment() {

    const { mutate: addComment, isPending: creatCommentPending } = useMutation({
        mutationFn: ({ postId, formdata }: ICreatComment) => {
            return api.post(`posts/${postId}/comments`, formdata)
        },

        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["feeds"] });
            queryClient.invalidateQueries({ queryKey: ["posts"] });
        }
    })
    return { addComment, creatCommentPending }
}
