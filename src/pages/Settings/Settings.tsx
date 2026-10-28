import ChangePassword from "./ChangePassword/ChangePassword";

export default function Settings() {


    return (
        <>
            <title>Loop | Settings</title>
            <div className="mx-auto w-full max-w-3xl sm:px-6">
                {/* Page Header */}
                <div className="mb-6">
                    <h1 className="text-2xl font-bold text-heading sm:text-3xl">
                        Settings
                    </h1>

                    <p className="mt-2 text-sm text-paragraph">
                        Manage your account settings.
                    </p>
                </div>

                <ChangePassword />
            </div>
        </>
    );
}
