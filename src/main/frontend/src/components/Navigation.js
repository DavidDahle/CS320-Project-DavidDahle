import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { fetchCartItems } from "../api_services";

function Navigation() {
  const [cartCount, setCartCount] = useState(0);

  useEffect(() => {
    loadCartCount();
  }, []);

  async function loadCartCount() {
    try {
      const cartItems = await fetchCartItems();
      const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0); // Sum all quantities
      setCartCount(totalItems);
    } catch (error) {
      console.error("Error fetching cart count:", error);
    }
  }

  return (
    <nav className="navbar">
      <div className="nav-brand">SLC Strong Store</div>
      <div className="nav-links">
        <Link to="/">Home</Link>
        <Link to="/store">Store</Link>
        <Link to="/cart">
          Cart {cartCount > 0 && <span className="cart-count">({cartCount})</span>}
        </Link>
      </div>
    </nav>
  );
}

export default Navigation;