import { useQuery } from "@tanstack/react-query";
import api from "../../api/axiosRequest";

export default function useUserProfile(userId : string | undefined) {
    function getUserProfile() {
        return api.get(`users/${userId}/profile`)
    }

    const { data: userData } = useQuery({
        queryKey: ["userProfile", userId],
        queryFn: getUserProfile,
        select: (data) => data.data.data
    });

    return {userData}
}