export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center text-center p-8">
      <h1 className="text-5xl font-bold mb-4">404</h1>
      <h2 className="text-2xl mb-2">Page Not Found</h2>
      <p className="text-gray-400 mb-8">
        Sorry, we couldn’t find what you were looking for.
      </p>
      <a href="/posts" className="text-blue-400 hover:underline">
        ← Back to Posts
      </a>
    </div>
  );
}
