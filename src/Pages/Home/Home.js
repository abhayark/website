import React, { useState, useEffect } from "react";
import Navbar from "../../Components/Navbar/Navbar.js";
import product_card, { banner, product_card2 } from "../Data/product_data.js";
import "./Home.css";
import { useNavigate } from "react-router-dom";
import Product from "../Data/product.js";
/* 
  For the main products data 
  it takes info from product.json
  using maps we return the specified info through prolist
*/
/*
  The ads space it created through here its source is
  same as product card
*/
const Banner_content = () => {
  const goto = useNavigate();
  const Bid = banner.map((id) => <div>{id.id}</div>);

  const bannerlist = banner.map((bitem) => (
    <div className="banner_container">
      <div className="banner_card" key={bitem.id}>
        <div className="banner_img" onClick={() => goto("/" + Bid)}>
          <img src={bitem.img} />
        </div>
      </div>
    </div>
  ));

  return <div className="banner_content">{bannerlist}</div>;
};

function Home() {
  return (
    <div className="homeContainer">
      <Navbar />
      <div className="contentContainer">
        <Banner_content />
        <Product productsData={product_card} title="Featured Products" />
        <Product productsData={product_card2} />
      </div>
    </div>
  );
}

export default Home;
