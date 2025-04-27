import "./globals.css";
import BottomNav from "@/components/BottomNav";
import { Suspense } from "react";

export const metadata = {
  title: "TioCents",
  description: "Explore new ideas and stories.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-[#0D0D0D] text-[#E5E5E5] min-h-screen flex flex-col">
        <header className="w-full py-4 flex justify-center border-b border-gray-700 text-xl font-bold">
          tiocents
        </header>

        <main className="flex-grow">{children}</main>

        {/* Show BottomNav ONLY if not on homepage */}
        <Suspense fallback={null}>
          <BottomNav />
        </Suspense>
      </body>
    </html>
  );
}
