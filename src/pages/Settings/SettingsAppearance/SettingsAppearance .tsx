
import { useContext, useState } from "react";
import { FiChevronDown, FiMonitor, FiMoon, FiSun,} from "react-icons/fi";
import { ThemeContext } from "../../../shared/context/ThemeContext/ThemeContext";

export default function Appearance() {
    const [isAppearanceOpen, setIsAppearanceOpen] = useState(false);
    const context = useContext(ThemeContext);

    if (!context) return null;

    const { theme, setTheme } = context;

    const themes = [
        {
            value: "light",
            label: "Light",
            description: "Use the light theme.",
            icon: FiSun,
        },
        {
            value: "dark",
            label: "Dark",
            description: "Use the dark theme.",
            icon: FiMoon,
        },
        {
            value: "system",
            label: "System default",
            description: "Follow your device settings.",
            icon: FiMonitor,
        },
    ] as const;

    return (
        <section className="mt-4 overflow-hidden rounded-2xl border border-primary/10 bg-card shadow-sm">
            <button
                type="button"
                onClick={() => setIsAppearanceOpen(!isAppearanceOpen)}
                aria-expanded={isAppearanceOpen}
                className="flex w-full items-center justify-between gap-4 p-5 text-left transition hover:bg-primary/5 sm:p-6"
            >
                <div className="flex items-center gap-4">
                    <div className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
                        <FiMonitor size={21} />
                    </div>

                    <div>
                        <h2 className="font-semibold text-heading">
                            Appearance
                        </h2>

                        <p className="mt-1 text-sm text-paragraph">
                            Customize how Loop looks on your device.
                        </p>
                    </div>
                </div>

                <FiChevronDown
                    size={20}
                    className={`shrink-0 text-paragraph transition-transform ${
                        isAppearanceOpen ? "rotate-180" : ""
                    }`}
                />
            </button>

            {isAppearanceOpen && (
                <div className="space-y-3 border-t border-primary/10 p-5 sm:p-6">
                    <p className="mb-4 text-sm font-medium text-heading">
                        Choose your theme
                    </p>

                    {themes.map(({ value, label, description, icon: Icon }) => {
                        const isSelected = theme === value;

                        return (
                            <button
                                key={value}
                                type="button"
                                onClick={() => setTheme(value)}
                                aria-pressed={isSelected}
                                className={`flex w-full items-center gap-3 rounded-xl border p-4 text-left transition ${
                                    isSelected
                                        ? "border-primary bg-primary/5"
                                        : "border-primary/10 hover:bg-primary/5"
                                }`}
                            >
                                <div className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
                                    <Icon size={20} />
                                </div>

                                <div className="min-w-0 flex-1">
                                    <h3 className="text-sm font-medium text-heading">
                                        {label}
                                    </h3>

                                    <p className="mt-1 text-sm text-paragraph">
                                        {description}
                                    </p>
                                </div>

                                <span
                                    className={`flex size-5 shrink-0 items-center justify-center rounded-full border ${
                                        isSelected
                                            ? "border-primary"
                                            : "border-paragraph/40"
                                    }`}
                                >
                                    {isSelected && (
                                        <span className="size-2.5 rounded-full bg-primary" />
                                    )}
                                </span>
                            </button>
                        );
                    })}
                </div>
            )}
        </section>
    );
}
