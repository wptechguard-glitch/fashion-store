import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { loginUser } from "../../redux/userSlice";
import { User, Lock, Mail, ArrowLeft, Phone, Eye, EyeOff, CheckCircle, Sparkles } from "lucide-react";

/* Inline SVG icons for social providers */
const GoogleIcon = () => (
  <svg viewBox="0 0 24 24" className="w-5 h-5">
    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.27-4.74 3.27-8.1z" fill="#4285F4"/>
    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
    <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18A10.96 10.96 0 0 0 1 12c0 1.77.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
  </svg>
);

const Register = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [agreed, setAgreed] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Password strength
  const getPasswordStrength = (pass) => {
    if (!pass) return { level: 0, label: "", color: "" };
    let score = 0;
    if (pass.length >= 6) score++;
    if (pass.length >= 10) score++;
    if (/[A-Z]/.test(pass)) score++;
    if (/[0-9]/.test(pass)) score++;
    if (/[^A-Za-z0-9]/.test(pass)) score++;

    if (score <= 2) return { level: score, label: "Weak", color: "bg-red-400" };
    if (score <= 3) return { level: score, label: "Fair", color: "bg-yellow-400" };
    if (score <= 4) return { level: score, label: "Good", color: "bg-green-400" };
    return { level: score, label: "Strong", color: "bg-green-600" };
  };

  const strength = getPasswordStrength(formData.password);
  const passwordsMatch = formData.confirmPassword && formData.password === formData.confirmPassword;

  const handleRegister = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    await new Promise((r) => setTimeout(r, 800));

    if (!formData.fullName || !formData.email || !formData.password || !formData.confirmPassword) {
      alert("Please fill in all required fields!");
      setIsLoading(false);
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match!");
      setIsLoading(false);
      return;
    }

    if (!agreed) {
      alert("Please agree to Terms of Service");
      setIsLoading(false);
      return;
    }

    dispatch(
      loginUser({
        name: formData.fullName,
        email: formData.email,
        phone: formData.phone,
      })
    );

    setIsLoading(false);
    navigate("/");
  };

  const handleGoogleRegister = () => {
    dispatch(loginUser({ name: "Google User", email: "user@google.com", avatar: "google" }));
    navigate("/");
  };

  return (
    <div className="min-h-screen flex">
      {/* LEFT DECORATIVE PANEL (Desktop Only) */}
      <div className="hidden lg:flex lg:w-[45%] bg-gradient-to-br from-luxury via-primaryDark to-primary relative overflow-hidden items-center justify-center">
        <div className="absolute top-10 right-10 w-72 h-72 bg-gold/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-20 left-10 w-80 h-80 bg-primary/30 rounded-full blur-3xl" style={{ animation: "pulse 3s ease-in-out infinite reverse" }} />

        <div className="relative z-10 text-center px-12 max-w-md">
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md rounded-full px-4 py-1.5 text-xs text-gold font-semibold tracking-widest uppercase mb-6 border border-white/10">
            <Sparkles size={14} /> Join the Club
          </div>
          <h1 className="font-elegant text-5xl font-bold text-white leading-tight">
            Create Your<br />
            <span className="text-gold">Luxury</span> Account
          </h1>
          <p className="text-primaryLight/80 mt-4 text-sm leading-relaxed">
            Join thousands of fashion enthusiasts. Get access to exclusive collections, early sales access, and personalized recommendations.
          </p>

          {/* PERKS */}
          <div className="mt-10 space-y-3 text-left">
            {[
              "10% off on your first order",
              "Early access to new collections",
              "Exclusive member-only sales",
              "Free shipping on all orders",
            ].map((perk) => (
              <div key={perk} className="flex items-center gap-3 text-sm text-primaryLight/90">
                <CheckCircle size={16} className="text-gold flex-shrink-0" />
                <span>{perk}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* RIGHT - REGISTER FORM */}
      <div className="flex-1 bg-gray-50 flex flex-col justify-center py-8 px-4 sm:px-8 lg:px-16 xl:px-24 overflow-y-auto">
        <div className="max-w-md w-full mx-auto">
          {/* BACK LINK */}
          <Link to="/" className="text-primary hover:text-primaryDark transition flex items-center gap-1.5 text-sm font-semibold mb-8 group">
            <ArrowLeft size={16} className="group-hover:-translate-x-0.5 transition-transform" /> Back to store
          </Link>

          {/* HEADING */}
          <div className="mb-6">
            <h2 className="font-elegant text-3xl font-bold text-gray-900">Create Account</h2>
            <p className="text-gray-400 text-sm mt-1">Join the FashionStore luxury community</p>
          </div>

          {/* GOOGLE REGISTER */}
          <button
            onClick={handleGoogleRegister}
            className="w-full flex items-center justify-center gap-3 bg-white border border-gray-200 rounded-xl py-3 px-4 text-sm font-semibold text-gray-700 hover:bg-gray-50 hover:border-gray-300 hover:shadow-md transition-all duration-200 mb-6">
            <GoogleIcon />
            <span>Sign up with Google</span>
          </button>

          {/* DIVIDER */}
          <div className="relative mb-6">
            <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-gray-200" /></div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-gray-50 px-4 text-gray-400 tracking-widest text-[10px] font-semibold">Or register with email</span>
            </div>
          </div>

          <form onSubmit={handleRegister} className="space-y-4">
            {/* FULL NAME */}
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-semibold text-gray-600">Full Name *</label>
              <div className="relative flex items-center">
                <User size={16} className="text-gray-400 absolute left-3.5" />
                <input type="text" name="fullName" required value={formData.fullName} onChange={handleInputChange}
                  placeholder="Enter your full name"
                  className="w-full border border-gray-200 rounded-xl pl-10 pr-4 py-3 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/10 transition-all bg-white" />
              </div>
            </div>

            {/* EMAIL */}
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-semibold text-gray-600">Email Address *</label>
              <div className="relative flex items-center">
                <Mail size={16} className="text-gray-400 absolute left-3.5" />
                <input type="email" name="email" required value={formData.email} onChange={handleInputChange}
                  placeholder="name@example.com"
                  className="w-full border border-gray-200 rounded-xl pl-10 pr-4 py-3 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/10 transition-all bg-white" />
              </div>
            </div>

            {/* PHONE */}
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-semibold text-gray-600">Phone Number <span className="text-gray-300 font-normal">(optional)</span></label>
              <div className="relative flex items-center">
                <Phone size={16} className="text-gray-400 absolute left-3.5" />
                <input type="tel" name="phone" value={formData.phone} onChange={handleInputChange}
                  placeholder="10-digit mobile number"
                  className="w-full border border-gray-200 rounded-xl pl-10 pr-4 py-3 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/10 transition-all bg-white" />
              </div>
            </div>

            {/* PASSWORD */}
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-semibold text-gray-600">Password *</label>
              <div className="relative flex items-center">
                <Lock size={16} className="text-gray-400 absolute left-3.5" />
                <input type={showPassword ? "text" : "password"} name="password" required value={formData.password} onChange={handleInputChange}
                  placeholder="Min 6 characters"
                  className="w-full border border-gray-200 rounded-xl pl-10 pr-12 py-3 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/10 transition-all bg-white" />
                <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3.5 text-gray-400 hover:text-gray-600 transition">
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
              {/* PASSWORD STRENGTH */}
              {formData.password && (
                <div className="flex items-center gap-2 mt-1">
                  <div className="flex-1 flex gap-1">
                    {[1, 2, 3, 4, 5].map((n) => (
                      <div key={n} className={`h-1 flex-1 rounded-full transition-all ${n <= strength.level ? strength.color : "bg-gray-200"}`} />
                    ))}
                  </div>
                  <span className={`text-[10px] font-bold uppercase tracking-wider ${
                    strength.label === "Weak" ? "text-red-400" : strength.label === "Fair" ? "text-yellow-500" : "text-green-500"
                  }`}>{strength.label}</span>
                </div>
              )}
            </div>

            {/* CONFIRM PASSWORD */}
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-semibold text-gray-600">Confirm Password *</label>
              <div className="relative flex items-center">
                <Lock size={16} className="text-gray-400 absolute left-3.5" />
                <input type={showConfirm ? "text" : "password"} name="confirmPassword" required value={formData.confirmPassword} onChange={handleInputChange}
                  placeholder="Re-type password"
                  className={`w-full border rounded-xl pl-10 pr-12 py-3 text-sm outline-none focus:ring-2 transition-all bg-white ${
                    formData.confirmPassword
                      ? passwordsMatch ? "border-green-300 focus:border-green-400 focus:ring-green-100" : "border-red-300 focus:border-red-400 focus:ring-red-100"
                      : "border-gray-200 focus:border-primary focus:ring-primary/10"
                  }`} />
                <button type="button" onClick={() => setShowConfirm(!showConfirm)} className="absolute right-3.5 text-gray-400 hover:text-gray-600 transition">
                  {showConfirm ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
              {formData.confirmPassword && (
                <p className={`text-[10px] font-semibold mt-0.5 ${passwordsMatch ? "text-green-500" : "text-red-400"}`}>
                  {passwordsMatch ? "✓ Passwords match" : "✗ Passwords do not match"}
                </p>
              )}
            </div>

            {/* TERMS */}
            <div className="flex items-start gap-2.5 text-xs text-gray-500 pt-1">
              <input type="checkbox" id="terms" checked={agreed} onChange={(e) => setAgreed(e.target.checked)}
                className="accent-primary rounded w-3.5 h-3.5 mt-0.5" />
              <label htmlFor="terms" className="cursor-pointer select-none leading-relaxed">
                I agree to the <button type="button" className="text-primary font-semibold hover:underline">Terms of Service</button> & <button type="button" className="text-primary font-semibold hover:underline">Privacy Policy</button>
              </label>
            </div>

            {/* SUBMIT */}
            <button
              type="submit"
              disabled={isLoading || !agreed}
              className={`w-full mt-2 py-3.5 rounded-xl font-semibold tracking-wide uppercase text-xs shadow-lg transition-all duration-300 flex items-center justify-center gap-2 ${
                isLoading || !agreed
                  ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                  : "bg-gradient-to-r from-primary to-primaryDark text-white hover:shadow-xl hover:scale-[1.01] active:scale-[0.99]"
              }`}>
              {isLoading ? (
                <>
                  <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Creating Account...
                </>
              ) : (
                "Create Account"
              )}
            </button>
          </form>

          {/* FOOTER */}
          <p className="text-center text-sm text-gray-500 mt-8">
            Already have an account?{" "}
            <Link to="/login" className="text-primary hover:text-primaryDark font-bold transition">Sign In</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
