import { useForm } from "react-hook-form"
import type { ILogin } from "../../interfaces/auth";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema } from "../../validation/loginSchema";
import { loginDefaultValues } from "../../defaultValues/defaultValues";
import axios, { isAxiosError } from "axios";
import base_Url from "../../shared/api/baseURL";
import { Spinner, toast } from "@heroui/react";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { authContext } from "../../shared/context/AuthContext";

export default function Login() {

  const { login } = useContext(authContext)
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const { register, handleSubmit, formState: { errors } } = useForm<ILogin>({
    defaultValues: loginDefaultValues,
    resolver: zodResolver(loginSchema)
  });

  async function submitForm(formData: ILogin) {
    console.log(formData);

    if (isLoading) return;

    try {
      setIsLoading(true);

      const { data } = await axios.post(`${base_Url}users/signin`, formData)
      
      toast.success(data.message);
      login(data.data.token)

      setTimeout(() => {
        navigate("/")
      }, 2000)

    } catch (error) {
      console.log(error);

      if (isAxiosError(error)) {
        console.log(error.response, "error");
        toast.danger(error.response?.data.message)
      }
    } finally {
      setIsLoading(false);
    }

  };

  return (
    <>
      <h2 className="text-heading text-lg md:text-xl font-medium mt-3">Welcome back !</h2>
      <h3 className="text-paragraph text-sm xl:text-md font-medium ">Join Loop and start sharing your moments</h3>

      <form onSubmit={handleSubmit(submitForm)} className="w-full space-y-3 mt-4">
        <div>
          <label htmlFor="email" className="form-label">
            Email Address
          </label>

          <input className="input-field px-4 py-1.5"
            type="email"
            {...register("email")}
            placeholder="Enter your email"
          />

          {errors.email && <p className="text-red-500 mt-1">{errors.email.message}</p>}
        </div>

        <div>
          <label htmlFor="password" className="form-label">
            Password
          </label>

          <input className="input-field px-4 py-1.5"
            {...register("password")}
            type="password"
            placeholder="Create a password"
          />
          {errors.password && <p className="text-red-500 mt-1">{errors.password.message}</p>}
        </div>

        <button
          type="submit"
          className="w-full btn-primary"
        >
          {isLoading ? <div className="flex items-center justify-center gap-2"><Spinner color="current" /> ...Signing in</div> : " Sign in"}

        </button>
      </form>


    </>
  )
}
