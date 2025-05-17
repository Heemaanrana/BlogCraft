import { CalendarIcon, UserIcon } from 'lucide-react';
import Link from 'next/link';

type BlogCardProps = {
 
    id: number;
    title: string;
    content: string;
    author: string;
    date: string;

};

export default function BlogCard({ title, date, author, id}: BlogCardProps) {
  return (
    <div className="bg-gray-900/30 backdrop-blur-sm border border-gray-800/50 hover:bg-gray-800/30 transition-all duration-300 overflow-hidden h-full flex flex-col rounded-xl p-6">
      {/* Title */}
      <h2 className="text-xl font-bold text-white mb-4 hover:bg-clip-text hover:text-transparent hover:bg-gradient-to-r hover:from-white hover:via-purple-100 hover:to-white transition-all duration-300">
        {title}
      </h2>

      

      {/* Footer */}
      <div className="border-t border-gray-800/50 pt-4 mt-auto text-sm text-gray-400 flex flex-col gap-2">
        {/* Author */}
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded-full bg-purple-600 flex items-center justify-center">
            <UserIcon className="h-3 w-3 text-white" />
          </div>
          <span>{author}</span>
        </div>

        {/* Date */}
        <div className="flex items-center gap-2">
          <CalendarIcon className="h-4 w-4 text-purple-400" />
          <span>{new Date({date}.date).toLocaleDateString()}</span>
        </div>

        {/* Read More Button */}
        <div className="pt-2">
          <Link href={`/blog/${id}`}>
            <button className="px-3 py-2 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white rounded-xl px-5 shadow-lg shadow-purple-900/20">
              Read more
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}
