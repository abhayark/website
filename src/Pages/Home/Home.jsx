import React, { useEffect, useState } from "react";
import "./Home.css";
import Navbar from "../../Components/Navbar/Navbar.jsx";
import { useNavigate } from "react-router-dom";
import Product from "../Data/product.jsx";
import { banner } from "../Data/bannerdata.jsx";
import Footer from "./Footer.jsx";

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
    <div className="banner_container" onClick={() => goto("/" + bitem.id)}>
      <div className="banner_card">
        <div className="banner_img">
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

  const booksProducts = products.filter(
    (product) => product.category === "Books"
  );
  const electronicsProducts = products.filter(
    (product) => product.category === "Electronics"
  );
  const accessoriesProducts = products.filter(
    (product) => product.category === "Accessories"
  );
  const applianceProducts = products.filter(
    (product) => product.category === "Home-appliances"
  );
  const mix = products.filter((product) => product.category != null);
  return (
    <div className="homeContainer">
      <Navbar cartCount={cart.length} />
      <div className="contentContainer">
        <Banner_content />
        <Product
          productsData={booksProducts}
          handleAddToCart={handleAddToCart}
        />
        <Product
          productsData={electronicsProducts}
          title="Featured Products"
          handleAddToCart={handleAddToCart}
        />
        <Product
          productsData={accessoriesProducts}
          title="Featured Products"
          handleAddToCart={handleAddToCart}
        />

        <Product
          productsData={applianceProducts}
          title="Featured Products"
          handleAddToCart={handleAddToCart}
        />
      </div>
      <Footer />
    </div>
  );
};

export default Home;
