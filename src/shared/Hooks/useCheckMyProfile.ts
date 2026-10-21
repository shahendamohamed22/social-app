import { useContext, useState } from "react";
import { profileContext } from "../context/MyProfileContext";

export default function useCheckMyProfile() {

    const { myProfileData } = useContext(profileContext);

    const [isMyProfile, setIsMyProfile] = useState<boolean>();


    function checkProfile(id: string) {
        if (id === myProfileData?._id) {
            setIsMyProfile(true)
        } else setIsMyProfile(false);
    }

    return { isMyProfile, checkProfile , setIsMyProfile }
}