import { toast } from "@heroui/react";
import { useState, type Dispatch, type SetStateAction } from "react";
import { IoIosCloseCircle } from "react-icons/io";
import { TbPhotoCirclePlus } from "react-icons/tb";
import type { IComment } from "../../../interfaces/comment";
import useCommentActions from "../../../shared/Hooks/CommentHooks/useCommentsActions";

export default function ModalCommentEdit({ comment, changeIsOpened }: { comment: IComment, changeIsOpened: Dispatch<SetStateAction<boolean>> }) {

    const [commentText, setCommentText] = useState(comment.content);
    const [commentPhoto, setCommentPhoto] = useState<File | null>(null);
    const [previewCommentPhoto, setPreviewCommentPhoto] = useState<string | null>(comment.image);

    function removePhoto() {
        setCommentPhoto(null)
        setPreviewCommentPhoto(null)
    }

    const { updateComment, updatePending } = useCommentActions()

    function handleUpdate() {

        const formdata = new FormData();

        if (commentText.trim()) {
            formdata.append("content", commentText);
        }

        if (commentPhoto) {
            formdata.append("image", commentPhoto);
        }

        updateComment({ postId: comment.post, formdata, commentId: comment._id }, {
            onSuccess: () => {
                setCommentPhoto(null)
                setCommentText("")
                setPreviewCommentPhoto("")
                changeIsOpened(false)

                toast.success("Comment is updated")
            },

            onError: (error) => {
                console.log(error);
                toast.danger("Failed to update comment");
            },

        });
    }

    return (
        <div className="space-y-4">
            {/* Comment Input */}
            <div className="flex items-center gap-3 rounded-2xl border border-primary/15 bg-background px-4 py-3 transition focus-within:border-primary">
                <input
                    type="text"
                    value={commentText}
                    onChange={(e) => setCommentText(e.target.value)}
                    placeholder="Write a comment..."
                    className="min-w-0 flex-1 bg-transparent text-sm text-heading outline-none placeholder:text-paragraph"
                />

                <label
                    htmlFor="edit-comment-photo"
                    className="shrink-0 cursor-pointer text-paragraph transition hover:text-primary"
                >
                    <TbPhotoCirclePlus size={24} />
                </label>

                <input
                    id="edit-comment-photo"
                    type="file"
                    accept="image/*"
                    hidden
                    onChange={(e) => {
                        if (e.target.files?.[0]) {
                            setCommentPhoto(e.target.files?.[0]);
                            setPreviewCommentPhoto(URL.createObjectURL(e.target.files?.[0]))
                        }
                    }}
                />
            </div>

            {/* Image Preview */}
            {previewCommentPhoto && (
                <div className="relative h-24 w-24">
                    <img
                        src={previewCommentPhoto}
                        alt="Comment preview"
                        className="h-full w-full rounded-xl border border-primary/10 object-cover"
                    />

                    <button
                        type="button"
                        onClick={removePhoto}
                        className="absolute -right-2 -top-2 rounded-full bg-card text-primary"
                    >
                        <IoIosCloseCircle size={24} />
                    </button>
                </div>
            )}

            {/* Save Button */}
            <button className="btn-primary flex gap-2"
                onClick={handleUpdate}
            >
                {updatePending ? "Updating ..." : "Update"}
            </button>
        </div>
    );
}

