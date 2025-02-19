import React, { useEffect, useState } from "react";
import { fetchCartItems, removeCartItem, fetchProductById } from "../api_services";
import "../App.css";

function CartPage() {
  const [cart, setCart] = useState([]);
  const [productDetails, setProductDetails] = useState({}); // Store fetched product details

  useEffect(() => {
    loadCart();
  }, []);

  async function loadCart() {
    try {
      const cartData = await fetchCartItems();
      setCart(cartData);
      
      // Fetch product details for each item in the cart
      const productData = {};
      for (const item of cartData) {
        if (!productDetails[item.productId]) {
          const product = await fetchProductById(item.productId);
          productData[item.productId] = product;
        }
      }
      setProductDetails(productData);
    } catch (error) {
      console.error("Error loading cart:", error);
    }
  }

  async function handleRemoveItem(id) {
    try {
      await removeCartItem(id);
    } catch (error) {
      console.error("Error removing item:", error);
    }
  }

  return (
    <div className="container">
      <h1>Shopping Cart</h1>
      {cart.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <div className="cart-list">
          {cart.map((item) => {
            const product = productDetails[item.productId] || {};
            return (
              <div key={item.id} className="cart-item">
                {product.productImage ? (
                  <img src={product.productImage} alt={product.productName} className="cart-image" />
                ) : (
                  <div className="no-image">No Image</div>
                )}
                <div className="cart-details">
                  <h3>{product.productName || "Loading..."}</h3>
                  <p>Price: ${product.productPrice ? product.productPrice.toFixed(2) : "N/A"}</p>
                  <p>Quantity: {item.quantity}</p>
                </div>
                <button className="remove-btn" onClick={() => handleRemoveItem(item.id)}>Remove</button>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default CartPage;