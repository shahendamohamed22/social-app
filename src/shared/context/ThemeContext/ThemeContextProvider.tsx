import { useEffect, useState, type ReactNode } from "react";
import { ThemeContext, type Theme } from "./ThemeContext";



export default function ThemeContextProvider({ children }: { children: ReactNode }) {
    const [theme, setTheme] = useState<Theme>(() => {
        const savedTheme = localStorage.getItem("theme");

        if (savedTheme === "light" || savedTheme === "dark" || savedTheme === "system") {
            return savedTheme;
        }

        return "light";
    });

    useEffect(() => {
        const root = document.documentElement;
        const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");

        const applyTheme = () => {
            const isDark =
                theme === "dark" ||
                (theme === "system" && mediaQuery.matches);

            root.classList.toggle("dark", isDark);
        };

        applyTheme();
        localStorage.setItem("theme", theme);

        if (theme === "system") {
            mediaQuery.addEventListener("change", applyTheme);

            return () => {
                mediaQuery.removeEventListener("change", applyTheme);
            };
        }
    }, [theme]);

    return (
        <ThemeContext.Provider value={{ theme, setTheme }}>
            {children}
        </ThemeContext.Provider>
    );
}