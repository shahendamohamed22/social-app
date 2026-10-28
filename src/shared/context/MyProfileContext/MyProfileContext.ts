import { createContext } from "react";
import type { IProfileContext } from "../../../interfaces/myProfileContext";

export const profileContext = createContext<IProfileContext>({
    myProfileData : undefined,
})
