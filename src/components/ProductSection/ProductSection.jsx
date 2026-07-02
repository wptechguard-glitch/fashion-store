import React from "react";
import ProductCard from "../ProductCard/ProductCard";

const dummyProducts = [
  {
    id: 1,
    name: "Women Printed Anarkali Kurta",
    price: 499,
    originalPrice: 999,
    rating: 4.3,
    reviews: 1234,
    image: "https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=300",
    category: "kurtas",
  },
  {
    id: 2,
    name: "Women Embroidered Straight Kurta",
    price: 699,
    originalPrice: 1499,
    rating: 4.1,
    reviews: 856,
    image: "https://images.unsplash.com/photo-1614676471928-2ed0ad1061a4?w=300",
    category: "kurtas",
  },
  {
    id: 3,
    name: "Women Floral Print Kurta Set",
    price: 899,
    originalPrice: 1799,
    rating: 4.4,
    reviews: 2100,
    image: "https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?w=300",
    category: "kurtas",
  },
  {
    id: 4,
    name: "Women Cotton A-Line Kurta",
    price: 349,
    originalPrice: 699,
    rating: 4.0,
    reviews: 431,
    image: "https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?w=300",
    category: "kurtas",
  },
  {
    id: 5,
    name: "Women Palazzo Kurta Set",
    price: 999,
    originalPrice: 1999,
    rating: 4.6,
    reviews: 3200,
    image: "https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=300",
    category: "kurtas",
  },
  {
    id: 6,
    name: "Men Slim Fit Casual Shirt",
    price: 399,
    originalPrice: 799,
    rating: 4.5,
    reviews: 2341,
    image: "https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?w=300",
    category: "mens",
  },
  {
    id: 7,
    name: "Men Regular Fit Cotton Kurta",
    price: 599,
    originalPrice: 1199,
    rating: 4.2,
    reviews: 567,
    image: "https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?w=300",
    category: "mens",
  },
  {
    id: 8,
    name: "Men Solid Polo T-Shirt",
    price: 299,
    originalPrice: 599,
    rating: 4.3,
    reviews: 1890,
    image: "https://images.unsplash.com/photo-1614676471928-2ed0ad1061a4?w=300",
    category: "mens",
  },
  {
    id: 9,
    name: "Men Formal Slim Fit Trouser",
    price: 799,
    originalPrice: 1599,
    rating: 4.1,
    reviews: 743,
    image: "https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=300",
    category: "mens",
  },
  {
    id: 10,
    name: "Men Ethnic Straight Kurta",
    price: 699,
    originalPrice: 1399,
    rating: 4.4,
    reviews: 1200,
    image: "https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?w=300",
    category: "mens",
  },
  {
    id: 11,
    name: "Women Rayon Printed Kurta",
    price: 449,
    originalPrice: 899,
    rating: 4.2,
    reviews: 980,
    image: "https://images.unsplash.com/photo-1614676471928-2ed0ad1061a4?w=300",
    category: "new",
  },
  {
    id: 12,
    name: "Men Linen Casual Shirt",
    price: 549,
    originalPrice: 1099,
    rating: 4.3,
    reviews: 654,
    image: "https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?w=300",
    category: "new",
  },
  {
    id: 13,
    name: "Women Silk Blend Kurta",
    price: 1299,
    originalPrice: 2599,
    rating: 4.7,
    reviews: 432,
    image: "https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=300",
    category: "sale",
  },
  {
    id: 14,
    name: "Men Printed Kurta Pyjama Set",
    price: 899,
    originalPrice: 1799,
    rating: 4.5,
    reviews: 1100,
    image: "https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?w=300",
    category: "sale",
  },
];

const ProductSection = ({ title, category }) => {
  const filtered = dummyProducts.filter((p) => p.category === category);

  return (
    <div className="bg-white my-2 p-4 shadow">

      {/* HEADER */}
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-bold text-gray-800">{title}</h2>
        <button className="text-flipblue text-sm font-semibold hover:underline">
          View All →
        </button>
      </div>

      {/* PRODUCTS GRID */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
        {filtered.length > 0 ? (
          filtered.map((product) => (
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