"use client";

import { useEffect, useState } from "react";
import { Toaster } from "react-hot-toast";

export default function ToastProvider() {
  const [position, setPosition] = useState<"top-center" | "bottom-right">(
    "top-center"
  );

  useEffect(() => {
    const updatePosition = () => {
      const width = window.innerWidth;
      setPosition(width < 768 ? "top-center" : "bottom-right");
    };

    updatePosition();
    window.addEventListener("resize", updatePosition);
    return () => window.removeEventListener("resize", updatePosition);
  }, []);

  return (
    <Toaster
      position={position}
      reverseOrder={false}
      toastOptions={{
        style: {
          background: "#0f2557",
          color: "white",
          borderRadius: "8px",
          padding: "12px",
          fontSize: "16px",
        },
      }}
    />
  );
}
