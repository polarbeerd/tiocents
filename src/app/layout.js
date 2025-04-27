import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import BottomNav from "@/components/BottomNav";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-[#0D0D0D] text-[#E5E5E5] min-h-screen flex flex-col">
        <Header />
        <main className="flex-grow pb-24">{children}</main>
        <Footer />
        <BottomNav />
      </body>
    </html>
  );
}
