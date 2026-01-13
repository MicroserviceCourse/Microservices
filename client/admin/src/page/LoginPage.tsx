import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import type { AlertType } from "../types/alert.type";
import { login } from "../service/api/Authenticate";
import { saveTokens } from "../util/auth";
import AlertModal from "../components/alert-modal/AlertModal";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [success, setSuccess] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const isFilled = email.trim() !== "" && password.trim() !== "";
  const navigate = useNavigate();
  const [modalCfg, setModalCfg] = useState<{
    type: AlertType;
    title: string;
    description?: string;
  } | null>(null);
  const handleLogin = async () => {
    if (!isFilled) {
      setError("Vui lòng nhập đầy đủ email và mật khẩu!");
      return;
    }
    try {
      const response = await login(email, password);
      if (response.data.role.includes("ADMIN")) {
        setSuccess("Đăng nhập thành công!");
        saveTokens({
          accessToken: response.data.accessToken,
          refreshToken: response.data.refreshToken,
          accessTokenAt: response.data.accessTokenExpiryAt,
          refreshTokenAt: response.data.refreshTokenExpiryAt,
        });
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
      navigate("/");
    }
  };
  return (
   <>
    <div className="min-h-screen grid grid-cols-1 lg:grid-cols-2 bg-[#f9f7f7]">
      {/* LEFT: LOGIN FORM */}
      <div className="flex items-center justify-center px-6">
        <div className="w-full max-w-md">
          {/* Logo */}
          <div className="flex items-start gap-2 ">
            <img
              src="https://techzaa.in/larkon/admin/assets/images/logo-dark.png"
              alt="Larkon Logo"
              className="h-30 w-30 object-contain"
            />
          </div>

          {/* Title */}
          <h2 className="text-2xl font-semibold text-gray-800 mb-2">Sign In</h2>
          <p className="text-sm text-gray-500 mb-8">
            Enter your email address and password to access admin panel.
          </p>

          {/* Email */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              className="block w-full px-4 py-2 text-sm font-normal leading-6
              text-gray-700 bg-white border border-gray-300 rounded-md
              outline-none transition focus:border-blue-500 focus:ring-1 focus:ring-blue-400"
            />
          </div>

          {/* Password */}
          <div className="mb-2">
            <div className="flex items-center justify-between mb-1">
              <label className="text-sm font-medium text-gray-700">Password</label>
              <button className="text-sm text-[#5d7186] ">Reset password</button>
            </div>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              className="block w-full px-4 py-2 text-sm font-normal leading-6 text-gray-700
              bg-white border border-gray-300 rounded-md outline-none transition focus:border-blue-500 
              focus:ring-1 focus:ring-blue-400"
            />
          </div>

          {/* Remember */}
          <div className="flex items-center gap-2 my-4">
            <input type="checkbox" className="rounded border-gray-300" />
            <span className="text-sm text-gray-600">Remember me</span>
          </div>

          {/* Sign in */}
          <button
            onClick={handleLogin}
            className="w-full rounded-xl bg-orange-100 text-orange-500 py-3 text-sm font-medium mb-6"
          >
            Sign In
          </button>

          {/* Divider */}
          <div className="flex items-center gap-3 text-sm text-gray-400 mb-6">
            <div className="flex-1 h-px bg-gray-200" />
            OR sign with
            <div className="flex-1 h-px bg-gray-200" />
          </div>

          {/* Social */}
          <div className="space-y-3">
            <button className="w-full flex items-center justify-center gap-2 rounded-xl bg-[#eef2f7] py-3 text-sm">
              <span className="font-semibold">G</span>
              Sign in with Google
            </button>
            <button className="w-full flex items-center justify-center gap-2 rounded-xl bg-orange-100 py-3 text-sm text-orange-500">
              <span className="font-semibold">f</span>
              Sign in with Facebook
            </button>
          </div>

          {/* Sign up */}
          <p className="text-sm text-center text-gray-500 mt-8">
            Don&apos;t have an account?{" "}
            <span className="text-blue-600 cursor-pointer hover:underline">Sign Up</span>
          </p>
        </div>
      </div>

      {/* RIGHT: IMAGE */}
      <div className="hidden lg:block relative">
        <img
          src="https://techzaa.in/larkon/admin/assets/images/small/img-10.jpg"
          className="absolute inset-0 w-full h-full object-cover rounded-l-3xl"
        />
      </div>
      
    </div>
    <AlertModal
        open={modalOpen}
        onOpenChange={handleModalOpenChange}
        type={modalCfg?.type ?? "info"}
        title={modalCfg?.title ?? ""}
        description={modalCfg?.description}
        closeable
        autoClose={modalCfg?.type === "success" ? 1600 : undefined}
        primaryAction={{
          label: "OK",
          autoFocus: true,
        }}
      />
   </>
  );
};

export default LoginPage;
