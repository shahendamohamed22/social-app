import { useMutation } from "@tanstack/react-query";
import api from "../../api/axiosRequest";
import useInvalidateQueries from "../InvalidQueries/InvalidQueries";

export default function useFollow(userId: string) {

    const { invalidateSuggestions, invalidateProfiles } = useInvalidateQueries()

    function addFollower() {
        return api.put(`users/${userId}/follow`)
    }
    const { mutate: follow, isPending, isSuccess } = useMutation({
        mutationFn: addFollower,
        onSuccess: () => {
            invalidateSuggestions()
            invalidateProfiles(userId)
        },
    })

    return { follow, isPending, isSuccess }

}