"use client";

import React, { useState } from "react";
import Image from "next/image";
import {
  MagnifyingGlassIcon,
  ShoppingCartIcon,
  UserCircleIcon,
  ChevronDownIcon,
} from "@heroicons/react/24/outline";
import Searchbar from "./searchbar";

const Navbar = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  return (
    <nav className="flex justify-between items-center p-3 bg-white/30 backdrop-blur-md shadow-md px-20 fixed w-full left-0 right-0 z-50 border-b border-gray-200">
      {/* Logo Section */}
      <div className="flex items-center -space-x-2">
        <Image
          src="/images/black-logo-transparent.png"
          alt="KickHub Logo"
          width={52} // Adjust the width as needed
          height={52} // Adjust the height as needed
        />
        <span className="text-2xl font-bold-space-grotesk text-neutral">
          KickHub
        </span>
      </div>

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
                    Sports
                  </div>
                  <div className="hover:bg-gray-100 px-4 py-2 cursor-pointer">
                    Basketball
                  </div>
                  <div className="hover:bg-gray-100 px-4 py-2 cursor-pointer">
                    Lifestyle
                  </div>
                  <div className="hover:bg-gray-100 px-4 py-2 cursor-pointer">
                    Training & Gym
                  </div>
                  <div className="hover:bg-gray-100 px-4 py-2 cursor-pointer">
                    Skateboarding
                  </div>
                </div>
                <div>
                  <div className="hover:bg-gray-100 px-4 py-2 cursor-pointer">
                    Tennis
                  </div>
                  <div className="hover:bg-gray-100 px-4 py-2 cursor-pointer">
                    Soccer
                  </div>
                  <div className="hover:bg-gray-100 px-4 py-2 cursor-pointer">
                    Walking
                  </div>
                  <div className="hover:bg-gray-100 px-4 py-2 cursor-pointer">
                    Golf
                  </div>
                  <div className="hover:bg-gray-100 px-4 py-2 cursor-pointer">
                    Limited Edition
                  </div>
                </div>
              </div>
            </div>
          </div>
        </li>
        <li className="relative group">
          <div className="flex items-center text-gray-700 hover:text-primary cursor-pointer">
            <span>Brand</span>
            <ChevronDownIcon className="h-4 w-4 ml-1" />
            <div className="font-medium-inter text-gray-700 absolute top-full left-1/2 -translate-x-1/2 mt-1 w-96 bg-white border border-gray-200 rounded-md shadow-lg py-2 hidden group-hover:block">
              <div className="grid grid-cols-2 gap-x-4">
                <div>
                  <div className="hover:bg-gray-100 px-4 py-2 cursor-pointer">
                    Nike
                  </div>
                  <div className="hover:bg-gray-100 px-4 py-2 cursor-pointer">
                    Adidas
                  </div>
                  <div className="hover:bg-gray-100 px-4 py-2 cursor-pointer">
                    Puma
                  </div>
                  <div className="hover:bg-gray-100 px-4 py-2 cursor-pointer">
                    Reebok
                  </div>
                  <div className="hover:bg-gray-100 px-4 py-2 cursor-pointer">
                    Under Armour
                  </div>
                  <div className="hover:bg-gray-100 px-4 py-2 cursor-pointer">
                    New Balance
                  </div>
                </div>
                <div>
                  <div className="hover:bg-gray-100 px-4 py-2 cursor-pointer">
                    Asics
                  </div>
                  <div className="hover:bg-gray-100 px-4 py-2 cursor-pointer">
                    Vans
                  </div>
                  <div className="hover:bg-gray-100 px-4 py-2 cursor-pointer">
                    Converse
                  </div>
                  <div className="hover:bg-gray-100 px-4 py-2 cursor-pointer">
                    Hoka One One
                  </div>
                  <div className="hover:bg-gray-100 px-4 py-2 cursor-pointer">
                    Saucony
                  </div>
                  <div className="hover:bg-gray-100 px-4 py-2 cursor-pointer">
                    Fila
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
                KickHub Butuan
              </div>
              <div className="hover:bg-gray-100 px-4 py-2 cursor-pointer">
                KickHub Cebu
              </div>
              <div className="hover:bg-gray-100 px-4 py-2 cursor-pointer">
                KickHub Davao
              </div>
            </div>
          </div>
        </li>
      </ul>

      {/* Icons Section */}
      <div className="flex space-x-4 mr-4 items-center">
        <Searchbar />
        <div className="h-5 border-l border-gray-300" />
        <ShoppingCartIcon className="h-5 w-5 text-gray-700 hover:text-primary cursor-pointer" />
        <div className="h-5 border-l border-gray-300" />
        <UserCircleIcon className="h-5 w-5 text-gray-700 hover:text-primary cursor-pointer" />
      </div>
    </nav>
  );
};

export default Navbar;
