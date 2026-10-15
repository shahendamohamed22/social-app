
import { useContext } from "react";
import {
  FiHome,
  FiCompass,
  FiMessageCircle,
  FiBell,
  FiUser,
} from "react-icons/fi";
import { Link, NavLink } from "react-router-dom";
import { profileContext } from "../../shared/context/MyProfileContext";

const navLinks = [
  { label: "Home", icon: FiHome, to: "/" },
  { label: "Explore", icon: FiCompass, to: "/explore" },
  { label: "Messages", icon: FiMessageCircle, to: "/messages" },
];

function Navbar() {
  const { profileData } = useContext(profileContext)
  return (
    <nav className="sticky top-0 z-50 w-full border-b border-border bg-background/90 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-6 px-5">

        {/* Logo */}
        <Link to="/" className="flex shrink-0 items-center gap-2">
          <div className="flex size-10 items-center justify-center rounded-xl bg-primary text-white">
            <FiMessageCircle size={23} />
          </div>

          <span className="text-2xl font-bold tracking-tight text-heading">
            loop<span className="text-primary">.</span>
          </span>
        </Link>

        {/* Navigation */}
        <div className="flex items-center gap-1 sm:gap-2">
          {navLinks.map(({ label, icon: Icon, to }) => (
            <NavLink
              key={label}
              to={to}
              aria-label={label}
              title={label}
              className="flex size-10 items-center justify-center rounded-xl text-paragraph transition hover:bg-primary/10 hover:text-primary"
            >
              <Icon size={21} />
            </NavLink>
          ))}

          {/* Notifications */}
          <Link
            to="/profile"
            aria-label="Profile"
            className="relative ml-1 rounded-xl flex size-10 items-center justify-center round hover:bg-primary/10 hover:text-primary text-heading transition "
          >
            <FiBell size={21} />
            <span className="absolute right-2 top-2 size-2 rounded-full bg-red-500 ring-2 ring-background" />
          </Link>

          {/* Profile */}
          <Link
            to="/profile"
            aria-label="Profile"
            className="ml-1 flex size-10 items-center justify-center rounded-full border-2 border-primary/20 bg-input text-heading transition hover:border-primary"
          >
            <div className="flex h-10 w-10 shrink-0 items-center justify-center overflow-hidden rounded-full bg-primary/10 text-primary">
              {profileData?.photo ? (
                <img
                  src={profileData.photo}
                  alt={profileData.name}
                  className="h-full w-full object-cover"
                />
              ) : (
                <FiUser size={21} />
              )}
            </div>
          </Link>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
