
import type { IPostCardProps } from "../../../interfaces/post";
import {
    FaRegHeart,
    FaRegCommentDots,
    FaShare,
    FaRegBookmark,
    FaHeart,
    FaBookmark,
    FaPen,
    FaTrash,
} from "react-icons/fa";
import useLike from "../../../shared/Hooks/useLike";
import useBookmark from "../../../shared/Hooks/useBookMark";
import { Link } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { profileContext } from "../../../shared/context/MyProfileContext";
import { BsThreeDotsVertical } from "react-icons/bs";
import CreatePost from "../../createPost/CreatePost";
import usePostActions from "../../../shared/Hooks/usePostActions";
import { toast } from "@heroui/react";

export default function PostCard({ post }: IPostCardProps) {
    const postDate = new Date(post.createdAt).toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
    });

    const { like } = useLike(post._id);
    const { bookmark } = useBookmark(post._id);

    const { myProfileData } = useContext(profileContext);
    const [isLiked, setIsLiked] = useState(false);
    const [isMyProfile, setIsMyProfile] = useState<boolean>();

    const [postActions, setPostActions] = useState(false);
    const [isEdit, SetIsEdit] = useState(false);

    const { deletePost } = usePostActions()
    function handleDeletePost() {

        deletePost(post._id, {
            onSuccess: () => {
                toast.success("Post is deleted")
            }
        })
        setPostActions(false)
    }

    useEffect(() => {
        for (const like of post.likes) {
            if (like === myProfileData?._id) {
                setIsLiked(true)
                break;
            } else setIsLiked(false)
        };

        if (post.user._id === myProfileData?._id) {
            setIsMyProfile(true)
        } else setIsMyProfile(false);

    }, [post.likes, myProfileData?._id, isEdit]);



    return (
        <>
            {isEdit ?
                <CreatePost isEdit={isEdit} setIsEdit={SetIsEdit} body={post.body} image={post.image} postId={post._id} />
                : <article className="group overflow-hidden rounded-2xl border border-primary/10 bg-card shadow-sm transition duration-300 hover:-translate-y-0.5 hover:shadow-md mb-3">
                    {/* Post Header */}
                    <div className="flex items-center gap-3 p-4 sm:p-5">
                        <Link to={`/profile/${post.user._id}`} >
                            <img
                                src={post.user.photo}
                                alt={post.user.name}
                                className="h-12 w-12 shrink-0 rounded-full object-cover ring-2 ring-primary/10"
                            />
                        </Link>

                        <div className="min-w-0 flex-1">
                            <Link to={`/profile/${post.user._id}`} className="truncate font-semibold text-heading">
                                {post.user.name}
                            </Link>

                            <div className="mt-1 flex flex-wrap items-center gap-2 text-xs text-paragraph">
                                <span>@{post.user.username}</span>
                                <span>·</span>
                                <time dateTime={post.createdAt}>{postDate}</time>
                            </div>
                        </div>


                        {isMyProfile && <div className="relative">
                            <button className="w-10 h-10 rounded-xl flex items-center justify-center hover:bg-primary/10
                     hover:text-primary text-heading transition cursor-pointer"
                                onClick={() => setPostActions(!postActions)}>
                                <BsThreeDotsVertical />
                            </button>
                            {postActions &&
                                <div className="absolute top-1 right-12 bg-input rounded-xl px-4 py-2 border border-primary/10 shadow z-100 ">
                                    <ul>
                                        <li className="group/li flex items-center gap-3 px-3 py-2 rounded-xl  hover:bg-primary/10 hover:text-primary transition cursor-pointer"
                                            onClick={() => {
                                                SetIsEdit(true)
                                                setPostActions(false)
                                            }}>
                                            <FaPen /><span className="text-heading font-medium group-hover/li:text-primary">Edit</span>
                                        </li>

                                        <li className="mt-1 group/li flex items-center gap-3 px-3 py-2 rounded-xl  hover:bg-red-500/10 hover:text-red-500 transition cursor-pointer"
                                            onClick={handleDeletePost}>
                                            <FaTrash /> <span className="text-heading font-medium group-hover/li:text-red-500">Delete</span></li>
                                    </ul>
                                </div>}

                        </div>}


                    </div>

                    {/* Post Body */}
                    {post.body && (
                        <p className="whitespace-pre-wrap break-words px-4 pb-4 leading-7 text-heading sm:px-5">
                            {post.body}
                        </p>
                    )}

                    {/* Post Image */}
                    {post.image && (
                        <div className="overflow-hidden bg-background">
                            <img
                                src={post.image}
                                alt="Post"
                                className="max-h-[500px] w-full object-contain transition duration-500 group-hover:scale-[1.01]"
                            />
                        </div>
                    )}

                    {/* Likes and Comments Summary */}
                    <div className="flex items-center justify-between gap-3 px-4 py-3 text-sm text-paragraph sm:px-5">
                        <span className="flex items-center gap-1.5">
                            <FaRegHeart className="text-primary" />
                            {post.likesCount} likes
                        </span>

                        <span>
                            {post.commentsCount} comments · {post.sharesCount} shares
                        </span>
                    </div>
                    <div className="mx-4 border-t border-primary/10 sm:mx-5" />

                    {/* Post Actions */}
                    <div className="flex items-center gap-1 px-3 py-2 sm:px-4">
                        <button
                            type="button"
                            onClick={() => {
                                setIsLiked((prev) => !prev)
                                like()
                            }
                            }
                            className={`flex min-w-0 flex-1 items-center justify-center gap-2 rounded-xl bg-transparent px-2 py-3 text-sm font-medium ${isLiked ? "text-primary" : "text-paragraph"}  transition hover:bg-primary/10 hover:text-primary`}
                        >
                            {isLiked ? <><FaHeart size={16} /><span>Liked</span></> : <><FaRegHeart size={16} /><span>Like</span></>}
                        </button>

                        <button
                            type="button"
                            className="flex min-w-0 flex-1 items-center justify-center gap-2 rounded-xl bg-transparent px-2 py-3 text-sm font-medium text-paragraph transition hover:bg-primary/10 hover:text-primary"
                        >
                            <FaRegCommentDots size={16} />
                            <span>Comment</span>
                        </button>

                        <button
                            type="button"
                            className="flex min-w-0 flex-1 items-center justify-center gap-2 rounded-xl bg-transparent px-2 py-3 text-sm font-medium text-paragraph transition hover:bg-primary/10 hover:text-primary"
                        >
                            <FaShare size={15} />
                            <span>Share</span>
                        </button>

                        <button
                            type="button"
                            aria-label="Bookmark post"
                            onClick={() => bookmark()}
                            className={`flex shrink-0 items-center justify-center rounded-xl bg-transparent p-3 ${post.bookmarked ? "text-primary" : "text-paragraph"}  transition hover:bg-primary/10 hover:text-primary`}
                        >
                            {post.bookmarked ? <FaBookmark size={16} /> : <FaRegBookmark size={16} />}
                        </button>
                    </div>

                    {/* Top Comment */}
                    {post.topComment && (
                        <div className="border-t border-primary/10 bg-background/60 p-4 sm:px-5">
                            <p className="mb-3 text-xs font-semibold uppercase tracking-wide text-paragraph">
                                Top comment
                            </p>

                            <div className="flex items-start gap-3">
                                <img
                                    src={post.topComment.commentCreator.photo}
                                    alt={post.topComment.commentCreator.name}
                                    className="h-9 w-9 shrink-0 rounded-full object-cover"
                                />

                                <div className="min-w-0 flex-1 rounded-2xl rounded-tl-sm bg-card px-4 py-3 ring-1 ring-primary/10">
                                    <h4 className="text-sm font-semibold text-heading">
                                        {post.topComment.commentCreator.name}
                                    </h4>

                                    <p className="mt-1 break-words text-sm leading-6 text-paragraph">
                                        {post.topComment.content}
                                    </p>
                                </div>
                            </div>
                        </div>
                    )}
                </article>}

        </>
    );
}
