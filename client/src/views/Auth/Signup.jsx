import { Link, useNavigate } from "react-router-dom";
import { createRef, useState } from "react";
import { axiosAuth } from "../../axiosClient";
import { useStateContext } from "../../contexts/ContextProvider";

export default function Signup() {
  const firstName = createRef();
  const emailRef = createRef();
  const passwordRef = createRef();
  const lastName = createRef();
  const { setCurrentUser, setToken } = useStateContext();
  const [errors, setErrors] = useState(null);

  const navigate = useNavigate();

  const onSubmit = async (ev) => {
    ev.preventDefault();

    const payload = {
      firstName: firstName.current.value,
      email: emailRef.current.value,
      password: passwordRef.current.value,
      lastName: lastName.current.value,
    };

    try {
      const response = await axiosAuth.post("/register", payload);
      const { user, token } = response.data;

      setCurrentUser(user);
      setToken(token);
      localStorage.setItem("user", JSON.stringify(user));
      navigate("/");
    } catch (err) {
      const response = err.response;
      if (response && response.status === 422) {
        setErrors(response.data.errors);
      }
    }
  };

  return (
    <form onSubmit={onSubmit} className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-900 text-center">
        Sign up for Free
      </h2>

      <div className="space-y-4">
        <div>
          <input
            autoComplete="on"
            ref={firstName}
            type="text"
            placeholder="First Name"
            className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors"
          />
          {errors && errors.firstName && (
            <p className="mt-1 text-sm text-red-600">* {errors.firstName[0]}</p>
          )}
        </div>

        <div>
          <input
            autoComplete="on"
            ref={lastName}
            type="text"
            placeholder="Last Name"
            className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors"
          />
          {errors && errors.lastName && (
            <p className="mt-1 text-sm text-red-600">* {errors.lastName[0]}</p>
          )}
        </div>

        <div>
          <input
            autoComplete="on"
            ref={emailRef}
            type="email"
            placeholder="Email Address"
            className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors"
          />
          {errors && errors.email && (
            <p className="mt-1 text-sm text-red-600">* {errors.email[0]}</p>
          )}
        </div>

        <div>
          <input
            autoComplete="on"
            ref={passwordRef}
            type="password"
            placeholder="Password"
            className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors"
          />
          {errors && errors.password && (
            <p className="mt-1 text-sm text-red-600">* {errors.password[0]}</p>
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
