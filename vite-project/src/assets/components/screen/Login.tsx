import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import useUser from "../hooks/useUser";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const { user, login } = useUser();
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await login(email, password);
      if (user) {
        navigate("/home");
      }
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("An unknown error occurred");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="h-screen w-screen flex flex-col md:flex-row">
      {/* Background Section - Hidden on mobile screens */}
      <div className="hidden md:flex w-2/3 bg-gradient-to-r from-green-900 to-green-400 flex-col justify-center items-center text-white">
        <h1 className="text-4xl font-bold py-3">
          "Capture Moments, Keep Memories."
        </h1>
      </div>

      {/* Login Section - Full height on mobile, right-aligned on larger screens */}
      <div className="w-full md:w-1/3 flex flex-col justify-center items-center bg-gray-100 md:bg-transparent pt-10 md:pt-0">
        <div className="bg-white shadow-lg rounded-lg p-6 md:p-8 w-full max-w-md flex flex-col justify-center items-center h-full md:h-auto">
          <h1 className="text-4xl font-bold mb-1">KivaPix</h1>
          <p className="text-gray-500 mb-6">
            Login to your account to continue
          </p>

          {/* Login Form */}
          <form onSubmit={handleLogin} className="w-full space-y-4">
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
            <div className="flex justify-between pt-2">
              <div className="flex items-center space-x-3">
                <input type="checkbox" id="terms" className="w-5 h-5" />
                <p>Remember me</p>
              </div>
              <div>
                <a href="#" className="text-blue-500 items-end">
                  Forgot password?
                </a>
              </div>
            </div>
            {error && <p className="text-red-500 mt-4">{error}</p>}
            <div className="flex flex-col justify-center items-center py-3">
              <button
                type="submit"
                className={`w-full py-3 ${
                  loading ? "bg-gray-400" : "bg-green-500"
                } text-white font-bold rounded-3xl text-xl`}
                disabled={loading}
              >
                {loading ? "Logging in..." : "Login"}
              </button>
            </div>
          </form>

          {/* Redirect to registration page */}
          <div className="py-3">
            <label htmlFor="terms" className="text-gray-700">
              Don't have an account?{" "}
              <a href="/register" className="text-blue-500 underline">
                Create account
              </a>
            </label>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
