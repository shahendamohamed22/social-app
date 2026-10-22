import AllSuggestionsCard from "../../components/cards/suggestion/AllSuggestionsCard";
import type { ISuggestion } from "../../interfaces/suggestion";
import { Skeleton } from "@heroui/react";
import useGetSuggestions from "../../shared/Hooks/useGetSuggestions";

export default function AllSuggestions() {

  const { suggestions, isLoading } = useGetSuggestions()

  return (
    <>
      <section className="mx-auto max-w-7xl space-y-4 px-4 py-6">
        <header>
          <h2 className="text-heading text-2xl font-bold">Discover People</h2>
          <p className="text-paragraph text-sm font-medium mt-1">Find people to connect with and grow your Loop community.</p>
        </header>
        <div className="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">

          {isLoading ? ([0, 2, 3, 4, 5, 6, 7, 8].map(() => (<div className="mt-3 w-full space-y-5 rounded-xl p-4 shadow-sm ">
            <Skeleton className={`h-32 w-32 rounded-full mx-auto`} />
            <div className="space-y-3">
              <Skeleton className={`h-3 w-3/5  mx-auto`} />
              <Skeleton className={`h-3 w-4/5  mx-auto`} />
              <Skeleton className={`h-3 w-2/5  mx-auto`} />
            </div>
          </div>))) : (suggestions.map((suggestion: ISuggestion) =>
            <AllSuggestionsCard key={suggestion._id} suggestion={suggestion} />
          ))}

        </div>
      </section>
    </>
  )
}
