import { RiSendPlaneFill } from 'react-icons/ri'
import useCreatReply from '../../../shared/Hooks/ReplyHooks/useCreateReply'
import { useContext, useState } from 'react';
import { Spinner, toast } from '@heroui/react';
import { profileContext } from '../../../shared/context/MyProfileContext';
import CommentActions from '../CommentActions/CommentActions';
import type { IComment, IReply } from '../../../interfaces/comment';
import useGetReplies from '../../../shared/Hooks/ReplyHooks/useGetReplies';
import useLike from '../../../shared/Hooks/ActionsHooks/useLike';

export default function CommentItem({ comment, postId }: { comment: IComment, postId: string }) {
    const { myProfileData } = useContext(profileContext);

    const { creatReplyPending, createReply } = useCreatReply()
    const [reply, setReply] = useState("")
    const [isReplyOpen, setIsReplyOpen] = useState(false)

    const { replies, repliesLoading } = useGetReplies(postId, comment._id, isReplyOpen)

    const { likeComment, likeCommentIsSuccess, } = useLike(postId)

    function handleSend(commentId: string) {
        const formdata = new FormData();

        if (reply.trim()) {
            formdata.append("content", reply);
        }

        createReply({ postId, formdata, commentId }, {
            onSuccess: () => {
                toast.success("reply is created")
                setReply("")
            }
        });
    }

    return (
        <>
            <div key={comment._id} className="mt-4 border-t border-primary/10 pt-4">
                {/* Main Comment */}
                <div className="flex items-start gap-3">
                    <img
                        src={comment.commentCreator.photo}
                        alt={comment.commentCreator.name}
                        className="h-10 w-10 shrink-0 rounded-full object-cover"
                    />

                    <div className="min-w-0 flex-1">
                        <div className="flex justify-between rounded-2xl rounded-tl-sm bg-background px-4 py-3">
                            <div>
                                <p className="text-sm font-semibold text-heading">
                                    {comment.commentCreator.name}
                                </p>
                                <div>
                                    <p className="mt-1 wrap-break-word text-sm leading-6 text-paragraph">
                                        {comment.content}
                                    </p>

                                    {comment.image &&
                                        <div className="mt-4 flex h-50 w-50 overflow-hidden items-center justify-center rounded-xl bg-primary/10 text-primary">
                                            <img src={comment.image} alt={comment.commentCreator.name}
                                                className='object-contain w-full h-full' />
                                        </div>
                                    }
                                </div>
                            </div>

                            <CommentActions comment={comment} />
                        </div>
                        <div className='flex '>
                            <button
                                type="button"
                                onClick={() => setIsReplyOpen(!isReplyOpen)}
                                className="ml-3 mt-2 text-xs font-semibold text-paragraph transition hover:text-primary"
                            >
                                {repliesLoading ? <Spinner color='current' />
                                    : comment.repliesCount === 0 ?
                                        "Reply" : comment.repliesCount > 1 ?
                                            `${comment.repliesCount} replies` : "1 reply"}
                            </button>
                            <button className={`ml-3 mt-2 text-xs font-semibold ${likeCommentIsSuccess ? "text-primary" : "text-paragraph"}  transition hover:text-primary`}
                                onClick={() => {likeComment(comment._id); console.log(comment);
                                }}>
                                {likeCommentIsSuccess ? "Liked" : "Like"} 
                            </button>
                        </div>


                        {/* Replies */}
                        {repliesLoading ? "" :
                            isReplyOpen && <div className="ml-3 mt-3 space-y-3 border-l-2 border-primary/10 pl-3">
                                {/* Example Reply */}

                                {replies?.map((item: IReply) => (
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

                                            <p className="mt-1 wrap-break-word text-sm text-paragraph">
                                                {item.content}
                                            </p>
                                        </div>
                                    </div>
                                ))}

                                {/* Write Reply */}
                                <div className="flex items-center  gap-2 pt-1">
                                    <img
                                        src={myProfileData?.photo}
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
                            </div>}


                    </div>
                </div>
            </div>
        </>
    )
}
