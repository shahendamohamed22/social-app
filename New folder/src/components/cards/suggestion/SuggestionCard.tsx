import { FaPlus } from "react-icons/fa";
import { type ISuggestionCardProps } from "../../../interfaces/suggestion";
import useFollow from "../../../shared/Hooks/useFollowUser";
import { Spinner } from "@heroui/react";
import { Link } from "react-router-dom";

export default function SuggestionCard({ suggestion }: ISuggestionCardProps) {

  const { follow, isPending, isSuccess } = useFollow(suggestion._id)
  return (<>
    <div className="mt-3 flex items-center justify-between gap-3 rounded-2xl border border-primary/10 bg-card p-3 transition duration-300 hover:border-primary/25 hover:shadow-sm">
      {/* User Info */}
      <div className="flex min-w-0 flex-1 items-center gap-3">
        <div className="h-12 w-12 shrink-0 overflow-hidden rounded-full bg-background ring-2 ring-primary/10">
          <Link to={`/profile/${suggestion._id}`}>
            <img
              src={suggestion.photo}
              alt={suggestion.name}
              className="h-full w-full object-cover"
            />
          </Link>
        </div>

        <div className="min-w-0">
          <Link to={`/profile/${suggestion._id}`} className="truncate text-sm font-semibold text-heading">
            {suggestion.name}
          </Link>

          {suggestion.mutualFollowersCount > 0 && (
            <p className="mt-1 text-xs text-paragraph">
              {suggestion.mutualFollowersCount} mutual followers
            </p>
          )}
        </div>
      </div>

      {/* Follow Button */}
      <button
        type="button"
        disabled={isPending || isSuccess}
        onClick={() => follow()}
        className="flex items-center gap-2 shrink-0 rounded-lg bg-primary px-3 py-2 text-sm font-semibold text-white transition hover:opacity-90 active:scale-95"
      >
        {isPending ? <div className="flex items-center justify-center gap-2"><Spinner color="current" /> ...following</div> : isSuccess ? "following" : <><FaPlus /> <h3>Follow</h3></>}
      </button>
    </div>
  </>
  )
}
