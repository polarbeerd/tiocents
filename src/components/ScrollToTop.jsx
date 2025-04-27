"use client";

import { useEffect, useState } from "react";
import { ArrowUp } from "lucide-react"; // 🆕 import

export default function ScrollToTop() {
  const [showButton, setShowButton] = useState(false);

  useEffect(() => {
    function handleScroll() {
      if (window.scrollY > 1200) {
        setShowButton(true);
      } else {
        setShowButton(false);
      }
    }

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  if (!showButton) return null;

  return (
    <button
      onClick={scrollToTop}
      className="fixed bottom-20 right-4 p-3 bg-white text-black rounded-full shadow-md hover:bg-gray-300 transition-colors"
    >
      <ArrowUp className="w-6 h-6" />
    </button>
  );
}
