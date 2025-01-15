"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import Link from "next/link";

import ShoeCard from "@/app/components/ui/shoecard";

export default function Home() {
  return (
    <>
      {/* Landing Page */}
      <div
        data-theme="lofi"
        className="grid px-4 sm:px-8 md:px-10 lg:px-20 grid-cols-1 md:grid-cols-2 
        items-center justify-items-center min-h-screen gap-8 md:gap-16"
      >
        {/* Text Section */}
        <motion.div
          className="flex flex-col gap-4 items-start w-full max-w-xl"
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0, scale: 1.05 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold-space-grotesk leading-tight">
            Best In Style Collection For You
          </h1>
          <p className="text-sm sm:text-md lg:text-lg">
            Step into style with our curated collection of premium shoes,
            combining exceptional quality, unmatched comfort, and timeless
            design to elevate every step you take.
          </p>
          <Link href="/store/butuan" passHref>
            <motion.button
              className="btn btn-primary font-regular-inter mt-4 w-full sm:w-auto"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              Shop Now
            </motion.button>
          </Link>
        </motion.div>

        {/* Image Section */}
        <div className="relative w-full max-w-2xl mx-auto md:pr-10 mt-8 md:mt-0">
          {/* Background Text - Now with entrance animation */}
          <motion.h1
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="absolute text-[50px] sm:text-[75px] lg:text-[100px] text-[#967969] 
            font-bold-space-grotesk hidden sm:block"
            style={{
              top: "20%",
              left: "15%",
              whiteSpace: "nowrap",
            }}
          >
            JORDAN 1
          </motion.h1>
          <motion.h1
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="absolute text-[50px] sm:text-[75px] lg:text-[100px] text-[#967969] 
            font-bold-space-grotesk hidden sm:block"
            style={{
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              whiteSpace: "nowrap",
            }}
          >
            MOCHA
          </motion.h1>

          {/* Main Product Image - Same animation as before */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0, rotate: 5 }}
            transition={{ duration: 0.8 }}
            className="w-full px-4 sm:px-0"
          >
            <Image
              src="/images/j1-mocha.png"
              alt="J1 Mocha"
              width={450}
              height={450}
              className="shadow-custom relative w-full h-auto max-w-[450px] mx-auto"
              priority
            />
          </motion.div>
        </div>
      </div>
      {/* Nike Vomero */}
      <div className="flex justify-center mt-0 items-center bg-white relative">
        {/* Background Text */}
        <motion.h1
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 0.5 }}
          transition={{ duration: 1 }}
          className="absolute text-3xl font-bold text-gray-200 transform scale-150 z-0 -mt-20"
        >
          COMFORT COMFORT COMFORT COMFORT COMFORT COMFORT COMFORT COMFORT
          OOMFORT COMFORT COMFORT COMFORT COMFORT COMFORT COMFORT COMFORT
          COMFORT COMFORT COMFORT COMFORT COMFORT COMFORT COMFORT COMFORT
          COMFORT COMFORT COMFORT COMFORT COMFORT COMFORT COMFORT COMFORT
          COMFORT COMFORT COMFORT COMFORT COMFORT COMFORT COMFORT COMFORT
          COMFORT COMFORT COMFORT COMFORT COMFORT COMFORT COMFORT COMFORT
          COMFORT COMFORT COMFORT COMFORT COMFORT COMFORT COMFORT COMFORT
          COMFORT COMFORT COMFORT COMFORT COMFORT COMFORT COMFORT COMFORT
          COMFORT COMFORT COMFORT COMFORT COMFORT COMFORT COMFORT COMFORT
          COMFORT COMFORT COMFORT COMFORT COMFORT COMFORT COMFORT COMFORT
          COMFORT COMFORT COMFORT COMFORT COMFORT COMFORT COMFORT COMFORT
          COMFORT COMFORT COMFORT COMFORT COMFORT COMFORT COMFORT COMFORT
          COMFORT COMFORT COMFORT COMFORT
        </motion.h1>

        {/* Image with Parallax Scroll */}
        <motion.div
          initial={{ opacity: 0, y: 100 }}
          whileInView={{
            opacity: 1,
            y: 0,
            scale: [1, 1.1],
            rotateZ: [-5, 5],
          }}
          transition={{
            duration: 1.2,
            type: "spring",
            stiffness: 50,
          }}
          viewport={{
            once: false,
            margin: "-200px",
          }}
        >
          <Image
            src="/images/nike-vomero.png"
            alt="Nike Vomero"
            width={550}
            height={550}
            className="drop-shadow-[0_35px_35px_rgba(0,0,0,0.25)] relative z-10 -mt-40"
          />
        </motion.div>
      </div>

      {/* Details */}
      <div className="mb-0 grid grid-cols-1 md:grid-cols-2 pt-0 min-h-[50vh] items-center px-20 bg-white">
        {/* Left Column */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="flex flex-col gap-6"
        >
          <h2 className="text-5xl font-bold-space-grotesk text-primary">
            We Got You
          </h2>
          <p className="text-lg text-gray-600 max-w-md">
            We offer everything you need, from sneakers and casual shoes to
            formal footwear—we've got it all for you!
          </p>
        </motion.div>

        {/* Right Column */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="relative flex justify-center items-center -mr-25"
        >
          <h1
            className="text-[150px] font-bold-space-grotesk text-white 
            tracking-tighter leading-none [text-shadow:_-1px_-1px_0_#967969,_1px_-1px_0_#967969,_-1px_1px_0_#967969,_1px_1px_0_#967969]
            "
          >
            EVERYTHING
          </h1>
        </motion.div>
      </div>

      {/* Product Cards Section */}
      <div className="bg-white px-20 py-2">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <ShoeCard
            name="Nike Air Force 1 '07"
            category="sneaker"
            price="₱7,595"
            imageUrl="/images/af1-07-1.jpeg"
          />
          <ShoeCard
            name="Nike Dunk Low Retro"
            category="sneaker"
            price="₱7,295"
            imageUrl="/images/dunkretro-1.jpeg"
          />
          <ShoeCard
            name="Nike Dunk Low Retro - Olive"
            category="sneaker"
            price="₱5,895"
            imageUrl="/images/dunkolive-1.jpeg"
          />
        </div>

        <div className="mt-14 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <ShoeCard
            name="Nike Air VaporMax 2023 Flyknit"
            category="sneaker"
            price="₱11,295"
            imageUrl="/images/vapormax2023-1.jpeg"
          />
          <ShoeCard
            name="Nike Air VaporMax Plus"
            category="sneaker"
            price="₱9,445"
            imageUrl="/images/vapormaxplus-1.jpeg"
          />
          <ShoeCard
            name="Nike Pegasus 41"
            category="sports"
            price="₱7,395"
            imageUrl="/images/pegasus41-1.jpeg"
          />
        </div>
      </div>

      {/* Stats Bar */}
      <div className="bg-white align-end items-start pr-10 pt-10 pb-10 ">
        <div className="flex justify-end max-w-4xl mx-auto mr-10">
          {/* Happy Customers */}
          <div className="flex flex-col items-start mx-4 pr-4">
            <h3 className="text-xl font-bold-space-grotesk text-primary">
              120+
            </h3>
            <p className="text-gray-600">Happy Customers</p>
          </div>

          <div className="gap mr-34">
            <Link href="/store/butuan" passHref>
              <button className="btn bg-white text-primary border border-primary rounded-full px-6 py-2 shadow-md hover:bg-gray-100 transition">
                Show More
              </button>
            </Link>
          </div>
        </div>
      </div>

      <div className="bg-gray-100 px-20 mb-100 py-20">
        <div className="max-w-6xl mx-auto text-center">
          <div className="bg-gray-200 inline-block rounded-full px-6 py-2 mb-6">
            <h2 className="text-xs font-bold-inter text-primary font-bold">
              Discover Our Exquisite Selections
            </h2>
          </div>
          <p className="text-xl font-bold-inter text-primary px-4 mb-2">
            We are Driven. We collaborate with ambitious clients to produce
            <br />
            products that inspire action.
          </p>
          <p className="text-xl font-bold-inter text-primary mb-6">
            Driven work requires a focused mindset and a passion
            <br />
            for excellence that goes beyond the ordinary.
          </p>
        </div>
      </div>
    </>
  );
}
