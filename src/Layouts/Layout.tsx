import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar/desktopNavbar/Navbar";
import BottomNavbar from "../components/Navbar/mobileNavbar/mobileNavbar";



export default function Layout() {
  return (
    <>
      <Navbar />
      <main className="px-4 pt-5 pb-20 md:py-5 xl:px-8 ">
        <Outlet />
      </main>
      <BottomNavbar />
    </>

  )
}
