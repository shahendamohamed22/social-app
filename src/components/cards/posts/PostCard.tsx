
import type { IPostCardProps } from "../../../interfaces/post";
import {
    FaRegHeart,
    FaRegCommentDots,
    FaShare,
    FaRegBookmark,
    FaHeart,
    FaBookmark,
} from "react-icons/fa";
import useLike from "../../../shared/Hooks/useLike";
import useBookmark from "../../../shared/Hooks/useBookMark";
import { Link } from "react-router-dom";

export default function PostCard({ post }: IPostCardProps) {
    const postDate = new Date(post.createdAt).toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
    });

    const { like, likeIsPending, likeIsSuccess } = useLike(post._id)
    const { bookmark, bookmarkIsPending, bookmarkIsSuccess } = useBookmark(post._id)

    return (
        <article className="group overflow-hidden rounded-2xl border border-primary/10 bg-card shadow-sm transition duration-300 hover:-translate-y-0.5 hover:shadow-md mb-3">
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

                <span className="shrink-0 rounded-full bg-primary/10 px-3 py-1 text-xs font-medium capitalize text-primary">
                    {post.privacy}
                </span>

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
                    onClick={() => like()}
                    className={`flex min-w-0 flex-1 items-center justify-center gap-2 rounded-xl bg-transparent px-2 py-3 text-sm font-medium ${likeIsSuccess ? "text-primary" : "text-paragraph"}  transition hover:bg-primary/10 hover:text-primary`}
                >
                    {likeIsSuccess ? <><FaHeart size={16} /><span>Liked</span></> : <><FaRegHeart size={16} /><span>Like</span></>}
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
                    className={`flex shrink-0 items-center justify-center rounded-xl bg-transparent p-3 ${bookmarkIsSuccess ? "text-primary" : "text-paragraph"}  transition hover:bg-primary/10 hover:text-primary`}
                >
                    {bookmarkIsSuccess ? <FaBookmark size={16} /> : <FaRegBookmark size={16} />}
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
        </article>
    );
}
