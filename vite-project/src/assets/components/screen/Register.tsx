// src/components/RegisterPage.tsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import useUser from "../hooks/useUser";

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [about, setAbout] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false); // Add loading state
  const { user, register } = useUser(); // Using the custom hook for registration
  const navigate = useNavigate();

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }
    if (!email.includes("@")) {
      setError("Please enter a valid email.");
      return;
    }

    setLoading(true); // Set loading to true when registration starts
    try {
      await register(email, password, name, about); // Call register from the custom hook
      if (user) {
        navigate("/home"); // Navigate to home if registration is successful
      }
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message); // Display error message
      } else {
        setError("An unknown error occurred");
      }
    } finally {
      setLoading(false); // Set loading to false when the process finishes
    }
  };

  return (
    <div className="h-screen w-screen flex bg-gradient-to-r from-green-900 to-green-400">
      {/* Left Section */}
      <div className="w-2/3 flex flex-col justify-center items-center text-white">
        <h1 className="text-4xl font-bold py-3">
          "Capture Moments, Keep Memories."
        </h1>
      </div>

      {/* Right Section */}
      <div className="w-1/3 flex justify-center items-center bg-gray-100">
        <div className="bg-white shadow-lg rounded-lg p-8 flex flex-col justify-center items-center">
          <h1 className="text-4xl font-bold mb-1">KivaPix</h1>
          <p className="text-gray-500 mb-6">Register to create your account</p>

          {/* Register Form */}
          <form onSubmit={handleRegister} className="w-96 space-y-4">
            <div>
              <label className="block text-gray-700 font-medium mb-1">
                Name
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="First name and Last name"
                required
                className="w-full p-3 border border-gray-300 rounded-md"
              />
            </div>
            <div>
              <label className="block text-gray-700 font-medium mb-1">
                About You
              </label>
              <input
                type="text"
                value={about}
                onChange={(e) => setAbout(e.target.value)}
                placeholder="Tell us about you in 3 sentences"
                required
                className="w-full p-3 border border-gray-300 rounded-md"
              />
            </div>
            <div>
              <label className="block text-gray-700 font-medium mb-1">
                Email
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email"
                required
                className="w-full p-3 border border-gray-300 rounded-md"
              />
            </div>
            <div>
              <label className="block text-gray-700 font-medium mb-1">
                Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
                required
                className="w-full p-3 border border-gray-300 rounded-md"
              />
            </div>
            <div>
              <label className="block text-gray-700 font-medium mb-1">
                Confirm Password
              </label>
              <input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Confirm Password"
                required
                className="w-full p-3 border border-gray-300 rounded-md"
              />
            </div>
            <div className="flex justify-between pt-2">
              <div className="flex items-center space-x-3">
                <input type="checkbox" id="terms" className="w-5 h-5" />
                <p>I agree to the terms and conditions</p>
              </div>
            </div>
            {error && <p className="text-red-500 mt-4">{error}</p>}{" "}
            {/* Display error message */}
            <div className="flex flex-col justify-center items-center py-3">
              <button
                type="submit"
                className={`w-full py-3 ${
                  loading ? "bg-gray-400" : "bg-green-500"
                } text-white font-bold rounded-3xl text-xl`}
                disabled={loading} // Disable the button while loading
              >
                {loading ? "Registering..." : "Register"}
              </button>
            </div>
          </form>

          {/* Redirect to login page */}
          <div className="py-3">
            <label htmlFor="terms" className="text-gray-700">
              Already have an account?{" "}
              <a href="/login" className="text-blue-500 underline">
                Login
              </a>
            </label>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
