import { Link, useNavigate } from "react-router-dom";
import { createRef, useState } from "react";
import { axiosAuth } from "../../axiosClient";
import { useStateContext } from "../../contexts/ContextProvider";
import { useForm } from "react-hook-form";

export default function Signup() {
  const [message, setMessage] = useState(null);
  const { setCurrentUser, setToken } = useStateContext();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
    },
  });

  const onSubmit = async (credentials) => {
    try {
      const response = await axiosAuth.post("/register", credentials);
      const { user, token } = response.data;
      setToken(token);
      setCurrentUser(user);
      // localStorage.setItem("user", JSON.stringify(user));
      navigate("/dashboard");
    } catch (err) {
      const response = err.response;
      if (response && response.status === 422) {
        setErrors(response.data.errors);
      }
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-900 text-center">
        Sign up for Free
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
            // ref={firstName}
            {...register("firstName", {
              required: "firstName is required",
              minLength: 3,
            })}
            type="text"
            placeholder="First Name"
            className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors"
          />
          {errors && errors.firstName && (
            <p className="mt-1 text-sm text-red-600">
              * {errors.firstName?.message}
            </p>
          )}
        </div>

        <div>
          <input
            autoComplete="on"
            // ref={lastName}
            {...register("lastName", {
              required: "lastName is required",
              minLength: 3,
            })}
            type="text"
            placeholder="Last Name"
            className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors"
          />
          {errors && errors.lastName && (
            <p className="mt-1 text-sm text-red-600">
              * {errors.lastName?.message}
            </p>
          )}
        </div>

        <div>
          <input
            autoComplete="on"
            // ref={emailRef}
            {...register("email", {
              required: "email is required",
              minLength: 3,
            })}
            type="email"
            placeholder="Email Address"
            className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors"
          />
          {errors && errors.lastName && (
            <p className="mt-1 text-sm text-red-600">
              * {errors.lastName?.message}
            </p>
          )}
        </div>

        <div>
          <input
            autoComplete="on"
            // ref={password}
            {...register("password", {
              required: "password is required",
              minLength: 3,
            })}
            type="password"
            placeholder="Password"
            className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors"
          />
          {errors && errors.lastName && (
            <p className="mt-1 text-sm text-red-600">
              * {errors.lastName?.message}
            </p>
          )}
        </div>
      </div>

      <button className="w-full py-3 px-4 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors">
        Sign up
      </button>

      <p className="text-center text-gray-600">
        Already registered?{" "}
        <Link
          to="/login"
          className="text-blue-600 hover:text-blue-700 font-medium"
        >
          Sign In
        </Link>
      </p>
    </form>
  );
}
