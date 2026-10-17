import { FiCalendar, FiClock, FiMail, FiUsers } from "react-icons/fi";
import type { IProfileProps } from "../../../interfaces/myProfile";

export default function About({ profile }: IProfileProps) {

    const dateOfBirth = new Date(profile.dateOfBirth).toLocaleDateString(
        "en-US", {
        day: "numeric",
        month: "long",
        year: "numeric",
    });

    const createdAt = new Date(profile.createdAt);
    const joinDate = Number.isNaN(createdAt.getTime())
        ? "Recently joined"
        : createdAt.toLocaleDateString("en-US", {
            month: "long",
            year: "numeric",
        });

    const profileInfo = [
        { icon: FiMail, label: "Email", value: profile.email, className: "break-all" },
        { icon: FiCalendar, label: "Date of birth", value: dateOfBirth, className: "" },
        { icon: FiUsers, label: "Gender", value: profile.gender || "Not specified", className: "capitalize" },
        { icon: FiClock, label: "Joined time", value: `in ${joinDate}`, className: "capitalize" },
    ];

    return (
        <aside className="sticky top-24 min-w-0 lg:col-span-4">
            <section className="rounded-2xl border border-primary/10 bg-card p-5 shadow-sm">
                <h2 className="text-lg font-bold text-heading">About</h2>

                <p className="mt-1 text-sm text-paragraph">
                    Information about your account.
                </p>

                <div className="mt-5 space-y-5">
                    {profileInfo.map(({ icon: Icon, label, value }) =>
                        <div key={label} className="flex items-start gap-3">
                            <Icon className="mt-0.5 shrink-0 text-primary" size={19} />

                            <div className="min-w-0">
                                <p className="text-xs text-paragraph">{label}</p>
                                <p className="mt-1 break-all text-sm text-heading">
                                    {value}
                                </p>
                            </div>
                        </div>)}
                </div>
            </section>
        </aside>

    )
}
