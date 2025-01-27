import React from "react";

const Sidebar = () => {
  return (
    <>
      <div className="w-1/6 text-primary font-bold-inter pe-10 h-screen overflow-y-auto scrollbar-thin scrollbar-thumb-rounded-full scrollbar-thumb-gray-400 scrollbar-track-gray-100">
        <button
          className="mb-4 text-md"
          onClick={() => document.getElementById("sign_in_modal").showModal()}
        >
          Sign In
        </button>

        {/* Categories */}
        <div className="cursor-pointer">
          <h2 className="text-md pb-2">Sneakers</h2>
          <h2 className="text-md pb-2">Sports</h2>
          <h2 className="text-md pb-2">Casual</h2>
          <h2 className="text-md pb-2">Loafers</h2>
          <h2 className="text-md pb-2">Loafers</h2>
          <h2 className="text-md pb-2">Dress Shoes</h2>
          <h2 className="text-md pb-2">Oxfords</h2>
          <h2 className="text-md pb-2">Boots</h2>
          <h2 className="text-md pb-2">Sandals, Slides, & Flip Flops</h2>
        </div>

        <hr className="mt-4 border-t-2 border-gray-00" />

        {/* Gender Section */}
        <details className="mb-4 group-open:mb-2 group" open>
          <summary className="text-md pb-1 mt-4 mb-4 cursor-pointer list-none flex items-center justify-between">
            Gender (2)
            <svg
              className="w-4 h-4 transition-transform group-open:rotate-180"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </summary>
          <div className="form-control">
            <label
              className="flex items-center gap-2 cursor-pointer"
              htmlFor="men"
            >
              <input type="checkbox" id="men" className="checkbox w-4 h-4" />
              <span className="text-gray-800 font-medium-inter">Men</span>
            </label>
          </div>
          <div className="form-control">
            <label
              className="flex items-center gap-2 cursor-pointer"
              htmlFor="women"
            >
              <input type="checkbox" id="women" className="checkbox w-4 h-4" />
              <span className="text-gray-800 font-medium-inter">Women</span>
            </label>
          </div>
        </details>

        <hr className="border-t-2 border-gray-00" />

        {/* Brand Section */}
        <details className="mb-10 group" open>
          <summary className="text-md pb-1 mt-4 mb-4 cursor-pointer list-none flex items-center justify-between">
            Brand
            <svg
              className="w-4 h-4 transition-transform group-open:rotate-180"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </summary>
          <div className="form-control cursor-pointer">
            <span className="text-gray-800 font-medium-inter pb-1">Nike</span>
            <span className="text-gray-800 font-medium-inter pb-1">Jordan</span>
            <span className="text-gray-800 font-medium-inter pb-1">Adidas</span>
            <span className="text-gray-800 font-medium-inter pb-1">
              New Balance
            </span>
            <span className="text-gray-800 font-medium-inter pb-1">Vans</span>
            <span className="text-gray-800 font-medium-inter pb-1">Vans</span>
            <span className="text-gray-800 font-medium-inter pb-1">Vans</span>
            <span className="text-gray-800 font-medium-inter pb-1">Vans</span>
          </div>
        </details>
      </div>

      {/* Sign In Modal */}
      <dialog id="sign_in_modal" className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-lg">Sign In</h3>
          <p className="py-4">Please sign in to continue</p>
          <div className="modal-action">
            <form method="dialog">
              <button className="btn">Close</button>
            </form>
          </div>
        </div>
      </dialog>
    </>
  );
};

export default Sidebar;
