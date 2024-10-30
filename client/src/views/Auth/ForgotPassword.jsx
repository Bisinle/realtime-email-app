import React, { createRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { axiosAuth } from '../../axiosClient.jsx';
import { useStateContext } from '../../contexts/ContextProvider.jsx';

export default function ForgotPassword() {
    const emailRef = createRef();
    const [message, setMessage] = useState(null);

    const onSubmit = async (ev) => {
        ev.preventDefault();

        const payload = {
            email: emailRef.current.value,
        };

        try {
            const response = await axiosAuth.post("/forgot-password", payload);
            setMessage(response.data.message);
        } catch (err) {
            const response = err.response;
            if (response && response.status === 422) {
                setMessage(response.data.message);
            }
        }
    };

    return (
        <form onSubmit={onSubmit}>
            <h1 className="title">Forgot Password</h1>
            {message && (
                <div className="alert">
                    <p>{message}</p>
                </div>
            )}
            <input ref={emailRef} type="email" placeholder="Email" />
            <button className="btn btn-block">Send Reset Link</button>
            <p className="message">
                Remember your password? <Link to="/login">Login</Link>
            </p>
        </form>
    );
}
