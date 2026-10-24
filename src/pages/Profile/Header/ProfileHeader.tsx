import { useState } from "react";
import { FiBookmark, FiUserPlus, FiUsers, FiCamera, FiTrash2 } from "react-icons/fi";
import type { IProfileProps } from "../../../interfaces/myProfile";
import useFollow from "../../../shared/Hooks/useFollowUser";
import { Spinner, toast } from "@heroui/react";
import { FaPlus } from "react-icons/fa";
import { Link } from "react-router-dom";
import useUploadPhoto from "../../../shared/Hooks/useUploadPhoto";
import useSavedPosts from "../../../shared/Hooks/useSavedPosts";

export default function ProfileHeader({ profile, isFollow, isMyProfile }: IProfileProps) {
    const { follow, isPending } = useFollow(profile._id);

    const { posts, isLoading } = useSavedPosts()

    const [showPhotoOptions, setShowPhotoOptions] = useState(false);

    const { uploadPhoto, photoIsPending } = useUploadPhoto()
    const [coverPreview, setCoverPreview] = useState<string>("")

    function handleProfilePhoto(file: File | string) {
        const formData = new FormData()

        formData.append("photo", file)

        uploadPhoto(formData, {
            onSuccess: () => {
                toast.success("Profile photo is updated")
            }
        })
    }

    const stats = [
        { label: "Followers", value: profile.followersCount, icon: FiUsers, to: `/profile/${profile._id}/followers` },
        { label: "Following", value: profile.followingCount, icon: FiUserPlus, to: `/profile/${profile._id}/following` },
        { label: "Saved Posts", value: isLoading ? <Spinner size="sm" color="current" /> : posts.length, icon: FiBookmark, to: "/saved-posts" },
    ];

    return (
        <section className="overflow-hidden rounded-2xl border border-primary/10 bg-card shadow-sm">
            {/* Cover */}
            <div className="relative h-40 bg-linear-to-r from-primary/40 via-primary/20 to-background sm:h-52">
                {profile.cover || coverPreview && (
                    <img
                        src={profile.cover || coverPreview}
                        alt="Cover"
                        className="h-full w-full object-cover"
                    />
                )}
                <label htmlFor="cover-upload"
                    className="absolute bottom-3 right-3 flex h-12 w-12 cursor-pointer items-center justify-center rounded-xl border border-primary/20 bg-card/90 text-primary shadow-md transition hover:bg-card"
                    title="Upload cover photo">
                    <FiCamera size={22} />
                </label>

                <input id="cover-upload" type="file" accept="image/*" className="hidden"
                    onChange={(e) => {
                        const file = e.target.files?.[0];

                        if (file) {
                            setCoverPreview(URL.createObjectURL(file))
                            toast.success("Cover photo is updated")
                        }
                    }} />

            </div>

            <div className="px-5 pb-6 sm:px-7">
                {/* Profile info */}
                <div className="flex flex-wrap items-end gap-4">
                    <div className="relative -mt-14 shrink-0 sm:-mt-16">
                        <button
                            type="button"
                            disabled={!isMyProfile}
                            onClick={() => setShowPhotoOptions(!showPhotoOptions)}
                            className="relative block rounded-full">
                            {photoIsPending ?
                                <div className="flex items-center justify-center rounded-full border border-paragraph/20 bg-card object-cover sm:size-32">
                                    <Spinner color="current" />
                                </div> : <img src={profile.photo} alt={profile.name}
                                    className="size-24 rounded-full border-4 border-card bg-card object-cover sm:size-32" />
                            }

                            {isMyProfile && (
                                <span className="absolute bottom-1 right-1 rounded-full bg-primary p-2 text-white">
                                    <FiCamera size={16} />
                                </span>
                            )}
                        </button>

                        {isMyProfile && showPhotoOptions && (
                            <div className="absolute left-0 top-full z-20 mt-2 w-48 rounded-xl border border-primary/10 bg-card p-2 shadow-lg">
                                <label htmlFor="profile-photo"
                                    className="flex w-full items-center gap-2 rounded-lg p-3 text-sm text-heading hover:bg-primary/10 font-medium">
                                    <FiCamera />
                                    Change photo
                                </label>
                                <button
                                    type="button"
                                    onClick={() => {
                                        setShowPhotoOptions(false);
                                    }}
                                    className="flex w-full items-center gap-2 rounded-lg p-3 text-sm text-red-500 hover:bg-red-500/10 font-medium"
                                >
                                    <FiTrash2 />
                                    Remove photo
                                </button>

                                <input id="profile-photo" type="file" accept="image/*" className="hidden"
                                    onChange={(e) => {
                                        const file = e.target.files?.[0];
                                        if (file) {
                                            handleProfilePhoto(file)
                                        }
                                        e.target.value = "";
                                    }}
                                />
                            </div>
                        )}
                    </div>

                    <div className="min-w-0 flex-1 pb-1">
                        <h1 className="mt-3 wrap-break-word text-2xl font-bold text-heading sm:text-3xl">
                            {profile.name}
                        </h1>
                        <p className="mt-1 text-sm text-paragraph">
                            @{profile.username}
                        </p>
                    </div>
                </div>

                <div className="my-5 border-t border-primary/10" />

                <div className="flex flex-wrap items-center justify-between gap-3">
                    <div className="flex flex-wrap gap-2">
                        {stats.filter(({ label }) => label !== "Saved Posts" || isMyProfile).map(
                            ({ label, value, icon: Icon, to }) => (
                                <Link to={to} key={label}
                                    className="flex items-center gap-2 rounded-xl bg-background p-3 transition hover:bg-primary/5 sm:p-4" >
                                    <span className="text-lg font-bold text-heading">
                                        {value}
                                    </span>
                                    <span className="text-xs text-paragraph sm:text-sm">
                                        {label}
                                    </span>
                                    <Icon className="text-primary" size={20} />
                                </Link>
                            ))}
                    </div>

                    {!isMyProfile && (
                        <button type="button" onClick={() => follow()}
                            disabled={isPending}
                            className={`${isFollow ? "btn-secondary" : "btn-primary"} flex items-center gap-2 hover:opacity-90 active:scale-95`}
                        >
                            {isPending ? <> <Spinner color="current" size="sm" /> {isFollow ? "Unfollowing..." : "Following..."}  </>
                                : isFollow ? "Unfollow" : <><FaPlus /><span>Follow</span></>}
                        </button>
                    )}
                </div>
            </div>
        </section>
    );
}