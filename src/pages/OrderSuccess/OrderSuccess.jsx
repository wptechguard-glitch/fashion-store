import React from "react";
import { Link, useLocation, Navigate } from "react-router-dom";
import { CheckCircle, ShoppingBag, Calendar, MapPin, CreditCard } from "lucide-react";

const OrderSuccess = () => {
  const location = useLocation();
  const order = location.state?.order;

  // Prevent direct URL access without placing an order
  if (!order) {
    return <Navigate to="/" replace />;
  }

  // Delivery estimate is 5 days from order date
  const deliveryEstimateDate = new Date();
  deliveryEstimateDate.setDate(deliveryEstimateDate.getDate() + 5);
  const formattedEstimate = deliveryEstimateDate.toLocaleDateString("en-IN", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <div className="bg-gray-50 min-h-screen py-10 px-4">
      <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        {/* SUCCESS ICON HEADER */}
        <div className="bg-gradient-to-r from-primary to-primaryDark p-8 text-center text-white flex flex-col items-center">
          <div className="bg-white/20 p-4 rounded-full mb-3 animate-bounce">
            <CheckCircle size={48} className="text-white fill-white/10" />
          </div>
          <h1 className="font-elegant text-2xl md:text-3xl font-bold">
            Order Placed Successfully!
          </h1>
          <p className="text-primaryLight text-xs tracking-wider uppercase mt-1">
            Thank you for shopping with us
          </p>
        </div>

        {/* ORDER SPECS */}
        <div className="p-6 md:p-8 space-y-6">
          {/* CONFIRMATION ID & DATE */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pb-5 border-b border-gray-100 text-xs text-gray-500">
            <div>
              <p className="font-semibold uppercase tracking-wider text-[10px]">Order Reference</p>
              <p className="text-gray-900 font-bold text-sm mt-0.5">{order.orderId}</p>
            </div>
            <div className="md:text-right">
              <p className="font-semibold uppercase tracking-wider text-[10px]">Order Date</p>
              <p className="text-gray-900 font-medium text-sm mt-0.5">{order.date}</p>
            </div>
          </div>

          {/* ESTIMATE DATE */}
          <div className="bg-green-50 border border-green-100 rounded-xl p-4 flex gap-3 items-center">
            <Calendar className="text-green-600 flex-shrink-0" size={20} />
            <div>
              <h4 className="text-xs font-semibold text-green-800">Estimated Delivery</h4>
              <p className="text-xs text-green-700 font-medium mt-0.5">{formattedEstimate}</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* DELIVERY ADDRESS */}
            <div className="space-y-2">
              <h3 className="font-elegant font-bold text-gray-800 text-sm flex items-center gap-1.5 uppercase tracking-wide">
                <MapPin size={16} className="text-primary" /> Shipping To
              </h3>
              <div className="bg-gray-50 border border-gray-100 rounded-xl p-4 text-xs text-gray-600 space-y-1">
                <p className="font-bold text-gray-900">{order.shippingDetails?.fullName}</p>
                <p>{order.shippingDetails?.address}</p>
                <p>{order.shippingDetails?.city}, {order.shippingDetails?.state} - {order.shippingDetails?.pincode}</p>
                <p className="pt-1 text-[10px]">Phone: <span className="font-medium text-gray-900">{order.shippingDetails?.phone}</span></p>
              </div>
            </div>

            {/* PAYMENT METHOD */}
            <div className="space-y-2">
              <h3 className="font-elegant font-bold text-gray-800 text-sm flex items-center gap-1.5 uppercase tracking-wide">
                <CreditCard size={16} className="text-primary" /> Payment Method
              </h3>
              <div className="bg-gray-50 border border-gray-100 rounded-xl p-4 text-xs text-gray-600 space-y-1">
                <p className="font-bold text-gray-900 capitalize">{order.paymentMethod} Payment</p>
                <p>Status: <span className="text-green-600 font-bold">Paid</span></p>
                <p className="pt-2 text-sm font-bold text-gray-900">Total Paid: ₹{order.totalAmount}</p>
              </div>
            </div>
          </div>

          {/* ITEM SUMMARY */}
          <div className="space-y-3 pt-4 border-t border-gray-100">
            <h3 className="font-elegant font-bold text-gray-800 text-sm flex items-center gap-1.5 uppercase tracking-wide">
              <ShoppingBag size={16} className="text-primary" /> Items Purchased
            </h3>
            <div className="space-y-2">
              {order.items?.map((item) => (
                <div key={`${item.id}-${item.size}-${item.color}`} className="flex justify-between items-center gap-4 text-xs border-b border-gray-50 pb-2">
                  <div className="flex gap-3">
                    <img src={item.image} alt="" className="w-10 h-12 object-cover rounded bg-gray-50 object-top" />
                    <div>
                      <h4 className="font-semibold text-gray-800 line-clamp-1">{item.name}</h4>
                      <p className="text-gray-400 text-[10px] mt-0.5">
                        Size: {item.size} | Color: {item.color} | Qty: {item.quantity}
                      </p>
                    </div>
                  </div>
                  <span className="font-bold text-gray-900">₹{item.price * item.quantity}</span>
                </div>
              ))}
            </div>
          </div>

          {/* CONTINUE BUTTON */}
          <div className="pt-6 text-center">
            <Link to="/">
              <button className="bg-luxury text-white hover:bg-black px-10 py-3 rounded-lg font-semibold transition tracking-wide uppercase text-xs shadow-sm">
                Continue Shopping
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderSuccess;
