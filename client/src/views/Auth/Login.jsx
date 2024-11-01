import { Link, Navigate, useNavigate } from "react-router-dom";
import { axiosAuth } from "../../axiosClient.jsx";
import { useForm } from "react-hook-form";
import { createRef } from "react";
import { useStateContext } from "../../contexts/ContextProvider.jsx";
import { useState } from "react";

export default function Login() {
  const navigate = useNavigate();
  const emailRef = createRef();
  const passwordRef = createRef();
  const { setCurrentUser, setToken } = useStateContext();
  const [message, setMessage] = useState(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (credentials) => {


    try {
      const response = await axiosAuth.post("/login", credentials);
      const { user, token } = response.data;
      // localStorage.setItem("user", JSON.stringify(user));
      setCurrentUser(user);
      setToken(token);
      navigate("/dashboard");
    } catch (err) {
      const response = err.response;
      console.log(err.response.data.error);

      setMessage(err.response.data.error);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-900 text-center">
        Login to your account
      </h2>

      {message && (
        <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
          <p className="text-red-600">{message}</p>
        </div>
      )}

      <div className="space-y-4">
        <div>
          <input
            autoComplete="on"
            {...register("email", {
              required: "email is required",
              minLength: 3,
            })}
            type="email"
            placeholder="Email"
            className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors"
          />
          {errors.email && (
            <p className="text-red-500 font-semibold">{errors.email?.message}</p>
          )}
        </div>

        <div>
          <input
            autoComplete="on"
            {...register("password", { required: "password is required" })}
            type="password"
            placeholder="Password"
            className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors"
          />
           {errors.password && (
            <p className="text-red-500 font-semibold">{errors.password?.message}</p>
          )}
        </div>
      </div>

      <button
        type="submit"
        className="w-full py-3 px-4 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors"
      >
        Login
      </button>

      <div className="space-y-2">
        <p className="text-center text-gray-600">
          <Link
            to="/forgot-password"
            className="text-blue-600 hover:text-blue-700 font-medium"
          >
            Forgot password?
          </Link>
        </p>
        <p className="text-center text-gray-600">
          Not registered?{" "}
          <Link
            to="/signup"
            className="text-blue-600 hover:text-blue-700 font-medium"
          >
            Create an account
          </Link>
        </p>
      </div>
    </form>
  );
}
