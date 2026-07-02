import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { updateQuantity, removeFromCart, applyCoupon } from "../../redux/cartSlice";
import { Trash2, Plus, Minus, ShoppingBag, ArrowLeft, Tag, X } from "lucide-react";

const Cart = () => {
  const dispatch = useDispatch();
  const items = useSelector((state) => state.cart.items);
  const couponApplied = useSelector((state) => state.cart.couponApplied);
  const couponCode = useSelector((state) => state.cart.couponCode);
  const discountPercentage = useSelector((state) => state.cart.discountPercentage);

  const [coupon, setCoupon] = useState("");

  const updateQty = (id, size, color, quantity, currentQty, type) => {
    const newQty = type === "inc" ? currentQty + 1 : currentQty - 1;
    dispatch(updateQuantity({ id, size, color, quantity: newQty }));
  };

  const removeItem = (id, size, color) => {
    dispatch(removeFromCart({ id, size, color }));
  };

  const handleApplyCoupon = () => {
    if (coupon.trim()) {
      dispatch(applyCoupon(coupon));
      if (coupon.toUpperCase() !== "FASHION10" && coupon.toUpperCase() !== "LUXURY20") {
        alert("Invalid coupon code! Try FASHION10 or LUXURY20.");
      }
    }
  };

  const subtotal = items.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const savings = items.reduce((acc, item) => acc + (item.originalPrice - item.price) * item.quantity, 0);
  const delivery = subtotal >= 499 ? 0 : 49;
  const discount = couponApplied ? Math.round(subtotal * (discountPercentage / 100)) : 0;
  const total = subtotal + delivery - discount;

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center gap-4 px-4">
        <div className="bg-primaryLight/40 rounded-full p-6 animate-pulse">
          <ShoppingBag size={48} className="text-primary" />
        </div>
        <h2 className="font-elegant text-2xl font-bold text-gray-700 mt-2">
          Your Cart is Empty
        </h2>
        <p className="text-gray-400 text-sm text-center max-w-xs">
          Looks like you haven't added any luxury fashion wear yet.
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
            Shopping Cart
            <span className="text-primary text-base font-normal ml-2">
              ({items.length} {items.length === 1 ? "item" : "items"})
            </span>
          </h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

          {/* LEFT - CART ITEMS */}
          <div className="lg:col-span-2 space-y-4">
            {items.map((item, idx) => (
              <div key={`${item.id}-${item.size}-${item.color}`}
                className="bg-white rounded-2xl shadow-sm p-4 flex gap-4 border border-gray-100 relative group transition hover:border-primaryLight">

                {/* IMAGE */}
                <Link to={`/product/${item.id}`} className="w-24 h-28 flex-shrink-0 overflow-hidden rounded-xl bg-gray-50">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-full object-cover object-top hover:scale-105 transition duration-300"
                  />
                </Link>

                {/* DETAILS */}
                <div className="flex-1 flex flex-col justify-between">
                  <div>
                    <p className="text-primary text-[10px] font-semibold uppercase tracking-widest">
                      {item.brand}
                    </p>
                    <h3 className="font-elegant text-sm font-bold text-gray-800 mt-0.5 line-clamp-1">
                      {item.name}
                    </h3>
                    <div className="flex gap-3 mt-1.5">
                      <span className="text-xs text-gray-400">
                        Size: <span className="text-gray-700 font-medium">{item.size}</span>
                      </span>
                      <span className="text-xs text-gray-400">
                        Color: <span className="text-gray-700 font-medium">{item.color}</span>
                      </span>
                    </div>
                  </div>

                  <div className="flex items-end justify-between mt-2">
                    {/* PRICE */}
                    <div className="flex items-baseline gap-2">
                      <span className="font-bold text-gray-900 text-base">₹{item.price}</span>
                      {item.originalPrice > item.price && (
                        <>
                          <span className="text-xs text-gray-400 line-through">
                            ₹{item.originalPrice}
                          </span>
                          <span className="text-[10px] text-green-500 font-semibold">
                            {Math.round(((item.originalPrice - item.price) / item.originalPrice) * 100)}% off
                          </span>
                        </>
                      )}
                    </div>

                    {/* QTY & DELETE */}
                    <div className="flex items-center gap-3">
                      <div className="flex items-center border border-gray-200 rounded-lg overflow-hidden h-8">
                        <button
                          onClick={() => updateQty(item.id, item.size, item.color, item.quantity, item.quantity, "dec")}
                          disabled={item.quantity <= 1}
                          className="px-2.5 hover:bg-gray-100 transition disabled:opacity-30 h-full">
                          <Minus size={12} />
                        </button>
                        <span className="px-3 text-xs font-semibold select-none">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQty(item.id, item.size, item.color, item.quantity, item.quantity, "inc")}
                          className="px-2.5 hover:bg-gray-100 transition h-full">
                          <Plus size={12} />
                        </button>
                      </div>
                      <button
                        onClick={() => removeItem(item.id, item.size, item.color)}
                        className="text-gray-400 hover:text-red-600 transition p-1 hover:bg-red-50 rounded-lg"
                        title="Remove Item">
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </div>
                </div>

              </div>
            ))}

            {/* COUPON */}
            <div className="bg-white rounded-2xl shadow-sm p-4 border border-gray-100">
              <div className="flex items-center gap-2 mb-3">
                <Tag size={16} className="text-primary" />
                <h3 className="font-semibold text-gray-800 text-sm">
                  Apply Coupon
                </h3>
              </div>
              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="Enter FASHION10 or LUXURY20"
                  value={coupon}
                  onChange={(e) => setCoupon(e.target.value)}
                  className="flex-1 border border-gray-200 rounded-lg px-4 py-2 text-sm outline-none focus:border-primary transition"
                />
                <button
                  onClick={handleApplyCoupon}
                  className="bg-primary text-white px-5 py-2 rounded-lg text-sm font-semibold hover:bg-primaryDark transition">
                  Apply
                </button>
              </div>
              {couponApplied && (
                <p className="text-green-500 text-xs mt-2 font-medium">
                  Coupon '{couponCode}' applied! {discountPercentage}% discount added.
                </p>
              )}
            </div>
          </div>

          {/* RIGHT - ORDER SUMMARY */}
          <div className="space-y-4">
            <div className="bg-white rounded-2xl shadow-sm p-5 border border-gray-100">
              <h2 className="font-elegant text-lg font-bold text-gray-800 mb-4 pb-3 border-b border-gray-100">
                Order Summary
              </h2>

              <div className="space-y-3 text-sm">
                <div className="flex justify-between text-gray-600">
                  <span>Subtotal ({items.reduce((acc, item) => acc + item.quantity, 0)} items)</span>
                  <span>₹{subtotal}</span>
                </div>
                {savings > 0 && (
                  <div className="flex justify-between text-green-500">
                    <span>Retail Savings</span>
                    <span>- ₹{savings}</span>
                  </div>
                )}
                <div className="flex justify-between text-gray-600">
                  <span>Delivery</span>
                  <span className={delivery === 0 ? "text-green-500 font-semibold" : ""}>
                    {delivery === 0 ? "Free" : `₹${delivery}`}
                  </span>
                </div>
                {couponApplied && (
                  <div className="flex justify-between text-green-500">
                    <span>Coupon Discount</span>
                    <span>- ₹{discount}</span>
                  </div>
                )}
                <div className="border-t border-gray-100 pt-3 flex justify-between font-bold text-gray-900 text-base">
                  <span>Total Amount</span>
                  <span>₹{total}</span>
                </div>
              </div>

              {(savings + discount) > 0 && (
                <p className="text-green-600 text-xs mt-3 font-semibold bg-green-50 px-3 py-2 rounded-lg text-center">
                  You save ₹{savings + discount} on this order! 🎉
                </p>
              )}

              <Link to="/checkout" className="block mt-4">
                <button className="w-full bg-primary text-white py-3.5 rounded-lg font-semibold hover:bg-primaryDark transition tracking-wide uppercase text-xs shadow-sm">
                  Proceed to Checkout
                </button>
              </Link>

              <Link to="/" className="block mt-2">
                <button className="w-full border border-primary text-primary py-3 rounded-lg font-semibold hover:bg-primaryLight/20 transition text-xs">
                  Continue Shopping
                </button>
              </Link>
            </div>

            {/* SECURE */}
            <div className="bg-white rounded-2xl shadow-sm p-4 border border-gray-100 text-center">
              <p className="text-xs text-gray-400">
                Secure Checkout — SSL Encrypted
              </p>
              <div className="flex justify-center gap-2 mt-2">
                {["UPI", "Visa", "Mastercard", "Razorpay"].map((p) => (
                  <span key={p}
                    className="bg-gray-50 text-[10px] text-gray-500 px-2 py-1 rounded border border-gray-100 font-medium">
                    {p}
                  </span>
                ))}
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Cart;