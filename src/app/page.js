import Link from "next/link";

export const metadata = {
  title: "Welcome | TioCents",
  description: "Discover new ideas, thoughts, and stories.",
};

export default function LandingPage() {
  return (
    <main className="flex flex-col items-center justify-center min-h-screen text-center p-6">
      <h1 className="text-4xl font-bold mb-4">Welcome to TioCents ✨</h1>
      <p className="text-gray-400 mb-8 max-w-md">
        A collection of writings, ideas, and stories by different authors.
        Explore thoughts across categories like economy, philosophy, music, and
        more.
      </p>
      <Link
        href="/posts"
        className="bg-white text-black px-6 py-3 rounded-full font-semibold hover:bg-gray-200 transition-colors"
      >
        Browse Posts →
      </Link>
    </main>
  );
}
