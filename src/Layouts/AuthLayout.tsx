import { Link, Outlet, useLocation } from "react-router-dom";
import AppIntro from "../components/AppIntro/AppIntro";
import { useEffect, useState } from "react";

export default function AuthLayout() {
    const [form, setForm] = useState("/auth/login")
    const { pathname } = useLocation();

    useEffect(() => {
        if (pathname === "/auth/login" || pathname === "/auth/register") {
            setForm(pathname)
        }
    }, [pathname])

    return (
        <div className="lg:container mx-auto flex items-center justify-center gap-15 px-6 py-6  min-h-screen">
            <section className=" hidden md:block  p-4 rounded-4xl flex-1 lg:flex-2">
                <AppIntro />
            </section>

            <section className="flex-1 w-full">
                <header className="mb-8 flex flex-col items-center text-center md:hidden" id="mobile-header">
                    <h1 className="text-4xl font-extrabold tracking-tight text-primary">
                        Loop
                    </h1>

                    <p className="mt-2 text-sm text-paragraph">
                        Your people. Your moments.
                    </p>
                </header>
                <div className=" bg-white/50 p-4 rounded-4xl shadow-2xl  ">

                    <div className="bg-gray-200/65 rounded-2xl p-1 flex gap-2 shadow">
                        <Link to={"/auth/login"} onClick={() => { setForm("/auth/login"); }}
                            className={`px-5 py-3 text-center text-1xl flex-1 rounded-2xl font-medium transition-all duration-300 
                        ${form === "/auth/login" ? "bg-white text-primary" : "text-black"}`}>Login</Link>
                        <Link to={"/auth/register"} onClick={() => { setForm("/auth/register"); }}
                            className={`text-center  text-1xl px-5 py-3 flex-1 rounded-2xl font-medium transition-all duration-300
                        ${form === "/auth/register" ? "bg-white text-primary" : "text-black"}`}>Register</Link>
                    </div>

                    <Outlet />

                </div>
            </section>
        </div>





    )
}
