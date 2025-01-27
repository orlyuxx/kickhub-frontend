"use client";

import React, { useState, useEffect } from "react";

function Page() {
  const [carts, setCarts] = useState([]);
  const [products, setProducts] = useState([]);
  const user = JSON.parse(localStorage.getItem("user"));
  const userId = user ? user.user_id : null;

  useEffect(() => {
    const fetchCarts = async () => {
      const response = await fetch("http://kickhub-backend.test/api/carts");
      const data = await response.json();
      const userCarts = data.filter(
        (cart) => cart.user_id === userId && cart.is_checked_out === 1
      );
      setCarts(userCarts);
    };

    const fetchProducts = async () => {
      const response = await fetch("http://kickhub-backend.test/api/products");
      const data = await response.json();
      setProducts(data);
    };

    if (userId) {
      fetchCarts();
      fetchProducts();
    }
  }, [userId]);

  return (
    <div className="bg-white pt-20 overflow-x-auto pb-20">
      <h1 className="px-10 py-10 font-bold-space-grotesk text-primary text-2xl">
        Transaction History
      </h1>
      <table className="table">
        {/* head */}
        <thead>
          <tr className="text-primary">
            <th></th>
            <th>Product Name</th>
            <th>Size</th>
            <th>Price</th>
            <th>Quantity</th>
            <th>Line Total</th>
          </tr>
        </thead>
        <tbody className="text-primary font-regular-inter text-md">
          {carts.length === 0 ? (
            <tr>
              <td colSpan="6" className="text-center">
                No checked out carts available.
              </td>
            </tr>
          ) : (
            carts.map((cart, index) => {
              const product = products.find(
                (p) => p.product_id === cart.product_id
              );
              return (
                <tr key={cart.cart_id}>
                  <th>{index + 1}</th>
                  <td>{product ? product.name : "Unknown Product"}</td>
                  <td>{product ? product.size : "N/A"}</td>
                  <td>₱{cart.product_price}</td>
                  <td>{cart.quantity}</td>
                  <td>{cart.line_total}</td>
                </tr>
              );
            })
          )}
        </tbody>
      </table>
    </div>
  );
}

export default Page;
