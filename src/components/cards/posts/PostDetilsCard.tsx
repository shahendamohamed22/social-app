import { FaRegHeart } from "react-icons/fa";
import { RiSendPlaneFill } from "react-icons/ri";
import { useEffect, useState } from "react";
import useCreatComment from "../../../shared/Hooks/CommentHooks/useCreateComment";
import { Spinner, toast } from "@heroui/react";
import Comment from "../../Comment/Comment";
import LikesModal from "./LikesModal/LikesModal";
import PostHeader from "./PostHeader/PostHeader";
import PostActions from "./PostActions/PostActions";
import useCheckMyProfile from "../../../shared/Hooks/ProfileHooks/useCheckMyProfile";
import { TbPhotoCirclePlus } from "react-icons/tb";
import { IoIosCloseCircle } from "react-icons/io";
import type { IPost } from "../../../interfaces/post";

export default function PostDetilsCard({ post }: { post: IPost }) {

    const [commentBody, setComment] = useState<string>("");
    const [commentphoto, setCommentPhoto] = useState<File | null>();
    const [previewCommentphoto, setPreviewCommentphoto] = useState<string | null>("");

    const postId = post._id
    const { addComment, creatCommentPending } = useCreatComment()

    const [isLikesModalOpen, setIsLikesModalOpen] = useState(false)
    const { checkProfile, isMyProfile } = useCheckMyProfile()

    function removePhoto() {
        setCommentPhoto(null)
        setPreviewCommentphoto(null)
    }

    function handleSend() {
        const formdata = new FormData();
        console.log(commentBody);

        if (commentBody.trim()) {
            formdata.append("content", commentBody);
        }

        if (commentphoto) {
            formdata.append("image", commentphoto);
        }

        addComment({ postId, formdata }, {
            onSuccess: (response) => {
                toast.success("comment is created")
                console.log(response);
                setComment("")
                setCommentPhoto(null)
                setPreviewCommentphoto(null)
            }
        });
    }


    useEffect(() => {
        checkProfile(post.user._id)
    }, [checkProfile , post.user._id]);

    return (
        <>
            <article className="mb-3 overflow-hidden rounded-2xl border border-primary/10 bg-card shadow-sm">
                <div className="flex h-[calc(100vh-100px)] flex-col sm:flex-row">

                    {/* Left Side - Scrollable */}
                    <div className="flex min-w-0 flex-1 flex-col overflow-y-auto p-4 sm:p-5">

                        {/* User Info */}
                        <PostHeader post={post} isMyProfile={isMyProfile} />

                        {/* Post Text */}
                        {post.body && (
                            <p className="mt-4 whitespace-pre-wrap wrap-break-word leading-7 text-heading">
                                {post.body}
                            </p>
                        )}

                        {/* Actions */}
                        <PostActions post={post} />

                        {/* Counts */}
                        <div className="flex items-center justify-between gap-2 py-3 text-xs text-paragraph sm:text-sm">
                            <button onClick={() => setIsLikesModalOpen(true)}>
                                <FaRegHeart className="mr-1 inline text-primary" />
                                {post.likesCount} likes
                            </button>
                            <span className="text-right">
                                {post.commentsCount} comments · {post.sharesCount} shares
                            </span>
                        </div>

                        {/* comments*/}
                        <Comment postId={post._id} />

                        <div className="sticky bottom-0 mt-auto border-t border-primary/10 bg-card pt-3">
                            <div className="flex items-center gap-3">
                                <div className="flex min-w-0 flex-1 items-center gap-3 rounded-full border border-primary/15 bg-background px-4 py-3 transition focus-within:border-primary">
                                    <input
                                        type="text"
                                        value={commentBody}
                                        onChange={(e) => setComment(e.target.value)}
                                        placeholder="Write a comment..."
                                        className="min-w-0 flex-1 bg-transparent text-sm text-heading outline-none placeholder:text-paragraph"
                                    />

                                    <input type="file" hidden id="comment-photo"
                                        onChange={(e) => {
                                            if (e.target.files?.[0]) {
                                                setCommentPhoto(e.target.files?.[0])
                                                setPreviewCommentphoto(URL.createObjectURL(e.target.files?.[0]))
                                            }
                                        }} />
                                    <label htmlFor="comment-photo" className="shrink-0 text-paragraph transition hover:text-primary">
                                        <TbPhotoCirclePlus size={24} />
                                    </label>
                                </div>

                                <button
                                    type="button"
                                    onClick={handleSend}
                                    className="shrink-0 rounded-full text-primary px-5 py-3 text-sm font-medium transition hover:opacity-90"
                                >
                                    {creatCommentPending ? <Spinner color="current" /> : <RiSendPlaneFill size={35} />}
                                </button>
                            </div>

                            {previewCommentphoto && <div className="relative mt-4 flex h-25 w-25 items-center justify-center rounded-xl bg-primary/10 ">
                                <img src={previewCommentphoto} alt="post photo" className="object-contain w-full h-full rounded-xl" />
                                <button
                                    type="button"
                                    onClick={removePhoto}
                                    className="absolute -right-2 -top-2 rounded-full bg-card text-primary"
                                >
                                    <IoIosCloseCircle size={24} />
                                </button>
                            </div>}

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

            {isLikesModalOpen && <LikesModal setIsLikesModalOpen={setIsLikesModalOpen} postId={post._id} />}
        </>
    );
}
