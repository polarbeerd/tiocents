"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";

export default function TopTabs({ posts }) {
  const [activeTab, setActiveTab] = useState("All");
  const [displayCount, setDisplayCount] = useState(5);
  const [showScrollTop, setShowScrollTop] = useState(false);

  const categories = [
    "All",
    "Thoughts",
    "Economy",
    "Sports",
    "Music",
    "Travel",
    "Gaming",
  ];

  const searchParams = useSearchParams();
  const selectedAuthor = searchParams.get("author");

  useEffect(() => {
    if (selectedAuthor) {
      setActiveTab("All"); // Reset tab if author selected
    }
  }, [selectedAuthor]);

  useEffect(() => {
    const handleScroll = () => {
      // Scroll-to-top button after 300px
      setShowScrollTop(window.scrollY > 300);

      // Load more posts when near bottom
      if (
        window.innerHeight + window.scrollY >=
        document.body.offsetHeight - 200
      ) {
        setDisplayCount((prev) => prev + 5);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const filteredPosts = posts.filter((post) => {
    const matchAuthor = selectedAuthor
      ? post.authorName === selectedAuthor
      : true;
    const matchCategory =
      activeTab === "All" ? true : post.category === activeTab;
    return matchAuthor && matchCategory;
  });

  return (
    <div className="max-w-4xl mx-auto p-4">
      {/* Top Tabs (only if no author selected) */}
      {!selectedAuthor && (
        <div className="flex gap-3 overflow-x-auto whitespace-nowrap mb-8 scrollbar-hide">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => {
                setActiveTab(category);
                setDisplayCount(5); // Reset load count when switching category
              }}
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

      {/* Clear Author Filter Button */}
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

      {/* Posts List */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredPosts.length > 0 ? (
          filteredPosts.slice(0, displayCount).map((post) => (
            <Link
              key={post.slug}
              href={`/posts/${post.slug}`}
              className="bg-[#1C1C1F] rounded-2xl overflow-hidden shadow-sm hover:shadow-lg hover:scale-[1.02] transition-transform duration-200"
            >
              <img
                src={post.coverImage}
                alt={post.title}
                loading="lazy" // ✅ Lazy load images
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <h2 className="text-2xl font-semibold">{post.title}</h2>
                <p className="text-gray-400 text-sm mt-1">
                  {new Date(post.date).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </p>
                <div className="flex items-center gap-3 mt-3">
                  <img
                    src={post.authorImage}
                    alt={post.authorName}
                    loading="lazy" // ✅ Lazy load images
                    className="w-8 h-8 rounded-full object-cover"
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

      {/* Scroll to Top Button */}
      {showScrollTop && (
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="fixed bottom-24 right-5 w-12 h-12 flex items-center justify-center bg-white text-black text-2xl rounded-full shadow-lg hover:bg-gray-300 transition-all z-50"
        >
          ↑
        </button>
      )}
    </div>
  );
}
