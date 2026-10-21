import { useQuery } from "@tanstack/react-query";
import api from "../../shared/api/axiosRequest";
import CommentItem from "./CommentItem/CommentItem";
import type { IComment } from "../../interfaces/comment";


export default function Comment({ postId }: {postId : string}) {

    function getcomments() {
        return api.get(`posts/${postId}/comments`)
    }
    const { data: comments } = useQuery({
        queryKey: ['comments', postId],
        queryFn: getcomments,
        select: (data) => data.data.data.comments
    })



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
