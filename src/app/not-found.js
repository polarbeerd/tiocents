import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center flex-col">
      <h1 className="text-4xl font-bold mb-4">404 - Not Found</h1>
      <Link
        href="/posts"
        className="mt-4 px-6 py-2 bg-white text-black rounded-full hover:bg-gray-200 transition-colors"
      >
        Go to Posts
      </Link>
    </div>
  );
}
