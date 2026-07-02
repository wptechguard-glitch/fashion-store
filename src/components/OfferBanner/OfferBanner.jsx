import React from "react";

const OfferBanner = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 my-6 grid grid-cols-1 md:grid-cols-2 gap-4">

      {/* BANNER 1 */}
      <div className="relative overflow-hidden rounded-2xl h-48 bg-gradient-to-r from-primary to-primaryDark flex items-center px-8 shadow-lg cursor-pointer group">
        <div className="z-10">
          <p className="text-gold text-xs uppercase tracking-widest font-semibold">
            New Collection
          </p>
          <h3 className="text-white font-elegant text-3xl font-bold mt-1">
            Women Kurtas
          </h3>
          <p className="text-primaryLight text-sm mt-1">
            Starting from ₹299
          </p>
          <button className="mt-3 bg-gold text-black text-xs font-bold px-5 py-2 rounded-full hover:bg-yellow-400 transition">
            Shop Now
          </button>
        </div>
        <div className="absolute right-8 top-1/2 -translate-y-1/2 opacity-10">
          <svg width="120" height="120" viewBox="0 0 24 24" fill="white">
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 14.5v-9l6 4.5-6 4.5z"/>
          </svg>
        </div>
      </div>

      {/* BANNER 2 */}
      <div className="relative overflow-hidden rounded-2xl h-48 bg-gradient-to-r from-luxury to-gray-800 flex items-center px-8 shadow-lg cursor-pointer group">
        <div className="z-10">
          <p className="text-gold text-xs uppercase tracking-widest font-semibold">
            Mens Special
          </p>
          <h3 className="text-white font-elegant text-3xl font-bold mt-1">
            Mens Wear
          </h3>
          <p className="text-gray-400 text-sm mt-1">
            Flat 50% Off Today
          </p>
          <button className="mt-3 bg-primary text-white text-xs font-bold px-5 py-2 rounded-full hover:bg-primaryDark transition">
            Shop Now
          </button>
        </div>
        <div className="absolute right-8 top-1/2 -translate-y-1/2 opacity-10">
          <svg width="120" height="120" viewBox="0 0 24 24" fill="white">
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 14.5v-9l6 4.5-6 4.5z"/>
          </svg>
        </div>
      </div>

    </div>
  );
};

export default OfferBanner;