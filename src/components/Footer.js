export default function Footer() {
  return (
    <footer className="w-full py-6 flex justify-center border-t border-gray-700 text-gray-400 text-sm mt-12">
      © {new Date().getFullYear()} tiocents. All rights reserved.
    </footer>
  );
}
