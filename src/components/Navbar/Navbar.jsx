import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logoutUser } from "../../redux/userSlice";
import { Search, User, ShoppingCart, Heart, X, Menu, ChevronDown } from "lucide-react";

const Navbar = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [mobileMenu, setMobileMenu] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const cartItems = useSelector((state) => state.cart.items);
  const wishlistItems = useSelector((state) => state.wishlist.items);
  const { currentUser, isLoggedIn } = useSelector((state) => state.user);

  const cartCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);
  const wishlistCount = wishlistItems.length;

  const handleSearch = (e) => {
    if (e.key === "Enter" || e.type === "click") {
      if (searchQuery.trim()) {
        navigate(`/category/all?search=${encodeURIComponent(searchQuery.trim())}`);
      } else {
        navigate(`/category/all`);
      }
    }
  };

  const handleLogout = () => {
    dispatch(logoutUser());
    navigate("/");
  };

  return (
    <nav className="sticky top-0 z-50 shadow-lg">

     {/* TOP BAR */}
<div className="bg-luxury text-primaryLight text-xs py-1.5 px-4 flex justify-between items-center">
  <p className="hidden sm:block">🚚 Free Delivery on orders above ₹499</p>
  <p className="block sm:hidden text-center w-full">🚚 Free Delivery above ₹499</p>
  <div className="hidden sm:flex gap-4">
    <a href="/" className="hover:text-gold transition">Track Order</a>
    <a href="/" className="hover:text-gold transition">Help</a>
  </div>
</div>

      {/* MAIN NAVBAR */}
      <div className="bg-gradient-to-r from-primary via-primaryDark to-luxury px-4 py-3 flex items-center gap-4">

        {/* LOGO */}
        <Link to="/" className="flex flex-col min-w-fit">
          <span className="font-elegant text-2xl font-bold text-white tracking-wide">
            Fashion<span className="text-gold">Store</span>
          </span>
          <span className="text-primaryLight text-xs tracking-widest uppercase">
            ✦ Luxury Fashion ✦
          </span>
        </Link>

        {/* SEARCH BAR */}
        <div className="flex-1 flex items-center bg-white rounded-full overflow-hidden shadow-md border-2 border-gold">
          <input
            type="text"
            placeholder="Search sarees, kurtis, mens wear..."
            className="w-full px-5 py-2 text-sm outline-none text-gray-700"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyDown={handleSearch}
          />
          <button 
            onClick={handleSearch}
            className="bg-gold px-5 py-2 text-white hover:bg-yellow-600 transition">
            <Search size={18} />
          </button>
        </div>

        {/* RIGHT ICONS */}
        <div className="flex items-center gap-5 text-white">

          {/* USER / PROFILE / LOGIN */}
          {isLoggedIn ? (
            <div className="relative group cursor-pointer flex flex-col items-center text-xs text-white">
              <div className="bg-white bg-opacity-20 rounded-full p-2 hover:bg-gold transition">
                <User size={18} />
              </div>
              <span className="mt-1 flex items-center gap-0.5">
                Hi, {currentUser?.name?.split(" ")[0]} <ChevronDown size={10} />
              </span>
              
              {/* DROPDOWN */}
              <div className="absolute right-0 top-11 bg-white text-gray-800 rounded-xl shadow-xl border border-gray-100 py-2 w-44 hidden group-hover:block z-50 overflow-hidden">
                <Link to="/profile" className="block px-4 py-2.5 hover:bg-gray-50 text-xs font-medium flex items-center gap-2 transition">
                  <span className="w-5 h-5 bg-primary/10 rounded-md flex items-center justify-center"><User size={11} className="text-primary" /></span>
                  My Profile
                </Link>
                <Link to="/profile" className="block px-4 py-2.5 hover:bg-gray-50 text-xs font-medium flex items-center gap-2 transition">
                  <span className="w-5 h-5 bg-blue-50 rounded-md flex items-center justify-center"><ShoppingCart size={11} className="text-blue-500" /></span>
                  My Orders
                </Link>
                <Link to="/wishlist" className="block px-4 py-2.5 hover:bg-gray-50 text-xs font-medium flex items-center gap-2 transition">
                  <span className="w-5 h-5 bg-pink-50 rounded-md flex items-center justify-center"><Heart size={11} className="text-pink-500" /></span>
                  Wishlist
                </Link>
                <div className="border-t border-gray-100 my-1" />
                <button
                  onClick={handleLogout}
                  className="w-full text-left px-4 py-2.5 hover:bg-red-50 text-xs text-red-500 font-semibold flex items-center gap-2 transition">
                  <span className="w-5 h-5 bg-red-50 rounded-md flex items-center justify-center"><X size={11} className="text-red-500" /></span>
                  Logout
                </button>
              </div>
            </div>
          ) : (
            <Link to="/login"
              className="flex flex-col items-center text-xs hover:text-gold transition group">
              <div className="bg-white bg-opacity-20 rounded-full p-2 group-hover:bg-gold transition">
                <User size={18} />
              </div>
              <span className="mt-1">Login</span>
            </Link>
          )}

          {/* WISHLIST */}
          <Link to="/wishlist"
            className="flex flex-col items-center text-xs hover:text-gold transition group relative">
            <div className="bg-white bg-opacity-20 rounded-full p-2 group-hover:bg-gold transition">
              <Heart size={18} />
            </div>
            <span className="mt-1">Wishlist</span>
            {wishlistCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-gold text-black text-xs rounded-full w-4 h-4 flex items-center justify-center font-bold animate-bounce">
                {wishlistCount}
              </span>
            )}
          </Link>

          {/* CART */}
          <Link to="/cart"
            className="flex flex-col items-center text-xs hover:text-gold transition group relative">
            <div className="bg-white bg-opacity-20 rounded-full p-2 group-hover:bg-gold transition">
              <ShoppingCart size={18} />
            </div>
            <span className="mt-1">Cart</span>
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-gold text-black text-xs rounded-full w-4 h-4 flex items-center justify-center font-bold">
                {cartCount}
              </span>
            )}
          </Link>

        </div>

        {/* MOBILE MENU BUTTON */}
        <button
          className="text-white md:hidden"
          onClick={() => setMobileMenu(!mobileMenu)}>
          {mobileMenu ? <X size={24} /> : <Menu size={24} />}
        </button>

      </div>

      {/* CATEGORY BAR */}
      <div className="bg-white border-b border-primaryLight hidden md:block shadow-sm">
        <div className="max-w-7xl mx-auto px-4 flex gap-8 overflow-x-auto">
          {[
            { name: "Kurtas & Suits", path: "kurtas" },
            { name: "Mens Collection", path: "mens" },
            { name: "New Arrivals", path: "new" },
            { name: "Hot Sale 🔥", path: "sale" },
          ].map((cat) => (
            <Link
              key={cat.name}
              to={`/category/${cat.path}`}
              className="flex items-center gap-1 text-sm font-medium text-gray-700 py-3 hover:text-primary whitespace-nowrap border-b-2 border-transparent hover:border-primary transition">
              <span>{cat.name}</span>
            </Link>
          ))}
        </div>
      </div>

      {/* MOBILE MENU */}
      {mobileMenu && (
        <div className="bg-white md:hidden px-4 py-2 flex flex-col gap-2 shadow-lg">
          {[
            { name: "Kurtas & Suits", path: "kurtas" },
            { name: "Mens Collection", path: "mens" },
            { name: "New Arrivals", path: "new" },
            { name: "Hot Sale 🔥", path: "sale" },
          ].map((cat) => (
            <Link
              key={cat.name}
              to={`/category/${cat.path}`}
              className="flex items-center gap-2 text-sm text-gray-700 py-2 border-b hover:text-primary"
              onClick={() => setMobileMenu(false)}>
              <span>{cat.name}</span>
            </Link>
          ))}
        </div>
      )}

    </nav>
  );
};

export default Navbar;