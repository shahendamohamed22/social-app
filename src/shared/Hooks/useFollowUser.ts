import { useMutation } from "@tanstack/react-query";
import api from "../api/axiosRequest";



export default function useFollow(userId: string) {


    function addFollower() {
        return api.put(`users/${userId}/follow`)
    }
    const { mutate: follow, isPending ,isSuccess  } = useMutation({
        mutationFn: addFollower
    })
 
    return { follow, isPending , isSuccess }

}