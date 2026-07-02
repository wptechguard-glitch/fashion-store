import React, { useState } from "react";
import { Heart, ShoppingCart, Star, Truck, RefreshCw, Shield, ChevronDown, ChevronUp } from "lucide-react";

const product = {
  id: 1,
  name: "Women Printed Anarkali Kurta",
  brand: "FashionStore",
  price: 499,
  originalPrice: 999,
  rating: 4.3,
  reviews: 1234,
  images: [
    "https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=500",
    "https://images.unsplash.com/photo-1614676471928-2ed0ad1061a4?w=500",
    "https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?w=500",
    "https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?w=500",
  ],
  sizes: ["XS", "S", "M", "L", "XL", "XXL"],
  colors: ["Rose", "Navy", "Green", "Black"],
  description: "Beautiful printed Anarkali kurta made from premium rayon fabric. Perfect for festivals, parties and casual occasions. Features intricate prints and comfortable fit.",
  highlights: [
    "100% Rayon fabric",
    "Machine washable",
    "Regular fit",
    "Full length kurta",
    "Printed design",
  ],
};

const ProductDetail = () => {
  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedSize, setSelectedSize] = useState("");
  const [selectedColor, setSelectedColor] = useState("");
  const [wishlist, setWishlist] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const [showDescription, setShowDescription] = useState(true);

  const discount = Math.round(
    ((product.originalPrice - product.price) / product.originalPrice) * 100
  );

  return (
    <div className="bg-gray-50 min-h-screen py-6">
      <div className="max-w-7xl mx-auto px-4">

        {/* BREADCRUMB */}
       <p className="text-xs text-gray-400 mb-4 uppercase tracking-widest">
          Home / Kurtas & Suits /
          <span className="text-primary"> {product.name}</span>
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 bg-white rounded-2xl shadow-md p-6">

          {/* LEFT - IMAGES */}
          <div className="flex gap-4">

            {/* THUMBNAILS */}
            <div className="flex flex-col gap-2">
              {product.images.map((img, i) => (
                <div
                  key={i}
                  onClick={() => setSelectedImage(i)}
                  className={`w-16 h-16 rounded-lg overflow-hidden cursor-pointer border-2 transition ${
                    selectedImage === i
                      ? "border-primary"
                      : "border-gray-200"
                  }`}>
                  <img
                    src={img}
                    alt=""
                    className="w-full h-full object-cover"
                  />
                </div>
              ))}
            </div>

            {/* MAIN IMAGE */}
            <div className="flex-1 relative rounded-2xl overflow-hidden bg-gray-100 h-110">
              <img
                src={product.images[selectedImage]}
                alt={product.name}
                className="w-full h-110 object-cover object-top"
              />
              <button
                onClick={() => setWishlist(!wishlist)}
                className="absolute top-4 right-4 bg-white rounded-full p-2 shadow-md">
                <Heart
                  size={20}
                  className={wishlist
                    ? "fill-red-500 text-red-500"
                    : "text-gray-400"}
                />
              </button>
              <div className="absolute top-4 left-4 bg-green-500 text-white text-xs font-bold px-2 py-1 rounded">
                {discount}% OFF
              </div>
            </div>

          </div>

          {/* RIGHT - DETAILS */}
          <div>

            {/* BRAND & NAME */}
            <p className="text-primary text-sm font-semibold uppercase tracking-widest">
              {product.brand}
            </p>
            <h1 className="font-elegant text-2xl font-bold text-gray-800 mt-1">
              {product.name}
            </h1>

            {/* RATING */}
            <div className="flex items-center gap-2 mt-2">
              <div className="flex items-center gap-1 bg-green-500 text-white text-xs px-2 py-0.5 rounded">
                <span>{product.rating}</span>
                <Star size={10} fill="white" />
              </div>
              <span className="text-xs text-gray-400">
                ({product.reviews.toLocaleString()} reviews)
              </span>
            </div>

            {/* PRICE */}
            <div className="flex items-center gap-3 mt-4 border-b border-gray-100 pb-4">
               <span className="font-elegant text-3xl font-bold text-gray-900">
                ₹{product.price}
              </span>
              <span className="text-lg text-gray-400 line-through">
                ₹{product.originalPrice}
              </span>
              <span className="text-green-500 font-semibold text-sm">
                {discount}% off
              </span>
            </div>
            <p className="text-xs text-gray-400 mt-1">
              Inclusive of all taxes
            </p>

            {/* COLOR */}
            <div className="mt-5">
              <p className="text-sm font-semibold text-gray-700 mb-2">
                Color:
                <span className="text-primary ml-1">{selectedColor || "Select"}</span>
              </p>
              <div className="flex gap-2">
                {product.colors.map((color) => (
                  <button
                    key={color}
                    onClick={() => setSelectedColor(color)}
                    className={`px-3 py-1 rounded-full text-xs border-2 transition font-medium ${
                      selectedColor === color
                        ? "border-primary text-primary bg-primaryLight"
                        : "border-gray-200 text-gray-600 hover:border-primary"
                    }`}>
                    {color}
                  </button>
                ))}
              </div>
            </div>

            {/* SIZE */}
            <div className="mt-5">
              <p className="text-sm font-semibold text-gray-700 mb-2">
                Size:
                <span className="text-primary ml-1">{selectedSize || "Select"}</span>
              </p>
              <div className="flex gap-2 flex-wrap">
                {product.sizes.map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`w-10 h-10 rounded-lg text-sm border-2 transition font-medium ${
                      selectedSize === size
                        ? "border-primary text-primary bg-primaryLight"
                        : "border-gray-200 text-gray-600 hover:border-primary"
                    }`}>
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* QUANTITY */}
            <div className="mt-5">
              <p className="text-sm font-semibold text-gray-700 mb-2">
                Quantity:
              </p>
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="w-8 h-8 rounded-full border-2 border-gray-200 flex items-center justify-center hover:border-primary transition font-bold">
                  -
                </button>
                <span className="text-base font-semibold w-6 text-center">
                  {quantity}
                </span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="w-8 h-8 rounded-full border-2 border-gray-200 flex items-center justify-center hover:border-primary transition font-bold">
                  +
                </button>
              </div>
            </div>

            {/* BUTTONS */}
           <div className="flex gap-3 mt-6">
  <button className="flex-1 bg-primary text-white py-3.5 rounded-lg font-semibold flex items-center justify-center gap-2 hover:bg-primaryDark transition shadow-md tracking-wide uppercase text-sm">
    <ShoppingCart size={16} />
    Add to Cart
  </button>
  <button className="flex-1 border-2 border-gold text-gold py-3.5 rounded-lg font-semibold hover:bg-gold hover:text-black transition tracking-wide uppercase text-sm">
    Buy Now
  </button>
</div>

            {/* DELIVERY INFO */}
            <div className="mt-6 grid grid-cols-3 gap-3">
              {[
                { icon: Truck, text: "Free Delivery" },
                { icon: RefreshCw, text: "7 Day Return" },
                { icon: Shield, text: "Secure Pay" },
              ].map((item) => (
                <div key={item.text}
                  className="flex flex-col items-center gap-1 bg-gray-50 rounded-xl p-3 text-center">
                  <item.icon size={18} className="text-primary" />
                  <span className="text-xs text-gray-600 font-medium">
                    {item.text}
                  </span>
                </div>
              ))}
            </div>

          </div>
        </div>

        {/* DESCRIPTION ACCORDION */}
        <div className="bg-white rounded-2xl shadow-md mt-4 p-6">
          <button
            onClick={() => setShowDescription(!showDescription)}
            className="w-full flex items-center justify-between text-left">
            <h3 className="font-elegant text-lg font-bold text-gray-800">
              Product Description
            </h3>
            {showDescription
              ? <ChevronUp size={20} className="text-primary" />
              : <ChevronDown size={20} className="text-primary" />
            }
          </button>
          {showDescription && (
            <div className="mt-4">
              <p className="text-sm text-gray-600 leading-relaxed">
                {product.description}
              </p>
              <ul className="mt-4 space-y-2">
                {product.highlights.map((h) => (
                  <li key={h} className="flex items-center gap-2 text-sm text-gray-600">
                    <span className="w-1.5 h-1.5 rounded-full bg-primary inline-block" />
                    {h}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

      </div>
    </div>
  );
};

export default ProductDetail;