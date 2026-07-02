import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { loginUser } from "../../redux/userSlice";
import { Lock, Mail, ArrowLeft, Eye, EyeOff, Sparkles } from "lucide-react";

/* Inline SVG icons for social providers — avoids extra deps */
const GoogleIcon = () => (
  <svg viewBox="0 0 24 24" className="w-5 h-5">
    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.27-4.74 3.27-8.1z" fill="#4285F4"/>
    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
    <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18A10.96 10.96 0 0 0 1 12c0 1.77.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
  </svg>
);

const FacebookIcon = () => (
  <svg viewBox="0 0 24 24" className="w-5 h-5" fill="#1877F2">
    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
  </svg>
);

const AppleIcon = () => (
  <svg viewBox="0 0 24 24" className="w-5 h-5" fill="currentColor">
    <path d="M17.05 20.28c-.98.95-2.05.88-3.08.4-1.09-.5-2.08-.48-3.24 0-1.44.62-2.2.44-3.06-.4C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.24 2.31-.93 3.57-.84 1.51.12 2.65.72 3.4 1.8-3.12 1.87-2.38 5.98.48 7.13-.57 1.5-1.31 2.99-2.54 4.09zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z"/>
  </svg>
);

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [activeTab, setActiveTab] = useState("email"); // "email" or "phone"
  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState("");
  const [otpSent, setOtpSent] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulate API call delay
    await new Promise((r) => setTimeout(r, 800));

    if (activeTab === "email") {
      if (!email || !password) {
        alert("Please enter both email and password!");
        setIsLoading(false);
        return;
      }
      dispatch(loginUser({ name: email.split("@")[0].replace(/[._]/g, " ").replace(/\b\w/g, (c) => c.toUpperCase()), email }));
    } else {
      if (!phone || !otp) {
        alert("Please enter phone and OTP!");
        setIsLoading(false);
        return;
      }
      dispatch(loginUser({ name: "User", email: `${phone}@phone.fashionstore.com`, phone }));
    }

    setIsLoading(false);
    navigate("/");
  };

  const handleSocialLogin = (provider) => {
    dispatch(
      loginUser({
        name: provider === "google" ? "Google User" : provider === "facebook" ? "Facebook User" : "Apple User",
        email: `user@${provider}.com`,
        avatar: provider,
      })
    );
    navigate("/");
  };

  const handleSendOtp = () => {
    if (phone.length < 10) {
      alert("Please enter a valid 10-digit phone number");
      return;
    }
    setOtpSent(true);
  };

  return (
    <div className="min-h-screen flex">
      {/* LEFT - DECORATIVE PANEL (Desktop Only) */}
      <div className="hidden lg:flex lg:w-[45%] bg-gradient-to-br from-luxury via-primaryDark to-primary relative overflow-hidden items-center justify-center">
        {/* Floating blurred blobs */}
        <div className="absolute top-10 left-10 w-72 h-72 bg-gold/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-20 right-10 w-80 h-80 bg-primary/30 rounded-full blur-3xl" style={{ animation: "pulse 3s ease-in-out infinite reverse" }} />
        <div className="absolute top-1/2 left-1/4 w-40 h-40 bg-primaryLight/15 rounded-full blur-2xl" />

        <div className="relative z-10 text-center px-12 max-w-md">
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md rounded-full px-4 py-1.5 text-xs text-gold font-semibold tracking-widest uppercase mb-6 border border-white/10">
            <Sparkles size={14} /> Premium Fashion
          </div>
          <h1 className="font-elegant text-5xl font-bold text-white leading-tight">
            Welcome to<br />
            Fashion<span className="text-gold">Store</span>
          </h1>
          <p className="text-primaryLight/80 mt-4 text-sm leading-relaxed">
            Your destination for premium ethnic wear, handcrafted sarees, elegant kurtas, and designer collections. Sign in to explore exclusive member offers.
          </p>

          {/* Trust Badges */}
          <div className="flex items-center justify-center gap-6 mt-10">
            {[
              { num: "50K+", label: "Happy Customers" },
              { num: "10K+", label: "Products" },
              { num: "4.8★", label: "App Rating" },
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
              Sign in to your FashionStore luxury account
            </p>
          </div>

          {/* SOCIAL LOGIN */}
          <div className="space-y-3">
            <button
              onClick={() => handleSocialLogin("google")}
              className="w-full flex items-center justify-center gap-3 bg-white border border-gray-200 rounded-xl py-3 px-4 text-sm font-semibold text-gray-700 hover:bg-gray-50 hover:border-gray-300 hover:shadow-md transition-all duration-200 group">
              <GoogleIcon />
              <span>Continue with Google</span>
            </button>

            <div className="grid grid-cols-2 gap-3">
              <button
                onClick={() => handleSocialLogin("facebook")}
                className="flex items-center justify-center gap-2 bg-white border border-gray-200 rounded-xl py-3 px-4 text-sm font-semibold text-gray-700 hover:bg-gray-50 hover:border-gray-300 hover:shadow-md transition-all duration-200">
                <FacebookIcon />
                <span className="hidden sm:inline">Facebook</span>
              </button>
              <button
                onClick={() => handleSocialLogin("apple")}
                className="flex items-center justify-center gap-2 bg-white border border-gray-200 rounded-xl py-3 px-4 text-sm font-semibold text-gray-700 hover:bg-gray-50 hover:border-gray-300 hover:shadow-md transition-all duration-200">
                <AppleIcon />
                <span className="hidden sm:inline">Apple</span>
              </button>
            </div>
          </div>

          {/* DIVIDER */}
          <div className="relative my-7">
            <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-gray-200" /></div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-gray-50 px-4 text-gray-400 tracking-widest text-[10px] font-semibold">
                Or sign in with
              </span>
            </div>
          </div>

          {/* TAB SELECTOR: Email / Phone */}
          <div className="flex bg-gray-100 rounded-xl p-1 mb-6">
            {[
              { id: "email", label: "Email" },
              { id: "phone", label: "Phone OTP" },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => { setActiveTab(tab.id); setOtpSent(false); }}
                className={`flex-1 py-2 rounded-lg text-xs font-semibold transition-all duration-200 ${
                  activeTab === tab.id
                    ? "bg-white text-gray-900 shadow-sm"
                    : "text-gray-400 hover:text-gray-600"
                }`}>
                {tab.label}
              </button>
            ))}
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            {activeTab === "email" ? (
              <>
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
                    <button type="button" className="text-primary hover:text-primaryDark text-xs font-semibold transition">
                      Forgot password?
                    </button>
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
              </>
            ) : (
              <>
                {/* PHONE */}
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-semibold text-gray-600">Phone Number</label>
                  <div className="relative flex items-center">
                    <span className="absolute left-3.5 text-gray-500 text-sm font-semibold">+91</span>
                    <input
                      type="tel"
                      required
                      maxLength={10}
                      value={phone}
                      onChange={(e) => setPhone(e.target.value.replace(/\D/g, ""))}
                      placeholder="Enter 10-digit number"
                      className="w-full border border-gray-200 rounded-xl pl-12 pr-4 py-3 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/10 transition-all bg-white"
                    />
                  </div>
                </div>

                {!otpSent ? (
                  <button
                    type="button"
                    onClick={handleSendOtp}
                    className="w-full bg-luxury text-white py-3 rounded-xl font-semibold text-xs uppercase tracking-wide hover:bg-black transition-all">
                    Send OTP
                  </button>
                ) : (
                  <div className="flex flex-col gap-1.5">
                    <div className="flex items-center justify-between">
                      <label className="text-xs font-semibold text-gray-600">Enter OTP</label>
                      <button type="button" onClick={handleSendOtp} className="text-primary text-xs font-semibold">Resend</button>
                    </div>
                    <div className="flex gap-2">
                      {[0, 1, 2, 3].map((i) => (
                        <input
                          key={i}
                          type="text"
                          maxLength={1}
                          value={otp[i] || ""}
                          onChange={(e) => {
                            const val = e.target.value.replace(/\D/g, "");
                            const newOtp = otp.split("");
                            newOtp[i] = val;
                            setOtp(newOtp.join(""));
                            if (val && e.target.nextElementSibling) e.target.nextElementSibling.focus();
                          }}
                          className="w-full aspect-square max-w-[56px] border border-gray-200 rounded-xl text-center text-lg font-bold outline-none focus:border-primary focus:ring-2 focus:ring-primary/10 transition-all bg-white"
                        />
                      ))}
                    </div>
                    <p className="text-[10px] text-green-600 font-semibold mt-0.5">✓ OTP sent to +91 {phone}</p>
                  </div>
                )}
              </>
            )}

            {/* SUBMIT */}
            <button
              type="submit"
              disabled={isLoading || (activeTab === "phone" && !otpSent)}
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
          <div className="mt-5 p-3.5 bg-gold/5 border border-gold/20 rounded-xl">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-[10px] text-gold font-bold uppercase tracking-widest">Demo Account</p>
                <p className="text-[11px] text-gray-500 mt-0.5">admin@fashionstore.com / password123</p>
              </div>
              <button
                onClick={() => {
                  setActiveTab("email");
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
