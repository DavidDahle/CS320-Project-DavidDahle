import { API_URL } from "./config";

/** PRODUCTS API */

// Fetch all products
export async function fetchProducts() {
  const response = await fetch(`${API_URL}/products`);
  if (!response.ok) throw new Error("Failed to fetch products");
  return response.json();
}

// Fetch product details by ID
export async function fetchProductById(productId) {
    const response = await fetch(`${API_URL}/products/${productId}`);
    if (!response.ok) throw new Error("Failed to fetch product details");
    return response.json();
  }

// Create a new product
export async function createProduct(productData) {
  const response = await fetch(`${API_URL}/products`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(productData),
  });
  if (!response.ok) throw new Error("Failed to create product");
  window.location.reload();
}

// Update an existing product
export async function updateProduct(productId, productData) {
  const response = await fetch(`${API_URL}/products/${productId}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(productData),
  });
  if (!response.ok) throw new Error("Failed to update product");
  return response.json();
}

// Delete a product
export async function deleteProduct(productId) {
  const response = await fetch(`${API_URL}/products/${productId}`, {
    method: "DELETE",
  });
  if (!response.ok) throw new Error("Failed to delete product");
  return response;
}

/** CART API */

// Fetch cart items
export async function fetchCartItems() {
  const response = await fetch(`${API_URL}/cart`);
  if (!response.ok) throw new Error("Failed to fetch cart items");
  return response.json();
}

// Add item to cart
export async function addToCart(cartItem) {
  const response = await fetch(`${API_URL}/cart`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(cartItem),
  });
  if (!response.ok) throw new Error("Failed to add item to cart");
  await fetchCartItems()
  return "product added"
}

// Update cart item quantity
export async function updateCartItem(cartId, cartData) {
  const response = await fetch(`${API_URL}/cart/${cartId}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(cartData),
  });
  if (!response.ok) throw new Error("Failed to update cart item");
  return response.json();
}

// Remove item from cart
export async function removeCartItem(cartId) {
  const response = await fetch(`${API_URL}/cart/${cartId}`, {
    method: "DELETE",
  });
  if (!response.ok) throw new Error("Failed to remove cart item");
  window.location.reload(); 
  return response;
}
