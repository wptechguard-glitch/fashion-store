import React, { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../../redux/cartSlice";
import { toggleWishlist } from "../../redux/wishlistSlice";
import { products } from "../../api/products";
import { Heart, ShoppingCart, Star, Truck, RefreshCw, Shield, ChevronDown, ChevronUp } from "lucide-react";

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const product = products.find((p) => p.id === parseInt(id)) || products[0];
  const wishlistItems = useSelector((state) => state.wishlist.items);
  const isInWishlist = wishlistItems.some((item) => item.id === product.id);

  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedSize, setSelectedSize] = useState("");
  const [selectedColor, setSelectedColor] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [showDescription, setShowDescription] = useState(true);

  useEffect(() => {
    if (product) {
      setSelectedSize(product.sizes?.[0] || "");
      setSelectedColor(product.colors?.[0] || "");
      setSelectedImage(0);
      setQuantity(1);
    }
  }, [product]);

  const discount = Math.round(
    ((product.originalPrice - product.price) / product.originalPrice) * 100
  );

  const handleWishlistToggle = () => {
    dispatch(toggleWishlist(product));
  };

  const handleAddToCart = () => {
    if (!selectedSize) {
      alert("Please select a size!");
      return;
    }
    if (!selectedColor) {
      alert("Please select a color!");
      return;
    }
    dispatch(
      addToCart({
        id: product.id,
        name: product.name,
        brand: product.brand,
        price: product.price,
        originalPrice: product.originalPrice,
        image: product.image,
        size: selectedSize,
        color: selectedColor,
        quantity: quantity,
      })
    );
  };

  const handleBuyNow = () => {
    if (!selectedSize) {
      alert("Please select a size!");
      return;
    }
    if (!selectedColor) {
      alert("Please select a color!");
      return;
    }
    dispatch(
      addToCart({
        id: product.id,
        name: product.name,
        brand: product.brand,
        price: product.price,
        originalPrice: product.originalPrice,
        image: product.image,
        size: selectedSize,
        color: selectedColor,
        quantity: quantity,
      })
    );
    navigate("/checkout");
  };

  return (
    <div className="bg-gray-50 min-h-screen py-6">
      <div className="max-w-7xl mx-auto px-4">

        {/* BREADCRUMB */}
        <p className="text-xs text-gray-400 mb-4 uppercase tracking-widest">
          <Link to="/" className="hover:text-primary transition">Home</Link> /{" "}
          <Link to={`/category/${product.category}`} className="hover:text-primary transition">{product.category}</Link> /{" "}
          <span className="text-primary font-medium">{product.name}</span>
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 bg-white rounded-2xl shadow-sm border border-gray-100 p-6">

          {/* LEFT - IMAGES */}
          <div className="flex gap-4 flex-col sm:flex-row">

            {/* THUMBNAILS */}
            <div className="flex flex-row sm:flex-col gap-2 order-2 sm:order-1 overflow-x-auto sm:overflow-x-visible">
              {product.images?.map((img, i) => (
                <div
                  key={i}
                  onClick={() => setSelectedImage(i)}
                  className={`w-16 h-16 rounded-lg overflow-hidden cursor-pointer border-2 transition flex-shrink-0 ${
                    selectedImage === i ? "border-primary" : "border-gray-200"
                  }`}>
                  <img
                    src={img}
                    alt=""
                    className="w-full h-full object-cover object-top"
                  />
                </div>
              ))}
            </div>

            {/* MAIN IMAGE */}
            <div className="flex-1 relative rounded-2xl overflow-hidden bg-gray-100 h-96 sm:h-110 order-1 sm:order-2">
              <img
                src={product.images?.[selectedImage] || product.image}
                alt={product.name}
                className="w-full h-full object-cover object-top"
              />
              <button
                onClick={handleWishlistToggle}
                className="absolute top-4 right-4 bg-white rounded-full p-2.5 shadow-md hover:bg-gray-50 transition z-10">
                <Heart
                  size={20}
                  className={isInWishlist ? "fill-red-500 text-red-500" : "text-gray-400"}
                />
              </button>
              {discount > 0 && (
                <div className="absolute top-4 left-4 bg-green-500 text-white text-xs font-bold px-2.5 py-1 rounded">
                  {discount}% OFF
                </div>
              )}
            </div>

          </div>

          {/* RIGHT - DETAILS */}
          <div>

            {/* BRAND & NAME */}
            <p className="text-primary text-xs font-semibold uppercase tracking-widest">
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
                ({product.reviews?.toLocaleString()} reviews)
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
            <p className="text-[10px] text-gray-400 mt-1 uppercase tracking-wider">
              Inclusive of all taxes
            </p>

            {/* COLOR */}
            {product.colors && product.colors.length > 0 && (
              <div className="mt-5">
                <p className="text-sm font-semibold text-gray-700 mb-2">
                  Color:
                  <span className="text-primary ml-1.5 font-bold">{selectedColor || "Select"}</span>
                </p>
                <div className="flex gap-2">
                  {product.colors.map((color) => (
                    <button
                      key={color}
                      onClick={() => setSelectedColor(color)}
                      className={`px-4 py-1.5 rounded-full text-xs border transition font-medium ${
                        selectedColor === color
                          ? "border-primary text-primary bg-primaryLight/40 font-semibold"
                          : "border-gray-200 text-gray-600 hover:border-primary"
                      }`}>
                      {color}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* SIZE */}
            {product.sizes && product.sizes.length > 0 && (
              <div className="mt-5">
                <p className="text-sm font-semibold text-gray-700 mb-2">
                  Size:
                  <span className="text-primary ml-1.5 font-bold">{selectedSize || "Select"}</span>
                </p>
                <div className="flex gap-2 flex-wrap">
                  {product.sizes.map((size) => (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={`w-10 h-10 rounded-lg text-xs border transition font-medium ${
                        selectedSize === size
                          ? "border-primary text-primary bg-primaryLight/40 font-semibold"
                          : "border-gray-200 text-gray-600 hover:border-primary"
                      }`}>
                      {size}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* QUANTITY */}
            <div className="mt-5">
              <p className="text-sm font-semibold text-gray-700 mb-2">
                Quantity:
              </p>
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="w-8 h-8 rounded-full border border-gray-200 flex items-center justify-center hover:border-primary hover:text-primary transition font-bold text-gray-600">
                  -
                </button>
                <span className="text-base font-semibold w-6 text-center">
                  {quantity}
                </span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="w-8 h-8 rounded-full border border-gray-200 flex items-center justify-center hover:border-primary hover:text-primary transition font-bold text-gray-600">
                  +
                </button>
              </div>
            </div>

            {/* BUTTONS */}
            <div className="flex gap-3 mt-6">
              {product.inStock ? (
                <>
                  <button
                    onClick={handleAddToCart}
                    className="flex-1 bg-primary text-white py-3.5 rounded-lg font-semibold flex items-center justify-center gap-2 hover:bg-primaryDark transition shadow-sm tracking-wide uppercase text-sm">
                    <ShoppingCart size={16} />
                    Add to Cart
                  </button>
                  <button
                    onClick={handleBuyNow}
                    className="flex-1 border border-gold text-gold bg-luxury py-3.5 rounded-lg font-semibold hover:bg-gold hover:text-black transition tracking-wide uppercase text-sm">
                    Buy Now
                  </button>
                </>
              ) : (
                <button
                  disabled
                  className="w-full bg-gray-100 text-gray-400 py-3.5 rounded-lg font-semibold cursor-not-allowed uppercase tracking-wide text-sm">
                  Out of Stock
                </button>
              )}
            </div>

            {/* DELIVERY INFO */}
            <div className="mt-6 grid grid-cols-3 gap-3">
              {[
                { icon: Truck, text: "Free Delivery" },
                { icon: RefreshCw, text: "7 Day Return" },
                { icon: Shield, text: "Secure Pay" },
              ].map((item) => (
                <div key={item.text}
                  className="flex flex-col items-center gap-1.5 bg-gray-50 border border-gray-100 rounded-xl p-3 text-center">
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
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 mt-4 p-6">
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
            <div className="mt-4 border-t border-gray-50 pt-4">
              <p className="text-sm text-gray-600 leading-relaxed">
                {product.description}
              </p>
              <ul className="mt-4 space-y-2">
                {product.highlights?.map((h) => (
                  <li key={h} className="flex items-center gap-2 text-sm text-gray-600">
                    <span className="w-1.5 h-1.5 rounded-full bg-primary inline-block flex-shrink-0" />
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