import { Github } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function Footer() {
  const techStack = [
    { name: "TensorFlow", color: "bg-orange-700" },
    { name: "Keras", color: "bg-red-700" },
    { name: "Python", color: "bg-blue-700" },
    { name: "SQLite", color: "bg-green-700" },
    { name: "Reddit API", color: "bg-red-600" },
  ]

  return (
    <footer className="bg-zinc-800 py-12 mt-24">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center mb-8">
          <div className="mb-6 md:mb-0">
            <h3 className="text-2xl font-bold mb-2">Catbot</h3>
            <p className="text-zinc-400">The Reddit-Trained Neural Chatbot</p>
          </div>

          <div className="flex space-x-4">
            <Button variant="outline" className="border-zinc-700 hover:bg-zinc-700 bg-transparent">
              <Github className="mr-2 h-4 w-4" />
              GitHub
            </Button>
            <Button variant="outline" className="border-zinc-700 hover:bg-zinc-700 bg-transparent">
              Documentation
            </Button>
            <Button variant="outline" className="border-zinc-700 hover:bg-zinc-700 bg-transparent">
              Dataset Summary
            </Button>
          </div>
        </div>

        <div className="flex flex-wrap justify-center gap-2 mb-8">
          {techStack.map((tech, index) => (
            <span key={index} className={`${tech.color} px-3 py-1 rounded-full text-xs font-medium`}>
              {tech.name}
            </span>
          ))}
        </div>

        <div className="text-center border-t border-zinc-700 pt-8">
          <p className="text-zinc-500 text-sm">Coming soon: Web API, Transformers, and Voice Chat</p>
          <p className="text-zinc-500 text-sm mt-4">
            © {new Date().getFullYear()} Catbot Project. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}
