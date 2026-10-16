import { useContext } from "react";
import {
    FiImage,
    FiGlobe,
    FiSmile,
    FiPlus,
} from "react-icons/fi";
import { profileContext } from "../../shared/context/MyProfileContext";

export default function CreatePost() {
    const { myProfileData } = useContext(profileContext);

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
                    placeholder={`What's on your mind${myProfileData?.name ? `, ${myProfileData.name}` : ""}?`}
                    rows={3}
                    className="w-full resize-none rounded-xl bg-background px-4 py-3 text-sm leading-6 text-heading outline-none transition placeholder:text-paragraph focus:ring-2 focus:ring-primary/20"
                />
            </div>

            {/* Image Preview Placeholder */}
            <div className="mt-3 flex cursor-pointer items-center gap-3 rounded-xl border border-dashed border-primary/20 bg-background p-3 transition hover:border-primary/50 hover:bg-primary/5">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10 text-primary">
                    <FiImage size={22} />
                </div>

                <div className="flex-1">
                    <p className="text-sm font-medium text-heading">
                        Add to your post
                    </p>
                    <p className="mt-1 text-xs text-paragraph">
                        Share a photo with your friends
                    </p>
                </div>

                <FiPlus className="text-paragraph" size={20} />
            </div>

            {/* Actions */}
            <div className="mt-4 flex items-center justify-between gap-3 border-t border-primary/10 pt-4">
                <button
                    type="button"
                    className="!flex !w-auto !items-center !gap-2 !rounded-xl !bg-transparent !px-3 !py-2.5 !text-sm !font-medium !text-paragraph !shadow-none transition hover:!bg-primary/10 hover:!text-primary"
                >
                    <FiImage size={19} />
                    <span>Photo</span>
                </button>

                <button
                    type="button"
                    className="!w-auto !rounded-xl !bg-primary !px-6 !py-2.5 !text-sm !font-semibold !text-white !shadow-none transition hover:!opacity-90 active:!scale-95"
                >
                    Post
                </button>
            </div>
        </section>
    );
}
