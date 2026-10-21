import { Link, useNavigate } from "react-router-dom";
import { FiHome, FiArrowLeft } from "react-icons/fi";

export default function NotFound() {
    const navigate = useNavigate();

    return (
        <div className="flex w-full items-center justify-center overflow-hidden bg-background py-6">
            <section className="mx-auto w-full max-w-xl text-center">

                {/* Error Code */}
                <div className="relative mx-auto mb-4 flex h-28 w-28 items-center justify-center rounded-full bg-primary/5">
                    <div className="absolute inset-2 rounded-full border border-dashed border-primary/20" />

                    <span className="text-5xl font-black tracking-tighter text-primary">
                        404
                    </span>

                    <span className="absolute right-2 top-3 h-3 w-3 rounded-full bg-[#B6ACFF]" />
                    <span className="absolute bottom-3 left-2 h-2.5 w-2.5 rounded-full bg-primary/40" />
                </div>

                <h1 className="text-2xl font-bold text-heading sm:text-3xl">
                    Oops! Page not found
                </h1>

                <p className="mx-auto mt-3 max-w-md text-sm leading-6 text-paragraph">
                    Looks like this page took a little detour.
                    The page you’re looking for doesn’t exist or may have been moved.
                </p>

                {/* Actions */}
                <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
                    <Link
                        to="/"
                        className="flex items-center gap-2 rounded-xl bg-primary px-5 py-2.5 text-sm font-semibold text-white transition hover:-translate-y-0.5 hover:opacity-90"
                    >
                        <FiHome size={17} />
                        Back to Home
                    </Link>

                    <button
                        type="button"
                        onClick={() => navigate(-1)}
                        className="flex items-center gap-2 rounded-xl border border-primary/15 bg-card px-5 py-2.5 text-sm font-semibold text-heading transition hover:border-primary/30 hover:bg-primary/5"
                    >
                        <FiArrowLeft size={17} />
                        Go Back
                    </button>
                </div>

                <p className="mt-7 text-xs text-paragraph">
                    Lost in the loop?{" "}
                    <span className="font-bold text-primary">Loop.</span>
                </p>
            </section>
        </div>
    );
}