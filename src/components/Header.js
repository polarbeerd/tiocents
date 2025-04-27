import Link from "next/link";

export default function Header() {
  return (
    <header className="w-full py-6 flex justify-center border-b border-gray-700">
      <Link href="/posts" className="text-2xl font-bold hover:underline">
        tiocents
      </Link>
    </header>
  );
}
