import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });
    const [errors, setErrors] = useState({});
    const [success, setSuccess] = useState("");
    const [apiError, setApiError] = useState("");

    const navigate = useNavigate(); // For navigation

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const validate = () => {
        const newErrors = {};
        if (!formData.email) newErrors.email = "Email is required";
        else if (!/\S+@\S+\.\S+/.test(formData.email))
            newErrors.email = "Email is invalid";

        if (!formData.password) newErrors.password = "Password is required";
        else if (formData.password.length < 6)
            newErrors.password = "Password must be at least 6 characters";

        return newErrors;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setApiError(""); // Reset API error
        const validationErrors = validate();
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            setSuccess("");
        } else {
            setErrors({});
            try {
                const response = await fetch("http://localhost:8080/api/users/login", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(formData),
                });

                if (!response.ok) {
                    const errorData = await response.json();
                    throw new Error(errorData.message || "Login failed");
                }

                const data = await response.json();
                setSuccess("Login Successful!");
                
                // Optionally save JWT/token in localStorage
                if (data.token) {
                    localStorage.setItem("token", data.token);
                }

                // Navigate to home page
                navigate("/home");
            } catch (err) {
                setApiError(err.message);
                setSuccess("");
            }
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-grey-100">
            <div className="bg-white p-10 rounded-lg shadow-lg w-full max-w-lg">
                <div className="flex justify-center mb-5">
                    <h1 className="text-4xl font-extrabold bg-gradient-to-br from-indigo-700 via-purple-700 to-pink-600 
                 bg-clip-text text-transparent">
                        ShopMate
                    </h1>
                </div>

                <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">
                    Login to Your Account
                </h2>

                <form onSubmit={handleSubmit} className="space-y-5">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="md:col-span-2">
                            <label className="block mb-1 font-medium text-gray-700">Email</label>
                            <input
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                placeholder="Your Email"
                                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-400"
                            />
                            {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
                        </div>

                        <div className="md:col-span-2">
                            <label className="block mb-1 font-medium text-gray-700">Password</label>
                            <input
                                type="password"
                                name="password"
                                value={formData.password}
                                onChange={handleChange}
                                placeholder="Your Password"
                                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-400"
                            />
                            {errors.password && (
                                <p className="text-red-500 text-sm mt-1">{errors.password}</p>
                            )}
                        </div>
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-indigo-600 text-white py-2 rounded-md font-semibold hover:bg-indigo-700 transition duration-300"
                    >
                        Login
                    </button>

                    <p className="text-center text-sm text-gray-600 mt-3">
                        Don’t have an account?{" "}
                        <Link to="/register" className="text-indigo-600 hover:underline">
                            Register
                        </Link>
                    </p>

                    {success && <p className="text-green-500 text-center mt-3">{success}</p>}
                    {apiError && <p className="text-red-500 text-center mt-3">{apiError}</p>}
                </form>
            </div>
        </div>
    );
};

export default Login;
