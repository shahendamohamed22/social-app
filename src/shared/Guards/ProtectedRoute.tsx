import { useContext, type ReactNode } from "react"
import { authContext } from "../context/AuthContext/AuthContext"
import { Navigate } from "react-router-dom"

export default function ProtectedRoute({ children }: {children : ReactNode}) {

    const { token } = useContext(authContext)

    if (!token) {
        return <Navigate to={"/auth/login"} />
    }

    return (
        children
    )
}
