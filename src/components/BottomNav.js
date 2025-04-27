"use client";

import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";

export default function BottomNav() {
  const pathname = usePathname();
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      if (scrollY > 100) {
        setHidden(true);
      } else {
        setHidden(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItems = [
    { label: "Home", href: "/posts", icon: "🏠" },
    { label: "Authors", href: "/authors", icon: "👤" },
  ];

  // Don't render bottom nav on landing page ("/")
  if (pathname === "/") {
    return null;
  }

  return (
    <nav
      className={`fixed bottom-0 left-0 right-0 bg-[#1C1C1F] border-t border-gray-700 flex justify-around py-2 z-50 transition-transform duration-300 ${
        hidden ? "translate-y-full" : "translate-y-0"
      }`}
    >
      {navItems.map((item) => (
        <Link
          key={item.href}
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
