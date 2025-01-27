"use client";

import React, { useEffect, useState, useRef } from "react";
import { useParams, useRouter } from "next/navigation";
import { FaFilter, FaSort } from "react-icons/fa";
import { MapPinIcon } from "@heroicons/react/24/outline";
import ShoeCard from "@/app/components/ui/shoecard";

const Products = () => {
  const { store } = useParams();
  const router = useRouter();
  const [inventory, setInventory] = useState([]);
  const [storeName, setStoreName] = useState("");
  const [isLocationMenuOpen, setIsLocationMenuOpen] = useState(false);
  const [subCategories, setSubCategories] = useState({});
  const [isFilterMenuOpen, setIsFilterMenuOpen] = useState(false);
  const [isSortMenuOpen, setIsSortMenuOpen] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState("all");
  const [sortBy, setSortBy] = useState("default");
  const [isLoading, setIsLoading] = useState(true);

  const stores = [
    { id: 1, name: "KickHub Butuan", slug: "butuan" },
    { id: 2, name: "KickHub Cebu", slug: "cebu" },
    { id: 3, name: "KickHub Davao", slug: "davao" },
  ];

  const subCategoryOrder = {
    butuan: [
      { id: 4, name: "Sneakers" },
      { id: 1, name: "Basketball Shoes" },
      { id: 6, name: "Casual Footwear" },
      { id: 12, name: "Slides" },
      { id: 11, name: "Flipflops" },
      { id: 13, name: "Casual Sandals" },
      { id: 5, name: "Loafers" },
      { id: 7, name: "Dress Shoes" },
      { id: 8, name: "Oxfords" },
      { id: 10, name: "Boots" },
    ],
  };

  const handleFilter = (category) => {
    setSelectedFilter(category);
    setIsFilterMenuOpen(false);
  };

  const handleSort = (sortType) => {
    setSortBy(sortType);
    setIsSortMenuOpen(false);
  };

  const filteredAndSortedInventory = React.useMemo(() => {
    let filtered = [...inventory];

    // Apply filter
    if (selectedFilter !== "all") {
      filtered = filtered.filter(
        (item) =>
          item.sub_category_name.toLowerCase() === selectedFilter.toLowerCase()
      );
    }

    // Apply sort
    switch (sortBy) {
      case "price-low":
        filtered.sort((a, b) => a.price - b.price);
        break;
      case "price-high":
        filtered.sort((a, b) => b.price - a.price);
        break;
      case "name-asc":
        filtered.sort((a, b) => a.product.name.localeCompare(b.product.name));
        break;
      case "name-desc":
        filtered.sort((a, b) => b.product.name.localeCompare(a.product.name));
        break;
      default:
        // Keep original order
        break;
    }

    return filtered;
  }, [inventory, selectedFilter, sortBy]);

  const filterRef = useRef(null);
  const sortRef = useRef(null);
  const locationRef = useRef(null);

  const handleClickOutside = (event) => {
    if (
      filterRef.current &&
      !filterRef.current.contains(event.target) &&
      isFilterMenuOpen
    ) {
      setIsFilterMenuOpen(false);
    }
    if (
      sortRef.current &&
      !sortRef.current.contains(event.target) &&
      isSortMenuOpen
    ) {
      setIsSortMenuOpen(false);
    }
    if (
      locationRef.current &&
      !locationRef.current.contains(event.target) &&
      isLocationMenuOpen
    ) {
      setIsLocationMenuOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isFilterMenuOpen, isSortMenuOpen, isLocationMenuOpen]);

  useEffect(() => {
    const fetchProducts = async () => {
      setIsLoading(true);
      const currentStore = stores.find((s) => s.slug === store);
      if (currentStore) {
        setStoreName(currentStore.name);

        try {
          // Fetch sub-categories first
          const subCategoriesResponse = await fetch(
            "http://kickhub-backend.test/api/subcategories"
          );
          const subCategoriesData = await subCategoriesResponse.json();

          // Convert to object for easy lookup
          const subCategoriesMap = subCategoriesData.reduce((acc, sub) => {
            acc[sub.sub_category_id] = sub.name;
            return acc;
          }, {});
          setSubCategories(subCategoriesMap);

          // Fetch inventory for the current store
          const inventoryRes = await fetch(
            `http://kickhub-backend.test/api/inventory/store/${currentStore.id}`
          );
          const inventoryData = await inventoryRes.json();

          // Fetch product images
          const imagesRes = await fetch(
            `http://kickhub-backend.test/api/product-images`
          );
          const imagesData = await imagesRes.json();

          const inventoryItems = inventoryData?.inventory || [];
          const imageItems = imagesData?.data || [];

          // Map images to inventory and ensure uniqueness
          const inventoryWithImages = inventoryItems
            .map((item) => {
              // Get images for the product and sort by image_id (descending)
              const productImages = imageItems
                .filter((img) => img.product_id === item.product.product_id)
                .sort((a, b) => b.image_id - a.image_id); // Sort images by image_id in descending order

              // Select the last image (the largest image_id)
              const largestImage =
                productImages.length > 0 ? productImages[0] : null;

              return {
                ...item,
                image_url: largestImage ? largestImage.image_url : null,
                sub_category_name:
                  subCategoriesMap[item.product.sub_category_id],
              };
            })
            .reduce((acc, item) => {
              if (!acc.some((i) => i.product.name === item.product.name)) {
                acc.push(item);
              }
              return acc;
            }, []);

          // Sort inventory for Butuan store based on subCategoryOrder
          if (store === "butuan") {
            inventoryWithImages.sort((a, b) => {
              const orderA = subCategoryOrder.butuan.findIndex(
                (cat) => cat.id === a.product.sub_category_id
              );
              const orderB = subCategoryOrder.butuan.findIndex(
                (cat) => cat.id === b.product.sub_category_id
              );
              return orderA - orderB;
            });
          }

          setInventory(inventoryWithImages);
        } catch (error) {
          console.error("Error fetching data:", error);
          setInventory([]);
        } finally {
          setIsLoading(false);
        }
      } else {
        // Redirect to 404 if the store slug is invalid
        router.push("/404");
      }
    };

    fetchProducts();
  }, [store, router]);

  return (
    <main className="min-h-screen bg-white py-20">
      <div className="container mx-8 px-4 py-8">
        <div className="sticky top-20 z-10 backdrop-blur-md bg-white/75 flex justify-between items-center mb-8 mr-12 py-4 transition-all duration-200">
          {isLoading ? (
            // Skeleton for header while loading
            <div className="flex items-center gap-2 relative w-full">
              {/* Store name skeleton */}
              <div className="animate-pulse h-8 w-48 bg-gray-200 rounded"></div>
              {/* Location pin skeleton */}
              <div className="animate-pulse h-6 w-6 bg-gray-200 rounded-full"></div>

              {/* Filter and Sort buttons skeleton */}
              <div className="ml-36 flex gap-4">
                <div className="animate-pulse h-6 w-32 bg-gray-200 rounded"></div>
                <div className="animate-pulse h-6 w-40 bg-gray-200 rounded ml-10"></div>
              </div>
            </div>
          ) : (
            // Original content
            <div className="flex items-center gap-2 relative" ref={locationRef}>
              <h1 className="text-2xl font-bold-space-grotesk text-primary">
                {storeName}
              </h1>
              <button
                onClick={() => setIsLocationMenuOpen(!isLocationMenuOpen)}
                className="hover:bg-gray-100/50 p-1 rounded-full transition-colors"
              >
                <MapPinIcon className="h-6 w-6 text-red-600" />
              </button>

              {/* Dropdown Menu */}
              {isLocationMenuOpen && (
                <div
                  className="location-dropdown absolute top-full left-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5"
                  role="menu"
                >
                  <div className="py-1">
                    {stores.map((location) => (
                      <button
                        key={location.id}
                        className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        onClick={() => router.push(`/store/${location.slug}`)}
                      >
                        {location.name}
                      </button>
                    ))}
                  </div>
                </div>
              )}
              <div className="ml-36 flex gap-4">
                <div className="relative" ref={filterRef}>
                  <button
                    onClick={() => {
                      setIsFilterMenuOpen(!isFilterMenuOpen);
                      setIsSortMenuOpen(false);
                    }}
                    className="text-sm cursor-pointer text-gray-700 font-bold flex items-center"
                  >
                    <FaFilter className="h-5 w-5 mr-1" />
                    Filter:{" "}
                    {selectedFilter === "all" ? "All Products" : selectedFilter}
                  </button>
                  {isFilterMenuOpen && (
                    <div className="absolute top-full left-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
                      <div className="py-1">
                        <button
                          className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                          onClick={() => handleFilter("all")}
                        >
                          All Products
                        </button>
                        {Object.values(subCategories).map((category) => (
                          <button
                            key={category}
                            className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                            onClick={() => handleFilter(category)}
                          >
                            {category}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                <div className="relative" ref={sortRef}>
                  <button
                    onClick={() => {
                      setIsSortMenuOpen(!isSortMenuOpen);
                      setIsFilterMenuOpen(false);
                    }}
                    className="text-sm cursor-pointer text-gray-700 font-bold flex items-center pl-10"
                  >
                    <FaSort className="h-5 w-5 mr-1" />
                    Sort by:{" "}
                    {
                      {
                        default: "Default",
                        "price-low": "Price: Low to High",
                        "price-high": "Price: High to Low",
                        "name-asc": "Name: A to Z",
                        "name-desc": "Name: Z to A",
                      }[sortBy]
                    }
                  </button>
                  {isSortMenuOpen && (
                    <div className="absolute top-full left-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
                      <div className="py-1">
                        <button
                          className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                          onClick={() => handleSort("default")}
                        >
                          Default
                        </button>
                        <button
                          className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                          onClick={() => handleSort("price-low")}
                        >
                          Price: Low to High
                        </button>
                        <button
                          className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                          onClick={() => handleSort("price-high")}
                        >
                          Price: High to Low
                        </button>
                        <button
                          className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                          onClick={() => handleSort("name-asc")}
                        >
                          Name: A to Z
                        </button>
                        <button
                          className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                          onClick={() => handleSort("name-desc")}
                        >
                          Name: Z to A
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
        <div className="mr-12">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {isLoading ? (
              [...Array(8)].map((_, index) => (
                <div key={index} className="animate-pulse">
                  <div className="bg-gray-200 rounded-lg h-64 mb-4"></div>
                  <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
                  <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                </div>
              ))
            ) : filteredAndSortedInventory.length > 0 ? (
              filteredAndSortedInventory.map((item) => (
                <ShoeCard
                  key={item.inventory_id}
                  name={item.product.name}
                  color={item.product.color}
                  sub_category={item.sub_category_name}
                  price={`₱${item.price}`}
                  imageUrl={
                    item.image_url
                      ? `http://kickhub-backend.test${item.image_url}`
                      : "/images/placeholder-image.jpg"
                  }
                  productId={item.product.product_id}
                  storeSlug={store}
                  onClick={() =>
                    router.push(
                      `/store/${store}/${encodeURIComponent(item.product.name)}`
                    )
                  }
                />
              ))
            ) : (
              <p className="text-lg text-primary font-regular-space-grotesk">
                No products available.
              </p>
            )}
          </div>
        </div>
      </div>
    </main>
  );
};

export default Products;
