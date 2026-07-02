import React from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toggleWishlist } from "../../redux/wishlistSlice";
import { addToCart } from "../../redux/cartSlice";
import { Heart, ShoppingCart, Star } from "lucide-react";

const ProductCard = ({ product }) => {
  const dispatch = useDispatch();
  const wishlistItems = useSelector((state) => state.wishlist.items);
  const isInWishlist = wishlistItems.some((item) => item.id === product.id);

  const discountPercent = Math.round(
    ((product.originalPrice - product.price) / product.originalPrice) * 100
  );

  const handleWishlistToggle = (e) => {
    e.preventDefault();
    e.stopPropagation();
    dispatch(toggleWishlist(product));
  };

  const handleAddToCart = (e) => {
    e.preventDefault();
    e.stopPropagation();
    dispatch(
      addToCart({
        id: product.id,
        name: product.name,
        brand: product.brand || "FashionStore",
        price: product.price,
        originalPrice: product.originalPrice,
        image: product.image,
        size: product.sizes?.[0] || "M",
        color: product.colors?.[0] || "Default",
        quantity: 1,
      })
    );
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm hover:shadow-md border border-gray-100 transition duration-300 relative group overflow-hidden flex flex-col h-full">
      
      {/* WISHLIST BUTTON */}
      <button
        onClick={handleWishlistToggle}
        className="absolute top-2 right-2 z-10 bg-white rounded-full p-2 shadow-sm hover:bg-red-50 transition">
        <Heart
          size={16}
          className={isInWishlist ? "fill-red-500 text-red-500" : "text-gray-400"}
        />
      </button>

      {/* DISCOUNT BADGE */}
      {discountPercent > 0 && (
        <div className="absolute top-2 left-2 bg-green-500 text-white text-xs font-bold px-2 py-0.5 rounded">
          {discountPercent}% OFF
        </div>
      )}

      {/* PRODUCT IMAGE */}
      <Link to={`/product/${product.id}`} className="block overflow-hidden h-56 bg-gray-50">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-105 transition duration-300 object-top"
        />
      </Link>

      {/* PRODUCT INFO */}
      <div className="p-3 flex flex-col flex-1 justify-between">

        <div>
          {/* BRAND */}
          <p className="text-primary text-[10px] font-semibold uppercase tracking-wider">
            {product.brand || "FashionStore"}
          </p>

          {/* NAME */}
          <Link to={`/product/${product.id}`}>
            <h3 className="text-xs font-medium text-gray-800 hover:text-primary line-clamp-2 mt-0.5">
              {product.name}
            </h3>
          </Link>

          {/* RATING */}
          <div className="flex items-center gap-1 mt-1">
            <span className="bg-green-500 text-white text-[10px] px-1.5 py-0.5 rounded flex items-center gap-0.5">
              {product.rating} <Star size={8} fill="white" />
            </span>
            <span className="text-[10px] text-gray-400">({product.reviews})</span>
          </div>

          {/* PRICE */}
          <div className="flex items-center gap-2 mt-1.5">
            <span className="text-sm font-bold text-gray-900">
              ₹{product.price}
            </span>
            <span className="text-xs text-gray-400 line-through">
              ₹{product.originalPrice}
            </span>
          </div>
        </div>

        {/* ADD TO CART BUTTON */}
        <button
          onClick={handleAddToCart}
          className="w-full mt-3 bg-primary text-white py-2 rounded-lg font-semibold text-xs flex items-center justify-center gap-1.5 hover:bg-primaryDark transition uppercase tracking-wide">
          <ShoppingCart size={12} />
          Add to Cart
        </button>

      </div>
    </div>
  );
};

export default ProductCard;