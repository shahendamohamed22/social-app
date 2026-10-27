import type { IPostProps } from "../../../interfaces/post";
import { GoBookmarkSlashFill } from "react-icons/go";
import useBookmark from "../../../shared/Hooks/ActionsHooks/useBookMark";
import { Spinner } from "@heroui/react";

export default function SavedCard({ post }: IPostProps) {

    const { bookmark , bookmarkIsPending } = useBookmark()
    
    return (
        <article className="overflow-hidden rounded-xl bg-white shadow-sm transition hover:shadow-md">
            {/* Post Content */}
            <div className="flex items-start gap-4 p-4 sm:p-5">
                <div className="flex min-w-0 flex-1 flex-col justify-between">
                    <p className="line-clamp-5 whitespace-pre-line text-sm leading-6 text-gray-700 sm:text-base">
                        {post.body}
                    </p>

                    <div className="mt-4 flex items-center gap-3">
                        <img
                            src={post.user.photo}
                            alt={post.user.name}
                            className="h-10 w-10 shrink-0 rounded-full object-cover"
                        />

                        <div className="min-w-0">
                            <p className="text-xs text-gray-400">
                                Saved from
                            </p>
                            <p className="truncate text-sm font-semibold text-gray-900">
                                {post.user.name}
                            </p>
                        </div>
                    </div>
                </div>

                {post.image && (
                    <div className="size-32 shrink-0 sm:size-40">
                        <img
                            src={post.image}
                            alt="Post"
                            className="h-full w-full rounded-xl object-cover"
                        />
                    </div>
                )}
            </div>

            {/* Bottom Action */}

            <div className="border-t border-gray-100 px-4 py-2.5 sm:px-5">
                <button
                    type="button"
                    onClick={() => bookmark(post._id)}
                    className="inline-flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium text-gray-500 transition hover:bg-red-50 hover:text-red-500"
                >
                    {bookmarkIsPending ? <Spinner color="current" /> :<>
                        <GoBookmarkSlashFill size={17} />
                        Remove from saved
                    </>}
                </button>
            </div>
        </article>
    );
}
