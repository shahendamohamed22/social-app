import { FiUserPlus } from "react-icons/fi";
import type { ISuggestionCardProps } from "../../../interfaces/suggestion";

export default function AllSuggestionsCard({suggestion} : ISuggestionCardProps) {
    return (

        <div className=" group flex flex-col items-center rounded-2xl border border-primary/10 bg-card p-5 text-center shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-primary/30 hover:shadow-lg">
            {/* Profile Photo */}
            <div className="mb-3 h-20 w-20 overflow-hidden rounded-full bg-background ring-4 ring-primary/10 transition-transform duration-300 group-hover:scale-105">
                <img
                    src={suggestion.photo}
                    alt={suggestion.name}
                    className="h-full w-full object-cover"
                />
            </div>

            {/* User Info */}
            <h3 className="max-w-full truncate text-base font-semibold text-heading">
                {suggestion.name}
            </h3>

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
                className="mt-4 flex w-full items-center justify-center gap-2 rounded-xl bg-primary px-4 py-3 text-sm font-semibold text-white shadow-none transition-all duration-300 hover:opacity-90 active:scale-95"
            >
                <FiUserPlus size={17} />
                Follow
            </button>
        </div>
    )
}
