import { useMutation, useQuery } from "@tanstack/react-query"
import api from "../../api/axiosRequest"
import useInvalidateQueries from "../InvalidQueries/InvalidQueries"

export default function useNotifications() {
    const { invalidateNotifications } = useInvalidateQueries()

    // GET UNREAD NUMBER 
    function unreadNotifications() {
        return api.get("notifications/unread-count")
    }

    const { data: notificationNumber, isLoading } = useQuery({
        queryKey: ['NotificationCount'],
        queryFn: unreadNotifications,
        select: (data) => data.data.data.unreadCount,
    })

    // GET ALL NOTIFICATIONS
    function allNotifications() {
        return api.get("notifications?unread=false&page=1&limit=10")
    }

    const { data: notifications, isLoading: notificationsIsLoading } = useQuery({
        queryKey: ['Notifications'],
        queryFn: allNotifications,
        select: (data) => data.data.data.notifications
    })

    // MARK ONE NOTIFICATION 
    function markOneNotification(notificationId: string) {
        return api.patch(`notifications/${notificationId}/read`)
    }

    const { mutate: markSingleNotification, isPending: markOneNotificationPending } = useMutation({
        mutationKey: ['markNotifications'],
        mutationFn: markOneNotification,
          onSuccess: () => {
            invalidateNotifications()
        }
    })

    // MARK ONE NOTIFICATION 
    function markAllNotifications() {
        return api.patch("notifications/read-all")
    }

    const { mutate: markNotifications, isPending: markAllNotificationPending } = useMutation({
        mutationKey: ['markNotifications'],
        mutationFn: markAllNotifications,
        onSuccess: () => {
            invalidateNotifications()
        }
    })


    return {
        notificationNumber, isLoading, notifications, notificationsIsLoading
        , markSingleNotification, markOneNotificationPending, markNotifications, markAllNotificationPending
    }
}