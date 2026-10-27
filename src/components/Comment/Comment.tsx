import CommentItem from "./CommentItem/CommentItem";
import type { IComment } from "../../interfaces/comment";
import useGetComments from "../../shared/Hooks/CommentHooks/useGetComments";


export default function Comment({ postId }: { postId: string }) {

    const { comments, isLoading } = useGetComments(postId)

    if (isLoading) {
        return [1, 2, 3].map((i) => <div key={i} className="mt-6 flex animate-pulse gap-3">
            <div className="h-10 w-10 rounded-full bg-primary/10" />

            <div className=" space-y-2 w-full">
                <div className="h-3 w-24 rounded bg-primary/10" />
                <div className="h-3 w-40 rounded bg-primary/10" />
            </div>
        </div>)
    }

    return (<>
        {comments?.map((comment: IComment) => (
            <CommentItem
                key={comment._id}
                comment={comment}
                postId={postId}
            />
        ))}
    </>
    )
}
