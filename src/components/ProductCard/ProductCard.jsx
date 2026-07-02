import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Heart, ShoppingCart, Star } from "lucide-react";

const ProductCard = ({ product }) => {
  const [wishlist, setWishlist] = useState(false);

  const discountPercent = Math.round(
    ((product.originalPrice - product.price) / product.originalPrice) * 100
  );

  return (
    <div className="bg-white rounded shadow hover:shadow-lg transition duration-300 relative group">
      
      {/* WISHLIST BUTTON */}
      <button
        onClick={() => setWishlist(!wishlist)}
        className="absolute top-2 right-2 z-10 bg-white rounded-full p-1 shadow">
        <Heart
          size={20}
          className={wishlist ? "fill-red-500 text-red-500" : "text-gray-400"}
        />
      </button>

      {/* DISCOUNT BADGE */}
      {discountPercent > 0 && (
        <div className="absolute top-2 left-2 bg-green-500 text-white text-xs font-bold px-2 py-1 rounded">
          {discountPercent}% OFF
        </div>
      )}

      {/* PRODUCT IMAGE */}
      <Link to={`/product/${product.id}`}>
        <div className="w-full h-56 overflow-hidden rounded-t">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
          />
        </div>
      </Link>

      {/* PRODUCT INFO */}
      <div className="p-3">

        {/* NAME */}
        <Link to={`/product/${product.id}`}>
          <h3 className="text-sm font-medium text-gray-800 hover:text-flipblue line-clamp-2">
            {product.name}
          </h3>
        </Link>

        {/* RATING */}
        <div className="flex items-center gap-1 mt-1">
          <span className="bg-green-500 text-white text-xs px-2 py-0.5 rounded flex items-center gap-1">
            {product.rating} <Star size={10} fill="white" />
          </span>
          <span className="text-xs text-gray-400">({product.reviews})</span>
        </div>

        {/* PRICE */}
        <div className="flex items-center gap-2 mt-2">
          <span className="text-base font-bold text-gray-900">
            ₹{product.price}
          </span>
          <span className="text-sm text-gray-400 line-through">
            ₹{product.originalPrice}
          </span>
          <span className="text-sm text-green-500 font-semibold">
            {discountPercent}% off
          </span>
        </div>

        {/* FREE DELIVERY */}
        <p className="text-xs text-gray-500 mt-1">Free Delivery</p>

        {/* ADD TO CART BUTTON */}
        <button className="w-full mt-3 bg-flipblue text-white py-2 rounded font-semibold text-sm flex items-center justify-center gap-2 hover:bg-blue-700 transition">
          <ShoppingCart size={16} />
          Add to Cart
        </button>

      </div>
    </div>
  );
};

export default ProductCard;