import React from "react";
import Link from "next/link";
import Image from "next/image";

const NotFound: React.FC = () => {
  return (
    <div className="relative min-h-screen w-full flex items-center justify-center text-center px-4 overflow-hidden">
      <div className="absolute inset-0 z-0 hidden sm:block">
        <Image
          src="/pictures/not-found.webp"
          alt="Not Found Background"
          fill
          priority
          className="object-cover  scale-105"
        />
      </div>

      <div className="absolute inset-0 z-0 block sm:hidden">
        <Image
          src="/pictures/not-found-mobile.webp"
          alt="Not Found Mobile Background"
          fill
          priority
          className="object-cover  scale-105"
        />
      </div>

      <div className="absolute inset-0 bg-black/20 z-10" />

      <div className="relative z-20 text-white">
        <h1 className="text-6xl md:text-9xl font-extrabold drop-shadow-lg">
          404
        </h1>
        <h2 className="text-2xl md:text-6xl mt-4 font-semibold drop-shadow">
          Page Not Found
        </h2>
        <p className="text-lg md:text-2xl mt-2 drop-shadow">
          Sorry, the page you’re looking for doesn’t exist.
        </p>
        <Link
          href="/"
          className="mt-6 inline-block px-6 py-3 text-lg bg-white text-[#0f2557] font-semibold rounded-full hover:bg-gray-200 transition"
        >
          Go back home
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
