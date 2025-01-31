import React, { useState } from "react";
import "./Home.css";
import Navbar from "../../Components/Navbar/Navbar.jsx";
import product_card, { banner, product_card2 } from "../Data/product_data.jsx";
import { useNavigate } from "react-router-dom";
import Product from "../Data/product.jsx";
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
  const Bid = banner.map((id) => <div key={id.id}>{id.id}</div>);

  const bannerlist = banner.map((bitem) => (
    <div className="banner_container">
      <div className="banner_card" key={bitem.id}>
        <div className="banner_img" onClick={() => goto("/" + bitem.id)}>
          <img src={bitem.img} />
        </div>
      </div>
    </div>
  ));

  return <div className="banner_content">{bannerlist}</div>;
};

const Home = ({ cart, handleAddToCart }) => {
  return (
    <div className="homeContainer">
      <Navbar cartCount={cart.length} />
      <div className="contentContainer">
        <Banner_content />
        <Product
          productsData={product_card}
          title="Featured Products"
          handleAddToCart={handleAddToCart}
        />
        <Product
          productsData={product_card2}
          handleAddToCart={handleAddToCart}
        />
      </div>
    </div>
  );
};

export default Home;
