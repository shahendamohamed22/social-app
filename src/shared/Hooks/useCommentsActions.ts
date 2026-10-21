import { useMutation } from "@tanstack/react-query";
import api from "../api/axiosRequest";
import { queryClient } from "../../App";
import { profileContext } from "../context/MyProfileContext";
import { useContext } from "react";
import type { IUpdateComment } from "../../interfaces/comment";

export default function useCommentActions() {

    const { myProfileData } = useContext(profileContext)

    const { mutate: updateComment, isPending: updatePending } = useMutation({
        mutationFn: ({ postId, formdata, commentId }: IUpdateComment) => {
            return api.put(`posts/${postId}/comments/${commentId}`, formdata)
        },

        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["feeds"] });
            queryClient.invalidateQueries({ queryKey: ["posts"] });
            queryClient.invalidateQueries({ queryKey: ["posts", myProfileData?._id] });
        }
    })

    const { mutate: deleteComment } = useMutation({
        mutationFn: ({ postId , commentId }: IUpdateComment) => {
            return api.delete(`posts/${postId}/comments/${commentId}`)
        },

        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["feeds"] });
            queryClient.invalidateQueries({ queryKey: ["posts"] });
            queryClient.invalidateQueries({ queryKey: ["posts", myProfileData?._id] });
        }
    })

    return { deleteComment, updateComment, updatePending }
}


