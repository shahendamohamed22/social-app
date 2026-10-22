import { Link } from "react-router-dom";
import type { ISuggestionCardProps } from "../../../interfaces/suggestion";
import useFollow from "../../../shared/Hooks/useFollowUser";
import { Spinner } from "@heroui/react";
import { FaPlus } from "react-icons/fa";

export default function AllSuggestionsCard({ suggestion }: ISuggestionCardProps) {
    
    const { follow, isPending, isSuccess } = useFollow(suggestion._id)

    return (
        <div className=" group flex flex-col items-center rounded-2xl border border-primary/10 bg-card p-5 text-center shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-primary/30 hover:shadow-lg">
            {/* Profile Photo */}
            <div className="mb-3 h-20 w-20 overflow-hidden rounded-full bg-background ring-4 ring-primary/10 transition-transform duration-300 group-hover:scale-105">
                <Link to={`/profile/${suggestion._id}`}>
                    <img
                        src={suggestion.photo}
                        alt={suggestion.name}
                        className="h-full w-full object-cover"
                    />
                </Link>
            </div>

            {/* User Info */}
           <Link to={`/profile/${suggestion._id}`} className="max-w-full truncate text-base font-semibold text-heading">
                {suggestion.name}
            </Link>

            <p className="mt-1 max-w-full truncate text-sm text-paragraph">
                @{suggestion.username}
            </p>

            {/* Followers Stats */}
            <div className="mt-4 flex w-full items-center justify-center gap-4 border-y border-primary/10 py-3">
                <div className="flex flex-col gap-1">
                    <span className="text-base font-semibold text-heading">
                        {suggestion.followersCount}
                    </span>
                    <span className="text-xs text-paragraph">Followers</span>
                </div>

                <div className="h-8 w-px bg-primary/10" />

                <div className="flex flex-col gap-1">
                    <span className="text-base font-semibold text-heading">
                        {suggestion.mutualFollowersCount}
                    </span>
                    <span className="text-xs text-paragraph">Mutual</span>
                </div>
            </div>

            {/* Follow Button */}
            <button
                type="button"
                disabled={isPending || isSuccess}
                onClick={() => follow()}
                className="mt-4 flex w-full items-center justify-center gap-2 rounded-xl bg-primary px-4 py-3 text-sm font-semibold text-white shadow-none transition-all duration-300 hover:opacity-90 active:scale-95"
            >
                {isPending ? <div className="flex items-center justify-center gap-2"><Spinner color="current" /> ...following</div> : isSuccess ? "following" : <><FaPlus /> <h3>Follow</h3></>}

            </button>
        </div>
    )
}
