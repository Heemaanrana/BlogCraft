'use client';

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation"; // For App Router projects
import Link from "next/link"
import { signIn, signOut } from "next-auth/react";

export default function Navbar() {
  const { data: session } = useSession();
  const router = useRouter();

   const handleCreateClick = () => {
    if (!session) {
      router.push("/api/auth/signin");
    } else {
      router.push("/create");
    }
  };

  return (
    <nav className="border-b border-gray-800/50 bg-gradient-to-r from-gray-950 via-black to-gray-950 backdrop-blur-md sticky top-0 z-10">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 group">       
            <span className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white via-purple-100 to-white">
              BlogCraft
            </span>
          </Link>

          <div className="flex items-center gap-4">            
            {!session && <button className="px-3 py-2 text-gray-300 hover:text-white hover:bg-gray-800/50 rounded-xl px-5 " onClick={() => signIn()}>SignIn</button>}
            {session && <button className="px-3 py-2 text-gray-300 hover:text-white hover:bg-gray-800/50 rounded-xl px-5 " onClick={() => signOut()}>SignOut</button>}
            <button onClick={handleCreateClick} className=" px-3 py-2 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white rounded-xl px-5 shadow-lg shadow-purple-900/20">
              Create Post
            </button>
          </div>
        </div>
      </div>
    </nav>
  )

}




 