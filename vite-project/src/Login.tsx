// src/Login.tsx

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";  // Import useNavigate
import { auth } from "./firebase";  // Firebase auth
import { signInWithEmailAndPassword } from "firebase/auth";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);

  const navigate = useNavigate();  // Initialize navigate

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      console.log("Logged in as:", user.email);

      // Navigate to the home page after successful login
      navigate("/home");  // Redirect to home after login
    } catch (error: unknown) {
      if (error instanceof Error) {
        setError(error.message);
      } else {
        setError("An unknown error occurred");
      }
    }
  };

  return (
    <div className="h-screen flex flex-col justify-center items-center bg-gray-800 text-white">
      <h1 className="text-3xl font-bold mb-4">Login to Your Account</h1>
      <form onSubmit={handleLogin} className="w-80 space-y-4">
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          required
          className="w-full p-3 rounded-md bg-gray-700 text-white"
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          required
          className="w-full p-3 rounded-md bg-gray-700 text-white"
        />
        <button type="submit" className="w-full py-2 bg-blue-500 text-white rounded-md">
          Login
        </button>
      </form>
      {error && <p className="text-red-500 mt-4">{error}</p>}
    </div>
  );
};

export default Login;
