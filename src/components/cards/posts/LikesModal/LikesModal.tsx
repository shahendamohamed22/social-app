import { Spinner } from "@heroui/react"
import useLike from "../../../../shared/Hooks/ActionsHooks/useLike"
import type { Dispatch, SetStateAction } from "react"
import type { IUser } from "../../../../interfaces/userProfile"

export default function LikesModal({ setIsLikesModalOpen, postId }: {setIsLikesModalOpen:Dispatch<SetStateAction<boolean>> , postId : string}) {
    const { postLikes, postLikesLoading } = useLike(postId)

    return (
        <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
            onClick={() => setIsLikesModalOpen(false)}
        >
            <div
                className="w-full max-w-md rounded-2xl bg-card p-5 shadow-xl"
                onClick={(e) => e.stopPropagation()}
            >
                <div className="mb-4 flex items-center justify-between">
                    <h2 className="text-lg font-semibold text-heading">
                        People who liked this post
                    </h2>

                    <button
                        type="button"
                        onClick={() => setIsLikesModalOpen(false)}
                        className="text-xl text-paragraph hover:text-primary"
                    >
                        &times;
                    </button>
                </div>

                <div className="max-h-96 space-y-4 overflow-y-auto">
                    {postLikesLoading ? (
                        <div className="flex justify-center py-6">
                            <Spinner />
                        </div>
                    ) : postLikes?.length ? (
                        postLikes.map((user: IUser) => (
                            <div key={user._id} className="flex items-center gap-3">
                                <img
                                    src={user.photo}
                                    alt={user.name}
                                    className="h-11 w-11 rounded-full object-cover"
                                />

                                <div className="min-w-0">
                                    <p className="font-semibold text-heading">
                                        {user.name}
                                    </p>
                                    <p className="text-sm text-paragraph">
                                        @{user.username}
                                    </p>
                                </div>
                            </div>
                        ))
                    ) : (
                        <p className="py-6 text-center text-paragraph">
                            No likes yet
                        </p>
                    )}
                </div>
            </div>
        </div>
    )
}
