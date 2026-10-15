import { FaPlus } from "react-icons/fa";
import { type ISuggestionCardProps } from "../../../interfaces/suggestion";

export default function SuggestionCard({ suggestion }: ISuggestionCardProps) {
  return (<>
    <div className="mt-3 flex items-center justify-between gap-3 rounded-2xl border border-primary/10 bg-card p-3 transition duration-300 hover:border-primary/25 hover:shadow-sm">
      {/* User Info */}
      <div className="flex min-w-0 flex-1 items-center gap-3">
        <div className="h-12 w-12 shrink-0 overflow-hidden rounded-full bg-background ring-2 ring-primary/10">
          <img
            src={suggestion.photo}
            alt={suggestion.name}
            className="h-full w-full object-cover"
          />
        </div>

        <div className="min-w-0">
          <h3 className="truncate text-sm font-semibold text-heading">
            {suggestion.name}
          </h3>

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
        className="flex items-center gap-2 shrink-0 rounded-lg bg-primary px-3 py-2 text-sm font-semibold text-white transition hover:opacity-90 active:scale-95"
      >
        <FaPlus /> Follow
      </button>
    </div>
  </>
  )
}
