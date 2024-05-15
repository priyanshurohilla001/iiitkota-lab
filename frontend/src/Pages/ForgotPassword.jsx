import { useForm } from "react-hook-form";
import axios from "axios";

export const ForgotPassword = () => {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();

  const onSubmit = async (data) => {

    try {
      const req = await axios.post(
        import.meta.env.VITE_SERVER + "/api/v1/user/forgot-password",
        {
          email: data.email,
        }
      );

      alert(req.data);
    } catch (error) {
      console.log(error);
    }
  
  };

  return (
    <div className=" h-[80vh] flex items-center justify-center bg-gray-100">
      <div className="flex flex-col gap-4 w-full mx-4 md:w-1/2 lg:w-1/3 px-10 py-6 shadow-xs rounded-lg border-2 border-gray-100 bg-white">
        <div>
          <h1 className="text-4xl font-semibold mb-4">Forgot Password</h1>
          <p className="text-gray-500">
            Enter your email address below and we'll send you a link to reset
            your password.
          </p>
        </div>
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col">
          <input
            {...register("email")}
            type="email"
            placeholder="Enter Your email"
            className="border-2 border-gray-100 rounded-sm px-2 py-2"
          />
          <button
            type="submit"
            className="px-4 py-2 mt-4 bg-primary hover:bg-blue-950 text-white "
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};
