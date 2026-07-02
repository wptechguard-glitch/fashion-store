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

  const navItemClass = (active) =>
    `relative flex-1 flex flex-col items-center justify-center py-2.5 gap-0.5 transition-all duration-300 ${
      active ? "text-primary -translate-y-0.5" : "text-gray-400"
    }`;

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white/90 backdrop-blur-lg border-t border-gray-100 shadow-[0_-4px_20px_rgba(0,0,0,0.08)] flex md:hidden z-50">
      <Link to="/" className={navItemClass(isActive("/"))}>
        {isActive("/") && (
          <span className="absolute -top-2.5 w-8 h-1 rounded-full bg-primary shadow-[0_0_8px_theme(colors.primary)]" />
        )}
        <Home
          size={22}
          fill={isActive("/") ? "currentColor" : "none"}
          strokeWidth={isActive("/") ? 0 : 1.8}
          className={isActive("/") ? "drop-shadow-[0_0_6px_rgba(0,0,0,0.15)]" : ""}
        />
        <span className="text-[11px] font-medium">Home</span>
      </Link>

      <Link to="/category/all" className={navItemClass(isActive("/category/all"))}>
        {isActive("/category/all") && (
          <span className="absolute -top-2.5 w-8 h-1 rounded-full bg-primary shadow-[0_0_8px_theme(colors.primary)]" />
        )}
        <LayoutGrid size={20} strokeWidth={isActive("/category/all") ? 2.3 : 1.8} />
        <span className="text-[11px] font-medium">Categories</span>
      </Link>

      <button onClick={handleAccountClick} className={navItemClass(isActive("/profile") || isActive("/login"))}>
        {(isActive("/profile") || isActive("/login")) && (
          <span className="absolute -top-2.5 w-8 h-1 rounded-full bg-primary shadow-[0_0_8px_theme(colors.primary)]" />
        )}
        <User size={20} strokeWidth={isActive("/profile") || isActive("/login") ? 2.3 : 1.8} />
        <span className="text-[11px] font-medium">Account</span>
      </button>

      <Link to="/cart" className={navItemClass(isActive("/cart"))}>
        {isActive("/cart") && (
          <span className="absolute -top-2.5 w-8 h-1 rounded-full bg-primary shadow-[0_0_8px_theme(colors.primary)]" />
        )}
        <div className="relative">
          <ShoppingCart size={20} strokeWidth={isActive("/cart") ? 2.3 : 1.8} />
          {cartCount > 0 && (
            <span className="absolute -top-1.5 -right-2 bg-gold text-black text-[9px] rounded-full w-3.5 h-3.5 flex items-center justify-center font-bold shadow-[0_0_6px_theme(colors.gold)] animate-pulse">
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