import { useEffect, useState } from "react";
import { BsThreeDotsVertical } from "react-icons/bs";
import { FaPen, FaTrash } from "react-icons/fa";
import useCommentActions from "../../../shared/Hooks/useCommentsActions";
import { toast } from "@heroui/react";
import type { IComment } from "../../../interfaces/comment";
import useCheckMyProfile from "../../../shared/Hooks/useCheckMyProfile";
import ModalEdit from "../../ModalForEdit/ModalEdit";
import ModalCommentEdit from "../ModalCommentEdit/ModalCommentEdit";

export default function CommentActions({ comment }: { comment: IComment }) {
    const { checkProfile, isMyProfile } = useCheckMyProfile()

    const [commentActions, setCommentActions] = useState(false);
    const [isEdit, setIsEdit] = useState(false);

    const { deleteComment } = useCommentActions()
    function handleDeletePost() {
        deleteComment({ postId: comment.post, commentId: comment._id }, {
            onSuccess: () => {
                toast.success("Comment is deleted")
            }
        })

        setCommentActions(false)
    }

    useEffect(() => {
        checkProfile(comment.commentCreator._id)
    }, [comment.commentCreator._id , checkProfile]);

    return (
        <>
            {isMyProfile && <div className="relative">
                <button className="w-10 h-10 rounded-xl flex items-center justify-center hover:bg-primary/10
                                      hover:text-primary text-heading transition cursor-pointer"
                    onClick={() => setCommentActions(!commentActions)}>
                    <BsThreeDotsVertical />
                </button>
                {commentActions &&
                    <div className="absolute top-1 right-12 bg-input rounded-xl px-4 py-2 border border-primary/10 shadow z-100 ">
                        <ul>
                            <button className="group/li flex items-center gap-3 px-3 py-2 rounded-xl  hover:bg-primary/10 hover:text-primary transition cursor-pointer"
                                onClick={() => {
                                    setCommentActions(false)
                                    setIsEdit(true)
                                }}><FaPen />
                                <span className="text-heading font-medium group-hover/li:text-primary">Edit</span>
                            </button>

                            <button className="mt-1 group/li flex items-center gap-3 px-3 py-2 rounded-xl  hover:bg-red-500/10 hover:text-red-500 transition cursor-pointer"
                                onClick={handleDeletePost}>
                                <FaTrash /> <span className="text-heading font-medium group-hover/li:text-red-500">Delete</span>
                            </button>
                        </ul>
                    </div>}
            </div>}

            <ModalEdit isOpened={isEdit} changeIsOpened={setIsEdit} title="Edit Comment">
                <ModalCommentEdit comment={comment} changeIsOpened={setIsEdit} />
            </ModalEdit>


        </>
    )
}
