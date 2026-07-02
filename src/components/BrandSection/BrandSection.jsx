import React from "react";
import { Users, ShoppingBag, Tag, Star } from "lucide-react";

const stats = [
  { icon: Users, number: "50K+", label: "Happy Customers" },
  { icon: ShoppingBag, number: "2000+", label: "Products" },
  { icon: Tag, number: "100+", label: "Brands" },
  { icon: Star, number: "4.8", label: "Average Rating" },
];

const reasons = [
  {
    title: "Handpicked Collection",
    desc: "Every product is carefully selected by our fashion experts for quality and style.",
  },
  {
    title: "Exclusive Designs",
    desc: "Unique designs you won't find anywhere else — made for modern Indian women and men.",
  },
  {
    title: "Customer First",
    desc: "Easy returns, fast delivery and 24/7 support — because you deserve the best.",
  },
];

const BrandSection = () => {
  return (
    <div className="my-6 px-4">

      {/* STATS */}
      <div className="max-w-7xl mx-auto bg-gradient-to-r from-primary via-primaryDark to-luxury rounded-2xl py-8 px-6 grid grid-cols-2 md:grid-cols-4 gap-6 shadow-xl">
        {stats.map((s) => (
          <div key={s.label} className="flex flex-col items-center text-center">
            <s.icon size={28} className="text-gold mb-2" />
            <span className="font-elegant text-3xl font-bold text-white">
              {s.number}
            </span>
            <span className="text-primaryLight text-sm mt-1">{s.label}</span>
          </div>
        ))}
      </div>

      {/* WHY CHOOSE US */}
      <div className="max-w-7xl mx-auto mt-8 text-center">
        <p className="text-primary text-xs uppercase tracking-widest font-semibold">
          Our Promise
        </p>
        <h2 className="font-elegant text-2xl font-bold text-gray-800 mt-1">
          Why Choose <span className="text-primary">FashionStore</span>
        </h2>
        <p className="text-gray-500 text-sm mt-2 max-w-xl mx-auto">
          India ka most trusted fashion destination — authentic Indian wear,
          modern style, unbeatable prices.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mt-6">
          {reasons.map((item) => (
            <div
              key={item.title}
              className="bg-white rounded-2xl p-6 shadow-md hover:shadow-xl transition duration-300 border border-primaryLight group text-left">
              <div className="w-10 h-10 rounded-full bg-primaryLight flex items-center justify-center mb-4 group-hover:bg-primary transition duration-300">
                <Star
                  size={18}
                  className="text-primary group-hover:text-white transition duration-300"
                />
              </div>
              <h3 className="font-semibold text-gray-800 text-base">
                {item.title}
              </h3>
              <p className="text-gray-500 text-sm mt-2">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};

export default BrandSection;