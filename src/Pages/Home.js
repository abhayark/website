import React from "react";
import Navbar from "../Components/Navbar/Navbar";
import product_card, { banner } from "./product_data";
import "./Home/Home.css";

const Content = () => {
  console.log(product_card);
  const prolist = product_card.map((item) => (
    <div className="card" key={item.id}>
      <div className="card_img">
        <img src={item.img} />
      </div>
      <div className="card_info">
        <h2>{item.product_name}</h2>
        <p>{item.description}</p>
        <p className="price">{item.price}</p>
        <div className="btn">Add to bucket</div>
      </div>
    </div>
  ));
  return <div className="content">{prolist}</div>;
};
const Banner_content = () => {
  console.log(banner);
  const bannerlist = banner.map((bitem) => (
    <div className="banner_container">
      <div className="banner_card" key={bitem.id}>
        <div className="banner_img">
          <img src={bitem.img} />
        </div>
        <div className="banner_info">
          <h2>{bitem.product_name}</h2>
          <p>{bitem.description}</p>
          <p className="banner_price">{bitem.price}</p>
          <div className="bbtn">Add to busket</div>
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
      </div>
    </div>
  );
}

export default Home;
