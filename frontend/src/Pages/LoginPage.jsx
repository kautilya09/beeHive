import { useState } from "react";
import { Eye, EyeOff, Users } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";

export const LoginPage = () => {
    const navigate = useNavigate();
    localStorage.setItem("isAuthenticated", "true");
    navigate("/dashboard");
    const [showPassword, setShowPassword] = useState(false);
    const [formData, setFormData] = useState({
    email: "",
    password: "",
    remember: false,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = (e) => {
  e.preventDefault();

  // Simulate successful login
  localStorage.setItem("isAuthenticated", "true");

  // Redirect to dashboard
  navigate("/dashboard", { replace: true });
};

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-100 via-white to-indigo-200 px-4">
      <div className="w-full max-w-5xl bg-white shadow-xl rounded-2xl overflow-hidden grid md:grid-cols-2">
        
        {/* Left Section - Branding */}
        <div className="hidden md:flex flex-col justify-center items-center bg-indigo-600 text-white p-10">
          <Users size={60} className="mb-4" />
          <h1 className="text-4xl font-bold mb-2">Collabrix</h1>
          <p className="text-center text-indigo-100">
            Collaborate. Organize. Achieve.
          </p>
        </div>

        {/* Right Section - Login Form */}
        <div className="p-8 md:p-12">
          <h2 className="text-3xl font-bold text-gray-800 mb-2">
            Welcome Back 👋
          </h2>
          <p className="text-gray-500 mb-6">
            Please login to your account
          </p>

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Email Address
              </label>
              <input
                type="email"
                name="email"
                placeholder="you@example.com"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none"
              />
            </div>

            {/* Password */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  placeholder="Enter your password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none pr-10"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-2.5 text-gray-500"
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
            </div>

            {/* Remember Me & Forgot Password */}
            <div className="flex items-center justify-between text-sm">
              <label className="flex items-center gap-2 text-gray-600">
                <input
                  type="checkbox"
                  name="remember"
                  checked={formData.remember}
                  onChange={handleChange}
                  className="accent-indigo-600"
                />
                Remember me
              </label>
              <Link
                to="/forgot-password"
                className="text-indigo-600 hover:underline"
              >
                Forgot Password?
              </Link>
            </div>

            {/* Login Button */}
            <button
              type="submit"
              className="w-full bg-indigo-600 text-white py-2 rounded-lg font-semibold hover:bg-indigo-700 transition duration-200"
            >
              Login
            </button>

            {/* Divider */}
            <div className="flex items-center gap-3">
              <hr className="flex-grow border-gray-300" />
              <span className="text-gray-400 text-sm">OR</span>
              <hr className="flex-grow border-gray-300" />
            </div>

            {/* Sign Up Redirect */}
            <p className="text-center text-sm text-gray-600">
              Don’t have an account?{" "}
              <Link
                to="/signup"
                className="text-indigo-600 font-medium hover:underline"
              >
                Sign up
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};