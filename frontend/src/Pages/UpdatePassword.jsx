import { useForm } from "react-hook-form";
import { useParams } from "react-router-dom";
import axios from "axios";

export const UpdatePassword = () => {
  const { token } = useParams();

  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm();
  const onSubmit = async (data) => {
    try {
      const req = await axios.post(
        import.meta.env.VITE_SERVER + "/api/v1/user/reset-password",
        {
          password: data.password,
          token,
        }
      );
      alert("password is updated successfully")
    } catch (error) {
       alert("Something went wrong")
    }
  };

  return (
    <div className=" h-[80vh] flex items-center justify-center bg-gray-100">
      <div className="flex flex-col gap-4 w-full mx-4 md:w-1/2 lg:w-1/3 px-10 py-6 shadow-xs rounded-lg border-2 border-gray-100 bg-white">
        <div>
          <h1 className="text-4xl font-semibold mb-4">Reset Password</h1>
          <p className="text-gray-500">
            Make sure you remember your password this time.
          </p>
        </div>
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
          <input
            {...register("password", { required: "This field is required" })}
            type="password"
            placeholder="Enter Your password"
            className="border-2 border-gray-100 rounded-sm px-2 py-2"
          />
          {errors.password && (
            <div className="text-right text-sm text-red-700">
              {errors.password.message}
            </div>
          )}
          <input
            {...register("confirmPassword", {
              required: "This field is required",
              validate: (value) =>
                value === getValues().password || "Passwords don't match",
            })}
            type="password"
            placeholder="Confirm Your password"
            className="border-2 border-gray-100 rounded-sm px-2 py-2"
          />
          {errors.confirmPassword && (
            <div className="text-right text-sm text-red-700">
              {errors.confirmPassword.message}
            </div>
          )}
          <button
            type="submit"
            className="px-4 py-2 mt-4 bg-primary hover:bg-blue-950 text-white "
          >
            Update Password
          </button>
        </form>
      </div>
    </div>
  );
};
