import { useQuery } from "@tanstack/react-query"
import api from "../api/axiosRequest"

export default function useGetFollowers(userId: string | undefined) {
    const { data, isLoading } = useQuery({
        queryKey: ["useData", userId],
        queryFn: () => {
            return api.get(`users/${userId}/profile`)
        },
        select: (data) => data?.data?.data.user
    })

    return { data, isLoading }
}