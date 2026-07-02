import React from "react";
import { Link } from "react-router-dom";
import { Mail, Phone, MapPin } from "lucide-react";
import { FaFacebook, FaTwitter, FaInstagram, FaYoutube } from "react-icons/fa";
const Footer = () => {
  return (
    <footer className="bg-gray-800 text-gray-300 mt-4">

      {/* TOP SECTION */}
      <div className="max-w-7xl mx-auto px-4 py-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">

        {/* COLUMN 1 - ABOUT */}
        <div>
          <h3 className="text-white font-bold text-lg mb-4">
            Fashion<span className="text-yellow-400">Store</span>
          </h3>
          <p className="text-sm text-gray-400 leading-relaxed">
            India ka apna fashion store! Best quality kurtas aur mens wear at
            affordable prices. Free delivery on orders above ₹499.
          </p>
          {/* SOCIAL ICONS */}
          <div className="flex gap-4 mt-4">
            <a href="#" className="hover:text-white transition">
              <FaFacebook size={20} />
            </a>
            <a href="#" className="hover:text-white transition">
              <FaTwitter size={20} />
            </a>
            <a href="#" className="hover:text-white transition">
              <FaInstagram size={20} />
            </a>
            <a href="#" className="hover:text-white transition">
              <FaYoutube size={20} />
            </a>
          </div>
        </div>

        {/* COLUMN 2 - QUICK LINKS */}
        <div>
          <h3 className="text-white font-bold text-base mb-4">Quick Links</h3>
          <ul className="space-y-2 text-sm">
            <li>
              <Link to="/" className="hover:text-white transition">
                Home
              </Link>
            </li>
            <li>
              <Link to="/category/kurtas" className="hover:text-white transition">
                Kurtas & Suits
              </Link>
            </li>
            <li>
              <Link to="/category/mens" className="hover:text-white transition">
                Mens Wear
              </Link>
            </li>
            <li>
              <Link to="/category/new" className="hover:text-white transition">
                New Arrivals
              </Link>
            </li>
            <li>
              <Link to="/category/sale" className="hover:text-white transition">
                Sale 🔥
              </Link>
            </li>
          </ul>
        </div>

        {/* COLUMN 3 - CUSTOMER HELP */}
        <div>
          <h3 className="text-white font-bold text-base mb-4">Customer Help</h3>
          <ul className="space-y-2 text-sm">
            <li>
              <Link to="/profile" className="hover:text-white transition">
                My Account
              </Link>
            </li>
            <li>
              <Link to="/cart" className="hover:text-white transition">
                My Cart
              </Link>
            </li>
            <li>
              <Link to="/wishlist" className="hover:text-white transition">
                My Wishlist
              </Link>
            </li>
            <li>
              <a href="#" className="hover:text-white transition">
                Track Order
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-white transition">
                Return & Refund
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-white transition">
                FAQ
              </a>
            </li>
          </ul>
        </div>

        {/* COLUMN 4 - CONTACT */}
        <div>
          <h3 className="text-white font-bold text-base mb-4">Contact Us</h3>
          <ul className="space-y-3 text-sm">
            <li className="flex items-center gap-2">
              <Phone size={16} className="text-yellow-400" />
              <span>+91 98765 43210</span>
            </li>
            <li className="flex items-center gap-2">
              <Mail size={16} className="text-yellow-400" />
              <span>support@fashionstore.com</span>
            </li>
            <li className="flex items-start gap-2">
              <MapPin size={16} className="text-yellow-400 mt-1" />
              <span>Jaipur, Rajasthan, India</span>
            </li>
          </ul>

          {/* PAYMENT ICONS */}
          <div className="mt-4">
            <p className="text-white text-sm font-semibold mb-2">
              We Accept
            </p>
            <div className="flex gap-2 flex-wrap">
              {["UPI", "Visa", "Mastercard", "Razorpay"].map((pay) => (
                <span
                  key={pay}
                  className="bg-gray-700 text-xs text-white px-2 py-1 rounded">
                  {pay}
                </span>
              ))}
            </div>
          </div>
        </div>

      </div>

      {/* DIVIDER */}
      <div className="border-t border-gray-700" />

      {/* BOTTOM SECTION */}
      <div className="max-w-7xl mx-auto px-4 py-4 flex flex-col md:flex-row items-center justify-between text-xs text-gray-500">
        <p>© 2024 FashionStore. All rights reserved.</p>
        <div className="flex gap-4 mt-2 md:mt-0">
          <a href="#" className="hover:text-white transition">
            Privacy Policy
          </a>
          <a href="#" className="hover:text-white transition">
            Terms of Service
          </a>
          <a href="#" className="hover:text-white transition">
            Sitemap
          </a>
        </div>
      </div>

    </footer>
  );
};

export default Footer;