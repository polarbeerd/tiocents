import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { compileMDX } from "next-mdx-remote/rsc";
import MDXComponentsWrapper from "@/components/MDXComponents";
import { getAllPosts } from "@/lib/getAllPosts";
import Link from "next/link";
import { notFound } from "next/navigation";

export async function generateStaticParams() {
  const postsDirectory = path.join(process.cwd(), "src/app/posts");
  const filenames = fs.readdirSync(postsDirectory);

  return filenames.map((filename) => ({
    slug: filename.replace(/\.mdx$/, ""),
  }));
}
export async function generateMetadata({ params }) {
  const { slug } = params;
  const fullPath = path.join(process.cwd(), "src/app/posts", `${slug}.mdx`);

  try {
    const fileContents = fs.readFileSync(fullPath, "utf8");
    const { data } = matter(fileContents);

    return {
      title: data.title,
      description: data.description,
      openGraph: {
        title: data.title,
        description: data.description,
        images: [data.coverImage],
        url: `https://your-website.com/posts/${slug}`, // 🔥 Replace with your real domain later!
        type: "article",
      },
    };
  } catch (error) {
    return notFound();
  }
}
function calculateReadingTime(text) {
  const wordsPerMinute = 200;
  const words = text.trim().split(/\s+/).length;
  const minutes = Math.ceil(words / wordsPerMinute);
  return minutes;
}

function getRelatedPosts(allPosts, currentSlug) {
  const related = allPosts.filter((post) => post.slug !== currentSlug);
  return related.slice(0, 3); // pick first 3 for now
}

export default async function PostPage({ params }) {
  const { slug } = params;
  const postsDirectory = path.join(process.cwd(), "src/app/posts");

  const filenames = fs
    .readdirSync(postsDirectory)
    .filter((file) => file.endsWith(".mdx"))
    .sort((a, b) => {
      const aContent = fs.readFileSync(path.join(postsDirectory, a), "utf8");
      const bContent = fs.readFileSync(path.join(postsDirectory, b), "utf8");
      const aData = matter(aContent).data;
      const bData = matter(bContent).data;
      return new Date(bData.date) - new Date(aData.date);
    });

  const postIndex = filenames.findIndex(
    (name) => name.replace(/\.mdx$/, "") === slug
  );

  const prevSlug = filenames[postIndex + 1]?.replace(/\.mdx$/, "") || null;
  const nextSlug = filenames[postIndex - 1]?.replace(/\.mdx$/, "") || null;

  const fullPath = path.join(postsDirectory, `${slug}.mdx`);

  let fileContents;
  try {
    fileContents = fs.readFileSync(fullPath, "utf8");
  } catch (error) {
    return notFound();
  }

  const { content, data } = matter(fileContents);
  const mdxSource = await compileMDX({ source: content });
  const readingTime = calculateReadingTime(content);

  const allPosts = getAllPosts();
  const relatedPosts = getRelatedPosts(allPosts, slug);

  return (
    <div className="max-w-2xl mx-auto p-4">
      {/* Cover Image */}
      {data.coverImage && (
        <img
          src={data.coverImage}
          alt={data.title}
          className="w-full h-64 object-cover rounded-lg mb-6"
        />
      )}

      {/* Title */}
      <h1 className="text-4xl font-bold mb-2">{data.title}</h1>

      {/* Date and Reading Time */}
      <div className="text-gray-400 text-sm mb-8">
        {new Date(data.date).toLocaleDateString("en-US", {
          year: "numeric",
          month: "long",
          day: "numeric",
        })}
        {readingTime ? ` • ${readingTime} min read` : ""}
      </div>

      {/* Content */}
      <MDXComponentsWrapper>{mdxSource.content}</MDXComponentsWrapper>

      {/* Previous / Next Post Navigation */}
      <div className="flex justify-between mt-12 text-blue-400">
        {prevSlug ? (
          <a href={`/posts/${prevSlug}`} className="hover:underline">
            ← Previous
          </a>
        ) : (
          <div />
        )}
        {nextSlug ? (
          <a href={`/posts/${nextSlug}`} className="hover:underline">
            Next →
          </a>
        ) : (
          <div />
        )}
      </div>

      {/* Related Posts */}
      {relatedPosts.length > 0 && (
        <div className="mt-16">
          <h2 className="text-2xl font-bold mb-4">Related Posts</h2>
          <div className="flex flex-col gap-4">
            {relatedPosts.map((post) => (
              <Link
                key={post.slug}
                href={`/posts/${post.slug}`}
                className="block bg-gray-800 p-4 rounded-lg hover:bg-gray-700 hover:scale-[1.02] transition-transform duration-200"
              >
                <h3 className="text-xl font-semibold">{post.title}</h3>
                <p className="text-gray-400 text-sm">
                  {new Date(post.date).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </p>
                <p className="text-gray-300 mt-2">{post.description}</p>
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
