import React from "react";
import { Truck, RefreshCw, Lock, Award, Gift } from "lucide-react";

const features = [
  { icon: Truck, title: "Free Delivery", desc: "On orders above ₹499" },
  { icon: RefreshCw, title: "Easy Returns", desc: "7 day return policy" },
  { icon: Lock, title: "Secure Payment", desc: "100% safe checkout" },
  { icon: Award, title: "Premium Quality", desc: "Handpicked collection" },
  { icon: Gift, title: "Gift Wrapping", desc: "Special packaging" },
];

const FeaturesStrip = () => {
  return (
    <div className="bg-white border-y border-primaryLight py-4 px-4 my-2 shadow-sm">
      <div className="max-w-7xl mx-auto grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
        {features.map((f) => (
          <div key={f.title}
            className="flex items-center gap-3 group cursor-pointer">
            <f.icon
              size={24}
              className="text-primary group-hover:scale-125 transition duration-300"
            />
            <div>
              <p className="text-xs font-semibold text-gray-800">{f.title}</p>
              <p className="text-xs text-gray-400">{f.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FeaturesStrip;