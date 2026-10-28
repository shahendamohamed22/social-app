import { createContext } from "react";

export type Theme = "light" | "dark" | "system";

interface IThemeContext {
  theme: Theme;
  setTheme: (theme: Theme) => void;
}

export const ThemeContext = createContext<IThemeContext | null>(null);