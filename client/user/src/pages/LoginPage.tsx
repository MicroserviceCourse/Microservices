import { useState } from 'react'
import { login } from '../service/api/Authenticate'
import { saveTokens } from '../util/auth'
import { useAlert } from '../components/alert-context/alert-context'
import { useNavigate } from 'react-router-dom'
import { FaFacebookF, FaGoogle } from 'react-icons/fa'
import { BASE_API } from '../constant/app'

const LoginPage = () => {
  const [remember, setRemember] = useState(false)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()
  const { showAlert } = useAlert()
  const handleSumbit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    try {
      const response = await login(email, password)
      if (response.data.role.includes('USER')) {
        saveTokens({
          accessToken: response.data.accessToken,
          refreshToken: response.data.refreshToken,
          accessTokenAt: response.data.accessTokenExpiryAt,
          refreshTokenAt: response.data.refreshTokenExpiryAt,
        })
        showAlert({
          title: 'Đăng nhập thành công!',
          type: 'success',
          autoClose: 3000,
        })
        navigate('/')
      }
    } catch (err) {
      showAlert({
        title: 'Bạn không có quyền truy cập hệ thống.',
        type: 'error',
        autoClose: 3000,
      })
    } finally {
      setLoading(false)
    }
  }
  const handleClick = (provider: 'google' | 'facebook') => {
    window.location.href = `${BASE_API}/oauth2/authorization/${provider}`
  }

  return (
    <div className="w-full">
      <section
        className="relative w-full h-[420px] bg-center bg-cover flex
        items-center justify-center bg-fixed "
        style={{
          backgroundImage:
            'url(https://bazaar.qodeinteractive.com/wp-content/uploads/2017/07/cart-title-background-img.jpg)',
        }}
      >
        <div className="absolute inset-0 bg-black/20" />
        <div className="relative z-10 flex items-center justify-center h-full">
          <h1 className="text-white text-3xl font-medium tracking-wide">
            Login to your account
          </h1>
        </div>
      </section>
      <section className="max-w-4xl mx-auto px-6 py-20">
        <div className="max-w-md mx-auto">
          <h2 className="text-3xl font-semibold mb-10 text-left">login</h2>
          <form onSubmit={handleSumbit} className="space-y-8 text-sm">
            <div>
              <label className="block mb-2 font-medium text-sm font-poppins">
                username or email address <span className="">*</span>
              </label>
              <input
                type="text"
                disabled={loading}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="relative w-full h-[50px] px-[20px] py-[15px] text-[13px]
                leading-[18px] text-[#949494] bg-white border border-[#e1e1e1]
                outline-none rounded-none appearance-none focus:border-[#e1e1e1]
                focus:bg-[#fafafa] focus:text-[#949494] transition disabled:bg-gray-100
                disabled:cursor-not-allowed
          "
              />
            </div>
            <div>
              <label className="block mb-2 font-medium">
                password <span className="">*</span>
              </label>
              <input
                type="password"
                disabled={loading}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="relative w-full h-[50px] px-[20px] py-[15px] text-[13px]
                leading-[18px] text-[#949494] bg-white border border-[#e1e1e1]
                outline-none rounded-none appearance-none focus:border-[#e1e1e1]
                focus:bg-[#fafafa] focus:text-[#949494] transition disabled:bg-gray-100
                disabled:cursor-not-allowed
          "
              />
            </div>
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={remember}
                onChange={() => setRemember(!remember)}
                className="accent-black"
              />
              <span>remember me</span>
            </div>
            <button
              type="submit"
              className="
          w-32 bg-black text-white py-3 text-sm uppercase
          hover:bg-gray-900 transition
        "
            >
              {loading ? (
                <>
                  <span className="flex items-center justify-center gap-2">
                    {/* Spinner */}
                    <svg
                      className="h-5 w-5 animate-spin text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      />
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                      />
                    </svg>

                    <span>Signing in...</span>
                  </span>
                </>
              ) : (
                'log in'
              )}
            </button>
            <div className="flex items-center gap-4">
              <div className="flex-1 h-px bg-gray-200"></div>
              <span className="text-gray-400 text-xs uppercase">or</span>
              <div className="flex-1 h-px bg-gray-200"></div>
            </div>
            <div className="flex gap-4">
              <button
               onClick={() => handleClick("facebook")}
                type="button"
                className="flex items-center justify-center gap-3 w-full h-[50px]
                border border-[#e1e1e1] text-sm hover:bg-[#f5f5f5] transition"
              >
                <FaFacebookF className="text-blue-600" />
                <span>Login with Facebook</span>
              </button>
              <button
                type="button"
                 onClick={() => handleClick("google")}
                className="flex items-center justify-center gap-3 w-full h-[50px]
               border border-[#e1e1e1] text-sm hover:bg-[#f5f5f5] transition"
              >
                <FaGoogle className="text-red-500" />
                <span>Login with Google</span>
              </button>
            </div>
            <div>
              <a
                href="/forgot-password"
                className="text-gray-500 hover:text-black transition"
              >
                lost your password?
              </a>
            </div>
          </form>
        </div>
      </section>
    </div>
  )
}
export default LoginPage
