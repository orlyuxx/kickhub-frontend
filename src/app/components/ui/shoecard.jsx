"use client";
import Image from "next/image";
import { motion } from "framer-motion";
import Link from "next/link";

const ShoeCard = ({
  name,
  sub_category,
  color,
  price,
  imageUrl,
  index = 0,
}) => {
  return (
    <Link href={`/product/${encodeURIComponent(name)}`}>
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: false }}
        transition={{ duration: 0.5, delay: index * 0.2 }}
        className="card card-compact bg-base-100 w-100 cursor-pointer hover:scale-105 transition-transform duration-200"
      >
        {/* Image Section */}
        <figure className="w-full h-0 pb-[100%] relative">
          <motion.div
            whileHover={{ scale: 1.15 }}
            transition={{ duration: 0.3 }}
            className="absolute inset-0"
          >
            <Image
              src={imageUrl}
              alt={name}
              layout="fill"
              objectFit="cover"
              className="rounded-lg"
            />
          </motion.div>
        </figure>

        {/* Card Body Section */}
        <div className="card-body flex justify-between">
          <div>
            <h2 className="card-title text-primary">{name}</h2>
            <p className="text-gray-500 text-sm capitalize pb-4">{color}</p>
            <p className="text-primary font-semibold">{price}</p>
          </div>
        </div>
      </motion.div>
    </Link>
  );
};

export default ShoeCard;
