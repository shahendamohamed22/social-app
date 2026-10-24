import { useState, type ReactNode } from "react"
import { authContext } from "./AuthContext"
import { queryClient } from "../../App";

export default function AuthContextProvider({ children }: { children: ReactNode }) {


  const [token, setToken] = useState(() => localStorage.getItem("token"));

  function login(token: string) {
    setToken(token)
    localStorage.setItem("token", token)
  }

  function logout() {
    setToken(null)
    localStorage.removeItem("token")
    queryClient.clear()
  }

  return (<>
    <authContext.Provider value={{ token, login, logout }}>
      {children}
    </authContext.Provider>

  </>
  )

}
