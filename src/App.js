import React, { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useDispatch } from "react-redux";
import { loginUser } from "./redux/userSlice";
import { getProfileApi } from "./api/authApi";
import Navbar from "./components/Navbar/Navbar";
import Footer from "./components/Footer/Footer";
import Home from "./pages/Home/Home";
import ProductDetail from "./pages/ProductDetail/ProductDetail";
import Cart from "./pages/Cart/Cart";
import Wishlist from "./pages/Wishlist/Wishlist";
import ProductList from "./pages/ProductList/ProductList";
import Checkout from "./pages/Checkout/Checkout";
import OrderSuccess from "./pages/OrderSuccess/OrderSuccess";
import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";
import Profile from "./pages/Profile/Profile";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    const token = localStorage.getItem("fs_token");
    if (token) {
      // Fetch user profile from backend on app load
      getProfileApi()
        .then((response) => {
          dispatch(
            loginUser({
              user: response.data,
              token: token,
            })
          );
        })
        .catch((error) => {
          console.error("Auto login failed:", error);
          localStorage.removeItem("fs_token");
        });
    }
  }, [dispatch]);

  return (
    <Router>
      <div className="min-h-screen bg-gray-50 flex flex-col justify-between pb-16 md:pb-0">
        <div>
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/product/:id" element={<ProductDetail />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/wishlist" element={<Wishlist />} />
            <Route path="/category/:categoryName" element={<ProductList />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/order-success" element={<OrderSuccess />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/profile" element={<Profile />} />
          </Routes>
        </div>
        <Footer />
      </div>
    </Router>
  );
}

export default App;