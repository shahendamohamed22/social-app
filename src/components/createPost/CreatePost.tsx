import { useContext, useState } from "react";
import {
    FiImage,
    FiGlobe,
} from "react-icons/fi";
import { profileContext } from "../../shared/context/MyProfileContext";
import useCreatePost from "../../shared/Hooks/useCreatePosts";
import { toast } from "@heroui/react";

export default function CreatePost() {
    const { myProfileData } = useContext(profileContext);

    const [postPhoto, setPostPhoto] = useState<File | null>(null)
    const [postText, setPostText] = useState("")

    const { createPost, isPending } = useCreatePost()

    function handleCreatePost() {

        let formdata = new FormData()
        formdata.append("body", postText);
        if (postPhoto) {
            formdata.append("image", postPhoto);
        }

        createPost(formdata, {
            onSuccess: () => {
                setPostPhoto(null)
                setPostText("")
                toast.success("post is created")
            }
        });
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
            {postPhoto && <div className="mt-3 w-fit cursor-pointer gap-3 rounded-xl border border-dashed border-primary/20 bg-background p-3 transition hover:border-primary/50 hover:bg-primary/5">
                <div className="flex h-25 w-25 items-center justify-center rounded-xl bg-primary/10 text-primary">
                    <img src={URL.createObjectURL(postPhoto)} alt={postPhoto.name} />
                    <FiImage size={40} />
                </div>
            </div>}

            <div className="mt-4 flex items-center justify-between gap-3 border-t border-primary/10 pt-4">

                <input type="file" className="hidden"
                    id="create-post"
                    onChange={(e) => setPostPhoto(e.target.files?.[0] ?? null)} />
                <label htmlFor="create-post" className="flex w-auto items-center gap-2 rounded-xl bg-transparent px-3 py-2.5 text-sm font-medium text-paragraph shadow-none transition hover:bg-primary/10 hover:text-primary">
                    <FiImage size={19} />
                    <span>Photo</span>
                </label>

                <button
                    type="button"
                    onClick={handleCreatePost}
                    className="w-auto rounded-xl bg-primary px-6 py-2.5 text-sm font-semibold text-white shadow-none transition hover:opacity-90 active:scale-95"
                >
                    {isPending ? "posting" : "Post"}
                </button>
            </div>
        </section>
    );
}

