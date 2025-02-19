import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";  // Import useNavigate for page refresh
import { fetchProducts, createProduct, updateProduct, deleteProduct, addToCart } from "../api_services";
import ProductList from "./ProductList";
import "../App.css";

function ProductPage() {
  const [products, setProducts] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [productName, setProductName] = useState("");
  const [productPrice, setProductPrice] = useState("");
  const [productImage, setProductImage] = useState("");

  const navigate = useNavigate(); // React Router navigation

  useEffect(() => {
    loadProducts();
  }, []);

  async function loadProducts() {
    try {
      const data = await fetchProducts();
      setProducts(data);
    } catch (error) {
      console.error(error);
    }
  }

  function handleToggleForm(product = null) {
    if (product) {
      setShowForm(true);
      setEditingProduct(product);
      setProductName(product.productName);
      setProductPrice(product.productPrice);
      setProductImage(product.productImage || "");
    } else {
      setShowForm(!showForm);
      resetForm();
    }
  }

  function resetForm() {
    setEditingProduct(null);
    setProductName("");
    setProductPrice("");
    setProductImage("");
  }

  async function handleSaveProduct(e) {
    e.preventDefault();
    if (!productName || !productPrice) {
      alert("Please enter product name and price.");
      return;
    }

    const productData = {
      productName,
      productPrice: parseFloat(productPrice),
      productImage,
    };

    try {
      if (editingProduct) {
        await updateProduct(editingProduct.id, productData);

      } else {
        await createProduct(productData);
      }

      setShowForm(false);
      resetForm();
      

      
    } catch (error) {
      console.error(error);
    }
  }

  async function handleDeleteProduct(productId) {
    if (window.confirm("Are you sure you want to delete this product?")) {
      try {
        await deleteProduct(productId);
        
        // Reload using navigation
        navigate("/reload");
        setTimeout(() => navigate("/store"), 100);
        
      } catch (error) {
        console.error(error);
      }
    }
  }

  async function handleAddToCart(product) {
    try {
      await addToCart({ productId: product.id, quantity: 1 });
      alert("Product added to cart!");
    } catch (error) {
      console.error("Error adding to cart:", error);
    }
  }

  return (
    <div className="container">
      <button className="btn-add" onClick={() => handleToggleForm()}>
        {showForm ? "Close Form" : "Add Product"}
      </button>

      {showForm && (
        <div className="form-container">
          <h2>{editingProduct ? "Update Product" : "Add New Product"}</h2>
          <form onSubmit={handleSaveProduct}>
            <input 
              type="text" 
              value={productName} 
              onChange={(e) => setProductName(e.target.value)} 
              placeholder="Product Name" 
              required 
            />
            <input 
              type="number" 
              value={productPrice} 
              onChange={(e) => setProductPrice(e.target.value)} 
              placeholder="Price" 
              required 
            />
            <input 
              type="text" 
              value={productImage} 
              onChange={(e) => setProductImage(e.target.value)} 
              placeholder="Image URL" 
            />
            <button type="submit">
              {editingProduct ? "Update" : "Submit"}
            </button>
            <button type="button" onClick={() => setShowForm(false)}>
              Cancel
            </button>
          </form>
        </div>
      )}

      <ProductList 
        products={products} 
        onUpdateProduct={handleToggleForm} 
        onDeleteProduct={handleDeleteProduct} 
        onAddToCart={handleAddToCart} 
      />
    </div>
  );
}

export default ProductPage;