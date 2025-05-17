import { Github, Twitter, Linkedin } from "lucide-react"
import Link from "next/link"

export default function Footer() {
  return (
    <footer className="border-t border-gray-800/50 bg-gray-950 text-gray-400 text-sm py-6 mt-12">
      <div className="container mx-auto px-4 flex flex-col md:flex-row items-center justify-between">
        
        <p className="mb-4 md:mb-0 text-center md:text-left">
          © {new Date().getFullYear()} Built with ❤️ by <span className="text-white font-medium">Heemaan Rana</span>
        </p>

        <div className="flex gap-4">
          <Link href="https://github.com/Heemaanrana" target="_blank" aria-label="GitHub">
            <Github className="w-5 h-5 hover:text-white transition" />
          </Link>
          <Link href="https://x.com/Heemaan_Rana" target="_blank" aria-label="Twitter">
            <Twitter className="w-5 h-5 hover:text-white transition" />
          </Link>
          <Link href="https://www.linkedin.com/in/heemaan-rana-1593172b1/" target="_blank" aria-label="LinkedIn">
            <Linkedin className="w-5 h-5 hover:text-white transition" />
          </Link>
        </div>
      </div>
    </footer>
  )
}

