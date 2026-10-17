import { FiBookmark , FiUserPlus, FiUsers } from 'react-icons/fi'
import type { IProfileProps } from '../../../interfaces/myProfile'
import useFollow from '../../../shared/Hooks/useFollowUser';
import { Spinner } from '@heroui/react';
import { FaPlus } from 'react-icons/fa';

export default function ProfileHeader({ profile, isFollow, isMyProfile }: IProfileProps) {

    const { follow, isPending } = useFollow(profile._id)

    const stats = [
        { label: "Followers", value: profile.followersCount, icon: FiUsers, },
        { label: "Following", value: profile.followingCount, icon: FiUserPlus },
        { label: "Saved Posts", value: profile.bookmarksCount, icon: FiBookmark, },
    ];

    return (
        <section className="rounded-2xl border border-primary/10 bg-card p-5 shadow-sm sm:p-7">
            <div className="flex items-center gap-4 sm:gap-6">
                <img
                    src={profile.photo}
                    alt={profile.name}
                    className="h-20 w-20 shrink-0 rounded-full border-4 border-primary/10 object-cover sm:h-28 sm:w-28"
                />

                <div className="min-w-0">
                    <h1 className="break-words text-2xl font-bold text-heading sm:text-3xl">
                        {profile.name}
                    </h1>

                    <p className="mt-1 text-sm text-paragraph">
                        @{profile.username}
                    </p>
                </div>
            </div>

            <div className="mt-6 border-t border-primary/10 pt-5"></div>

            {/* Statistics */}
            <div className='flex justify-between items-center'>
                <div className=' flex gap-3'>
                    {stats.map(({ label, value, icon: Icon }) => (
                        <div key={label}
                            className="rounded-xl bg-background p-3 flex items-center gap-2 transition hover:bg-primary/5 sm:p-4"
                        >

                            <p className="text-lg font-bold text-heading">
                                {value}
                            </p>

                            <p className="mt-1 text-xs text-paragraph sm:text-sm">
                                {label}
                            </p>
                            <Icon className=" text-primary" size={20} />
                        </div>
                    ))}

                </div>
                {!isMyProfile && <button
                    type="button"
                    onClick={() => follow()}
                    className={`${isFollow ? "btn-secondary" : "btn-primary"} hover:opacity-90 active:scale-95 flex gap-2 items-center flex items-center gap-2`}                >
                    {isPending ? <><Spinner color="current" size="sm" />
                     {isFollow ? <span>...Unfollowing</span> : <span>...Following</span>}  </>
                        : isFollow ? "Unfollow"
                            : <><FaPlus /><span>Follow</span></>
                    }
                </button>}
            </div>
        </section>
    )
}
