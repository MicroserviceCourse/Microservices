import { useState } from 'react'
import { useAlert } from '../components/alert-context/alert-context'
import { register } from '../service/api/Authenticate'

const RegisterPage = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    birthday: '',
    gender: '',
  })
  const [errors, setErrors] = useState<{
    fullName?: string
    email?: string
    password?: string
    birthday?: string
    gender?: string
  }>({})
  const { showAlert } = useAlert()
  const validateField = (name: string, value: string) => {
    let error = ''

    switch (name) {
      case 'fullName':
        if (!value.trim()) error = 'Full name is required'
        break

      case 'email':
        if (!value.trim()) {
          error = 'Email is required'
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
          error = 'Invalid email format'
        }
        break

      case 'password':
        if (!value) error = 'Password is required'
        else if (value.length < 6)
          error = 'Password must be at least 6 characters'
        break

      case 'birthday':
        if (!value) error = 'Birthday is required'
        break

      case 'gender':
        if (!value) error = 'Gender is required'
        break
    }

    setErrors((prev) => ({
      ...prev,
      [name]: error,
    }))
  }
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))

    validateField(name, value)
  }
  const [saving, setSaving] = useState(false)
  const handleSumbit = async (e: React.FormEvent<HTMLFormElement>) => {
    setSaving(true)
    try {
      const payload = {
        fullName: formData.fullName,
        email: formData.email,
        password: formData.password,
        birthday: formData.birthday,
        gender: formData.gender,
        roleIds: [4],
      }
      await register(payload)
      showAlert({
        title: 'Đăng ký thành công!',
        type: 'success',
        autoClose: 3000,
      })
      setFormData({
        fullName: '',
        email: '',
        password: '',
        birthday: '',
        gender: '',
      })
    } catch (err: any) {
      showAlert({
        title: 'Đăng ký thất bại. Vui lòng thử lại.',
        type: 'error',
        autoClose: 3000,
      })
    } finally {
      setSaving(false)
    }
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
            Register to your account
          </h1>
        </div>
      </section>
      <section className="max-w-4xl mx-auto px-6 py-20">
        <div className="max-w-md mx-auto">
          <h2 className="text-3xl font-semibold mb-10 text-left">Register</h2>
          <form onSubmit={handleSumbit} className="space-y-8 text-sm">
            <div>
              <label className="block mb-2 font-medium text-sm font-poppins">
                FullName <span className="">*</span>
              </label>
              <input
                type="text"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                placeholder="Enter FullName"
                className="relative w-full h-[50px] px-[20px] py-[15px] text-[13px]
                leading-[18px] text-[#949494] bg-white border border-[#e1e1e1]
                outline-none rounded-none appearance-none focus:border-[#e1e1e1]
                focus:bg-[#fafafa] focus:text-[#949494] transition disabled:bg-gray-100
                disabled:cursor-not-allowed"
              />
              {errors.fullName && (
                <p className="text-red-500 text-xs mt-1">{errors.fullName}</p>
              )}
            </div>
            <div>
              <label className="block mb-2 font-medium text-sm font-poppins">
                Email <span className="">*</span>
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter Email"
                className="relative w-full h-[50px] px-[20px] py-[15px] text-[13px]
                leading-[18px] text-[#949494] bg-white border border-[#e1e1e1]
                outline-none rounded-none appearance-none focus:border-[#e1e1e1]
                focus:bg-[#fafafa] focus:text-[#949494] transition disabled:bg-gray-100
                disabled:cursor-not-allowed"
              />
              {errors.email && (
                <p className="text-red-500 text-xs mt-1">{errors.email}</p>
              )}
            </div>
            <div>
              <label className="block mb-2 font-medium text-sm font-poppins">
                Password <span>*</span>
              </label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Enter Password"
                className="relative w-full h-[50px] px-[20px] py-[15px] text-[13px]
                leading-[18px] text-[#949494] bg-white border border-[#e1e1e1]
                outline-none rounded-none appearance-none focus:border-[#e1e1e1]
                focus:bg-[#fafafa] focus:text-[#949494] transition disabled:bg-gray-100
                disabled:cursor-not-allowed"
              />
              {errors.password && (
                <p className="text-red-500 text-xs mt-1">{errors.password}</p>
              )}
            </div>
            <div>
              <label className="block mb-2 font-medium text-sm font-poppins">
                Birthday <span>*</span>
              </label>
              <input
                type="date"
                name="birthday"
                value={formData.birthday}
                onChange={handleChange}
                placeholder="Enter Birthday"
                className="relative w-full h-[50px] px-[20px] py-[15px] text-[13px]
                text-[#949494] bg-white border border-[#e1e1e1]
                outline-none appearance-none focus:bg-[#fafafa]"
              />
              {errors.birthday && (
                <p className="text-red-500 text-xs mt-1">{errors.birthday}</p>
              )}
            </div>
            <div>
              <label className="block mb-2 font-medium text-sm font-poppins">
                Gender <span>*</span>
              </label>
              <select
                name="gender"
                value={formData.gender}
                onChange={handleChange}
                className="relative w-full h-[50px] px-[20px] text-[13px]
                text-[#949494] bg-white border border-[#e1e1e1]
                outline-none appearance-none focus:bg-[#fafafa]"
              >
                <option value="">Select gender</option>
                <option value="1">Male</option>
                <option value="2">Female</option>
              </select>
              {errors.gender && (
                <p className="text-red-500 text-xs mt-1">{errors.gender}</p>
              )}
            </div>
            <button
              type="submit"
              className="
          w-32 bg-black text-white py-3 text-sm uppercase
          hover:bg-gray-900 transition
        "
            >
              {saving ? (
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

                    <span>Registering...</span>
                  </span>
                </>
              ) : (
                'register'
              )}
            </button>
          </form>
        </div>
      </section>
    </div>
  )
}
export default RegisterPage
