import { useState } from "react";
import { useForm } from "react-hook-form";
import { FiChevronDown, FiLock } from "react-icons/fi";
import type { IChangePassword } from "../../../interfaces/auth";
import { changePasswordDefaultValues } from "../../../defaultValues/defaultValues";
import { zodResolver } from "@hookform/resolvers/zod";
import { changePasswordSchema } from "../../../validation/changePasswordSchema";
import { useMutation } from "@tanstack/react-query";
import api from "../../../shared/api/axiosRequest";
import { toast } from "@heroui/react";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";

export default function ChangePassword() {
    const [isPasswordOpen, setIsPasswordOpen] = useState(false);
    const [hidePassword, setHidePassword] = useState<boolean>(true)
    const [hideNewPassword, setHideNewPassword] = useState<boolean>(true)

    const { register, handleSubmit, formState: { errors }, reset } = useForm<IChangePassword>({
        defaultValues: changePasswordDefaultValues,
        resolver: zodResolver(changePasswordSchema)
    });

    const { mutate, isPending } = useMutation({
        mutationFn: (passwords: IChangePassword) => {
            return api.patch("users/change-password", passwords);
        },
        onSuccess: (response) => {
            toast.success("Password is changed successfully");
            reset();
            localStorage.setItem("token", response.data.data.token)
        }
    })

    function confirmPasswords(passwords: IChangePassword) {
        mutate(passwords);
    };

    return (
        <>
            <section className="overflow-hidden rounded-2xl border border-primary/10 bg-card shadow-sm">
                <button type="button" onClick={() => setIsPasswordOpen(!isPasswordOpen)}
                    aria-expanded={isPasswordOpen}
                    className="flex w-full items-center justify-between gap-4 p-5 text-left transition hover:bg-primary/5 sm:p-6">
                    <div className="flex items-center gap-4">
                        <div className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
                            <FiLock size={21} />
                        </div>

                        <div>
                            <h2 className="font-semibold text-heading">
                                Change Password
                            </h2>

                            <p className="mt-1 text-sm text-paragraph">
                                Update your account password.
                            </p>
                        </div>
                    </div>

                    <FiChevronDown size={20}
                        className={`shrink-0 text-paragraph transition-transform ${isPasswordOpen ? "rotate-180" : ""}`} />
                </button>

                {/* Password Form */}
                {isPasswordOpen && (
                    <div className="border-t border-primary/10 p-5 sm:p-6">
                        <form onSubmit={handleSubmit(confirmPasswords)} className="space-y-5">
                            <div>
                                <label htmlFor="currentPassword"
                                    className="mb-2 block text-sm font-medium text-heading" >
                                    Current Password
                                </label>

                                <div className="relative">
                                    <input {...register("password")} type={hidePassword ? "password" : "text"}
                                        placeholder="Enter your current password"
                                        className="w-full rounded-xl border border-primary/15 bg-background px-4 py-3 text-sm text-heading outline-none transition placeholder:text-paragraph focus:border-primary" />
                                    <button type="button"
                                        onClick={() => setHidePassword(!hidePassword)}>
                                        {hidePassword ? <FaRegEye size={25} className="absolute top-2.5 right-3 text-paragraph" />
                                            : <FaRegEyeSlash size={25} className="absolute top-2.5 right-3 text-paragraph" />}
                                    </button>
                                </div>
                                {errors.password && <p className="text-red-500 mt-1">{errors.password.message}</p>}
                            </div>

                            <div>
                                <label htmlFor="newPassword"
                                    className="mb-2 block text-sm font-medium text-heading" >
                                    New Password
                                </label>
                                <div className="relative">
                                    <input {...register("newPassword")} type={hideNewPassword ? "password" : "text"}
                                        placeholder="Enter your new password"
                                        className="w-full rounded-xl border border-primary/15 bg-background px-4 py-3 text-sm text-heading outline-none transition placeholder:text-paragraph focus:border-primary" />
                                    <button type="button"
                                        onClick={() => setHideNewPassword(!hideNewPassword)}>
                                        {hideNewPassword ? <FaRegEye size={25} className="absolute top-2.5 right-3 text-paragraph" />
                                            : <FaRegEyeSlash size={25} className="absolute top-2.5 right-3 text-paragraph" />}
                                    </button>
                                </div>
                                {errors.newPassword && <p className="text-red-500 mt-1">{errors.newPassword.message}</p>}
                            </div>
                            <div className="mt-6">
                                <button type="submit" className="btn-primary">
                                    {isPending ? "Confirming..." : "Confirm"}
                                </button>
                            </div>
                        </form>

                    </div>
                )}
            </section>
        </>
    )
}
