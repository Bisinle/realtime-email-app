import { Link } from "react-router-dom";
import { createRef, useState } from "react";
import {axiosAuth} from "../../axiosClient";
import { useStateContext } from "../../contexts/ContextProvider";

export default function Signup() {
    const nameRef = createRef();
    const emailRef = createRef();
    const passwordRef = createRef();
    const passwordConfirmationRef = createRef();
    const { setCurrentUser, setToken } = useStateContext();
    const [errors, setErrors] = useState(null);

    const onSubmit = (ev) => {
        ev.preventDefault();

        const payload = {
            name: nameRef.current.value,
            email: emailRef.current.value,
            password: passwordRef.current.value,
            password_confirmation: passwordConfirmationRef.current.value,
        };
        axiosAuth
            .post("/signup", payload)
            .then(({ data }) => {
                console.log("User:" + data.user, "Token" + data.token);
                setCurrentUser(data.user);
                setToken(data.token);
            })
            .catch((err) => {
                const response = err.response;
                if (response && response.status === 422) {
                    setErrors(response.data.errors);
                }
            });
    };

    return (
        <form onSubmit={onSubmit} className=" flex flex-col gap-3">
            <h1 className="title">Signup for Free</h1>

            <div className="flex flex-col my-0 py-0 ">
                <input
                    autoComplete="on"
                    ref={nameRef}
                    type="text"
                    placeholder="Full Name"
                    className="m-0"
                />
                {errors && errors.name && (
                    <p className="text-red-500 ">* {errors.name[0]}</p>
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

            <div className="flex flex-col my-0 py-0 ">
                <input
                    autoComplete="on"
                    ref={passwordConfirmationRef}
                    type="password"
                    placeholder="Repeat Password"
                />
                {errors && errors.password_confirmation && (
                    <p className="text-red-500 ">
                        * {errors.password_confirmation[0]}
                    </p>
                )}
            </div>

            <button className="btn btn-block">Signup</button>
            <p className="message">
                Already registered? <Link to="/login">Sign In</Link>
            </p>
        </form>
    );
}
