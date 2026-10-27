import { NavLink, useNavigate } from "react-router-dom";
import { useContext } from "react";
import {
  FiUser,
  FiFileText,
  FiBookmark,
  FiUsers,
  FiSettings,
  FiLogOut,
  FiChevronRight,
} from "react-icons/fi";

import { authContext } from "../../../shared/context/AuthContext";
import { profileContext } from "../../../shared/context/MyProfileContext";

const links = [
  { title: "My Posts", to: "/profile?tab=posts", icon: FiFileText },
  { title: "Saved Posts", to: "/saved-posts", icon: FiBookmark },
  { title: "Discover People", to: "/suggestions", icon: FiUsers },
  { title: "Settings", to: "/settings", icon: FiSettings },
];

export default function Sidebar() {

  const { logout } = useContext(authContext);
  const { myProfileData } = useContext(profileContext)
  const navigate = useNavigate();

  function handleLogout() {
    logout();
    navigate("/auth/login");
  }

  return (
    <aside className="sticky top-20 h-fit w-full rounded-2xl border border-primary/10 bg-card p-4 text-right shadow-sm">
      {/* Profile */}
      <NavLink
        to="/profile"
        className={({ isActive }) =>
          `group flex items-center gap-3 rounded-xl p-3 transition-colors ${isActive
            ? "bg-primary/10 text-primary"
            : "text-heading hover:bg-primary/5"
          }`
        }
      >
        <div className="flex h-12 w-12 shrink-0 items-center justify-center overflow-hidden rounded-full bg-primary/10 text-primary">
          {myProfileData?.photo ? (
            <img
              src={myProfileData.photo}
              alt={myProfileData.name}
              className="h-full w-full object-cover"
            />
          ) : (
            <FiUser size={23} />
          )}
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

      {/* Navigation */}

      <nav className="space-y-1">
        {links.map(({ title, to, icon: Icon }) => (
          <NavLink
            key={title}
            to={to}
            className={({ isActive }) =>
              `group flex items-center gap-3 rounded-xl px-3 py-3 text-sm font-medium transition-colors ${isActive
                ? "bg-primary/10 text-primary"
                : "text-paragraph hover:bg-primary/5 hover:text-primary"
              }`
            }
          >
            <span className="flex-1">{title}</span>
            <Icon size={20} className="shrink-0" />
            <FiChevronRight
              size={15}
              className="opacity-0 transition-all group-hover:translate-x-1 group-hover:opacity-100"
            />
          </NavLink>
        ))}
      </nav>

      <div className="my-4 border-t border-primary/10" />

      {/* Logout */}
      <button
        type="button"
        onClick={handleLogout}
        className="pr-9 justify-end flex w-full items-center gap-3 rounded-xl bg-transparent px-3 py-3 text-sm font-medium text-red-500 shadow-none transition-colors hover:bg-red-500/10"
      >
        <span>Log out</span>
        <FiLogOut size={20} />
      </button>
    </aside>
  );
}
