import React from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { removeFromWishlist } from "../../redux/wishlistSlice";
import { addToCart } from "../../redux/cartSlice";
import { Heart, ShoppingCart, Trash2, ArrowLeft, Star } from "lucide-react";

const Wishlist = () => {
  const dispatch = useDispatch();
  const items = useSelector((state) => state.wishlist.items);

  const removeItem = (id) => {
    dispatch(removeFromWishlist(id));
  };

  const handleAddToCart = (e, item) => {
    e.preventDefault();
    e.stopPropagation();
    dispatch(
      addToCart({
        id: item.id,
        name: item.name,
        brand: item.brand || "FashionStore",
        price: item.price,
        originalPrice: item.originalPrice,
        image: item.image,
        size: item.sizes?.[0] || "M",
        color: item.colors?.[0] || "Default",
        quantity: 1,
      })
    );
    dispatch(removeFromWishlist(item.id));
  };

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center gap-4 px-4">
        <div className="bg-primaryLight/40 rounded-full p-6 animate-pulse">
          <Heart size={48} className="text-primary fill-primary/10" />
        </div>
        <h2 className="font-elegant text-2xl font-bold text-gray-700 mt-2">
          Your Wishlist is Empty
        </h2>
        <p className="text-gray-400 text-sm text-center max-w-xs">
          Save items you love to your wishlist and buy them later.
        </p>
        <Link to="/"
          className="bg-primary text-white px-8 py-3 rounded-lg font-semibold hover:bg-primaryDark transition tracking-wide uppercase text-sm shadow-sm mt-2">
          Start Shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 min-h-screen py-6">
      <div className="max-w-7xl mx-auto px-4">

        {/* HEADER */}
        <div className="flex items-center gap-3 mb-6">
          <Link to="/" className="text-primary hover:text-primaryDark transition">
            <ArrowLeft size={20} />
          </Link>
          <h1 className="font-elegant text-2xl font-bold text-gray-800">
            My Wishlist
            <span className="text-primary text-base font-normal ml-2">
              ({items.length} {items.length === 1 ? "item" : "items"})
            </span>
          </h1>
        </div>

        {/* GRID */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {items.map((item) => {
            const discount = Math.round(
              ((item.originalPrice - item.price) / item.originalPrice) * 100
            );
            return (
              <div key={item.id}
                className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden group flex flex-col justify-between h-full">

                {/* IMAGE */}
                <div className="relative">
                  <Link to={`/product/${item.id}`} className="block h-52 bg-gray-50 overflow-hidden">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition duration-300 object-top"
                    />
                  </Link>

                  {/* DISCOUNT BADGE */}
                  {discount > 0 && (
                    <div className="absolute top-2 left-2 bg-green-500 text-white text-[10px] font-bold px-2 py-0.5 rounded">
                      {discount}% OFF
                    </div>
                  )}

                  {/* OUT OF STOCK */}
                  {!item.inStock && (
                    <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
                      <span className="bg-white text-gray-800 text-[10px] font-bold px-3 py-1 rounded-full shadow-sm">
                        Out of Stock
                      </span>
                    </div>
                  )}

                  {/* REMOVE */}
                  <button
                    onClick={() => removeItem(item.id)}
                    className="absolute top-2 right-2 bg-white rounded-full p-2 shadow-sm hover:bg-red-50 transition">
                    <Trash2 size={12} className="text-red-400" />
                  </button>
                </div>

                {/* DETAILS */}
                <div className="p-3 flex-1 flex flex-col justify-between">
                  <div>
                    <p className="text-primary text-[10px] font-semibold uppercase tracking-widest">
                      {item.brand}
                    </p>
                    <h3 className="text-xs font-medium text-gray-800 mt-0.5 line-clamp-2">
                      {item.name}
                    </h3>

                    {/* RATING */}
                    <div className="flex items-center gap-1 mt-1">
                      <span className="bg-green-500 text-white text-[10px] px-1.5 py-0.5 rounded flex items-center gap-0.5">
                        {item.rating} <Star size={8} fill="white" />
                      </span>
                      <span className="text-[10px] text-gray-400">({item.reviews})</span>
                    </div>

                    {/* PRICE */}
                    <div className="flex items-center gap-2 mt-2">
                      <span className="font-bold text-gray-900 text-sm">₹{item.price}</span>
                      <span className="text-xs text-gray-400 line-through">
                        ₹{item.originalPrice}
                      </span>
                    </div>
                  </div>

                  {/* BUTTON */}
                  {item.inStock ? (
                    <button
                      onClick={(e) => handleAddToCart(e, item)}
                      className="w-full mt-3 bg-primary text-white py-2 rounded-lg text-xs font-semibold flex items-center justify-center gap-1.5 hover:bg-primaryDark transition uppercase tracking-wide">
                      <ShoppingCart size={12} />
                      Add to Cart
                    </button>
                  ) : (
                    <button className="w-full mt-3 bg-gray-100 text-gray-400 py-2 rounded-lg text-xs font-semibold cursor-not-allowed uppercase tracking-wide" disabled>
                      Out of Stock
                    </button>
                  )}
                </div>

              </div>
            );
          })}
        </div>

      </div>
    </div>
  );
};

export default Wishlist;