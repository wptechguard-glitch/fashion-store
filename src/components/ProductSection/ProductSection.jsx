import React from "react";
import { Link } from "react-router-dom";
import ProductCard from "../ProductCard/ProductCard";
import { products } from "../../api/products";

const ProductSection = ({ title, category }) => {
  const filtered = products.filter((p) => p.category === category);

  return (
    <div className="bg-white my-4 p-6 rounded-2xl shadow-sm border border-gray-100 max-w-7xl mx-auto px-4">

      {/* HEADER */}
      <div className="flex items-center justify-between mb-5">
        <h2 className="font-elegant text-xl font-bold text-gray-800">{title}</h2>
        <Link to={`/category/${category}`} className="text-primary text-sm font-semibold hover:text-primaryDark transition flex items-center gap-1">
          View All →
        </Link>
      </div>

      {/* PRODUCTS GRID */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
        {filtered.length > 0 ? (
          filtered.slice(0, 5).map((product) => (
            <ProductCard key={product.id} product={product} />
          ))
        ) : (
          <p className="text-gray-400 col-span-5 text-center py-8">
            No products found!
          </p>
        )}
      </div>

    </div>
  );
};

export default ProductSection;