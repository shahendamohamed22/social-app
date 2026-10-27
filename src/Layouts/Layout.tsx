import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar/Navbar";



export default function Layout() {
  return (
    <>
      <Navbar />
      <main className="py-5 px-4 xl:px-8 ">
        <Outlet />
      </main>
    </>

  )
}
