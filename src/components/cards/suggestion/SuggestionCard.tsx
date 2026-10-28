import { Link } from "react-router-dom";
import { FiUser } from "react-icons/fi";
import { FaPlus } from "react-icons/fa";
import { Spinner } from "@heroui/react";
import useFollow from "../../../shared/Hooks/ActionsHooks/useFollowUser";
import type { ISuggestionCardProps } from "../../../interfaces/suggestion";


export default function SuggestionCard({ suggestion }: ISuggestionCardProps) {
    const { follow, isPending, isSuccess } = useFollow(suggestion._id);

    const hasMutualFollowers = (suggestion.mutualFollowersCount ?? 0) > 0;

    return (
        <div className="mb-2 flex w-full min-w-0 items-center gap-3 rounded-2xl border border-primary/10 bg-card p-3 shadow-sm transition hover:border-primary/25 sm:gap-4 sm:p-4">
            {/* suggestion Image */}
            <Link to={`/profile/${suggestion._id}`} className="shrink-0">
                <img
                    src={suggestion.photo}
                    alt={suggestion.name}
                    className="size-12 rounded-full object-cover ring-2 ring-primary/10 sm:size-14"
                />
            </Link>

            {/* suggestion Info */}
            <div className="min-w-0 flex-1">
                <Link to={`/profile/${suggestion._id}`}>
                    <h3 className="truncate text-sm font-semibold text-heading transition hover:text-primary sm:text-base">
                        {suggestion.name}
                    </h3>

                    <p className="mt-0.5 truncate text-xs text-paragraph sm:text-sm">
                        @{suggestion.username}
                    </p>
                </Link>

                {/* Followers Info */}
                <div className="mt-2 flex items-center gap-1.5 text-xs text-paragraph">
                    <FiUser size={14} className="shrink-0 text-primary" />

                    <span className="truncate">
                        {hasMutualFollowers
                            ? `${suggestion.mutualFollowersCount} mutual followers`
                            : `${suggestion.followersCount} followers`}
                    </span>
                </div>
            </div>

            {/* Follow Button */}
            <button
                type="button"
                onClick={() => follow()}
                disabled={isPending || isSuccess}
                className="btn-primary flex shrink-0 items-center justify-center gap-1.5 px-3 py-2 text-xs disabled:opacity-60 sm:px-4 sm:text-sm"
            >
                {isPending ? <Spinner color="current" size="sm" /> :
                    <><FaPlus size={11} /><span>Follow</span></>}
            </button>
        </div>
    );
}