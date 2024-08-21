import React from "react";
import Navbar from "../Components/Navbar/Navbar";
import product_card from "./product_data";
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
function Home() {
  return (
    <div className="homeContainer">
      <Navbar />
      <div className="contentContainer">
        <Content />
      </div>
    </div>
  );
}

export default Home;
