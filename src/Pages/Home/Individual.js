import React from "react";
import product from "../product_data";

function Individual() {
  alert("gekko");
  return (
    <div className="base">
      {product.map((item) => (
        <div className="Container" key={item.id}>
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
}
export default Individual;
