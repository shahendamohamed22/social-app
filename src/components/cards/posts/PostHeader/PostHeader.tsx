import { Link } from "react-router-dom"
import type { IPostCardProps } from "../../../../interfaces/post"
import { BsThreeDotsVertical } from "react-icons/bs";
import { FaPen, FaTrash } from "react-icons/fa";
import { toast } from "@heroui/react";
import { useEffect, useState } from "react";
import usePostActions from "../../../../shared/Hooks/usePostActions";
import ModalEdit from "../../../ModalForEdit/ModalEdit";
import CreatePost from "../../../createPost/CreatePost";
import useCheckMyProfile from "../../../../shared/Hooks/useCheckMyProfile";

export default function PostHeader({ post }: IPostCardProps) {

    const { isMyProfile, checkProfile } = useCheckMyProfile()
    const [postActions, setPostActions] = useState(false);
    const { deletePost } = usePostActions()

    const [isEdit, setIsEdit] = useState(false);

    function handleDeletePost() {

        deletePost(post._id, {
            onSuccess: () => {
                toast.success("Post is deleted")
            }
        })

        setPostActions(false)
    }

    useEffect(() => {
        checkProfile(post.user._id)
    })

    return (
        <>
            <div className="flex items-center justify-between gap-3 p-4 sm:p-5">
                <div className="flex items-center gap-3">
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
                            <time>
                                {new Date(post.createdAt).toLocaleString()}
                            </time>
                        </div>
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
                                <button className="group/li flex items-center gap-3 px-3 py-2 rounded-xl  hover:bg-primary/10 hover:text-primary transition cursor-pointer"
                                    onClick={() => {
                                        setIsEdit(true)
                                        setPostActions(false)
                                    }}>
                                    <FaPen /><span className="text-heading font-medium group-hover/li:text-primary">Edit</span>
                                </button>

                                <button className="mt-1 group/li flex items-center gap-3 px-3 py-2 rounded-xl  hover:bg-red-500/10 hover:text-red-500 transition cursor-pointer"
                                    onClick={handleDeletePost}>
                                    <FaTrash /> <span className="text-heading font-medium group-hover/li:text-red-500">Delete</span>
                                </button>
                            </ul>
                        </div>}
                </div>}
            </div>


            <ModalEdit isOpened={isEdit} changeIsOpened={setIsEdit}
                title="Edit Post" width="sm:!max-w-2xl">
                <CreatePost
                    isEdit={isEdit}
                    setIsEdit={setIsEdit}
                    post={post}
                />
            </ModalEdit>

        </>
    )
}
