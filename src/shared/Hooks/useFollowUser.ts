import { useMutation } from "@tanstack/react-query";
import api from "../api/axiosRequest";
import { queryClient } from "../../App";

export default function useFollow(userId: string) {


    function addFollower() {
        return api.put(`users/${userId}/follow`)
    }
    const { mutate: follow, isPending, isSuccess } = useMutation({
        mutationFn: addFollower,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["suggestions"] });
            queryClient.invalidateQueries({ queryKey: ["userProfile", userId] });
            queryClient.invalidateQueries({ queryKey: ["myProfile"], });
        },
    })

    return { follow, isPending, isSuccess }

}