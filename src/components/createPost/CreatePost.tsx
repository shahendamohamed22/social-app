import { useContext, useId, useState } from "react";
import { FiImage, FiGlobe } from "react-icons/fi";
import { profileContext } from "../../shared/context/MyProfileContext";
import useCreatePost from "../../shared/Hooks/useCreatePosts";
import usePostActions from "../../shared/Hooks/usePostActions";
import { toast } from "@heroui/react";
import type { ICratePostProps } from "../../interfaces/postActions";
import { IoIosCloseCircle } from "react-icons/io";

export default function CreatePost({ isEdit, setIsEdit, post }: ICratePostProps) {
    const { myProfileData } = useContext(profileContext);

    const [postPhoto, setPostPhoto] = useState<File | null>(null)
    const [postText, setPostText] = useState<string>(post?.body || "")
    const [postImagePreview, setPostImagePreview] = useState<string>(post?.image || "")

    const { createPost, creatPending } = useCreatePost()
    const { updatePost, updatePending } = usePostActions()

    const photoInputId = useId()

    function handleCreatePost() {

        if (!postText.trim() && !post.body && !postPhoto && !post.image) {
            toast.danger("Please add text or an image");
            return;
        }
        const formdata = new FormData();

        if (postText.trim()) {
            formdata.append("body", postText);
        }

        if (postPhoto) {
            formdata.append("image", postPhoto);
        }

        if (isEdit && post) {
            updatePost({ postId: post._id, formdata }, {
                onSuccess: () => {
                    setPostPhoto(null)
                    setPostText("")
                    setIsEdit?.(false)
                    toast.success("Post is updated")
                }
            });
        } else {
            createPost(formdata, {
                onSuccess: () => {
                    setPostPhoto(null)
                    setPostText("")
                    toast.success("Post is created")
                }
            });
        }
    }

    function removePhoto() {
        setPostPhoto(null)
        setPostImagePreview("")
    }


    return (
        <section className="rounded-2xl border border-primary/10 bg-card p-4 shadow-sm sm:p-5">
            {/* Header */}
            <div className="flex items-center gap-3">
                <img
                    src={myProfileData?.photo || ""}
                    alt={myProfileData?.name || "Profile"}
                    className="h-12 w-12 shrink-0 rounded-full border-2 border-primary/10 object-cover"
                />

                <div>
                    <h3 className="font-semibold text-heading">
                        {myProfileData?.name || "Your Profile"}
                    </h3>

                    <div className="mt-1 flex items-center gap-1 text-xs text-paragraph">
                        <FiGlobe size={13} />
                        <span>Public</span>
                    </div>
                </div>
            </div>

            {/* Text Area */}
            <div className="mt-4">
                <textarea
                    placeholder={`What's on your mind${myProfileData?.name ? `, ${myProfileData.name}` : ""}?`} rows={3}
                    value={postText}
                    onChange={(e) => setPostText(e.target.value)}
                    className="w-full resize-none rounded-xl bg-background px-4 py-3 text-sm leading-6 text-heading outline-none transition placeholder:text-paragraph focus:ring-2 focus:ring-primary/20"
                />
            </div>

            {/* Image Preview Placeholder */}
            {(postPhoto || post?.image) &&
                <label htmlFor={photoInputId} className="relative mt-4 flex h-25 w-25 items-center justify-center rounded-xl bg-primary/10 text-primary cursor-pointer">
                    <img src={postPhoto ? postImagePreview : post.image} alt="post photo" className="object-contain rounded-xl w-full h-full" />
                    <button
                        type="button"
                        onClick={removePhoto}
                        className="absolute -right-2 -top-2 rounded-full bg-card text-primary"
                    >
                        <IoIosCloseCircle size={24} />
                    </button>
                </label>
            }

            <div className="mt-4 flex items-center justify-between gap-3 border-t border-primary/10 pt-4">

                <input type="file" className="hidden"
                    id={photoInputId}
                    onChange={(e) => {
                        if (e.target.files?.[0]) {
                            setPostPhoto(e.target.files?.[0])
                            setPostImagePreview(URL.createObjectURL(e.target.files?.[0]))
                        }
                    }} />
                <label htmlFor={photoInputId} className="flex w-auto items-center gap-2 rounded-xl bg-transparent px-3 py-2.5 text-sm font-medium text-paragraph shadow-none transition hover:bg-primary/10 hover:text-primary cursor-pointer">
                    <FiImage size={19} />
                    <span>Photo</span>
                </label>

                <button
                    type="button"
                    onClick={handleCreatePost}
                    className="w-auto rounded-xl bg-primary px-6 py-2.5 text-sm font-semibold text-white shadow-none transition hover:opacity-90 active:scale-95"
                >
                    <>
                        {isEdit ? (updatePending ? "Update.." : "Update") : (creatPending ? "posting.." : "Post")}
                    </>
                </button>
            </div>
        </section>
    );
}

