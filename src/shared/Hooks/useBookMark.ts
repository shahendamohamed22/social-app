import { useMutation } from "@tanstack/react-query";
import api from "../api/axiosRequest";
import { queryClient } from "../../App";

export default function useBookmark(postId: string) {

    function bookmarkPost() {
        return api.put(`posts/${postId}/bookmark`)
    }
    const { mutate: bookmark, isPending: bookmarkIsPending, isSuccess: bookmarkIsSuccess } = useMutation({
        mutationFn: bookmarkPost,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["feeds"] });
            queryClient.invalidateQueries({ queryKey: ["posts"] });
            queryClient.invalidateQueries({ queryKey: ["myProfile"], });
        },
    })

    return { bookmark, bookmarkIsPending, bookmarkIsSuccess }

}