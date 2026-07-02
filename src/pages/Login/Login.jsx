import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { loginUser } from "../../redux/userSlice";
import { Lock, Mail, ArrowLeft, Eye, EyeOff, Sparkles } from "lucide-react";
import {
  auth,
  googleProvider,
  signInWithPopup,
  RecaptchaVerifier,
  signInWithPhoneNumber,
  sendPasswordResetEmail,
} from "../../firebase";

const GoogleIcon = () => (
  <svg viewBox="0 0 24 24" className="w-5 h-5">
    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.27-4.74 3.27-8.1z" fill="#4285F4"/>
    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
    <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18A10.96 10.96 0 0 0 1 12c0 1.77.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
  </svg>
);

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [activeTab, setActiveTab] = useState("email");
  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [otpLoading, setOtpLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    await new Promise((r) => setTimeout(r, 800));

    if (!email || !password) {
      alert("Please enter both email and password!");
      setIsLoading(false);
      return;
    }
    dispatch(
      loginUser({
        name: email.split("@")[0].replace(/[._]/g, " ").replace(/\b\w/g, (c) => c.toUpperCase()),
        email,
      })
    );
    setIsLoading(false);
    navigate("/");
  };

  const handleGoogleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const user = result.user;
      dispatch(
        loginUser({
          name: user.displayName,
          email: user.email,
          avatar: user.photoURL,
        })
      );
      navigate("/");
    } catch (err) {
      console.error(err);
      alert("Google login failed. Try again.");
    }
  };
  const handleForgotPassword = async () => {
  if (!email) {
    alert("Please enter your email address first, then click 'Forgot password?'");
    return;
  }
  try {
    await sendPasswordResetEmail(auth, email);
    alert("Password reset link sent! Check your email inbox (and spam folder).");
  } catch (err) {
    console.error(err);
    if (err.code === "auth/user-not-found") {
      alert("No account found with this email.");
    } else {
      alert("Failed to send reset email. Try again.");
    }
  }
};


  const setupRecaptcha = () => {
    if (!window.recaptchaVerifier) {
      window.recaptchaVerifier = new RecaptchaVerifier(auth, "recaptcha-container", {
        size: "invisible",
      });
    }
  };

  const handleSendOtp = async () => {
    if (phone.length !== 10) {
      alert("Please enter a valid 10-digit phone number");
      return;
    }
    setOtpLoading(true);
    try {
      setupRecaptcha();
      const confirmation = await signInWithPhoneNumber(auth, "+91" + phone, window.recaptchaVerifier);
      window.confirmationResult = confirmation;
      setOtpSent(true);
    } catch (err) {
      console.error(err);
      alert("Failed to send OTP. Try again.");
    } finally {
      setOtpLoading(false);
    }
  };

  const handleVerifyOtp = async (e) => {
    e.preventDefault();
    if (otp.length !== 4 && otp.length !== 6) {
      alert("Enter the complete OTP");
      return;
    }
    setIsLoading(true);
    try {
      const result = await window.confirmationResult.confirm(otp);
      const user = result.user;
      dispatch(
        loginUser({
          name: "User",
          email: `${user.phoneNumber}@phone.fashionstore.com`,
          phone: user.phoneNumber,
        })
      );
      navigate("/");
    } catch (err) {
      console.error(err);
      alert("Invalid OTP. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex">
      <div id="recaptcha-container"></div>

      <div className="hidden lg:flex lg:w-[45%] bg-gradient-to-br from-luxury via-primaryDark to-primary relative overflow-hidden items-center justify-center">
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

      <div className="flex-1 bg-gray-50 flex flex-col justify-center py-8 px-4 sm:px-8 lg:px-16 xl:px-24">
        <div className="max-w-md w-full mx-auto">
          <Link to="/" className="text-primary hover:text-primaryDark transition flex items-center gap-1.5 text-sm font-semibold mb-8 group">
            <ArrowLeft size={16} className="group-hover:-translate-x-0.5 transition-transform" /> Back to store
          </Link>

          <div className="mb-8">
            <h2 className="font-elegant text-3xl font-bold text-gray-900">Welcome Back</h2>
            <p className="text-gray-400 text-sm mt-1">Sign in to your FashionStore luxury account</p>
          </div>

          <button
            onClick={handleGoogleLogin}
            className="w-full flex items-center justify-center gap-3 bg-white border border-gray-200 rounded-xl py-3 px-4 text-sm font-semibold text-gray-700 hover:bg-gray-50 hover:border-gray-300 hover:shadow-md transition-all duration-200">
            <GoogleIcon />
            <span>Continue with Google</span>
          </button>

          <div className="relative my-7">
            <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-gray-200" /></div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-gray-50 px-4 text-gray-400 tracking-widest text-[10px] font-semibold">Or sign in with</span>
            </div>
          </div>

          <div className="flex bg-gray-100 rounded-xl p-1 mb-6">
            {[
              { id: "email", label: "Email" },
              { id: "phone", label: "Phone OTP" },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => { setActiveTab(tab.id); setOtpSent(false); setOtp(""); }}
                className={`flex-1 py-2 rounded-lg text-xs font-semibold transition-all duration-200 ${
                  activeTab === tab.id ? "bg-white text-gray-900 shadow-sm" : "text-gray-400 hover:text-gray-600"
                }`}>
                {tab.label}
              </button>
            ))}
          </div>

          {activeTab === "email" ? (
            <form onSubmit={handleLogin} className="space-y-4">
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

              <div className="flex flex-col gap-1.5">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-semibold text-gray-600">Password</label>
                 <button type="button" onClick={handleForgotPassword} className="text-primary hover:text-primaryDark text-xs font-semibold transition">Forgot password?</button>
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
                  <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3.5 text-gray-400 hover:text-gray-600 transition">
                    {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
              </div>

              <div className="flex items-center gap-2 text-xs">
                <input type="checkbox" id="remember" className="accent-primary rounded w-3.5 h-3.5" />
                <label htmlFor="remember" className="text-gray-500 cursor-pointer select-none">Keep me signed in</label>
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className={`w-full mt-2 py-3.5 rounded-xl font-semibold tracking-wide uppercase text-xs shadow-lg transition-all duration-300 flex items-center justify-center gap-2 ${
                  isLoading ? "bg-gray-300 text-gray-500 cursor-wait" : "bg-gradient-to-r from-primary to-primaryDark text-white hover:shadow-xl hover:scale-[1.01] active:scale-[0.99]"
                }`}>
                {isLoading ? (
                  <>
                    <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    Signing in...
                  </>
                ) : "Sign In"}
              </button>
            </form>
          ) : (
            <form onSubmit={otpSent ? handleVerifyOtp : (e) => e.preventDefault()} className="space-y-4">
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-semibold text-gray-600">Phone Number</label>
                <div className="relative flex items-center">
                  <span className="absolute left-3.5 text-gray-500 text-sm font-semibold">+91</span>
                  <input
                    type="tel"
                    required
                    maxLength={10}
                    disabled={otpSent}
                    value={phone}
                    onChange={(e) => setPhone(e.target.value.replace(/\D/g, ""))}
                    placeholder="Enter 10-digit number"
                    className="w-full border border-gray-200 rounded-xl pl-12 pr-4 py-3 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/10 transition-all bg-white disabled:bg-gray-100"
                  />
                </div>
              </div>

              {!otpSent ? (
                <button
                  type="button"
                  onClick={handleSendOtp}
                  disabled={otpLoading}
                  className="w-full bg-luxury text-white py-3 rounded-xl font-semibold text-xs uppercase tracking-wide hover:bg-black transition-all disabled:opacity-60">
                  {otpLoading ? "Sending..." : "Send OTP"}
                </button>
              ) : (
                <>
                  <div className="flex flex-col gap-1.5">
                    <div className="flex items-center justify-between">
                      <label className="text-xs font-semibold text-gray-600">Enter OTP</label>
                      <button type="button" onClick={handleSendOtp} className="text-primary text-xs font-semibold">Resend</button>
                    </div>
                    <input
                      type="text"
                      inputMode="numeric"
                      maxLength={6}
                      value={otp}
                      onChange={(e) => setOtp(e.target.value.replace(/\D/g, ""))}
                      placeholder="Enter OTP"
                      className="w-full border border-gray-200 rounded-xl px-4 py-3 text-center text-lg font-bold tracking-widest outline-none focus:border-primary focus:ring-2 focus:ring-primary/10 transition-all bg-white"
                    />
                    <p className="text-[10px] text-green-600 font-semibold mt-0.5">✓ OTP sent to +91 {phone}</p>
                  </div>

                  <button
                    type="submit"
                    disabled={isLoading}
                    className={`w-full mt-2 py-3.5 rounded-xl font-semibold tracking-wide uppercase text-xs shadow-lg transition-all duration-300 flex items-center justify-center gap-2 ${
                      isLoading ? "bg-gray-300 text-gray-500 cursor-wait" : "bg-gradient-to-r from-primary to-primaryDark text-white hover:shadow-xl hover:scale-[1.01] active:scale-[0.99]"
                    }`}>
                    {isLoading ? (
                      <>
                        <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        Verifying...
                      </>
                    ) : "Verify & Sign In"}
                  </button>
                </>
              )}
            </form>
          )}

          <p className="text-center text-sm text-gray-500 mt-8">
            New to FashionStore?{" "}
            <Link to="/register" className="text-primary hover:text-primaryDark font-bold transition">Create Account</Link>
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