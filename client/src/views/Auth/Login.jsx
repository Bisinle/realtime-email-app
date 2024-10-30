import { Link, Navigate, useNavigate } from "react-router-dom";
import { axiosAuth } from "../../axiosClient.jsx";

import { createRef } from "react";
import { useStateContext } from "../../contexts/ContextProvider.jsx";
import { useState } from "react";

export default function Login() {
    const navigate = useNavigate();
    const emailRef = createRef();
    const passwordRef = createRef();
    const { setCurrentUser, setToken } = useStateContext();
    const [message, setMessage] = useState(null);

   
    const onSubmit = async (ev) => {
        ev.preventDefault();

        const credentials = {
            email: emailRef.current.value,
            password: passwordRef.current.value,
        };
        console.log("in submit login");

        try {
            const response = await axiosAuth.post("auth/login", credentials);
            const { user, token } = response.data;
            console.log(response);

            setCurrentUser(user);
            setToken(token);
            localStorage.setItem("user", JSON.stringify(user));
            navigate("/");
        } catch (err) {
            const response = err.response;
            if (response && response.status === 422) {
                setMessage(response.data.message);
            }
        }
    };
    return (
        <form onSubmit={onSubmit}>
            <h1 className="title">Login into your account</h1>
<h1>abdiwadud.mohamedd@gmail.com</h1>
<h1>passowrd</h1>
            {message && (
                <div className="alert">
                    <p>{message}</p>
                </div>
            )}

            <input
                autoComplete="on"
                ref={emailRef}
                type="email"
                placeholder="Email"
            />
            <input
                autoComplete="on"
                ref={passwordRef}
                type="password"
                placeholder="Password"
            />
            <button className="btn btn-block">Login</button>
            <p className="message">
               
                <Link to="/forgot-password">Forgot password</Link>
            </p>
            <p className="message">
                Not registered? <Link to="/signup">Create an account</Link>
            </p>
        </form>
    );
}
