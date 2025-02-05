import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import { auth } from "../../../firebase"; // Firebase auth
import { createUserWithEmailAndPassword } from "firebase/auth";
import { Link } from "react-router-dom";

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState<string | null>(null);

  const navigate = useNavigate(); // Initialize navigate

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      console.log("Registered as:", user.email);

      // Navigate to login page after successful registration
      navigate("/login"); // Redirect to login after register
    } catch (error: unknown) {
      if (error instanceof Error) {
        setError(error.message);
      } else {
        setError("An unknown error occurred");
      }
    }
  };

  return (
    <div className="h-screen w-screen flex bg-gradient-to-r from-green-900 to-green-400">
      {/* Left Section */}
      <div className="w-2/3 flex flex-col justify-center items-center text-white">
        <h1 className="text-4xl font-bold mb-1">Welcome to KivaPix</h1>
      </div>

      {/* Right Section */}
      <div className="w-1/3 flex justify-center items-center bg-gray-100">
        <div className="bg-white shadow-lg rounded-lg p-8 flex flex-col justify-center items-center">
          <h1 className="text-4xl font-bold mb-1">Register</h1>
          <p className="text-gray-500 mb-6">Create your account to get started</p>
          <form onSubmit={handleRegister} className="w-96 space-y-4">
            <div>
              <label className="block text-gray-700 font-medium mb-1">Email</label>
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
              <label className="block text-gray-700 font-medium mb-1">Password</label>
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
              <label className="block text-gray-700 font-medium mb-1">Confirm Password</label>
              <input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Confirm Password"
                required
                className="w-full p-3 border border-gray-300 rounded-md"
              />
            </div>
            <div className="flex flex-col justify-center items-center py-3">
              <button
                type="submit"
                className="w-full py-3 bg-green-500 text-white font-bold rounded-3xl text-xl">
                Register
              </button>
              <div className="py-3">
                <label htmlFor="terms" className="text-gray-700">
                  Already have an account?{" "}
                  <Link to="/login" className="text-blue-500 underline">
                    Login
                </Link>
                </label>
              </div>
            </div>
          </form>
          {error && <p className="text-red-500 mt-4">{error}</p>}
        </div>
      </div>
    </div>
  );
};

export default Register;
