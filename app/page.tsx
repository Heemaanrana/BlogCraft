import BlogPage from "@/components/blogpage";
import Footer from "@/components/footer";
import Navbar from "@/components/navbar"

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-gray-950 to-black text-white">
      <Navbar />
      <main className="flex-1 container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto mb-12 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-shimmer">Latest Blog Posts</h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Explore our collection of thought-provoking articles on technology, design, and development.
          </p>
        </div>
        <BlogPage />
      </main>
      <Footer/>
    </div>
  
  )
}
