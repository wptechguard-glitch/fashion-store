import React from "react";
import { Link } from "react-router-dom";

const categories = [
  { 
    name: "Kurtis & Suits", 
    image: "https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=400", 
    path: "kurtas" 
  },
  { 
    name: "Sarees Collection", 
    image: "https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?w=400", 
    path: "sarees" 
  },
  { 
    name: "New Arrivals", 
    image: "https://images.unsplash.com/photo-1614676471928-2ed0ad1061a4?w=400", 
    path: "new" 
  },
  { 
    name: "Sale 🔥", 
    image: "https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?w=400", 
    path: "sale" 
  },
];

const CategoryBar = () => {
  return (
    <div className="bg-white my-4 p-6 rounded-2xl shadow-sm border border-gray-100 max-w-7xl mx-auto px-4">
      <h2 className="font-elegant text-xl font-bold text-gray-800 mb-5">
        Shop by Category
      </h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {categories.map((cat) => (
          <Link
            key={cat.name}
            to={`/category/${cat.path}`}
            className="flex flex-col items-center group cursor-pointer"
          >
            <div className="w-full h-44 overflow-hidden rounded-xl shadow-sm border border-gray-50">
              <img
                src={cat.image}
                alt={cat.name}
                className="w-full h-full object-cover group-hover:scale-105 transition duration-300 object-top"
              />
            </div>
            <span className="mt-3 text-sm font-semibold text-gray-700 group-hover:text-primary transition-colors">
              {cat.name}
            </span>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default CategoryBar;