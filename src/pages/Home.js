import React from "react";
import BrandList from "../components/brand/BrandList";

const Home = () => {
  return (
    <>
      <h4 className="text-center p-3 mt-5 mb-5 display-4">
        Marcas
      </h4>
      <BrandList />

      <br />
      <br />
    </>
  );
};

export default Home;
