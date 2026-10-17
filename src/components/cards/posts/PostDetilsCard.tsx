
import { BsThreeDotsVertical } from "react-icons/bs";
import type { IPostProps } from "../../../interfaces/post";
import { FaRegCommentDots, FaRegHeart, FaShare } from "react-icons/fa";
import { RiSendPlaneFill } from "react-icons/ri";
import { useState } from "react";
import useCreatComment from "../../../shared/Hooks/useCreateComment";
import { Spinner, toast } from "@heroui/react";
import Comment from "../../Comment/Comment";

export default function PostDetilsCard({ post, comments }: any) {

    const [comment, setComment] = useState("")
    const [photo, setphoto] = useState("")
    const postId = post._id
    const { addComment, creatCommentPending } = useCreatComment()

    function handleSend() {
        const formdata = new FormData();
        console.log(comment);

        if (comment.trim()) {
            formdata.append("content", comment);
        }

        addComment({ postId, formdata }, {
            onSuccess: (response) => {
                toast.success("comment is created")
                console.log(response);
                setComment("")
            }
        });
    }
    return (
        <article className="mb-3 overflow-hidden rounded-2xl border border-primary/10 bg-card shadow-sm">
            <div className="flex h-[calc(100vh-100px)] flex-col sm:flex-row">

                {/* Left Side - Scrollable */}
                <div className="flex min-w-0 flex-1 flex-col overflow-y-auto p-4 sm:p-5">

                    {/* User Info */}
                    <div className="flex items-center gap-3">
                        <img
                            src={post.user.photo}
                            alt={post.user.name}
                            className="h-11 w-11 shrink-0 rounded-full object-cover ring-2 ring-primary/10"
                        />

                        <div className="min-w-0 flex-1">
                            <p className="truncate font-semibold text-heading">
                                {post.user.name}
                            </p>
                            <div className="mt-1 flex flex-wrap items-center gap-2 text-xs text-paragraph">
                                <span>@{post.user.username}</span>
                                <span>·</span>
                                <time>
                                    {new Date(post.createdAt).toLocaleString()}
                                </time>
                            </div>
                        </div>

                        <BsThreeDotsVertical className="shrink-0 text-heading" />
                    </div>

                    {/* Post Text */}
                    {post.body && (
                        <p className="mt-4 whitespace-pre-wrap break-words leading-7 text-heading">
                            {post.body}
                        </p>
                    )}

                    {/* Actions مباشرة بعد النص */}
                    <div className="mt-4 flex items-center justify-around gap-2 border-y border-primary/10 py-3 text-sm text-paragraph">
                        <div className="flex items-center gap-2 rounded-xl px-2 py-2">
                            <FaRegHeart size={16} />
                            <span>Like</span>
                        </div>

                        <div className="flex items-center gap-2 rounded-xl px-2 py-2">
                            <FaRegCommentDots size={16} />
                            <span>Comment</span>
                        </div>

                        <div className="flex items-center gap-2 rounded-xl px-2 py-2">
                            <FaShare size={15} />
                            <span>Share</span>
                        </div>
                    </div>

                    {/* Counts */}
                    <div className="flex items-center justify-between gap-2 py-3 text-xs text-paragraph sm:text-sm">
                        <span>
                            <FaRegHeart className="mr-1 inline text-primary" />
                            {post.likesCount} likes
                        </span>
                        <span className="text-right">
                            {post.commentsCount} comments · {post.sharesCount} shares
                        </span>
                    </div>

                    {/* Top Comment */}
                    <Comment comments={comments} postId={post._id} />

                    <div className="sticky bottom-0 mt-auto border-t border-primary/10 bg-card pt-3">
                        <div className="flex items-center gap-3">
                            <input
                                type="text"
                                value={comment}
                                onChange={(e) => setComment(e.target.value)}
                                placeholder="Write a comment..."
                                className="min-w-0 w-full flex-1 rounded-full border border-primary/15 bg-background px-4 py-3 text-sm text-heading outline-none transition placeholder:text-paragraph focus:border-primary"
                            />

                            <button
                                type="button"
                                onClick={handleSend}
                                className="shrink-0 rounded-full text-primary px-5 py-3 text-sm font-medium transition hover:opacity-90"
                            >
                               {creatCommentPending ? <Spinner  color="current"/> : <RiSendPlaneFill size={35} />}
                            </button>
                        </div>
                    </div>
                </div>

                {/* Right Side - Image */}
                {post.image && (
                    <div className="h-64 shrink-0 bg-background sm:sticky sm:top-0 sm:h-[calc(100vh-100px)] sm:w-[42%]">
                        <img
                            src={post.image}
                            alt="Post"
                            className="h-full w-full object-contain"
                        />
                    </div>
                )}

            </div>
        </article>
    );
}
