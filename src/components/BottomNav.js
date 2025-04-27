"use client";

import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import Link from "next/link";

export default function BottomNav() {
  const pathname = usePathname();
  const [hidden, setHidden] = useState(false);

  // 👉 NEW: Hide BottomNav completely on homepage "/"
  if (pathname === "/") {
    return null;
  }

  useEffect(() => {
    let lastScrollY = window.scrollY;

    function onScroll() {
      if (window.scrollY > lastScrollY) {
        setHidden(true);
      } else {
        setHidden(false);
      }
      lastScrollY = window.scrollY;
    }

    if (typeof window !== "undefined") {
      window.addEventListener("scroll", onScroll);
      return () => window.removeEventListener("scroll", onScroll);
    }
  }, []);

  const navItems = [
    { label: "Home", href: "/posts", icon: "🏠" },
    { label: "Authors", href: "/authors", icon: "👤" },
  ];

  return (
    <nav
      className={`fixed bottom-0 left-0 right-0 bg-[#1C1C1F] border-t border-gray-700 flex justify-around py-2 z-50 transition-transform duration-300 ${
        hidden ? "translate-y-full" : "translate-y-0"
      }`}
    >
      {navItems.map((item) => (
        <Link
          key={item.label}
          href={item.href}
          className={`flex flex-col items-center text-xs transition-all ${
            pathname.startsWith(item.href)
              ? "text-white animate-bounce-short"
              : "text-gray-400 hover:text-gray-200"
          }`}
        >
          <span className="text-2xl">{item.icon}</span>
          {item.label}
        </Link>
      ))}
    </nav>
  );
}
