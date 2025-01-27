import { toast } from "react-toastify";

const CheckoutModal = ({ subtotal, shippingFee, cartId, onPaymentSuccess }) => {
  const handlePaymentSubmit = async (e) => {
    e.preventDefault();
    // Close the modal
    document.getElementById("checkout_modal").close();

    // Update the is_checked_out column in the shopping_carts table
    try {
      const response = await fetch(
        `http://kickhub-backend.test/api/carts/${cartId}/checkout`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ is_checked_out: true }),
        }
      );

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      // Now delete the cart
      const deleteResponse = await fetch(
        `http://kickhub-backend.test/api/carts/${cartId}`,
        {
          method: "DELETE",
        }
      );

      if (!deleteResponse.ok) {
        throw new Error("Failed to delete the cart");
      }

      // Call the function to clear the cart items
      onPaymentSuccess();

      // Show success toast
      toast.success("Payment successful! Thank you for your purchase.", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        style: {
          background: "#fff",
          color: "#111",
        },
      });
    } catch (error) {
      // Show error toast
      toast.error("Failed to update checkout status. Please try again.", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        style: {
          background: "#fff",
          color: "#111",
        },
      });
    }
  };

  const total = subtotal + shippingFee;

  return (
    <dialog id="checkout_modal" className="modal">
      <div className="modal-box max-w-3xl bg-white">
        <h3 className="font-bold text-2xl mb-4 text-[#111]">Checkout</h3>

        {/* Shipping Information */}
        <div className="mb-6">
          <h4 className="font-semibold text-lg mb-3 text-[#111]">
            Shipping Information
          </h4>
          <div className="grid grid-cols-2 gap-4">
            <input
              type="text"
              placeholder="First Name"
              className="input input-bordered w-full bg-white text-[#111] placeholder:text-gray-400 border-gray-300 focus:border-[#111] focus:ring-[#111]"
            />
            <input
              type="text"
              placeholder="Last Name"
              className="input input-bordered w-full bg-white text-[#111] placeholder:text-gray-400 border-gray-300 focus:border-[#111] focus:ring-[#111]"
            />
            <input
              type="text"
              placeholder="Street Address"
              className="input input-bordered w-full col-span-2 bg-white text-[#111] placeholder:text-gray-400 border-gray-300 focus:border-[#111] focus:ring-[#111]"
            />
            <input
              type="text"
              placeholder="City"
              className="input input-bordered w-full bg-white text-[#111] placeholder:text-gray-400 border-gray-300 focus:border-[#111] focus:ring-[#111]"
            />
            <input
              type="text"
              placeholder="Postal Code"
              className="input input-bordered w-full bg-white text-[#111] placeholder:text-gray-400 border-gray-300 focus:border-[#111] focus:ring-[#111]"
            />
            <input
              type="text"
              placeholder="Country"
              className="input input-bordered w-full bg-white text-[#111] placeholder:text-gray-400 border-gray-300 focus:border-[#111] focus:ring-[#111]"
            />
            <input
              type="email"
              placeholder="Email Address"
              className="input input-bordered w-full bg-white text-[#111] placeholder:text-gray-400 border-gray-300 focus:border-[#111] focus:ring-[#111]"
            />
          </div>
        </div>

        {/* Payment Options */}
        <div className="mb-6">
          <h4 className="font-semibold text-lg mb-3 text-[#111]">
            Payment Method
          </h4>
          <div className="flex flex-col gap-3">
            <label className="flex items-center gap-3 p-3 border border-gray-300 rounded-lg cursor-pointer hover:border-[#111]">
              <input
                type="radio"
                name="payment"
                className="radio border-gray-300 checked:bg-[#111]"
              />
              <span className="text-[#111]">Credit Card</span>
            </label>
            <label className="flex items-center gap-3 p-3 border border-gray-300 rounded-lg cursor-pointer hover:border-[#111]">
              <input
                type="radio"
                name="payment"
                className="radio border-gray-300 checked:bg-[#111]"
              />
              <span className="text-[#111]">PayPal</span>
            </label>
            <label className="flex items-center gap-3 p-3 border border-gray-300 rounded-lg cursor-pointer hover:border-[#111]">
              <input
                type="radio"
                name="payment"
                className="radio border-gray-300 checked:bg-[#111]"
              />
              <span className="text-[#111]">Apple Pay</span>
            </label>
          </div>
        </div>

        {/* Order Summary */}
        <div className="mb-6">
          <h4 className="font-semibold text-lg mb-3 text-[#111]">
            Order Summary
          </h4>
          <div className="bg-gray-50 p-4 rounded-lg">
            <div className="flex justify-between mb-2">
              <span className="text-[#111]">Subtotal</span>
              <span className="text-[#111]">₱{subtotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between mb-2">
              <span className="text-[#111]">Shipping</span>
              <span className="text-[#111]">${shippingFee.toFixed(2)}</span>
            </div>
            <div className="flex justify-between font-bold mt-2 pt-2 border-t border-gray-300">
              <span className="text-[#111]">Total</span>
              <span className="text-[#111]">${total.toFixed(2)}</span>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="modal-action">
          <form method="dialog" className="flex gap-2">
            <button className="btn bg-gray-200 hover:bg-gray-300 text-[#111] border-none">
              Cancel
            </button>
            <button className="btn bg-[#111] hover:bg-[#222] text-white border-none">
              Confirm Payment
            </button>
          </form>
        </div>
      </div>
    </dialog>
  );
};

export default CheckoutModal;
