import useNotifications from "../Hooks/NotificationsHooks/useNotifications"
import { notificationContext } from "./NotificationContext"
import type { ReactNode } from "react"


export default function NotificationContextProvider({ children }: { children: ReactNode }) {
  const { notificationNumber, isLoading } = useNotifications()
  return (
    <>
      <notificationContext.Provider value={{ notificationNumber, isLoading }}>
        {children}
      </notificationContext.Provider>
    </>
  )
}
