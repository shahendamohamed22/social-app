import type { ReactNode } from "react";
import type { IProfile } from "./myProfile";

export interface IProfileContextChildren {
    children: ReactNode
}

export interface IProfileContext {
   myProfileData : IProfile | undefined
}