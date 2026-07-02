import React, { useState, useEffect } from "react";

const banners = [
  {
    id: 1,
    image: "https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=1200",
    title: "New Kurti Collection",
    subtitle: "Up to 50% Off",
  },
  {
    id: 2,
    image: "https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?w=1200",
    title: "Mens Wear Sale",
    subtitle: "Starting from ₹299",
  },
  {
    id: 3,
    image: "https://images.unsplash.com/photo-1614676471928-2ed0ad1061a4?w=1200",
    title: "New Arrivals",
    subtitle: "Fresh Styles Every Week",
  },
];

const Banner = () => {
  const [current, setCurrent] = useState(0);

  // Auto slide every 3 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % banners.length);
    }, 3000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="relative w-full overflow-hidden h-64 md:h-96">
      
      {/* SLIDES */}
      {banners.map((banner, index) => (
        <div
          key={banner.id}
          className={`absolute inset-0 transition-opacity duration-700 ${
            index === current ? "opacity-100" : "opacity-0"
          }`}>
          <img
            src={banner.image}
            alt={banner.title}
            className="w-full h-full object-cover"
          />
          {/* OVERLAY TEXT */}
          <div className="absolute inset-0 bg-black bg-opacity-30 flex flex-col items-center justify-center text-white text-center">
            <h2 className="text-3xl md:text-5xl font-bold">{banner.title}</h2>
            <p className="text-xl md:text-2xl mt-2 text-flipyellow font-semibold">
              {banner.subtitle}
            </p>
            <button className="mt-4 bg-flipyellow text-black px-6 py-2 rounded font-bold hover:bg-yellow-400 transition">
              Shop Now
            </button>
          </div>
        </div>
      ))}

      {/* DOTS */}
      <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-2">
        {banners.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrent(index)}
            className={`w-3 h-3 rounded-full transition ${
              index === current ? "bg-flipyellow" : "bg-white"
            }`}
          />
        ))}
      </div>

      {/* ARROWS */}
      <button
        onClick={() => setCurrent((prev) => (prev - 1 + banners.length) % banners.length)}
        className="absolute left-4 top-1/2 -translate-y-1/2 bg-white bg-opacity-70 rounded-full w-8 h-8 flex items-center justify-center font-bold hover:bg-opacity-100">
        ‹
      </button>
      <button
        onClick={() => setCurrent((prev) => (prev + 1) % banners.length)}
        className="absolute right-4 top-1/2 -translate-y-1/2 bg-white bg-opacity-70 rounded-full w-8 h-8 flex items-center justify-center font-bold hover:bg-opacity-100">
        ›
      </button>

    </div>
  );
};

export default Banner;