import { useMutation } from "@tanstack/react-query";
import api from "../../api/axiosRequest";
import { toast } from "@heroui/react";
import useInvalidateQueries from "../InvalidQueries/InvalidQueries";

export default function useBookmark() {
    const { invalidatePosts, invalidateProfiles, invalidateSavedPosts } = useInvalidateQueries()

    function bookmarkPost(postId: string) {
        return api.put(`posts/${postId}/bookmark`)
    }
    const { mutate: bookmark, isPending: bookmarkIsPending, isSuccess: bookmarkIsSuccess } = useMutation({
        mutationFn: bookmarkPost,
        onSuccess: (response, postId) => {
            if (response.data.data.bookmarked) {
                toast.success("Post is added to saved")
            } else {
                toast.success("Post is removed from saved")
            }
            
            invalidateProfiles()
            invalidateSavedPosts()
            invalidatePosts(postId)
        },
    })

    return { bookmark, bookmarkIsPending, bookmarkIsSuccess }

}