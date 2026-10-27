import { useMutation } from "@tanstack/react-query";
import api from "../../api/axiosRequest";
import useInvalidateQueries from "../InvalidQueries/InvalidQueries";

export default function useCreatePost() {

    const { invalidatePosts } = useInvalidateQueries()

    function addPost(formdata: FormData) {
        return api.post("posts", formdata)
    }

    const { mutate: createPost, isPending: creatPending } = useMutation({
        mutationFn: addPost,
        onSuccess: () => {
            invalidatePosts()
        }
    })
    return { createPost, creatPending }
}