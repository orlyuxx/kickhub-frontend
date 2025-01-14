"use client";
import Image from "next/image";

const ShoeCard = ({ name, category, price, imageUrl }) => {
  return (
    <div className="card card-compact bg-base-100 w-100">
      {/* Image Section */}
      <figure>
        <Image
          src={imageUrl}
          alt={name}
          width={500}
          height={500}
          className="rounded-lg"
        />
      </figure>

      {/* Card Body Section */}
      <div className="card-body">
        <h2 className="card-title text-primary">{name}</h2>
        <p className="text-gray-500 capitalize">{category}</p>
        <p className="text-primary font-semibold">{price}</p>
      </div>
    </div>
  );
};

export default ShoeCard;
