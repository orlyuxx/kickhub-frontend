"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import {
  MagnifyingGlassIcon,
  ShoppingCartIcon,
  UserCircleIcon,
  ChevronDownIcon,
} from "@heroicons/react/24/outline";
import Searchbar from "./searchbar";
import Link from "next/link";

const Navbar = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResult, setSearchResult] = useState(null);

  useEffect(() => {
    setIsLoggedIn(!!localStorage.getItem("token"));
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setIsLoggedIn(false);
  };

  const handleSearch = () => {
    console.log("Searching for:", searchQuery);
    setSearchResult(searchQuery);
  };

  return (
    <nav className="flex justify-between items-center p-3 bg-white/30 backdrop-blur-md shadow-md px-20 fixed w-full left-0 right-0 z-50 border-b border-gray-200">
      {/* Logo Section */}
      <Link href="/" passHref>
        <div className="flex items-center -space-x-2 ml-[-46px]">
          <Image
            src="/images/black-logo-transparent.png"
            alt="KickHub Logo"
            priority={true}
            width={52}
            height={52}
            className="h-12 w-12"
          />
          <span className="text-lg font-bold-space-grotesk text-primary">
            KickHub
          </span>
        </div>
      </Link>

      {/* Navigation Links */}
      <ul className="flex space-x-6 font-bold-inter text-sm">
        <li className="text-gray-700 hover:text-primary cursor-pointer">Men</li>
        <li className="text-gray-700 hover:text-primary cursor-pointer">
          Women
        </li>

        <li className="relative group">
          <div className="flex items-center text-gray-700 hover:text-primary cursor-pointer">
            <span>Categories</span>
            <ChevronDownIcon className="h-4 w-4 ml-1" />
            <div className="font-medium-inter text-gray-700 absolute top-full left-1/2 -translate-x-1/2 mt-1 w-96 bg-white border border-gray-200 rounded-md shadow-lg py-2 hidden group-hover:block">
              <div className="grid grid-cols-2 gap-x-4">
                <div>
                  <div className="hover:bg-gray-100 px-4 py-2 cursor-pointer">
                    Basketball
                  </div>
                  <div className="hover:bg-gray-100 px-4 py-2 cursor-pointer">
                    Running Shoes
                  </div>
                  <div className="hover:bg-gray-100 px-4 py-2 cursor-pointer">
                    Sneakers
                  </div>
                  <div className="hover:bg-gray-100 px-4 py-2 cursor-pointer">
                    Loafers
                  </div>
                  <div className="hover:bg-gray-100 px-4 py-2 cursor-pointer">
                    Casual
                  </div>
                  <div className="hover:bg-gray-100 px-4 py-2 cursor-pointer">
                    Dress Shoes
                  </div>
                </div>
                <div>
                  <div className="hover:bg-gray-100 px-4 py-2 cursor-pointer">
                    Oxford
                  </div>
                  <div className="hover:bg-gray-100 px-4 py-2 cursor-pointer">
                    Boots
                  </div>
                  <div className="hover:bg-gray-100 px-4 py-2 cursor-pointer">
                    Flipflops
                  </div>
                  <div className="hover:bg-gray-100 px-4 py-2 cursor-pointer">
                    Slides
                  </div>
                  <div className="hover:bg-gray-100 px-4 py-2 cursor-pointer">
                    Casual Sandals
                  </div>
                </div>
              </div>
            </div>
          </div>
        </li>
        <li className="relative group">
          <div className="flex items-center text-gray-700 hover:text-primary cursor-pointer">
            <span>Brands</span>
            <ChevronDownIcon className="h-4 w-4 ml-1" />
            <div className="font-medium-inter text-gray-700 absolute top-full left-1/2 -translate-x-1/2 mt-1 w-96 bg-white border border-gray-200 rounded-md shadow-lg py-2 hidden group-hover:block">
              <div className="grid grid-cols-2 gap-x-4">
                <div>
                  <div className="hover:bg-gray-100 px-4 py-2 cursor-pointer">
                    Nike
                  </div>
                  <div className="hover:bg-gray-100 px-4 py-2 cursor-pointer">
                    Jordan
                  </div>
                  <div className="hover:bg-gray-100 px-4 py-2 cursor-pointer">
                    Adidas
                  </div>
                  <div className="hover:bg-gray-100 px-4 py-2 cursor-pointer">
                    New Balance
                  </div>
                  <div className="hover:bg-gray-100 px-4 py-2 cursor-pointer">
                    Vans
                  </div>
                  <div className="hover:bg-gray-100 px-4 py-2 cursor-pointer">
                    Converse
                  </div>
                </div>
                <div>
                  <div className="hover:bg-gray-100 px-4 py-2 cursor-pointer">
                    ASICS
                  </div>
                  <div className="hover:bg-gray-100 px-4 py-2 cursor-pointer">
                    Timberland
                  </div>
                  <div className="hover:bg-gray-100 px-4 py-2 cursor-pointer">
                    Crocs
                  </div>
                  <div className="hover:bg-gray-100 px-4 py-2 cursor-pointer">
                    Dr. Martens
                  </div>
                  <div className="hover:bg-gray-100 px-4 py-2 cursor-pointer">
                    Zara
                  </div>
                </div>
              </div>
            </div>
          </div>
        </li>
        <li className="relative group">
          <div className="flex items-center text-gray-700 hover:text-primary cursor-pointer">
            <span>Shop</span>
            <ChevronDownIcon className="h-4 w-4 ml-1" />
            <div className="font-medium-inter text-gray-700 absolute top-full left-1/2 -translate-x-1/2 mt-1 w-48 bg-white border border-gray-200 rounded-md shadow-lg py-2 hidden group-hover:block">
              <div className="hover:bg-gray-100 px-4 py-2 cursor-pointer">
                <Link href="/store/butuan">KickHub Butuan</Link>
              </div>
              <div className="hover:bg-gray-100 px-4 py-2 cursor-pointer">
                <Link href="/store/cebu">KickHub Cebu</Link>
              </div>
              <div className="hover:bg-gray-100 px-4 py-2 cursor-pointer">
                <Link href="/store/davao">KickHub Davao</Link>
              </div>
            </div>
          </div>
        </li>
      </ul>

      {/* Icons Section */}
      <div className="flex space-x-4 mr-[-24px] items-center">
        <Searchbar
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          onSearch={handleSearch}
        />
        {searchResult && (
          <div className="search-result">
            <p>
              Searching for: <strong>{searchResult}</strong>
            </p>
          </div>
        )}
        <div className="h-5 border-l border-gray-300" />
        <Link href="/cart">
          <ShoppingCartIcon className="h-5 w-5 text-gray-700 hover:text-primary cursor-pointer" />
        </Link>
        <div className="h-5 border-l border-gray-300" />

        {isLoggedIn ? (
          <div className="relative group">
            <UserCircleIcon className="h-5 w-5 text-gray-700 hover:text-primary cursor-pointer" />
            <div className="absolute right-0 mt-1 w-32 bg-white border border-gray-200 rounded-md shadow-lg hidden group-hover:block">
              <div
                className="hover:bg-gray-100 text-sm font-regular-space-grotesk text-primary px-4 py-2 cursor-pointer"
                onClick={handleLogout}
              >
                Logout
              </div>
              <Link href="/history" passHref>
                <div className="hover:bg-gray-100 text-sm font-regular-space-grotesk text-primary px-4 py-2 cursor-pointer">
                  History
                </div>
              </Link>
            </div>
          </div>
        ) : (
          <div className="flex items-center space-x-2">
            <Link href="/login" passHref>
              <p className="text-primary text-md font-regular-space-grotesk hover:font-bold cursor-pointer">
                Sign In
              </p>
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
