import { useQuery } from "@tanstack/react-query";
import SuggestionCard from "../../../components/cards/suggestion/SuggestionCard";
import type { ISuggestion } from "../../../interfaces/suggestion";
import { IoMdArrowForward } from "react-icons/io";
import { Link } from "react-router-dom";
import { Skeleton } from "@heroui/react";
import api from "../../../shared/api/axiosRequest";

export default function Suggestions() {

  function getSuggestions() {
    return api.get("users/suggestions?limit=10")
  }

  const { isLoading, data : suggestions} = useQuery({
    queryKey: ["suggestions"],
    queryFn: getSuggestions,
    select : (data) => data?.data.data.suggestions
  })

  if (isLoading) {
    return [0, 1, 2, 3].map((i) => <div key={i} className="flex items-center gap-4 mt-4 p-3 bg-card rounded-2xl">
      <Skeleton className="h-12 w-12 shrink-0 rounded-full " />
      <div className="flex-1 space-y-2 gap-3">
        <Skeleton className="h-3 w-full rounded-lg " />
        <Skeleton className="h-3 w-full rounded-lg " />
      </div>
    </div>)
  }

  return (
    <>
      {suggestions.slice(0, 4).map((suggestion: ISuggestion) =>
        <SuggestionCard key={suggestion._id} suggestion={suggestion} />)}

      <Link to={"/suggestions"} className="btn-secondary rounded-full flex gap-2 items-center mt-3 group w-fit">
        See all suggestions <IoMdArrowForward className="group-hover:translate-x-1 transition-all" />
      </Link>
    </>
  )
}
