import { useMutation } from "@tanstack/react-query";
import api from "../api/axiosRequest";
import { queryClient } from "../../App";
import { useContext } from "react";
import { profileContext } from "../context/MyProfileContext";

export default function useCreatePost() {

    const {myProfileData} = useContext(profileContext)

    function addPost(formdata: FormData) {
        return api.post("posts", formdata)
    }

    const { mutate: createPost, isPending : creatPending } = useMutation({
        mutationFn: addPost,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["feeds"] });
            queryClient.invalidateQueries({ queryKey: ["posts"] });
            queryClient.invalidateQueries({ queryKey: ["posts", myProfileData?._id] });
        }
    })
    return { createPost, creatPending }
}