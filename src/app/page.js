import Link from "next/link";

export const metadata = {
  title: "Welcome | My Writings",
  description: "Explore ideas, thoughts, and more.",
};

export default function HomePage() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center text-center p-8">
      <h1 className="text-5xl font-bold mb-6">Welcome to My Writings</h1>
      <p className="text-lg text-gray-400 mb-8">
        Explore thoughts, ideas, and inspiration.
      </p>
      <Link
        href="/posts"
        className="bg-white text-black px-6 py-3 rounded-full font-semibold hover:bg-gray-200 transition-colors"
      >
        View Posts →
      </Link>
    </main>
  );
}
