import { RiSendPlaneFill } from 'react-icons/ri'
import useCreatReply from '../../shared/Hooks/useCreateReply'
import { useState } from 'react';
import { Spinner, toast } from '@heroui/react';
import api from '../../shared/api/axiosRequest';
import { useQuery } from '@tanstack/react-query';

export default function CommentItem({ comment, postId }: any) {
    const [reply, setReply] = useState("")
    const { creatReplyPending, createReply } = useCreatReply()

    
    const { data: replies } = useQuery({
        queryKey: ["replies", postId, comment._id],
        queryFn: () =>
            api.get(`posts/${postId}/comments/${comment._id}/replies`),
        select: (data) => data.data.data.replies,
    });
    
    function handleSend(commentId: string) {
        const formdata = new FormData();
        console.log(reply);

        if (reply.trim()) {
            formdata.append("content", reply);
        }

        createReply({ postId, formdata, commentId }, {
            onSuccess: (response) => {
                toast.success("reply is created")
                console.log(response);
                setReply("")
            }
        });
    }
    return (
        <>
            <div
                key={comment._id}
                className="mt-4 border-t border-primary/10 pt-4"
            >
                {/* Main Comment */}
                <div className="flex items-start gap-3">
                    <img
                        src={comment.commentCreator.photo}
                        alt={comment.commentCreator.name}
                        className="h-10 w-10 shrink-0 rounded-full object-cover"
                    />

                    <div className="min-w-0 flex-1">
                        <div className="rounded-2xl rounded-tl-sm bg-background px-4 py-3">
                            <p className="text-sm font-semibold text-heading">
                                {comment.commentCreator.name}
                            </p>
                            <p className="mt-1 break-words text-sm leading-6 text-paragraph">
                                {comment.content}
                            </p>
                        </div>

                        <button
                            type="button"
                            className="ml-3 mt-2 text-xs font-semibold text-paragraph transition hover:text-primary"
                        >
                            Reply
                        </button>

                        {/* Replies */}
                        <div className="ml-3 mt-3 space-y-3 border-l-2 border-primary/10 pl-3">
                            {/* Example Reply */}
                            {replies?.map((item: any) => (
                                <div key={item._id} className="flex items-start gap-2">
                                    <img
                                        src={item.commentCreator.photo}
                                        alt={item.commentCreator.name}
                                        className="h-8 w-8 shrink-0 rounded-full object-cover"
                                    />

                                    <div className="min-w-0 flex-1 rounded-2xl bg-background px-3 py-2">
                                        <p className="text-xs font-semibold text-heading">
                                            {item.commentCreator.name}
                                        </p>

                                        <p className="mt-1 break-words text-sm text-paragraph">
                                            {item.content}
                                        </p>
                                    </div>
                                </div>
                            ))}

                            {/* Write Reply */}
                            <div className="flex items-center  gap-2 pt-1">
                                <img
                                    src="https://placehold.co/40x40"
                                    alt="Your profile"
                                    className="h-8 w-8 shrink-0 rounded-full object-cover"
                                />

                                <div className="flex items-center gap-3 w-full mt-auto border-t border-primary/10 bg-card pt-3">

                                    <input
                                        type="text"
                                        placeholder="Write a comment..."
                                        value={reply}
                                        onChange={(e) => setReply(e.target.value)}
                                        className="min-w-0 w-full flex-1 rounded-full border border-primary/15 bg-background px-4 py-2 text-sm text-heading outline-none transition placeholder:text-paragraph focus:border-primary"
                                    />

                                    <button
                                        type="button"
                                        onClick={() => handleSend(comment._id)}
                                        className="shrink-0 rounded-full px-3 py-1 text-sm font-medium text-primary transition hover:opacity-90"
                                    >
                                        {creatReplyPending ? <Spinner color='current' /> : <RiSendPlaneFill size={25} />}
                                    </button>

                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </>
    )
}
