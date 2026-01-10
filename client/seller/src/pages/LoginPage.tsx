import { useEffect, useState } from "react";
import { FiEye, FiEyeOff } from "react-icons/fi";
import { AlertModal, type AlertType } from "../components/AlertModal";
import { login } from "../service/api/Authenticate";
import { useNavigate } from "react-router-dom";
import { saveTokens } from "../util/auth";

const LoginPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [success, setSuccess] = useState<string | null>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const navigate = useNavigate();
  const [modalCfg, setModalCfg] = useState<{
    type: AlertType;
    title: string;
    description?: string;
  } | null>(null);
  const isFilled = email.trim() !== "" && password.trim() !== "";
  const [error, setError] = useState<string | null>(null);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isFilled) {
      setError("Vui lòng nhập đầy đủ email và mật khẩu!");
      return;
    }
    try {
      const response = await login(email, password);
      if (response.data.role.includes("SELLER") && response.data.shop.status === 1) {
        setSuccess("Đăng nhập thành công!");
        saveTokens({
          accessToken: response.data.accessToken,
          refreshToken: response.data.refreshToken,
          accessTokenAt: response.data.accessTokenExpiryAt,
          refreshTokenAt: response.data.refreshTokenExpiryAt,
        });
      } else {
        setError("Bạn không có quyền truy cập hệ thống.");
      }
    } catch (err) {
      console.log(err);
      setError("Đăng nhập thất bại. Vui lòng thử lại.");
    }
  };
  useEffect(() => {
    if (error) {
      setModalCfg({
        type: "error",
        title: "Lỗi",
        description: error,
      });
      setModalOpen(true);
    }
  }, [error]);

  useEffect(() => {
    if (success) {
      setModalCfg({
        type: "success",
        title: "Thành công",
        description: success,
      });
      setModalOpen(true);
    }
  }, [success]);
  const handleModalOpenChange = (open: boolean) => {
    setModalOpen(open);
    if (!open && modalCfg?.type === "success") {
      navigate("/Dashboard");
    }
  };
  return (
    <div className="w-full h-screen flex bg-white">
      {/* LEFT SIDE */}
      <div className="w-1/2 bg-gray-50 flex flex-col justify-center items-center px-16">
        <h1 className="text-3xl font-bold text-blue-900 mb-4 text-center">ShopPoint</h1>

        <p className="text-gray-600 text-lg text-center mb-8 leading-relaxed max-w-lg">
          Gain data-based insights, view progress at a glance, and manage your organization smarter
        </p>

        <img
          src="https://shop-point.merku.love/assets/login-33fdac8a.webp"
          alt="illustration"
          className="w-[90%] mx-auto"
        />
      </div>

      {/* RIGHT SIDE */}
      <div className="w-1/2 flex flex-col justify-center px-24">
        <h2 className="text-3xl font-bold text-[#00224F] mb-2">Welcome back!</h2>
        <p className="text-gray-500 mb-8">
          Etiam quis quam urna. Aliquam odio erat, accumsan eu nulla in
        </p>

        {/* FORM */}
        <form className="space-y-5" onSubmit={handleLogin}>
          {/* Email */}
          <div>
            <label className="block font-semibold text-sm text-gray-600 mb-2">E-mail</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Your E-mail address"
              className="w-full border border-gray-300 rounded-lg px-4 py-3 
focus:border-[#035ECF] focus:ring-1 focus:ring-[#035ECF] outline-none"
            />
          </div>

          {/* Password */}
          <div>
            <label className="block font-semibold text-sm text-gray-600 mb-2">Password</label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Your password"
                className="w-full border border-gray-300 rounded-lg px-4 py-3 pr-10 focus:ring-1 focus:ring-[#035ECF] outline-none"
              />

              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-3 text-gray-500"
              >
                {showPassword ? <FiEyeOff size={20} /> : <FiEye size={20} />}
              </button>
            </div>

            <a className="text-sm text-blue-600 mt-2 block cursor-pointer hover:underline">
              Forgot Password?
            </a>
          </div>

          {/* LOGIN BUTTON */}
          <button className="w-full bg-teal-500 hover:bg-teal-600 text-white py-3 rounded-full text-lg font-semibold transition-all">
            Log In
          </button>
        </form>

        {/* Sign Up */}
        <p className="text-center mt-6 text-gray-600">
          Don’t have an account?{" "}
          <a className="text-blue-600 font-semibold cursor-pointer hover:underline">Sign Up</a>
        </p>
      </div>
      <AlertModal
        open={modalOpen}
        onOpenChange={handleModalOpenChange}
        type={modalCfg?.type ?? "info"}
        title={modalCfg?.title ?? ""}
        description={modalCfg?.description}
        closable
        autoClose={modalCfg?.type === "success" ? 1600 : undefined}
        primaryAction={{
          label: "OK",
          autoFocus: true,
        }}
      />
    </div>
  );
};
export default LoginPage;
