import { useMutation } from "@tanstack/react-query";
import api from "../../api/axiosRequest";
import type { IUpdatePost } from "../../../interfaces/postActions";
import useInvalidateQueries from "../InvalidQueries/InvalidQueries";

export default function usePostActions() {
    
    const { invalidatePosts } = useInvalidateQueries()

    const { mutate: updatePost, isPending: updatePending } = useMutation({
        mutationFn: ({ postId, formdata }: IUpdatePost) => {
            return api.put(`posts/${postId}`, formdata)
        },

        onSuccess: (_, { postId }) => {
            invalidatePosts(postId)
        }
    })

    function removePost(postId: string) {
        return api.delete(`posts/${postId}`)
    }

    const { mutate: deletePost } = useMutation({
        mutationFn: removePost,

        onSuccess: (_, postId) => {
            invalidatePosts(postId)
        }
    })

    return { deletePost, updatePost, updatePending }
}


