import type { IPostCardProps } from "../../../interfaces/post";
import {
    FaRegHeart,
} from "react-icons/fa";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import LikesModal from "./LikesModal/LikesModal";
import PostHeader from "./PostHeader/PostHeader";
import PostActions from "./PostActions/PostActions";
import useCheckMyProfile from "../../../shared/Hooks/useCheckMyProfile";

export default function PostCard({ post }: IPostCardProps) {

    const [isLikesModalOpen, setIsLikesModalOpen] = useState(false)
    
    const { checkProfile, isMyProfile } = useCheckMyProfile()
    useEffect(() => {
        checkProfile(post._id)
    }, [checkProfile , post._id]);

    return (
        <>
            <article className="group overflow-hidden rounded-2xl border border-primary/10 bg-card shadow-sm transition duration-300 hover:-translate-y-0.5 hover:shadow-md mb-3">
                {/* Post Header */}

                <PostHeader post={post} isMyProfile={isMyProfile} />

                {/* Post Body */}
                <Link to={`/posts/${post._id}`}>
                    {post.body && (
                        <p className="whitespace-pre-wrap wrap-break-word px-4 pb-4 leading-7 text-heading sm:px-5">
                            {post.body}
                        </p>
                    )}

                    {/* Post Image */}
                    {post.image && (
                        <div className="overflow-hidden bg-background">
                            <img
                                src={post.image}
                                alt="Post"
                                className="max-h-125 w-full object-contain transition duration-500 group-hover:scale-[1.01]"
                            />
                        </div>
                    )}
                </Link>

                {/* Likes and Comments Summary */}
                <div className="flex items-center justify-between gap-3 px-4 py-3 text-sm text-paragraph sm:px-5">
                    <button onClick={() => setIsLikesModalOpen(true)}>
                        <FaRegHeart className="mr-1 inline text-primary" />
                        {post.likesCount} likes
                    </button>
                    <span className="text-right">
                        {post.commentsCount} comments · {post.sharesCount} shares
                    </span>
                </div>
                <div className="mx-4 border-t border-primary/10 sm:mx-5" />

                {/* Post Actions */}
                <PostActions post={post} />

                {/* comments*/}
                {post.topComment && <div className="mt-4 border-t border-primary/10 pt-4 p-4" >
                    {/* Main Comment */}
                    <div className="flex items-start gap-3">
                        <img
                            src={post.topComment.commentCreator.photo}
                            alt={post.topComment.commentCreator.name}
                            className="h-10 w-10 shrink-0 rounded-full object-cover"
                        />

                        <div className="min-w-0 flex-1">
                            <div className="rounded-2xl rounded-tl-sm bg-background px-4 py-3">
                                <p className="text-sm font-semibold text-heading">
                                    {post.topComment.commentCreator.name}
                                </p>
                                <p className="mt-1 wrap-break-word text-sm leading-6 text-paragraph">
                                    {post.topComment.content}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>}

            </article >


            {isLikesModalOpen && <LikesModal setIsLikesModalOpen={setIsLikesModalOpen} postId={post._id} />}


        </>
    );
}
