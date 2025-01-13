import Image from "next/image";

export default function Home() {
  return (
    <div
      data-theme="lofi"
      className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20"
    >
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
        {/* Huge Title using Space Grotesk */}
        <h1 className="text-6xl font-bold-space-grotesk">KickHub rights</h1>

        {/* Display the white-logo.png */}
        <div className="my-8">
          <Image
            src="/images/black-logo.png" // Path relative to the public folder
            alt="KickHub Logo"
            width={150} // Set the width as desired
            height={150} // Set the height as desired
          />
        </div>

        <div className="flex gap-4 items-center flex-col sm:flex-row">
          {/* Button using DaisyUI with Inter font */}
          <button className="btn btn-primary font-regular-inter">
            Shop Now
          </button>

          {/* Optional second button with Inter font */}
          <button className="btn btn-secondary font-bold-inter">
            Learn More
          </button>
        </div>
      </main>
    </div>
  );
}
