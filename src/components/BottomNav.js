"use client";
import { Home, Users } from "lucide-react"; // 🆕 import icons
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";

export default function BottomNav() {
  const pathname = usePathname();
  const [hidden, setHidden] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [timeoutId, setTimeoutId] = useState(null);

  useEffect(() => {
    function onScroll() {
      const currentScrollY = window.scrollY;

      if (currentScrollY > lastScrollY) {
        setHidden(true);
      } else {
        setHidden(false);
      }
      setLastScrollY(currentScrollY);

      clearTimeout(timeoutId);
      const newTimeoutId = setTimeout(() => setHidden(false), 2000);
      setTimeoutId(newTimeoutId);
    }

    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, [lastScrollY, timeoutId]);

  // 🔥 ONLY AFTER all hooks are called, we can now safely do:
  if (pathname === "/") {
    return null;
  }

  const navItems = [
    { label: "Home", href: "/posts", icon: Home },
    { label: "Authors", href: "/authors", icon: Users },
  ];

  return (
    <nav
      className={`fixed bottom-0 left-0 right-0 bg-[#1C1C1F] border-t border-gray-700 flex justify-around py-2 z-50 transition-transform duration-300 ${
        hidden ? "translate-y-full" : "translate-y-0"
      } shadow-lg`}
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
          onClick={() => {
            if (typeof window !== "undefined" && "vibrate" in navigator) {
              navigator.vibrate(50);
            }
          }}
        >
          <item.icon className="w-6 h-6" />
          {item.label}
        </Link>
      ))}
    </nav>
  );
}
