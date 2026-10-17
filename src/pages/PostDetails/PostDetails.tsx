import { useParams } from "react-router-dom";
import PostDetilsCard from "../../components/cards/posts/PostDetilsCard";
import api from "../../shared/api/axiosRequest";
import { useQuery } from "@tanstack/react-query";

export default function PostDetails() {

  const { postId } = useParams();

  function getPostDetails() {
    return api.get(`posts/${postId}`)
  }
  const { data: post, isLoading } = useQuery({
    queryKey: ['post', postId],
    queryFn: getPostDetails,
    select: (data) => data.data.data.post
  })

  function getcomments() {
    return api.get(`posts/${postId}/comments`)
  }
  const { data: comments } = useQuery({
    queryKey: ['comments', postId],
    queryFn: getcomments,
    select: (data) => data.data.data.comments
  })


  if (isLoading) {
    return <h1>Loading</h1>
  }

  return (
    <>
      <PostDetilsCard post={post} comments={comments} />
    </>
  )
}
