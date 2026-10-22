import { useQuery } from "@tanstack/react-query"
import api from "../api/axiosRequest"

export default function useGetPosts(postId: string | undefined, id: string | undefined) {

    // SINGLE POST
    function getPostDetails() {
        return api.get(`posts/${postId}`)
    }
    const { data: post, isLoading: PostDetailsIsLoading } = useQuery({
        queryKey: ['post', postId],
        queryFn: getPostDetails,
        select: (data) => data.data.data.post
    })

    // FEEDS POSTS 
    function getPosts() {
        return api.get("posts?limit=20")
    }

    const { isLoading: feedsIsLoading, data: feeds } = useQuery({
        queryKey: ["feeds"],
        queryFn: getPosts,
        select: (data) => data?.data.data.posts
    })

    // PROFILE POSTS 

    function getUserPosts() {
        return api.get(`users/${id}/posts`)
    }

    const { data: posts, isLoading: postIsLoading } = useQuery({
        queryKey: ["posts", id],
        queryFn: getUserPosts,
        select: (data) => data?.data.data.posts
    })

    return { post, PostDetailsIsLoading, feedsIsLoading, feeds, posts, postIsLoading }
}