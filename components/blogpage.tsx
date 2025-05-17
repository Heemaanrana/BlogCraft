"use client"
import { useEffect, useState } from 'react';
import BlogCard from '@/components/ui/blog-card';

type BlogPost = {
  _id: number;
  title: string;
  content: string;
  author: string;
  date: string;
};

export default function BlogPage() {
  const [blogs, setBlogs] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch all blogs from API
  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await fetch('/api/blog');  // Assuming '/api/blog' is your endpoint
        if (!response.ok) throw new Error('Failed to fetch blogs');
        const data = await response.json();
        setBlogs(data);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchBlogs();
  }, []);

  if (loading) return <p className="text-center text-xl">Loading blogs...</p>;

  if (error) return <p className="text-center text-xl text-red-600">{error}</p>;

  return (
    <main>     
      <div className="grid md:grid-cols-3 sm:grid-cols-2 gap-6">
        {blogs.map((post) => (
          <BlogCard key={post._id} id={post._id} {...post} />
        ))}
      </div>
    </main>
  );
}
