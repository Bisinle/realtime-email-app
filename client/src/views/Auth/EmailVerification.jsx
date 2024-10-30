import React, { useState, useEffect } from "react";
import { axiosAuth } from "../../axiosClient";
import { useParams, useNavigate } from "react-router-dom";

const EmailVerification = () => {
    const [message, setMessage] = useState("");
    const [error, setError] = useState("");
    const { id, hash } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        if (id && hash) {
            verifyEmail();
        }
    }, [id, hash]);

    const verifyEmail = async () => {
        try {
            const response = await axiosAuth.get(`/verify-email/${id}/${hash}`);
            setMessage(response.data.message || "Email verified successfully!");
            setTimeout(() => navigate("/dashboard"), 3000);
        } catch (err) {
            setError(
                err.response.data.message ||
                    "Verification failed. Please try again."
            );
        }
    };

    const resendVerification = async () => {
        try {
            const response = await axiosAuth.post(
                "/email/verification-notification"
            );
            setMessage(response.data.message || "Verification link sent!");
            setError("");
        } catch (err) {
            setError(
                err.response.data.message ||
                    "Failed to send verification email. Please try again."
            );
            setMessage("");
        }
    };

    return (
        <div className="max-w-md mx-auto mt-8 p-6 bg-white rounded-lg shadow-md">
            <h2 className="text-2xl font-bold mb-4 text-black">
                Email Verification
            </h2>
            {message && (
                <p className="mb-4 text-sm text-green-600">{message}</p>
            )}
            {error && <p className="mb-4 text-sm text-red-600">{error}</p>}
            {!id && !hash && (
                <button
                    onClick={resendVerification}
                    className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-500 hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                    Resend Verification Email
                </button>
            )}
        </div>
    );
};

export default EmailVerification;
