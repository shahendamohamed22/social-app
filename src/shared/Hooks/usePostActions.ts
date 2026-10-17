import { useMutation } from "@tanstack/react-query";
import api from "../api/axiosRequest";
import { queryClient } from "../../App";
import { profileContext } from "../context/MyProfileContext";
import { useContext } from "react";
import type { IUpdatePost } from "../../interfaces/postActions";

export default function usePostActions() {

    const { myProfileData } = useContext(profileContext)

    const { mutate: updatePost, isPending : updatePending} = useMutation({
        mutationFn: ({ postId, formdata }: IUpdatePost) => {
            return api.put(`posts/${postId}`, formdata)
        },

        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["feeds"] });
            queryClient.invalidateQueries({ queryKey: ["posts"] });
            queryClient.invalidateQueries({ queryKey: ["posts", myProfileData?._id] });
        }
    })

    function removePost(postId: string) {
        return api.delete(`posts/${postId}`)
    }

    const { mutate: deletePost } = useMutation({
        mutationFn: removePost,

        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["feeds"] });
            queryClient.invalidateQueries({ queryKey: ["posts"] });
            queryClient.invalidateQueries({ queryKey: ["posts", myProfileData?._id] });
        }
    })

    return { deletePost, updatePost, updatePending }
}


