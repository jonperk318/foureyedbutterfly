import React from "react";

import CldImage from "@/components/CldImage";


const Home = () => {
  return (
    <div className="home">
      <div className="title-container">
        <h1>
          <span className="first-letter">B</span>ASHFUL
        </h1>
        <h2>-ruby m.</h2>
      </div>
      <div className="flowers">
        <CldImage publicId={"flowers_gdzzeu"} />
      </div>
    </div>
  );
};

export default Home;
