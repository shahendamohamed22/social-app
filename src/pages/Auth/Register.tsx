import { useForm } from "react-hook-form"
import type { IRegister } from "../../interfaces/auth";
import { zodResolver } from "@hookform/resolvers/zod";
import { registerSchema } from "../../validation/registerSchema";
import { registerDefaultValues } from "../../defaultValues/defaultValues";
import axios, { isAxiosError } from "axios";
import base_Url from "../../shared/api/baseURL";
import { Spinner, toast } from "@heroui/react";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { authContext } from "../../shared/context/AuthContext";

export default function Register() {

  const [isLoading, setIsLoading] = useState(false);
  const { login } = useContext(authContext)
  const navigate = useNavigate();

  const { register, handleSubmit, formState: { errors } } = useForm<IRegister>({
    defaultValues: registerDefaultValues,
    resolver: zodResolver(registerSchema)
  });

  async function submitForm(formData: IRegister) {
  
    if (isLoading) return;

    try {
      setIsLoading(true);
      const { data } = await axios.post(`${base_Url}users/signup`, formData)
      console.log(data);

      toast.success(data.message);
      login(data.data.token)

      setTimeout(() => {
        navigate("/")
      }, 2000)

    } catch (error) {
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
      <h2 className="text-heading text-lg md:text-xl font-medium mt-3">Craete your acount</h2>
      <h3 className="text-paragraph text-sm xl:text-md font-medium ">Join Loop and start sharing your moments</h3>

      <form onSubmit={handleSubmit(submitForm)} className="w-full space-y-3 mt-4">
        <div>
          <label htmlFor="name" className=" form-label">
            Full Name
          </label>

          <input className="input-field px-4 py-1.5"
            {...register("name")}
            placeholder="Enter your full name"
          />
          {errors.name && <p className="text-red-500 mt-1">{errors.name.message}</p>}
        </div>

        <div>
          <label htmlFor="username" className="form-label">
            Username
          </label>

          <input className="input-field px-4 py-1.5"
            type="text"
            {...register("username")}
            placeholder="Choose a username"
          />

          {errors.username && <p className="text-red-500 mt-1">{errors.username.message}</p>}
        </div>

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
          <label htmlFor="dateOfBirth" className="form-label">
            Date of Birth
          </label>

          <input className="input-field px-4 py-1.5"
            {...register("dateOfBirth")}
            type="date"
          />

          {errors.dateOfBirth && <p className="text-red-500 mt-1">{errors.dateOfBirth.message}</p>}
        </div>

        <div>
          <label className="form-label">
            Gender
          </label>

          <div className="flex gap-6">
            <label className="flex items-center gap-2 text-heading">
              <input
                type="radio"
                value="male"
                {...register("gender")}
                className="accent-primary"
              />
              Male
            </label>

            <label className="flex items-center gap-2 text-heading">
              <input
                type="radio"
                value="female"
                {...register("gender")}
                className="accent-primary"
              />
              Female
            </label>
          </div>

          {errors.gender && <p className="text-red-500 mt-1">{errors.gender.message}</p>}
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

        <div>
          <label htmlFor="rePassword" className="form-label">
            Confirm Password
          </label>

          <input className="input-field px-4 py-1.5"
            {...register("rePassword")}
            placeholder="Confirm the Password"
            type="password"
          />
          {errors.rePassword && <p className="text-red-500 mt-1">{errors.rePassword.message}</p>}
        </div>

        <button
          type="submit"
          className="w-full"
        >
          {isLoading ? <div className="flex items-center justify-center gap-2"><Spinner color="current" /> ...Creating acount</div> : "Create acount"}

        </button>
      </form>


    </>
  )
}
