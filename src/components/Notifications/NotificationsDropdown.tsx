import { Dropdown } from "@heroui/react";
import useNotifications from "../../shared/Hooks/NotificationsHooks/useNotifications";
import type { INotification } from "../../interfaces/notification";
import type { Dispatch, ReactNode, SetStateAction } from "react";

export default function NotificationsDropdown({ children, isOpen, onOpenChange }: { children: ReactNode, isOpen: boolean, onOpenChange: Dispatch<SetStateAction<boolean>> }) {
    const { notifications, markSingleNotification } = useNotifications()
    return (
        <Dropdown isOpen={isOpen} onOpenChange={onOpenChange}>
            <Dropdown.Trigger>
                {children}
            </Dropdown.Trigger>
            <Dropdown.Popover>
                <Dropdown.Menu onAction={(key) => markSingleNotification(String(key))}>
                    {notifications?.map((notification: INotification) =>
                        <Dropdown.Item key={notification._id} id={notification._id}>
                            <div
                                className={`flex w-full items-center gap-3 rounded-xl p-3 transition hover:bg-primary/10 ${!notification.isRead ? "bg-primary/5" : ""
                                    }`}
                            >
                                <img
                                    src={notification.actor.photo}
                                    alt={notification.actor.name}
                                    className="h-11 w-11 shrink-0 rounded-full object-cover ring-2 ring-primary/10"
                                />

                                <div className="min-w-0 flex-1">
                                    <p className="text-sm leading-5 text-heading">
                                        <span className="font-semibold">
                                            {notification.actor.name}
                                        </span>{" "}
                                        {notification.type === "like"
                                            ? "liked your post"
                                            : notification.type === "comment"
                                                ? "commented on your post"
                                                : notification.type === "follow"
                                                    ? "started following you"
                                                    : notification.type}
                                    </p>

                                    <p className="mt-1 text-xs text-paragraph">
                                        {new Date(notification.createdAt).toLocaleDateString()}
                                    </p>
                                </div>

                                {!notification.isRead && (
                                    <span className="h-2 w-2 shrink-0 rounded-full bg-primary" />
                                )}
                            </div>
                        </Dropdown.Item>)}

                </Dropdown.Menu>
            </Dropdown.Popover>
        </Dropdown >
    );
}
