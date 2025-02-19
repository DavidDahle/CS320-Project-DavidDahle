import React from "react";

function ProductList({ products, onUpdateProduct, onDeleteProduct, onAddToCart }) {
  return (
    <div className="product-list">
      {products.length === 0 ? (
        <p>No products found.</p>
      ) : (
        products.map((p) => (
          <div className="product-card" key={p.id}>
            <h3>{p.productName}</h3>
            <p>${p.productPrice}</p>
            {p.productImage ? (
              <img src={p.productImage} alt={p.productName} />
            ) : (
              <div className="no-image">No Image</div>
            )}

            <div className="product-actions">
              <button onClick={() => onUpdateProduct(p)}>Update</button>
              <button onClick={() => onDeleteProduct(p.id)}>Delete</button>
              <button onClick={() => onAddToCart(p)}>Add to Cart</button>
            </div>
          </div>
        ))
      )}
    </div>
  );
}

export default ProductList;