import { FiBell, FiHeart, FiMessageCircle, FiUserPlus, FiCheck, FiCheckCircle } from "react-icons/fi";
import { Spinner } from "@heroui/react";
import type { INotification } from "../../interfaces/notification";
import useNotifications from "../../shared/Hooks/NotificationsHooks/useNotifications";

export default function Notifications() {
    const { notifications, notificationsIsLoading, markSingleNotification, markOneNotificationPending,
        markNotifications, markAllNotificationPending, } = useNotifications();

    function getNotificationText(type: string) {
        switch (type) {
            case "like":
                return "liked your post";

            case "comment":
                return "commented on your post";

            case "follow":
                return "started following you";

            default:
                return type;
        }
    }

    function getNotificationIcon(type: string) {
        switch (type) {
            case "like":
                return <FiHeart size={18} />;

            case "comment":
                return <FiMessageCircle size={18} />;

            case "follow":
                return <FiUserPlus size={18} />;

            default:
                return <FiBell size={18} />;
        }
    }

    return (
        <main className="mx-auto w-full max-w-3xl sm:px-6">
            {/* Header */}
            <div className="mb-6 flex items-center justify-between gap-3">
                <div>
                    <h2 className="text-2xl font-bold text-heading sm:text-3xl">Notifications</h2>
                    <p className="mt-2 text-sm text-paragraph">Stay updated with your latest activity.</p>
                </div>
            </div>

            {/* Notifications Card */}
            <section className="overflow-hidden rounded-2xl border border-primary/10 bg-card shadow-sm">
                {/* Actions */}
                <div className="flex items-center justify-between gap-3 border-b border-primary/10 px-4 py-4 sm:px-5">
                    <h2 className="font-semibold text-heading">
                        All notifications
                    </h2>

                    <button
                        type="button"
                        onClick={() => markNotifications()}
                        disabled={
                            markAllNotificationPending ||
                            !notifications?.some(
                                (notification: INotification) =>
                                    !notification.isRead
                            )
                        }
                        className="flex items-center gap-2 text-xs font-medium text-primary transition hover:opacity-75 disabled:cursor-not-allowed disabled:opacity-50 sm:text-sm"
                    >
                        {markAllNotificationPending ? <Spinner color="current" size="sm" />
                            : <FiCheckCircle size={16} />}
                        Mark all as read
                    </button>
                </div>

                {/* Loading */}
                {notificationsIsLoading && (
                    <div className="flex flex-col items-center justify-center gap-3 py-16">
                        <Spinner color="current" size="lg" />
                        <p className="text-sm text-paragraph">
                            Loading notifications...
                        </p>
                    </div>
                )}

                {/* Empty State */}
                {!notificationsIsLoading &&
                    notifications?.length === 0 && (
                        <div className="flex flex-col items-center justify-center px-5 py-16 text-center">
                            <div className="mb-4 flex size-16 items-center justify-center rounded-full bg-primary/10 text-primary">
                                <FiBell size={28} />
                            </div>

                            <h3 className="font-semibold text-heading"> No notifications yet </h3>

                            <p className="mt-2 max-w-xs text-sm text-paragraph">
                                When someone interacts with your posts or
                                follows you, you'll see it here.
                            </p>
                        </div>
                    )}

                {/* Notifications List */}
                {!notificationsIsLoading &&
                    notifications?.map(
                        (notification: INotification) => (
                            <div
                                key={notification._id}
                                className={`flex items-start gap-3 border-b border-primary/10 p-4 transition last:border-b-0 sm:gap-4 sm:p-5 ${!notification.isRead
                                    ? "bg-primary/5" : "hover:bg-background/60"}`} >
                                {/* User Photo */}
                                <div className="relative shrink-0">
                                    <img src={notification.actor.photo} alt={notification.actor.name}
                                        className="size-11 rounded-full object-cover ring-2 ring-primary/10 sm:size-12" />
                                    <span className="absolute -bottom-1 -right-1 flex size-6 items-center justify-center rounded-full border-2 border-card bg-primary text-white">
                                        {getNotificationIcon(notification.type)}
                                    </span>
                                </div>

                                {/* Content */}
                                <div className="min-w-0 flex-1">
                                    <p className="wrap-break-word text-sm leading-6 text-heading">
                                        <span className="font-semibold">
                                            {notification.actor.name}
                                        </span>{" "}
                                        {getNotificationText(notification.type)}
                                    </p>

                                    <p className="mt-1 text-xs text-paragraph">
                                        {new Date(notification.createdAt).toLocaleString()}
                                    </p>

                                    {!notification.isRead && (
                                        <span className="mt-2 inline-flex items-center gap-1.5 rounded-full bg-primary/10 px-2.5 py-1 text-xs font-medium text-primary">
                                            <span className="size-1.5 rounded-full bg-primary" />
                                            New
                                        </span>)}
                                </div>

                                {/* Mark as read */}
                                {!notification.isRead && (
                                    <button type="button" title="Mark as read" aria-label="Mark notification as read"
                                        disabled={markOneNotificationPending}
                                        onClick={() => markSingleNotification(notification._id)}
                                        className="flex size-9 shrink-0 items-center justify-center rounded-xl text-paragraph transition hover:bg-primary/10 hover:text-primary disabled:opacity-50"  >
                                        <FiCheck size={19} />
                                    </button>)}
                            </div>
                        )
                    )}
            </section>
        </main>
    );
}