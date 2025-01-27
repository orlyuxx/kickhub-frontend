"use client";

import React, { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Image from "next/image";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ProductDetail = () => {
  const { store, product } = useParams();
  const router = useRouter();
  const [productData, setProductData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [selectedSizeMen, setSelectedSizeMen] = useState(null);
  const [selectedSizeWomen, setSelectedSizeWomen] = useState(null);
  const [inventoryItems, setInventoryItems] = useState([]);
  const [isAddingToCart, setIsAddingToCart] = useState(false);
  const [quantity, setQuantity] = useState(1);

  const stores = [
    { id: 1, name: "KickHub Butuan", slug: "butuan" },
    { id: 2, name: "KickHub Cebu", slug: "cebu" },
    { id: 3, name: "KickHub Davao", slug: "davao" },
  ];

  // Find the current store name
  const currentStore = stores.find((s) => s.slug === store)?.name;

  useEffect(() => {
    const fetchProductDetails = async () => {
      setIsLoading(true);
      const currentStore = stores.find((s) => s.slug === store);

      if (!currentStore) {
        router.push("/404");
        return;
      }

      try {
        // 1. Fetch store inventory
        const inventoryRes = await fetch(
          `http://kickhub-backend.test/api/inventory/store/${currentStore.id}`
        );
        const inventoryData = await inventoryRes.json();
        const inventoryItems = inventoryData?.inventory || [];
        setInventoryItems(inventoryItems);

        // 2. Fetch product images
        const imagesRes = await fetch(
          `http://kickhub-backend.test/api/product-images`
        );
        const imagesData = await imagesRes.json();
        const imageItems = imagesData?.data || [];

        // 3. Fetch subcategories
        const subCategoriesResponse = await fetch(
          "http://kickhub-backend.test/api/subcategories"
        );
        const subCategoriesData = await subCategoriesResponse.json();
        const subCategoriesMap = subCategoriesData.reduce((acc, sub) => {
          acc[sub.sub_category_id] = sub.name;
          return acc;
        }, {});

        // Find the specific product
        const productItem = inventoryItems.find(
          (item) =>
            item.product.name.toLowerCase().replace(/\s+/g, "") ===
            decodeURIComponent(product)
        );

        if (!productItem) {
          router.push("/404");
          return;
        }

        // Get all images for this product
        const productImages = imageItems
          .filter((img) => img.product_id === productItem.product.product_id)
          .sort((a, b) => b.image_id - a.image_id)
          .map((img) => `http://kickhub-backend.test${img.image_url}`);

        // Combine all data
        const enrichedProductData = {
          ...productItem,
          images: productImages,
          sub_category_name:
            subCategoriesMap[productItem.product.sub_category_id],
        };

        setProductData(enrichedProductData);
      } catch (error) {
        console.error("Error fetching product details:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProductDetails();
  }, [store, product, router]);

  const handleSizeClickMen = (size) => {
    setSelectedSizeMen(size);
    setSelectedSizeWomen(null);
  };

  const handleSizeClickWomen = (size) => {
    setSelectedSizeWomen(size);
    setSelectedSizeMen(null);
  };

  // Function to check if a size is available in the inventory
  const isSizeAvailable = (gender, size) => {
    return inventoryItems.some((item) => {
      const matchingProduct = item.product;
      return (
        matchingProduct.gender === gender &&
        matchingProduct.size === String(size) && // Convert size to string for comparison
        item.quantity > 0 &&
        matchingProduct.name === productData.product.name
      );
    });
  };

  // Add this new function to get quantity for a specific size
  const getQuantityForSize = (gender, size) => {
    const item = inventoryItems.find(
      (item) =>
        item.product.gender === gender &&
        item.product.size === String(size) &&
        item.product.name === productData.product.name
    );
    return item ? item.quantity : 0;
  };

  const incrementQuantity = () => {
    const maxQuantity = selectedSizeMen
      ? getQuantityForSize("men", selectedSizeMen)
      : getQuantityForSize("women", selectedSizeWomen);

    if (quantity < maxQuantity) {
      setQuantity((prev) => prev + 1);
    }
  };

  const decrementQuantity = () => {
    if (quantity > 1) {
      setQuantity((prev) => prev - 1);
    }
  };

  const handleAddToBag = async () => {
    if (!selectedSizeMen && !selectedSizeWomen) {
      toast.error("Please select a size");
      return;
    }

    const userData = JSON.parse(localStorage.getItem("user"));
    if (!userData) {
      toast.error("Please log in to add items to cart");
      return;
    }

    setIsAddingToCart(true);
    const selectedSize = selectedSizeMen || selectedSizeWomen;
    const selectedGender = selectedSizeMen ? "men" : "women";

    try {
      const selectedItem = inventoryItems.find(
        (item) =>
          item.product.gender === selectedGender &&
          item.product.size === String(selectedSize) &&
          item.product.name === productData.product.name
      );

      if (!selectedItem) {
        throw new Error("Product not found in inventory");
      }

      const cartData = {
        user_id: userData.user_id,
        store_id: stores.find((s) => s.slug === store)?.id,
        product_id: selectedItem.product.product_id,
        product_price: productData.price,
        quantity: quantity,
        line_total: productData.price * quantity,
        is_checked_out: false,
      };

      const response = await fetch(`http://kickhub-backend.test/api/carts`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(cartData),
      });

      if (!response.ok) {
        const contentType = response.headers.get("content-type");
        if (contentType && contentType.includes("application/json")) {
          const errorData = await response.json();
          throw new Error(errorData.message || "Failed to add item to cart");
        } else {
          throw new Error(
            `HTTP error! status: ${response.status} ${response.statusText}`
          );
        }
      }

      const responseData = await response.json();
      console.log("Success response:", responseData);
      toast.success("Item added to cart successfully!");
      setQuantity(1);
    } catch (error) {
      console.error("Error adding to cart:", error);
      toast.error(error.message || "Failed to add item to cart");
    } finally {
      setIsAddingToCart(false);
    }
  };

  if (isLoading) {
    return (
      <main className="min-h-screen bg-white py-20">
        <div className="container mx-auto px-4 py-8">
          <div className="animate-pulse">
            <div className="flex flex-col md:flex-row gap-8">
              {/* Image skeleton */}
              <div className="md:w-1/2">
                <div className="bg-gray-200 rounded-lg h-96 w-full"></div>
              </div>
              {/* Content skeleton */}
              <div className="md:w-1/2">
                <div className="h-8 bg-gray-200 rounded w-3/4 mb-4"></div>
                <div className="h-6 bg-gray-200 rounded w-1/2 mb-4"></div>
                <div className="h-6 bg-gray-200 rounded w-1/4 mb-8"></div>
                <div className="h-24 bg-gray-200 rounded w-full"></div>
              </div>
            </div>
          </div>
        </div>
      </main>
    );
  }

  if (!productData) {
    return null;
  }

  return (
    <main className="min-h-screen bg-white py-20">
      <ToastContainer />
      <div className="container mx-auto px-24 py-8">
        {/* Display the current store name */}
        {currentStore && (
          <h2 className="text-xl text-primary font-bold-space-grotesk mb-4">
            {currentStore}
          </h2>
        )}

        <div className="flex flex-col md:flex-row gap-8">
          {/* Image Gallery */}
          <div className="md:w-1/2">
            <div className="flex gap-4">
              {/* Main Image */}
              <div className="relative aspect-square w-full max-w-[500px] max-h-[500px]">
                <Image
                  src={
                    productData.images[selectedImageIndex] ||
                    "/images/placeholder-image.jpg"
                  }
                  alt={`${productData.product.name} main view`}
                  layout="fill"
                  objectFit="cover"
                  className="rounded-lg"
                />
              </div>

              {/* Thumbnail Gallery - Using flex for better spacing */}
              <div className="flex flex-col gap-4 overflow-y-auto max-h-[500px]">
                {" "}
                {/* Added overflow-y-auto for scrolling */}
                {productData.images.map((image, index) => (
                  <div
                    key={index}
                    onClick={() => setSelectedImageIndex(index)}
                    className={`relative h-16 w-16 cursor-pointer transition-all duration-200 ${
                      selectedImageIndex === index ? "" : "hover:opacity-75"
                    }`}
                  >
                    <Image
                      src={image}
                      alt={`${productData.product.name} view ${index + 1}`}
                      layout="fill"
                      objectFit="cover"
                      className="rounded-lg"
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Product Details */}
          <div className="md:w-1/2">
            <h1 className="text-3xl font-bold text-primary mb-2">
              {productData.product.name}
            </h1>
            <p className="text-gray-600 mb-2 capitalize">
              {productData.sub_category_name}
            </p>
            <p className="text-gray-500 mb-4 capitalize">
              Color: {productData.product.color}
            </p>
            <p className="text-2xl font-bold text-primary mb-6">
              ₱{productData.price}
            </p>
            <div className="prose max-w-none">
              <h2 className="text-lg text-primary font-regular-space-grotesk pb-4 pt-6">
                Select Size
              </h2>

              {/* Men's Sizes */}
              <div>
                <h3 className="text-md font-bold-inter text-primary mb-2">
                  Men
                  {selectedSizeMen && (
                    <span
                      className={`text-sm pl-2 ${
                        getQuantityForSize("men", selectedSizeMen) <= 5
                          ? "text-red-500"
                          : "text-gray-500"
                      }`}
                    >
                      Stocks left: {getQuantityForSize("men", selectedSizeMen)}
                    </span>
                  )}
                </h3>
                <div className="grid grid-cols-4 gap-2 pb-4">
                  {[7, 7.5, 8, 8.5, 9, 9.5, 10, 10.5].map((size) => (
                    <div
                      key={size}
                      onClick={() =>
                        isSizeAvailable("men", size) && handleSizeClickMen(size)
                      }
                      className={`relative h-10 flex flex-col text-primary items-center justify-center border rounded-lg cursor-pointer 
                        ${
                          selectedSizeMen === size
                            ? "border-black"
                            : "border-gray-300"
                        } 
                        ${
                          isSizeAvailable("men", size)
                            ? ""
                            : "opacity-50 cursor-not-allowed"
                        }
                        hover:border-black focus:border-black`}
                      style={{
                        pointerEvents: isSizeAvailable("men", size)
                          ? "auto"
                          : "none",
                      }}
                    >
                      <span>US {size}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Women's Sizes */}
              <div className="mt-4">
                <h3 className="text-md font-bold-inter text-primary mb-2">
                  Women
                  {selectedSizeWomen && (
                    <span
                      className={`text-sm pl-2 ${
                        getQuantityForSize("women", selectedSizeWomen) <= 5
                          ? "text-red-500"
                          : "text-gray-500"
                      }`}
                    >
                      Stocks left:{" "}
                      {getQuantityForSize("women", selectedSizeWomen)}
                    </span>
                  )}
                </h3>
                <div className="grid grid-cols-4 gap-2">
                  {[7, 7.5, 8, 8.5].map((size) => (
                    <div
                      key={size}
                      onClick={() =>
                        isSizeAvailable("women", size) &&
                        handleSizeClickWomen(size)
                      }
                      className={`relative h-10 flex flex-col text-primary items-center justify-center border rounded-lg cursor-pointer 
                        ${
                          selectedSizeWomen === size
                            ? "border-black"
                            : "border-gray-300"
                        } 
                        ${
                          isSizeAvailable("women", size)
                            ? ""
                            : "opacity-50 cursor-not-allowed"
                        }
                        hover:border-black focus:border-black`}
                      style={{
                        pointerEvents: isSizeAvailable("women", size)
                          ? "auto"
                          : "none",
                      }}
                    >
                      <span>US {size}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Add this before the Add to bag button */}
              <div className="mt-6 mb-4">
                <h3 className="text-md font-bold-inter text-primary mb-2">
                  Quantity
                </h3>
                <div className="flex items-center space-x-4">
                  <button
                    onClick={decrementQuantity}
                    className="w-8 h-8 rounded-full border border-gray-900 text-primary flex items-center justify-center hover:border-black"
                    disabled={quantity <= 1}
                  >
                    -
                  </button>
                  <span className="text-lg font-bold-inter text-primary">
                    {quantity}
                  </span>
                  <button
                    onClick={incrementQuantity}
                    className="w-8 h-8 rounded-full border border-gray-900 text-primary flex items-center justify-center hover:border-black"
                    disabled={
                      quantity >=
                      (selectedSizeMen
                        ? getQuantityForSize("men", selectedSizeMen)
                        : getQuantityForSize("women", selectedSizeWomen))
                    }
                  >
                    +
                  </button>
                </div>
              </div>

              {/* Add to bag button */}
              <div className="mt-6">
                <button
                  onClick={handleAddToBag}
                  disabled={
                    isAddingToCart || (!selectedSizeMen && !selectedSizeWomen)
                  }
                  className="bg-black text-white py-3 px-6 rounded-full w-full hover:bg-gray-900 transition duration-200 disabled:bg-gray-400 disabled:cursor-not-allowed"
                >
                  {isAddingToCart ? "Adding..." : "Add to Bag"}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default ProductDetail;
