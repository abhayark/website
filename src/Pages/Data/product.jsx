import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Product = ({ productsData, title }) => {
  const goto = useNavigate();
  const [products, setProducts] = useState([]);
  const [visibleCount, setVisibleCount] = useState(6);

  useEffect(() => {
    setProducts(productsData.slice(0, visibleCount));
  }, [productsData, visibleCount]);

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
          onClick={() => {
            goto(`/product/${item.id}`);
            console.log("clicked!");
          }}
        >
          <img className="card_img" src={item.img} alt={item.product_name} />
          <div className="card_info">
            <p className="pname">{item.product_name}</p>
            <p className="pdes">{item.description}</p>
            <p className="price">{item.price}</p>
            <button
              className="pbtn"
              onClick={(e) => {
                e.stopPropagation(); //stops the parent class from getting called "The add button does not open the indi page"
              }}
            >
              Add to Cart
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Product;
