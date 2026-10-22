import { createContext } from "react";

export const notificationContext = createContext({
    notificationNumber: "",
    isLoading: false
})