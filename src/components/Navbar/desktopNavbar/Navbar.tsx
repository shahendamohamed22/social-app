
import { useContext, useState } from "react";
import {
  FiHome,
  FiBell,
  FiUser,
  FiMenu,
} from "react-icons/fi";
import { Link, NavLink } from "react-router-dom";
import { profileContext } from "../../../shared/context/MyProfileContext/MyProfileContext";
import { notificationContext } from "../../../shared/context/NotificationContext/NotificationContext";
import NotificationsDropdown from "../../Notifications/NotificationsDropdown";
import MobileSidebar from "../../MobileSidebar/MobileSidebar";

const navLinks = [
  { label: "Home", icon: FiHome, to: "/" },
];

function Navbar() {
  const { myProfileData } = useContext(profileContext)
  const { notificationNumber } = useContext(notificationContext)

  const [notificationsIsOpened, setNotificationsIsOpened] = useState(false)
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <>
      <nav className="sticky top-0 z-40 py-2 w-full border-b border-border bg-background/90 backdrop-blur-xl">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-6 px-5">

          {/* Logo */}
          <Link to="/" className="flex shrink-0 items-center ">
            <div className="flex size-18 items-center justify-center rounded-xl  text-white">
              <img src="/favicon.png" alt="favicon" />
            </div>

            <span className="text-2xl font-bold tracking-tight text-heading">
              Loop<span className="text-primary">.</span>
            </span>
          </Link>

          {/* Navigation */}
          <div className="items-center gap-1 sm:gap-2 hidden lg:flex">
            {navLinks.map(({ label, icon: Icon, to }) => (
              <NavLink key={label} to={to} aria-label={label} title={label}
                className="flex size-10 items-center justify-center rounded-xl text-paragraph transition hover:bg-primary/10 hover:text-primary"
              >
                <Icon size={21} />
              </NavLink>
            ))}

            {/* Notifications */}
            <NotificationsDropdown isOpen={notificationsIsOpened} onOpenChange={setNotificationsIsOpened}>
              <div
                onClick={() => setNotificationsIsOpened(!notificationsIsOpened)}
                className="relative ml-1 rounded-xl flex size-10 items-center justify-center round hover:bg-primary/10 hover:text-primary text-heading transition "
              >
                <FiBell size={21} />
                {Number(notificationNumber) > 0 && <span className="absolute -right-1.5 -top-1.5 flex items-center justify-center text-xs font-bold rounded-full size-5 bg-red-500 ring-2 ring-background text-input" >{notificationNumber}</span>}

              </div>

            </NotificationsDropdown>


            {/* Profile */}
            <Link to="/profile" aria-label="Profile"
              className="ml-1 flex size-10 items-center justify-center rounded-full border-2 border-primary/20
               bg-input text-heading transition hover:border-primary">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center overflow-hidden rounded-full bg-primary/10 text-primary">
                {myProfileData?.photo ?
                  <img src={myProfileData.photo} alt={myProfileData.name}
                    className="h-full w-full object-cover"
                  /> : <FiUser size={21} />
                }
              </div>
            </Link>
          </div>
          <div className="items-center gap-1 sm:gap-2 flex lg:hidden">
            <button type="button" onClick={() => setIsSidebarOpen(true)}
              aria-label="Open menu"
              className="flex size-10 items-center justify-center rounded-xl text-paragraph transition hover:bg-primary/10 hover:text-primary">
              <FiMenu size={22} />
            </button>
          </div>
        </div>
      </nav>
      <MobileSidebar isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />
    </>
  );
}

export default Navbar;
