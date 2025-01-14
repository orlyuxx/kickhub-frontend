"use client";

import { motion, AnimatePresence } from "framer-motion";
import { MagnifyingGlassIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { useState } from "react";

const Searchbar = () => {
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  return (
    <div className="flex items-center">
      <MagnifyingGlassIcon
        className="h-5 w-5 text-gray-700 hover:text-primary cursor-pointer"
        onClick={() => setIsSearchOpen(true)}
      />
      <AnimatePresence>
        {isSearchOpen && (
          <motion.div
            initial={{ width: 0, opacity: 0 }}
            animate={{ width: 300, opacity: 1 }}
            exit={{ width: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="absolute text-primary right-24 bg-white flex items-center rounded-md overflow-hidden border border-gray-200"
          >
            <input
              type="text"
              placeholder="Search..."
              className="w-full px-4 py-2 outline-none text-sm font-medium-inter"
              autoFocus
            />
            <button
              onClick={() => setIsSearchOpen(false)}
              className="px-2 hover:text-primary text-primary"
            >
              <XMarkIcon className="h-5 w-5" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Searchbar;
