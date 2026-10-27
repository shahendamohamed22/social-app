import { FaBookmark, FaHeart, FaRegBookmark, FaRegCommentDots, FaRegHeart, FaShare } from "react-icons/fa"
import useLike from "../../../../shared/Hooks/ActionsHooks/useLike";
import useBookmark from "../../../../shared/Hooks/ActionsHooks/useBookMark";
import { useContext, useState } from "react";
import type { IPostCardProps } from "../../../../interfaces/post";
import { profileContext } from "../../../../shared/context/MyProfileContext";
import { Link } from "react-router-dom";
import useShare from "../../../../shared/Hooks/ActionsHooks/useShare";
import ReusableModal from "../../../ReusableModal/ReusableModal";
import { toast } from "@heroui/react";

export default function PostActions({ post }: IPostCardProps) {
    const { myProfileData } = useContext(profileContext);

    const { like } = useLike(post._id);

    const { bookmark } = useBookmark();

    const { sharePost, shareIsPending } = useShare();
    const [isShare, setIsShare] = useState(false);
    const [shareBody, setShareBody] = useState<string>("");

    const isLiked = myProfileData?._id ? post.likes.includes(myProfileData._id) : false;

    function handleSharePost(postId: string, body: string) {
        sharePost({ postId, body }, {
            onSuccess: () => {
                toast.success("Post is Shared")
                setIsShare(false);
                setShareBody("");
            },
            onError: () => {
                toast.info("Post is already Shared")
            }
        })

    };

    return (
        <>
            <div className="flex items-center gap-1 px-3 py-2 sm:px-4">
                <button
                    type="button"
                    onClick={() => {
                        like()
                    }}
                    className={`flex min-w-0 flex-1 items-center justify-center gap-2 rounded-xl bg-transparent px-2 py-3 text-sm font-medium ${isLiked ? "text-primary" : "text-paragraph"}  transition hover:bg-primary/10 hover:text-primary`}
                >
                    {isLiked ? <><FaHeart size={16} /><span>Liked</span></> : <><FaRegHeart size={16} /><span>Like</span></>}
                </button>

                <Link to={`/posts/${post._id}`}
                    type="button"
                    className="flex min-w-0 flex-1 items-center justify-center gap-2 rounded-xl bg-transparent px-2 py-3 text-sm font-medium text-paragraph transition hover:bg-primary/10 hover:text-primary"
                >
                    <FaRegCommentDots size={16} />
                    <span>Comment</span>
                </Link>

                <button
                    type="button"
                    onClick={() => {
                        // sharePost(post._id);
                        setIsShare(true)
                    }}
                    className="flex min-w-0 flex-1 items-center justify-center gap-2 rounded-xl bg-transparent px-2 py-3 text-sm font-medium text-paragraph transition hover:bg-primary/10 hover:text-primary"
                >
                    <FaShare size={15} />
                    <span>Share</span>
                </button>

                <button
                    type="button"
                    aria-label="Bookmark post"
                    onClick={() => bookmark(post._id)}
                    className={`flex shrink-0 items-center justify-center rounded-xl bg-transparent p-3 ${post.bookmarked ? "text-primary" : "text-paragraph"}  transition hover:bg-primary/10 hover:text-primary`}
                >
                    {post.bookmarked ? <FaBookmark size={16} /> : <FaRegBookmark size={16} />}
                </button>
            </div>

            <ReusableModal isOpened={isShare} changeIsOpened={setIsShare}
                title="Share post" width="sm:!max-w-2xl">
                <div>
                    <textarea
                        placeholder="Say something about this post..."
                        value={shareBody}
                        onChange={(e) => {
                            setShareBody(e.target.value)
                        }}
                        rows={3}
                        className="mt-4 w-full resize-none rounded-xl border border-primary/15 bg-background p-3 text-sm text-heading outline-none focus:border-primary"
                    />

                    {/* Original post preview */}
                    <div className="mt-3 overflow-hidden rounded-xl border border-primary/15">
                        <div className="flex items-center gap-3 p-3">
                            <img
                                src={post.user.photo}
                                alt={post.user.name}
                                className="size-10 rounded-full object-cover"
                            />
                            <div>
                                <p className="font-semibold text-heading">
                                    {post.user.name}
                                </p>
                                <p className="text-sm text-paragraph">
                                    @{post.user.username}
                                </p>
                            </div>
                        </div>

                        {post.body && (
                            <p className="whitespace-pre-wrap px-3 pb-3 text-sm text-heading">
                                {post.body}
                            </p>
                        )}

                        {post.image && (
                            <img
                                src={post.image}
                                alt="Post preview"
                                className="max-h-56 w-full object-contain"
                            />
                        )}
                    </div>

                    <button className="mt-4 btn-primary flex gap-2"
                        onClick={() => {
                            handleSharePost(post._id, shareBody)
                        }}>
                        {shareIsPending ? "Sharing..." : "Share"}
                    </button>
                </div>
            </ReusableModal>
        </>

    )
}
