import { useParams } from "react-router-dom";
import PostDetilsCard from "../../components/cards/posts/PostDetilsCard";
import useGetPost from "../../shared/Hooks/PostHooks/useGetPosts";

export default function PostDetails() {

  const { postId } = useParams();

  const {post , PostDetailsIsLoading} = useGetPost(postId)

  if (PostDetailsIsLoading) {
    return <div className="animate-pulse rounded-2xl bg-card p-4 space-y-4">
      <div className="flex items-center gap-3">
        <div className="h-10 w-10 rounded-full bg-primary/10" />
        <div className="space-y-2">
          <div className="h-3 w-28 rounded bg-primary/10" />
          <div className="h-2 w-16 rounded bg-primary/10" />
        </div>
      </div>

      <div className="h-4 w-3/4 rounded bg-primary/10" />

      <div className="h-56 w-full rounded-xl bg-primary/10" />

      <div className="h-4 w-24 rounded bg-primary/10" />
    </div>
  }

  return (
    <>
      <PostDetilsCard post={post} />
    </>
  )
}
