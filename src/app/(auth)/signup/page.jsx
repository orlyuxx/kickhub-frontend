"use client";

import { useState } from "react";

export default function SignUpPage() {
  // Changed function name to SignUpPage
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "", // Added confirmPassword field
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle sign-up logic here
    console.log("Form submitted:", formData);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-base-100 p-4">
      <div className="w-full max-w-md p-8 rounded-xl backdrop-blur-lg bg-white/30 shadow-xl border border-base-300">
        <h2 className="text-3xl font-bold text-base-content text-center mb-8">
          Sign Up
        </h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label
              htmlFor="email"
              className="block text-base-content text-sm font-medium mb-2"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full px-4 py-2 rounded-lg bg-transparent border border-base-300 text-base-content placeholder-base-500 focus:outline-none"
              placeholder="Enter your email"
              required
            />
          </div>

          <div>
            <label
              htmlFor="password"
              className="block text-base-content text-sm font-medium mb-2"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="w-full px-4 py-2 rounded-lg bg-transparent border border-base-300 text-base-content placeholder-base-500 focus:outline-none"
              placeholder="Enter your password"
              required
            />
          </div>

          <div>
            {" "}
            <label
              htmlFor="confirmPassword"
              className="block text-base-content text-sm font-medium mb-2"
            >
              Confirm Password
            </label>
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              className="w-full px-4 py-2 rounded-lg bg-transparent border border-base-300 text-base-content placeholder-base-500 focus:outline-none"
              placeholder="Confirm your password"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full py-3 px-4 bg-black hover:bg-gray-800 text-white font-semibold rounded-lg transition duration-200 ease-in-out"
          >
            Sign Up
          </button>
        </form>

        <div className="mt-4 text-center">
          <p className="text-base-content">
            Already have an account?
            <a href="/login" className="text-blue-500 hover:underline pl-2">
              Log In
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
