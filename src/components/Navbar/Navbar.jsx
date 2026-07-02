import React, { useState } from "react";
import { Link } from "react-router-dom";
import { ShoppingCart, Heart, User, Search, Menu, X } from "lucide-react";

const Navbar = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [mobileMenu, setMobileMenu] = useState(false);

  return (
    <nav className="bg-flipblue sticky top-0 z-50 shadow-md">
      
      {/* MAIN NAVBAR */}
      <div className="max-w-7xl mx-auto px-4 py-2 flex items-center gap-4">

        {/* LOGO */}
        <Link to="/" className="flex flex-col min-w-fit">
          <span className="text-white font-bold text-xl italic">
            Fashion<span className="text-flipyellow">Store</span>
          </span>
          <span className="text-flipyellow text-xs italic font-medium">
            Explore <span className="underline">Plus</span> ✨
          </span>
        </Link>

        {/* SEARCH BAR */}
        <div className="flex-1 flex items-center bg-white rounded overflow-hidden">
          <input
            type="text"
            placeholder="Search for clothes, brands and more"
            className="w-full px-4 py-2 text-sm outline-none text-gray-700"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <button className="bg-flipblue px-4 py-2 text-white">
            <Search size={20} />
          </button>
        </div>

        {/* RIGHT ICONS */}
        <div className="flex items-center gap-6 text-white">

          {/* LOGIN */}
          <Link to="/login"
            className="flex flex-col items-center text-xs hover:text-flipyellow transition">
            <User size={20} />
            <span>Login</span>
          </Link>

          {/* WISHLIST */}
          <Link to="/wishlist"
            className="flex flex-col items-center text-xs hover:text-flipyellow transition relative">
            <Heart size={20} />
            <span>Wishlist</span>
            <span className="absolute -top-2 -right-2 bg-flipyellow text-black text-xs rounded-full w-4 h-4 flex items-center justify-center font-bold">
              0
            </span>
          </Link>

          {/* CART */}
          <Link to="/cart"
            className="flex flex-col items-center text-xs hover:text-flipyellow transition relative">
            <ShoppingCart size={20} />
            <span>Cart</span>
            <span className="absolute -top-2 -right-2 bg-flipyellow text-black text-xs rounded-full w-4 h-4 flex items-center justify-center font-bold">
              0
            </span>
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
      <div className="bg-white border-b hidden md:block">
        <div className="max-w-7xl mx-auto px-4 flex gap-8 overflow-x-auto">
          {["Kurtas & Suits", "Mens", "New Arrivals","Sale"].map((cat) => (
            <Link
              key={cat}
              to={`/category/${cat.toLowerCase()}`}
              className="text-sm font-medium text-gray-700 py-2 hover:text-flipblue whitespace-nowrap border-b-2 border-transparent hover:border-flipblue transition">
              {cat}
            </Link>
          ))}
        </div>
      </div>

      {/* MOBILE MENU */}
      {mobileMenu && (
        <div className="bg-white md:hidden px-4 py-2 flex flex-col gap-2">
          {["Kurtas & Suits", "Mens", "New Arrivals","Sale"].map((cat) => (
            <Link
              key={cat}
              to={`/category/${cat.toLowerCase()}`}
              className="text-sm text-gray-700 py-1 border-b hover:text-flipblue">
              {cat}
            </Link>
          ))}
        </div>
      )}

    </nav>
  );
};

export default Navbar;