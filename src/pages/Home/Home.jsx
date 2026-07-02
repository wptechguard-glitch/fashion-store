import React from "react";
import Banner from "../../components/Banner/Banner";
import CategoryBar from "../../components/CategoryBar/CategoryBar";
import ProductSection from "../../components/ProductSection/ProductSection";
import FeaturesStrip from "../../components/FeaturesStrip/FeaturesStrip";
import OfferBanner from "../../components/OfferBanner/OfferBanner";
import BrandSection from "../../components/BrandSection/BrandSection";

const Home = () => {
  return (
    <div className="bg-gray-50 min-h-screen">
      {/* HERO BANNER */}
      <Banner />

      {/* FEATURES STRIP */}
      <FeaturesStrip />

      {/* CATEGORY CARDS */}
      <CategoryBar />

      {/* KURTAS SECTION */}
      <ProductSection title="Kurtas & Suits 👗" category="kurtas" />

      {/* OFFER BANNER */}
      <OfferBanner />

      {/* MENS SECTION */}
      <ProductSection title="Mens Collection 👔" category="mens" />

      {/* BRAND SECTION */}
      <BrandSection />

      {/* NEW ARRIVALS */}
      <ProductSection title="New Arrivals ✨" category="new" />

      {/* SALE */}
      <ProductSection title="Sale 🔥" category="sale" />
    </div>
  );
};

export default Home;