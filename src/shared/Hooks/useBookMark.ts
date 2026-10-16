import { useMutation } from "@tanstack/react-query";
import api from "../api/axiosRequest";

export default function useBookmark(postId: string) {

    function bookmarkPost() {
        return api.put(`posts/${postId}/bookmark`)
    }
    const { mutate: bookmark, isPending : bookmarkIsPending ,isSuccess : bookmarkIsSuccess } = useMutation({
        mutationFn: bookmarkPost
    })
   
    return { bookmark, bookmarkIsPending , bookmarkIsSuccess }

}