// src/Login.tsx

import React,  { useState } from "react";
import { useNavigate } from "react-router-dom";  
import { auth } from "./firebase"; 
import { signInWithEmailAndPassword } from "firebase/auth";
import { Link } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);

  const navigate = useNavigate(); 

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      console.log("Logged in as:", user.email);
      navigate("/home");  
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
    <h1 className="text-4xl font-bold py-3">"Capture Moments, Keep Memories."</h1>
  </div>

  {/* Right Section */}
  <div className="w-1/3 flex justify-center items-center bg-gray-100">
    <div className="bg-white shadow-lg rounded-lg p-8 flex flex-col justify-center items-center">
      <h1 className="text-4xl font-bold mb-1">KivaPix</h1>
      <p className="text-gray-500 mb-6">Login in to your account to continue</p>
      <form onSubmit={handleLogin} className="w-96 space-y-4">
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
        <div className="flex justify-between pt-2">
          <div className="flex items-center space-x-3">
            <input type="checkbox" id="terms" className="w-5 h-5" />
            <p >Remember me</p>
          </div>
          <div>
            <a href="#" className="text-blue-500 items-end">Forgot password?</a>
          </div>
        </div>
        <div className="flex flex-col justify-center items-center py-3">
          <button
            type="submit"
            className="w-full py-3 bg-green-500 text-white font-bold rounded-3xl text-xl">
            Login
          </button>
          <div className="py-3">
            <label htmlFor="terms" className="text-gray-700">
              Don't have an account?{" "}
              <Link to="/register" className="text-blue-500 underline">
                Create account
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

export default Login;
