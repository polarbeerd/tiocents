"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import Image from "next/image";

export default function TopTabs({ posts = [] }) {
  const [activeTab, setActiveTab] = useState("All");
  const searchParams = useSearchParams();
  const selectedAuthor = searchParams.get("author");

  const categories = [
    "All",
    "Thoughts",
    "Economy",
    "Sports",
    "Music",
    "Travel",
    "Gaming",
  ];

  useEffect(() => {
    if (selectedAuthor) {
      setActiveTab("All");
    }
  }, [selectedAuthor]);

  const filteredPosts = posts.filter((post) => {
    const matchAuthor = selectedAuthor
      ? post.authorName === selectedAuthor
      : true;
    const matchCategory =
      activeTab === "All" ? true : post.category === activeTab;
    return matchAuthor && matchCategory;
  });

  return (
    <div className="max-w-2xl mx-auto p-4">
      {!selectedAuthor && (
        <div className="flex gap-3 overflow-x-auto whitespace-nowrap mb-8 scrollbar-hide">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveTab(category)}
              className={`px-4 py-2 rounded-full border text-sm flex-shrink-0 transition-colors duration-75 ${
                activeTab === category
                  ? "bg-white text-black border-white"
                  : "bg-[#1C1C1F] text-gray-300 border-gray-700 hover:bg-[#27272a]"
              }`}
            >
              {category}
            </button>
          ))}
        </div>
      )}

      {selectedAuthor && (
        <div className="text-center mb-6">
          <Link
            href="/posts"
            className="inline-block bg-white text-black px-4 py-2 rounded-full text-sm hover:bg-gray-200 transition-colors"
          >
            Clear Author Filter
          </Link>
        </div>
      )}

      {/* Posts Feed */}
      <div className="flex flex-col gap-6">
        {filteredPosts.length > 0 ? (
          filteredPosts.map((post) => (
            <Link
              key={post.slug}
              href={`/posts/${post.slug}`}
              className="bg-[#1C1C1F] rounded-2xl overflow-hidden shadow-sm hover:shadow-lg hover:bg-[#27272a] transition-all duration-150"
            >
              <div className="relative w-full h-48">
                <Image
                  src={post.coverImage}
                  alt={post.title}
                  layout="fill"
                  objectFit="cover"
                  className="rounded-t-2xl"
                  priority
                />
              </div>
              <div className="p-4">
                <h2 className="text-2xl font-semibold">{post.title}</h2>
                <p className="text-gray-400 text-sm">
                  {new Date(post.date).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </p>
                <div className="flex items-center gap-3 mt-3">
                  <Image
                    src={post.authorImage}
                    alt={post.authorName}
                    width={32}
                    height={32}
                    className="rounded-full object-cover"
                  />
                  <span className="text-sm text-gray-400">
                    {post.authorName}
                  </span>
                </div>
                <p className="text-gray-300 mt-2">{post.description}</p>
              </div>
            </Link>
          ))
        ) : (
          <div className="text-center text-gray-500 mt-10">No posts found.</div>
        )}
      </div>
    </div>
  );
}
