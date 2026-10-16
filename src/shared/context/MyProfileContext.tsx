import { useQuery } from "@tanstack/react-query";
import api from "../api/axiosRequest";
import { createContext} from "react";
import type { IProfileContext, IProfileContextChildren } from "../../interfaces/myProfileContext";

export const profileContext = createContext<IProfileContext>({
    myProfileData : undefined,
})

export default function MyProfileContext({ children } : IProfileContextChildren ) {


    function getMyProfile() {
        return api.get("users/profile-data")
    }
    const { data } = useQuery({
        queryKey: ["myProfile"],
        queryFn: getMyProfile
    })

    console.log(data?.data.data.user);
    
    const myProfileData = data?.data.data.user

    return (
        <profileContext.Provider value={{myProfileData}}>
            {children}
        </profileContext.Provider>
    )
}
