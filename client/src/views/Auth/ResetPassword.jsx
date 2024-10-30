import React, { createRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { axiosAuth } from "../../axiosClient.jsx";
import { useStateContext } from "../../contexts/ContextProvider.jsx";

export default function ResetPassword() {
    const navigate = useNavigate();
    const emailRef = createRef();
    const passwordRef = createRef();
    const passwordConfirmationRef = createRef();
    const tokenRef = createRef();
    const [message, setMessage] = useState(null);

    const onSubmit = async (ev) => {
        ev.preventDefault();

        const payload = {
            email: emailRef.current.value,
            password: passwordRef.current.value,
            password_confirmation: passwordConfirmationRef.current.value,
            token: tokenRef.current.value,
        };

        try {
            const response = await axiosAuth.post("/reset-password", payload);
            setMessage(response.data.message);
            navigate("/login");
        } catch (err) {
            const response = err.response;
            if (response && response.status === 422) {
                setMessage(response.data.message);
            }
        }
    };

    return (
        <form onSubmit={onSubmit}>
            <h1 className="title">Reset Password</h1>
            {message && (
                <div className="alert">
                    <p>{message}</p>
                </div>
            )}
            <input ref={emailRef} type="email" placeholder="Email" />
            <input
                ref={passwordRef}
                type="password"
                placeholder="New Password"
            />
            <input
                ref={passwordConfirmationRef}
                type="password"
                placeholder="Confirm New Password"
            />
            <input ref={tokenRef} type="hidden" name="token" />
            <button className="btn btn-block">Reset Password</button>
        </form>
    );
}
