import React, { useEffect, useState } from "react";
import "./Home.css";
import Navbar from "../../Components/Navbar/Navbar.jsx";
import { useNavigate } from "react-router-dom";
import Product from "../Data/product.jsx";
import { banner } from "../Data/bannerdata.jsx";

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
        <p className="pdes">{bitem.description}</p>
        <div className="banner_img" onClick={() => goto("/" + bitem.id)}>
          <img src={bitem.img} />
        </div>
      </div>
    </div>
  ));

  return <div className="banner_content">{bannerlist}</div>;
};

const Home = ({ cart, handleAddToCart }) => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/api/products")
      .then((res) => res.json())
      .then((data) => setProducts(data))
      .catch((err) => console.error("Error fetching products:", err));
  }, []);

  const bookProducts = products.filter(
    (product) => product.category === "book"
  );
  const electronicsProducts = products.filter(
    (product) => product.category === "electronics"
  );
  return (
    <div className="homeContainer">
      <Navbar cartCount={cart.length} />
      <div className="contentContainer">
        <Banner_content />
        <Product
          productsData={bookProducts}
          handleAddToCart={handleAddToCart}
        />
        <Product
          productsData={electronicsProducts}
          title="Featured Products"
          handleAddToCart={handleAddToCart}
        />
      </div>
    </div>
  );
};

export default Home;
