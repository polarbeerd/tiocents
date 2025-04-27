import { getAllPosts } from "@/lib/getPosts";
import TopTabs from "@/components/TopTabs";

export const metadata = {
  title: "Posts | YourSiteName",
  description: "Browse ideas, thoughts, and articles.",
};

export default async function PostsPage() {
  const posts = getAllPosts(); // ✅ SERVER fetch (fs allowed here)

  return (
    <div className="max-w-4xl mx-auto p-4">
      <TopTabs posts={posts} />
    </div>
  );
}
