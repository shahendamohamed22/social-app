import { useQuery } from "@tanstack/react-query";
import api from "../../api/axiosRequest";

export default function useSavedPosts() {
    function getSavedPosts() {
        return api.get("users/bookmarks")
    }

    const { data: posts, isLoading } = useQuery({
        queryKey: ["savedPosts"],
        queryFn: getSavedPosts,
        select: (data) => data?.data.data.bookmarks
    })

    return { posts, isLoading }
}