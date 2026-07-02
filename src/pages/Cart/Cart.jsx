import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Trash2, Plus, Minus, ShoppingBag, ArrowLeft, Tag } from "lucide-react";

const initialItems = [
  {
    id: 1,
    name: "Women Printed Anarkali Kurta",
    brand: "FashionStore",
    price: 499,
    originalPrice: 999,
    image: "https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=200",
    size: "M",
    color: "Rose",
    quantity: 1,
  },
  {
    id: 2,
    name: "Men Slim Fit Casual Shirt",
    brand: "FashionStore",
    price: 399,
    originalPrice: 799,
    image: "https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?w=200",
    size: "L",
    color: "Navy",
    quantity: 1,
  },
];

const Cart = () => {
  const [items, setItems] = useState(initialItems);
  const [coupon, setCoupon] = useState("");
  const [couponApplied, setCouponApplied] = useState(false);

  const updateQty = (id, type) => {
    setItems(items.map(item =>
      item.id === id
        ? { ...item, quantity: type === "inc" ? item.quantity + 1 : Math.max(1, item.quantity - 1) }
        : item
    ));
  };

  const removeItem = (id) => {
    setItems(items.filter(item => item.id !== id));
  };

  const subtotal = items.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const savings = items.reduce((acc, item) => acc + (item.originalPrice - item.price) * item.quantity, 0);
  const delivery = subtotal >= 499 ? 0 : 49;
  const discount = couponApplied ? Math.round(subtotal * 0.1) : 0;
  const total = subtotal + delivery - discount;

  const applyCoupon = () => {
    if (coupon.toUpperCase() === "FASHION10") {
      setCouponApplied(true);
    } else {
      alert("Invalid coupon code!");
    }
  };

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center gap-4">
        <ShoppingBag size={64} className="text-primaryLight" />
        <h2 className="font-elegant text-2xl font-bold text-gray-700">
          Your Cart is Empty
        </h2>
        <p className="text-gray-400 text-sm">
          Looks like you haven't added anything yet
        </p>
        <Link to="/"
          className="bg-primary text-white px-8 py-3 rounded-lg font-semibold hover:bg-primaryDark transition tracking-wide uppercase text-sm">
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
              ({items.length} items)
            </span>
          </h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

          {/* LEFT - CART ITEMS */}
          <div className="lg:col-span-2 space-y-4">
            {items.map((item) => (
              <div key={item.id}
                className="bg-white rounded-2xl shadow-sm p-4 flex gap-4 border border-gray-100">

                {/* IMAGE */}
                <Link to={`/product/${item.id}`}>
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-24 h-28 object-cover rounded-xl"
                  />
                </Link>

                {/* DETAILS */}
                <div className="flex-1">
                  <p className="text-primary text-xs font-semibold uppercase tracking-widest">
                    {item.brand}
                  </p>
                  <h3 className="font-elegant text-base font-bold text-gray-800 mt-0.5">
                    {item.name}
                  </h3>
                  <div className="flex gap-3 mt-1">
                    <span className="text-xs text-gray-400">
                      Size: <span className="text-gray-700 font-medium">{item.size}</span>
                    </span>
                    <span className="text-xs text-gray-400">
                      Color: <span className="text-gray-700 font-medium">{item.color}</span>
                    </span>
                  </div>

                  {/* PRICE */}
                  <div className="flex items-center gap-2 mt-2">
                    <span className="font-bold text-gray-900">₹{item.price}</span>
                    <span className="text-xs text-gray-400 line-through">
                      ₹{item.originalPrice}
                    </span>
                    <span className="text-xs text-green-500 font-semibold">
                      {Math.round((item.originalPrice - item.price) / item.originalPrice * 100)}% off
                    </span>
                  </div>

                  {/* QTY & DELETE */}
                  <div className="flex items-center justify-between mt-3">
                    <div className="flex items-center gap-2 border border-gray-200 rounded-lg overflow-hidden">
                      <button
                        onClick={() => updateQty(item.id, "dec")}
                        className="px-3 py-1.5 hover:bg-gray-100 transition">
                        <Minus size={14} />
                      </button>
                      <span className="px-3 text-sm font-semibold">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => updateQty(item.id, "inc")}
                        className="px-3 py-1.5 hover:bg-gray-100 transition">
                        <Plus size={14} />
                      </button>
                    </div>
                    <button
                      onClick={() => removeItem(item.id)}
                      className="text-red-400 hover:text-red-600 transition flex items-center gap-1 text-xs">
                      <Trash2 size={14} />
                      Remove
                    </button>
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
                  placeholder="Enter coupon code (FASHION10)"
                  value={coupon}
                  onChange={(e) => setCoupon(e.target.value)}
                  className="flex-1 border border-gray-200 rounded-lg px-4 py-2 text-sm outline-none focus:border-primary transition"
                />
                <button
                  onClick={applyCoupon}
                  className="bg-primary text-white px-5 py-2 rounded-lg text-sm font-semibold hover:bg-primaryDark transition">
                  Apply
                </button>
              </div>
              {couponApplied && (
                <p className="text-green-500 text-xs mt-2 font-medium">
                  Coupon applied! 10% discount added.
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
                  <span>Subtotal ({items.length} items)</span>
                  <span>₹{subtotal}</span>
                </div>
                <div className="flex justify-between text-green-500">
                  <span>Total Savings</span>
                  <span>- ₹{savings}</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Delivery</span>
                  <span className={delivery === 0 ? "text-green-500" : ""}>
                    {delivery === 0 ? "Free" : `₹${delivery}`}
                  </span>
                </div>
                {couponApplied && (
                  <div className="flex justify-between text-green-500">
                    <span>Coupon Discount</span>
                    <span>- ₹{discount}</span>
                  </div>
                )}
                <div className="border-t border-gray-100 pt-3 flex justify-between font-bold text-gray-900">
                  <span>Total Amount</span>
                  <span>₹{total}</span>
                </div>
              </div>

              <p className="text-green-500 text-xs mt-3 font-medium">
                You save ₹{savings + discount} on this order!
              </p>

              <Link to="/checkout">
                <button className="w-full mt-4 bg-primary text-white py-3.5 rounded-lg font-semibold hover:bg-primaryDark transition tracking-wide uppercase text-sm">
                  Proceed to Checkout
                </button>
              </Link>

              <Link to="/">
                <button className="w-full mt-2 border border-primary text-primary py-3 rounded-lg font-semibold hover:bg-primaryLight transition text-sm">
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
                    className="bg-gray-100 text-xs text-gray-600 px-2 py-1 rounded font-medium">
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