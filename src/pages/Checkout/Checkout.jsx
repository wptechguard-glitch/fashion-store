import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { clearCart } from "../../redux/cartSlice";
import { addOrder } from "../../redux/userSlice";
import { ArrowLeft, CreditCard, Shield, Truck } from "lucide-react";
import { createOrderApi } from "../../api/authApi";

const Checkout = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const items = useSelector((state) => state.cart.items);
  const couponApplied = useSelector((state) => state.cart.couponApplied);
  const discountPercentage = useSelector((state) => state.cart.discountPercentage);
  const { isLoggedIn } = useSelector((state) => state.user);

  const [formData, setFormData] = useState({
    fullName: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    pincode: "",
  });

  const [paymentMethod, setPaymentMethod] = useState("upi");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const subtotal = items.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const savings = items.reduce((acc, item) => acc + (item.originalPrice - item.price) * item.quantity, 0);
  const delivery = subtotal >= 499 ? 0 : 49;
  const discount = couponApplied ? Math.round(subtotal * (discountPercentage / 100)) : 0;
  const total = subtotal + delivery - discount;

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmitOrder = async (e) => {
    e.preventDefault();

    // Basic Validation
    if (
      !formData.fullName ||
      !formData.phone ||
      !formData.address ||
      !formData.city ||
      !formData.state ||
      !formData.pincode
    ) {
      alert("Please fill in all shipping details!");
      return;
    }

    if (items.length === 0) {
      alert("Your cart is empty!");
      return;
    }

    setIsSubmitting(true);

    const newOrderLocal = {
      orderId: `FS-ORD-${Math.floor(Math.random() * 900000 + 100000)}`,
      items: [...items],
      shippingDetails: { ...formData },
      paymentMethod,
      totalAmount: total,
      date: new Date().toLocaleDateString("en-IN", {
        year: "numeric",
        month: "long",
        day: "numeric",
      }),
    };

    try {
      if (isLoggedIn) {
        const response = await createOrderApi({
          items: items.map((i) => ({
            id: i.id,
            name: i.name,
            price: i.price,
            quantity: i.quantity,
            size: i.size,
            color: i.color,
            image: i.image,
          })),
          shippingDetails: formData,
          paymentMethod,
          totalAmount: total,
        });

        // Save backend order response
        dispatch(addOrder(response.data));
        dispatch(clearCart());
        navigate("/order-success", { state: { order: response.data } });
      } else {
        // Fallback for guests / offline
        dispatch(addOrder(newOrderLocal));
        dispatch(clearCart());
        navigate("/order-success", { state: { order: newOrderLocal } });
      }
    } catch (err) {
      console.error("Order creation api failed, falling back to local storage:", err);
      dispatch(addOrder(newOrderLocal));
      dispatch(clearCart());
      navigate("/order-success", { state: { order: newOrderLocal } });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center gap-4 px-4">
        <h2 className="font-elegant text-2xl font-bold text-gray-700">
          No Items for Checkout
        </h2>
        <Link to="/"
          className="bg-primary text-white px-8 py-3 rounded-lg font-semibold hover:bg-primaryDark transition text-sm">
          Go back Home
        </Link>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 min-h-screen py-6">
      <div className="max-w-7xl mx-auto px-4">
        {/* HEADER */}
        <div className="flex items-center gap-3 mb-6">
          <Link to="/cart" className="text-primary hover:text-primaryDark transition">
            <ArrowLeft size={20} />
          </Link>
          <h1 className="font-elegant text-2xl font-bold text-gray-800">
            Checkout Details
          </h1>
        </div>

        <form onSubmit={handleSubmitOrder} className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* LEFT - SHIPPING & PAYMENT */}
          <div className="lg:col-span-2 space-y-6">
            {/* SHIPPING ADDRESS */}
            <div className="bg-white rounded-2xl shadow-sm p-6 border border-gray-100">
              <h2 className="font-elegant text-lg font-bold text-gray-800 mb-4 pb-2 border-b border-gray-100 flex items-center gap-2">
                <Truck size={18} className="text-primary" /> Shipping Address
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex flex-col gap-1 md:col-span-2">
                  <label className="text-xs font-semibold text-gray-500">Full Name *</label>
                  <input
                    type="text"
                    name="fullName"
                    required
                    value={formData.fullName}
                    onChange={handleInputChange}
                    placeholder="Enter your full name"
                    className="border border-gray-200 rounded-lg px-4 py-2 text-sm outline-none focus:border-primary transition"
                  />
                </div>

                <div className="flex flex-col gap-1">
                  <label className="text-xs font-semibold text-gray-500">Phone Number *</label>
                  <input
                    type="tel"
                    name="phone"
                    required
                    value={formData.phone}
                    onChange={handleInputChange}
                    placeholder="10-digit mobile number"
                    className="border border-gray-200 rounded-lg px-4 py-2 text-sm outline-none focus:border-primary transition"
                  />
                </div>

                <div className="flex flex-col gap-1">
                  <label className="text-xs font-semibold text-gray-500">PIN Code *</label>
                  <input
                    type="text"
                    name="pincode"
                    required
                    value={formData.pincode}
                    onChange={handleInputChange}
                    placeholder="6-digit pincode"
                    className="border border-gray-200 rounded-lg px-4 py-2 text-sm outline-none focus:border-primary transition"
                  />
                </div>

                <div className="flex flex-col gap-1 md:col-span-2">
                  <label className="text-xs font-semibold text-gray-500">Flat / House No. & Street *</label>
                  <textarea
                    name="address"
                    required
                    rows="3"
                    value={formData.address}
                    onChange={handleInputChange}
                    placeholder="Address details"
                    className="border border-gray-200 rounded-lg px-4 py-2 text-sm outline-none focus:border-primary transition resize-none"
                  />
                </div>

                <div className="flex flex-col gap-1">
                  <label className="text-xs font-semibold text-gray-500">City *</label>
                  <input
                    type="text"
                    name="city"
                    required
                    value={formData.city}
                    onChange={handleInputChange}
                    placeholder="City"
                    className="border border-gray-200 rounded-lg px-4 py-2 text-sm outline-none focus:border-primary transition"
                  />
                </div>

                <div className="flex flex-col gap-1">
                  <label className="text-xs font-semibold text-gray-500">State *</label>
                  <input
                    type="text"
                    name="state"
                    required
                    value={formData.state}
                    onChange={handleInputChange}
                    placeholder="State"
                    className="border border-gray-200 rounded-lg px-4 py-2 text-sm outline-none focus:border-primary transition"
                  />
                </div>
              </div>
            </div>

            {/* PAYMENT TYPE */}
            <div className="bg-white rounded-2xl shadow-sm p-6 border border-gray-100">
              <h2 className="font-elegant text-lg font-bold text-gray-800 mb-4 pb-2 border-b border-gray-100 flex items-center gap-2">
                <CreditCard size={18} className="text-primary" /> Payment Method
              </h2>

              <div className="space-y-3">
                {[
                  { id: "upi", title: "UPI / Scan QR (PhonePe, GPay, Paytm)", desc: "Pay quickly via any UPI app" },
                  { id: "card", title: "Debit / Credit Cards", desc: "Visa, Mastercard, RuPay supported" },
                  { id: "cod", title: "Cash on Delivery (COD)", desc: "Pay cash upon delivery at your doorstep" },
                ].map((item) => (
                  <div
                    key={item.id}
                    onClick={() => setPaymentMethod(item.id)}
                    className={`border rounded-xl p-4 flex items-start gap-3 cursor-pointer transition ${
                      paymentMethod === item.id ? "border-primary bg-primaryLight/10" : "border-gray-200 hover:border-primary"
                    }`}>
                    <input
                      type="radio"
                      name="paymentGroup"
                      checked={paymentMethod === item.id}
                      onChange={() => setPaymentMethod(item.id)}
                      className="accent-primary mt-1"
                    />
                    <div>
                      <h4 className="text-sm font-semibold text-gray-800">{item.title}</h4>
                      <p className="text-xs text-gray-400 mt-0.5">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* RIGHT - ORDER REVIEW */}
          <div>
            <div className="bg-white rounded-2xl shadow-sm p-5 border border-gray-100">
              <h2 className="font-elegant text-lg font-bold text-gray-800 mb-4 pb-3 border-b border-gray-100">
                Order Summary
              </h2>

              {/* LIST ITEMS SUMMARY */}
              <div className="space-y-3 max-h-48 overflow-y-auto mb-4 pr-1">
                {items.map((item) => (
                  <div key={`${item.id}-${item.size}-${item.color}`} className="flex gap-3 text-xs border-b border-gray-50 pb-2">
                    <img src={item.image} alt="" className="w-10 h-12 object-cover rounded bg-gray-50 object-top" />
                    <div className="flex-1 min-w-0">
                      <h4 className="font-semibold text-gray-800 truncate">{item.name}</h4>
                      <p className="text-gray-400 text-[10px] mt-0.5">
                        Qty: {item.quantity} | Size: {item.size} | Color: {item.color}
                      </p>
                      <p className="text-gray-900 font-bold mt-0.5">₹{item.price * item.quantity}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* RECEIPT SUMMARY */}
              <div className="space-y-3 text-xs text-gray-600 border-t border-gray-100 pt-3">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span>₹{subtotal}</span>
                </div>
                {savings > 0 && (
                  <div className="flex justify-between text-green-500">
                    <span>Retail Savings</span>
                    <span>- ₹{savings}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span>Delivery</span>
                  <span>{delivery === 0 ? "Free" : `₹${delivery}`}</span>
                </div>
                {couponApplied && (
                  <div className="flex justify-between text-green-500">
                    <span>Coupon Discount</span>
                    <span>- ₹{discount}</span>
                  </div>
                )}
                <div className="border-t border-gray-100 pt-3 flex justify-between font-bold text-gray-900 text-sm">
                  <span>Total Amount</span>
                  <span>₹{total}</span>
                </div>
              </div>

              <button
                type="submit"
                className="w-full mt-5 bg-primary text-white py-3.5 rounded-lg font-semibold hover:bg-primaryDark transition tracking-wide uppercase text-xs shadow-sm">
                Place Order (₹{total})
              </button>
            </div>

            {/* SECURITY LOGO */}
            <div className="bg-white rounded-2xl shadow-sm p-4 border border-gray-100 mt-4 flex items-center justify-center gap-2 text-center text-xs text-gray-400">
              <Shield size={14} className="text-green-500" />
              <span>SSL Secure Transactions — Verified</span>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Checkout;
