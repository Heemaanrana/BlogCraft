"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { ArrowLeft, CalendarIcon, Clock, User } from "lucide-react"
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";

type BlogPost = {
  _id: string;
  title: string;
  content: string;
  author: string;
  date: string;
};

export default function BlogPage() {
  const { id } = useParams();
  const [data, setData] = useState<BlogPost | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const res = await fetch(`/api/blog/${id}`);
        if (!res.ok) throw new Error("Failed to fetch blog");
        const blog = await res.json();
        setData(blog);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    if (id) fetchBlog();
  }, [id]);

  if (loading) return <p className="min-h-screen flex flex-col bg-gradient-to-b from-gray-950 to-black text-white">Loading...</p>;

  if (!data) return <p className="min-h-screen flex flex-col bg-gradient-to-b from-gray-950 to-black text-white">Blog not found.</p>;

  return (
     <div className="min-h-screen flex flex-col bg-gradient-to-b from-gray-950 to-black text-white">
      <Navbar />
      <main className="flex-grow container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <Link href="/" className="inline-flex items-center gap-2 text-gray-400 hover:text-white mb-8 group">
            <ArrowLeft className="h-4 w-4 group-hover:-translate-x-1 transition-transform" />
            <span>Back to all articles</span>
          </Link>

          <div className="mb-6">
            
            <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-white via-purple-100 to-white">
              {data.title}
            </h1>

            <div className="flex flex-wrap items-center gap-6 text-gray-400 mb-8">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-gradient-to-r from-purple-500 to-indigo-500 flex items-center justify-center">
                  <User className="h-4 w-4 text-white" />
                </div>
                <span>{data.author}</span>
              </div>
              <div className="flex items-center gap-2">
                <CalendarIcon className="h-4 w-4 text-purple-400" />
                <span>{new Date(data.date).toLocaleDateString()}</span>
              </div>
            </div>
          </div>

          <div className="prose prose-lg prose-invert max-w-none">
            <p>{data.content}</p>
          </div>

          
        </div>
      </main>
      <Footer/>
    </div>
  );
}
