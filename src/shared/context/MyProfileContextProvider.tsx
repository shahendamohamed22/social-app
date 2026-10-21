import { useQuery } from "@tanstack/react-query";
import api from "../api/axiosRequest";
import type { ReactNode } from "react";
import { profileContext } from "./MyProfileContext"



export default function MyProfileContextProvider({ children }: { children: ReactNode }) {


    function getMyProfile() {
        return api.get("users/profile-data")
    }
    const { data: myProfileData } = useQuery({
        queryKey: ["myProfile"],
        queryFn: getMyProfile,
        select: (data) => data?.data.data.user
    })

    return (
        <profileContext.Provider value={{ myProfileData }}>
            {children}
        </profileContext.Provider>
    )
}
