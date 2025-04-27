import Link from "next/link";

const authors = [
  {
    name: "Jane Doe",
    avatar: "https://i.pravatar.cc/150?img=5",
    bio: "Writes about ideas and creativity.",
  },
  {
    name: "John Doe",
    avatar: "https://i.pravatar.cc/150?img=3",
    bio: "Writes about economy and philosophy.",
  },
];
export const metadata = {
  title: "Authors | My Ideas",
  description: "Meet the authors behind the writings.",
};

export default function AuthorsPage() {
  return (
    <div className="max-w-2xl mx-auto p-4">
      <h1 className="text-3xl font-bold mb-8 text-center">Authors</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {authors.map((author) => (
          <Link
            key={author.name}
            href={`/posts?author=${encodeURIComponent(author.name)}`}
            className="bg-[#1C1C1F] rounded-2xl p-4 flex flex-col items-center text-center shadow hover:shadow-lg transition-all duration-150"
          >
            <img
              src={author.avatar}
              alt={author.name}
              className="w-24 h-24 rounded-full object-cover mb-4"
            />
            <h2 className="text-xl font-semibold">{author.name}</h2>
            <p className="text-gray-400 text-sm mt-2">{author.bio}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
