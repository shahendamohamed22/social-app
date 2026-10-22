import { useQuery } from "@tanstack/react-query";
import api from "../api/axiosRequest";
import { useContext, type ReactNode } from "react";
import { profileContext } from "./MyProfileContext"
import { authContext } from "./AuthContext";



export default function MyProfileContextProvider({ children }: { children: ReactNode }) {
    const { token } = useContext(authContext)

    function getMyProfile() {
        return api.get("users/profile-data")
    }
    const { data: myProfileData } = useQuery({
        queryKey: ["myProfile"],
        queryFn: getMyProfile,
        select: (data) => data?.data.data.user,
        enabled: !!token
    })

    return (
        <profileContext.Provider value={{ myProfileData }}>
            {children}
        </profileContext.Provider>
    )
}
