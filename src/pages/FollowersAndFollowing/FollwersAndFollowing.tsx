import { useParams } from 'react-router-dom';
import type { IFollowing } from '../../interfaces/userProfile';
import useGetFollowers from '../../shared/Hooks/useGetFollowers';

export default function FollwersAndFollowing() {
    const { type, userId } = useParams()

    const {data , isLoading} = useGetFollowers(userId)
   
    const followData = type === "followers" ? data?.followers : data?.following


    return (
        <div className="mx-auto max-w-3xl space-y-5">

            {/* Header */}
            <div>
                <h1 className="text-2xl font-bold text-heading sm:text-3xl">
                    {type === "followers" ? "Followers" : "Following"}
                </h1>
                <p className="mt-2 text-sm text-paragraph">
                    {type === "followers" ? "Discover who's following this profile." : "Discover who this profile follows."}
                </p>
            </div>

            {/* Main Card */}
            <section className="overflow-hidden rounded-2xl border border-primary/10 bg-card shadow-sm">

                <div className="p-4 sm:p-5">

                    {/* People List */}
                    <div className="mt-3 divide-y divide-primary/10">
                        {isLoading ? (
                            [1, 2, 3, 4].map((item) => (
                                <div
                                    key={item}
                                    className="flex animate-pulse items-center gap-3 border-b border-primary/10 py-4 last:border-0"
                                >
                                    <div className="h-12 w-12 shrink-0 rounded-full bg-primary/10" />

                                    <div className="flex-1 space-y-2">
                                        <div className="h-4 w-28 rounded bg-primary/10" />
                                        <div className="h-3 w-40 max-w-full rounded bg-primary/10" />
                                    </div>
                                </div>
                            ))
                        ) : followData?.length ? (
                            followData.map((item: IFollowing) => (
                                <div
                                    key={item._id}
                                    className="flex items-center gap-3 py-4"
                                >
                                    <img
                                        src={item.photo}
                                        alt={item.name}
                                        className="h-12 w-12 rounded-full border-2 border-primary/10 object-cover"
                                    />

                                    <div className="min-w-0 flex-1">
                                        <h3 className="truncate text-sm font-semibold text-heading">
                                            {item.name}
                                        </h3>

                                        <p className="mt-1 text-xs text-paragraph">
                                            {item.followersCount} followers · {item.followingCount} following
                                        </p>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <p className="py-8 text-center text-sm text-paragraph">
                                {type === "followers"
                                    ? "No followers yet."
                                    : "Not following anyone yet."}
                            </p>
                        )}


                    </div>
                </div>
            </section>
        </div>
    );
}
