import { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { PasswordComplexity } from "../components/PasswordComplexity";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useSetRecoilState } from "recoil";
import { BiRightArrowAlt } from "react-icons/bi";

import { signupDataAtom } from "../atoms/SignupDataatom.js";

export default function Signup() {
  return (
    <div className=" h-screen flex items-center justify-center bg-gray-100">
      <div className="flex flex-col gap-4 w-full mx-4 md:w-1/3 px-10 py-6 shadow-xs rounded-lg border-2 border-gray-100 bg-white">
        <Signup1 />
      </div>
    </div>
  );
}

function Signup1() {
  const [passwordshown, setPasswordShown] = useState(false);

  const [userexist, setUserexist] = useState(false);
  const setSignupData = useSetRecoilState(signupDataAtom);

  const DefaultValuesForForm = {
    registeration: {
      password: "",
      confirmpassword: "",
    },
  };

  const {
    register,
    getValues,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm({
    defaultValues: DefaultValuesForForm.registeration,
  });

  const navigate = useNavigate();

  const submitref = useRef(null);

  const onSubmit = async (data) => {
    submitref.current.disabled = true;

    submitref.current.classList.add("animate-pulse");

    const userexist = await axios.get(
      import.meta.env.VITE_SERVER + `/api/v1/user/exist?email=${data.email}`,
    );

    if (userexist.data) {
      setUserexist(true);
      return;
    }

    setSignupData(data);

    submitref.current.disabled = false;
    submitref.current.classList.remove("animate-pulse");

    console.log(data);

    await axios.post(
      import.meta.env.VITE_SERVER + "/api/v1/emailverification/generate",
      {
        email: data.email,
      },
    );

    navigate("/signup/verify");
  };

  return (
    <div>
      <h1 className="text-center text-4xl font-semibold mb-4">Sign Up</h1>

      <form
        onSubmit={(e) => {
          e.preventDefault();
        }}
        className="flex flex-col gap-2 w-full"
      >
        <label> Name </label>
        <input
          {...register("name", {
            required: "Name is required",
          })}
          type="text"
          placeholder="Full Name"
          name="name"
          className="border-2 border-gray-100 rounded-sm px-2 py-2"
        />
        <p className="text-right text-sm text-red-700">
          {errors.name?.message}
        </p>
        <label> Email </label>
        <input
          {...register("email", {
            required: "Email is required",
            pattern: {
              value: /.*@iiitkota\.ac\.in$/,
              message: "Enter Your College Mail Id",
            },
          })}
          type="email"
          placeholder="Enter Your College Email"
          name="email"
          className="border-2 border-gray-100 rounded-sm px-2 py-2"
        />
        <p className="text-right text-sm text-red-700">
          {errors.email?.message}
        </p>

        <div className="flex justify-between">
          <label> Password </label>
          <div
            onClick={() => {
              setPasswordShown(!passwordshown);
            }}
            className="  cursor-pointer hover:text-primary"
          >
            {passwordshown ? "Hide Password" : "Show Password"}
          </div>
        </div>

        <input
          {...register("password", {
            required: "You must specify a password",
            minLength: {
              value: 6,
              message: "Password must have 6 characters",
            },
          })}
          type={passwordshown ? "text" : "password"}
          placeholder="Choose a strong password 👀"
          name="password"
          className="border-2 border-gray-100 rounded-sm px-2 py-2"
        />
        <p className="text-right text-sm text-red-700">
          {errors.password?.message}
        </p>

        <PasswordComplexity valueOfNewPassword={watch("password")} />

        <label className="">Confirm Password </label>
        <input
          {...register("confirmpassword", {
            validate: (value) =>
              value === getValues().password || "The password do not match",
          })}
          type="password"
          placeholder="So You dont forget the password 😎"
          name="confirmpassword"
          className="border-2 border-gray-100 rounded-sm px-2 py-2"
        />
        <p className="text-right text-sm text-red-700">
          {errors.confirmpassword?.message}
        </p>
        <label>Section</label>
        <select
          {...register("section")}
          className="border-2 border-gray-100 rounded-sm px-2 py-2"
        >
          <option value="A1">A1</option>
          <option value="A2">A2</option>
          <option value="A3">A3</option>
          <option value="B1">B1</option>
          <option value="B2">B2</option>
          <option value="B3">B3</option>
          <option value="C1">C1</option>
          <option value="C2">C2</option>
          <option value="C3">C3</option>
        </select>
        <button
          ref={submitref}
          type="submit"
          onClick={handleSubmit(onSubmit)}
          className="px-4 py-2 mt-4 bg-primary hover:bg-blue-950 text-white "
        >
          Next
          <BiRightArrowAlt className="size-5 inline-block" />
        </button>
      </form>
      <div className="bg-red-700 mt-4  text-white ">
        {userexist && (
          <div className="px-4 py-2 flex-col items-center text-center">
            <p className="text-gray-200">
              User already exists try logging in instead{" "}
            </p>
            <a href="/login" className="inline-flex gap-1 align-middle">
              <p className=" font-semibold">login</p>
              <svg
                className="w-6 h-6"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                fill="none"
                viewBox="0 0 24 24"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M19 12H5m14 0-4 4m4-4-4-4"
                />
              </svg>
            </a>
          </div>
        )}
      </div>
    </div>
  );
}
