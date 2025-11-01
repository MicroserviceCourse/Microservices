import { useState } from "react";
import { FaFacebook } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { FiEye, FiEyeOff } from "react-icons/fi";

const RegisterPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  return (
    <div className="flex items-center justify-center min-h-screen bg-[#f2f7fb]">
      <div className="bg-white  rounded-2xl p-8 w-full max-w-md">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          Create your account
        </h2>
        <p className="text-gray-500 mb-6 text-sm">
          Enter your personal details to create account
        </p>

        <form className="space-y-5">
          {/* Username */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Your username *
            </label>
            <div className="grid grid-cols-2 gap-3">
              <input
                type="text"
                placeholder="First name"
                className="w-full border border-[#ecf0f4] rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <input
                type="text"
                placeholder="Last name"
                className="w-full border border-[#ecf0f4] rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email address *
            </label>
            <input
              type="email"
              placeholder="Enter your email address"
              className="w-full border border-[#ecf0f4] rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Password */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Password *
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Enter your password"
                className="w-full border  border-[#ecf0f4] rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-2.5 text-gray-500"
              >
                {showPassword ? <FiEyeOff /> : <FiEye />}
              </button>
            </div>
          </div>

          {/* Confirm password */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Confirm password *
            </label>
            <div className="relative">
              <input
                type={showConfirmPassword ? "text" : "password"}
                placeholder="Enter your password"
                className="w-full border border-[#ecf0f4] rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button
                type="button"
                onClick={() =>
                  setShowConfirmPassword(!showConfirmPassword)
                }
                className="absolute right-3 top-2.5 text-gray-500"
              >
                {showConfirmPassword ? <FiEyeOff /> : <FiEye />}
              </button>
            </div>
          </div>

          {/* Agree policy */}
          <label className="flex items-center space-x-2 text-sm text-gray-600">
            <input type="checkbox" className="w-4 h-4 border-gray-300 rounded" />
            <span>
              Agree with <a href="#" className="text-blue-600 hover:underline">Privacy Policy</a>
            </span>
          </label>

          {/* Register button */}
          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg font-semibold transition"
          >
            Register
          </button>

          <div className="text-center text-sm text-gray-500 my-3">
            Or continue with social account
          </div>

          {/* Social login */}
          <div className="flex justify-center space-x-3">
            <button className="flex items-center justify-center w-1/2 border border-[#ecf0f4] py-3 rounded-lg hover:bg-gray-50 transition">
              <FcGoogle className="mr-2" /> Sign in with Google
            </button>
            <button className="flex items-center justify-center w-1/2 border border-[#ecf0f4] py-3 rounded-lg hover:bg-gray-50 transition">
              <FaFacebook className="text-blue-600 mr-2" /> Sign in with Facebook
            </button>
          </div>
        </form>

        <p className="text-center text-gray-600 text-sm mt-6">
          Already have an account?{" "}
          <a href="/" className="text-blue-600 hover:underline font-medium">
            Login Now
          </a>
        </p>
      </div>
    </div>
  );
};

export default RegisterPage;
