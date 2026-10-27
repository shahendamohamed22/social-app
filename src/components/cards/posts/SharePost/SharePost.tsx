import { useNavigate } from "react-router-dom";
import type { ISharedPost } from "../../../../interfaces/post";


export default function SharedPostCard({ post }: { post: ISharedPost }) {
    const navigate = useNavigate()

    return (
        <div onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            navigate(`/posts/${post._id}`);
        }}
            className="cursor-pointer">
            <div className="mt-4 rounded-xl border border-primary/10 bg-background p-4">
                {/* Original Post User */}
                <div className="flex items-center gap-3">
                    <img
                        src={post.user.photo}
                        alt={post.user.name}
                        className="size-10 shrink-0 rounded-full object-cover"
                    />

                    <div className="min-w-0">
                        <p className="font-semibold text-heading">
                            {post.user.name}
                        </p>

                        <p className="text-sm text-paragraph">
                            @{post.user.username}
                        </p>
                    </div>
                </div>

                {/* Original Post Body */}
                {post.body && (
                    <p className="mt-3 whitespace-pre-wrap wrap-break-word leading-7 text-heading">
                        {post.body}
                    </p>
                )}

                {/* Original Post Image */}
                {post.image && (
                    <img
                        src={post.image}
                        alt="Shared post"
                        className="mt-3 max-h-125 w-full rounded-xl object-contain"
                    />
                )}
            </div>
        </div>
    );
}