import { useState } from "react";
import { FaFacebook } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { FiEye, FiEyeOff } from "react-icons/fi";

const LoginPage=()=>{
    const [showPassword, setShowPassword] = useState(false);

    return (
      <div className="flex items-center justify-center min-h-screen bg-[#f2f7fb]">
        <div className="bg-white  rounded-2xl p-8 w-full max-w-md">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Login to account</h2>
          <p className="text-gray-500 mb-6 text-sm">Enter your email & password to login</p>
  
          <form className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Email address *</label>
              <input
                type="email"
                placeholder="Enter your email address"
                className="w-full border border-[#ecf0f4] rounded-lg px-3 py-2 focus:outline-none  focus:ring-2 focus:ring-blue-500"
              />
            </div>
  
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Password *</label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  className="w-full border border-[#ecf0f4] rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
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
  
            <div className="flex items-center justify-between">
              <label className="flex items-center space-x-2 text-sm text-gray-600">
                <input type="checkbox" className="w-4 h-4 border-gray-300 rounded" />
                <span>Keep me signed in</span>
              </label>
              <a href="#" className="text-blue-600 text-sm hover:underline">
                Forgot password?
              </a>
            </div>
  
            <button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg font-semibold transition"
            >
              Login
            </button>
  
            <div className="text-center text-sm text-gray-500 my-3">
              Or continue with social account
            </div>
  
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
            You don’t have an account yet?{" "}
            <a href="#" className="text-blue-600 hover:underline font-medium">
              Register Now
            </a>
          </p>
        </div>
      </div>
    );
}
export default LoginPage;