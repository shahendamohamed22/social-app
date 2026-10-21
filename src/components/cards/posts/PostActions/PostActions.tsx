import { FaBookmark, FaHeart, FaRegBookmark, FaRegCommentDots, FaRegHeart, FaShare } from "react-icons/fa"
import useLike from "../../../../shared/Hooks/useLike";
import useBookmark from "../../../../shared/Hooks/useBookMark";
import { useContext} from "react";
import type { IPostCardProps } from "../../../../interfaces/post";
import { profileContext } from "../../../../shared/context/MyProfileContext";
import { Link } from "react-router-dom";

export default function PostActions({ post }: IPostCardProps) {
    const { myProfileData } = useContext(profileContext);

    const { like } = useLike(post._id);
    const { bookmark } = useBookmark();


    const isLiked = myProfileData?._id
        ? post.likes.includes(myProfileData._id)
        : false;

    return (
        <div className="flex items-center gap-1 px-3 py-2 sm:px-4">
            <button
                type="button"
                onClick={() => {
                    like()
                }
                }
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
    )
}
