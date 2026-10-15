import type { ReactNode } from "react";

export interface IAuthContextChildren {
    children: ReactNode
}

export interface IAuthContext {
    token : string | null 
    login : (token:string)=>void 
    logout : ()=>void
}