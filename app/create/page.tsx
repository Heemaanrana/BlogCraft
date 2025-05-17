'use client';

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";

export default function CreateBlogPage() {
  const { status } = useSession();
  const router = useRouter();

  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/api/auth/signin");
    }
  }, [status, router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch("/api/blog", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ title, content, author }),
      });

      if (res.ok) {
        setTitle("");
        setContent("");
        router.push("/");
      } else {
        alert("Failed to publish blog");
      }
    } catch (err) {
      console.error(err);
      alert("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  if (status === "loading") return <div className="text-white p-10">Loading...</div>;

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-black via-gray-950 to-black text-white">
      <Navbar />
      <main className="flex-grow container mx-auto px-4 py-12">
        <div className="max-w-3xl mx-auto bg-gray-900/70 backdrop-blur-md rounded-2xl p-8 shadow-lg border border-gray-800">
          <Link href="/" className="inline-flex items-center gap-2 text-gray-400 hover:text-white mb-8 group">
            <ArrowLeft className="h-4 w-4 group-hover:-translate-x-1 transition-transform" />
            <span>Back to all blogs</span>
          </Link>

          <h1 className="text-3xl md:text-4xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-white via-purple-100 to-white">
            Create New Blog
          </h1>
          <p className="text-gray-400 mb-8">Share your thoughts and ideas with the world.</p>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="title" className="block mb-2 text-sm text-gray-300">Title</label>
              <input
                id="title"
                name="title"
                placeholder="Enter blog title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
                className="w-full p-3 rounded-lg bg-gray-800 text-white placeholder-gray-500 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-600"
              />
            </div>

            <div>
              <label htmlFor="content" className="block mb-2 text-sm text-gray-300">Content</label>
              <textarea
                id="content"
                name="content"
                placeholder="Write your blog here..."
                value={content}
                onChange={(e) => setContent(e.target.value)}
                required
                className="w-full p-3 h-40 rounded-lg bg-gray-800 text-white placeholder-gray-500 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-600"
              />
            </div>

            <div>
              <label htmlFor="author" className="block mb-2 text-sm text-gray-300">Author</label>
              <input
                id="author"
                name="author"
                placeholder="Your name"
                value={author}
                onChange={(e) => setAuthor(e.target.value)}
                required
                className="w-full p-3 rounded-lg bg-gray-800 text-white placeholder-gray-500 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-600"
              />
            </div>

            <div className="pt-6 flex justify-end border-t border-gray-800">
              <button
                type="submit"
                disabled={loading}
                className="w-full md:w-auto px-8 py-3 rounded-lg bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white font-semibold transition duration-300"
              >
                {loading ? "Publishing..." : "Publish Blog"}
              </button>
            </div>
          </form>
        </div>
      </main>
      <Footer />
    </div>
  );
}
