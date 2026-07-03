import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { loginUser } from "../../redux/userSlice";
import { loginUserApi } from "../../api/authApi";
import { Lock, Mail, ArrowLeft, Eye, EyeOff, Sparkles, AlertCircle } from "lucide-react";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    if (!email || !password) {
      setError("Please enter both email and password!");
      setIsLoading(false);
      return;
    }

    try {
      const response = await loginUserApi({ email, password });
      if (response.data.success) {
        dispatch(
          loginUser({
            user: response.data.user,
            token: response.data.token,
          })
        );
        navigate("/");
      } else {
        setError(response.data.message || "Login failed");
      }
    } catch (err) {
      console.error(err);
      setError(
        err.response?.data?.message || "Invalid email or password. Please try again."
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex">
      {/* LEFT - DECORATIVE PANEL (Desktop Only) */}
      <div className="hidden lg:flex lg:w-[45%] bg-gradient-to-br from-luxury via-primaryDark to-primary relative overflow-hidden items-center justify-center">
        {/* Floating blurred blobs */}
        <div className="absolute top-10 left-10 w-72 h-72 bg-gold/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-20 right-10 w-80 h-80 bg-primary/30 rounded-full blur-3xl" style={{ animation: "pulse 3s ease-in-out infinite reverse" }} />

        <div className="relative z-10 text-center px-12 max-w-md">
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md rounded-full px-4 py-1.5 text-xs text-gold font-semibold tracking-widest uppercase mb-6 border border-white/10">
            <Sparkles size={14} /> Traditional Wear
          </div>
          <h1 className="font-elegant text-5xl font-bold text-white leading-tight">
            Welcome to<br />
            Fashion<span className="text-gold">Store</span>
          </h1>
          <p className="text-primaryLight/80 mt-4 text-sm leading-relaxed">
            Your destination for premium ethnic kurtis, traditional salwar suits, and handcrafted designer sarees.
          </p>

          {/* Trust Badges */}
          <div className="flex items-center justify-center gap-6 mt-10">
            {[
              { num: "50K+", label: "Happy Customers" },
              { num: "5K+", label: "Kurtis & Sarees" },
              { num: "4.8★", label: "Store Rating" },
            ].map((badge) => (
              <div key={badge.label} className="text-center">
                <p className="text-gold font-elegant text-2xl font-bold">{badge.num}</p>
                <p className="text-primaryLight/60 text-[10px] uppercase tracking-wider mt-0.5">{badge.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* RIGHT - LOGIN FORM */}
      <div className="flex-1 bg-gray-50 flex flex-col justify-center py-8 px-4 sm:px-8 lg:px-16 xl:px-24">
        <div className="max-w-md w-full mx-auto">
          {/* BACK LINK */}
          <Link to="/" className="text-primary hover:text-primaryDark transition flex items-center gap-1.5 text-sm font-semibold mb-8 group">
            <ArrowLeft size={16} className="group-hover:-translate-x-0.5 transition-transform" /> Back to store
          </Link>

          {/* HEADING */}
          <div className="mb-8">
            <h2 className="font-elegant text-3xl font-bold text-gray-900">
              Welcome Back
            </h2>
            <p className="text-gray-400 text-sm mt-1">
              Sign in to your FashionStore account
            </p>
          </div>

          {/* ERROR DISPLAY */}
          {error && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl flex items-start gap-3 text-red-700 text-sm">
              <AlertCircle size={18} className="flex-shrink-0 mt-0.5" />
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-4">
            {/* EMAIL */}
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-semibold text-gray-600">Email Address</label>
              <div className="relative flex items-center">
                <Mail size={16} className="text-gray-400 absolute left-3.5" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  className="w-full border border-gray-200 rounded-xl pl-10 pr-4 py-3 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/10 transition-all bg-white"
                />
              </div>
            </div>

            {/* PASSWORD */}
            <div className="flex flex-col gap-1.5">
              <div className="flex items-center justify-between">
                <label className="text-xs font-semibold text-gray-600">Password</label>
                <a href="#" className="text-primary hover:underline text-xs font-semibold transition">
                  Forgot password?
                </a>
              </div>
              <div className="relative flex items-center">
                <Lock size={16} className="text-gray-400 absolute left-3.5" />
                <input
                  type={showPassword ? "text" : "password"}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  className="w-full border border-gray-200 rounded-xl pl-10 pr-12 py-3 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/10 transition-all bg-white"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 text-gray-400 hover:text-gray-600 transition">
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            {/* REMEMBER ME */}
            <div className="flex items-center gap-2 text-xs">
              <input type="checkbox" id="remember" className="accent-primary rounded w-3.5 h-3.5" />
              <label htmlFor="remember" className="text-gray-500 cursor-pointer select-none">Keep me signed in</label>
            </div>

            {/* SUBMIT */}
            <button
              type="submit"
              disabled={isLoading}
              className={`w-full mt-2 py-3.5 rounded-xl font-semibold tracking-wide uppercase text-xs shadow-lg transition-all duration-300 flex items-center justify-center gap-2 ${
                isLoading
                  ? "bg-gray-300 text-gray-500 cursor-wait"
                  : "bg-gradient-to-r from-primary to-primaryDark text-white hover:shadow-xl hover:scale-[1.01] active:scale-[0.99]"
              }`}>
              {isLoading ? (
                <>
                  <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Signing in...
                </>
              ) : (
                "Sign In"
              )}
            </button>
          </form>

          {/* DEMO ACCOUNT */}
          <div className="mt-6 p-4 bg-gold/5 border border-gold/20 rounded-xl">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-[10px] text-gold font-bold uppercase tracking-widest">Demo Account</p>
                <p className="text-[11px] text-gray-500 mt-0.5">admin@fashionstore.com / password123</p>
              </div>
              <button
                onClick={() => {
                  setEmail("admin@fashionstore.com");
                  setPassword("password123");
                }}
                className="bg-gold/10 text-gold px-3 py-1.5 rounded-lg text-[10px] font-bold uppercase tracking-wide hover:bg-gold/20 transition">
                Auto-Fill
              </button>
            </div>
          </div>

          {/* FOOTER */}
          <p className="text-center text-sm text-gray-500 mt-8">
            New to FashionStore?{" "}
            <Link to="/register" className="text-primary hover:text-primaryDark font-bold transition">
              Create Account
            </Link>
          </p>

          <p className="text-center text-[10px] text-gray-300 mt-4">
            By continuing, you agree to our Terms of Service & Privacy Policy
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;