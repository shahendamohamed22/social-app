import type { ReactNode } from "react";
import type { IMyProfile } from "./myProfile";

export interface IProfileContextChildren {
    children: ReactNode
}

export interface IProfileContext {
   myProfileData : IMyProfile | undefined
}