import { NavLink } from "react-router-dom";
import { FiHome, FiUsers, FiUser, FiBell } from "react-icons/fi";
import { useContext } from "react";
import { notificationContext } from "../../../shared/context/NotificationContext";
import { profileContext } from "../../../shared/context/MyProfileContext";

export default function BottomNavbar() {
    const navItems = [
        { label: "Home", icon: FiHome, path: "/" },
        { label: "Suggestions", icon: FiUsers, path: "/suggestions" },
        { label: "Notifications", icon: FiBell, path: "/notifications" },
    ];
    const { notificationNumber } = useContext(notificationContext)
    const { myProfileData } = useContext(profileContext)



    return (
        <nav className="fixed bottom-0 left-0 z-40 w-full border-t border-primary/10 bg-card/95 shadow-lg backdrop-blur-md lg:hidden py-2">
            <div className="mx-auto flex max-w-lg items-center justify-around px-2 pb-[env(safe-area-inset-bottom)]">
                {navItems.map(({ label, icon: Icon, path }) => (

                    <NavLink key={label} to={path}
                        className={({ isActive }) =>
                            `flex flex-1 flex-col items-center gap-1 py-3 text-xs transition 
                             ${isActive ? "text-primary" : "text-paragraph hover:text-primary"}`
                        }>
                        <div className="relative">
                            <Icon size={22} />
                            {label === "Notifications" && Number(notificationNumber) > 0 ? <span className="absolute -right-3 -top-3 flex items-center justify-center text-xs font-bold rounded-full size-5 bg-red-500 ring-2 ring-background text-input" >{Number(notificationNumber) > 99 ? "+99" : notificationNumber}</span>
                                : ""}
                        </div>
                        {/* <span>{label}</span> */}
                    </NavLink>))}

                <NavLink to="/profile" className="flex flex-1 items-center justify-center py-3">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center overflow-hidden rounded-full bg-primary/10 text-primary">
                        {myProfileData?.photo ?
                            <img src={myProfileData.photo} alt={myProfileData.name}
                                className="h-full w-full object-cover" /> :
                            <FiUser size={23} />
                        }
                    </div>
                </NavLink>
            </div>
        </nav >
    );
}