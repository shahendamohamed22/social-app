import { createContext } from "react";
import type { IAuthContext } from "../../interfaces/authContext";

export const authContext = createContext<IAuthContext>({
  token: "",
  login() { },
  logout() { },
});
