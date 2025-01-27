"use client";

import Image from "next/image";
import { useState, useEffect } from "react";

export default function Cart() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [productDetails, setProductDetails] = useState({});
  const [productImages, setProductImages] = useState({});
  const [selectedItems, setSelectedItems] = useState(new Set());
  const [showCheckoutModal, setShowCheckoutModal] = useState(false);
  const [itemToDelete, setItemToDelete] = useState(null);
  const [selectedItemsData, setSelectedItemsData] = useState([]);
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState(null);
  const [deliveryAddress, setDeliveryAddress] = useState("");

  useEffect(() => {
    const fetchCart = async () => {
      try {
        const user = JSON.parse(localStorage.getItem("user"));
        console.log("User from localStorage:", user);

        if (!user) {
          return;
        }

        const token = localStorage.getItem("token");
        console.log("Token:", token);

        const response = await fetch("http://kickhub-backend.test/api/carts", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error("Failed to fetch cart");
        }

        const data = await response.json();
        console.log("API Response:", data);
        setItems(data.filter((item) => !item.is_checked_out));
      } catch (error) {
        console.error("Error fetching cart:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCart();
  }, []);

  useEffect(() => {
    const fetchProductDetails = async () => {
      try {
        // Fetch individual product details
        const detailsMap = {};
        for (const item of items) {
          const productsResponse = await fetch(
            `http://kickhub-backend.test/api/products/${item.product_id}`
          );
          const productData = await productsResponse.json();
          detailsMap[item.product_id] = productData;
        }
        setProductDetails(detailsMap);

        // Fetch all product images
        const imagesResponse = await fetch(
          "http://kickhub-backend.test/api/product-images"
        );
        const imagesData = await imagesResponse.json();

        // Create image map using the data array from the response
        const imageMap = {};
        items.forEach((cartItem) => {
          const productImages = imagesData.data.filter(
            (img) => img.product_id === cartItem.product_id
          );

          if (productImages.length > 0) {
            const sortedImages = productImages.sort((a, b) =>
              a.image_url.localeCompare(b.image_url)
            );
            // Ensure the URL is absolute
            const imageUrl = sortedImages[0].image_url.startsWith("http")
              ? sortedImages[0].image_url
              : `http://kickhub-backend.test${sortedImages[0].image_url}`;
            imageMap[cartItem.product_id] = imageUrl;
          }
        });

        setProductImages(imageMap);
      } catch (error) {
        console.error("Error fetching product details:", error);
      }
    };

    if (items.length > 0) {
      fetchProductDetails();
    }
  }, [items]);

  const calculateSubtotal = () => {
    return items.reduce((total, item) => {
      const lineTotal = item.line_total ? parseFloat(item.line_total) : 0;
      return total + lineTotal;
    }, 0);
  };

  const getSelectedItemsData = () => {
    return items.filter((item) => selectedItems.has(item.cart_id));
  };

  const handleCheckout = () => {
    const selectedItemsData = getSelectedItemsData();
    console.log("Selected Items Data:", selectedItemsData); // Debugging line
    if (selectedItemsData.length > 0) {
      setSelectedItemsData(selectedItemsData); // Set the selected items for checkout
      document.getElementById("checkout_modal").showModal(); // Open the checkout modal
    } else {
      alert("Please select items to checkout."); // Alert if no items are selected
    }
  };

  const handleCheckboxChange = (cartId) => {
    setSelectedItems((prevSelected) => {
      const newSelected = new Set(prevSelected);
      if (newSelected.has(cartId)) {
        newSelected.delete(cartId);
      } else {
        newSelected.add(cartId);
      }
      return newSelected;
    });
  };

  const handleDeleteItem = async (cartId) => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(
        `http://kickhub-backend.test/api/carts/${cartId}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error("Failed to delete item");
      }

      // Update the items state to remove the deleted item
      setItems((prevItems) =>
        prevItems.filter((item) => item.cart_id !== cartId)
      );
      console.log(`Item with cart ID: ${cartId} deleted successfully.`);
    } catch (error) {
      console.error("Error deleting item:", error);
    }
  };

  // Dummy function to simulate payment processing
  const handlePayment = (event) => {
    event.preventDefault(); // Prevent the default form submission
    alert(`Payment processed for ${selectedPaymentMethod}`);
    // Here you can add logic to handle the payment based on the selected method
  };

  if (loading) {
    return <div className="bg-white px-20 pt-32">Loading...</div>;
  }

  if (items.length === 0) {
    return (
      <div className="bg-white px-20 pt-32 pb-96">
        <br />
        <br />
        <br />
        <br /> <br /> <br /> <br />
        <p className="text-center text-[#111] text-xl">Your cart is empty</p>
      </div>
    );
  }

  return (
    <div className="bg-white px-20 pt-32 pb-80">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Left side - Cart Items */}
        <div>
          <h2 className="text-[#111] text-2xl font-medium mb-6">
            Bag{" "}
            {selectedItems.size > 0 && `(${selectedItems.size} Selected Items)`}
          </h2>
          <div className="space-y-6">
            {items.map((item) => (
              <div
                key={item.cart_id}
                className="flex gap-4 pb-6 border-b border-gray-200"
              >
                <input
                  type="checkbox"
                  className="mr-4 h-4 w-4 appearance-none checked:bg-black checked:border-transparent border-2 border-gray-300 rounded"
                  onChange={() => handleCheckboxChange(item.cart_id)}
                />
                <div className="w-40 h-40 bg-gray-100 relative">
                  <Image
                    src={
                      productImages[item.product_id] || "/placeholder-image.jpg"
                    }
                    alt={`Product ${item.product_id}`}
                    fill
                    className="object-contain"
                  />
                </div>
                <div className="flex-1">
                  <h3 className="text-[#111] font-medium">
                    {productDetails[item.product_id]?.name || "Loading..."}
                  </h3>
                  <p className="text-[#707072]">
                    {productDetails[item.product_id]?.gender || ""}
                  </p>
                  <p className="text-[#707072]">
                    Size:{" "}
                    {productDetails[item.product_id]?.size || "Not specified"}
                  </p>
                  <p className="text-[#707072]">Quantity: {item.quantity}</p>
                  <div className="mt-4 flex items-center gap-4">
                    <button
                      className="p-2 text-[#707072] hover:text-[#111]"
                      onClick={() => {
                        setItemToDelete(item.cart_id);
                        document.getElementById("my_modal_1").showModal();
                      }}
                    >
                      <TrashIcon className="w-5 h-5" />
                    </button>
                    <div className="flex items-center">
                      <button className="px-3 py-1 border border-gray-300 text-[#111]">
                        -
                      </button>
                      <span className="px-4 text-[#111]">{item.quantity}</span>
                      <button className="px-3 py-1 border border-gray-300 text-[#111]">
                        +
                      </button>
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-[#111]">
                    ₱{parseFloat(item.product_price).toFixed(2)}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right side - Summary */}
        <div>
          <h2 className="text-[#111] text-2xl font-medium mb-6">Summary</h2>
          <div className="space-y-4">
            <div className="flex justify-between text-[#111]">
              <span>Subtotal</span>
              <span>₱{calculateSubtotal().toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-[#111]">
              <span>Estimated Delivery & Handling</span>
              <span>₱{(0.0).toFixed(2)}</span>
            </div>
            <div className="pt-4 border-t border-gray-200 flex justify-between font-medium text-[#111]">
              <span>Total</span>
              <span>₱{calculateSubtotal().toFixed(2)}</span>
            </div>
            <button
              className="w-full bg-[#111] text-white py-4 rounded-full mt-6 hover:bg-[#222]"
              onClick={handleCheckout}
            >
              Checkout
            </button>
          </div>
        </div>
      </div>

      {/* Confirmation Modal */}
      <dialog id="my_modal_1" className="modal">
        <div className="modal-box">
          <h3 className="font-bold-space-grotesk text-primary text-lg">
            Confirm Deletion
          </h3>
          <p className="py-4 font-regular-inter text-primary">
            Are you sure you want to delete this item?
          </p>
          <div className="modal-action">
            <button
              className="btn"
              onClick={() => {
                handleDeleteItem(itemToDelete);
                document.getElementById("my_modal_1").close();
              }}
            >
              Confirm
            </button>
            <form method="dialog">
              <button className="btn">Close</button>
            </form>
          </div>
        </div>
      </dialog>

      {/* Checkout Modal using DaisyUI */}
      <dialog id="checkout_modal" className="modal">
        <div className="modal-box max-w-3xl bg-white">
          <h3 className="font-bold text-2xl mb-4 text-[#111]">Checkout</h3>

          {/* Order Summary */}
          <div className="mb-6">
            <h4 className="font-semibold text-lg mb-3 text-[#111]">
              Order Summary
            </h4>
            <div className="bg-gray-50 p-4 rounded-lg">
              {selectedItemsData.map((item) => (
                <div key={item.cart_id} className="flex justify-between mb-2">
                  <span className="text-[#111]">
                    {productDetails[item.product_id]?.name || "Loading..."}
                  </span>
                  <span className="text-[#111]">
                    ₱{parseFloat(item.product_price).toFixed(2)}
                  </span>
                </div>
              ))}
              <div className="flex justify-between mb-2">
                <span className="text-[#111]">Subtotal</span>
                <span className="text-[#111]">
                  ₱{calculateSubtotal().toFixed(2)}
                </span>
              </div>
              <div className="flex justify-between mb-2">
                <span className="text-[#111]">Shipping</span>
                <span className="text-[#111]">₱{(0.0).toFixed(2)}</span>
              </div>
              <div className="flex justify-between font-bold mt-2 pt-2 border-t border-gray-300">
                <span className="text-[#111]">Total</span>
                <span className="text-[#111]">
                  ₱{calculateSubtotal().toFixed(2)}
                </span>
              </div>
            </div>
          </div>

          <div className="modal-action">
            <form method="dialog">
              <button className="btn">Close</button>
            </form>
            <button
              className="btn btn-primary"
              onClick={() => {
                document.getElementById("checkout_modal").close();
                document.getElementById("payment_options_modal").showModal();
              }}
            >
              Proceed to Payment
            </button>
          </div>
        </div>
      </dialog>

      {/* New Payment Options Modal using DaisyUI structure */}
      <dialog id="payment_options_modal" className="modal">
        <div className="modal-box">
          <h3 className="font-bold-space-grotesk text-primary text-lg">
            Payment Options
          </h3>
          <p className="py-4 font-regualr-inter text-primary">
            Choose your preferred payment method:
          </p>
          <ul className="space-y-2">
            <li>
              <button
                className="btn btn-outline"
                onClick={() => setSelectedPaymentMethod("card")}
              >
                Credit/Debit Card
              </button>
            </li>
            <li>
              <button
                className="btn btn-outline"
                onClick={() => setSelectedPaymentMethod("paypal")}
              >
                PayPal
              </button>
            </li>
            <li>
              <button
                className="btn btn-outline"
                onClick={() => setSelectedPaymentMethod("bank")}
              >
                Bank Transfer
              </button>
            </li>
            <li>
              <button
                className="btn btn-outline"
                onClick={() => setSelectedPaymentMethod("cod")}
              >
                Cash on Delivery
              </button>
            </li>
          </ul>

          {/* Conditional Input Fields */}
          {selectedPaymentMethod === "card" && (
            <div>
              <h4 className="font-bold mt-4 font-bold-inter text-primary">
                Enter Credit/Debit Card Details
              </h4>
              <form id="payment-form" onSubmit={handlePayment}>
                <div className="mb-4">
                  <label
                    htmlFor="card-number"
                    className="block mb-2 font-regular-inter text-primary"
                  >
                    Card Number
                  </label>
                  <input
                    type="text"
                    id="card-number"
                    className="input input-bordered w-full font-regular-inter text-primary"
                    placeholder="123-456-789"
                    required
                  />
                </div>
                <div className="mb-4">
                  <label
                    htmlFor="card-expiry"
                    className="block mb-2 font-regular-inter text-primary"
                  >
                    Expiry Date
                  </label>
                  <input
                    type="text"
                    id="card-expiry"
                    className="input input-bordered w-full font-regular-inter text-primary"
                    placeholder="MM/YY"
                    required
                  />
                </div>
                <div className="mb-4">
                  <label
                    htmlFor="card-cvc"
                    className="block mb-2 font-regular-inter text-primary"
                  >
                    CVC
                  </label>
                  <input
                    type="text"
                    id="card-cvc"
                    className="input input-bordered w-full font-regular-inter text-primary"
                    placeholder="11223344-55667788"
                    required
                  />
                </div>
                <button type="submit" className="btn btn-primary">
                  Pay
                </button>
              </form>
            </div>
          )}

          {selectedPaymentMethod === "paypal" && (
            <div>
              <h4 className="font-bold mt-4 font-bold-inter text-primary pb-2">
                PayPal Payment
              </h4>
              <p className="font-regular-inter text-primary pb-4">
                Please log in to your PayPal account to complete the payment.
              </p>
              <button className="btn btn-primary" onClick={handlePayment}>
                Pay with PayPal
              </button>
            </div>
          )}

          {selectedPaymentMethod === "bank" && (
            <div>
              <h4 className="font-bold mt-4 font-bold-grotesk text-primary">
                Bank Transfer
              </h4>
              <p className="font-regular-inter text-primary pt-2">
                Please transfer the total amount to the following bank account:
              </p>
              <p className="font-regular-inter text-primary pt-2">
                Account Name: Your Bank Account
              </p>
              <p className="font-regular-inter text-primary pt-2">
                Account Number: 123456789
              </p>
              <p className="font-regular-inter text-primary pt-2">
                Bank: Your Bank Name
              </p>
              <p className="font-regular-inter text-primary pt-2">
                Reference: Your Order ID
              </p>
              <p className="font-regular-inter text-primary pt-2">
                Once the transfer is complete, please upload a screenshot of the
                transaction:
              </p>
              <input type="file" accept="image/*" className="mt-2" />
              <button className="btn btn-primary mt-2">
                Upload Screenshot
              </button>
            </div>
          )}

          {selectedPaymentMethod === "cod" && (
            <div>
              <h4 className="font-bold mt-4 font-bold-space-grotesk text-primary">
                Cash on Delivery
              </h4>
              <p className="font-regular-inter text-primary">
                You will pay in cash when the order is delivered.
              </p>
              <button
                className="btn btn-primary mt-4"
                onClick={async () => {
                  const selectedItemsData = getSelectedItemsData();
                  if (selectedItemsData.length > 0) {
                    const cartId = selectedItemsData[0].cart_id;
                    const paymentMethod = "cod";

                    try {
                      const token = localStorage.getItem("token");
                      const response = await fetch(
                        `http://kickhub-backend.test/api/carts/checkout/${cartId}`,
                        {
                          method: "PUT",
                          headers: {
                            Authorization: `Bearer ${token}`,
                            "Content-Type": "application/json",
                          },
                          body: JSON.stringify({
                            payment_method: paymentMethod,
                          }),
                        }
                      );

                      const textResponse = await response.text();
                      console.log("Response Text:", textResponse);

                      if (!response.ok) {
                        throw new Error("Failed to checkout cart");
                      }

                      const data = JSON.parse(textResponse);
                      console.log(data.message);
                      setItems((prevItems) =>
                        prevItems.filter((item) => item.cart_id !== cartId)
                      );
                    } catch (error) {
                      console.error("Error during checkout:", error);
                    }

                    document.getElementById("checkout_modal").close();
                  } else {
                    alert("Please select items to checkout.");
                  }
                }}
              >
                Submit
              </button>
            </div>
          )}

          <div className="modal-action">
            <form method="dialog">
              <button className="btn -mb-10">Close</button>
            </form>
          </div>
        </div>
      </dialog>
    </div>
  );
}

// Simple icon components (you can replace with your preferred icons)
function TrashIcon({ className }) {
  return (
    <svg
      className={className}
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
      />
    </svg>
  );
}

function HeartIcon({ className }) {
  return (
    <svg
      className={className}
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
      />
    </svg>
  );
}
