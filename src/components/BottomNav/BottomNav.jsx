import { useState, useEffect, useRef } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { Home, LayoutGrid, User, ShoppingCart } from "lucide-react";

const BottomNav = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const cartItems = useSelector((state) => state.cart.items);
  const { isLoggedIn } = useSelector((state) => state.user);
  const cartCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  const isActive = (path) => location.pathname === path;

  const handleAccountClick = () => {
    navigate(isLoggedIn ? "/profile" : "/login");
  };

  // ---- SCROLL DIRECTION LOGIC ----
  const [visible, setVisible] = useState(true);
  const lastScrollY = useRef(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY <= 10) {
        setVisible(true); // top pe hamesha dikhega
      } else if (currentScrollY > lastScrollY.current) {
        setVisible(false); // neeche scroll -> hide
      } else {
        setVisible(true); // upar scroll -> show
      }

      lastScrollY.current = currentScrollY;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div
      className={`fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-[0_-2px_10px_rgba(0,0,0,0.06)] flex md:hidden z-50 transition-transform duration-300 ${
        visible ? "translate-y-0" : "translate-y-full"
      }`}>
      <Link
        to="/"
        className={`flex-1 flex flex-col items-center justify-center py-2 gap-0.5 ${
          isActive("/") ? "text-primary" : "text-gray-500"
        }`}>
        <Home size={22} fill={isActive("/") ? "currentColor" : "none"} strokeWidth={isActive("/") ? 0 : 1.8} />
        <span className="text-[11px] font-medium">Home</span>
      </Link>

      <Link
        to="/category/all"
        className={`flex-1 flex flex-col items-center justify-center py-2 gap-0.5 ${
          isActive("/category/all") ? "text-primary" : "text-gray-500"
        }`}>
        <LayoutGrid size={20} strokeWidth={1.8} />
        <span className="text-[11px] font-medium">Categories</span>
      </Link>

      <button
        onClick={handleAccountClick}
        className={`flex-1 flex flex-col items-center justify-center py-2 gap-0.5 ${
          isActive("/profile") || isActive("/login") ? "text-primary" : "text-gray-500"
        }`}>
        <User size={20} strokeWidth={1.8} />
        <span className="text-[11px] font-medium">Account</span>
      </button>

      <Link
        to="/cart"
        className={`flex-1 flex flex-col items-center justify-center py-2 gap-0.5 relative ${
          isActive("/cart") ? "text-primary" : "text-gray-500"
        }`}>
        <div className="relative">
          <ShoppingCart size={20} strokeWidth={1.8} />
          {cartCount > 0 && (
            <span className="absolute -top-1.5 -right-2 bg-gold text-black text-[9px] rounded-full w-3.5 h-3.5 flex items-center justify-center font-bold">
              {cartCount}
            </span>
          )}
        </div>
        <span className="text-[11px] font-medium">Cart</span>
      </Link>
    </div>
  );
};

export default BottomNav;