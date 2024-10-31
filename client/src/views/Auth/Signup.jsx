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

const navigate =useNavigate();

  const  onSubmit =async (ev) => {
    ev.preventDefault();

    const payload = {
        firstName: firstName.current.value,
      email: emailRef.current.value,
      password: passwordRef.current.value,
      lastName: lastName.current.value,
    };
    const response = await axiosAuth.post("/register", payload);
            const { user, token } = response.data;
            console.log(response);

            setCurrentUser(user);
            setToken(token);
            localStorage.setItem("user", JSON.stringify(user));
            navigate("/")
        .catch((err) => {
            const response = err.response;
            if (response && response.status === 422) {
                setErrors(response.data.errors);
            }
        });
    console.log(payload);
    
  };

  return (
    <form onSubmit={onSubmit} className=" flex flex-col gap-3">
      <h1 className="title">Signup for Free</h1>

      <div className="flex flex-col my-0 py-0 ">
        <input
          autoComplete="on"
          ref={firstName}
          type="text"
          placeholder="first Name"
          className="m-0"
        />
        {errors && errors.firstName && (
          <p className="text-red-500 ">* {errors.firstName[0]}</p>
        )}
      </div>
      <div className="flex flex-col my-0 py-0 ">
        <input
          autoComplete="on"
          ref={lastName}
          type="text"
          placeholder="lastName"
        />
        {errors && errors.lastName && (
          <p className="text-red-500 ">* {errors.lastName[0]}</p>
        )}
      </div>
      <div className="flex flex-col my-0 py-0 ">
        <input
          autoComplete="on"
          ref={emailRef}
          type="email"
          placeholder="Email Address"
          className="m-0"
        />
        {errors && errors.email && (
          <p className="text-red-500 ">* {errors.email[0]}</p>
        )}
      </div>

      <div className="flex flex-col my-0 py-0 ">
        <input
          autoComplete="on"
          ref={passwordRef}
          type="password"
          placeholder="Password"
          className="m-0"
        />
        {errors && errors.password && (
          <p className="text-red-500 ">* {errors.password[0]}</p>
        )}
      </div>

    

      <button className="btn btn-block">Signup</button>
      <p className="message">
        Already registered? <Link to="/login">Sign In</Link>
      </p>
    </form>
  );
}