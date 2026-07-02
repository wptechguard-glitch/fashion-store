import React from "react";
import Banner from "../../components/Banner/Banner";
import CategoryBar from "../../components/CategoryBar/CategoryBar";
import ProductSection from "../../components/ProductSection/ProductSection";

const Home = () => {
  return (
    <div className="bg-gray-100 min-h-screen">
      <Banner />
      <CategoryBar />
      <ProductSection title="Kurtas & Suits 👗" category="kurtas" />
      <ProductSection title="Mens Collection 👔" category="mens" />
    </div>
  );
};

export default Home;