import React, { useState, useEffect } from "react";
import { useParams, useSearchParams, Link } from "react-router-dom";
import ProductCard from "../../components/ProductCard/ProductCard";
import { products } from "../../api/products";
import { SlidersHorizontal, ArrowUpDown, X, Star } from "lucide-react";

const ProductList = () => {
  const { categoryName } = useParams();
  const [searchParams, setSearchParams] = useSearchParams();
  const searchQuery = searchParams.get("search") || "";

  // Filter States
  const [selectedSort, setSelectedSort] = useState("default");
  const [selectedPriceRange, setSelectedPriceRange] = useState("all");
  const [selectedSize, setSelectedSize] = useState("all");
  const [selectedColor, setSelectedColor] = useState("all");
  const [showFiltersMobile, setShowFiltersMobile] = useState(false);

  // Reset filters on category or search change
  useEffect(() => {
    setSelectedPriceRange("all");
    setSelectedSize("all");
    setSelectedColor("all");
    setSelectedSort("default");
  }, [categoryName, searchQuery]);

  // 1. Filter products by category and search query
  let filteredProducts = products.filter((p) => {
    const matchesCategory =
      categoryName === "all" || p.category === categoryName;
    const matchesSearch =
      !searchQuery ||
      p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.brand.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  // 2. Apply sidebar filters
  if (selectedPriceRange !== "all") {
    filteredProducts = filteredProducts.filter((p) => {
      if (selectedPriceRange === "under500") return p.price < 500;
      if (selectedPriceRange === "500to1000") return p.price >= 500 && p.price <= 1000;
      if (selectedPriceRange === "over1000") return p.price > 1000;
      return true;
    });
  }

  if (selectedSize !== "all") {
    filteredProducts = filteredProducts.filter((p) =>
      p.sizes?.includes(selectedSize)
    );
  }

  if (selectedColor !== "all") {
    filteredProducts = filteredProducts.filter((p) =>
      p.colors?.some((c) => c.toLowerCase() === selectedColor.toLowerCase())
    );
  }

  // 3. Apply sorting
  if (selectedSort === "lowToHigh") {
    filteredProducts.sort((a, b) => a.price - b.price);
  } else if (selectedSort === "highToLow") {
    filteredProducts.sort((a, b) => b.price - a.price);
  } else if (selectedSort === "rating") {
    filteredProducts.sort((a, b) => b.rating - a.rating);
  }

  // Extract all available colors and sizes for dynamic filter values
  const allSizes = ["XS", "S", "M", "L", "XL", "XXL"];
  const allColors = [
    "Rose",
    "Navy",
    "Green",
    "Black",
    "Lavender",
    "Peach",
    "Mint",
    "Teal",
    "Pink",
    "Mustard",
    "Off-White",
    "Maroon",
    "Saffron",
    "Beige",
  ];

  const categoryTitles = {
    all: "All Collections",
    kurtas: "Kurtas & Suits 👗",
    mens: "Men's Collection 👔",
    new: "New Arrivals ✨",
    sale: "Luxe Sale 🔥",
  };

  const currentTitle = categoryTitles[categoryName] || "Products";

  const clearAllFilters = () => {
    setSelectedPriceRange("all");
    setSelectedSize("all");
    setSelectedColor("all");
    setSelectedSort("default");
  };

  return (
    <div className="bg-gray-50 min-h-screen py-6">
      <div className="max-w-7xl mx-auto px-4">
        {/* BREADCRUMB */}
        <p className="text-xs text-gray-400 mb-4 uppercase tracking-widest">
          <Link to="/" className="hover:text-primary transition">Home</Link> /{" "}
          <span className="text-primary font-semibold">{categoryName}</span>
        </p>

        {/* HEADER BAR */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6 bg-white p-5 rounded-2xl shadow-sm border border-gray-100">
          <div>
            <h1 className="font-elegant text-2xl font-bold text-gray-800">
              {currentTitle}
            </h1>
            {searchQuery && (
              <p className="text-sm text-gray-500 mt-1">
                Showing results for "<span className="text-primary font-semibold">{searchQuery}</span>"
              </p>
            )}
            <p className="text-xs text-gray-400 mt-1">
              ({filteredProducts.length} items found)
            </p>
          </div>

          {/* ACTIONS ROW */}
          <div className="flex items-center gap-3 self-end md:self-auto">
            <button
              onClick={() => setShowFiltersMobile(true)}
              className="md:hidden flex items-center gap-1.5 border border-gray-200 rounded-lg px-4 py-2 text-xs font-semibold text-gray-600 hover:border-primary transition">
              <SlidersHorizontal size={14} />
              Filters
            </button>

            {/* SORT SELECT */}
            <div className="flex items-center gap-2 border border-gray-200 rounded-lg px-3 py-2 bg-white text-xs text-gray-600 focus-within:border-primary transition">
              <ArrowUpDown size={14} className="text-gray-400" />
              <select
                value={selectedSort}
                onChange={(e) => setSelectedSort(e.target.value)}
                className="outline-none bg-transparent cursor-pointer font-semibold">
                <option value="default">Sort: Recommended</option>
                <option value="lowToHigh">Price: Low to High</option>
                <option value="highToLow">Price: High to Low</option>
                <option value="rating">Customer Rating</option>
              </select>
            </div>
          </div>
        </div>

        {/* MAIN BODY */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {/* SIDEBAR FILTERS (DESKTOP) */}
          <div className="hidden md:block space-y-5 bg-white p-5 rounded-2xl shadow-sm border border-gray-100 h-fit">
            <div className="flex items-center justify-between pb-3 border-b border-gray-100">
              <h3 className="font-elegant font-bold text-gray-800 text-sm tracking-wider uppercase">
                Filter By
              </h3>
              {(selectedPriceRange !== "all" || selectedSize !== "all" || selectedColor !== "all") && (
                <button
                  onClick={clearAllFilters}
                  className="text-primary text-[10px] font-bold hover:underline uppercase tracking-wider">
                  Clear All
                </button>
              )}
            </div>

            {/* PRICE FILTER */}
            <div className="space-y-2">
              <h4 className="text-xs font-bold text-gray-700 uppercase tracking-widest">
                Price
              </h4>
              <div className="space-y-1.5 text-xs text-gray-600">
                {[
                  { label: "All Prices", value: "all" },
                  { label: "Under ₹500", value: "under500" },
                  { label: "₹500 - ₹1000", value: "500to1000" },
                  { label: "Above ₹1000", value: "over1000" },
                ].map((item) => (
                  <label key={item.value} className="flex items-center gap-2 cursor-pointer hover:text-primary">
                    <input
                      type="radio"
                      name="priceRange"
                      checked={selectedPriceRange === item.value}
                      onChange={() => setSelectedPriceRange(item.value)}
                      className="accent-primary"
                    />
                    {item.label}
                  </label>
                ))}
              </div>
            </div>

            {/* SIZE FILTER */}
            <div className="space-y-2 pt-3 border-t border-gray-50">
              <h4 className="text-xs font-bold text-gray-700 uppercase tracking-widest">
                Size
              </h4>
              <div className="flex flex-wrap gap-2">
                <button
                  onClick={() => setSelectedSize("all")}
                  className={`px-3 py-1.5 rounded-lg text-[10px] font-semibold border transition ${
                    selectedSize === "all"
                      ? "border-primary text-white bg-primary"
                      : "border-gray-200 text-gray-600 hover:border-primary"
                  }`}>
                  All
                </button>
                {allSizes.map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`w-9 h-9 rounded-lg text-[10px] font-semibold border transition flex items-center justify-center ${
                      selectedSize === size
                        ? "border-primary text-white bg-primary"
                        : "border-gray-200 text-gray-600 hover:border-primary"
                    }`}>
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* COLOR FILTER */}
            <div className="space-y-2 pt-3 border-t border-gray-50">
              <h4 className="text-xs font-bold text-gray-700 uppercase tracking-widest">
                Color
              </h4>
              <div className="flex flex-wrap gap-1.5">
                <button
                  onClick={() => setSelectedColor("all")}
                  className={`px-2.5 py-1 rounded-full text-[10px] font-semibold border transition ${
                    selectedColor === "all"
                      ? "border-primary text-white bg-primary"
                      : "border-gray-200 text-gray-600 hover:border-primary"
                  }`}>
                  All Colors
                </button>
                {allColors.map((color) => (
                  <button
                    key={color}
                    onClick={() => setSelectedColor(color)}
                    className={`px-2.5 py-1 rounded-full text-[10px] border transition font-medium ${
                      selectedColor.toLowerCase() === color.toLowerCase()
                        ? "border-primary text-primary bg-primaryLight/30 font-semibold"
                        : "border-gray-200 text-gray-600 hover:border-primary"
                    }`}>
                    {color}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* PRODUCTS GRID */}
          <div className="md:col-span-3">
            {filteredProducts.length > 0 ? (
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                {filteredProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            ) : (
              <div className="bg-white rounded-2xl border border-gray-100 p-12 text-center shadow-sm">
                <p className="text-gray-400 font-elegant text-lg font-semibold">
                  No matching products found
                </p>
                <p className="text-gray-400 text-xs mt-1">
                  Try clearing filters or modifying your search query
                </p>
                <button
                  onClick={clearAllFilters}
                  className="mt-4 bg-primary text-white px-6 py-2 rounded-lg font-semibold hover:bg-primaryDark transition text-xs tracking-wider uppercase">
                  Reset Filters
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* MOBILE FILTER MODAL */}
      {showFiltersMobile && (
        <div className="fixed inset-0 z-50 bg-black/50 flex justify-end md:hidden">
          <div className="w-80 bg-white h-full flex flex-col justify-between shadow-2xl p-5 animate-slide-left">
            <div>
              <div className="flex items-center justify-between pb-3 border-b border-gray-100 mb-4">
                <h3 className="font-elegant font-bold text-gray-800 text-base">
                  Filter By
                </h3>
                <button
                  onClick={() => setShowFiltersMobile(false)}
                  className="p-1 hover:bg-gray-100 rounded-full transition">
                  <X size={18} />
                </button>
              </div>

              <div className="space-y-5 overflow-y-auto max-h-[75vh] pr-1">
                {/* PRICE */}
                <div className="space-y-2">
                  <h4 className="text-xs font-bold text-gray-700 uppercase tracking-widest">
                    Price Range
                  </h4>
                  <div className="space-y-1.5 text-xs text-gray-600">
                    {[
                      { label: "All Prices", value: "all" },
                      { label: "Under ₹500", value: "under500" },
                      { label: "₹500 - ₹1000", value: "500to1000" },
                      { label: "Above ₹1000", value: "over1000" },
                    ].map((item) => (
                      <label key={item.value} className="flex items-center gap-2 cursor-pointer">
                        <input
                          type="radio"
                          name="priceRangeMobile"
                          checked={selectedPriceRange === item.value}
                          onChange={() => setSelectedPriceRange(item.value)}
                          className="accent-primary"
                        />
                        {item.label}
                      </label>
                    ))}
                  </div>
                </div>

                {/* SIZE */}
                <div className="space-y-2 pt-3 border-t border-gray-50">
                  <h4 className="text-xs font-bold text-gray-700 uppercase tracking-widest">
                    Size
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    <button
                      onClick={() => setSelectedSize("all")}
                      className={`px-3 py-1.5 rounded-lg text-[10px] font-semibold border transition ${
                        selectedSize === "all"
                          ? "border-primary text-white bg-primary"
                          : "border-gray-200 text-gray-600"
                      }`}>
                      All
                    </button>
                    {allSizes.map((size) => (
                      <button
                        key={size}
                        onClick={() => setSelectedSize(size)}
                        className={`w-9 h-9 rounded-lg text-[10px] font-semibold border transition flex items-center justify-center ${
                          selectedSize === size
                            ? "border-primary text-white bg-primary"
                            : "border-gray-200 text-gray-600"
                        }`}>
                        {size}
                      </button>
                    ))}
                  </div>
                </div>

                {/* COLOR */}
                <div className="space-y-2 pt-3 border-t border-gray-50">
                  <h4 className="text-xs font-bold text-gray-700 uppercase tracking-widest">
                    Color
                  </h4>
                  <div className="flex flex-wrap gap-1.5">
                    <button
                      onClick={() => setSelectedColor("all")}
                      className={`px-2.5 py-1 rounded-full text-[10px] font-semibold border transition ${
                        selectedColor === "all"
                          ? "border-primary text-white bg-primary"
                          : "border-gray-200 text-gray-600"
                      }`}>
                      All
                    </button>
                    {allColors.map((color) => (
                      <button
                        key={color}
                        onClick={() => setSelectedColor(color)}
                        className={`px-2.5 py-1 rounded-full text-[10px] border transition ${
                          selectedColor.toLowerCase() === color.toLowerCase()
                            ? "border-primary text-primary bg-primaryLight/30 font-semibold"
                            : "border-gray-200 text-gray-600"
                        }`}>
                        {color}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div className="flex gap-2 pt-4 border-t border-gray-100">
              <button
                onClick={clearAllFilters}
                className="flex-1 border border-gray-200 py-2.5 rounded-lg text-xs font-semibold text-gray-600 hover:bg-gray-50 transition">
                Reset
              </button>
              <button
                onClick={() => setShowFiltersMobile(false)}
                className="flex-1 bg-primary text-white py-2.5 rounded-lg text-xs font-semibold hover:bg-primaryDark transition">
                Apply Filters
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductList;
