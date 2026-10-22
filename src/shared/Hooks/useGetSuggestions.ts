import { useQuery } from "@tanstack/react-query"
import api from "../api/axiosRequest"

export default function useGetSuggestions() {
    function getSuggestions() {
        return api.get("users/suggestions?limit=30")
    }

    const { data: suggestions, isLoading } = useQuery({
        queryKey: ["suggestions"],
        queryFn: getSuggestions,
        select: (data) => data.data.data.suggestions
    })

    return {suggestions , isLoading}
}