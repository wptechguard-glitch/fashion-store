import React, { useState, useEffect } from "react";
import { Link, Navigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logoutUser, setOrders, loginUser } from "../../redux/userSlice";
import { getOrdersApi, updateProfileApi } from "../../api/authApi";
import {
  User, LogOut, ArrowLeft, ShoppingBag, Package, Phone, Mail, MapPin,
  Heart, Settings, Gift, Shield, ChevronRight, Crown, Truck, Star,
} from "lucide-react";

const Profile = () => {
  const dispatch = useDispatch();
  const { currentUser, isLoggedIn, orders } = useSelector((state) => state.user);
  const wishlistItems = useSelector((state) => state.wishlist.items);
  const cartItems = useSelector((state) => state.cart.items);

  const [activeSection, setActiveSection] = useState("overview");
  const [fullName, setFullName] = useState(currentUser?.name || "");
  const [phone, setPhone] = useState(currentUser?.phone || "");
  const [isUpdating, setIsUpdating] = useState(false);
  const [updateSuccess, setUpdateSuccess] = useState(false);

  useEffect(() => {
    if (isLoggedIn) {
      getOrdersApi()
        .then((res) => {
          dispatch(setOrders(res.data));
        })
        .catch((err) => {
          console.error("Failed to load user orders:", err);
        });
    }
  }, [isLoggedIn, dispatch]);

  useEffect(() => {
    if (currentUser) {
      setFullName(currentUser.name || "");
      setPhone(currentUser.phone || "");
    }
  }, [currentUser]);

  const handleLogout = () => {
    dispatch(logoutUser());
  };

  if (!isLoggedIn) {
    return <Navigate to="/login" replace />;
  }

  const totalSpent = orders.reduce((sum, o) => sum + o.totalAmount, 0);
  const memberTier = totalSpent >= 10000 ? "Platinum" : totalSpent >= 5000 ? "Gold" : totalSpent >= 1000 ? "Silver" : "Bronze";
  const tierColor = {
    Platinum: "from-gray-700 to-gray-900 text-gray-100",
    Gold: "from-yellow-600 to-yellow-700 text-yellow-50",
    Silver: "from-gray-400 to-gray-500 text-white",
    Bronze: "from-orange-700 to-orange-800 text-orange-50",
  }[memberTier];

  const sidebarItems = [
    { id: "overview", label: "Overview", icon: User },
    { id: "orders", label: "My Orders", icon: Package, count: orders.length },
    { id: "wishlist", label: "Wishlist", icon: Heart, count: wishlistItems.length },
    { id: "addresses", label: "Addresses", icon: MapPin },
    { id: "settings", label: "Settings", icon: Settings },
  ];

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* GRADIENT HEADER */}
      <div className="bg-gradient-to-r from-luxury via-primaryDark to-primary">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex items-center justify-between mb-6">
            <Link to="/" className="text-primaryLight hover:text-white transition flex items-center gap-1.5 text-sm font-semibold group">
              <ArrowLeft size={16} className="group-hover:-translate-x-0.5 transition-transform" /> Back to store
            </Link>
            <button
              onClick={handleLogout}
              className="flex items-center gap-1.5 text-xs font-semibold text-primaryLight hover:text-white bg-white/10 px-4 py-2 rounded-lg border border-white/10 hover:bg-white/20 backdrop-blur-sm transition">
              <LogOut size={14} />
              Logout
            </button>
          </div>

          {/* USER HERO */}
          <div className="flex flex-col sm:flex-row items-center gap-5">
            <div className="w-20 h-20 bg-white/15 backdrop-blur-md rounded-2xl flex items-center justify-center text-white border border-white/20">
              <User size={38} />
            </div>
            <div className="text-center sm:text-left">
              <h1 className="font-elegant text-2xl md:text-3xl font-bold text-white">
                {currentUser?.name}
              </h1>
              <p className="text-primaryLight/80 text-sm mt-0.5">{currentUser?.email}</p>
              <div className={`inline-flex items-center gap-1.5 mt-2 bg-gradient-to-r ${tierColor} px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest`}>
                <Crown size={12} /> {memberTier} Member
              </div>
            </div>
          </div>

          {/* STAT CARDS */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-6">
            {[
              { icon: Package, label: "Total Orders", value: orders.length, color: "text-blue-300" },
              { icon: Star, label: "Total Spent", value: `₹${totalSpent.toLocaleString("en-IN")}`, color: "text-gold" },
              { icon: Heart, label: "Wishlist", value: wishlistItems.length, color: "text-pink-300" },
              { icon: ShoppingBag, label: "In Cart", value: cartItems.reduce((a, c) => a + c.quantity, 0), color: "text-green-300" },
            ].map((stat) => (
              <div key={stat.label} className="bg-white/10 backdrop-blur-sm rounded-xl p-3 border border-white/10 text-center">
                <stat.icon size={18} className={`${stat.color} mx-auto mb-1`} />
                <p className="text-white font-elegant text-lg font-bold">{stat.value}</p>
                <p className="text-primaryLight/60 text-[10px] uppercase tracking-wider">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CONTENT */}
      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* SIDEBAR */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden sticky top-24">
              {sidebarItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => setActiveSection(item.id)}
                  className={`w-full flex items-center justify-between px-5 py-3.5 text-sm transition-all border-l-3 ${
                    activeSection === item.id
                      ? "bg-primary/5 text-primary border-l-primary font-semibold"
                      : "text-gray-600 border-l-transparent hover:bg-gray-50"
                  }`}>
                  <div className="flex items-center gap-3">
                    <item.icon size={16} />
                    <span>{item.label}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    {item.count > 0 && (
                      <span className="bg-primary/10 text-primary text-[10px] font-bold px-2 py-0.5 rounded-full">{item.count}</span>
                    )}
                    <ChevronRight size={14} className="text-gray-300" />
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* MAIN PANEL */}
          <div className="lg:col-span-3">
            {/* OVERVIEW */}
            {activeSection === "overview" && (
              <div className="space-y-6">
                {/* QUICK ACTIONS */}
                <div className="bg-white rounded-2xl shadow-sm p-6 border border-gray-100">
                  <h3 className="font-elegant font-bold text-gray-800 text-lg mb-4">Quick Actions</h3>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                    {[
                      { icon: Package, label: "Track Order", desc: "View live status", link: "#", color: "bg-blue-50 text-blue-600" },
                      { icon: Heart, label: "Wishlist", desc: `${wishlistItems.length} items`, link: "/wishlist", color: "bg-pink-50 text-pink-600" },
                      { icon: Gift, label: "Offers", desc: "Check deals", link: "/category/sale", color: "bg-amber-50 text-amber-600" },
                      { icon: Shield, label: "Support", desc: "Get help", link: "#", color: "bg-green-50 text-green-600" },
                    ].map((action) => (
                      <Link key={action.label} to={action.link}
                        className="flex flex-col items-center gap-2 p-4 rounded-xl border border-gray-100 hover:border-primary/30 hover:shadow-md transition-all group">
                        <div className={`${action.color} p-3 rounded-xl group-hover:scale-110 transition-transform`}>
                          <action.icon size={20} />
                        </div>
                        <div className="text-center">
                          <p className="text-xs font-semibold text-gray-800">{action.label}</p>
                          <p className="text-[10px] text-gray-400">{action.desc}</p>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>

                {/* RECENT ORDERS PEEK */}
                <div className="bg-white rounded-2xl shadow-sm p-6 border border-gray-100">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="font-elegant font-bold text-gray-800 text-lg">Recent Orders</h3>
                    {orders.length > 0 && (
                      <button onClick={() => setActiveSection("orders")} className="text-primary text-xs font-semibold hover:underline">
                        View All →
                      </button>
                    )}
                  </div>
                  {orders.length === 0 ? (
                    <div className="flex flex-col items-center justify-center py-12 text-center gap-3">
                      <ShoppingBag size={48} className="text-gray-200" />
                      <p className="text-gray-400 text-sm font-semibold">No orders yet</p>
                      <Link to="/" className="mt-1 bg-primary text-white px-6 py-2.5 rounded-lg text-xs font-semibold hover:bg-primaryDark transition tracking-wide uppercase">
                        Start Shopping
                      </Link>
                    </div>
                  ) : (
                    <div className="space-y-3">
                      {orders.slice(-3).reverse().map((order) => (
                        <div key={order.orderId} className="flex items-center justify-between p-3 rounded-xl bg-gray-50 border border-gray-100 hover:border-primary/20 transition">
                          <div className="flex items-center gap-3">
                            <div className="bg-primary/10 p-2 rounded-lg">
                              <Truck size={16} className="text-primary" />
                            </div>
                            <div>
                              <p className="text-xs font-bold text-gray-800">{order.orderId}</p>
                              <p className="text-[10px] text-gray-400">{order.date} • {order.items?.length} item(s)</p>
                            </div>
                          </div>
                          <div className="text-right">
                            <p className="text-xs font-bold text-gray-800">₹{order.totalAmount}</p>
                            <span className="text-[10px] bg-green-500/10 text-green-600 px-2 py-0.5 rounded-full font-semibold">Processing</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* ACCOUNT INFO */}
                <div className="bg-white rounded-2xl shadow-sm p-6 border border-gray-100">
                  <h3 className="font-elegant font-bold text-gray-800 text-lg mb-4">Account Information</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                    <div className="flex items-center gap-3 p-3 rounded-xl bg-gray-50">
                      <Mail size={16} className="text-primary" />
                      <div>
                        <p className="text-[10px] text-gray-400 font-semibold uppercase">Email</p>
                        <p className="text-gray-800 font-medium">{currentUser?.email}</p>
                      </div>
                    </div>
                    {currentUser?.phone && (
                      <div className="flex items-center gap-3 p-3 rounded-xl bg-gray-50">
                        <Phone size={16} className="text-primary" />
                        <div>
                          <p className="text-[10px] text-gray-400 font-semibold uppercase">Phone</p>
                          <p className="text-gray-800 font-medium">{currentUser?.phone}</p>
                        </div>
                      </div>
                    )}
                    <div className="flex items-center gap-3 p-3 rounded-xl bg-gray-50">
                      <MapPin size={16} className="text-primary" />
                      <div>
                        <p className="text-[10px] text-gray-400 font-semibold uppercase">Location</p>
                        <p className="text-gray-800 font-medium">India</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 p-3 rounded-xl bg-gray-50">
                      <Crown size={16} className="text-gold" />
                      <div>
                        <p className="text-[10px] text-gray-400 font-semibold uppercase">Membership</p>
                        <p className="text-gray-800 font-medium">{memberTier} Tier</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* ORDERS */}
            {activeSection === "orders" && (
              <div className="bg-white rounded-2xl shadow-sm p-6 border border-gray-100 min-h-[400px]">
                <h2 className="font-elegant text-lg font-bold text-gray-800 mb-5 pb-3 border-b border-gray-100 flex items-center gap-2">
                  <Package size={18} className="text-primary" /> All Orders
                </h2>
                {orders.length === 0 ? (
                  <div className="flex flex-col items-center justify-center py-20 text-center gap-3">
                    <ShoppingBag size={48} className="text-gray-200" />
                    <p className="text-gray-400 text-sm font-semibold">No orders placed yet!</p>
                    <Link to="/" className="mt-2 bg-primary text-white px-6 py-2.5 rounded-lg text-xs font-semibold hover:bg-primaryDark transition tracking-wide uppercase">
                      Shop Now
                    </Link>
                  </div>
                ) : (
                  <div className="space-y-5">
                    {[...orders].reverse().map((order) => (
                      <div key={order.orderId} className="border border-gray-100 rounded-xl overflow-hidden transition hover:border-primary/20 hover:shadow-sm">
                        {/* Header */}
                        <div className="bg-gray-50 px-4 py-3 flex flex-col sm:flex-row justify-between sm:items-center gap-2 text-xs border-b border-gray-100">
                          <div className="flex items-center gap-4">
                            <div>
                              <p className="text-gray-400 font-medium text-[10px] uppercase">Order</p>
                              <p className="font-bold text-gray-800">{order.orderId}</p>
                            </div>
                            <div>
                              <p className="text-gray-400 font-medium text-[10px] uppercase">Date</p>
                              <p className="font-semibold text-gray-800">{order.date}</p>
                            </div>
                          </div>
                          <div className="flex items-center gap-3">
                            <span className="bg-green-500/10 text-green-600 px-2.5 py-1 rounded-full font-semibold text-[10px]">Processing</span>
                            <span className="font-bold text-primary text-sm">₹{order.totalAmount}</span>
                          </div>
                        </div>
                        {/* Items */}
                        <div className="p-4 space-y-3">
                          {order.items?.map((item) => (
                            <div key={`${item.id}-${item.size}-${item.color}`} className="flex justify-between items-center gap-4 text-xs">
                              <div className="flex gap-3">
                                <img src={item.image} alt="" className="w-12 h-14 object-cover rounded-lg bg-gray-50 object-top" />
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
                        {/* Shipping */}
                        <div className="bg-gray-50 px-4 py-2.5 text-[10px] text-gray-500 border-t border-gray-100">
                          <span className="font-bold text-gray-600">Ship to: </span>
                          {order.shippingDetails?.fullName}, {order.shippingDetails?.city}, {order.shippingDetails?.state} - {order.shippingDetails?.pincode}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* WISHLIST */}
            {activeSection === "wishlist" && (
              <div className="bg-white rounded-2xl shadow-sm p-6 border border-gray-100 min-h-[400px]">
                <h2 className="font-elegant text-lg font-bold text-gray-800 mb-5 pb-3 border-b border-gray-100 flex items-center gap-2">
                  <Heart size={18} className="text-primary" /> Wishlist Items
                </h2>
                {wishlistItems.length === 0 ? (
                  <div className="flex flex-col items-center justify-center py-20 text-center gap-3">
                    <Heart size={48} className="text-gray-200" />
                    <p className="text-gray-400 text-sm font-semibold">Your wishlist is empty</p>
                    <Link to="/" className="mt-2 bg-primary text-white px-6 py-2.5 rounded-lg text-xs font-semibold hover:bg-primaryDark transition tracking-wide uppercase">
                      Explore Products
                    </Link>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {wishlistItems.map((item) => (
                      <Link key={item.id} to={`/product/${item.id}`}
                        className="flex gap-3 p-3 rounded-xl border border-gray-100 hover:border-primary/20 hover:shadow-sm transition">
                        <img src={item.image} alt="" className="w-16 h-20 object-cover rounded-lg bg-gray-50 object-top" />
                        <div className="flex-1 min-w-0">
                          <h4 className="text-xs font-semibold text-gray-800 line-clamp-2">{item.name}</h4>
                          <p className="text-sm font-bold text-primary mt-1">₹{item.price}</p>
                          {item.originalPrice > item.price && (
                            <p className="text-[10px] text-gray-400 line-through">₹{item.originalPrice}</p>
                          )}
                        </div>
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* ADDRESSES */}
            {activeSection === "addresses" && (
              <div className="bg-white rounded-2xl shadow-sm p-6 border border-gray-100 min-h-[400px]">
                <h2 className="font-elegant text-lg font-bold text-gray-800 mb-5 pb-3 border-b border-gray-100 flex items-center gap-2">
                  <MapPin size={18} className="text-primary" /> Saved Addresses
                </h2>
                {orders.length > 0 ? (
                  <div className="space-y-3">
                    {/* Extract unique addresses from orders */}
                    {orders.filter((o, i, a) => a.findIndex((x) => x.shippingDetails?.pincode === o.shippingDetails?.pincode) === i)
                      .map((order) => (
                        <div key={order.orderId} className="p-4 rounded-xl border border-gray-100 hover:border-primary/20 transition">
                          <p className="text-sm font-bold text-gray-800">{order.shippingDetails?.fullName}</p>
                          <p className="text-xs text-gray-500 mt-1">{order.shippingDetails?.address}</p>
                          <p className="text-xs text-gray-500">{order.shippingDetails?.city}, {order.shippingDetails?.state} - {order.shippingDetails?.pincode}</p>
                          <p className="text-xs text-gray-400 mt-1">Phone: {order.shippingDetails?.phone}</p>
                        </div>
                      ))}
                  </div>
                ) : (
                  <div className="flex flex-col items-center justify-center py-20 text-center gap-3">
                    <MapPin size={48} className="text-gray-200" />
                    <p className="text-gray-400 text-sm font-semibold">No saved addresses</p>
                    <p className="text-gray-400 text-xs max-w-xs">Addresses will be saved here when you place an order.</p>
                  </div>
                )}
              </div>
            )}

            {/* SETTINGS */}
            {activeSection === "settings" && (
              <div className="bg-white rounded-2xl shadow-sm p-6 border border-gray-100 min-h-[400px]">
                <h2 className="font-elegant text-lg font-bold text-gray-800 mb-5 pb-3 border-b border-gray-100 flex items-center gap-2">
                  <Settings size={18} className="text-primary" /> Account Settings
                </h2>
                
                {/* UPDATE DETAILS FORM */}
                <form
                  onSubmit={async (e) => {
                    e.preventDefault();
                    setIsUpdating(true);
                    setUpdateSuccess(false);
                    try {
                      const res = await updateProfileApi({ fullName, phone });
                      if (res.data.success) {
                        dispatch(loginUser({ user: res.data.user, token: localStorage.getItem("fs_token") }));
                        setUpdateSuccess(true);
                      }
                    } catch (err) {
                      console.error(err);
                      alert("Failed to update profile details");
                    } finally {
                      setIsUpdating(false);
                    }
                  }}
                  className="mb-6 space-y-4 pb-6 border-b border-gray-100"
                >
                  <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-3">Personal Details</h3>
                  
                  {updateSuccess && (
                    <p className="text-xs text-green-600 font-semibold bg-green-50 p-2.5 rounded-lg border border-green-200">
                      ✓ Profile details updated successfully!
                    </p>
                  )}

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="flex flex-col gap-1">
                      <label className="text-xs font-semibold text-gray-500">Full Name</label>
                      <input
                        type="text"
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        required
                        className="border border-gray-200 rounded-lg px-4 py-2 text-sm outline-none focus:border-primary transition"
                      />
                    </div>
                    <div className="flex flex-col gap-1">
                      <label className="text-xs font-semibold text-gray-500">Phone Number</label>
                      <input
                        type="tel"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        className="border border-gray-200 rounded-lg px-4 py-2 text-sm outline-none focus:border-primary transition"
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={isUpdating}
                    className="bg-primary text-white text-xs font-semibold px-6 py-2.5 rounded-lg hover:bg-primaryDark transition disabled:bg-gray-300"
                  >
                    {isUpdating ? "Saving..." : "Save Changes"}
                  </button>
                </form>

                <div className="space-y-4">
                  <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-1">Preferences</h3>
                  {[
                    { label: "Email Notifications", desc: "Receive order updates and offers", defaultOn: true },
                    { label: "SMS Alerts", desc: "Get delivery updates via SMS", defaultOn: true },
                    { label: "Promotional Emails", desc: "Sales, new arrivals, and exclusive offers", defaultOn: false },
                  ].map((setting) => (
                    <div key={setting.label} className="flex items-center justify-between p-4 rounded-xl bg-gray-50 border border-gray-100">
                      <div>
                        <p className="text-sm font-semibold text-gray-800">{setting.label}</p>
                        <p className="text-[10px] text-gray-400 mt-0.5">{setting.desc}</p>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input type="checkbox" defaultChecked={setting.defaultOn} className="sr-only peer" />
                        <div className="w-9 h-5 bg-gray-300 rounded-full peer peer-checked:bg-primary peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:rounded-full after:h-4 after:w-4 after:transition-all"></div>
                      </label>
                    </div>
                  ))}
                  <div className="pt-4 border-t border-gray-100">
                    <button onClick={handleLogout}
                      className="flex items-center gap-2 text-red-500 hover:text-red-600 text-sm font-semibold transition">
                      <LogOut size={16} /> Sign Out of Account
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
