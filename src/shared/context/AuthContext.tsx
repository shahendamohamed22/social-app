import { createContext, useState } from "react"
import type { IAuthContext, IAuthContextChildren } from "../../interfaces/authContext";

export const authContext = createContext<IAuthContext>({
    token : "" , 
    login(token:string) {},
    logout() {},
});

export default function AuthContext({children} : IAuthContextChildren) {


    const [token , setToken] = useState(()=>localStorage.getItem("token"));

    function login(token:string) {
        setToken(token)
        localStorage.setItem("token" , token)
    }

    function logout() {
         localStorage.removeItem("token")
    }

  return (<>
    <authContext.Provider value={{token , login , logout} }>
       {children}
    </authContext.Provider>
  
  </>
  )

}
