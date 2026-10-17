import { useMutation } from "@tanstack/react-query";
import api from "../api/axiosRequest";
import { queryClient } from "../../App";
import { toast } from "@heroui/react";
import { useContext } from "react";
import { profileContext } from "../context/MyProfileContext";

export default function useBookmark() {
    const { myProfileData } = useContext(profileContext)

    function bookmarkPost(postId: string) {
        return api.put(`posts/${postId}/bookmark`)
    }
    const { mutate: bookmark, isPending: bookmarkIsPending, isSuccess: bookmarkIsSuccess } = useMutation({
        mutationFn: bookmarkPost,
        onSuccess: (response) => {
            if (response.data.data.bookmarked) {
                toast.success("Post is added to saved")
            } else {
                toast.success("Post is removed from saved")
            }

            queryClient.invalidateQueries({ queryKey: ["feeds"] });
            queryClient.invalidateQueries({ queryKey: ["posts"] });
            queryClient.invalidateQueries({ queryKey: ["savedPosts"], });
            queryClient.invalidateQueries({ queryKey: ["myProfile"], });
            queryClient.invalidateQueries({ queryKey: ["posts", myProfileData?._id] });
        },
    })

    return { bookmark, bookmarkIsPending, bookmarkIsSuccess }

}