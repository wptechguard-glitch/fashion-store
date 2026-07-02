import React from "react";
import { Link } from "react-router-dom";
import { Mail, Phone, MapPin } from "lucide-react";
import { FaFacebook, FaTwitter, FaInstagram, FaYoutube, FaPinterest } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-luxury text-gray-300 mt-4">

      {/* NEWSLETTER SECTION */}
      <div className="bg-gradient-to-r from-primary to-primaryDark py-8 px-4">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div>
            <h3 className="text-white font-elegant text-2xl font-bold">
              Stay Updated ✦
            </h3>
            <p className="text-primaryLight text-sm mt-1">
              Latest collections, exclusive deals & fashion tips!
            </p>
          </div>
          <div className="flex w-full md:w-auto gap-2">
            <input
              type="email"
              placeholder="Enter your email..."
              className="flex-1 md:w-72 px-4 py-2 rounded-full text-sm outline-none text-gray-800"
            />
            <button className="bg-gold text-black px-6 py-2 rounded-full font-semibold text-sm hover:bg-yellow-500 transition">
              Subscribe
            </button>
          </div>
        </div>
      </div>

      {/* MAIN FOOTER */}
      <div className="max-w-7xl mx-auto px-4 py-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">

        {/* COLUMN 1 - ABOUT */}
        <div>
          <h3 className="font-elegant text-2xl font-bold mb-2">
            Fashion<span className="text-gold">Store</span>
          </h3>
          <p className="text-xs text-gray-400 leading-relaxed mb-4">
            India ka premium fashion destination! Authentic Indian wear with
            modern style. Free delivery above ₹499.
          </p>
          <div className="flex gap-3 mt-2">
            {[FaFacebook, FaInstagram, FaTwitter, FaYoutube, FaPinterest].map((Icon, i) => (
              <a key={i} href="/"
                className="bg-gray-700 hover:bg-primary p-2 rounded-full transition">
                <Icon size={14} />
              </a>
            ))}
          </div>
        </div>

        {/* COLUMN 2 - QUICK LINKS */}
        <div>
          <h3 className="text-gold font-semibold text-base mb-4 uppercase tracking-widest">
            Quick Links
          </h3>
          <ul className="space-y-2 text-sm">
            {[
              { name: "Home", path: "/" },
              { name: "Kurtas & Suits", path: "/category/kurtas" },
              { name: "Mens Wear", path: "/category/mens" },
              { name: "New Arrivals", path: "/category/new" },
              { name: "Sale 🔥", path: "/category/sale" },
            ].map((link) => (
              <li key={link.name}>
                <Link to={link.path}
                  className="hover:text-gold transition flex items-center gap-2">
                  <span className="text-primary">›</span> {link.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* COLUMN 3 - CUSTOMER HELP */}
        <div>
          <h3 className="text-gold font-semibold text-base mb-4 uppercase tracking-widest">
            Customer Help
          </h3>
          <ul className="space-y-2 text-sm">
            {[
              "My Account", "My Orders", "My Wishlist",
              "Track Order", "Return & Refund", "FAQ"
            ].map((item) => (
              <li key={item}>
                <a href="/" className="hover:text-gold transition flex items-center gap-2">
                  <span className="text-primary">›</span> {item}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* COLUMN 4 - CONTACT */}
        <div>
          <h3 className="text-gold font-semibold text-base mb-4 uppercase tracking-widest">
            Contact Us
          </h3>
          <ul className="space-y-3 text-sm">
            <li className="flex items-center gap-3">
              <Phone size={14} className="text-primary" />
              <span>+91 98765 43210</span>
            </li>
            <li className="flex items-center gap-3">
              <Mail size={14} className="text-primary" />
              <span>support@fashionstore.com</span>
            </li>
            <li className="flex items-start gap-3">
              <MapPin size={14} className="text-primary mt-1" />
              <span>Jaipur, Rajasthan, India</span>
            </li>
          </ul>

          <div className="mt-5">
            <p className="text-gold text-xs font-semibold mb-2 uppercase tracking-widest">
              We Accept
            </p>
            <div className="flex gap-2 flex-wrap">
              {["UPI", "Visa", "Mastercard", "Razorpay", "COD"].map((pay) => (
                <span key={pay}
                  className="bg-gray-700 border border-gray-600 text-xs text-white px-2 py-1 rounded">
                  {pay}
                </span>
              ))}
            </div>
          </div>
        </div>

      </div>

      {/* BOTTOM BAR */}
      <div className="border-t border-gray-700">
        <div className="max-w-7xl mx-auto px-4 py-4 flex flex-col md:flex-row items-center justify-between text-xs text-gray-500">
          <p>© 2024 FashionStore ✦ All rights reserved.</p>
          <div className="flex gap-4 mt-2 md:mt-0">
            <a href="/" className="hover:text-gold transition">Privacy Policy</a>
            <a href="/" className="hover:text-gold transition">Terms of Service</a>
            <a href="/" className="hover:text-gold transition">Sitemap</a>
          </div>
        </div>
      </div>

    </footer>
  );
};

export default Footer;