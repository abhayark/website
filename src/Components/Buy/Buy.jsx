import React, { useState, useEffect } from "react";

export default function Buy({ cart, clearCart, pay }) {
  const [loggedin, setloggedin] = useState(false);
  const [user, setUser] = useState(null);
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
      setloggedin(true);
    }
  }, []);

  const handleCheckout = async () => {
    if (!user) {
      alert("Please log in to complete your purchase.");
      return;
    }

    try {
      for (const product of cart) {
        const orderData = {
          customerName: user.username || "Unknown User",
          email: user.email,
          img: product.img,
          category: product.category,
          phone: user.mobile || "N/A",
          service: "Product",
          serviceId: product._id,
          serviceName: product.product_name,
          price: product.price,
          paymentMethod: pay,
        };

        const response = await fetch("http://localhost:5000/api/orders", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(orderData),
        });

        if (!response.ok) {
          const result = await response.json();
          alert("Error ordering product: " + result.error);
          return;
        }
      }
      alert("Order placed successfully!");
      clearCart();
    } catch (error) {
      console.error("Error during checkout:", error);
      alert("An error occurred while placing your order.");
    }
  };

  return (
    <button className="checkout-btn" onClick={handleCheckout}>
      Buy
    </button>
  );
}
