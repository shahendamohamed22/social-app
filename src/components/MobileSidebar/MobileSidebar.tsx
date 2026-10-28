
import { NavLink, useNavigate } from "react-router-dom";
import { FiX, FiSettings, FiBookmark, FiUser, FiChevronRight, FiLogOut, FiHome } from "react-icons/fi";
import { useContext, type Dispatch, type SetStateAction } from "react";
import { profileContext } from "../../shared/context/MyProfileContext/MyProfileContext";
import { authContext } from "../../shared/context/AuthContext/AuthContext";

export default function MobileSidebar({ isOpen, setIsOpen }: { isOpen: boolean, setIsOpen: Dispatch<SetStateAction<boolean>> }) {
    const { myProfileData } = useContext(profileContext)
    const navItems = [
        { label: "Home", path: "/", icon: FiHome },
        { label: "Settings", path: "/settings", icon: FiSettings },
        { label: "Saved Posts", path: "/saved-posts", icon: FiBookmark },
    ];
    const { logout } = useContext(authContext);
    const navigate = useNavigate();

    function handleLogout() {
        logout();
        navigate("/auth/login");
    }

    return (
        <>
            {/* Sidebar Overlay */}
            <div className={`fixed inset-0 z-50 transition-[visibility] lg:hidden duration-300 ${isOpen ? "visible" : "invisible"}`} >
                {/* Background */}
                <button type="button" aria-label="Close menu"
                    onClick={() => setIsOpen(false)}
                    className={`absolute inset-0 size-full bg-black/40 transition-opacity duration-300 ${isOpen
                        ? "opacity-100" : "pointer-events-none opacity-0"}`} />

                {/* Sidebar */}
                <aside aria-label="Main navigation" aria-hidden={!isOpen}
                    className={`absolute left-0 top-0 flex h-full w-72 max-w-[85vw] flex-col border-r border-primary/10 bg-card shadow-2xl transition-transform 
                        duration-300 ease-in-out ${isOpen ? "translate-x-0" : "-translate-x-full"}`}>
                    {/* Header */}
                    <div className="flex items-center justify-between border-b border-primary/10 p-5">
                        <h2 className="text-2xl font-bold text-primary">
                            Loop
                        </h2>

                        <button type="button" onClick={() => setIsOpen(false)}
                            aria-label="Close sidebar"
                            className="flex size-9 items-center justify-center rounded-xl text-paragraph transition
                             hover:bg-primary/10 hover:text-primary">
                            <FiX size={22} />
                        </button>
                    </div>

                    {/* Navigation Links */}
                    <nav className="flex-1 space-y-2 overflow-y-auto p-4">
                        <NavLink to="/profile" className={({ isActive }) =>
                            `group flex items-center gap-3 rounded-xl p-3 transition-colors ${isActive
                                ? "bg-primary/10 text-primary"
                                : "text-heading hover:bg-primary/5"}`}
                            onClick={() => setIsOpen(false)}>
                            <div className="flex h-12 w-12 shrink-0 items-center justify-center overflow-hidden rounded-full bg-primary/10 text-primary">
                                {myProfileData?.photo ?
                                    <img src={myProfileData.photo} alt={myProfileData.name}
                                        className="h-full w-full object-cover" /> :
                                    <FiUser size={23} />
                                }
                            </div>

                            <div className="min-w-0 flex-1">
                                <h3 className="truncate text-sm font-semibold">
                                    {myProfileData?.name ?? "Your ProfileData"}
                                </h3>
                                <p className="mt-1 truncate text-xs text-paragraph">
                                    {myProfileData?.username ? `@${myProfileData.username}` : "View your profileData"}
                                </p>
                            </div>

                            <FiChevronRight className="shrink-0 transition-transform group-hover:translate-x-1" />
                        </NavLink>

                        <div className="my-4 border-t border-primary/10" />

                        {navItems.map(({ label, path, icon: Icon }) => (
                            <NavLink key={label} to={path}
                                onClick={() => setIsOpen(false)} className={({ isActive }) =>
                                    `flex items-center gap-3 rounded-xl px-4 py-3 transition ${isActive
                                        ? "bg-primary/10 font-semibold text-primary"
                                        : "text-paragraph hover:bg-primary/5 hover:text-primary"}`} >
                                <Icon size={21} />
                                <span>{label}</span>
                            </NavLink>))}
                    </nav>

                    {/* Footer */}
                    <div className="border-t border-primary/10 p-4 ">
                        <button type="button" onClick={handleLogout}
                            className="flex justify-center items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium text-red-500 shadow-none transition-colors hover:bg-red-500/10">
                            <span>Log out</span>
                            <FiLogOut size={20} />
                        </button>
                    </div>
                </aside>
            </div>
        </>
    );
}

