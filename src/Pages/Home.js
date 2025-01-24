import React, { useState, useEffect } from "react";
import Navbar from "../Components/Navbar/Navbar";
import product_card, { banner } from "./product_data";
import "./Home/Home.css";
import { useNavigate } from "react-router-dom";
import individual from "./Home/Individual.js";
/* 
  For the main products data 
  it takes info from product.json
  using maps we return the specified info through prolist
*/

const Content = () => {
  const goto = useNavigate();
  const [products, setProducts] = useState([]);
  const [visibleCount, setVisibleCount] = useState(6);

  useEffect(() => {
    setProducts(product_card.slice(0, visibleCount));
  }, [visibleCount]);

  const loadMore = () => {
    setVisibleCount(visibleCount + 6);
  };

  return (
    <div className="content">
      <button className="morebtn" onClick={loadMore}>
        More
      </button>
      {products.map((item) => (
        <div
          className="card"
          key={item.id}
          onClick={() => goto("/" + individual)}
        >
          <img className="card_img" src={item.img} alt={item.product_name} />
          <div className="card_info">
            <p className="pname">{item.product_name}</p>
            <p className="pdes">{item.description}</p>
            <p className="price">{item.price}</p>
            <button className="pbtn">Add to Cart</button>
          </div>
        </div>
      ))}
    </div>
  );
};
const Content2 = () => {
  const [products, setProducts] = useState([]);
  const [visibleCount, setVisibleCount] = useState(6);

  useEffect(() => {
    setProducts(product_card.slice(0, visibleCount));
  }, [visibleCount]);

  const loadMore = () => {
    setVisibleCount(visibleCount + 6);
  };

  return (
    <div className="content">
      <button className="morebtn" onClick={loadMore}>
        More
      </button>
      {products.map((item) => (
        <div className="card" key={item.id}>
          <img className="card_img" src={item.img} alt={item.product_name} />
          <div className="card_info">
            <p className="pname">{item.product_name}</p>
            <p className="pdes">{item.description}</p>
            <p className="price">{item.price}</p>
            <button className="pbtn">Add to Cart</button>
          </div>
        </div>
      ))}
    </div>
  );
};

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
        <Content />
        <Content2 />
      </div>
    </div>
  );
}

export default Home;
