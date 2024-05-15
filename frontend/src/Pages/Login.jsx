import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export const Login = () => {
  const {
    register,
    handleSubmit,
    setError,
    clearErrors,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();

  const [userexist, setUserexist] = useState(true);

  useEffect(() => {
    localStorage.getItem("token") && navigate("/dashboard");
  }, []);

  async function OnSubmit(data) {
    try {
      const userExistResponse = await axios.get(
        import.meta.env.VITE_SERVER + `/api/v1/user/exist?email=${data.email}`,
      );

      const userExist = userExistResponse.data;

      if (!userExist) {
        setUserexist(false);
        return;
      }

      const loginVerify = await axios.post(
        import.meta.env.VITE_SERVER + "/api/v1/user/login",
        data,
      );

      const token = loginVerify.data.token;

      localStorage.getItem("token") && localStorage.removeItem("token");
      localStorage.getItem("email") && localStorage.removeItem("email");

      localStorage.setItem("token", token);
      localStorage.setItem("email", data.email);

      navigate("/dashboard");
      window.location.reload();
    } catch (error) {
      setError("credentials", {
        type: "manual",
        message: "Invalid credentials",
      });
      return;
    }
  }

  return (
    <div className=" h-screen flex items-center justify-center bg-gray-100">
      <div className="flex flex-col gap-4 w-full mx-4 md:w-1/3 px-10 py-6 shadow-xs rounded-lg border-2 border-gray-100 bg-white">
        <div>
          <h1 className="text-center text-4xl font-semibold mb-4">Login</h1>

          <form
            className="flex flex-col gap-2 w-full"
            onSubmit={handleSubmit(OnSubmit)}
          >
            <label>Email</label>
            <input
              type="email"
              {...register("email", { required: "Email is required" })}
              placeholder="Enter Your email"
              className="border-2 border-gray-100 rounded-sm px-2 py-2"
            />
            {errors.email && (
              <div className="text-right text-sm text-red-700">
                {errors.email.message}
              </div>
            )}
            <label>Password</label>
            <input
              type="password"
              {...register("password", { required: "Password is required" })}
              placeholder="Enter Your password"
              className="border-2 border-gray-100 rounded-sm px-2 py-2"
            />
            {errors.password && (
              <div className="text-right text-sm text-red-700">
                {errors.password.message}
              </div>
            )}
            <a
              className="flex justify-end items-center text-primary "
              href="/forgot-password"
            >
              forgot password?
            </a>
            <button
              type="submit"
              className="px-4 py-2 mt-4 bg-primary hover:bg-blue-950 text-white "
            >
              Submit
            </button>
            {errors.credentials && (
              <div className="flex justify-center my-2 text-red-700 text-lg ">
                {errors.credentials.message}
              </div>
            )}
          </form>
          {!userexist && (
            <div className="px-4 py-2 flex-col items-center text-center bg-red-700 mt-4  ">
              <p className="text-gray-200">
                User doesn't exist. Please sign up
              </p>
            </div>
          )}
          <div>
            <p className="text-center mt-4">
              Don't have an account?
              <a
                className="font-semibold text-primary underline inline-block ml-2"
                href="/signup"
              >
                Sign up
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
