import CommentItem from "./CommentItem";


export default function Comment({ comments, postId }: any) {


    return (<>
        {comments?.map((comment: any) => (
            <CommentItem
                key={comment._id}
                comment={comment}
                postId={postId}
            />
        ))}

    </>
    )
}
